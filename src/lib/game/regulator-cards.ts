import type { RegulatorCard } from "./engine-types";

export const REGULATOR_CARDS: RegulatorCard[] = [
  {
    title: "Audit Bonus",
    body: "Your DPO documentation is exemplary. Collect ₹100.",
    effect: { type: "credits", amount: 100 },
  },
  {
    title: "Breach Notification Late",
    body: "You missed the 72-hour window. Pay ₹150.",
    effect: { type: "credits", amount: -150 },
  },
  {
    title: "Consent Refresh",
    body: "You re-papered consent flows. Collect ₹75.",
    effect: { type: "credits", amount: 75 },
  },
  {
    title: "DPB Hearing Summons",
    body: "Report to the Data Protection Board.",
    effect: { type: "jail" },
  },
  {
    title: "Vendor DPA Signed",
    body: "A processor agreement closes a risk. Collect ₹50.",
    effect: { type: "credits", amount: 50 },
  },
  {
    title: "Dark Pattern Found",
    body: "UX team flagged a manipulative consent screen. Pay ₹100.",
    effect: { type: "credits", amount: -100 },
  },
  {
    title: "Return to Start",
    body: "Reset your compliance posture. Move to START and collect ₹200.",
    effect: { type: "move", to: 0 },
  },
  {
    title: "DPIA Completed",
    body: "A thorough impact assessment lifts trust. Collect ₹120.",
    effect: { type: "credits", amount: 120 },
  },
  {
    title: "Cross-Border Transfer Flag",
    body: "An unverified transfer route is found. Pay ₹80.",
    effect: { type: "credits", amount: -80 },
  },
  {
    title: "Data Minimization Win",
    body: "You retired a stale dataset. Collect ₹60.",
    effect: { type: "credits", amount: 60 },
  },
];

export function drawCard(): RegulatorCard {
  return REGULATOR_CARDS[Math.floor(Math.random() * REGULATOR_CARDS.length)];
}
