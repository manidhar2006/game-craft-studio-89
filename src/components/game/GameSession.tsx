import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameBoard } from "./GameBoard";
import { PlayerPanel } from "./PlayerPanel";
import { DiceRoller } from "./DiceRoller";
import { MCQModal } from "./MCQModal";
import { RegulatorCardModal } from "./RegulatorCardModal";
import { EndScreen } from "./EndScreen";
import { useSoloGame } from "@/lib/game/use-solo-game";
import type { Player } from "@/lib/game/engine-types";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { AVATARS } from "@/lib/game/constants";

interface Props { roomId: string }

export function GameSession({ roomId }: Props) {
  const isSolo = roomId === "solo";
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ display_name: string; avatar_id: number } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, avatar_id").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile({ display_name: data.display_name, avatar_id: data.avatar_id ?? 0 });
    });
  }, [user]);

  const game = useSoloGame({
    enabled: isSolo && !!profile,
    humanName: profile?.display_name ?? "You",
    humanAvatar: profile?.avatar_id ?? 0,
  });

  if (!isSolo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <Sparkles className="h-10 w-10 text-primary" />
        <h1 className="text-2xl font-semibold">Multiplayer room ready</h1>
        <p className="max-w-md text-muted-foreground">
          Room <span className="font-mono">{roomId.slice(0, 8)}…</span> is created. Realtime sync will be wired up
          next. For now, jump into Solo Practice to experience the full board and gameplay.
        </p>
        <Button asChild>
          <Link to="/lobby">Back to Lobby</Link>
        </Button>
      </div>
    );
  }

  if (!profile || !game.state) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Setting up the board…</div>;
  }

  const { state } = game;
  const human = state.players[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
        <Link to="/lobby" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Lobby
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-accent" /> Solo Practice
        </div>
        <Button size="sm" variant="ghost" onClick={game.reset}>Restart</Button>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 lg:py-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="flex flex-col items-center">
          <GameBoard
            tiles={state.board}
            players={state.players}
            currentPlayerId={state.currentPlayerId}
            propertyOwners={state.propertyOwners}
          />
          <div className="mt-6 w-full max-w-2xl">
            <DiceRoller
              disabled={!game.canRoll}
              rolling={state.phase === "rolling"}
              lastRoll={state.lastRoll}
              onRoll={game.rollDice}
              currentName={state.players.find((p: Player) => p.id === state.currentPlayerId)?.name ?? ""}
              isHumanTurn={state.currentPlayerId === human.id}
            />
            {state.message && (
              <div className="mt-3 text-center text-sm text-muted-foreground italic">{state.message}</div>
            )}
          </div>
        </section>

        <aside className="space-y-3">
          {state.players.map((p: Player) => (
            <PlayerPanel
              key={p.id}
              player={p}
              avatar={AVATARS[p.avatarId % AVATARS.length]}
              isCurrent={p.id === state.currentPlayerId}
            />
          ))}
        </aside>
      </main>

      {state.phase === "mcq" && state.activeMcq && (
        <MCQModal
          question={state.activeMcq.question}
          principleName={state.activeMcq.principleName}
          mode={state.activeMcq.mode}
          onAnswer={game.answerMcq}
        />
      )}

      {state.phase === "regulator" && state.activeCard && (
        <RegulatorCardModal card={state.activeCard} onClose={game.acknowledgeCard} />
      )}

      {state.phase === "ended" && state.winner && (
        <EndScreen winnerName={state.winner.name} onPlayAgain={game.reset} />
      )}
    </div>
  );
}