import { Coins, Lock, Layers, Flame } from "lucide-react";
import type { Player } from "@/lib/game/engine-types";

interface Props {
  player: Player;
  avatar: { name: string; color: string; emoji: string };
  isCurrent: boolean;
}

export function PlayerPanel({ player, avatar, isCurrent }: Props) {
  const totalLayers = Object.values(player.layers).reduce((a, b) => a + b, 0);

  return (
    <div
      className={`relative rounded-2xl p-[1px] transition-all duration-300 ${
        isCurrent
          ? "animate-turn-glow"
          : "bg-border/60 hover:-translate-y-0.5 hover:shadow-soft"
      } ${player.isEliminated ? "opacity-40 grayscale" : ""}`}
      style={
        isCurrent
          ? {
              backgroundImage:
                "linear-gradient(135deg, oklch(0.78 0.18 195), oklch(0.72 0.25 320))",
            }
          : undefined
      }
    >
      <div className="rounded-2xl bg-card/95 p-3.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-2xl text-white shadow-tile transition-transform ${
                isCurrent ? "animate-bounce-soft" : ""
              }`}
              style={{
                background: `linear-gradient(135deg, ${avatar.color}, ${avatar.color}cc)`,
              }}
            >
              {avatar.emoji}
            </div>
            {isCurrent && !player.isEliminated ? (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-accent-foreground shadow-md ring-2 ring-card animate-pop-in">
                <Flame className="h-2.5 w-2.5" />
              </span>
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold truncate text-[15px]">{player.name}</span>
              {player.inJail && <Lock className="h-3 w-3 text-destructive" />}
            </div>
            <div
              className={`text-[11px] uppercase tracking-wider ${
                isCurrent ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              {player.isEliminated
                ? "Eliminated"
                : isCurrent
                  ? "Their turn"
                  : `Tile ${player.position}`}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div
            className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-bold overflow-hidden ${
              isCurrent
                ? "bg-gradient-to-r from-amber-400/25 to-amber-300/15 text-amber-200"
                : "bg-secondary/60 text-foreground"
            }`}
          >
            <Coins
              className={`h-3.5 w-3.5 ${isCurrent ? "text-amber-300 animate-coin-flash" : "text-accent"}`}
            />
            <span className="tabular-nums">₹{player.credits.toLocaleString("en-IN")}</span>
            {isCurrent ? (
              <span className="pointer-events-none absolute inset-0 animate-shimmer" />
            ) : null}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground">
            <Layers className="h-3 w-3" />
            <span className="tabular-nums">{totalLayers}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
