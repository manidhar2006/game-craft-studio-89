import type { BoardTile } from "@/lib/game/constants";
import { AVATARS, GROUP_COLORS, PRINCIPLES } from "@/lib/game/constants";
import type { Player } from "@/lib/game/engine-types";
import { Coins, Gavel, Scale, Sparkles, Star } from "lucide-react";

interface Props {
  tiles: BoardTile[];
  players: Player[];
  currentPlayerId: string;
  propertyOwners: Record<number, string>;
}

/**
 * 20-tile rectangular board, 6 across × 6 down (corners + 4 per side).
 * We render a 6x6 grid where the inner cells form a calm felt-style center.
 */
export function GameBoard({ tiles, players, currentPlayerId, propertyOwners }: Props) {
  // Map tile index → grid position. 6x6 perimeter starting top-left, going clockwise.
  const positions: Record<number, { col: number; row: number }> = {};
  // Top row: 0..5 (col 1..6 row 1)
  for (let i = 0; i <= 5; i++) positions[i] = { col: i + 1, row: 1 };
  // Right column: 6..9 (col 6, row 2..5)
  for (let i = 6; i <= 9; i++) positions[i] = { col: 6, row: i - 4 };
  // Bottom row: 10..15 (col 6..1, row 6)
  for (let i = 10; i <= 15; i++) positions[i] = { col: 6 - (i - 10), row: 6 };
  // Left column: 16..19 (col 1, row 5..2)
  for (let i = 16; i <= 19; i++) positions[i] = { col: 1, row: 6 - (i - 15) };

  return (
    <div className="relative aspect-square w-full max-w-[720px]">
      <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-1.5 rounded-3xl bg-gradient-to-br from-secondary to-muted p-3 shadow-[0_30px_60px_-30px_rgba(40,60,55,0.35)] border border-border">
        {/* Center plate */}
        <div className="col-start-2 col-end-6 row-start-2 row-end-6 rounded-2xl bg-[oklch(0.96_0.012_120)] border border-border/60 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold tracking-tight">DPDPA Compliance Tycoon</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground max-w-xs">
            Acquire principles, layer your compliance, answer MCQs, and outlast the regulators.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            {(["saffron","white","green","navy"] as const).map((g) => (
              <span key={g} className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: GROUP_COLORS[g] }} />
                {g}
              </span>
            ))}
          </div>
        </div>

        {tiles.map((tile) => {
          const pos = positions[tile.index];
          const owner = tile.principleNo ? propertyOwners[tile.principleNo] : undefined;
          const ownerPlayer = owner ? players.find((p) => p.id === owner) : undefined;
          const layers = ownerPlayer && tile.principleNo ? (ownerPlayer.layers[tile.principleNo] ?? 0) : 0;
          const principle = tile.principleNo ? PRINCIPLES.find((p) => p.principleNo === tile.principleNo) : undefined;

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
                {tile.subtitle && <span className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2">{tile.subtitle}</span>}
                {principle && (
                  <span className="mt-auto text-[9px] font-medium text-primary">₹{principle.price}</span>
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
              {/* Player tokens stack */}
              <div className="absolute left-1 top-1 flex -space-x-1">
                {players
                  .filter((p) => !p.isEliminated && p.position === tile.index)
                  .map((p) => (
                    <span
                      key={p.id}
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ring-1 ring-card ${
                        p.id === currentPlayerId ? "ring-2 ring-primary" : ""
                      }`}
                      style={{ background: AVATARS[p.avatarId % AVATARS.length].color, color: "white" }}
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