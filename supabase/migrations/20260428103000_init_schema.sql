-- Initial DPDPA Compliance Tycoon schema (RLS disabled)

create extension if not exists "pgcrypto";

create type public.room_status as enum ('waiting', 'in_progress', 'completed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_id int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  host_id uuid not null references auth.users(id) on delete cascade,
  status public.room_status not null default 'waiting',
  max_players int not null default 4 check (max_players in (2, 3, 4)),
  current_turn_player_id uuid,
  game_state jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.room_players (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  player_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_id int,
  seat_order int not null default 0,
  position int not null default 0,
  credits int not null default 200,
  properties jsonb not null default '[]'::jsonb,
  compliance_layers jsonb not null default '{}'::jsonb,
  is_eliminated boolean not null default false,
  in_jail boolean not null default false,
  jail_turns_remaining int not null default 0,
  joined_at timestamptz not null default now(),
  unique (room_id, player_id),
  unique (room_id, avatar_id),
  check (avatar_id is null or (avatar_id >= 0 and avatar_id <= 7))
);

create table public.principles (
  id int primary key,
  tile_index int not null unique,
  principle_no int not null unique,
  name text not null,
  color_group text not null,
  price int not null,
  base_rent int not null,
  layer_1_rent int not null,
  layer_2_rent int not null,
  layer_3_rent int not null,
  layer_cost int not null,
  description text
);

create table public.regulator_cards (
  id uuid primary key default gen_random_uuid(),
  card_text text not null,
  effect_type text not null,
  effect_data jsonb not null default '{}'::jsonb
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  principle_no int not null,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null check (lower(correct_answer) in ('a', 'b', 'c', 'd')),
  explanation text,
  category text not null default 'general'
);

create index idx_questions_principle on public.questions(principle_no);

create table public.game_events (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  player_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  message text not null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_game_events_room on public.game_events(room_id, created_at desc);

alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_players;
alter publication supabase_realtime add table public.game_events;

alter table public.rooms replica identity full;
alter table public.room_players replica identity full;

notify pgrst, 'reload schema';
