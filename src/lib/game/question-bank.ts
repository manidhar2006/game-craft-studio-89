import principlesBank from "../../../DPDPA_9_Principles_MCQs.md?raw";
import sectorBank from "../../../DPDPA_Banking_Insurance_MCQs.md?raw";

export interface BankQuestion {
  principleNo: number;
  id: string;
  text: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correct: "A" | "B" | "C" | "D";
  explanation: string | null;
}

const QUESTION_BANKS = [principlesBank, sectorBank];

function parseQuestionBlock(
  block: string,
  principleNo: number,
  source: string,
  index: number,
): BankQuestion | null {
  const lines = block.split(/\r?\n/);
  const heading = lines.find((line) => line.trim().length > 0)?.trim() ?? "";
  const headingMatch = heading.match(/^\*\*Q\d+\.\s*(.*)\*\*$/);
  if (!headingMatch) return null;

  const options: Record<string, string> = {};
  let correct: BankQuestion["correct"] | null = null;
  let explanationIndex = -1;

  for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex].trim();
    if (!line) continue;

    if (line.startsWith("✅ **Correct Answer:")) {
      const correctMatch = line.match(/^✅ \*\*Correct Answer:\s*([A-D])\*\*$/);
      if (correctMatch) {
        correct = correctMatch[1] as BankQuestion["correct"];
      }
      explanationIndex = lineIndex + 1;
      break;
    }

    const optionMatch = line.match(/^-\s+([A-D])\)\s*(.*)$/);
    if (optionMatch) {
      options[optionMatch[1]] = optionMatch[2];
    }
  }

  if (!correct) return null;

  const explanationLines = lines.slice(explanationIndex).map((line) => line.trim());
  const explanationHeaderIndex = explanationLines.findIndex((line) => line.startsWith("**Explanation:**"));
  const explanationText =
    explanationHeaderIndex >= 0
      ? explanationLines
          .slice(explanationHeaderIndex)
          .join("\n")
          .replace(/^\*\*Explanation:\*\*\s*/, "")
          .trim() || null
      : null;

  const questionText = headingMatch[1].trim();
  const orderedOptions = (["A", "B", "C", "D"] as const)
    .map((key) => ({ key, text: options[key] ?? "" }))
    .filter((option) => option.text.length > 0);

  if (orderedOptions.length !== 4) return null;

  return {
    principleNo,
    id: `${source}-p${principleNo}-${index}`,
    text: questionText,
    options: orderedOptions,
    correct,
    explanation: explanationText,
  };
}

function extractPrincipleSections(markdown: string) {
  const headingMatches = [...markdown.matchAll(/^# PRINCIPLE\s+(\d+)\s+—/gm)];
  return headingMatches.map((match, index) => {
    const principleNo = Number(match[1]);
    const start = (match.index ?? 0) + match[0].length;
    const end = headingMatches[index + 1]?.index ?? markdown.length;
    return { principleNo, body: markdown.slice(start, end) };
  });
}

function buildQuestionBank(): BankQuestion[] {
  const questions: BankQuestion[] = [];

  for (const [sourceIndex, markdown] of QUESTION_BANKS.entries()) {
    const source = sourceIndex === 0 ? "core" : "sector";
    for (const section of extractPrincipleSections(markdown)) {
      const blocks = section.body.split(/\n\s*\n(?=\*\*Q\d+\.)/g);
      blocks.forEach((block, blockIndex) => {
        const parsed = parseQuestionBlock(block, section.principleNo, source, blockIndex + 1);
        if (parsed) questions.push(parsed);
      });
    }
  }

  return questions;
}

const ALL_QUESTIONS = buildQuestionBank();

export function getQuestionsForPrinciple(principleNo: number) {
  return ALL_QUESTIONS.filter((question) => question.principleNo === principleNo);
}

export function getRandomQuestionForPrinciple(principleNo: number): BankQuestion | null {
  const pool = getQuestionsForPrinciple(principleNo);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}