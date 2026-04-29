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
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}
