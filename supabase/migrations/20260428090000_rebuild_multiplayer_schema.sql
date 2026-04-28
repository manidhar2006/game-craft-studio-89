-- Rebuild DPDPA Compliance Tycoon schema (rooms, players, gameplay)

create extension if not exists "pgcrypto";

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_id int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles viewable by everyone authenticated"
  on public.profiles for select to authenticated using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update to authenticated using (auth.uid() = id);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ ROOMS ============
create type public.room_status as enum ('waiting', 'in_progress', 'completed');

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

alter table public.rooms enable row level security;

-- ============ ROOM PLAYERS ============
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
  unique (room_id, avatar_id)
);

alter table public.room_players enable row level security;

-- Helper function to check room membership without recursion
create or replace function public.is_room_member(_room_id uuid, _user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.room_players
    where room_id = _room_id and player_id = _user_id
  );
$$;

grant execute on function public.is_room_member(uuid, uuid) to authenticated;

-- Rooms policies
create policy "Rooms readable by members or waiting"
  on public.rooms for select to authenticated
  using (
    status = 'waiting'
    or host_id = auth.uid()
    or public.is_room_member(id, auth.uid())
  );

create policy "Hosts can create rooms"
  on public.rooms for insert to authenticated with check (host_id = auth.uid());

create policy "Hosts can update rooms"
  on public.rooms for update to authenticated using (host_id = auth.uid());

create policy "Hosts can delete rooms"
  on public.rooms for delete to authenticated using (host_id = auth.uid());

-- Room players policies
create policy "Members can view room players"
  on public.room_players for select to authenticated
  using (public.is_room_member(room_id, auth.uid()));

create policy "Users can join room as themselves"
  on public.room_players for insert to authenticated
  with check (
    player_id = auth.uid()
    and exists (
      select 1 from public.rooms r
      where r.id = room_id and r.status = 'waiting'
    )
  );

create policy "Players can update their own row"
  on public.room_players for update to authenticated using (player_id = auth.uid());

create policy "Players can leave room"
  on public.room_players for delete to authenticated using (player_id = auth.uid());

-- ============ PRINCIPLES ============
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

alter table public.principles enable row level security;

create policy "Anyone authenticated can read principles"
  on public.principles for select to authenticated using (true);

-- ============ REGULATOR CARDS ============
create table public.regulator_cards (
  id uuid primary key default gen_random_uuid(),
  card_text text not null,
  effect_type text not null,
  effect_data jsonb not null default '{}'::jsonb
);

alter table public.regulator_cards enable row level security;

create policy "Anyone authenticated can read cards"
  on public.regulator_cards for select to authenticated using (true);

-- ============ QUESTIONS ============
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  principle_no int not null,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null check (correct_answer in ('a', 'b', 'c', 'd')),
  explanation text,
  category text not null default 'general'
);

alter table public.questions enable row level security;

create policy "Anyone authenticated can read questions"
  on public.questions for select to authenticated using (true);

create index idx_questions_principle on public.questions(principle_no);

-- ============ GAME EVENTS ============
create table public.game_events (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  player_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  message text not null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.game_events enable row level security;

create policy "Members can view events"
  on public.game_events for select to authenticated
  using (public.is_room_member(room_id, auth.uid()));

create policy "Members can insert events"
  on public.game_events for insert to authenticated
  with check (public.is_room_member(room_id, auth.uid()));

create index idx_game_events_room on public.game_events(room_id, created_at desc);

-- Realtime
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_players;
alter publication supabase_realtime add table public.game_events;

alter table public.rooms replica identity full;
alter table public.room_players replica identity full;

-- Refresh PostgREST schema cache after manual SQL changes.
notify pgrst, 'reload schema';
