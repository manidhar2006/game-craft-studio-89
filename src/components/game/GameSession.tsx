import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Hash, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameBoard } from "./GameBoard";
import { PlayerPanel } from "./PlayerPanel";
import { DiceRoller } from "./DiceRoller";
import { MCQModal } from "./MCQModal";
import { RegulatorCardModal } from "./RegulatorCardModal";
import { EndScreen } from "./EndScreen";
import { buildInitialGameState, useSoloGame } from "@/lib/game/use-solo-game";
import type { GameState, Player } from "@/lib/game/engine-types";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { AVATARS } from "@/lib/game/constants";
import { toast } from "sonner";

interface Props {
  roomId: string;
}

interface RoomPlayer {
  player_id: string;
  display_name: string;
  avatar_id: number | null;
  seat_order: number;
}

export function GameSession({ roomId }: Props) {
  const isSolo = roomId === "solo";
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ display_name: string; avatar_id: number } | null>(null);
  const [roomInfo, setRoomInfo] = useState<{
    code: string;
    max_players: number;
    host_id: string;
    status: "waiting" | "in_progress" | "completed";
  } | null>(null);
  const [roomPlayers, setRoomPlayers] = useState<RoomPlayer[]>([]);
  const [loadingRoomData, setLoadingRoomData] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [startingGame, setStartingGame] = useState(false);
  const [roomGameState, setRoomGameState] = useState<GameState | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, avatar_id").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile({ display_name: data.display_name, avatar_id: data.avatar_id ?? 0 });
    });
  }, [user]);

  useEffect(() => {
    if (isSolo || !user) return undefined;

    const loadRoomData = async () => {
      setLoadingRoomData(true);
      const [{ data: room }, { data: players }] = await Promise.all([
        supabase
          .from("rooms")
          .select("code, max_players, host_id, status, game_state")
          .eq("id", roomId)
          .maybeSingle(),
        supabase
          .from("room_players")
          .select("player_id, display_name, avatar_id, seat_order")
          .eq("room_id", roomId)
          .order("seat_order", { ascending: true }),
      ]);
      if (room) {
        setRoomInfo({
          code: room.code,
          max_players: room.max_players ?? 4,
          host_id: room.host_id,
          status: room.status,
        });
        setRoomGameState((room.game_state as GameState | null) ?? null);
      }
      if (players) {
        setRoomPlayers(
          players.map((p) => ({
            player_id: p.player_id,
            display_name: p.display_name,
            avatar_id: p.avatar_id,
            seat_order: p.seat_order,
          })),
        );
      }
      setLoadingRoomData(false);
    };

    void loadRoomData();

    const channel = supabase
      .channel(`room-setup-${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_players", filter: `room_id=eq.${roomId}` },
        () => void loadRoomData(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${roomId}` },
        () => void loadRoomData(),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isSolo, roomId, user]);

  const meInRoom = !isSolo ? roomPlayers.find((p) => p.player_id === user?.id) : null;
  const requiredPlayers = roomInfo?.max_players ?? 4;
  const isHost = !isSolo && !!user && roomInfo?.host_id === user.id;
  const playersReady = !isSolo && roomPlayers.length >= requiredPlayers;
  const avatarsReady = !isSolo && roomPlayers.every((p) => p.avatar_id !== null);
  const setupReady = playersReady && avatarsReady;
  const roomStarted = !isSolo && roomInfo?.status === "in_progress";

  async function startRoomGame() {
    if (!user || isSolo || !isHost || !setupReady) return;
    setStartingGame(true);
    const firstPlayer = [...roomPlayers].sort((a, b) => a.seat_order - b.seat_order)[0];
    const hostPlayer = roomPlayers.find((p) => p.player_id === user.id);
    const opponents = roomPlayers
      .filter((p) => p.player_id !== user.id)
      .map((p) => ({
        id: p.player_id,
        name: p.display_name,
        avatarId: p.avatar_id ?? (p.seat_order % AVATARS.length),
      }));
    const initialGameState = buildInitialGameState(
      user.id,
      hostPlayer?.display_name ?? profile?.display_name ?? "Host",
      hostPlayer?.avatar_id ?? profile?.avatar_id ?? 0,
      opponents,
    );
    initialGameState.currentPlayerId = firstPlayer?.player_id ?? user.id;
    const { error } = await supabase
      .from("rooms")
      .update({
        status: "in_progress",
        current_turn_player_id: firstPlayer?.player_id ?? null,
        game_state: initialGameState,
      })
      .eq("id", roomId)
      .eq("host_id", user.id);
    if (error) {
      console.error("Start room game error", error);
      toast.error("Could not start game. Please try again.");
    }
    setStartingGame(false);
  }

  async function selectRoomAvatar(nextAvatarId: number) {
    if (!user || isSolo) return;
    setSavingAvatar(true);
    const { error } = await supabase
      .from("room_players")
      .update({ avatar_id: nextAvatarId })
      .eq("room_id", roomId)
      .eq("player_id", user.id);
    if (error) {
      console.error("Avatar selection error", error);
      toast.error("That avatar is already taken. Pick another one.");
    }
    setSavingAvatar(false);
  }

  const roomOpponents = !isSolo
    ? roomPlayers
        .filter((p) => p.player_id !== user?.id)
        .map((p) => ({
          id: p.player_id,
          name: p.display_name,
          avatarId: p.avatar_id ?? (p.seat_order % AVATARS.length),
        }))
    : undefined;

  async function persistRoomState(nextState: GameState) {
    if (isSolo || !roomStarted || !user) return;
    const { error } = await supabase
      .from("rooms")
      .update({ game_state: nextState, current_turn_player_id: nextState.currentPlayerId })
      .eq("id", roomId);
    if (error) {
      console.error("Persist room game_state error", error);
    }
  }

  const game = useSoloGame({
    enabled: !!profile && (isSolo || (roomStarted && !!roomGameState)),
    humanName: isSolo ? (profile?.display_name ?? "You") : (meInRoom?.display_name ?? profile?.display_name ?? "You"),
    humanAvatar: isSolo ? (profile?.avatar_id ?? 0) : (meInRoom?.avatar_id ?? 0),
    opponents: roomOpponents,
    localPlayerId: isSolo ? "human" : (user?.id ?? "human"),
    autoPlayBots: isSolo,
    initialState: isSolo ? null : roomGameState,
    externalState: isSolo ? null : roomGameState,
    onStateChange: isSolo ? undefined : (nextState) => {
      void persistRoomState(nextState);
    },
  });

  if (!profile || (!isSolo && loadingRoomData)) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Setting up the board…</div>;
  }

  if (!isSolo && !roomStarted) {
    const takenByOthers = new Set(
      roomPlayers
        .filter((p) => p.player_id !== user?.id && p.avatar_id !== null)
        .map((p) => p.avatar_id as number),
    );
    const orderedPlayers = [...roomPlayers].sort((a, b) => a.seat_order - b.seat_order);
    const slots = Array.from({ length: requiredPlayers }, (_, idx) => orderedPlayers[idx] ?? null);

    return (
      <div className="min-h-screen bg-background">
        <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <Link to="/lobby" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Lobby
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-accent" /> Room Setup
          </div>
          <div />
        </header>

        <main className="mx-auto max-w-4xl px-6 py-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Room Details</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" /> Room ID: <span className="font-mono text-foreground">{roomInfo?.code ?? roomId.slice(0, 8)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" /> Players joined: <span className="text-foreground">{roomPlayers.length}/{requiredPlayers}</span>
            </div>
            <div className="space-y-2">
              {slots.map((slot, idx) => {
                const avatar = slot?.avatar_id !== null && slot?.avatar_id !== undefined
                  ? AVATARS[slot.avatar_id % AVATARS.length]
                  : null;
                return (
                  <div
                    key={slot?.player_id ?? `slot-${idx}`}
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-secondary/30 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${
                          avatar ? "text-white" : "bg-muted text-muted-foreground"
                        }`}
                        style={avatar ? { backgroundColor: avatar.color } : undefined}
                      >
                        {avatar ? avatar.emoji : "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {slot ? slot.display_name : `Open slot ${idx + 1}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {slot ? (avatar ? avatar.name : "Avatar pending") : "Share the room code to invite"}
                        </div>
                      </div>
                    </div>
                    {slot?.player_id === user?.id ? (
                      <span className="text-xs text-primary">You</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="text-sm text-muted-foreground">
              {setupReady
                ? isHost
                  ? "All players are ready. Start the game when you are ready."
                  : "All players are ready. Waiting for host to start the game."
                : "Waiting for all selected players to join and choose unique avatars."}
            </div>
            {isHost && (
              <Button className="w-full" onClick={() => void startRoomGame()} disabled={!setupReady || startingGame}>
                {startingGame ? "Starting…" : "Start Game"}
              </Button>
            )}
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Select Your Avatar</h2>
            <p className="text-sm text-muted-foreground">Once selected, that avatar cannot be chosen by other players.</p>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a) => {
                const selectedByMe = meInRoom?.avatar_id === a.id;
                const taken = takenByOthers.has(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    disabled={taken || savingAvatar}
                    onClick={() => void selectRoomAvatar(a.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${
                      selectedByMe
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                        : taken
                          ? "opacity-30 cursor-not-allowed"
                          : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: a.color, color: "white" }}
                    aria-label={a.name}
                  >
                    {a.emoji}
                  </button>
                );
              })}
            </div>
            <div className="text-sm text-muted-foreground">
              Your avatar: <span className="text-foreground">{meInRoom?.avatar_id !== null && meInRoom?.avatar_id !== undefined ? AVATARS[meInRoom.avatar_id % AVATARS.length].name : "Not selected"}</span>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!game.state) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Starting game…</div>;
  }

  const { state } = game;
  const localPlayerId = isSolo ? "human" : (user?.id ?? "");

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
        <Link to="/lobby" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Lobby
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-accent" /> {isSolo ? "Solo Practice" : `Room ${roomId.slice(0, 8)}…`}
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
              isHumanTurn={state.currentPlayerId === localPlayerId}
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