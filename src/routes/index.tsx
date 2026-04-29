import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Dices, Shield, Users, BookOpen, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">DPDPA Tycoon</span>
        </div>
        <nav className="flex items-center gap-2">
          {!loading &&
            (user ? (
              <>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={() => navigate({ to: "/lobby" })}
                >
                  Open Lobby
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full" onClick={signOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth" search={{ mode: "signin" }}>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Sign in
                  </Button>
                </Link>
                <Link to="/auth" search={{ mode: "signup" }}>
                  <Button
                    size="sm"
                    className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            ))}
        </nav>
      </header>

      {/* Hero */}
      <main className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-12 text-center md:pt-20">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-accent" />A calm strategy game about India's data
          protection law
        </span>

        <h1 className="font-display text-5xl font-semibold tracking-tight text-balance md:text-7xl">
          Master the <span className="text-foreground">9 principles</span>
          <br />
          of DPDPA, one roll at a time.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          A Monopoly-style multiplayer learning game that turns the Digital Personal Data Protection
          Act 2023 into a quiet boardroom you actually want to play in.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 rounded-full px-8 text-base shadow-soft"
            onClick={() =>
              navigate({
                to: user ? "/lobby" : "/auth",
                search: user ? undefined : { mode: "signup" },
              })
            }
          >
            <Dices className="mr-2 h-5 w-5" />
            Get Started
          </Button>
          <Link to="/how-it-works">
            <Button size="lg" variant="ghost" className="h-12 rounded-full px-8 text-base">
              <BookOpen className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </Link>
        </div>

        {/* Feature pills */}
        <div className="mt-20 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "2–4 players",
              body: "Create a room and invite friends with a room link.",
            },
            {
              icon: Shield,
              title: "9 principles",
              body: "Each tile teaches one part of the Act through MCQs.",
            },
            {
              icon: Dices,
              title: "20–45 min",
              body: "Roll, answer, build compliance — last one standing wins.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card/70 p-5 text-left shadow-soft backdrop-blur"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-semibold">{title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{body}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
