import type { BoardTile, PrincipleConfig } from "./constants";

export interface Player {
  id: string;
  name: string;
  avatarId: number;
  credits: number;
  position: number;
  isHuman: boolean;
  inJail: boolean;
  jailTurnsRemaining: number;
  hasJailFreeCard?: boolean;
  skipNextTurn?: boolean;
  isEliminated: boolean;
  /** principleNo -> layers (0-3) */
  layers: Record<number, number>;
}

export interface PropertyOwnership {
  principleNo: number;
  ownerId: string;
}

export interface ActiveMcq {
  question: {
    id: string;
    text: string;
    options: { key: "A" | "B" | "C" | "D"; text: string }[];
    correct: "A" | "B" | "C" | "D";
    explanation: string | null;
  };
  principleNo: number;
  principleName: string;
  mode: "buy" | "rent_dispute" | "audit" | "general" | "own_tile";
}

export interface RegulatorCard {
  title: string;
  body: string;
  effect:
    | { type: "credits"; amount: number }
    | { type: "collect_from_each"; amount: number }
    | { type: "pay_to_each"; amount: number }
    | { type: "move"; to: number }
    | { type: "move_relative"; steps: number }
    | { type: "jail" }
    | { type: "jail_free_card" }
    | { type: "skip_next_turn" }
    | { type: "none" };
}

export interface McqResult {
  principleName: string;
  picked: "A" | "B" | "C" | "D";
  correctAnswer: "A" | "B" | "C" | "D";
  wasCorrect: boolean;
  explanation: string | null;
}

export type Phase =
  | "idle"
  | "rolling"
  | "moving"
  | "mcq"
  | "purchase"
  | "build"
  | "regulator"
  | "turn_end"
  | "ended";

export interface GameState {
  board: BoardTile[];
  players: Player[];
  currentPlayerId: string;
  propertyOwners: Record<number, string>; // principleNo -> playerId
  /** Rent overrides per principle per player: principleNo -> playerId -> rent amount */
  rentOverrides?: Record<number, Record<string, number>>;
  phase: Phase;
  lastRoll: number | null;
  message: string;
  activeMcq: ActiveMcq | null;
  lastMcqResult?: McqResult | null;
  activeCard: RegulatorCard | null;
  winner: Player | null;
  penaltyPot?: number;
  usedQuestionIds?: string[];
  /** Pending action context after MCQ */
  pendingBuy?: { principle: PrincipleConfig } | null;
  pendingRent?: { principle: PrincipleConfig; ownerId: string } | null;
  pendingOwn?: { principle: PrincipleConfig } | null;
  pendingBuild?: { principle: PrincipleConfig } | null;
  pendingSell?: { principle: PrincipleConfig; ownerId: string } | null;
}
