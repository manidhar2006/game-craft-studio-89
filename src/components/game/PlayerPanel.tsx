import { Card } from "@/components/ui/card";
import { Coins, Lock, Layers } from "lucide-react";
import type { Player } from "@/lib/game/engine-types";

interface Props {
  player: Player;
  avatar: { name: string; color: string; emoji: string };
  isCurrent: boolean;
}

export function PlayerPanel({ player, avatar, isCurrent }: Props) {
  const totalLayers = Object.values(player.layers).reduce((a, b) => a + b, 0);
  const principlesOwned = Object.keys(player.layers).length + 0; // engine tracks via owners separately
  return (
    <Card
      className={`p-4 transition-all ${isCurrent ? "ring-2 ring-primary shadow-md" : ""} ${player.isEliminated ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white"
          style={{ background: avatar.color }}
        >
          {avatar.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold truncate">{player.name}</span>
            {player.inJail && <Lock className="h-3 w-3 text-destructive" />}
          </div>
          <div className="text-xs text-muted-foreground">
            {player.isEliminated ? "Eliminated" : `Tile ${player.position}`}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          <Coins className="h-4 w-4 text-accent" /> ₹{player.credits}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Layers className="h-3.5 w-3.5" /> {totalLayers} layers
        </span>
      </div>
    </Card>
  );
}
