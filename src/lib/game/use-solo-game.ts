import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BOARD_TILES,
  JAIL_TURNS,
  PASS_START_BONUS,
  PRINCIPLES,
  STARTING_CREDITS,
  type PrincipleConfig,
} from "./constants";
import type { ActiveMcq, GameState, Player } from "./engine-types";
import { drawCard } from "./regulator-cards";

interface Opts {
  enabled: boolean;
  humanName: string;
  humanAvatar: number;
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

function principleAt(tileIndex: number): PrincipleConfig | undefined {
  return PRINCIPLES.find((p) => p.tileIndex === tileIndex);
}

function rentFor(p: PrincipleConfig, layers: number) {
  if (layers <= 0) return p.baseRent;
  if (layers === 1) return p.layer1Rent;
  if (layers === 2) return p.layer2Rent;
  return p.layer3Rent;
}

function mapQuestion(q: { id: string; question_text: string; option_a: string; option_b: string; option_c: string; option_d: string; correct_answer: string; explanation: string | null }): ActiveMcq["question"] {
  return {
    id: q.id,
    text: q.question_text,
    options: [
      { key: "A", text: q.option_a },
      { key: "B", text: q.option_b },
      { key: "C", text: q.option_c },
      { key: "D", text: q.option_d },
    ],
    correct: q.correct_answer as "A" | "B" | "C" | "D",
    explanation: q.explanation,
  };
}

export function useSoloGame({ enabled, humanName, humanAvatar }: Opts) {
  const [state, setState] = useState<GameState | null>(null);
  const initRef = useRef(false);
  const stateRef = useRef<GameState | null>(null);
  useEffect(() => { stateRef.current = state; }, [state]);

  const init = useCallback(() => {
    const players: Player[] = [
      makePlayer("human", humanName || "You", humanAvatar, true),
      makePlayer("cpu1", COMPUTERS[0].name, COMPUTERS[0].avatarId, false),
      makePlayer("cpu2", COMPUTERS[1].name, COMPUTERS[1].avatarId, false),
    ];
    setState({
      board: BOARD_TILES,
      players,
      currentPlayerId: "human",
      propertyOwners: {},
      phase: "idle",
      lastRoll: null,
      message: "Your turn — roll the dice to begin.",
      activeMcq: null,
      activeCard: null,
      winner: null,
      pendingBuy: null,
    });
  }, [humanName, humanAvatar]);

  useEffect(() => {
    if (enabled && !initRef.current) {
      initRef.current = true;
      init();
    }
  }, [enabled, init]);

  const reset = useCallback(() => {
    initRef.current = false;
    setState(null);
    setTimeout(() => { initRef.current = true; init(); }, 50);
  }, [init]);

  const fetchQuestion = useCallback(async (principleNo: number): Promise<ActiveMcq["question"] | null> => {
    const { data } = await supabase.from("questions").select("*").eq("principle_no", principleNo).limit(50);
    let pool = data ?? [];
    if (pool.length === 0) {
      const { data: any2 } = await supabase.from("questions").select("*").limit(50);
      pool = any2 ?? [];
    }
    if (pool.length === 0) return null;
    const q = pool[Math.floor(Math.random() * pool.length)];
    return mapQuestion(q);
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
        if (!cand.isEliminated) { next = (idx + i) % s.players.length; break; }
      }
      const nextPlayer = s.players[next];
      return {
        ...s,
        currentPlayerId: nextPlayer.id,
        phase: "idle",
        lastRoll: null,
        message: nextPlayer.isHuman ? "Your turn — roll the dice." : `${nextPlayer.name} is thinking…`,
        activeMcq: null,
        activeCard: null,
        pendingBuy: null,
      };
    });
  }, []);

  const settleLanding = useCallback(async (player: Player) => {
    const tile = BOARD_TILES[player.position];
    if (tile.type === "principle" && tile.principleNo) {
      const principle = principleAt(player.position)!;
      const ownerId = stateRef.current?.propertyOwners[principle.principleNo];
      if (!ownerId) {
        if (player.isHuman) {
          const q = await fetchQuestion(principle.principleNo);
          if (q) {
            setState((s) => s ? ({
              ...s,
              phase: "mcq",
              activeMcq: { question: q, principleNo: principle.principleNo, principleName: principle.name, mode: "buy" },
              pendingBuy: { principle },
              message: `Answer correctly to acquire ${principle.name} for ₹${principle.price}.`,
            }) : s);
            return;
          }
        } else if (player.credits >= principle.price) {
          setState((s) => {
            if (!s) return s;
            const players = s.players.map((p) => p.id === player.id ? { ...p, credits: p.credits - principle.price } : p);
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
        setState((s) => {
          if (!s) return s;
          const me = s.players.find((p) => p.id === player.id)!;
          const layers = me.layers[principle.principleNo] ?? 0;
          if (layers < 3 && me.credits >= principle.layerCost) {
            const players = s.players.map((p) => p.id === me.id ? {
              ...p,
              credits: p.credits - principle.layerCost,
              layers: { ...p.layers, [principle.principleNo]: layers + 1 },
            } : p);
            return { ...s, players, message: `${me.name} added a compliance layer to ${principle.name}.` };
          }
          return { ...s, message: `${me.name} revisits ${principle.name}.` };
        });
        setTimeout(advanceTurn, 900);
        return;
      }
      setState((s) => {
        if (!s) return s;
        const owner = s.players.find((p) => p.id === ownerId)!;
        const layers = owner.layers[principle.principleNo] ?? 0;
        const rent = rentFor(principle, layers);
        const me = s.players.find((p) => p.id === player.id)!;
        const pay = Math.min(rent, me.credits);
        const players = s.players.map((p) => {
          if (p.id === me.id) {
            const credits = p.credits - pay;
            return { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated };
          }
          if (p.id === owner.id) return { ...p, credits: p.credits + pay };
          return p;
        });
        return { ...s, players, message: `${me.name} paid ₹${pay} rent on ${principle.name} to ${owner.name}.` };
      });
      setTimeout(advanceTurn, 1200);
      return;
    }
    if (tile.type === "tax" && tile.amount) {
      setState((s) => {
        if (!s) return s;
        const me = s.players.find((p) => p.id === player.id)!;
        const credits = me.credits - tile.amount!;
        const players = s.players.map((p) => p.id === me.id ? { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated } : p);
        return { ...s, players, message: `${me.name} paid ₹${tile.amount} — ${tile.name}.` };
      });
      setTimeout(advanceTurn, 1100);
      return;
    }
    if (tile.type === "go_to_jail") {
      setState((s) => {
        if (!s) return s;
        const players = s.players.map((p) => p.id === player.id ? { ...p, position: 10, inJail: true, jailTurnsRemaining: JAIL_TURNS } : p);
        return { ...s, players, message: `${player.name} sent to DPB Hearing.` };
      });
      setTimeout(advanceTurn, 1100);
      return;
    }
    if (tile.type === "regulator") {
      const card = drawCard();
      setState((s) => s ? ({ ...s, phase: "regulator", activeCard: card, message: `Regulator card: ${card.title}` }) : s);
      return;
    }
    if (tile.type === "free_audit") {
      setState((s) => {
        if (!s) return s;
        const players = s.players.map((p) => p.id === player.id ? { ...p, credits: p.credits + 100 } : p);
        return { ...s, players, message: `${player.name} passed Free Audit (+₹100).` };
      });
    } else {
      setState((s) => s ? { ...s, message: `${player.name} rests.` } : s);
    }
    setTimeout(advanceTurn, 900);
  }, [advanceTurn, fetchQuestion]);

  const movePlayer = useCallback((playerId: string, steps: number) => {
    setState((s) => {
      if (!s) return s;
      const players = s.players.map((p) => {
        if (p.id !== playerId) return p;
        const newPos = (p.position + steps) % s.board.length;
        const passedStart = p.position + steps >= s.board.length;
        return { ...p, position: newPos, credits: passedStart ? p.credits + PASS_START_BONUS : p.credits };
      });
      return { ...s, players, phase: "moving" };
    });
    setTimeout(() => {
      const cur = stateRef.current?.players.find((p) => p.id === playerId);
      if (cur) settleLanding(cur);
    }, 600);
  }, [settleLanding]);

  const rollDice = useCallback(() => {
    setState((s) => s ? ({ ...s, phase: "rolling" }) : s);
    setTimeout(() => {
      const a = 1 + Math.floor(Math.random() * 6);
      const b = 1 + Math.floor(Math.random() * 6);
      let curId = stateRef.current?.currentPlayerId ?? "human";
      let inJail = false;
      setState((s) => {
        if (!s) return s;
        const player = s.players.find((p) => p.id === s.currentPlayerId)!;
        curId = player.id;
        if (player.inJail) {
          inJail = true;
          const jailTurnsRemaining = player.jailTurnsRemaining - 1;
          const players = s.players.map((p) => p.id === player.id ? { ...p, jailTurnsRemaining, inJail: jailTurnsRemaining > 0 } : p);
          return { ...s, players, lastRoll: [a, b], message: `${player.name} is detained at DPB hearing.` };
        }
        return { ...s, lastRoll: [a, b] };
      });
      if (inJail) {
        setTimeout(advanceTurn, 900);
        return;
      }
      setTimeout(() => movePlayer(curId, a + b), 700);
    }, 700);
  }, [advanceTurn, movePlayer]);

  const answerMcq = useCallback((picked: "A" | "B" | "C" | "D") => {
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
          players = players.map((p) => p.id === buyer.id ? { ...p, credits: p.credits - principle.price } : p);
          propertyOwners = { ...propertyOwners, [principle.principleNo]: buyer.id };
          message = `Correct! You acquired ${principle.name}.`;
        } else if (correct) {
          message = `Correct, but insufficient credits to acquire ${principle.name}.`;
        } else {
          message = `Incorrect. The principle remains unowned. Right answer: ${s.activeMcq.question.correct}.`;
        }
      }
      return { ...s, players, propertyOwners, phase: "turn_end", activeMcq: null, pendingBuy: null, message };
    });
    setTimeout(advanceTurn, 1500);
  }, [advanceTurn]);

  const acknowledgeCard = useCallback(() => {
    setState((s) => {
      if (!s || !s.activeCard) return s;
      const card = s.activeCard;
      let players = s.players;
      const me = s.players.find((p) => p.id === s.currentPlayerId)!;
      if (card.effect.type === "credits") {
        const credits = me.credits + card.effect.amount;
        players = s.players.map((p) => p.id === me.id ? { ...p, credits, isEliminated: credits <= 0 ? true : p.isEliminated } : p);
      } else if (card.effect.type === "move") {
        const to = card.effect.to;
        players = s.players.map((p) => p.id === me.id ? { ...p, position: to, credits: p.credits + (to === 0 ? PASS_START_BONUS : 0) } : p);
      } else if (card.effect.type === "jail") {
        players = s.players.map((p) => p.id === me.id ? { ...p, position: 10, inJail: true, jailTurnsRemaining: JAIL_TURNS } : p);
      }
      return { ...s, players, activeCard: null, phase: "turn_end" };
    });
    setTimeout(advanceTurn, 800);
  }, [advanceTurn]);

  // CPU autoplay
  useEffect(() => {
    if (!state) return;
    const cur = state.players.find((p) => p.id === state.currentPlayerId);
    if (!cur || cur.isHuman) return;
    if (state.phase !== "idle") return;
    const t = setTimeout(() => rollDice(), 1200);
    return () => clearTimeout(t);
  }, [state, rollDice]);

  const canRoll = useMemo(() => {
    if (!state) return false;
    if (state.phase !== "idle") return false;
    const cur = state.players.find((p) => p.id === state.currentPlayerId);
    return !!cur?.isHuman;
  }, [state]);

  return { state, rollDice, answerMcq, acknowledgeCard, reset, canRoll };
}