import { Dices } from "lucide-react";

interface Props {
  disabled: boolean;
  rolling: boolean;
  lastRoll: number | null;
  onRoll: () => void;
  currentName: string;
  isHumanTurn: boolean;
}

export function DiceRoller({ disabled, rolling, onRoll, isHumanTurn, currentName }: Props) {
  const inactive = disabled || rolling;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onRoll}
        disabled={inactive}
        aria-label={rolling ? "Rolling dice" : "Roll the dice"}
        className={`group relative flex h-24 w-24 items-center justify-center rounded-3xl
          bg-gradient-to-br from-primary via-primary/90 to-accent
          text-primary-foreground
          shadow-[0_10px_30px_-8px_oklch(0.78_0.18_195/0.7),0_0_24px_-4px_oklch(0.72_0.25_320/0.6)]
          transition-all duration-200
          enabled:hover:scale-110 enabled:hover:-translate-y-0.5
          enabled:active:scale-95
          disabled:cursor-not-allowed disabled:opacity-60
          ${!inactive && isHumanTurn ? "animate-bounce-soft" : ""}
        `}
      >
        <span className="pointer-events-none absolute inset-0 rounded-3xl bg-white/10 opacity-0 transition-opacity group-enabled:group-hover:opacity-100" />
        <Dices
          className={`h-12 w-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${
            rolling ? "animate-dice-spin" : "group-enabled:group-hover:animate-wiggle"
          }`}
          strokeWidth={2.4}
        />
        {!inactive && isHumanTurn ? (
          <span className="pointer-events-none absolute -inset-1 rounded-3xl ring-2 ring-primary/40 animate-pulse-glow" />
        ) : null}
      </button>
      <div
        className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur ${
          rolling
            ? "bg-accent/20 text-accent"
            : isHumanTurn
              ? "bg-primary/15 text-primary"
              : "bg-white/5 text-white/70"
        }`}
      >
        {rolling ? "Rolling…" : isHumanTurn ? "Tap to roll" : `${currentName || "CPU"}'s turn`}
      </div>
    </div>
  );
}
