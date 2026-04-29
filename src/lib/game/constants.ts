export type ColorGroup = "brown" | "lightBlue" | "pink" | "orange";

export interface PrincipleConfig {
  principleNo: number;
  tileIndex: number;
  name: string;
  shortName: string;
  group: ColorGroup;
  price: number;
  baseRent: number;
  layer1Rent: number;
  layer2Rent: number;
  layer3Rent: number;
  layerCost: number;
  description: string;
}

export type BoardTile =
  | { index: number; type: "start"; name: string; subtitle?: string }
  | {
      index: number;
      type: "principle";
      name: string;
      subtitle?: string;
      group: ColorGroup;
      principleNo: number;
    }
  | { index: number; type: "regulator"; name: string; subtitle?: string }
  | { index: number; type: "tax"; name: string; subtitle?: string; amount: number }
  | { index: number; type: "jail_visit"; name: string; subtitle?: string }
  | { index: number; type: "go_to_jail"; name: string; subtitle?: string }
  | { index: number; type: "free_audit"; name: string; subtitle?: string };

export const PRINCIPLES: PrincipleConfig[] = [
  {
    principleNo: 1,
    tileIndex: 1,
    name: "Lawful Processing",
    shortName: "Lawful Proc",
    group: "brown",
    price: 60,
    baseRent: 6,
    layer1Rent: 30,
    layer2Rent: 90,
    layer3Rent: 250,
    layerCost: 50,
    description: "Process personal data only with consent or legitimate uses under the DPDPA.",
  },
  {
    principleNo: 2,
    tileIndex: 3,
    name: "Notice & Transparency",
    shortName: "Notice",
    group: "brown",
    price: 80,
    baseRent: 8,
    layer1Rent: 40,
    layer2Rent: 120,
    layer3Rent: 300,
    layerCost: 50,
    description: "Give clear notices about purpose, contact details, and Data Principal rights.",
  },
  {
    principleNo: 3,
    tileIndex: 6,
    name: "Consent",
    shortName: "Consent",
    group: "lightBlue",
    price: 140,
    baseRent: 12,
    layer1Rent: 60,
    layer2Rent: 180,
    layer3Rent: 450,
    layerCost: 100,
    description: "Consent must be free, specific, informed, unconditional, and unambiguous.",
  },
  {
    principleNo: 4,
    tileIndex: 8,
    name: "Purpose Limitation",
    shortName: "Purpose",
    group: "lightBlue",
    price: 140,
    baseRent: 12,
    layer1Rent: 60,
    layer2Rent: 180,
    layer3Rent: 450,
    layerCost: 100,
    description: "Use personal data only for the purpose disclosed to the Data Principal.",
  },
  {
    principleNo: 5,
    tileIndex: 11,
    name: "Data Minimization",
    shortName: "Minimiz",
    group: "lightBlue",
    price: 160,
    baseRent: 14,
    layer1Rent: 80,
    layer2Rent: 220,
    layer3Rent: 500,
    layerCost: 100,
    description: "Collect only the personal data necessary for the stated purpose.",
  },
  {
    principleNo: 6,
    tileIndex: 13,
    name: "Data Accuracy",
    shortName: "Accuracy",
    group: "pink",
    price: 220,
    baseRent: 18,
    layer1Rent: 90,
    layer2Rent: 270,
    layer3Rent: 700,
    layerCost: 150,
    description: "Keep personal data complete, accurate, and consistent where it is used.",
  },
  {
    principleNo: 7,
    tileIndex: 16,
    name: "Storage Limitation",
    shortName: "Storage",
    group: "pink",
    price: 240,
    baseRent: 20,
    layer1Rent: 100,
    layer2Rent: 300,
    layer3Rent: 750,
    layerCost: 150,
    description: "Erase personal data once the purpose is no longer being served.",
  },
  {
    principleNo: 8,
    tileIndex: 17,
    name: "Security & Integrity",
    shortName: "Security",
    group: "orange",
    price: 300,
    baseRent: 26,
    layer1Rent: 130,
    layer2Rent: 390,
    layer3Rent: 900,
    layerCost: 200,
    description: "Use reasonable safeguards to prevent personal data breaches.",
  },
  {
    principleNo: 9,
    tileIndex: 19,
    name: "Accountability",
    shortName: "Account",
    group: "orange",
    price: 350,
    baseRent: 30,
    layer1Rent: 150,
    layer2Rent: 450,
    layer3Rent: 1000,
    layerCost: 200,
    description: "Demonstrate compliance with DPDPA obligations and fiduciary duties.",
  },
];

const PRINCIPLE_BY_TILE = new Map(PRINCIPLES.map((principle) => [principle.tileIndex, principle]));

export const BOARD_TILES: BoardTile[] = Array.from({ length: 20 }, (_, index) => {
  const principle = PRINCIPLE_BY_TILE.get(index);
  if (principle) {
    return {
      index,
      type: "principle",
      name: `P${principle.principleNo}`,
      subtitle: principle.shortName,
      group: principle.group,
      principleNo: principle.principleNo,
    };
  }

  switch (index) {
    case 0:
      return { index, type: "start", name: "START", subtitle: "Collect ₹200" };
    case 2:
    case 18:
      return { index, type: "regulator", name: "Regulator Card", subtitle: "Draw event" };
    case 4:
      return { index, type: "tax", name: "Penalty", subtitle: "₹100", amount: 100 };
    case 5:
      return { index, type: "free_audit", name: "FREE AUDIT", subtitle: "Collect pot" };
    case 10:
      return { index, type: "jail_visit", name: "DPB VISIT", subtitle: "Hearing tile" };
    case 15:
      return { index, type: "go_to_jail", name: "GO TO DPB", subtitle: "Move to 10" };
    case 7:
      return { index, type: "tax", name: "Penalty", subtitle: "₹150", amount: 150 };
    case 12:
      return { index, type: "tax", name: "Breach Fine", subtitle: "₹200", amount: 200 };
    default:
      return { index, type: "regulator", name: "Regulator Card", subtitle: "Draw event" };
  }
});

export const GROUP_COLORS: Record<ColorGroup, string> = {
  brown: "oklch(0.5 0.08 55)",
  lightBlue: "oklch(0.72 0.11 220)",
  pink: "oklch(0.68 0.16 345)",
  orange: "oklch(0.7 0.16 52)",
};

export const GROUP_LABELS: Record<ColorGroup, string> = {
  brown: "Foundation",
  lightBlue: "Consent Block",
  pink: "Data Lifecycle",
  orange: "Hard Obligations",
};

export const AVATARS = [
  { id: 0, name: "Aarav", color: "oklch(0.65 0.15 30)", emoji: "👨🏽" },
  { id: 1, name: "Vikram", color: "oklch(0.55 0.12 250)", emoji: "🧔🏽" },
  { id: 2, name: "Rohan", color: "oklch(0.6 0.13 145)", emoji: "👨🏽‍💼" },
  { id: 3, name: "Arjun", color: "oklch(0.5 0.14 290)", emoji: "👨🏽‍🎓" },
  { id: 4, name: "Priya", color: "oklch(0.7 0.16 25)", emoji: "👩🏽" },
  { id: 5, name: "Ananya", color: "oklch(0.6 0.13 320)", emoji: "👩🏽‍💼" },
  { id: 6, name: "Meera", color: "oklch(0.65 0.13 180)", emoji: "👩🏽‍🎓" },
  { id: 7, name: "Sneha", color: "oklch(0.7 0.14 80)", emoji: "🧕🏽" },
] as const;

export const STARTING_CREDITS = 1500;
export const PASS_START_BONUS = 200;
export const BUY_QUESTION_BOUNTY = 50;
export const JAIL_FINE = 50;
export const JAIL_MAX_ATTEMPTS = 3;
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 2;

export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${seg()}-${seg()}-${seg()}`;
}
