import type { BoardTile } from "@/lib/game/constants";
import { AVATARS, GROUP_COLORS, PRINCIPLES } from "@/lib/game/constants";
import type { Player } from "@/lib/game/engine-types";
import { Coins, Gavel, Scale, Sparkles, Star } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  tiles: BoardTile[];
  players: Player[];
  currentPlayerId: string;
  propertyOwners: Record<number, string>;
  centerContent?: ReactNode;
}

/**
 * 16-tile rectangular board, 5 across × 5 down (corners + 3 per side).
 * We render a 5x5 grid where the inner cells form a calm felt-style center.
 */
export function GameBoard({
  tiles,
  players,
  currentPlayerId,
  propertyOwners,
  centerContent,
}: Props) {
  // Map tile index → grid position. 5x5 perimeter starting bottom-left, going anticlockwise.
  const positions: Record<number, { col: number; row: number }> = {};
  // Left column bottom->top: indices 0..4 -> col 1, row 5..1
  for (let i = 0; i <= 4; i++) positions[i] = { col: 1, row: 5 - i };
  // Top row (excluding top-left): indices 5..8 -> col 2..5, row 1
  for (let i = 5; i <= 8; i++) positions[i] = { col: i - 3, row: 1 };
  // Right column top->bottom (excluding corners): indices 9..11 -> col 5, row 2..4
  for (let i = 9; i <= 11; i++) positions[i] = { col: 5, row: i - 7 };
  // Bottom row right->left (including bottom-right, excluding bottom-left): indices 12..15 -> col 5..2, row 5
  for (let i = 12; i <= 15; i++) positions[i] = { col: 17 - i, row: 5 };

  return (
    <div className="relative aspect-square w-full max-w-[720px]">
      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-1.5 rounded-3xl bg-gradient-to-br from-secondary to-muted p-3 shadow-[0_30px_60px_-30px_rgba(40,60,55,0.35)] border border-border">
        {/* Center plate */}
        <div className="col-start-2 col-end-5 row-start-2 row-end-5 rounded-2xl bg-[oklch(0.96_0.012_120)] border border-border/60 flex items-center justify-center p-4">
          {centerContent}
        </div>

        {tiles.map((tile) => {
          const pos = positions[tile.index];
          const owner = tile.principleNo ? propertyOwners[tile.principleNo] : undefined;
          const ownerPlayer = owner ? players.find((p) => p.id === owner) : undefined;
          const layers =
            ownerPlayer && tile.principleNo ? (ownerPlayer.layers[tile.principleNo] ?? 0) : 0;
          const principle = tile.principleNo
            ? PRINCIPLES.find((p) => p.principleNo === tile.principleNo)
            : undefined;

          return (
            <div
              key={tile.index}
              style={{ gridColumn: pos.col, gridRow: pos.row }}
              className={`relative flex flex-col rounded-lg bg-card border border-border/70 overflow-hidden text-[10px] leading-tight transition-shadow ${
                tile.type === "principle" ? "" : "bg-secondary/60"
              }`}
            >
              {tile.type === "principle" && tile.group && (
                <div className="h-2.5" style={{ background: GROUP_COLORS[tile.group] }} />
              )}
              <div className="flex flex-1 flex-col p-1.5">
                <div className="flex items-start justify-between gap-1">
                  <span className="font-semibold text-[10px] text-foreground">{tile.name}</span>
                  {tile.type === "regulator" && <Gavel className="h-3 w-3 text-muted-foreground" />}
                  {tile.type === "tax" && <Coins className="h-3 w-3 text-destructive" />}
                  {tile.type === "free_audit" && <Scale className="h-3 w-3 text-primary" />}
                  {tile.type === "start" && <Star className="h-3 w-3 text-accent" />}
                </div>
                {tile.subtitle && (
                  <span className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2">
                    {tile.subtitle}
                  </span>
                )}
                {principle && (
                  <span className="mt-auto text-[9px] font-medium text-primary">
                    ₹{principle.price}
                  </span>
                )}
                {layers > 0 && (
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: layers }).map((_, i) => (
                      <span key={i} className="h-1 w-1.5 rounded-sm bg-accent" />
                    ))}
                  </div>
                )}
              </div>
              {/* Owner indicator */}
              {ownerPlayer && (
                <div
                  className="absolute right-1 bottom-1 h-2.5 w-2.5 rounded-full ring-1 ring-card"
                  style={{ background: AVATARS[ownerPlayer.avatarId % AVATARS.length].color }}
                />
              )}
              {/* Player tokens centered and larger */}
              <div className="absolute inset-0 flex items-center justify-center gap-1">
                {players
                  .filter((p) => !p.isEliminated && p.position === tile.index)
                  .map((p) => (
                    <span
                      key={p.id}
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ring-1 ring-card ${
                        p.id === currentPlayerId ? "ring-2 ring-primary" : ""
                      }`}
                      style={{
                        background: AVATARS[p.avatarId % AVATARS.length].color,
                        color: "white",
                      }}
                      title={p.name}
                    >
                      {AVATARS[p.avatarId % AVATARS.length].emoji}
                    </span>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
