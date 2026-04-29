import type { ColorGroup } from "@/lib/game/constants";

export const TILE_SIZE = 1.1;
export const BOARD_HALF = 3 * TILE_SIZE; // 6 tiles per side, half-extent = 3 tiles
export const TILE_THICKNESS = 0.16;
export const BOARD_THICKNESS = 0.18;

export type TileSide = "bottom" | "left" | "top" | "right";
export type TileCorner = "BR" | "BL" | "TL" | "TR" | null;

export interface TileWorldPos {
  x: number;
  z: number;
  side: TileSide;
  corner: TileCorner;
}

export function getTileWorldPos(index: number): TileWorldPos {
  const half = BOARD_HALF - TILE_SIZE / 2;
  if (index >= 0 && index <= 5) {
    return {
      x: half - index * TILE_SIZE,
      z: half,
      side: "bottom",
      corner: index === 0 ? "BR" : index === 5 ? "BL" : null,
    };
  }
  if (index >= 6 && index <= 10) {
    return {
      x: -half,
      z: half - (index - 5) * TILE_SIZE,
      side: "left",
      corner: index === 10 ? "TL" : null,
    };
  }
  if (index >= 11 && index <= 15) {
    return {
      x: -half + (index - 10) * TILE_SIZE,
      z: -half,
      side: "top",
      corner: index === 15 ? "TR" : null,
    };
  }
  return {
    x: half,
    z: -half + (index - 15) * TILE_SIZE,
    side: "right",
    corner: null,
  };
}

export const NEON_GROUP_COLORS: Record<ColorGroup, string> = {
  brown: "#ff3a4d",
  lightBlue: "#3a9bff",
  pink: "#b73aff",
  orange: "#ffd23a",
};

export const TILE_TYPE_COLOR: Record<string, string> = {
  start: "#3affa1",
  regulator: "#7e7eff",
  tax: "#ff3a4d",
  free_audit: "#3affa1",
  jail_visit: "#b73aff",
  go_to_jail: "#ff3a4d",
};

export const PLAYER_TOKEN_COLORS = ["#ff5a2c", "#1ea7ff", "#3affa1", "#ffd23a", "#c2b3ff"];
