import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Dices, Users, LogOut, Sparkles, Plus, Hash } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AVATARS, generateRoomCode, MAX_PLAYERS } from "@/lib/game/constants";
import { toast } from "sonner";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isSchemaCacheError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "PGRST002";
}

export const Route = createFileRoute("/lobby")({
  component: LobbyPage,
});

function LobbyPage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { mode: "signin" } });
  }, [user, loading, navigate]);
  const [displayName, setDisplayName] = useState("");
  const [avatarId, setAvatarId] = useState<number>(0);
  const [joinCode, setJoinCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | "solo">(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<2 | 3 | 4>(4);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("display_name, avatar_id").eq("id", user.id).maybeSingle();
      if (data) {
        setDisplayName(data.display_name ?? "");
        setAvatarId(data.avatar_id ?? 0);
      } else {
        setDisplayName(user.email?.split("@")[0] ?? "Player");
      }
    })();
  }, [user]);

  async function saveProfile() {
    if (!user) return;
    await supabase.from("profiles").upsert({ id: user.id, display_name: displayName, avatar_id: avatarId });
  }

  async function startSolo() {
    // open avatar selection first
    setPendingAction("solo");
  }

  async function createRoom(maxPlayers: 2 | 3 | 4) {
    if (!user) return;
    setCreating(true);
    try {
      const code = generateRoomCode();
      let room: { id: string } | null = null;
      let error: unknown = null;

      // PostgREST may briefly return PGRST002 while rebuilding schema cache.
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const result = await supabase
          .from("rooms")
          .insert({ code, host_id: user.id, status: "waiting", max_players: maxPlayers })
          .select("id")
          .single();
        room = result.data as { id: string } | null;
        error = result.error;
        if (!error) break;
        if (!isSchemaCacheError(error)) break;
        await wait(1200 * (attempt + 1));
      }

      if (error || !room) {
        console.error("Supabase create room error:", error);
        toast.error("Could not create room. If this is the first request after DB changes, wait a few seconds and retry.");
        setCreating(false);
        return;
      }

      // add player without avatar; avatar selection happens inside the room
      const { error: rpError } = await supabase.from("room_players").insert({
        room_id: room.id,
        player_id: user.id,
        display_name: displayName,
        avatar_id: null,
        seat_order: 0,
      });
      if (rpError) {
        console.error("Supabase room_players insert error:", rpError);
        toast.error("Could not add player to room — check console for details.");
        setCreating(false);
        return;
      }

      setCreating(false);
      setShowCreateRoomModal(false);
      navigate({ to: "/game/$roomId", params: { roomId: room.id } });
    } catch (e) {
      console.error("Create room failed:", e);
      toast.error("Network or service error while creating room.");
      setCreating(false);
    }
  }

  async function joinRoom() {
    if (!user || !joinCode.trim()) return;
    setJoining(true);
    const code = joinCode.trim().toUpperCase();
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("id, max_players, status")
      .eq("code", code)
      .maybeSingle();
    if (roomError) {
      console.error("Supabase room lookup error:", roomError);
      toast.error("Could not find that room. Please try again.");
      setJoining(false);
      return;
    }
    if (!room) {
      toast.error("Room not found");
      setJoining(false);
      return;
    }
    if (room.status !== "waiting") {
      toast.error("That room has already started.");
      setJoining(false);
      return;
    }

    const { error: joinError } = await supabase.from("room_players").upsert(
      { room_id: room.id, player_id: user.id, display_name: displayName, avatar_id: null, seat_order: 999 },
      { onConflict: "room_id,player_id" },
    );
    if (joinError) {
      console.error("Supabase room_players upsert error:", joinError);
      toast.error("Could not join the room. Please try again.");
      setJoining(false);
      return;
    }

    const { data: players, error: playersError } = await supabase
      .from("room_players")
      .select("player_id, seat_order")
      .eq("room_id", room.id);
    if (playersError) {
      console.error("Supabase room_players lookup error:", playersError);
    }

    const maxPlayers = room.max_players ?? MAX_PLAYERS;
    if ((players?.length ?? 0) > maxPlayers) {
      await supabase.from("room_players").delete().eq("room_id", room.id).eq("player_id", user.id);
      toast.error("Room is full");
      setJoining(false);
      return;
    }

    if (players) {
      const usedSeats = new Set(players.filter((p) => p.player_id !== user.id).map((p) => p.seat_order));
      let nextSeat = 0;
      while (usedSeats.has(nextSeat)) nextSeat += 1;
      await supabase
        .from("room_players")
        .update({ seat_order: nextSeat })
        .eq("room_id", room.id)
        .eq("player_id", user.id);
    }
    setJoining(false);
    navigate({ to: "/game/$roomId", params: { roomId: room.id } });
  }

  // actions executed after avatar is confirmed (solo only)
  async function confirmPendingAction() {
    if (!pendingAction || !user) return;
    await saveProfile();

    if (pendingAction === "solo") {
      navigate({ to: "/game/$roomId", params: { roomId: "solo" } });
    }

    setPendingAction(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-5 md:px-10 border-b border-border/60">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">DPDPA Tycoon</span>
        </Link>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Lobby</h1>
        <p className="mt-2 text-muted-foreground">Choose a mode to start</p>

        {/* Avatar confirmation modal shown after choosing a game mode */}
        {pendingAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Card className="w-full max-w-md p-6">
              <h3 className="text-lg font-semibold">Confirm your avatar</h3>
              <p className="mt-2 text-sm text-muted-foreground">Select an avatar and confirm to proceed.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {AVATARS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAvatarId(a.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${
                      avatarId === a.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: a.color, color: "white" }}
                    aria-label={a.name}
                  >
                    {a.emoji}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setPendingAction(null)}>Cancel</Button>
                <Button onClick={confirmPendingAction}>Confirm</Button>
              </div>
            </Card>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="p-6 flex flex-col">
            <Dices className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Solo Practice</h3>
            <p className="mt-1 text-sm text-muted-foreground flex-1">Play vs computer. Learn the principles at your pace.</p>
            <Button className="mt-4" onClick={startSolo}>Play Solo</Button>
          </Card>

          <Card className="p-6 flex flex-col">
            <Plus className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Create Room</h3>
            <p className="mt-1 text-sm text-muted-foreground flex-1">Generate a code and invite up to 4 players.</p>
            <Button className="mt-4" onClick={() => setShowCreateRoomModal(true)} disabled={creating || !displayName}>
              {creating ? "Creating…" : "Create Room"}
            </Button>
          </Card>

          <Card className="p-6 flex flex-col">
            <Hash className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Join Room</h3>
            <Input
              placeholder="ABCD-EFGH-JKLM"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="mt-3 uppercase tracking-wider"
            />
            <Button className="mt-3" variant="secondary" onClick={joinRoom} disabled={joining || !joinCode || !displayName}>
              {joining ? "Joining…" : "Join Room"}
            </Button>
          </Card>
        </div>

        {showCreateRoomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Card className="w-full max-w-md p-6">
              <h3 className="text-lg font-semibold">Create Multiplayer Room</h3>
              <p className="mt-2 text-sm text-muted-foreground">Choose number of players (including you).</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[2, 3, 4].map((n) => (
                  <Button
                    key={n}
                    type="button"
                    variant={selectedPlayerCount === n ? "default" : "outline"}
                    onClick={() => setSelectedPlayerCount(n as 2 | 3 | 4)}
                  >
                    {n} Players
                  </Button>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowCreateRoomModal(false)}>Cancel</Button>
                <Button onClick={() => createRoom(selectedPlayerCount)} disabled={creating}>
                  {creating ? "Creating…" : "Create"}
                </Button>
              </div>
            </Card>
          </div>
        )}

        <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          Playing as <span className="font-medium text-foreground">{displayName || "—"}</span>
        </div>
      </main>
    </div>
  );
}