import type { RegulatorCard } from "./engine-types";

export const REGULATOR_CARDS: RegulatorCard[] = [
  {
    title: "Welfare Scheme Verified",
    body: "Section 7(b): State welfare eligibility was verified cleanly. Collect ₹100.",
    effect: { type: "credits", amount: 100 },
  },
  {
    title: "Personal Data Breach",
    body: "A personal data breach was detected. Pay ₹150.",
    effect: { type: "credits", amount: -150 },
  },
  {
    title: "Consent Requirements Met",
    body: "Your Section 6 consent flow passed review. Collect ₹50.",
    effect: { type: "credits", amount: 50 },
  },
  {
    title: "DPO Violation Flag",
    body: "Your DPO flagged a violation. Report directly to the DPB Hearing.",
    effect: { type: "jail" },
  },
  {
    title: "Grievance Clock Starts",
    body: "A customer files a grievance under Section 13. Skip your next turn.",
    effect: { type: "skip_next_turn" },
  },
  {
    title: "Significant Data Fiduciary",
    body: "You were notified as an SDF under Section 10. Collect ₹200.",
    effect: { type: "credits", amount: 200 },
  },
  {
    title: "Annual DPIA Complete",
    body: "Your annual DPIA is completed. Collect ₹75.",
    effect: { type: "credits", amount: 75 },
  },
  {
    title: "Late Breach Notice",
    body: "You failed to notify a breach within 72 hours. Pay ₹200.",
    effect: { type: "credits", amount: -200 },
  },
  {
    title: "Return to Start",
    body: "Move directly to START and collect ₹200.",
    effect: { type: "move", to: 0 },
  },
  {
    title: "Move Forward",
    body: "Move forward 3 tiles.",
    effect: { type: "move_relative", steps: 3 },
  },
  {
    title: "Transfer Approved",
    body: "Cross-border data transfer approved. Collect ₹120.",
    effect: { type: "credits", amount: 120 },
  },
  {
    title: "Cookie Banner Failed",
    body: "Your cookie consent banner audit failed. Pay ₹50 to each opponent.",
    effect: { type: "pay_to_each", amount: 50 },
  },
  {
    title: "DPB Hearing Parole",
    body: "You are released from DPB Hearing immediately.",
    effect: { type: "none" },
  },
  {
    title: "Consent Manager Appointed",
    body: "A Consent Manager was appointed under Section 6(7). Collect ₹80.",
    effect: { type: "credits", amount: 80 },
  },
  {
    title: "Children's Data Violation",
    body: "A children's data violation was found. Pay ₹200.",
    effect: { type: "credits", amount: -200 },
  },
  {
    title: "Get Out of DPB Free",
    body: "Keep this card. It releases you from one future DPB Hearing.",
    effect: { type: "jail_free_card" },
  },
];

export function drawCard(): RegulatorCard {
  return REGULATOR_CARDS[Math.floor(Math.random() * REGULATOR_CARDS.length)];
}
