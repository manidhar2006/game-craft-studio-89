-- Remove all user/auth dependencies.
-- Sessions are anonymous: clients generate a UUID per browser and use it
-- directly as host_id / player_id. There is no longer a profiles table,
-- no FK to auth.users, and no RLS (anon already has table grants from
-- 20260428104500_grants_public.sql).

-- 1. Drop trigger + function that auto-created profiles on auth.users insert.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 2. Drop all RLS policies. Without auth.uid() they would block every write.
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;

drop policy if exists "Rooms are viewable by everyone" on public.rooms;
drop policy if exists "Authenticated users can create rooms" on public.rooms;
drop policy if exists "Hosts can update their rooms" on public.rooms;
drop policy if exists "Players can update the room" on public.rooms;

drop policy if exists "Room players are viewable by everyone" on public.room_players;
drop policy if exists "Users can join rooms" on public.room_players;
drop policy if exists "Users can update their own player state" on public.room_players;
drop policy if exists "Users can leave rooms" on public.room_players;

drop policy if exists "Game events viewable by everyone" on public.game_events;
drop policy if exists "Users can create events" on public.game_events;

drop policy if exists "Principles viewable by everyone" on public.principles;
drop policy if exists "Board tiles viewable by everyone" on public.board_tiles;
drop policy if exists "Regulator cards viewable by everyone" on public.regulator_cards;

-- 3. Disable RLS on every table that had it enabled.
alter table public.rooms disable row level security;
alter table public.room_players disable row level security;
alter table public.game_events disable row level security;
alter table public.principles disable row level security;
alter table public.board_tiles disable row level security;
alter table public.regulator_cards disable row level security;

-- 4. Drop FKs to auth.users so player ids can be any client-generated UUID.
alter table public.rooms drop constraint if exists rooms_host_id_fkey;
alter table public.room_players drop constraint if exists room_players_player_id_fkey;
alter table public.game_events drop constraint if exists game_events_player_id_fkey;

-- 5. Drop the profiles table entirely (cascades its RLS + remaining policies).
drop table if exists public.profiles cascade;

notify pgrst, 'reload schema';
