import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SoloGame } from "@/components/game/SoloGame";
import { AVATARS } from "@/lib/game/constants";

export const Route = createFileRoute("/play")({
  component: PlayPage,
});

function PlayPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"setup" | "playing">("setup");
  const [displayName, setDisplayName] = useState("");
  const [avatarId, setAvatarId] = useState(0);
  const [cpuCount, setCpuCount] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("dataviz:displayName");
    if (stored) setDisplayName(stored);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !displayName) return;
    window.localStorage.setItem("dataviz:displayName", displayName);
  }, [displayName]);

  if (stage === "playing") {
    return (
      <SoloGame displayName={displayName.trim() || "You"} avatarId={avatarId} cpuCount={cpuCount} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-5 md:px-10 border-b border-border/60">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-accent" />
          Data Viz
        </div>
        <div className="w-12" />
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Quick Play</h1>
        <p className="mt-2 text-muted-foreground">
          Pick a name, choose your avatar, and play against the computer. No login required.
        </p>

        <Card className="mt-8 space-y-6 p-6">
          <div className="space-y-1.5">
            <div className="text-sm font-medium">Display name</div>
            <Input
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Avatar</div>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAvatarId(a.id)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${
                    avatarId === a.id
                      ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: a.color, color: "white" }}
                  aria-label={a.name}
                >
                  {a.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Opponents</div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <Button
                  key={n}
                  type="button"
                  variant={cpuCount === n ? "default" : "outline"}
                  onClick={() => setCpuCount(n as 1 | 2 | 3)}
                >
                  {n} CPU
                </Button>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={!displayName.trim()}
            onClick={() => setStage("playing")}
          >
            Start Game
          </Button>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Want to play with friends?{" "}
          <button
            className="font-medium text-primary underline-offset-4 hover:underline"
            onClick={() => navigate({ to: "/lobby" })}
          >
            Open the multiplayer lobby
          </button>
        </div>
      </main>
    </div>
  );
}
