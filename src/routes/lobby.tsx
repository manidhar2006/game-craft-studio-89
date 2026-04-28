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

export const Route = createFileRoute("/lobby")({
  component: LobbyPage,
});

function LobbyPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [avatarId, setAvatarId] = useState<number>(0);
  const [joinCode, setJoinCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

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
    await saveProfile();
    navigate({ to: "/game/$roomId", params: { roomId: "solo" } });
  }

  async function createRoom() {
    if (!user) return;
    setCreating(true);
    await saveProfile();
    const code = generateRoomCode();
    const { data: room, error } = await supabase
      .from("rooms")
      .insert({ code, host_id: user.id, status: "waiting" })
      .select()
      .single();
    if (error || !room) {
      toast.error("Could not create room");
      setCreating(false);
      return;
    }
    await supabase.from("room_players").insert({
      room_id: room.id,
      player_id: user.id,
      display_name: displayName,
      avatar_id: avatarId,
      seat_order: 0,
    });
    setCreating(false);
    navigate({ to: "/game/$roomId", params: { roomId: room.id } });
  }

  async function joinRoom() {
    if (!user || !joinCode.trim()) return;
    setJoining(true);
    await saveProfile();
    const code = joinCode.trim().toUpperCase();
    const { data: room } = await supabase.from("rooms").select("*").eq("code", code).maybeSingle();
    if (!room) {
      toast.error("Room not found");
      setJoining(false);
      return;
    }
    const { data: existing } = await supabase
      .from("room_players")
      .select("seat_order")
      .eq("room_id", room.id);
    const seat = existing?.length ?? 0;
    if (seat >= MAX_PLAYERS) {
      toast.error("Room is full");
      setJoining(false);
      return;
    }
    await supabase.from("room_players").upsert(
      { room_id: room.id, player_id: user.id, display_name: displayName, avatar_id: avatarId, seat_order: seat },
      { onConflict: "room_id,player_id" },
    );
    setJoining(false);
    navigate({ to: "/game/$roomId", params: { roomId: room.id } });
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
        <p className="mt-2 text-muted-foreground">Pick your avatar, then play solo or start a room.</p>

        <Card className="mt-8 p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Your profile</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Display name</label>
              <Input className="mt-2" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={24} />
            </div>
            <div>
              <label className="text-sm font-medium">Avatar</label>
              <div className="mt-2 flex flex-wrap gap-2">
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
            </div>
          </div>
        </Card>

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
            <Button className="mt-4" onClick={createRoom} disabled={creating || !displayName}>
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

        <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          Playing as <span className="font-medium text-foreground">{displayName || "—"}</span>
        </div>
      </main>
    </div>
  );
}