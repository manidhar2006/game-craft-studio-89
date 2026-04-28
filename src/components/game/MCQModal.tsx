import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

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
  mode: "buy" | "rent_dispute" | "audit" | "general";
  onAnswer: (key: "A" | "B" | "C" | "D") => void;
}

export function MCQModal({ question, principleName, mode, onAnswer }: Props) {
  const [picked, setPicked] = useState<"A" | "B" | "C" | "D" | null>(null);
  const submitted = picked !== null;
  const correct = picked === question.correct;

  return (
    <Dialog open>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{principleName}</DialogTitle>
          <DialogDescription>
            {mode === "buy"
              ? "Answer correctly to acquire this principle."
              : "Quick compliance check."}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 rounded-xl bg-secondary/60 border border-border/60 p-4 text-sm leading-relaxed">
          {question.text}
        </div>
        <div className="mt-3 grid gap-2">
          {question.options.map((opt) => {
            const isPick = picked === opt.key;
            const isCorrect = submitted && opt.key === question.correct;
            const isWrongPick = submitted && isPick && !correct;
              return (
              <button
                key={opt.key}
                disabled={submitted}
                onClick={() => setPicked(opt.key)}
                className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-all whitespace-normal ${
                  isCorrect
                    ? "border-primary bg-primary/10"
                    : isWrongPick
                      ? "border-destructive bg-destructive/10"
                      : isPick
                        ? "border-primary"
                        : "border-border hover:border-primary/60 hover:bg-secondary/60"
                }`}
              >
                <span className="font-semibold">{opt.key}.</span>
                <span className="flex-1 whitespace-normal">{opt.text}</span>
                {isCorrect && <CheckCircle2 className="h-4 w-4 text-primary" />}
                {isWrongPick && <XCircle className="h-4 w-4 text-destructive" />}
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={() => picked && onAnswer(picked)} disabled={!picked}>
            {submitted ? "Continue" : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
