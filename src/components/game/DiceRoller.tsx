import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";

interface Props {
  disabled: boolean;
  rolling: boolean;
  lastRoll: number | null;
  onRoll: () => void;
  currentName: string;
  isHumanTurn: boolean;
}

const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
};

function Die({ value, rolling }: { value: number; rolling: boolean }) {
  return (
    <div className="relative h-20 w-20">
      <div
        className={`absolute inset-x-4 bottom-0 h-3 rounded-full bg-black/15 blur-md transition-opacity ${
          rolling ? "opacity-70" : "opacity-40"
        }`}
      />
      <div
        className={`absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 rounded-2xl border border-border/70 bg-white p-2 shadow-sm transition-transform duration-75 ${
          rolling ? "animate-[spin_0.35s_linear_infinite]" : ""
        }`}
      >
        {Array.from({ length: 9 }).map((_, i) => {
          const r = Math.floor(i / 3);
          const c = i % 3;
          const showPip = PIPS[value].some(([rr, cc]) => rr === r && cc === c);
          return (
            <span key={i} className="flex items-center justify-center">
              {showPip ? <span className="h-2.5 w-2.5 rounded-full bg-black" /> : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function DiceRoller({
  disabled,
  rolling,
  lastRoll,
  onRoll,
  currentName,
  isHumanTurn,
}: Props) {
  const [displayValue, setDisplayValue] = useState<number>(1);

  useEffect(() => {
    if (!rolling) {
      if (lastRoll !== null) {
        setDisplayValue(lastRoll);
      }
      return;
    }

    const timer = setInterval(() => {
      setDisplayValue((previous) => (previous % 6) + 1);
    }, 90);

    return () => clearInterval(timer);
  }, [rolling, lastRoll]);

  const turnText = isHumanTurn ? "Your roll" : `${currentName}'s turn`;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
      <div className="text-sm font-medium text-muted-foreground">{turnText}</div>
      <div
        className={`rounded-[1.65rem] border border-border/60 bg-secondary/40 p-4 transition-transform duration-300 ${
          rolling ? "scale-105" : "scale-100"
        }`}
      >
        <Die value={displayValue} rolling={rolling} />
      </div>
      <Button
        onClick={onRoll}
        disabled={disabled}
        size="lg"
        className="rounded-full px-8 shadow-sm transition-transform active:scale-[0.98]"
      >
        <Dices className="mr-2 h-4 w-4" /> Roll die
      </Button>
    </div>
  );
}
