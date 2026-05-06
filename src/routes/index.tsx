import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bot, Users, Hash, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Data Guardian</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-12 text-center md:pt-20">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Learn India's DPDP Act through play
        </span>

        <h1
          className="font-display text-5xl font-semibold tracking-[0.18em] text-balance md:text-7xl"
          style={{
            background: "linear-gradient(90deg,#3affd9 0%,#ff3aff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 16px rgba(58,255,217,0.45))",
          }}
        >
          DATA GUARDIAN
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          A 3D board game that turns India's Digital Personal Data Protection Act into a match you
          actually want to play. No sign-up required.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => navigate({ to: "/play" })}
            className="group flex flex-col items-start rounded-2xl border border-border bg-card/80 p-6 text-left shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <Bot className="h-5 w-5" />
            </div>
            <div className="font-display text-lg font-semibold">Vs Computer</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Play solo against 1–3 AI opponents.
            </div>
            <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
              Start match →
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/lobby" })}
            className="group flex flex-col items-start rounded-2xl border border-border bg-card/80 p-6 text-left shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div className="font-display text-lg font-semibold">Multiplayer</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Create a session and share the room ID.
            </div>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
              <Hash className="h-3.5 w-3.5" />
              Open lobby →
            </div>
          </button>
        </div>

        <div className="mt-10">
          <Link to="/how-it-works">
            <Button size="lg" variant="ghost" className="h-12 rounded-full px-8 text-base">
              <BookOpen className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
