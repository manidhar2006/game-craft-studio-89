-- Restore board-state constraints to the 20-tile game described in the spec.

alter table public.board_tiles drop constraint if exists board_tiles_tile_index_check;
alter table public.board_tiles add constraint board_tiles_tile_index_check check (tile_index >= 0 and tile_index <= 19);

alter table public.principles drop constraint if exists principles_tile_index_check;
alter table public.principles add constraint principles_tile_index_check check (tile_index >= 0 and tile_index <= 19);

alter table public.room_players drop constraint if exists room_players_position_check;
alter table public.room_players add constraint room_players_position_check check (position >= 0 and position <= 19);

alter table public.room_players alter column credits set default 1500;

notify pgrst, 'reload schema';
