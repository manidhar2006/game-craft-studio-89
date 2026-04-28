-- Relax room_players insert policy to isolate RLS failures

drop policy if exists "Users can join room as themselves" on public.room_players;
create policy "Users can join room as themselves"
  on public.room_players for insert to authenticated
  with check (player_id = auth.uid());

notify pgrst, 'reload schema';
