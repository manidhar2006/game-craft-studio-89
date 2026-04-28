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
  mode: "buy" | "rent_dispute" | "audit" | "general";
}

export interface RegulatorCard {
  title: string;
  body: string;
  effect:
    | { type: "credits"; amount: number }
    | { type: "move"; to: number }
    | { type: "jail" }
    | { type: "none" };
}

export type Phase = "idle" | "rolling" | "moving" | "mcq" | "regulator" | "turn_end" | "ended";

export interface GameState {
  board: BoardTile[];
  players: Player[];
  currentPlayerId: string;
  propertyOwners: Record<number, string>; // principleNo -> playerId
  phase: Phase;
  lastRoll: number | null;
  message: string;
  activeMcq: ActiveMcq | null;
  activeCard: RegulatorCard | null;
  winner: Player | null;
  penaltyPot?: number;
  /** Pending action context after MCQ */
  pendingBuy?: { principle: PrincipleConfig } | null;
  pendingRent?: { principle: PrincipleConfig; ownerId: string } | null;
  pendingOwn?: { principle: PrincipleConfig } | null;
}
