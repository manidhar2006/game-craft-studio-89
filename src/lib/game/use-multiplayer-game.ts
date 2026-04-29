import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BOARD_TILES,
  BUY_QUESTION_BOUNTY,
  JAIL_FINE,
  JAIL_MAX_ATTEMPTS,
  PASS_START_BONUS,
  PRINCIPLES,
  STARTING_CREDITS,
  type ColorGroup,
  type PrincipleConfig,
} from "./constants";
import type { ActiveMcq, GameState, Player, RegulatorCard } from "./engine-types";
import { getRandomQuestionForPrinciple } from "./question-bank";
import { drawCard } from "./regulator-cards";

interface Opts {
  enabled: boolean;
  humanName: string;
  humanAvatar: number;
  opponents?: Array<{ id: string; name: string; avatarId: number }>;
  localPlayerId?: string;
  initialState?: GameState | null;
  externalState?: GameState | null;
  onStateChange?: (nextState: GameState) => void;
}

function makePlayer(id: string, name: string, avatarId: number, isHuman: boolean): Player {
  return {
    id,
    name,
    avatarId,
    credits: STARTING_CREDITS,
    position: 0,
    isHuman,
    inJail: false,
    jailTurnsRemaining: 0,
    hasJailFreeCard: false,
    skipNextTurn: false,
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
  const roomOpponents = (opponents ?? []).filter((opponent) => opponent.id !== localPlayerId);
  const players: Player[] = [makePlayer(localPlayerId, humanName || "You", humanAvatar, true)];

  for (const opponent of roomOpponents) {
    players.push(makePlayer(opponent.id, opponent.name, opponent.avatarId, false));
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
  const localPlayer = players.find((player) => player.id === localPlayerId);
  return {
    board: BOARD_TILES,
    players,
    currentPlayerId: players[0]?.id ?? localPlayerId,
    propertyOwners: {},
    rentOverrides: {},
    phase: "idle",
    lastRoll: null,
    message: localPlayer
      ? "Your turn — roll the dice to begin."
      : `${players[0]?.name ?? "Player"} starts first.`,
    activeMcq: null,
    lastMcqResult: null,
    activeCard: null,
    winner: null,
    penaltyPot: 0,
    usedQuestionIds: [],
    pendingBuy: null,
    pendingRent: null,
    pendingOwn: null,
    pendingBuild: null,
    pendingSell: null,
  };
}

function principleAt(tileIndex: number): PrincipleConfig | undefined {
  return PRINCIPLES.find((principle) => principle.tileIndex === tileIndex);
}

function principlesInGroup(group: ColorGroup) {
  return PRINCIPLES.filter((principle) => principle.group === group);
}

function ownsGroup(state: GameState, playerId: string, group: ColorGroup) {
  return principlesInGroup(group).every(
    (principle) => state.propertyOwners[principle.principleNo] === playerId,
  );
}

function rentFor(state: GameState, principle: PrincipleConfig, ownerId: string, payerId?: string) {
  // Check if there's a player-specific rent override (from failed own_tile MCQs)
  // The override is stored per property per owner (not per payer)
  if (state.rentOverrides?.[principle.principleNo]?.[ownerId] !== undefined) {
    return state.rentOverrides[principle.principleNo][ownerId];
  }

  const owner = state.players.find((player) => player.id === ownerId);
  const layers = owner?.layers[principle.principleNo] ?? 0;
  if (layers === 1) return principle.layer1Rent;
  if (layers === 2) return principle.layer2Rent;
  if (layers >= 3) return principle.layer3Rent;
  return ownsGroup(state, ownerId, principle.group) ? principle.baseRent * 2 : principle.baseRent;
}

function canBuildLayer(state: GameState, playerId: string, principle: PrincipleConfig) {
  const player = state.players.find((candidate) => candidate.id === playerId);
  if (!player) return false;
  const currentLayers = player.layers[principle.principleNo] ?? 0;
  if (currentLayers >= 3 || player.credits < principle.layerCost) return false;
  if (!ownsGroup(state, playerId, principle.group)) return false;

  const groupLayerCounts = principlesInGroup(principle.group).map(
    (groupPrinciple) => player.layers[groupPrinciple.principleNo] ?? 0,
  );
  return currentLayers === Math.min(...groupLayerCounts);
}

function releasePlayerAssets(state: GameState, playerId: string) {
  const propertyOwners = { ...state.propertyOwners };
  for (const [principleNo, ownerId] of Object.entries(propertyOwners)) {
    if (ownerId === playerId) delete propertyOwners[Number(principleNo)];
  }
  const players = state.players.map((player) =>
    player.id === playerId
      ? {
          ...player,
          credits: 0,
          isEliminated: true,
          inJail: false,
          jailTurnsRemaining: 0,
          layers: {},
        }
      : player,
  );
  return { ...state, players, propertyOwners };
}

function resolveBankruptcies(state: GameState) {
  let nextState = state;
  for (const player of state.players) {
    if (!player.isEliminated && player.credits < 0) {
      nextState = releasePlayerAssets(nextState, player.id);
    }
  }

  const alive = nextState.players.filter((player) => !player.isEliminated);
  if (alive.length <= 1) {
    return {
      ...nextState,
      phase: "ended" as const,
      winner: alive[0] ?? null,
      message: alive[0] ? `${alive[0].name} wins.` : "The game ended with no winner.",
      activeMcq: null,
      activeCard: null,
      pendingBuy: null,
      pendingRent: null,
      pendingOwn: null,
      pendingBuild: null,
    };
  }
  return nextState;
}

function mapQuestion(q: NonNullable<ReturnType<typeof getRandomQuestionForPrinciple>>): ActiveMcq["question"] {
  return {
    id: q.id,
    text: q.text,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
  };
}

function normalizeState(state: GameState): GameState {
  return {
    ...state,
    board: state.board?.length === BOARD_TILES.length ? state.board : BOARD_TILES,
    players: state.players.map((player) => ({
      ...player,
      credits: Number.isFinite(player.credits) ? player.credits : STARTING_CREDITS,
      position: player.position % BOARD_TILES.length,
      hasJailFreeCard: player.hasJailFreeCard ?? false,
      skipNextTurn: player.skipNextTurn ?? false,
      layers: player.layers ?? {},
    })),
    lastRoll: Array.isArray(state.lastRoll) ? state.lastRoll[0] + state.lastRoll[1] : state.lastRoll,
    penaltyPot: state.penaltyPot ?? 0,
    usedQuestionIds: state.usedQuestionIds ?? [],
    lastMcqResult: state.lastMcqResult ?? null,
    pendingBuild: state.pendingBuild ?? null,
    rentOverrides: state.rentOverrides ?? {},
  };
}

export function useMultiplayerGame({
  enabled,
  humanName,
  humanAvatar,
  opponents,
  localPlayerId = "human",
  initialState,
  externalState,
  onStateChange,
}: Opts) {
  const [state, setState] = useState<GameState | null>(null);
  const initRef = useRef(false);
  const stateRef = useRef<GameState | null>(null);
  const stateSignatureRef = useRef("");
  const lastPersistedSignatureRef = useRef("");
  const lastAppliedExternalSignatureRef = useRef("");
  const applyingExternalRef = useRef(false);
  const serializeState = useCallback((nextState: GameState) => JSON.stringify(nextState), []);

  useEffect(() => {
    stateRef.current = state;
    if (state) stateSignatureRef.current = serializeState(state);
  }, [serializeState, state]);

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
    const liveState = stateRef.current;
    const isLocalTurnActive =
      !!liveState &&
      liveState.currentPlayerId === localPlayerId &&
      liveState.phase !== "idle" &&
      liveState.phase !== "ended";

    // Ignore stale remote snapshots while this client is actively resolving its own turn.
    if (isLocalTurnActive && externalSignature !== stateSignatureRef.current) {
      return;
    }

    if (
      externalSignature === stateSignatureRef.current ||
      externalSignature === lastAppliedExternalSignatureRef.current
    ) {
      return;
    }
    applyingExternalRef.current = true;
    lastAppliedExternalSignatureRef.current = externalSignature;
    setState(normalizedExternalState);
  }, [enabled, externalState, localPlayerId, serializeState]);

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

  const advanceTurn = useCallback(() => {
    setState((currentState) => {
      if (!currentState) return currentState;
      const solvedState = resolveBankruptcies(currentState);
      if (solvedState.phase === "ended") return solvedState;

      const currentIndex = solvedState.players.findIndex(
        (player) => player.id === solvedState.currentPlayerId,
      );
      let players = solvedState.players;
      let nextPlayer: Player | null = null;
      let skippedName = "";

      for (let offset = 1; offset <= solvedState.players.length; offset++) {
        const candidateIndex = (currentIndex + offset) % solvedState.players.length;
        const candidate = players[candidateIndex];
        if (candidate.isEliminated) continue;
        if (candidate.skipNextTurn) {
          skippedName = candidate.name;
          players = players.map((player) =>
            player.id === candidate.id ? { ...player, skipNextTurn: false } : player,
          );
          continue;
        }
        nextPlayer = players[candidateIndex];
        break;
      }

      if (!nextPlayer) {
        nextPlayer = players.find((player) => !player.isEliminated) ?? null;
      }

      if (!nextPlayer) {
        return {
          ...solvedState,
          players,
          phase: "ended",
          winner: null,
          message: "The game ended with no winner.",
        };
      }

      const prefix = skippedName ? `${skippedName} skips this turn. ` : "";
      return {
        ...solvedState,
        players,
        currentPlayerId: nextPlayer.id,
        phase: "idle",
        lastRoll: null,
        message:
          prefix +
          (nextPlayer.id === localPlayerId
            ? "Your turn — roll the dice."
            : `${nextPlayer.name}'s turn.`),
        activeMcq: null,
        lastMcqResult: null,
        activeCard: null,
        pendingBuy: null,
        pendingRent: null,
        pendingOwn: null,
        pendingBuild: null,
      };
    });
  }, [localPlayerId]);

  const completeTurn = useCallback(
    (isLocalTurn: boolean, delay = 900) => {
      if (!isLocalTurn) {
        setTimeout(advanceTurn, delay);
      }
    },
    [advanceTurn],
  );

  const leaveGame = useCallback(() => {
    setState((currentState) => {
      if (!currentState) return currentState;
      const leavingPlayer = currentState.players.find((player) => player.id === localPlayerId);
      if (!leavingPlayer || leavingPlayer.isEliminated) return currentState;
      return resolveBankruptcies(releasePlayerAssets(currentState, localPlayerId));
    });
    setTimeout(advanceTurn, 50);
  }, [advanceTurn, localPlayerId]);

  const fetchQuestion = useCallback((principleNo: number): ActiveMcq["question"] | null => {
    const usedQuestionIds = stateRef.current?.usedQuestionIds ?? [];
    const question = getRandomQuestionForPrinciple(principleNo, usedQuestionIds);
    return question ? mapQuestion(question) : null;
  }, []);

  const payRent = useCallback((stateToUpdate: GameState, payerId: string, ownerId: string, principle: PrincipleConfig) => {
    const payer = stateToUpdate.players.find((player) => player.id === payerId);
    const owner = stateToUpdate.players.find((player) => player.id === ownerId);
    if (!payer || !owner) return stateToUpdate;

    const rent = owner.inJail ? 0 : rentFor(stateToUpdate, principle, ownerId, payerId);
    const amountToOwner = Math.min(rent, Math.max(0, payer.credits));
    const players = stateToUpdate.players.map((player) => {
      if (player.id === payerId) return { ...player, credits: player.credits - rent };
      if (player.id === ownerId) return { ...player, credits: player.credits + amountToOwner };
      return player;
    });
    const rentNote = owner.inJail
      ? "No rent was due because the owner is in DPB Hearing."
      : `${payer.name} paid ₹${amountToOwner} rent to ${owner.name}.`;
    return resolveBankruptcies({
      ...stateToUpdate,
      players,
      message: `${payer.name} failed the audit. ${rentNote}`,
    });
  }, []);

  const settleLanding = useCallback(
    (player: Player) => {
      const tile = BOARD_TILES[player.position];
      const isLocalTurn = player.id === localPlayerId;

      if (tile.type === "principle") {
        const principle = principleAt(player.position);
        if (!principle) {
          setState((currentState) =>
            currentState ? { ...currentState, phase: "turn_end" } : currentState,
          );
          completeTurn(isLocalTurn, 600);
          return;
        }

        const ownerId = stateRef.current?.propertyOwners[principle.principleNo];
        if (!ownerId) {
          if (isLocalTurn) {
            const question = fetchQuestion(principle.principleNo);
            if (question) {
              setState((currentState) =>
                currentState
                  ? {
                      ...currentState,
                      phase: "mcq",
                      activeMcq: {
                        question,
                        principleNo: principle.principleNo,
                        principleName: principle.name,
                        mode: "buy",
                      },
                      lastMcqResult: null,
                      pendingBuy: { principle },
                      pendingRent: null,
                      pendingOwn: null,
                      pendingBuild: null,
                      message: `Answer correctly to earn ₹${BUY_QUESTION_BOUNTY} and unlock ${principle.name}.`,
                    }
                  : currentState,
              );
              return;
            }
          }

          setState((currentState) => {
            if (!currentState) return currentState;
            const correct = Math.random() < 0.55;
            if (!correct) {
              return {
                ...currentState,
                phase: "turn_end",
                message: `${player.name} missed the question. ${principle.name} remains unowned.`,
              };
            }
            const buyer = currentState.players.find((candidate) => candidate.id === player.id);
            if (!buyer) return currentState;
            const canBuy = buyer.credits + BUY_QUESTION_BOUNTY >= principle.price;
            const players = currentState.players.map((candidate) =>
              candidate.id === player.id
                ? {
                    ...candidate,
                    credits:
                      candidate.credits +
                      BUY_QUESTION_BOUNTY -
                      (canBuy ? principle.price : 0),
                  }
                : candidate,
            );
            return {
              ...currentState,
              players,
              propertyOwners: canBuy
                ? { ...currentState.propertyOwners, [principle.principleNo]: player.id }
                : currentState.propertyOwners,
              phase: "turn_end",
              message: canBuy
                ? `${player.name} answered correctly and acquired ${principle.name}.`
                : `${player.name} answered correctly but could not afford ${principle.name}.`,
            };
          });
          completeTurn(isLocalTurn, 1100);
          return;
        }

        if (ownerId === player.id) {
          // Trigger MCQ for owned tile negotiation
          if (isLocalTurn) {
            const question = fetchQuestion(principle.principleNo);
            if (question) {
              setState((currentState) =>
                currentState
                  ? {
                      ...currentState,
                      phase: "mcq",
                      activeMcq: {
                        question,
                        principleNo: principle.principleNo,
                        principleName: principle.name,
                        mode: "own_tile",
                      },
                      lastMcqResult: null,
                      pendingSell: { principle, ownerId: player.id },
                      pendingBuy: null,
                      pendingRent: null,
                      pendingOwn: null,
                      pendingBuild: null,
                      message: `You own ${principle.name}. Answer correctly to have a chance to sell, or wrong answer decreases rent.`,
                    }
                  : currentState,
              );
              return;
            }
          }

          // Auto-pass for non-local turns or no question available
          if (canBuildLayer(stateRef.current!, player.id, principle)) {
            setState((currentState) =>
              currentState
                ? {
                    ...currentState,
                    phase: "build",
                    pendingBuild: { principle },
                    pendingBuy: null,
                    pendingRent: null,
                    pendingOwn: null,
                    pendingSell: null,
                    message: `You may build one Compliance Layer on ${principle.name}.`,
                  }
                : currentState,
            );
            completeTurn(isLocalTurn, 600);
            return;
          }

          setState((currentState) =>
            currentState
              ? {
                  ...currentState,
                  phase: "turn_end",
                  pendingBuild: null,
                  pendingSell: null,
                  message: `${player.name} revisits ${principle.name}.`,
                }
              : currentState,
          );
          completeTurn(isLocalTurn, 600);
          return;
        }

        if (isLocalTurn) {
          const question = fetchQuestion(principle.principleNo);
          if (question) {
            setState((currentState) =>
              currentState
                ? {
                    ...currentState,
                    phase: "mcq",
                    activeMcq: {
                      question,
                      principleNo: principle.principleNo,
                      principleName: principle.name,
                      mode: "rent_dispute",
                    },
                    lastMcqResult: null,
                    pendingRent: { principle, ownerId },
                    pendingBuy: null,
                    pendingOwn: null,
                    pendingBuild: null,
                    message: `Answer correctly to pass audit and avoid rent on ${principle.name}.`,
                  }
                : currentState,
            );
            return;
          }
        }

        setState((currentState) => {
          if (!currentState) return currentState;
          const correct = Math.random() < 0.55;
          if (correct) {
            return {
              ...currentState,
              phase: "turn_end",
              message: `${player.name} passed audit on ${principle.name} and paid no rent.`,
            };
          }
          const paidState = payRent(currentState, player.id, ownerId, principle);
          return paidState.phase === "ended" ? paidState : { ...paidState, phase: "turn_end" };
        });
        completeTurn(isLocalTurn, 1300);
        return;
      }

      if (tile.type === "tax") {
        setState((currentState) => {
          if (!currentState) return currentState;
          const players = currentState.players.map((candidate) =>
            candidate.id === player.id
              ? { ...candidate, credits: candidate.credits - tile.amount }
              : candidate,
          );
          return resolveBankruptcies({
            ...currentState,
            players,
            phase: "turn_end",
            penaltyPot: (currentState.penaltyPot ?? 0) + tile.amount,
            message: `${player.name} paid ₹${tile.amount}. The Free Audit pot is now ₹${
              (currentState.penaltyPot ?? 0) + tile.amount
            }.`,
          });
        });
        completeTurn(isLocalTurn, 1100);
        return;
      }

      if (tile.type === "free_audit") {
        setState((currentState) => {
          if (!currentState) return currentState;
          const pot = currentState.penaltyPot ?? 0;
          const players = currentState.players.map((candidate) =>
            candidate.id === player.id ? { ...candidate, credits: candidate.credits + pot } : candidate,
          );
          return {
            ...currentState,
            players,
            phase: "turn_end",
            penaltyPot: 0,
            message:
              pot > 0
                ? `${player.name} collected ₹${pot} from Free Audit.`
                : `${player.name} passed Free Audit with no penalties to collect.`,
          };
        });
        completeTurn(isLocalTurn, 900);
        return;
      }

      if (tile.type === "go_to_jail") {
        setState((currentState) => {
          if (!currentState) return currentState;
          const players = currentState.players.map((candidate) =>
            candidate.id === player.id
              ? {
                  ...candidate,
                  position: 10,
                  inJail: true,
                  jailTurnsRemaining: JAIL_MAX_ATTEMPTS,
                }
              : candidate,
          );
          return {
            ...currentState,
            players,
            phase: "turn_end",
            message: `${player.name} was sent to DPB Hearing.`,
          };
        });
        completeTurn(isLocalTurn, 1100);
        return;
      }

      if (tile.type === "regulator") {
        const card = drawCard();
        setState((currentState) =>
          currentState
            ? {
                ...currentState,
                phase: "regulator",
                activeCard: card,
                message: `Regulator card: ${card.title}`,
              }
            : currentState,
        );
        return;
      }

      setState((currentState) =>
        currentState
          ? { ...currentState, phase: "turn_end", message: `${player.name} is just visiting.` }
          : currentState,
      );
      completeTurn(isLocalTurn, 900);
    },
    [completeTurn, fetchQuestion, localPlayerId, payRent],
  );

  const movePlayer = useCallback(
    (playerId: string, steps: number) => {
      let landedSnapshot: Player | null = null;

      setState((currentState) => {
        if (!currentState) return currentState;
        const players = currentState.players.map((player) => {
          if (player.id !== playerId) return player;
          const rawPosition = player.position + steps;
          const position = rawPosition % currentState.board.length;
          const passedStart = rawPosition >= currentState.board.length;
          const updatedPlayer = {
            ...player,
            position,
            credits: passedStart ? player.credits + PASS_START_BONUS : player.credits,
          };
          landedSnapshot = updatedPlayer;
          return updatedPlayer;
        });
        return { ...currentState, players, phase: "moving" };
      });

      const delay = Math.max(600, steps * 140 + 300);
      setTimeout(() => {
        if (landedSnapshot) {
          settleLanding(landedSnapshot);
        }
      }, delay);
    },
    [settleLanding],
  );

  const rollDice = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.phase !== "idle") return;
    const currentPlayer = currentState.players.find(
      (player) => player.id === currentState.currentPlayerId,
    );
    if (!currentPlayer || currentPlayer.isEliminated) return;

    setState((stateToUpdate) => (stateToUpdate ? { ...stateToUpdate, phase: "rolling" } : stateToUpdate));
    setTimeout(() => {
      const roll = 1 + Math.floor(Math.random() * 6);
      const playerId = stateRef.current?.currentPlayerId ?? currentPlayer.id;
      let shouldMove = true;
      let shouldAdvance = false;

      setState((stateToUpdate) => {
        if (!stateToUpdate) return stateToUpdate;
        const player = stateToUpdate.players.find((candidate) => candidate.id === playerId);
        if (!player) return stateToUpdate;

        if (player.inJail) {
          if (player.hasJailFreeCard) {
            const players = stateToUpdate.players.map((candidate) =>
              candidate.id === player.id
                ? {
                    ...candidate,
                    inJail: false,
                    hasJailFreeCard: false,
                    jailTurnsRemaining: 0,
                  }
                : candidate,
            );
            return {
              ...stateToUpdate,
              players,
              lastRoll: roll,
              message: `${player.name} used a DPB free card and left the hearing.`,
            };
          }

          if (roll === 6) {
            const players = stateToUpdate.players.map((candidate) =>
              candidate.id === player.id
                ? { ...candidate, inJail: false, jailTurnsRemaining: 0 }
                : candidate,
            );
            return {
              ...stateToUpdate,
              players,
              lastRoll: roll,
              message: `${player.name} rolled a 6 and left DPB Hearing.`,
            };
          }

          const attemptsLeft = player.jailTurnsRemaining - 1;
          if (attemptsLeft <= 0) {
            const players = stateToUpdate.players.map((candidate) =>
              candidate.id === player.id
                ? {
                    ...candidate,
                    inJail: false,
                    jailTurnsRemaining: 0,
                    credits: candidate.credits - JAIL_FINE,
                  }
                : candidate,
            );
            return resolveBankruptcies({
              ...stateToUpdate,
              players,
              lastRoll: roll,
              message: `${player.name} paid ₹${JAIL_FINE} after three DPB attempts and moved on.`,
            });
          }

          shouldMove = false;
          shouldAdvance = true;
          const players = stateToUpdate.players.map((candidate) =>
            candidate.id === player.id
              ? { ...candidate, jailTurnsRemaining: attemptsLeft }
              : candidate,
          );
          return {
            ...stateToUpdate,
            players,
            phase: "turn_end",
            lastRoll: roll,
            message: `${player.name} remains in DPB Hearing (${attemptsLeft} attempt${
              attemptsLeft === 1 ? "" : "s"
            } left).`,
          };
        }

        return {
          ...stateToUpdate,
          lastRoll: roll,
        };
      });

      if (shouldAdvance) {
        completeTurn(currentPlayer.id === localPlayerId, 900);
        return;
      }
      if (shouldMove) setTimeout(() => movePlayer(playerId, roll), 700);
    }, 700);
  }, [completeTurn, localPlayerId, movePlayer]);

  const answerMcq = useCallback(
    (picked: "A" | "B" | "C" | "D") => {
      const currentState = stateRef.current;
      if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "mcq")
        return;

      setState((stateToUpdate) => {
        if (!stateToUpdate?.activeMcq) return stateToUpdate;
        const activeMcq = stateToUpdate.activeMcq;
        const isCorrect = picked === activeMcq.question.correct;
        const lastMcqResult = {
          principleName: activeMcq.principleName,
          picked,
          correctAnswer: activeMcq.question.correct,
          wasCorrect: isCorrect,
          explanation: activeMcq.question.explanation,
        };
        const usedQuestionIds = [
          ...(stateToUpdate.usedQuestionIds ?? []),
          activeMcq.question.id,
        ];

        if (stateToUpdate.pendingBuy) {
          const { principle } = stateToUpdate.pendingBuy;
          if (isCorrect) {
            const players = stateToUpdate.players.map((player) =>
              player.id === stateToUpdate.currentPlayerId
                ? { ...player, credits: player.credits + BUY_QUESTION_BOUNTY }
                : player,
            );
            return {
              ...stateToUpdate,
              players,
              usedQuestionIds,
              phase: "purchase",
              activeMcq: null,
              lastMcqResult,
              pendingBuy: { principle },
              message: `Correct. You earned ₹${BUY_QUESTION_BOUNTY}. Buy ${principle.name} for ₹${principle.price}?`,
            };
          }
          return {
            ...stateToUpdate,
            usedQuestionIds,
            phase: "turn_end",
            activeMcq: null,
            lastMcqResult,
            pendingBuy: null,
            message: `Incorrect. ${principle.name} remains unowned. Correct answer: ${activeMcq.question.correct}.`,
          };
        }

        if (stateToUpdate.pendingSell) {
          const { principle, ownerId } = stateToUpdate.pendingSell;
          if (isCorrect) {
            // Player answered correctly - unlock sell option
            return {
              ...stateToUpdate,
              usedQuestionIds,
              phase: "turn_end",
              activeMcq: null,
              lastMcqResult,
              pendingSell: { principle, ownerId },
              message: `Correct! You may sell ${principle.name} for ₹${principle.price}. Would you like to sell?`,
            };
          }

          // Wrong answer - decrease rent by 50%
          const currentRent = stateToUpdate.rentOverrides?.[principle.principleNo]?.[ownerId];
          let newRent = currentRent !== undefined ? currentRent : rentFor(stateToUpdate, principle, ownerId, ownerId);

          // Reduce rent by 50% each wrong answer
          const nextRent = Math.floor(newRent / 2);

          // Check if rent reached zero - lose ownership
          if (nextRent === 0) {
            const propertyOwners = { ...stateToUpdate.propertyOwners };
            delete propertyOwners[principle.principleNo];
            const rentOverrides = { ...stateToUpdate.rentOverrides };
            if (rentOverrides[principle.principleNo]) {
              delete rentOverrides[principle.principleNo][ownerId];
            }
            return {
              ...stateToUpdate,
              usedQuestionIds,
              phase: "turn_end",
              activeMcq: null,
              lastMcqResult,
              pendingSell: null,
              propertyOwners,
              rentOverrides,
              message: `Incorrect. Rent on ${principle.name} reached zero. You lost ownership!`,
            };
          }

          // Update rent override
          const rentOverrides = {
            ...stateToUpdate.rentOverrides,
            [principle.principleNo]: {
              ...(stateToUpdate.rentOverrides?.[principle.principleNo] ?? {}),
              [ownerId]: nextRent,
            },
          };

          return {
            ...stateToUpdate,
            usedQuestionIds,
            phase: "turn_end",
            activeMcq: null,
            lastMcqResult,
            pendingSell: null,
            rentOverrides,
            message: `Incorrect. Rent on ${principle.name} reduced from ₹${newRent} to ₹${nextRent}.`,
          };
        }

        if (stateToUpdate.pendingRent) {
          const { principle, ownerId } = stateToUpdate.pendingRent;
          if (isCorrect) {
            return {
              ...stateToUpdate,
              usedQuestionIds,
              phase: "turn_end",
              activeMcq: null,
              lastMcqResult,
              pendingRent: null,
              message: `Correct. You passed audit and paid no rent on ${principle.name}.`,
            };
          }
          const paidState = payRent(stateToUpdate, stateToUpdate.currentPlayerId, ownerId, principle);
          return {
            ...paidState,
            usedQuestionIds,
            phase: paidState.phase === "ended" ? "ended" : "turn_end",
            activeMcq: null,
            lastMcqResult,
            pendingRent: null,
          };
        }

        return {
          ...stateToUpdate,
          usedQuestionIds,
          phase: "turn_end",
          activeMcq: null,
          lastMcqResult,
          pendingBuy: null,
          pendingRent: null,
          pendingOwn: null,
          pendingSell: null,
        };
      });
    },
    [localPlayerId, payRent],
  );

  const buyProperty = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "purchase")
      return;

    setState((stateToUpdate) => {
      if (!stateToUpdate?.pendingBuy) return stateToUpdate;
      const { principle } = stateToUpdate.pendingBuy;
      const buyer = stateToUpdate.players.find((player) => player.id === stateToUpdate.currentPlayerId);
      if (!buyer || buyer.credits < principle.price) {
        return {
          ...stateToUpdate,
          phase: "turn_end",
          pendingBuy: null,
          message: `Not enough credits to buy ${principle.name}.`,
        };
      }
      const players = stateToUpdate.players.map((player) =>
        player.id === buyer.id ? { ...player, credits: player.credits - principle.price } : player,
      );
      return {
        ...stateToUpdate,
        players,
        propertyOwners: { ...stateToUpdate.propertyOwners, [principle.principleNo]: buyer.id },
        phase: "turn_end",
        pendingBuy: null,
        message: `${buyer.name} acquired ${principle.name}.`,
      };
    });
  }, [localPlayerId]);

  const sellProperty = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "turn_end")
      return;

    setState((stateToUpdate) => {
      if (!stateToUpdate?.pendingSell) return stateToUpdate;
      const { principle, ownerId } = stateToUpdate.pendingSell;
      const seller = stateToUpdate.players.find((player) => player.id === ownerId);
      if (!seller) return stateToUpdate;

      const propertyOwners = { ...stateToUpdate.propertyOwners };
      delete propertyOwners[principle.principleNo];

      // Clear rent overrides for this property
      const rentOverrides = { ...stateToUpdate.rentOverrides };
      if (rentOverrides[principle.principleNo]) {
        delete rentOverrides[principle.principleNo];
      }

      const players = stateToUpdate.players.map((player) =>
        player.id === seller.id
          ? { ...player, credits: player.credits + principle.price }
          : player,
      );

      return {
        ...stateToUpdate,
        players,
        propertyOwners,
        rentOverrides,
        phase: "turn_end",
        pendingSell: null,
        message: `${seller.name} sold ${principle.name} for ₹${principle.price}.`,
      };
    });
  }, [localPlayerId]);

  const skipSell = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "turn_end")
      return;
    setState((stateToUpdate) =>
      stateToUpdate?.pendingSell
        ? {
            ...stateToUpdate,
            pendingSell: null,
            message: `${stateToUpdate.pendingSell.principle.name} remains owned.`,
          }
        : stateToUpdate,
    );
  }, [localPlayerId]);

  const skipPurchase = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "purchase")
      return;
    setState((stateToUpdate) =>
      stateToUpdate?.pendingBuy
        ? {
            ...stateToUpdate,
            phase: "turn_end",
            pendingBuy: null,
            message: `${stateToUpdate.pendingBuy.principle.name} remains unowned.`,
          }
        : stateToUpdate,
    );
  }, [localPlayerId]);

  const buildLayer = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "build")
      return;

    setState((stateToUpdate) => {
      if (!stateToUpdate?.pendingBuild) return stateToUpdate;
      const { principle } = stateToUpdate.pendingBuild;
      const player = stateToUpdate.players.find((candidate) => candidate.id === stateToUpdate.currentPlayerId);
      if (!player || !canBuildLayer(stateToUpdate, player.id, principle)) {
        return {
          ...stateToUpdate,
          phase: "turn_end",
          pendingBuild: null,
          message: `Cannot build on ${principle.name} right now.`,
        };
      }
      const currentLayers = player.layers[principle.principleNo] ?? 0;
      const players = stateToUpdate.players.map((candidate) =>
        candidate.id === player.id
          ? {
              ...candidate,
              credits: candidate.credits - principle.layerCost,
              layers: { ...candidate.layers, [principle.principleNo]: currentLayers + 1 },
            }
          : candidate,
      );
      return {
        ...stateToUpdate,
        players,
        phase: "turn_end",
        pendingBuild: null,
        message: `${player.name} built a Compliance Layer on ${principle.name}.`,
      };
    });
  }, [localPlayerId]);

  const skipBuild = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || currentState.currentPlayerId !== localPlayerId || currentState.phase !== "build")
      return;
    setState((stateToUpdate) =>
      stateToUpdate?.pendingBuild
        ? {
            ...stateToUpdate,
            phase: "turn_end",
            pendingBuild: null,
            message: `${stateToUpdate.pendingBuild.principle.name} was left unchanged.`,
          }
        : stateToUpdate,
    );
  }, [localPlayerId]);

  const endTurn = useCallback(() => {
    const currentState = stateRef.current;
    if (
      !currentState ||
      currentState.currentPlayerId !== localPlayerId ||
      currentState.phase !== "turn_end"
    ) {
      return;
    }
    advanceTurn();
  }, [advanceTurn, localPlayerId]);

  const applyRegulatorCard = useCallback(
    (forcedPlayerId?: string) => {
      const currentState = stateRef.current;
      if (!currentState || currentState.phase !== "regulator") return;
      if (!forcedPlayerId && currentState.currentPlayerId !== localPlayerId) return;

      setState((stateToUpdate) => {
        if (!stateToUpdate?.activeCard) return stateToUpdate;
        const card: RegulatorCard = stateToUpdate.activeCard;
        const effect = card.effect;
        const playerId = forcedPlayerId ?? stateToUpdate.currentPlayerId;
        const player = stateToUpdate.players.find((candidate) => candidate.id === playerId);
        if (!player) return stateToUpdate;

        let players = stateToUpdate.players;
        let message = card.body;

        if (effect.type === "credits") {
          players = players.map((candidate) =>
            candidate.id === player.id
              ? { ...candidate, credits: candidate.credits + effect.amount }
              : candidate,
          );
        } else if (effect.type === "pay_to_each") {
          const opponents = players.filter(
            (candidate) => candidate.id !== player.id && !candidate.isEliminated,
          );
          const total = effect.amount * opponents.length;
          players = players.map((candidate) => {
            if (candidate.id === player.id) return { ...candidate, credits: candidate.credits - total };
            if (!candidate.isEliminated) return { ...candidate, credits: candidate.credits + effect.amount };
            return candidate;
          });
        } else if (effect.type === "collect_from_each") {
          const opponents = players.filter(
            (candidate) => candidate.id !== player.id && !candidate.isEliminated,
          );
          players = players.map((candidate) => {
            if (candidate.id === player.id) {
              return { ...candidate, credits: candidate.credits + effect.amount * opponents.length };
            }
            if (!candidate.isEliminated) return { ...candidate, credits: candidate.credits - effect.amount };
            return candidate;
          });
        } else if (effect.type === "move") {
          players = players.map((candidate) =>
            candidate.id === player.id
              ? {
                  ...candidate,
                  position: effect.to,
                  credits:
                    effect.to === 0 ? candidate.credits + PASS_START_BONUS : candidate.credits,
                }
              : candidate,
          );
        } else if (effect.type === "move_relative") {
          players = players.map((candidate) =>
            candidate.id === player.id
              ? {
                  ...candidate,
                  position: (candidate.position + effect.steps) % stateToUpdate.board.length,
                  credits:
                    candidate.position + effect.steps >= stateToUpdate.board.length
                      ? candidate.credits + PASS_START_BONUS
                      : candidate.credits,
                }
              : candidate,
          );
        } else if (effect.type === "jail") {
          players = players.map((candidate) =>
            candidate.id === player.id
              ? {
                  ...candidate,
                  position: 10,
                  inJail: true,
                  jailTurnsRemaining: JAIL_MAX_ATTEMPTS,
                }
              : candidate,
          );
        } else if (effect.type === "jail_free_card") {
          players = players.map((candidate) =>
            candidate.id === player.id ? { ...candidate, hasJailFreeCard: true } : candidate,
          );
        } else if (effect.type === "skip_next_turn") {
          players = players.map((candidate) =>
            candidate.id === player.id ? { ...candidate, skipNextTurn: true } : candidate,
          );
        } else if (player.inJail) {
          players = players.map((candidate) =>
            candidate.id === player.id
              ? { ...candidate, inJail: false, jailTurnsRemaining: 0 }
              : candidate,
          );
          message = `${player.name} was released from DPB Hearing.`;
        }

        return resolveBankruptcies({
          ...stateToUpdate,
          players,
          activeCard: null,
          phase: "turn_end",
          message,
        });
      });
      completeTurn(!forcedPlayerId, 800);
    },
    [completeTurn, localPlayerId],
  );

  const canRoll = useMemo(() => {
    if (!state || state.phase !== "idle") return false;
    return state.currentPlayerId === localPlayerId;
  }, [localPlayerId, state]);

  return {
    state,
    rollDice,
    answerMcq,
    acknowledgeCard: applyRegulatorCard,
    buyProperty,
    skipPurchase,
    sellProperty,
    skipSell,
    buildLayer,
    skipBuild,
    endTurn,
    leaveGame,
    reset,
    canRoll,
  };
}
