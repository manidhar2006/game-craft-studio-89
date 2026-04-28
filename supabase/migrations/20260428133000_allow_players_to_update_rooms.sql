-- Drop the restrictive host-only policy
drop policy if exists "Hosts can update their rooms" on public.rooms;

-- Create a new policy allowing any player in the room to update it
create policy "Players can update the room" on public.rooms for update using (
  exists (
    select 1 from public.room_players 
    where room_players.room_id = rooms.id 
    and room_players.player_id = auth.uid()
  )
);
