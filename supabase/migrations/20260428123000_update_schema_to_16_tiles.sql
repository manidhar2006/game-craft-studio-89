-- Update DPDPA Compliance Tycoon schema for 16-tile board

-- Create board_tiles table if it doesn't exist
create table if not exists public.board_tiles (
  id int primary key,
  tile_index int not null unique check (tile_index >= 0 and tile_index <= 15),
  tile_type text not null,
  display_name text not null,
  color_group text,
  base_price int,
  base_rent int,
  data jsonb not null default '{}'::jsonb
);

-- Add check constraint for tile_index in principles to ensure it fits the 16-tile board
alter table public.principles drop constraint if exists principles_tile_index_check;
alter table public.principles add constraint principles_tile_index_check check (tile_index >= 0 and tile_index <= 15);

-- Add check constraint for position in room_players to ensure it fits the 16-tile board
alter table public.room_players drop constraint if exists room_players_position_check;
alter table public.room_players add constraint room_players_position_check check (position >= 0 and position <= 15);
