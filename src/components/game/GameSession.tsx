import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Copy, Hash, Share2, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GameBoard } from "./GameBoard";
import { PlayerPanel } from "./PlayerPanel";
import { PropertiesBreakdown } from "./PropertiesBreakdown";
import { DiceRoller } from "./DiceRoller";
import { QuestionOverlay } from "./QuestionOverlay";
import { HudCard } from "./board3d/HudCard";
import { buildInitialGameState, useMultiplayerGame } from "@/lib/game/use-multiplayer-game";
import type { GameState } from "@/lib/game/engine-types";
import { getSessionId } from "@/lib/session-id";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { AVATARS } from "@/lib/game/constants";
import { ThemeToggle } from "@/components/ThemeToggle";
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

const ROOM_CODE_RE = /^[A-Z0-9]{6}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function GameSession({ roomId }: Props) {
  const navigate = useNavigate();
  const userId = getSessionId();
  const [localDisplayName, setLocalDisplayName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("dataviz:displayName") ?? "";
  });
  const [pendingName, setPendingName] = useState("");
  const [roomInfo, setRoomInfo] = useState<{
    code: string;
    max_players: number;
    host_id: string;
    status: "waiting" | "in_progress" | "completed";
  } | null>(null);
  const [roomPlayers, setRoomPlayers] = useState<RoomPlayer[]>([]);
  const [loadingRoomData, setLoadingRoomData] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [startingGame, setStartingGame] = useState(false);
  const [roomGameState, setRoomGameState] = useState<GameState | null>(null);
  const [resolvedRoomId, setResolvedRoomId] = useState<string | null>(null);
  const [resolvedRoomCode, setResolvedRoomCode] = useState<string | null>(null);
  const joinAttemptRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = () => {
      const stored = window.localStorage.getItem("dataviz:displayName");
      if (stored) setLocalDisplayName(stored);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const raw = roomId.trim();
    if (UUID_RE.test(raw)) {
      setResolvedRoomId(raw);
      return;
    }

    const code = raw.toUpperCase();
    if (!ROOM_CODE_RE.test(code)) {
      toast.error("Invalid room code. Please recheck the invite link.");
      navigate({ to: "/lobby" });
      return;
    }

    let active = true;
    (async () => {
      const { data: room, error } = await supabase
        .from("rooms")
        .select("id, code")
        .eq("code", code)
        .maybeSingle();

      if (!active) return;
      if (error || !room) {
        console.error("Supabase room lookup error:", error);
        toast.error("Room not found. Please ask the host for a new link.");
        navigate({ to: "/lobby" });
        return;
      }

      setResolvedRoomId(room.id);
      setResolvedRoomCode(room.code);
    })();

    return () => {
      active = false;
    };
  }, [navigate, roomId]);

  useEffect(() => {
    if (!resolvedRoomId) return undefined;

    const displayName = localDisplayName.trim();

    const ensureRoomMembership = async (
      room: {
        id: string;
        max_players: number | null;
        status: "waiting" | "in_progress" | "completed";
        code: string;
      },
      players: RoomPlayer[] | null,
    ) => {
      if (players?.some((player) => player.player_id === userId)) return;
      if (!displayName) return;
      if (room.status !== "waiting") {
        toast.error("That room has already started.");
        navigate({ to: "/lobby" });
        return;
      }
      if (joinAttemptRef.current === room.id) return;

      joinAttemptRef.current = room.id;
      setJoiningRoom(true);
      const seatOrder = players?.length ?? 0;

      const { error: joinError } = await supabase.from("room_players").upsert(
        {
          room_id: room.id,
          player_id: userId,
          display_name: displayName,
          avatar_id: null,
          seat_order: seatOrder,
        },
        { onConflict: "room_id,player_id", ignoreDuplicates: true },
      );

      if (joinError) {
        console.error("Supabase room_players join error:", joinError);
        toast.error("Could not join the room. Please try again.");
        setJoiningRoom(false);
        joinAttemptRef.current = null;
        return;
      }

      setJoiningRoom(false);
    };

    const loadRoomData = async () => {
      setLoadingRoomData(true);

      const [{ data: room, error: roomError }, { data: players, error: playersError }] =
        await Promise.all([
          supabase
            .from("rooms")
            .select("id, code, max_players, host_id, status, game_state")
            .eq("id", resolvedRoomId)
            .maybeSingle(),
          supabase
            .from("room_players")
            .select("player_id, display_name, avatar_id, seat_order")
            .eq("room_id", resolvedRoomId)
            .order("seat_order", { ascending: true }),
        ]);

      if (roomError) {
        console.error("Supabase room lookup error:", roomError);
      }
      if (playersError) {
        console.error("Supabase room_players lookup error:", playersError);
      }

      if (room) {
        setRoomInfo({
          code: room.code,
          max_players: room.max_players ?? 4,
          host_id: room.host_id,
          status: room.status,
        });
        setRoomGameState((room.game_state as GameState | null) ?? null);
        setResolvedRoomCode(room.code);
      } else {
        toast.error("Room not found. Please return to the lobby.");
        navigate({ to: "/lobby" });
      }

      if (players) {
        setRoomPlayers(
          players.map((player) => ({
            player_id: player.player_id,
            display_name: player.display_name,
            avatar_id: player.avatar_id,
            seat_order: player.seat_order,
          })),
        );
      }

      setLoadingRoomData(false);
      if (room) {
        await ensureRoomMembership(room, players ?? null);
      }
    };

    void loadRoomData();

    const channel = supabase
      .channel(`room-setup-${resolvedRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_players",
          filter: `room_id=eq.${resolvedRoomId}`,
        },
        () => void loadRoomData(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${resolvedRoomId}` },
        () => void loadRoomData(),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [navigate, localDisplayName, resolvedRoomId, userId]);

  const meInRoom = roomPlayers.find((player) => player.player_id === userId);
  const requiredPlayers = roomInfo?.max_players ?? 4;
  const isHost = roomInfo?.host_id === userId;
  const playersReady = roomPlayers.length >= requiredPlayers;
  const avatarsReady = roomPlayers.every((player) => player.avatar_id !== null);
  const setupReady = playersReady && avatarsReady;
  const roomStarted = roomInfo?.status === "in_progress";

  async function startRoomGame() {
    if (!isHost || !setupReady || !resolvedRoomId) return;

    setStartingGame(true);
    const firstPlayer = [...roomPlayers].sort((a, b) => a.seat_order - b.seat_order)[0];
    const hostPlayer = roomPlayers.find((player) => player.player_id === userId);
    const opponents = roomPlayers
      .filter((player) => player.player_id !== userId)
      .map((player) => ({
        id: player.player_id,
        name: player.display_name,
        avatarId: player.avatar_id ?? player.seat_order % AVATARS.length,
      }));

    const initialGameState = buildInitialGameState(
      userId,
      hostPlayer?.display_name ?? (localDisplayName || "Host"),
      hostPlayer?.avatar_id ?? 0,
      opponents,
    );
    initialGameState.currentPlayerId = firstPlayer?.player_id ?? userId;

    const { error } = await supabase
      .from("rooms")
      .update({
        status: "in_progress",
        current_turn_player_id: firstPlayer?.player_id ?? null,
        game_state: initialGameState as unknown as Json,
      })
      .eq("id", resolvedRoomId)
      .eq("host_id", userId);

    if (error) {
      console.error("Start room game error", error);
      toast.error("Could not start game. Please try again.");
    }

    setStartingGame(false);
  }

  async function selectRoomAvatar(nextAvatarId: number) {
    if (!resolvedRoomId) return;

    setSavingAvatar(true);
    const { error } = await supabase
      .from("room_players")
      .update({ avatar_id: nextAvatarId })
      .eq("room_id", resolvedRoomId)
      .eq("player_id", userId);

    if (error) {
      console.error("Avatar selection error", error);
      toast.error("That avatar is already taken. Pick another one.");
    }

    setSavingAvatar(false);
  }

  const roomOpponents = roomPlayers
    .filter((player) => player.player_id !== userId)
    .map((player) => ({
      id: player.player_id,
      name: player.display_name,
      avatarId: player.avatar_id ?? player.seat_order % AVATARS.length,
    }));

  async function persistRoomState(nextState: GameState) {
    if (!roomStarted || !resolvedRoomId) return;

    const { error } = await supabase
      .from("rooms")
      .update({
        game_state: nextState as unknown as Json,
        current_turn_player_id: nextState.currentPlayerId,
      })
      .eq("id", resolvedRoomId);

    if (error) {
      console.error("Persist room game_state error", error);
    }
  }

  const game = useMultiplayerGame({
    enabled: roomStarted && !!roomGameState,
    humanName: meInRoom?.display_name ?? (localDisplayName || "You"),
    humanAvatar: meInRoom?.avatar_id ?? 0,
    opponents: roomOpponents,
    localPlayerId: userId,
    initialState: roomGameState,
    externalState: roomGameState,
    onStateChange: (nextState) => {
      void persistRoomState(nextState);
    },
  });

  if (!roomStarted && (loadingRoomData || joiningRoom || !resolvedRoomId)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Setting up the board…
      </div>
    );
  }

  if (!roomStarted && !meInRoom && !localDisplayName.trim()) {
    const submitName = () => {
      const next = pendingName.trim();
      if (!next) {
        toast.error("Enter a display name to join.");
        return;
      }
      try {
        window.localStorage.setItem("dataviz:displayName", next);
      } catch {
        // ignore storage errors; in-memory state is sufficient to proceed
      }
      setLocalDisplayName(next);
    };
    return (
      <div className="min-h-screen bg-background">
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div className="w-10" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-accent" /> Join Room
          </div>
          <ThemeToggle />
        </header>
        <main className="mx-auto max-w-md px-6 py-12">
          <Card className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Enter your name</h2>
            <p className="text-sm text-muted-foreground">
              You're joining room{" "}
              <span className="font-mono text-foreground">
                {roomInfo?.code ?? resolvedRoomCode ?? roomId.slice(0, 6).toUpperCase()}
              </span>
              . Pick a display name so other players can see you.
            </p>
            <Input
              autoFocus
              value={pendingName}
              onChange={(event) => setPendingName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitName();
              }}
              placeholder="Your name"
              maxLength={32}
            />
            <Button className="w-full" onClick={submitName} disabled={!pendingName.trim()}>
              Join Room
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  if (!roomStarted) {
    const takenByOthers = new Set(
      roomPlayers
        .filter((player) => player.player_id !== userId && player.avatar_id !== null)
        .map((player) => player.avatar_id as number),
    );
    const orderedPlayers = [...roomPlayers].sort((a, b) => a.seat_order - b.seat_order);
    const slots = Array.from({ length: requiredPlayers }, (_, index) => orderedPlayers[index] ?? null);

    return (
      <div className="min-h-screen bg-background">
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div className="w-10" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-accent" /> Room Setup
          </div>
          <ThemeToggle />
        </header>

        <main className="mx-auto grid max-w-4xl gap-6 px-6 py-8 lg:grid-cols-2">
          <Card className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Room Details</h2>
            {(() => {
              const shareCode = roomInfo?.code ?? resolvedRoomCode;
              const shareUrl =
                shareCode && typeof window !== "undefined"
                  ? `${window.location.origin}/game/${shareCode}`
                  : null;
              const waMessage = shareCode
                ? `Join my Data Guardian game! Room code: ${shareCode}\n${shareUrl ?? ""}`.trim()
                : "";
              const waHref = waMessage
                ? `https://wa.me/?text=${encodeURIComponent(waMessage)}`
                : "#";
              const onCopy = async () => {
                if (!shareCode) return;
                try {
                  await navigator.clipboard.writeText(shareUrl ?? shareCode);
                  toast.success("Invite link copied");
                } catch {
                  toast.error("Could not copy link");
                }
              };
              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="h-4 w-4" /> Room code:{" "}
                    <span className="font-mono text-base tracking-[0.3em] text-foreground">
                      {shareCode ?? roomId.slice(0, 6).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={onCopy}
                      disabled={!shareCode}
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy link
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-[#25D366] text-white hover:bg-[#1ebe57]"
                      asChild
                      disabled={!shareCode}
                    >
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!shareCode}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Share on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })()}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" /> Players joined:{" "}
              <span className="text-foreground">
                {roomPlayers.length}/{requiredPlayers}
              </span>
            </div>
            <div className="space-y-2">
              {slots.map((slot, index) => {
                const avatar =
                  slot?.avatar_id !== null && slot?.avatar_id !== undefined
                    ? AVATARS[slot.avatar_id % AVATARS.length]
                    : null;
                return (
                  <div
                    key={slot?.player_id ?? `slot-${index}`}
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-secondary/30 px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${
                          avatar ? "text-white" : "bg-muted text-muted-foreground"
                        }`}
                        style={avatar ? { backgroundColor: avatar.color } : undefined}
                      >
                        {avatar ? avatar.emoji : "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {slot ? slot.display_name : `Open slot ${index + 1}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {slot
                            ? avatar
                              ? "Avatar selected"
                              : "Avatar pending"
                            : "Share the room code to invite"}
                        </div>
                      </div>
                    </div>
                    {slot?.player_id === userId ? <span className="text-xs text-primary">You</span> : null}
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

          <Card className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Select Your Avatar</h2>
            <p className="text-sm text-muted-foreground">
              Once selected, that avatar cannot be chosen by other players.
            </p>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((avatar) => {
                const selectedByMe = meInRoom?.avatar_id === avatar.id;
                const taken = takenByOthers.has(avatar.id);
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    disabled={taken || savingAvatar}
                    onClick={() => void selectRoomAvatar(avatar.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${
                      selectedByMe
                        ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : taken
                          ? "cursor-not-allowed opacity-30"
                          : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: avatar.color, color: "white" }}
                    aria-label={avatar.name}
                  >
                    {avatar.emoji}
                  </button>
                );
              })}
            </div>
            <div className="text-sm text-muted-foreground">
              Your avatar:{" "}
              <span className="text-foreground">
                {meInRoom?.avatar_id !== null && meInRoom?.avatar_id !== undefined
                  ? AVATARS[meInRoom.avatar_id % AVATARS.length].emoji
                  : "Not selected"}
              </span>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!game.state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Starting game…
      </div>
    );
  }

  const { state } = game;
  const localPlayerId = userId;
  const currentPlayer = state.players.find((player) => player.id === state.currentPlayerId);
  const isMyTurn = state.currentPlayerId === localPlayerId;
  const activeMcq = state.activeMcq;
  const activeCard = state.activeCard;
  const lastMcqResult = state.lastMcqResult;
  const winner = state.winner;

  return (
    <div className="min-h-screen bg-gradient-board text-foreground">
      <header className="flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-4 backdrop-blur">
        <div />
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-accent" />
            {`Room ${roomInfo?.code ?? resolvedRoomCode ?? roomId.slice(0, 8)}…`}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentPlayer ? `${currentPlayer.name}'s turn` : "Waiting for turn state…"}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button size="sm" variant="ghost" onClick={() => {
            game.leaveGame();
            navigate({ to: "/" });
          }}>
            Leave
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)_340px] lg:px-6 lg:py-8">
        <aside className="space-y-4">
          <Card className="relative overflow-hidden border-border/70 bg-card/90 p-4 shadow-soft">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Match</div>
            <div
              className="mt-2 font-display text-xl font-bold"
              style={{
                background: "linear-gradient(90deg,#3affd9 0%,#ff3aff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {`Room ${roomInfo?.code ?? resolvedRoomCode ?? "…"}`}
            </div>
            <div
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                state.phase === "ended"
                  ? "bg-amber-400/15 text-amber-400"
                  : isMyTurn
                    ? "bg-primary/15 text-primary animate-pulse"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  state.phase === "ended"
                    ? "bg-amber-400"
                    : isMyTurn
                      ? "bg-primary"
                      : "bg-muted-foreground"
                }`}
              />
              {state.phase === "ended" && winner
                ? `Winner: ${winner.name}`
                : isMyTurn
                  ? "Your move"
                  : `${currentPlayer?.name ?? "Next player"} acting…`}
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

            {state.lastRoll != null ? (
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-2 bottom-2">
                  <HudCard accent="#3affd9">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      Dice Roll
                    </div>
                    <div className="font-display text-2xl font-semibold text-[#3affd9]">
                      {state.lastRoll}
                    </div>
                  </HudCard>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="space-y-4">
          <Card className="border-border/70 bg-card/90 p-4 shadow-soft">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Action Desk</div>
            <div className="mt-3 space-y-3">
              {state.phase === "mcq" && activeMcq ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/40 p-4 text-sm text-muted-foreground">
                  {isMyTurn
                    ? `Answering ${activeMcq.principleName}…`
                    : `${currentPlayer?.name ?? "Player"} is answering ${activeMcq.principleName}.`}
                </div>
              ) : state.phase === "purchase" && state.pendingBuy ? (
                <>
                  <div>
                    <div className="text-lg font-semibold">{state.pendingBuy.principle.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Purchase unlocked after a correct answer.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed">
                    Price ₹{state.pendingBuy.principle.price}. Base rent ₹
                    {state.pendingBuy.principle.baseRent}. Layer cost ₹
                    {state.pendingBuy.principle.layerCost}.
                  </div>
                  {lastMcqResult ? (
                    <div className="rounded-2xl border border-border/60 bg-background p-4 text-sm leading-relaxed">
                      <div className="font-medium">
                        {lastMcqResult.wasCorrect ? "Correct" : "Incorrect"} — answer{" "}
                        {lastMcqResult.correctAnswer}
                      </div>
                      {lastMcqResult.explanation ? (
                        <div className="mt-2 text-muted-foreground">
                          {lastMcqResult.explanation}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={game.buyProperty} disabled={!isMyTurn} className="rounded-xl">
                      Buy
                    </Button>
                    <Button
                      onClick={game.skipPurchase}
                      disabled={!isMyTurn}
                      variant="secondary"
                      className="rounded-xl"
                    >
                      Skip
                    </Button>
                  </div>
                </>
              ) : state.phase === "build" && state.pendingBuild ? (
                <>
                  <div>
                    <div className="text-lg font-semibold">{state.pendingBuild.principle.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Build one Compliance Layer on this tile.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed">
                    Cost ₹{state.pendingBuild.principle.layerCost}. Layers must be built evenly
                    across the color group.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={game.buildLayer} disabled={!isMyTurn} className="rounded-xl">
                      Build
                    </Button>
                    <Button
                      onClick={game.skipBuild}
                      disabled={!isMyTurn}
                      variant="secondary"
                      className="rounded-xl"
                    >
                      Skip
                    </Button>
                  </div>
                </>
              ) : state.phase === "regulator" && activeCard ? (
                <>
                  <div>
                    <div className="text-lg font-semibold">{activeCard.title}</div>
                    <div className="text-sm text-muted-foreground">Regulator event</div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed">
                    {activeCard.body}
                  </div>
                  <Button
                    onClick={() => game.acknowledgeCard()}
                    disabled={!isMyTurn}
                    className="w-full rounded-xl"
                  >
                    Acknowledge event
                  </Button>
                </>
              ) : state.phase === "turn_end" ? (
                <>
                  <div>
                    <div className="text-lg font-semibold">Turn resolved</div>
                    <div className="text-sm text-muted-foreground">
                      {state.message || "Review the result, then end your turn."}
                    </div>
                  </div>
                  {lastMcqResult ? (
                    <div className="rounded-2xl border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed">
                      <div className="font-medium">
                        {lastMcqResult.principleName}:{" "}
                        {lastMcqResult.wasCorrect ? "correct" : "incorrect"}
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        Your answer: {lastMcqResult.picked}. Correct answer:{" "}
                        {lastMcqResult.correctAnswer}.
                      </div>
                      {lastMcqResult.explanation ? (
                        <div className="mt-3 text-muted-foreground">
                          {lastMcqResult.explanation}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/40 p-4 text-sm text-muted-foreground">
                      {state.message}
                    </div>
                  )}
                  {state.pendingSell ? (
                    <div className="space-y-3 rounded-2xl border border-green-500/30 bg-green-50/20 p-4">
                      <div className="text-sm leading-relaxed">
                        <div className="font-semibold text-green-700">{state.pendingSell.principle.name}</div>
                        <div className="text-green-600">Sell for ₹{state.pendingSell.principle.price}?</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={game.sellProperty}
                          disabled={!isMyTurn}
                          variant="default"
                          className="rounded-xl"
                        >
                          Sell
                        </Button>
                        <Button
                          onClick={game.skipSell}
                          disabled={!isMyTurn}
                          variant="secondary"
                          className="rounded-xl"
                        >
                          Keep
                        </Button>
                      </div>
                    </div>
                  ) : null}
                  <Button onClick={game.endTurn} disabled={!isMyTurn} className="w-full rounded-xl">
                    End Turn
                  </Button>
                </>
              ) : state.phase === "ended" && winner ? (
                <>
                  <div>
                    <div className="text-lg font-semibold">{winner.name} wins</div>
                    <div className="text-sm text-muted-foreground">Last compliant entity standing.</div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-secondary/50 p-4 text-sm leading-relaxed">
                    The match has ended. Keep the tab open to review the board or use the lobby to create a new room.
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ask the host to start a new room for another round.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-lg font-semibold">Turn ready</div>
                    <div className="text-sm text-muted-foreground">
                      {state.message || "Roll from the center of the board. Prompts stay in this panel."}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/40 p-4 text-sm text-muted-foreground">
                    {isMyTurn
                      ? "Your roll is available."
                      : `${currentPlayer?.name ?? "Another player"} is moving now.`}
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="border-border/70 bg-card/90 p-4 shadow-soft">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Rules</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Roll one die each turn.</li>
              <li>• Correct unowned-tile answers unlock buying.</li>
              <li>• Correct opponent-tile answers avoid rent.</li>
              <li>• In DPB Hearing, roll a 6 within three attempts or pay ₹50.</li>
              <li>• Penalty tiles feed the Free Audit pot.</li>
            </ul>
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
    </div>
  );
}
