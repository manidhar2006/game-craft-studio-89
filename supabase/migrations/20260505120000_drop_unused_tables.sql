-- Drop tables that exist in the schema but are never queried by the app.
-- The client only uses `rooms` and `room_players`. Board layout, principles,
-- regulator cards, and questions are all defined as TypeScript constants in
-- src/lib/game/, and `game_events` is never written or read.

-- 1. Remove from realtime publication first (only game_events was added).
--    ALTER PUBLICATION ... DROP TABLE doesn't accept IF EXISTS, so guard it.
do $$
begin
  if exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'game_events'
  ) then
    execute 'alter publication supabase_realtime drop table public.game_events';
  end if;
end $$;

-- 2. Drop unused tables (CASCADE clears any lingering policies/indexes).
drop table if exists public.game_events cascade;
drop table if exists public.board_tiles cascade;
drop table if exists public.principles cascade;
drop table if exists public.regulator_cards cascade;
drop table if exists public.questions cascade;

notify pgrst, 'reload schema';
