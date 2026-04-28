// DPDPA Compliance Tycoon — Game constants
// Color groups: A=Saffron, B=White, C=Green, D=Navy

export type ColorGroup = "saffron" | "white" | "green" | "navy";
export type TileType =
  | "start"
  | "principle"
  | "regulator"
  | "tax"
  | "free_audit"
  | "jail_visit"
  | "go_to_jail";

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

export const PRINCIPLES: PrincipleConfig[] = [
  { principleNo: 1, tileIndex: 1,  name: "Lawful Processing",        shortName: "Lawful Processing",   group: "saffron", price: 60,  baseRent: 6,  layer1Rent: 30,  layer2Rent: 90,  layer3Rent: 250, layerCost: 50,  description: "Process personal data only with consent or for legitimate uses under §7." },
  { principleNo: 2, tileIndex: 3,  name: "Notice & Transparency",    shortName: "Notice",              group: "white",   price: 80,  baseRent: 8,  layer1Rent: 40,  layer2Rent: 120, layer3Rent: 320, layerCost: 50,  description: "Inform Data Principals about purpose, contact details, and rights at collection." },
  { principleNo: 3, tileIndex: 6,  name: "Consent",                  shortName: "Consent",             group: "green",   price: 140, baseRent: 12, layer1Rent: 60,  layer2Rent: 180, layer3Rent: 500, layerCost: 100, description: "Free, specific, informed, unconditional, and unambiguous consent." },
  { principleNo: 4, tileIndex: 7,  name: "Purpose Limitation",       shortName: "Purpose",             group: "navy",    price: 140, baseRent: 12, layer1Rent: 60,  layer2Rent: 180, layer3Rent: 500, layerCost: 100, description: "Process data only for the specified purpose disclosed in the notice." },
  { principleNo: 5, tileIndex: 9,  name: "Data Minimization",        shortName: "Minimization",        group: "saffron", price: 160, baseRent: 14, layer1Rent: 70,  layer2Rent: 200, layer3Rent: 550, layerCost: 100, description: "Collect only the personal data necessary for the stated purpose." },
  { principleNo: 6, tileIndex: 11, name: "Data Accuracy",            shortName: "Accuracy",            group: "white",   price: 220, baseRent: 18, layer1Rent: 90,  layer2Rent: 250, layer3Rent: 700, layerCost: 150, description: "Ensure personal data is complete, accurate, and consistent." },
  { principleNo: 7, tileIndex: 12, name: "Storage Limitation",       shortName: "Storage",             group: "green",   price: 240, baseRent: 20, layer1Rent: 100, layer2Rent: 300, layer3Rent: 750, layerCost: 150, description: "Erase personal data once the purpose is no longer being served." },
  { principleNo: 8, tileIndex: 14, name: "Security & Integrity",     shortName: "Security",            group: "navy",    price: 300, baseRent: 26, layer1Rent: 130, layer2Rent: 390, layer3Rent: 900, layerCost: 200, description: "Reasonable security safeguards to prevent breaches." },
  { principleNo: 9, tileIndex: 17, name: "Accountability",           shortName: "Accountability",      group: "saffron", price: 350, baseRent: 35, layer1Rent: 175, layer2Rent: 500, layer3Rent: 1100, layerCost: 200, description: "Demonstrate compliance with all DPDPA obligations." },
];

export interface BoardTile {
  index: number;
  type: TileType;
  name: string;
  subtitle?: string;
  group?: ColorGroup;
  amount?: number;
  principleNo?: number;
}

export const BOARD_TILES: BoardTile[] = (() => {
  const tiles: BoardTile[] = [];
  const principleByTile = new Map(PRINCIPLES.map((p) => [p.tileIndex, p]));

  for (let i = 0; i < 20; i++) {
    if (i === 0) tiles.push({ index: 0, type: "start", name: "START", subtitle: "Collect ₹200" });
    else if (i === 5) tiles.push({ index: 5, type: "free_audit", name: "FREE AUDIT", subtitle: "Collect penalty pot" });
    else if (i === 10) tiles.push({ index: 10, type: "jail_visit", name: "DPB HEARING", subtitle: "Just visiting" });
    else if (i === 15) tiles.push({ index: 15, type: "go_to_jail", name: "GO TO HEARING", subtitle: "Skip 2 turns" });
    else if (i === 4) tiles.push({ index: 4, type: "tax", name: "Compliance Penalty", subtitle: "−₹100", amount: 100 });
    else if (i === 16) tiles.push({ index: 16, type: "tax", name: "Compliance Penalty", subtitle: "−₹150", amount: 150 });
    else if (i === 19) tiles.push({ index: 19, type: "tax", name: "Breach Fine", subtitle: "−₹200", amount: 200 });
    else if ([2, 8, 13, 18].includes(i)) tiles.push({ index: i, type: "regulator", name: "Regulator Card", subtitle: "Draw event" });
    else {
      const p = principleByTile.get(i);
      if (p) tiles.push({ index: i, type: "principle", name: `P${p.principleNo}`, subtitle: p.shortName, group: p.group, principleNo: p.principleNo });
      else tiles.push({ index: i, type: "regulator", name: "Regulator Card", subtitle: "Draw event" });
    }
  }
  return tiles;
})();

export const GROUP_COLORS: Record<ColorGroup, string> = {
  saffron: "var(--group-saffron)",
  white: "var(--group-white)",
  green: "var(--group-green)",
  navy: "var(--group-navy)",
};

export const GROUP_LABELS: Record<ColorGroup, string> = {
  saffron: "Foundation",
  white: "Transparency",
  green: "Lifecycle",
  navy: "Purpose & Security",
};

export const AVATARS = [
  { id: 0, name: "Aarav",   color: "oklch(0.65 0.15 30)",  emoji: "👨🏽" },
  { id: 1, name: "Vikram",  color: "oklch(0.55 0.12 250)", emoji: "🧔🏽" },
  { id: 2, name: "Rohan",   color: "oklch(0.6 0.13 145)",  emoji: "👨🏽‍💼" },
  { id: 3, name: "Arjun",   color: "oklch(0.5 0.14 290)",  emoji: "👨🏽‍🎓" },
  { id: 4, name: "Priya",   color: "oklch(0.7 0.16 25)",   emoji: "👩🏽" },
  { id: 5, name: "Ananya",  color: "oklch(0.6 0.13 320)",  emoji: "👩🏽‍💼" },
  { id: 6, name: "Meera",   color: "oklch(0.65 0.13 180)", emoji: "👩🏽‍🎓" },
  { id: 7, name: "Sneha",   color: "oklch(0.7 0.14 80)",   emoji: "🧕🏽" },
] as const;

export const STARTING_CREDITS = 200;
export const PASS_START_BONUS = 200;
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 2;
export const JAIL_TURNS = 2;

export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${seg()}-${seg()}-${seg()}`;
}