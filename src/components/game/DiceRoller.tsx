import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";

interface Props {
  disabled: boolean;
  rolling: boolean;
  lastRoll: [number, number] | null;
  onRoll: () => void;
  currentName: string;
  isHumanTurn: boolean;
}

const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function Die({ value, rolling }: { value: number | null; rolling: boolean }) {
  return (
    <div
      className={`grid h-16 w-16 grid-cols-3 grid-rows-3 gap-0.5 rounded-xl bg-card border-2 border-border p-2 shadow-md ${rolling ? "animate-spin" : ""}`}
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const r = Math.floor(i / 3);
        const c = i % 3;
        const showPip = value && PIPS[value].some(([rr, cc]) => rr === r && cc === c);
        return (
          <span key={i} className="flex items-center justify-center">
            {showPip && <span className="h-2 w-2 rounded-full bg-foreground" />}
          </span>
        );
      })}
    </div>
  );
}

export function DiceRoller({ disabled, rolling, lastRoll, onRoll, currentName, isHumanTurn }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-card border border-border/60 p-5">
      <div className="text-sm text-muted-foreground">
        {isHumanTurn ? "Your roll" : `${currentName}'s turn`}
      </div>
      <div className="flex items-center gap-3">
        <Die value={lastRoll?.[0] ?? null} rolling={rolling} />
        <Die value={lastRoll?.[1] ?? null} rolling={rolling} />
      </div>
      <Button onClick={onRoll} disabled={disabled} size="lg" className="rounded-full px-8">
        <Dices className="mr-2 h-4 w-4" /> Roll Dice
      </Button>
    </div>
  );
}