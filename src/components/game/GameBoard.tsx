import { useEffect, useState, type ReactNode } from "react";
import type { BoardTile } from "@/lib/game/constants";
import type { Player } from "@/lib/game/engine-types";
import { BoardScene } from "./board3d/BoardScene";

interface Props {
  tiles: BoardTile[];
  players: Player[];
  currentPlayerId: string;
  propertyOwners: Record<number, string>;
  centerContent?: ReactNode;
  topDownCamera?: boolean;
  diceRolling?: boolean;
  diceValue?: number | null;
}

export function GameBoard(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative aspect-square w-full max-w-[820px] flex items-center justify-center text-xs text-muted-foreground">
        Loading 3D board…
      </div>
    );
  }

  return <BoardScene {...props} />;
}
