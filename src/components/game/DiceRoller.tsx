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

function Die({ value, rolling }: { value: number | null; rolling: boolean }) {
  return (
    <div className="relative h-16 w-16 [perspective:900px]">
      <div
        className={`absolute inset-0 rounded-[1rem] border border-border/80 bg-[linear-gradient(145deg,oklch(0.99_0.01_95),oklch(0.92_0.02_95))] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.85),0_14px_28px_-14px_oklch(0.2_0.03_160_/_0.5)] transition-transform duration-500 [transform-style:preserve-3d] ${rolling ? "animate-dice-roll" : ""}`}
      >
        <div className="absolute inset-0 rounded-[1rem] bg-[radial-gradient(circle_at_28%_24%,oklch(1_0_0_/_0.9),transparent_34%),linear-gradient(145deg,oklch(0.99_0.01_95),oklch(0.94_0.02_95))]" />
        <div className="absolute inset-0 rounded-[1rem] shadow-[inset_0_-10px_16px_-14px_oklch(0.2_0.03_160_/_0.25)]" />
        <div className="absolute inset-[0.25rem] grid grid-cols-3 grid-rows-3 gap-0.5 rounded-[0.8rem]">
          {Array.from({ length: 9 }).map((_, i) => {
            const r = Math.floor(i / 3);
            const c = i % 3;
            const showPip = value && PIPS[value].some(([rr, cc]) => rr === r && cc === c);
            return (
              <span key={i} className="flex items-center justify-center">
                {showPip && (
                  <span className="h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,white,oklch(0.2_0.03_160))] shadow-[0_1px_1px_oklch(1_0_0_/_0.45)]" />
                )}
              </span>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-[1rem] bg-gradient-to-b from-white/70 via-white/10 to-black/10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1 rounded-r-[1rem] bg-gradient-to-b from-black/10 via-black/0 to-black/20" />
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
  const turnText = isHumanTurn ? "Your roll" : `${currentName}'s turn`;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
      <div className="text-sm text-muted-foreground">{turnText}</div>
      <div className={`flex items-center justify-center transition-transform duration-300 ${rolling ? "scale-105" : "scale-100"}`}>
        <Die value={lastRoll} rolling={rolling} />
      </div>
      <Button
        onClick={onRoll}
        disabled={disabled}
        size="lg"
        className="rounded-full px-8 shadow-sm transition-transform active:scale-[0.98]"
      >
        <Dices className="mr-2 h-4 w-4" /> Roll a die
      </Button>
    </div>
  );
}
