import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  ArrowLeft,
  Dices,
  HelpCircle,
  Coins,
  Building2,
  Gavel,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorks,
  head: () => ({
    meta: [
      { title: "How Data Viz works" },
      {
        name: "description",
        content:
          "Learn the rules: roll, answer, buy principles, build compliance, and outlast your opponents.",
      },
    ],
  }),
});

function HowItWorks() {
  const steps = [
    {
      icon: Dices,
      title: "Roll the die",
      body: "On your turn, roll one die. Your token glides across the 20-tile board.",
    },
    {
      icon: HelpCircle,
      title: "Answer the question",
      body: "Most tiles ask a real DPDPA MCQ. Answer right to act, wrong and your turn ends.",
    },
    {
      icon: Coins,
      title: "Buy a principle",
      body: "Land on an unowned principle and answer correctly to earn ₹50 and unlock buying.",
    },
    {
      icon: Building2,
      title: "Build compliance",
      body: "Own a full color group? Stack up to 3 compliance layers, built evenly across the group.",
    },
    {
      icon: Gavel,
      title: "Avoid the hearing",
      body: "At DPB Hearing, pay ₹50, roll a 6 within 3 attempts, or use a free card.",
    },
    {
      icon: Trophy,
      title: "Last one standing",
      body: "Players are eliminated when they go bankrupt. The final survivor wins.",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight">How it works</h1>
        </div>
        <p className="mt-3 text-muted-foreground">
          A short rulebook. The full game enforces every rule for you — this is just so you know
          what to expect.
        </p>

        <div className="mt-10 space-y-4">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-border bg-card/70 p-5 shadow-soft"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                  <h2 className="font-display text-xl font-semibold">{title}</h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/lobby">
            <Button size="lg" className="h-12 rounded-full px-8">
              Open the Lobby
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
