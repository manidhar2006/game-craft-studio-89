import { QUESTION_DATA } from "./question-data";

export interface BankQuestion {
  principleNo: number;
  id: string;
  source: "core" | "sector";
  text: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correct: "A" | "B" | "C" | "D";
  explanation: string | null;
}

const ALL_QUESTIONS: BankQuestion[] = [...QUESTION_DATA];

const OPTION_KEYS: BankQuestion["correct"][] = ["A", "B", "C", "D"];

// The static question bank is heavily skewed (most answers are B or C).
// Shuffle the options on each pick and re-key A..D so the correct position
// is uniform per question.
function shuffleQuestionOptions(question: BankQuestion): BankQuestion {
  const correctIdx = question.options.findIndex((o) => o.key === question.correct);
  if (correctIdx < 0) return question;

  const indexed = question.options.map((o, originalIdx) => ({ ...o, originalIdx }));
  for (let i = indexed.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }

  const options = indexed.map((o, i) => ({ key: OPTION_KEYS[i], text: o.text }));
  const newCorrectPos = indexed.findIndex((o) => o.originalIdx === correctIdx);
  return { ...question, options, correct: OPTION_KEYS[newCorrectPos] };
}

export function getQuestionsForPrinciple(principleNo: number) {
  return ALL_QUESTIONS.filter((question) => question.principleNo === principleNo);
}

export function getRandomQuestionForPrinciple(
  principleNo: number,
  usedQuestionIds: string[] = [],
): BankQuestion | null {
  const used = new Set(usedQuestionIds);
  const all = getQuestionsForPrinciple(principleNo);
  const unused = all.filter((question) => !used.has(question.id));
  const available = unused.length > 0 ? unused : all;
  const sectorPool = available.filter((question) => question.source === "sector");
  const pool = sectorPool.length > 0 ? sectorPool : available;
  if (pool.length === 0) return null;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return picked ? shuffleQuestionOptions(picked) : null;
}
