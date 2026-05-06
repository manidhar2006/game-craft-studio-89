import { useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameBoard } from "./GameBoard";
import { PlayerPanel } from "./PlayerPanel";
import { PropertiesBreakdown } from "./PropertiesBreakdown";
import { DiceRoller } from "./DiceRoller";
import { QuestionOverlay } from "./QuestionOverlay";
import { RegulatorCardModal } from "./RegulatorCardModal";
import { EndScreen } from "./EndScreen";
import { HudCard } from "./board3d/HudCard";
import { PLAYER_TOKEN_COLORS } from "./board3d/boardLayout";
import { useMultiplayerGame } from "@/lib/game/use-multiplayer-game";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AVATARS } from "@/lib/game/constants";

const LOCAL_PLAYER_ID = "you";

const CPU_OPPONENTS = [
  { id: "cpu-1", name: "Compliance AI", avatarId: 1 },
  { id: "cpu-2", name: "Auditron", avatarId: 2 },
  { id: "cpu-3", name: "Sentinel", avatarId: 3 },
];

interface Props {
  displayName: string;
  avatarId: number;
  cpuCount: 1 | 2 | 3;
}

export function SoloGame({ displayName, avatarId, cpuCount }: Props) {
  const navigate = useNavigate();
  const opponents = useMemo(() => CPU_OPPONENTS.slice(0, cpuCount), [cpuCount]);

  const game = useMultiplayerGame({
    enabled: true,
    humanName: displayName || "You",
    humanAvatar: avatarId,
    opponents,
    localPlayerId: LOCAL_PLAYER_ID,
  });

  const state = game.state;

  // Auto-drive CPU turns
  useEffect(() => {
    if (!state) return;
    const current = state.players.find((p) => p.id === state.currentPlayerId);
    if (!current || current.id === LOCAL_PLAYER_ID || current.isEliminated) return;

    if (state.phase === "idle") {
      const t = setTimeout(() => game.rollDice(), 800);
      return () => clearTimeout(t);
    }
    if (state.phase === "regulator") {
      const t = setTimeout(() => game.acknowledgeCard(current.id), 1200);
      return () => clearTimeout(t);
    }
  }, [state, game]);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Setting up the table…
      </div>
    );
  }

  const currentPlayer = state.players.find((p) => p.id === state.currentPlayerId);
  const isMyTurn = state.currentPlayerId === LOCAL_PLAYER_ID;
  const activeMcq = state.activeMcq;
  const activeCard = state.activeCard;
  const lastMcqResult = state.lastMcqResult;
  const winner = state.winner;

  return (
    <div className="min-h-screen bg-gradient-board text-foreground">
      <header className="flex items-center justify-between border-b border-border/40 bg-background/60 px-6 py-4 backdrop-blur">
        <Button size="sm" variant="ghost" onClick={() => navigate({ to: "/" })}>
          Leave
        </Button>
        <div className="flex flex-col items-center text-center">
          <div
            className="font-display text-xl font-semibold tracking-[0.18em]"
            style={{
              background: "linear-gradient(90deg,#3affd9 0%,#ff3aff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(58,255,217,0.4))",
            }}
          >
            DATA GUARDIAN
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            DPDP Compliance Quest
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)_340px] lg:px-6 lg:py-8">
        <aside className="space-y-4">
          <Card className="border-border/70 bg-card/90 p-4 shadow-soft">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Match</div>
            <div className="mt-2 text-lg font-semibold">Solo vs Computer</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {state.phase === "ended" && winner
                ? `Winner: ${winner.name}`
                : isMyTurn
                  ? "You are up"
                  : `${currentPlayer?.name ?? "Computer"} is acting`}
            </div>
          </Card>

          <div className="space-y-3">
            {state.players.map((player) => (
              <PlayerPanel
                key={player.id}
                player={player}
                avatar={AVATARS[player.avatarId % AVATARS.length]}
                isCurrent={player.id === state.currentPlayerId}
              />
            ))}
          </div>

          <PropertiesBreakdown state={state} />
        </aside>

        <section className="relative flex flex-col items-center gap-5">
          <div className="relative w-full">
            <GameBoard
              tiles={state.board}
              players={state.players}
              currentPlayerId={state.currentPlayerId}
              propertyOwners={state.propertyOwners}
              topDownCamera={state.phase === "mcq"}
              diceRolling={state.phase === "rolling"}
              diceValue={state.lastRoll}
              centerContent={
                <DiceRoller
                  disabled={!game.canRoll}
                  rolling={state.phase === "rolling"}
                  lastRoll={state.lastRoll}
                  onRoll={game.rollDice}
                  currentName={currentPlayer?.name ?? ""}
                  isHumanTurn={isMyTurn}
                />
              }
            />

            {/* Floating HUD overlays */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-2 top-2 flex flex-col gap-2">
                {state.players.slice(0, 2).map((p, idx) => {
                  const accent = PLAYER_TOKEN_COLORS[idx % PLAYER_TOKEN_COLORS.length];
                  return (
                    <HudCard key={p.id} accent={accent}>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-semibold tracking-widest"
                          style={{ color: accent }}
                        >
                          P{idx + 1}
                        </span>
                        <span className="text-xs text-white/60">{p.name}</span>
                      </div>
                      <div
                        className="font-display text-lg font-semibold"
                        style={{ color: accent }}
                      >
                        ₹{p.credits}
                      </div>
                    </HudCard>
                  );
                })}
              </div>
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                {state.players.slice(2, 4).map((p, idxOffset) => {
                  const idx = idxOffset + 2;
                  const accent = PLAYER_TOKEN_COLORS[idx % PLAYER_TOKEN_COLORS.length];
                  return (
                    <HudCard key={p.id} accent={accent} className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-white/60">{p.name}</span>
                        <span
                          className="text-xs font-semibold tracking-widest"
                          style={{ color: accent }}
                        >
                          P{idx + 1}
                        </span>
                      </div>
                      <div
                        className="font-display text-lg font-semibold"
                        style={{ color: accent }}
                      >
                        ₹{p.credits}
                      </div>
                    </HudCard>
                  );
                })}
              </div>
              {state.lastRoll != null ? (
                <div className="absolute right-2 bottom-2">
                  <HudCard accent="#3affd9">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      Dice Roll
                    </div>
                    <div className="font-display text-2xl font-semibold text-[#3affd9]">
                      {state.lastRoll}
                    </div>
                  </HudCard>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <Card className="border-border/70 bg-card/90 p-4 shadow-soft">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Action Desk</div>
            <div className="mt-3 space-y-3">
              {state.phase === "purchase" && state.pendingBuy ? (
                <>
                  <div className="text-lg font-semibold">{state.pendingBuy.principle.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Price ₹{state.pendingBuy.principle.price}.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={game.buyProperty} disabled={!isMyTurn}>
                      Buy
                    </Button>
                    <Button onClick={game.skipPurchase} disabled={!isMyTurn} variant="secondary">
                      Skip
                    </Button>
                  </div>
                </>
              ) : state.phase === "build" && state.pendingBuild ? (
                <>
                  <div className="text-lg font-semibold">{state.pendingBuild.principle.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Build a Compliance Layer for ₹{state.pendingBuild.principle.layerCost}.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={game.buildLayer} disabled={!isMyTurn}>
                      Build
                    </Button>
                    <Button onClick={game.skipBuild} disabled={!isMyTurn} variant="secondary">
                      Skip
                    </Button>
                  </div>
                </>
              ) : state.phase === "turn_end" ? (
                <>
                  <div className="text-sm text-muted-foreground">{state.message}</div>
                  {lastMcqResult ? (
                    <div className="rounded-2xl border border-border/60 bg-secondary/40 p-3 text-sm">
                      <div className="font-medium">
                        {lastMcqResult.principleName}:{" "}
                        {lastMcqResult.wasCorrect ? "correct" : "incorrect"}
                      </div>
                      {lastMcqResult.explanation ? (
                        <div className="mt-1 text-muted-foreground">{lastMcqResult.explanation}</div>
                      ) : null}
                    </div>
                  ) : null}
                  <Button onClick={game.endTurn} disabled={!isMyTurn} className="w-full">
                    End Turn
                  </Button>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">{state.message}</div>
              )}
            </div>
          </Card>
        </aside>
      </main>

      {activeMcq && state.phase === "mcq" && isMyTurn ? (
        <QuestionOverlay
          question={activeMcq.question}
          principleName={activeMcq.principleName}
          mode={activeMcq.mode}
          onAnswer={game.answerMcq}
        />
      ) : null}

      {activeCard && state.phase === "regulator" && isMyTurn ? (
        <RegulatorCardModal card={activeCard} onClose={() => game.acknowledgeCard()} />
      ) : null}

      {state.phase === "ended" && winner ? (
        <EndScreen winnerName={winner.name} onPlayAgain={() => game.reset()} />
      ) : null}
    </div>
  );
}
