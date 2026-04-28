-- Fix room_players insert policy to avoid RLS blocking join checks

create or replace function public.is_room_joinable(_room_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.rooms
    where id = _room_id and status = 'waiting'
  );
$$;

grant execute on function public.is_room_joinable(uuid) to authenticated;

drop policy if exists "Users can join room as themselves" on public.room_players;
create policy "Users can join room as themselves"
  on public.room_players for insert to authenticated
  with check (
    player_id = auth.uid()
    and public.is_room_joinable(room_id)
  );

notify pgrst, 'reload schema';
