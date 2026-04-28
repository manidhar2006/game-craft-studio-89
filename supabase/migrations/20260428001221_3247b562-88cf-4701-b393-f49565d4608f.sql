
-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_id INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone authenticated"
  ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ ROOMS ============
CREATE TYPE public.room_status AS ENUM ('waiting', 'in_progress', 'completed');

CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.room_status NOT NULL DEFAULT 'waiting',
  current_turn_player_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- ============ ROOM PLAYERS ============
CREATE TABLE public.room_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_id INT,
  seat_order INT NOT NULL DEFAULT 0,
  position INT NOT NULL DEFAULT 0,
  credits INT NOT NULL DEFAULT 200,
  properties JSONB NOT NULL DEFAULT '[]'::jsonb,
  compliance_layers JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_eliminated BOOLEAN NOT NULL DEFAULT false,
  in_jail BOOLEAN NOT NULL DEFAULT false,
  jail_turns_remaining INT NOT NULL DEFAULT 0,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (room_id, player_id),
  UNIQUE (room_id, avatar_id)
);
ALTER TABLE public.room_players ENABLE ROW LEVEL SECURITY;

-- Helper function to check room membership without recursion
CREATE OR REPLACE FUNCTION public.is_room_member(_room_id UUID, _user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.room_players
    WHERE room_id = _room_id AND player_id = _user_id
  );
$$;

-- Rooms policies
CREATE POLICY "Members or host can view room"
  ON public.rooms FOR SELECT TO authenticated
  USING (host_id = auth.uid() OR public.is_room_member(id, auth.uid()));
CREATE POLICY "Authenticated can create rooms"
  ON public.rooms FOR INSERT TO authenticated WITH CHECK (host_id = auth.uid());
CREATE POLICY "Host can update room"
  ON public.rooms FOR UPDATE TO authenticated USING (host_id = auth.uid());
CREATE POLICY "Host can delete room"
  ON public.rooms FOR DELETE TO authenticated USING (host_id = auth.uid());

-- Room players policies
CREATE POLICY "Members can view room players"
  ON public.room_players FOR SELECT TO authenticated
  USING (public.is_room_member(room_id, auth.uid()));
CREATE POLICY "User can join a room as themselves"
  ON public.room_players FOR INSERT TO authenticated WITH CHECK (player_id = auth.uid());
CREATE POLICY "Player can update their own row"
  ON public.room_players FOR UPDATE TO authenticated USING (player_id = auth.uid());
CREATE POLICY "Player can leave room"
  ON public.room_players FOR DELETE TO authenticated USING (player_id = auth.uid());

-- ============ PRINCIPLES ============
CREATE TABLE public.principles (
  id INT PRIMARY KEY,
  tile_index INT NOT NULL UNIQUE,
  principle_no INT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  color_group TEXT NOT NULL,
  price INT NOT NULL,
  base_rent INT NOT NULL,
  layer_1_rent INT NOT NULL,
  layer_2_rent INT NOT NULL,
  layer_3_rent INT NOT NULL,
  layer_cost INT NOT NULL,
  description TEXT
);
ALTER TABLE public.principles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read principles"
  ON public.principles FOR SELECT TO authenticated USING (true);

-- ============ REGULATOR CARDS ============
CREATE TABLE public.regulator_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_text TEXT NOT NULL,
  effect_type TEXT NOT NULL,
  effect_data JSONB NOT NULL DEFAULT '{}'::jsonb
);
ALTER TABLE public.regulator_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read cards"
  ON public.regulator_cards FOR SELECT TO authenticated USING (true);

-- ============ QUESTIONS ============
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_no INT NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('a','b','c','d')),
  explanation TEXT,
  category TEXT NOT NULL DEFAULT 'general'
);
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read questions"
  ON public.questions FOR SELECT TO authenticated USING (true);
CREATE INDEX idx_questions_principle ON public.questions(principle_no);

-- ============ GAME EVENTS ============
CREATE TABLE public.game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  player_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  message TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.game_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view events"
  ON public.game_events FOR SELECT TO authenticated
  USING (public.is_room_member(room_id, auth.uid()));
CREATE POLICY "Members can insert events"
  ON public.game_events FOR INSERT TO authenticated
  WITH CHECK (public.is_room_member(room_id, auth.uid()));
CREATE INDEX idx_game_events_room ON public.game_events(room_id, created_at DESC);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_players;
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_events;
ALTER TABLE public.rooms REPLICA IDENTITY FULL;
ALTER TABLE public.room_players REPLICA IDENTITY FULL;
