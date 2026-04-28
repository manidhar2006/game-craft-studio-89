-- Enable Row Level Security (RLS) on all tables to prevent unauthorized modifications
alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.room_players enable row level security;
alter table public.principles enable row level security;
alter table public.board_tiles enable row level security;
alter table public.regulator_cards enable row level security;
alter table public.game_events enable row level security;

-- PROFILES
-- Anyone can view profiles, but users can only modify their own.
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- ROOMS
-- Anyone can view rooms. Authenticated users can create them. Only the host can update them.
create policy "Rooms are viewable by everyone" on public.rooms for select using (true);
create policy "Authenticated users can create rooms" on public.rooms for insert with check (auth.role() = 'authenticated');
create policy "Hosts can update their rooms" on public.rooms for update using (auth.uid() = host_id);

-- ROOM PLAYERS
-- Anyone can view players. Users can join a room as themselves.
create policy "Room players are viewable by everyone" on public.room_players for select using (true);
create policy "Users can join rooms" on public.room_players for insert with check (auth.uid() = player_id);
create policy "Users can update their own player state" on public.room_players for update using (auth.uid() = player_id);
create policy "Users can leave rooms" on public.room_players for delete using (auth.uid() = player_id);

-- GAME EVENTS
-- Anyone can view events. Users can insert their own events.
create policy "Game events viewable by everyone" on public.game_events for select using (true);
create policy "Users can create events" on public.game_events for insert with check (auth.uid() = player_id);

-- STATIC DATA (Principles, Board Tiles, Cards, Questions)
-- This data is read-only for clients. (Admin/Service Role can still modify).
create policy "Principles viewable by everyone" on public.principles for select using (true);
create policy "Board tiles viewable by everyone" on public.board_tiles for select using (true);
create policy "Regulator cards viewable by everyone" on public.regulator_cards for select using (true);
