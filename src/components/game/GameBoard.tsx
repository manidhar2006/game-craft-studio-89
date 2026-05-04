import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
 * 20-tile rectangular board, 6 across × 6 down (corners + 4 per side).
 * We render a 6x6 grid where the inner cells form a calm felt-style center.
 */
export function GameBoard({
  tiles,
  players,
  currentPlayerId,
  propertyOwners,
  centerContent,
}: Props) {
  // Map tile index → grid position matching the spec diagram.
  const positions: Record<number, { col: number; row: number }> = {};
  // Bottom row (right->left): 0..5 -> col 6..1, row 6
  for (let i = 0; i <= 5; i++) positions[i] = { col: 6 - i, row: 6 };
  // Left column (bottom->top): 6..10 -> col 1, row 5..1
  for (let i = 6; i <= 10; i++) positions[i] = { col: 1, row: 11 - i };
  // Top row (left->right): 11..15 -> col 2..6, row 1
  for (let i = 11; i <= 15; i++) positions[i] = { col: i - 9, row: 1 };
  // Right column (top->bottom): 16..19 -> col 6, row 2..5
  for (let i = 16; i <= 19; i++) positions[i] = { col: 6, row: i - 14 };

  // Track visual positions for smooth tile-by-tile hopping
  const [visualPositions, setVisualPositions] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    players.forEach((p) => {
      init[p.id] = p.position;
    });
    return init;
  });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    players.forEach((p) => {
      if (p.isEliminated) return;
      const vPos = visualPositions[p.id] ?? p.position;
      if (vPos !== p.position) {
        // Step towards logical position +1 at a time (wrap around at 20)
        timeouts.push(
          setTimeout(() => {
            setVisualPositions((prev) => ({
              ...prev,
              [p.id]: (prev[p.id] + 1) % 20,
            }));
          }, 200) // 200ms per tile hop
        );
      }
    });
    return () => timeouts.forEach(clearTimeout);
  }, [players, visualPositions]);

  return (
    <div className="relative aspect-square w-full max-w-[1040px]">
      <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-[3px] rounded-[28px] bg-gradient-to-br from-secondary to-muted p-[6px] shadow-[0_30px_60px_-30px_rgba(40,60,55,0.35)] border border-border">
        {/* Center plate */}
        <div className="col-start-2 col-end-6 row-start-2 row-end-6 flex items-center justify-center rounded-2xl bg-[oklch(0.95_0.01_110)] border border-border/60">
          <div className="w-[56%] min-w-[220px] max-w-[360px]">
            {centerContent}
          </div>
        </div>

        {tiles.map((tile) => {
          const pos = positions[tile.index];
          const isPrinciple = tile.type === "principle";
          const owner = isPrinciple ? propertyOwners[tile.principleNo] : undefined;
          const ownerPlayer = owner ? players.find((p) => p.id === owner) : undefined;
          const layers =
            ownerPlayer && isPrinciple ? (ownerPlayer.layers[tile.principleNo] ?? 0) : 0;
          const principle = isPrinciple
            ? PRINCIPLES.find((p) => p.principleNo === tile.principleNo)
            : undefined;

          return (
            <div
              key={tile.index}
              style={{ gridColumn: pos.col, gridRow: pos.row }}
              className={`relative flex flex-col rounded-lg bg-card border border-border/70 overflow-hidden text-[12px] leading-[1.15] transition-shadow ${
                tile.type === "principle" ? "" : "bg-secondary/60"
              }`}
            >
              {tile.type === "principle" && tile.group && (
                <div className="h-3.5" style={{ background: GROUP_COLORS[tile.group] }} />
              )}
              <div className="flex flex-1 flex-col p-2">
                <div className="flex items-start justify-between gap-1.5">
                  <span className="font-semibold text-[13px] text-foreground">{tile.name}</span>
                  {tile.type === "regulator" && <Gavel className="h-4 w-4 text-muted-foreground" />}
                  {tile.type === "tax" && <Coins className="h-4 w-4 text-destructive" />}
                  {tile.type === "free_audit" && <Scale className="h-4 w-4 text-primary" />}
                  {tile.type === "start" && <Star className="h-4 w-4 text-accent" />}
                </div>
                {tile.subtitle && (
                  <span className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                    {tile.subtitle}
                  </span>
                )}
                {principle && (
                  <span className="mt-auto text-[11px] font-medium text-primary">
                    ₹{principle.price}
                  </span>
                )}
                {layers > 0 && (
                  <div className="mt-1.5 flex gap-1">
                    {Array.from({ length: layers }).map((_, i) => (
                      <span key={i} className="h-2 w-2.5 rounded-sm bg-accent" />
                    ))}
                  </div>
                )}
              </div>
              {/* Owner indicator */}
              {ownerPlayer && (
                <div
                  className="absolute right-1 bottom-1 h-3.5 w-3.5 rounded-full ring-1 ring-card"
                  style={{ background: AVATARS[ownerPlayer.avatarId % AVATARS.length].color }}
                />
              )}
            </div>
          );
        })}

        {/* Token Animation Layer */}
        {tiles.map((tile) => {
          const pos = positions[tile.index];
          const occupants = players.filter(
            (p) => !p.isEliminated && (visualPositions[p.id] ?? p.position) === tile.index
          );

          return (
            <div
              key={`token-layer-${tile.index}`}
              style={{ gridColumn: pos.col, gridRow: pos.row }}
              className="pointer-events-none z-10 flex items-center justify-center gap-1 p-1"
            >
              {occupants.map((p) => (
                <motion.span
                  key={p.id}
                  layoutId={`token-${p.id}`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg ring-1 ring-card ${
                    p.id === currentPlayerId ? "ring-2 ring-primary" : ""
                  }`}
                  style={{
                    background: AVATARS[p.avatarId % AVATARS.length].color,
                    color: "white",
                  }}
                  title={p.name}
                >
                  {AVATARS[p.avatarId % AVATARS.length].emoji}
                </motion.span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
