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

export function DiceRoller({ disabled, rolling, onRoll }: Props) {
  return (
    <Button
      onClick={onRoll}
      disabled={disabled || rolling}
      size="lg"
      className="rounded-full px-8 shadow-[0_0_24px_-4px_rgba(58,255,217,0.6)] transition-transform active:scale-[0.98]"
    >
      <Dices className="mr-2 h-4 w-4" />
      {rolling ? "Rolling…" : "Roll die"}
    </Button>
  );
}
