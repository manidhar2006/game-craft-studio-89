import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BOARD_TILES,
  JAIL_TURNS,
  PASS_START_BONUS,
  PRINCIPLES,
  STARTING_CREDITS,
  type ColorGroup,
  type PrincipleConfig,
} from "./constants";
import type { ActiveMcq, GameState, Player } from "./engine-types";
import { getRandomQuestionForPrinciple } from "./question-bank";
import { drawCard } from "./regulator-cards";

interface Opts {
  enabled: boolean;
  humanName: string;
  humanAvatar: number;
  opponents?: Array<{ id: string; name: string; avatarId: number }>;
  localPlayerId?: string;
  autoPlayBots?: boolean;
  initialState?: GameState | null;
  externalState?: GameState | null;
  onStateChange?: (nextState: GameState) => void;
}

const COMPUTERS = [
  { name: "Auditor AI", avatarId: 1 },
  { name: "Compliance Bot", avatarId: 5 },
];

function makePlayer(id: string, name: string, avatarId: number, isHuman: boolean): Player {
  return {
    id,
    name,
    avatarId,
    credits: STARTING_CREDITS * 5,
    position: 0,
    isHuman,
    inJail: false,
    jailTurnsRemaining: 0,
    isEliminated: false,
    layers: {},
  };
}

function buildPlayers(
  localPlayerId: string,
  humanName: string,
  humanAvatar: number,
  opponents?: Array<{ id: string; name: string; avatarId: number }>,
) {
  const roomOpponents = (opponents ?? []).filter((o) => o.id !== localPlayerId);
  const players: Player[] = [makePlayer(localPlayerId, humanName || "You", humanAvatar, true)];

  if (roomOpponents.length > 0) {
    for (const o of roomOpponents) {
      players.push(makePlayer(o.id, o.name, o.avatarId, false));
    }
  } else {
    players.push(makePlayer("cpu1", COMPUTERS[0].name, COMPUTERS[0].avatarId, false));
    players.push(makePlayer("cpu2", COMPUTERS[1].name, COMPUTERS[1].avatarId, false));
  }

  return players;
}

export function buildInitialGameState(
  localPlayerId: string,
  humanName: string,
  humanAvatar: number,
  opponents?: Array<{ id: string; name: string; avatarId: number }>,
): GameState {
  const players = buildPlayers(localPlayerId, humanName, humanAvatar, opponents);
  const localPlayer = players.find((p) => p.id === localPlayerId);
  return {
    board: BOARD_TILES,
    players,
    currentPlayerId: players[0]?.id ?? localPlayerId,
    propertyOwners: {},
    phase: "idle",
    lastRoll: null,
    message: localPlayer
      ? "Your turn — roll the dice to begin."
      : `${players[0]?.name ?? "Player"} starts first.`,
    activeMcq: null,
    activeCard: null,
    winner: null,
    penaltyPot: 0,
    pendingBuy: null,
    pendingRent: null,
    pendingOwn: null,
  };
}

function principleAt(tileIndex: number): PrincipleConfig | undefined {
  return PRINCIPLES.find((p) => p.tileIndex === tileIndex);
}

function rentFor(p: PrincipleConfig, layers: number) {
  if (layers <= 0) return p.baseRent;
  if (layers === 1) return p.layer1Rent;
  if (layers === 2) return p.layer2Rent;
  return p.layer3Rent;
}

function mapQuestion(q: {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string | null;
}): ActiveMcq["question"] {
  const normalized = q.correct_answer?.toUpperCase();
  const correct =
    normalized === "A" || normalized === "B" || normalized === "C" || normalized === "D"
      ? normalized
      : "A";
  return {
    id: q.id,
    text: q.question_text,
    options: [
      { key: "A", text: q.option_a },
      { key: "B", text: q.option_b },
      { key: "C", text: q.option_c },
      { key: "D", text: q.option_d },
    ],
    correct,
    explanation: q.explanation,
  };
}

function normalizeState(state: GameState): GameState {
  return {
    ...state,
    lastRoll: Array.isArray(state.lastRoll) ? state.lastRoll[0] + state.lastRoll[1] : state.lastRoll,
    penaltyPot: state.penaltyPot ?? 0,
  };
}

function ownsGroup(state: GameState, playerId: string, group: ColorGroup) {
  return PRINCIPLES.filter((p) => p.group === group).every(
    (p) => state.propertyOwners[p.principleNo] === playerId,
  );
}

function canBuildLayer(state: GameState, playerId: string, principle: PrincipleConfig) {
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return false;
  const layers = player.layers[principle.principleNo] ?? 0;
  if (layers >= 3) return false;
  if (!ownsGroup(state, playerId, principle.group)) return false;
  return player.credits >= principle.layerCost;
}

function degradePropertyOneTier(state: GameState, principleNo: number, ownerId: string) {
  const owner = state.players.find((p) => p.id === ownerId);
  if (!owner)
    return {
      players: state.players,
      propertyOwners: state.propertyOwners,
      removedOwnership: false,
    };

  const currentLayers = owner.layers[principleNo] ?? 0;
  if (currentLayers > 0) {
    const players = state.players.map((p) => {
      if (p.id !== ownerId) return p;
      return {
        ...p,
        layers: { ...p.layers, [principleNo]: currentLayers - 1 },
      };
    });
    return { players, propertyOwners: state.propertyOwners, removedOwnership: false };
  }

  const propertyOwners = { ...state.propertyOwners };
  delete propertyOwners[principleNo];
  const players = state.players.map((p) => {
    if (p.id !== ownerId) return p;
    const nextLayers = { ...p.layers };
    delete nextLayers[principleNo];
    return { ...p, layers: nextLayers };
  });
  return { players, propertyOwners, removedOwnership: true };
}

export function useSoloGame({
  enabled,
  humanName,
  humanAvatar,
  opponents,
  localPlayerId = "human",
  autoPlayBots = true,
  initialState,
  externalState,
  onStateChange,
}: Opts) {
  const [state, setState] = useState<GameState | null>(null);
  const initRef = useRef(false);
  const stateRef = useRef<GameState | null>(null);
  const stateSignatureRef = useRef<string>("");
  const lastPersistedSignatureRef = useRef<string>("");
  const lastAppliedExternalSignatureRef = useRef<string>("");
  const applyingExternalRef = useRef(false);
  const serializeState = useCallback((nextState: GameState) => JSON.stringify(nextState), []);
  useEffect(() => {
    stateRef.current = state;
    if (state) {
      stateSignatureRef.current = serializeState(state);
    }
  }, [state]);

  const init = useCallback(() => {
    setState(
      normalizeState(
        initialState ?? buildInitialGameState(localPlayerId, humanName, humanAvatar, opponents),
      ),
    );
  }, [humanName, humanAvatar, initialState, localPlayerId, opponents]);

  useEffect(() => {
    if (enabled && !initRef.current) {
      initRef.current = true;
      init();
    }
  }, [enabled, init]);

  useEffect(() => {
    if (!enabled || !externalState) return;
    const normalizedExternalState = normalizeState(externalState);
    const externalSignature = serializeState(normalizedExternalState);
    if (
      externalSignature === stateSignatureRef.current ||
      externalSignature === lastAppliedExternalSignatureRef.current
    ) {
      return;
    }
    applyingExternalRef.current = true;
    lastAppliedExternalSignatureRef.current = externalSignature;
    setState(normalizedExternalState);
  }, [enabled, externalState, serializeState]);

  useEffect(() => {
    if (!state || !onStateChange) return;
    const signature = serializeState(state);
    if (lastPersistedSignatureRef.current === signature) return;
    if (applyingExternalRef.current) {
      applyingExternalRef.current = false;
      lastPersistedSignatureRef.current = signature;
      return;
    }
    lastPersistedSignatureRef.current = signature;
    onStateChange(state);
  }, [onStateChange, serializeState, state]);

  const reset = useCallback(() => {
    initRef.current = false;
    setState(null);
    setTimeout(() => {
      initRef.current = true;
      init();
    }, 50);
  }, [init]);

  const leaveGame = useCallback(() => {
    setState((s) => {
      if (!s) return s;
      const leavingPlayer = s.players.find((p) => p.id === localPlayerId);
      if (!leavingPlayer || leavingPlayer.isEliminated) return s;

      const players = s.players.map((p) =>
        p.id === localPlayerId ? { ...p, isEliminated: true, credits: 0 } : p,
      );
      const alive = players.filter((p) => !p.isEliminated);
      if (alive.length <= 1) {
        return {
          ...s,
          players,
          phase: "ended",
          winner: alive[0] ?? null,
          message: "",
          activeMcq: null,
          activeCard: null,
          pendingBuy: null,
          pendingRent: null,
          pendingOwn: null,
        };
      }

      if (s.currentPlayerId === localPlayerId) {
        const idx = s.players.findIndex((p) => p.id === localPlayerId);
        let nextPlayer = players.find((p, playerIndex) => {
          if (playerIndex <= idx) return false;
          return !p.isEliminated;
        });
        if (!nextPlayer) {
          nextPlayer = players.find((p) => !p.isEliminated);
        }

        return {
          ...s,
          players,
          currentPlayerId: nextPlayer?.id ?? localPlayerId,
          phase: nextPlayer ? "idle" : "ended",
          lastRoll: null,
          message: nextPlayer
            ? nextPlayer.id === localPlayerId
              ? "Your turn — roll the dice."
              : `${nextPlayer.name}'s turn.`
            : "",
          activeMcq: null,
          activeCard: null,
          pendingBuy: null,
          pendingRent: null,
          pendingOwn: null,
        };
      }

      return {
        ...s,
        players,
        message: `${leavingPlayer.name} left the game and was eliminated.`,
      };
    });
  }, [localPlayerId]);

  const fetchQuestion = useCallback(async (principleNo: number): Promise<ActiveMcq["question"] | null> => {
    const q = getRandomQuestionForPrinciple(principleNo);
    if (!q) return null;
    return {
      id: q.id,
      text: q.text,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
    };
  }, []);

  const advanceTurn = useCallback(() => {
    setState((s) => {
      if (!s) return s;
      const alive = s.players.filter((p) => !p.isEliminated);
      if (alive.length <= 1) {
        return { ...s, phase: "ended", winner: alive[0] ?? null, message: "" };
      }
      const idx = s.players.findIndex((p) => p.id === s.currentPlayerId);
      let next = idx;
      for (let i = 1; i <= s.players.length; i++) {
        const cand = s.players[(idx + i) % s.players.length];
        if (!cand.isEliminated) {
          next = (idx + i) % s.players.length;
          break;
        }
      }
      const nextPlayer = s.players[next];
      return {
        ...s,
        currentPlayerId: nextPlayer.id,
        phase: "idle",
        lastRoll: null,
        message:
          nextPlayer.id === localPlayerId
            ? "Your turn — roll the dice."
            : `${nextPlayer.name}'s turn.`,
        activeMcq: null,
        activeCard: null,
        pendingBuy: null,
        pendingRent: null,
        pendingOwn: null,
      };
    });
  }, [localPlayerId]);

  const settleLanding = useCallback(
    async (player: Player) => {
      const isLocalTurn = player.id === localPlayerId;
      const tile = BOARD_TILES[player.position];
      if (tile.type === "principle" && tile.principleNo) {
        const principle = principleAt(player.position)!;
        const ownerId = stateRef.current?.propertyOwners[principle.principleNo];
        if (!ownerId) {
          if (isLocalTurn) {
            const q = await fetchQuestion(principle.principleNo);
            if (q) {
              setState((s) =>
                s
                  ? {
                      ...s,
                      phase: "mcq",
                      activeMcq: {
                        question: q,
                        principleNo: principle.principleNo,
                        principleName: principle.name,
                        mode: "buy",
                      },
                      pendingBuy: { principle },
                      pendingRent: null,
                      pendingOwn: null,
                      message: `Answer correctly to acquire ${principle.name} for ₹${principle.price}.`,
                    }
                  : s,
              );
              return;
            }
          } else if (player.credits >= principle.price) {
            setState((s) => {
              if (!s) return s;
              const players = s.players.map((p) =>
                p.id === player.id ? { ...p, credits: p.credits - principle.price } : p,
              );
              return {
                ...s,
                players,
                propertyOwners: { ...s.propertyOwners, [principle.principleNo]: player.id },
                message: `${player.name} acquired ${principle.name}.`,
              };
            });
          }
          setTimeout(advanceTurn, 1100);
          return;
        }
        if (ownerId === player.id) {
          if (isLocalTurn) {
            const q = await fetchQuestion(principle.principleNo);
            if (q) {
              setState((s) =>
                s
                  ? {
                      ...s,
                      phase: "mcq",
                      activeMcq: {
                        question: q,
                        principleNo: principle.principleNo,
                        principleName: principle.name,
                        mode: "audit",
                      },
                      pendingOwn: { principle },
                      pendingBuy: null,
                      pendingRent: null,
                      message: `Answer correctly to maintain strength on ${principle.name}.`,
                    }
                  : s,
              );
              return;
            }
          } else {
            // CPU behavior: attempt to build when affordable.
            setState((s) => {
              if (!s) return s;
              const me = s.players.find((p) => p.id === player.id)!;
              if (canBuildLayer(s, me.id, principle)) {
                const layers = me.layers[principle.principleNo] ?? 0;
                const players = s.players.map((p) =>
                  p.id === me.id
                    ? {
                        ...p,
                        credits: p.credits - principle.layerCost,
                        layers: { ...p.layers, [principle.principleNo]: layers + 1 },
                      }
                    : p,
                );
                return { ...s, players, message: `${me.name} strengthened ${principle.name}.` };
              }
              return { ...s, message: `${me.name} revisits ${principle.name}.` };
            });
            setTimeout(advanceTurn, 900);
          }
          return;
        }
        if (isLocalTurn) {
          const q = await fetchQuestion(principle.principleNo);
          if (q) {
            setState((s) =>
              s
                ? {
                    ...s,
                    phase: "mcq",
                    activeMcq: {
                      question: q,
                      principleNo: principle.principleNo,
                      principleName: principle.name,
                      mode: "rent_dispute",
                    },
                    pendingRent: { principle, ownerId },
                    pendingBuy: null,
                    pendingOwn: null,
                    message: `Answer correctly to pass audit and avoid rent on ${principle.name}.`,
                  }
                : s,
            );
            return;
          }
        }

        // CPU fallback on opponent tile.
        const cpuCorrect = Math.random() < 0.55;
        setState((s) => {
          if (!s) return s;
          if (cpuCorrect) {
            return {
              ...s,
              message: `${player.name} passed audit on ${principle.name} and paid no rent.`,
            };
          }
          const owner = s.players.find((p) => p.id === ownerId)!;
          const layers = owner.layers[principle.principleNo] ?? 0;
          const rent = owner.inJail ? 0 : rentFor(principle, layers);
          const me = s.players.find((p) => p.id === player.id)!;
          const pay = Math.min(rent, me.credits);
          let players = s.players.map((p) => {
            if (p.id === me.id) {
              const credits = p.credits - pay;
              return { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated };
            }
            if (p.id === owner.id && rent > 0) return { ...p, credits: p.credits + pay };
            return p;
          });
          const degraded = degradePropertyOneTier(
            { ...s, players },
            principle.principleNo,
            ownerId,
          );
          players = degraded.players;
          const propertyOwners = degraded.propertyOwners;
          const rentNote = owner.inJail
            ? "paid no rent because the owner is in DPB hearing"
            : `paid ₹${pay}`;
          const message = degraded.removedOwnership
            ? `${player.name} failed audit, ${rentNote}, and ${principle.name} became unowned.`
            : `${player.name} failed audit, ${rentNote}; ${principle.name} weakened by one rent tier.`;
          return { ...s, players, propertyOwners, message };
        });
        setTimeout(advanceTurn, 1300);
        return;
      }
      if (tile.type === "tax" && tile.amount) {
        setState((s) => {
          if (!s) return s;
          const me = s.players.find((p) => p.id === player.id)!;
          const credits = me.credits - tile.amount!;
          const players = s.players.map((p) =>
            p.id === me.id
              ? { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated }
              : p,
          );
          const pot = (s.penaltyPot ?? 0) + tile.amount!;
          return {
            ...s,
            players,
            penaltyPot: pot,
            message: `${me.name} paid ₹${tile.amount} — ${tile.name}.`,
          };
        });
        setTimeout(advanceTurn, 1100);
        return;
      }
      if (tile.type === "go_to_jail") {
        setState((s) => {
          if (!s) return s;
          const jailIndex = s.board.find((t) => t.type === "jail_visit")?.index ?? 4;
          const players = s.players.map((p) =>
            p.id === player.id
              ? { ...p, position: jailIndex, inJail: true, jailTurnsRemaining: JAIL_TURNS }
              : p,
          );
          return { ...s, players, message: `${player.name} sent to DPB Hearing.` };
        });
        setTimeout(advanceTurn, 1100);
        return;
      }
      if (tile.type === "regulator") {
        const card = drawCard();
        setState((s) =>
          s
            ? {
                ...s,
                phase: "regulator",
                activeCard: card,
                message: `Regulator card: ${card.title}`,
              }
            : s,
        );
        return;
      }
      if (tile.type === "free_audit") {
        setState((s) => {
          if (!s) return s;
          const pot = s.penaltyPot ?? 0;
          const players = s.players.map((p) =>
            p.id === player.id ? { ...p, credits: p.credits + pot } : p,
          );
          const message =
            pot > 0
              ? `${player.name} collected ₹${pot} from Free Audit.`
              : `${player.name} passed Free Audit with no penalties to collect.`;
          return { ...s, players, penaltyPot: 0, message };
        });
      } else {
        setState((s) => (s ? { ...s, message: `${player.name} rests.` } : s));
      }
      setTimeout(advanceTurn, 900);
    },
    [advanceTurn, fetchQuestion],
  );

  const movePlayer = useCallback(
    (playerId: string, steps: number) => {
      setState((s) => {
        if (!s) return s;
        const players = s.players.map((p) => {
          if (p.id !== playerId) return p;
          const newPos = (p.position + steps) % s.board.length;
          const passedStart = p.position + steps >= s.board.length;
          return {
            ...p,
            position: newPos,
            credits: passedStart ? p.credits + PASS_START_BONUS : p.credits,
          };
        });
        return { ...s, players, phase: "moving" };
      });
      // Delay settling until the visual animation hopping finishes
      const delay = Math.max(600, steps * 200 + 300);
      setTimeout(() => {
        const cur = stateRef.current?.players.find((p) => p.id === playerId);
        if (cur) settleLanding(cur);
      }, delay);
    },
    [settleLanding],
  );

  const rollDice = useCallback(() => {
    const current = stateRef.current;
    if (!current || current.currentPlayerId !== localPlayerId || current.phase !== "idle") return;
    setState((s) => (s ? { ...s, phase: "rolling" } : s));
    setTimeout(() => {
      const roll = 1 + Math.floor(Math.random() * 6);
      let curId = stateRef.current?.currentPlayerId ?? localPlayerId;
      let inJail = false;
      setState((s) => {
        if (!s) return s;
        const player = s.players.find((p) => p.id === s.currentPlayerId)!;
        curId = player.id;
        if (player.inJail) {
          inJail = true;
          const jailTurnsRemaining = player.jailTurnsRemaining - 1;
          const players = s.players.map((p) =>
            p.id === player.id ? { ...p, jailTurnsRemaining, inJail: jailTurnsRemaining > 0 } : p,
          );
          return {
            ...s,
            players,
            lastRoll: roll,
            message: `${player.name} is detained at DPB hearing.`,
          };
        }
        return { ...s, lastRoll: roll };
      });
      if (inJail) {
        setTimeout(advanceTurn, 900);
        return;
      }
      setTimeout(() => movePlayer(curId, roll), 700);
    }, 700);
  }, [advanceTurn, localPlayerId, movePlayer]);

  const answerMcq = useCallback(
    (picked: "A" | "B" | "C" | "D") => {
      const current = stateRef.current;
      if (!current || current.currentPlayerId !== localPlayerId || current.phase !== "mcq") return;
      setState((s) => {
        if (!s || !s.activeMcq) return s;
        const correct = picked === s.activeMcq.question.correct;
        let players = s.players;
        let propertyOwners = s.propertyOwners;
        let message = "";
        if (s.pendingBuy) {
          const principle = s.pendingBuy.principle;
          const buyer = s.players.find((p) => p.id === s.currentPlayerId)!;
          if (correct && buyer.credits >= principle.price) {
            players = players.map((p) =>
              p.id === buyer.id ? { ...p, credits: p.credits - principle.price } : p,
            );
            propertyOwners = { ...propertyOwners, [principle.principleNo]: buyer.id };
            message = `Correct! You acquired ${principle.name}.`;
          } else if (correct) {
            message = `Correct, but insufficient credits to acquire ${principle.name}.`;
          } else {
            message = `Incorrect. The principle remains unowned. Right answer: ${s.activeMcq.question.correct}.`;
          }
        } else if (s.pendingRent) {
          const principle = s.pendingRent.principle;
          const owner = s.players.find((p) => p.id === s.pendingRent!.ownerId)!;
          const me = s.players.find((p) => p.id === s.currentPlayerId)!;
          if (correct) {
            message = `Correct! ${me.name} passed audit and paid no rent on ${principle.name}.`;
          } else {
            const layers = owner.layers[principle.principleNo] ?? 0;
            const rent = owner.inJail ? 0 : rentFor(principle, layers);
            const pay = Math.min(rent, me.credits);
            players = players.map((p) => {
              if (p.id === me.id) {
                const credits = p.credits - pay;
                return { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated };
              }
              if (p.id === owner.id && rent > 0) return { ...p, credits: p.credits + pay };
              return p;
            });
            const degraded = degradePropertyOneTier(
              { ...s, players, propertyOwners },
              principle.principleNo,
              owner.id,
            );
            players = degraded.players;
            propertyOwners = degraded.propertyOwners;
            const rentNote = owner.inJail
              ? "paid no rent because the owner is in DPB hearing"
              : `paid ₹${pay}`;
            message = degraded.removedOwnership
              ? `Wrong answer. ${rentNote}; ${principle.name} rent dropped to zero and ownership was removed.`
              : `Wrong answer. ${rentNote}; ${principle.name} rent tier dropped.`;
          }
        } else if (s.pendingOwn) {
          const principle = s.pendingOwn.principle;
          const me = s.players.find((p) => p.id === s.currentPlayerId)!;
          if (correct) {
            if (canBuildLayer(s, me.id, principle)) {
              const layers = me.layers[principle.principleNo] ?? 0;
              players = s.players.map((p) =>
                p.id === me.id
                  ? {
                      ...p,
                      credits: p.credits - principle.layerCost,
                      layers: { ...p.layers, [principle.principleNo]: layers + 1 },
                    }
                  : p,
              );
              message = `Correct! You strengthened ${principle.name} with a compliance layer.`;
            } else {
              message = `Correct! ${principle.name} remains stable.`;
            }
          } else {
            const degraded = degradePropertyOneTier(
              { ...s, players, propertyOwners },
              principle.principleNo,
              me.id,
            );
            players = degraded.players;
            propertyOwners = degraded.propertyOwners;
            message = degraded.removedOwnership
              ? `Wrong answer. ${principle.name} was downgraded to zero rent and became unowned.`
              : `Wrong answer. ${principle.name} dropped by one rent tier.`;
          }
        }
        return {
          ...s,
          players,
          propertyOwners,
          phase: "turn_end",
          activeMcq: null,
          pendingBuy: null,
          pendingRent: null,
          pendingOwn: null,
          message,
        };
      });
      setTimeout(advanceTurn, 1500);
    },
    [advanceTurn, localPlayerId],
  );

  const acknowledgeCard = useCallback(() => {
    const current = stateRef.current;
    if (!current || current.currentPlayerId !== localPlayerId || current.phase !== "regulator")
      return;
    setState((s) => {
      if (!s || !s.activeCard) return s;
      const card = s.activeCard;
      let players = s.players;
      const me = s.players.find((p) => p.id === s.currentPlayerId)!;
      if (card.effect.type === "credits") {
        const credits = me.credits + card.effect.amount;
        players = s.players.map((p) =>
          p.id === me.id
            ? { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated }
            : p,
        );
      } else if (card.effect.type === "move") {
        const to = card.effect.to;
        players = s.players.map((p) =>
          p.id === me.id
            ? { ...p, position: to, credits: p.credits + (to === 0 ? PASS_START_BONUS : 0) }
            : p,
        );
      } else if (card.effect.type === "jail") {
        const jailIndex = s.board.find((t) => t.type === "jail_visit")?.index ?? 4;
        players = s.players.map((p) =>
          p.id === me.id
            ? { ...p, position: jailIndex, inJail: true, jailTurnsRemaining: JAIL_TURNS }
            : p,
        );
      }
      return { ...s, players, activeCard: null, phase: "turn_end" };
    });
    setTimeout(advanceTurn, 800);
  }, [advanceTurn, localPlayerId]);

  // CPU autoplay
  useEffect(() => {
    if (!state) return;
    if (!autoPlayBots) return;
    const cur = state.players.find((p) => p.id === state.currentPlayerId);
    if (!cur || cur.id === localPlayerId) return;
    if (state.phase !== "idle") return;
    const t = setTimeout(() => rollDice(), 1200);
    return () => clearTimeout(t);
  }, [autoPlayBots, localPlayerId, rollDice, state]);

  const canRoll = useMemo(() => {
    if (!state) return false;
    if (state.phase !== "idle") return false;
    return state.currentPlayerId === localPlayerId;
  }, [localPlayerId, state]);

  return { state, rollDice, answerMcq, acknowledgeCard, leaveGame, reset, canRoll };
}
