import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  text: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correct: "A" | "B" | "C" | "D";
  explanation: string | null;
}

interface Props {
  question: Question;
  principleName: string;
  mode: "buy" | "rent_dispute" | "audit" | "general" | "own_tile";
  onAnswer: (key: "A" | "B" | "C" | "D") => void;
}

const MODE_HINT: Record<Props["mode"], string> = {
  buy: "Answer correctly to acquire this principle.",
  rent_dispute: "Answer correctly to avoid paying rent.",
  audit: "A compliance audit. Choose carefully.",
  general: "Quick compliance check.",
  own_tile: "Strengthen the tile with a correct answer.",
};

export function QuestionOverlay({ question, principleName, mode, onAnswer }: Props) {
  const [picked, setPicked] = useState<"A" | "B" | "C" | "D" | null>(null);
  const submitted = picked !== null;
  const correct = picked === question.correct;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/35" />
      <div
        className="pointer-events-auto relative w-full max-w-2xl rounded-2xl border border-[#3affd9]/40 bg-[#04050b]/95 p-6 text-foreground shadow-[0_0_60px_-15px_rgba(58,255,217,0.55)]"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
            {principleName}
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-[#3affd9]/80">
            {mode.replace("_", " ")}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/60">{MODE_HINT[mode]}</p>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/90">
          {question.text}
        </div>

        <div className="mt-4 grid gap-2">
          {question.options.map((opt) => {
            const isPick = picked === opt.key;
            const isCorrect = submitted && opt.key === question.correct;
            const isWrongPick = submitted && isPick && !correct;
            return (
              <button
                key={opt.key}
                disabled={submitted}
                onClick={() => setPicked(opt.key)}
                className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                  isCorrect
                    ? "border-[#3affa1] bg-[#3affa1]/10"
                    : isWrongPick
                      ? "border-[#ff3a4d] bg-[#ff3a4d]/10"
                      : isPick
                        ? "border-[#3affd9] bg-white/5"
                        : "border-white/15 bg-white/[0.02] text-white/90 hover:border-[#3affd9]/60 hover:bg-white/5"
                }`}
              >
                <span className="font-semibold text-[#3affd9]">{opt.key}.</span>
                <span className="flex-1 whitespace-normal">{opt.text}</span>
                {isCorrect && <CheckCircle2 className="h-4 w-4 text-[#3affa1]" />}
                {isWrongPick && <XCircle className="h-4 w-4 text-[#ff3a4d]" />}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="text-xs text-white/50">
            {submitted
              ? correct
                ? "Correct — proceed."
                : `Correct answer: ${question.correct}`
              : "Pick an answer to continue."}
          </div>
          <Button
            onClick={() => picked && onAnswer(picked)}
            disabled={!picked}
            className="rounded-full"
          >
            {submitted ? "Continue" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
