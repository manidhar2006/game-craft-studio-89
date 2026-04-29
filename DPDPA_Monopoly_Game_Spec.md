# DPDPA Compliance Tycoon — Game Design & Technical Specification

> A multiplayer, browser-based Monopoly-style game built around the **9 Principles of the Digital Personal Data Protection Act, 2023**, themed for the **Banking & Insurance sector**. Players learn DPDPA by acquiring "Compliance Districts," answering MCQs to earn or defend credits, and trying to bankrupt opponents through superior knowledge of data protection law.

---

## 1. Executive Summary

| Item               | Value                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **Working title**  | DPDPA Compliance Tycoon                                                                               |
| **Genre**          | Educational multiplayer board game (Monopoly-style)                                                   |
| **Players**        | 2–4 per room                                                                                          |
| **Session length** | 20–45 minutes                                                                                         |
| **Platform**       | Web (desktop-first, mobile-responsive)                                                                |
| **Frontend**       | Vite + React + TypeScript + Tailwind CSS                                                              |
| **Backend / DB**   | Supabase (Postgres + Auth + Realtime + Edge Functions)                                                |
| **Win condition**  | Last player not bankrupt                                                                              |
| **Core loop**      | Roll dice → move → land on tile → answer MCQ or trigger event → buy / pay rent / draw card → end turn |
| **Question bank**  | 180 MCQs (90 general DPDPA + 90 Banking/Insurance sector), 20 per principle                           |

---

## 2. Game Concept

### 2.1 Theme & Narrative

Each player is the **Chief Data Officer** of a fictional Indian financial institution (Bank, NBFC, Insurer, or Fintech). The board represents the regulatory landscape they must navigate. Acquiring a Compliance District means your firm has demonstrated mastery of that DPDPA principle — and you can now charge "compliance consulting fees" (rent) to less-prepared competitors who land there unprepared.

**Why this theme works for learning:**

- Wrong answer = pay rent → reinforces the cost of non-compliance.
- Right answer = avoid rent → reinforces that knowledge protects the business.
- Owning a principle = answering correctly to "buy" it → reinforces that compliance is earned, not bought blindly.
- Sector framing (Banking/Insurance) ties abstract law to concrete regulated scenarios from the source PDFs.

### 2.2 Core Innovations Over Classic Monopoly

| Classic Monopoly                                | DPDPA Compliance Tycoon                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Land on unowned property → buy at fixed price   | Land on unowned principle → answer MCQ → if correct, earn bounty + option to buy                |
| Land on owned property → pay rent automatically | Land on opponent's principle → answer MCQ → wrong = pay rent, correct = "passed audit," no rent |
| Build houses with cash                          | Build "Compliance Layers" with cash to scale rent                                               |
| Chance / Community Chest                        | "Regulator Cards" with DPDPA-flavored events                                                    |
| Jail                                            | Data Protection Board hearing                                                                   |
| Free Parking                                    | Significant Data Fiduciary status (bonus pot)                                                   |

---

## 3. Board Design

### 3.1 Layout — 20 Tiles, 5 per Side

```
        [ 10 ]  [ 11 ]  [ 12 ]  [ 13 ]  [ 14 ]  [ 15 ]
        DPB     P6      P7      Reg     P8      GO TO
        VISIT   ACCURACY STORAGE  CARD    SECURITY DPB
[  9  ]                                              [ 16 ]
P5                                                   PENALTY
MINIMIZ                                              ₹150
[  8  ]               BOARD CENTER                   [ 17 ]
Reg                  (player panels,                 P9
CARD                  game log, dice)                ACCOUNT
[  7  ]                                              [ 18 ]
P4                                                   Reg
PURPOSE                                              CARD
[  6  ]                                              [ 19 ]
P3                                                   PENALTY
CONSENT                                              ₹100
        [  5  ] [  4  ] [  3  ] [  2  ] [  1  ] [  0  ]
        FREE    P2      Reg     P1      Reg     START
        AUDIT   NOTICE  CARD    LAWFUL  CARD    ₹200
                                PROC
```

> **Note:** Position 5 (`FREE AUDIT`) is the corner equivalent to "Free Parking." Position 10 (`DPB VISIT`) is "Just Visiting / In Jail." Position 15 is "Go to Data Protection Board." Position 0 is `START`.

### 3.2 Tile Inventory (20 tiles)

| #   | Tile                                       | Type               | Notes                                |
| --- | ------------------------------------------ | ------------------ | ------------------------------------ |
| 0   | START                                      | corner             | Pass = collect ₹200                  |
| 1   | Principle 1 — Lawful Processing            | property (Group A) | ₹60                                  |
| 2   | Regulator Card                             | event              | Draw card                            |
| 3   | Principle 2 — Notice & Transparency        | property (Group A) | ₹80                                  |
| 4   | Penalty — ₹100                             | tax                | Auto-deduct ₹100                     |
| 5   | FREE AUDIT                                 | corner             | Collect pot of accumulated penalties |
| 6   | Principle 3 — Consent                      | property (Group B) | ₹140                                 |
| 7   | Principle 4 — Purpose Limitation           | property (Group B) | ₹140                                 |
| 8   | Regulator Card                             | event              | Draw card                            |
| 9   | Principle 5 — Data Minimization            | property (Group B) | ₹160                                 |
| 10  | DPB VISIT / HEARING                        | corner             | Just visiting OR serving turns       |
| 11  | Principle 6 — Data Accuracy                | property (Group C) | ₹220                                 |
| 12  | Principle 7 — Storage Limitation           | property (Group C) | ₹240                                 |
| 13  | Regulator Card                             | event              | Draw card                            |
| 14  | Principle 8 — Security & Integrity         | property (Group D) | ₹300                                 |
| 15  | GO TO DPB HEARING                          | corner             | Send to tile 10 (in jail)            |
| 16  | Penalty — ₹150                             | tax                | Auto-deduct ₹150                     |
| 17  | Principle 9 — Accountability               | property (Group D) | ₹350                                 |
| 18  | Regulator Card                             | event              | Draw card                            |
| 19  | Penalty — ₹200 (Personal Data Breach Fine) | tax                | Auto-deduct ₹200                     |

### 3.3 Property Groups & Pricing

Color groups create monopoly bonuses. Owning a **complete group** doubles base rent on undeveloped tiles in that group.

| Group                    | Color         | Tiles      | Theme                            | Price           | Base Rent    | L1 Rent      | L2 Rent         | L3 Rent         | Layer Cost |
| ------------------------ | ------------- | ---------- | -------------------------------- | --------------- | ------------ | ------------ | --------------- | --------------- | ---------- |
| **A** (Foundation)       | 🟫 Brown      | P1, P2     | Lawfulness & Transparency        | 60 / 80         | 6 / 8        | 30 / 40      | 90 / 120        | 250 / 300       | 50         |
| **B** (Consent Block)    | 🟦 Light Blue | P3, P4, P5 | Consent · Purpose · Minimization | 140 / 140 / 160 | 12 / 12 / 14 | 60 / 60 / 80 | 180 / 180 / 220 | 450 / 450 / 500 | 100        |
| **C** (Data Lifecycle)   | 🟪 Pink       | P6, P7     | Accuracy · Storage               | 220 / 240       | 18 / 20      | 90 / 100     | 270 / 300       | 700 / 750       | 150        |
| **D** (Hard Obligations) | 🟧 Orange     | P8, P9     | Security · Accountability        | 300 / 350       | 26 / 30      | 130 / 150    | 390 / 450       | 900 / 1000      | 200        |

> Rationale: Group D (Security & Accountability) is most expensive because Section 8(5) and Section 10 carry the heaviest real-world DPDPA penalties (₹250 cr and ₹150 cr respectively).

### 3.4 Regulator Cards (Chance equivalent — ~16 cards)

Examples:

| #   | Card Text                                                                                | Effect                   |
| --- | ---------------------------------------------------------------------------------------- | ------------------------ |
| 1   | "Section 7(b): The State has used your data for a welfare scheme. Eligibility verified." | +₹100                    |
| 2   | "Personal data breach detected! Section 8(5) penalty applied."                           | -₹150                    |
| 3   | "You complied with Section 6 consent requirements perfectly. Customer testimonial!"      | +₹50                     |
| 4   | "Your DPO has flagged a violation. Report directly to Board."                            | Go to DPB Hearing (jail) |
| 5   | "Customer files grievance under Section 13. 90-day clock starts."                        | Skip next turn           |
| 6   | "You were notified as a Significant Data Fiduciary under Section 10."                    | +₹200                    |
| 7   | "Annual DPIA completed under Rule 13(1). Bonus."                                         | +₹75                     |
| 8   | "Failure to notify breach within 72 hours under Rule 7(2)."                              | -₹200                    |
| 9   | "Move directly to START — collect ₹200."                                                 | Move to tile 0           |
| 10  | "Move forward 3 tiles."                                                                  | +3 movement              |
| 11  | "Cross-border data transfer approved."                                                   | +₹120                    |
| 12  | "Cookie consent banner audit failed."                                                    | -₹50 to each opponent    |
| 13  | "You are out on DPB Hearing parole."                                                     | Free from jail           |
| 14  | "Consent Manager appointed under Section 6(7)."                                          | +₹80                     |
| 15  | "Children's data violation under Section 9."                                             | -₹200                    |
| 16  | "Get out of DPB Hearing free."                                                           | Keep in inventory        |

### 3.5 DPB Hearing (Jail) Mechanics

A player ends up at the DPB Hearing tile if:

- They draw the "Go to DPB Hearing" card.
- They land on tile 15 (`GO TO DPB`).
- They roll three doubles in a row.

To leave:

1. Pay ₹50 fine, OR
2. Roll a double on next turn (max 3 attempts), OR
3. Use a "Get out of DPB Hearing free" card.

While in jail, the player cannot collect rent on their owned tiles (they are non-operational under regulatory hold) — _optional rule, can be toggled_.

---

## 4. Core Game Mechanics

### 4.1 Starting State

- Each player starts with **₹1,500 credits**.
- Each player starts at tile 0 (`START`).
- Turn order is randomized at game start.
- The host clicks "Start Game" once 2–4 players have joined.

### 4.2 Turn Flow (State Machine)

```
START_TURN
   │
   ▼
ROLL_DICE  ───── (doubles) ───── ROLL_AGAIN_AFTER_TURN
   │
   ▼
MOVE  (animate token across tiles, collect ₹200 if passing START)
   │
   ▼
RESOLVE_TILE
   │
   ├── property, unowned ─── ASK_QUESTION
   │                            │
   │                            ├── correct  → award bounty (₹50) → OFFER_PURCHASE
   │                            │                                      │
   │                            │                                      ├── buy → deduct price, assign ownership
   │                            │                                      └── skip → END_TURN
   │                            │
   │                            └── wrong   → END_TURN (no bounty, no buy)
   │
   ├── property, owned by self ─── OFFER_BUILD_LAYER → END_TURN
   │
   ├── property, owned by other ─── ASK_QUESTION
   │                                  │
   │                                  ├── correct → "Audit passed" → END_TURN (no rent)
   │                                  └── wrong  → PAY_RENT → END_TURN
   │
   ├── tax tile → deduct fixed amount → END_TURN
   ├── regulator card → draw card, apply effect → END_TURN
   ├── jail/visit → END_TURN
   ├── go-to-jail → move token to tile 10, set in_jail=true → END_TURN
   └── free audit → award accumulated pot → END_TURN
   │
   ▼
END_TURN  (advance to next non-bankrupt player)
```

### 4.3 Question Mechanic (the heart of the game)

When a player must answer a question:

1. The server selects a random unused MCQ for the relevant principle (filtered by `room_id` so questions don't repeat in a single game).
2. The question, 4 options, and a 30-second timer appear in a modal.
3. The player clicks an option **or** the timer runs out (timeout = wrong).
4. Server validates the answer (the correct option is **never** sent to the client).
5. Server applies game-state changes (bounty, rent, ownership offer).
6. Explanation modal appears for **all players** for 8 seconds — this is the educational payoff.

**Question selection priority:**

- Prefer Banking/Insurance sector MCQs (since this is the sector theme).
- Fall back to general principle MCQs if sector pool exhausted.
- Track `question_history(room_id, question_id)` to prevent repetition.

### 4.4 Buying & Building

**Buying a tile:**

- Triggered after correctly answering on an unowned principle tile.
- Player chooses Buy (deducts `price`) or Skip.
- If skipped, the tile remains unowned (no auction in MVP — future feature).

**Building Compliance Layers:**

- Available only when player owns the **entire color group**.
- Must build evenly: cannot build L2 on a tile until all tiles in the group have L1.
- Max 3 layers per tile.
- Triggered when landing on your own tile (offer modal) or via "Manage Properties" panel between turns.

### 4.5 Rent Calculation

```
rent = base_rent
if owner has full color group AND no layers:
    rent = base_rent × 2
if compliance_layers >= 1:
    rent = layer_N_rent  (from property_definitions table)
if owner is in DPB Hearing (jail):
    rent = 0 (optional rule)
```

### 4.6 Bankruptcy & Win Condition

A player is bankrupt when:

- Credits drop below 0 AND
- They own no property they could sell to cover the debt.

**Bankruptcy resolution:**

- All owned tiles are released back to the bank (unowned).
- All compliance layers are removed.
- Player is marked `is_bankrupt = true` and skipped in turn rotation.
- If bankrupted by a player (paying rent), the creditor receives whatever credits remain.

**Game ends** when only one non-bankrupt player remains. That player is declared the winner.

### 4.7 Selling / Mortgaging (MVP scope)

- **MVP:** A player can sell a tile back to the bank for 50% of its purchase price, only on their own turn.
- **Future:** Mortgaging (40% loan, 10% interest to redeem) and player-to-player trading.

---

## 5. Question Bank

### 5.1 Source Material

Two PDFs provided by the user:

1. `DPDPA_9_Principles_MCQs.pdf` — 90 general MCQs (10 per principle).
2. `DPDPA_Banking_Insurance.pdf` — 90 sector-specific MCQs (10 per principle).

**Total: 180 MCQs**, all already labeled with principle, correct answer, and a clear explanation.

### 5.2 Question Schema (Postgres)

```sql
create type question_source as enum ('general', 'banking_insurance');

create table public.questions (
  id              uuid primary key default gen_random_uuid(),
  principle_no    int  not null check (principle_no between 1 and 9),
  source          question_source not null,
  question_text   text not null,
  option_a        text not null,
  option_b        text not null,
  option_c        text not null,
  option_d        text not null,
  correct_answer  char(1) not null check (correct_answer in ('A','B','C','D')),
  explanation     text not null,
  created_at      timestamptz default now()
);

create index idx_questions_principle_source on public.questions(principle_no, source);
```

### 5.3 Seeding Strategy

Provide a **one-time seed script** (`scripts/seed_questions.ts`) that:

- Reads a structured JSON dump of all 180 MCQs (parsed manually from the PDFs).
- Inserts via Supabase service-role key.
- Idempotent: skips rows where (principle_no, question_text) already exist.

**Sample seed entry:**

```json
{
  "principle_no": 1,
  "source": "banking_insurance",
  "question_text": "A private bank collects and processes the KYC data of a customer to comply with RBI's Know-Your-Customer guidelines. Under DPDPA, this processing is:",
  "option_a": "Unlawful as the customer has not given explicit consent under DPDPA",
  "option_b": "Lawful under Section 7(d) as it fulfills an obligation under law to disclose information to the State",
  "option_c": "Unlawful unless the bank is a Significant Data Fiduciary",
  "option_d": "Lawful only if the customer signs a DPDPA-specific consent form",
  "correct_answer": "B",
  "explanation": "Section 7(d) allows processing for fulfilling any obligation under any law in force in India to disclose information to the State or its instrumentalities. KYC compliance under RBI regulations is a statutory obligation, making such processing lawful without requiring separate DPDPA consent."
}
```

---

## 6. Tech Stack

| Layer                  | Technology                                            | Reason                                                  |
| ---------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| **Frontend framework** | Vite + React 18 + TypeScript                          | Fast HMR, type safety, modern React                     |
| **Styling**            | Tailwind CSS                                          | Utility-first, easy theming for board                   |
| **Routing**            | React Router v6                                       | Standard SPA routing                                    |
| **State management**   | Zustand (lightweight) or React Context                | Game state is server-authoritative; client just mirrors |
| **Realtime**           | Supabase Realtime (Postgres CDC)                      | Built-in with Supabase, no extra service                |
| **Database**           | Supabase Postgres                                     | Already specified by user                               |
| **Auth**               | Supabase Auth (email + password, magic link optional) | Built-in                                                |
| **Server logic**       | Supabase Edge Functions (Deno/TypeScript)             | Server-authoritative game moves                         |
| **Hosting (frontend)** | Vercel or Netlify                                     | Free tier, instant deploys                              |
| **Animations**         | Framer Motion                                         | Token movement, card flips                              |
| **Icons**              | lucide-react                                          | Clean, free                                             |
| **Testing**            | Vitest + Playwright (E2E)                             | Standard with Vite                                      |

---

## 7. Database Schema (Supabase / Postgres)

### 7.1 ER Overview

```
auth.users (Supabase managed)
   │
   └── 1:1 ── profiles
                │
                ├── 1:N ── room_players ──N:1── game_rooms
                │              │                    │
                │              └── 1:N ── tile_ownership ── N:1── board_tiles (static)
                │
                └── 1:N ── game_events
                                │
                                └── N:1── game_rooms

questions (static)
chance_cards (static)
question_history (per game)
```

### 7.2 Full DDL

```sql
-- ============================================================
-- 1. Profiles (extends auth.users)
-- ============================================================
create table public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  username      text unique not null,
  display_name  text,
  avatar_url    text,
  games_played  int default 0,
  games_won     int default 0,
  created_at    timestamptz default now()
);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'player_' || substr(new.id::text,1,8)),
    coalesce(new.raw_user_meta_data->>'display_name', 'Player')
  );
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================================
-- 2. Game Rooms
-- ============================================================
create type room_status as enum ('waiting', 'active', 'finished', 'abandoned');
create type turn_phase  as enum (
  'awaiting_roll', 'moving', 'awaiting_question',
  'awaiting_purchase', 'awaiting_build', 'awaiting_card_ack', 'ended'
);

create table public.game_rooms (
  id                       uuid primary key default gen_random_uuid(),
  room_code                text unique not null,    -- 6-char join code
  host_id                  uuid not null references public.profiles(id),
  status                   room_status not null default 'waiting',
  max_players              int default 4 check (max_players between 2 and 4),
  current_turn_player_id   uuid references public.profiles(id),
  turn_number              int default 0,
  dice_roll_1              int,
  dice_roll_2              int,
  doubles_count            int default 0,
  phase                    turn_phase default 'awaiting_roll',
  free_audit_pot           int default 0,           -- accumulates from penalty tiles
  active_question_id       uuid,                    -- for current question
  active_card_id           uuid,                    -- for current regulator card
  winner_id                uuid references public.profiles(id),
  created_at               timestamptz default now(),
  started_at               timestamptz,
  ended_at                 timestamptz
);

create index idx_rooms_code on public.game_rooms(room_code);
create index idx_rooms_status on public.game_rooms(status);


-- ============================================================
-- 3. Room Players (the per-game state of each participant)
-- ============================================================
create table public.room_players (
  id                    uuid primary key default gen_random_uuid(),
  room_id               uuid not null references public.game_rooms(id) on delete cascade,
  player_id             uuid not null references public.profiles(id),
  player_order          int not null check (player_order between 1 and 4),
  token_color           text not null,             -- 'red','blue','green','yellow'
  credits               int default 1500,
  position              int default 0 check (position between 0 and 19),
  in_jail               bool default false,
  jail_turns_remaining  int default 0,
  has_jail_free_card    bool default false,
  is_bankrupt           bool default false,
  is_connected          bool default true,         -- updated via Realtime presence
  joined_at             timestamptz default now(),
  unique (room_id, player_id),
  unique (room_id, player_order)
);


-- ============================================================
-- 4. Static board tile definitions
-- ============================================================
create type tile_type as enum (
  'start','property','tax','regulator_card',
  'jail_visit','go_to_jail','free_audit'
);

create table public.board_tiles (
  tile_index   int primary key check (tile_index between 0 and 19),
  tile_type    tile_type not null,
  display_name text not null,
  data         jsonb default '{}'::jsonb           -- e.g., {"penalty":150}
);


-- ============================================================
-- 5. Static principle definitions (only for property tiles)
-- ============================================================
create table public.principles (
  tile_index    int primary key references public.board_tiles(tile_index),
  principle_no  int unique not null check (principle_no between 1 and 9),
  name          text not null,                     -- 'Lawful Processing'
  color_group   char(1) not null check (color_group in ('A','B','C','D')),
  price         int not null,
  base_rent     int not null,
  layer_1_rent  int not null,
  layer_2_rent  int not null,
  layer_3_rent  int not null,
  layer_cost    int not null,
  description   text
);


-- ============================================================
-- 6. Per-room ownership state
-- ============================================================
create table public.tile_ownership (
  room_id            uuid not null references public.game_rooms(id) on delete cascade,
  tile_index         int  not null references public.principles(tile_index),
  owner_player_id    uuid references public.room_players(id) on delete set null,
  compliance_layers  int default 0 check (compliance_layers between 0 and 3),
  primary key (room_id, tile_index)
);


-- ============================================================
-- 7. Questions (180 seeded MCQs)
-- ============================================================
create type question_source as enum ('general', 'banking_insurance');

create table public.questions (
  id              uuid primary key default gen_random_uuid(),
  principle_no    int  not null check (principle_no between 1 and 9),
  source          question_source not null,
  question_text   text not null,
  option_a        text not null,
  option_b        text not null,
  option_c        text not null,
  option_d        text not null,
  correct_answer  char(1) not null check (correct_answer in ('A','B','C','D')),
  explanation     text not null,
  created_at      timestamptz default now()
);


-- ============================================================
-- 8. Question history (avoid repeats per game)
-- ============================================================
create table public.question_history (
  room_id      uuid not null references public.game_rooms(id) on delete cascade,
  question_id  uuid not null references public.questions(id),
  player_id    uuid not null references public.profiles(id),
  was_correct  bool not null,
  asked_at     timestamptz default now(),
  primary key (room_id, question_id)
);


-- ============================================================
-- 9. Regulator cards (static)
-- ============================================================
create type card_effect_type as enum (
  'credits_change','collect_from_each','pay_to_each',
  'move_to_tile','move_relative','go_to_jail','jail_free_card',
  'skip_next_turn'
);

create table public.regulator_cards (
  id            uuid primary key default gen_random_uuid(),
  card_text     text not null,
  effect_type   card_effect_type not null,
  effect_data   jsonb not null,                    -- e.g., {"amount":-150}
  is_active     bool default true
);


-- ============================================================
-- 10. Game events (audit log + replay + UI feed)
-- ============================================================
create type event_type as enum (
  'game_started','dice_rolled','token_moved','passed_start',
  'question_asked','question_answered','tile_purchased',
  'rent_paid','tax_paid','card_drawn','layer_built',
  'sent_to_jail','left_jail','player_bankrupt','game_ended','player_left'
);

create table public.game_events (
  id          uuid primary key default gen_random_uuid(),
  room_id     uuid not null references public.game_rooms(id) on delete cascade,
  player_id   uuid references public.profiles(id),
  event_type  event_type not null,
  event_data  jsonb default '{}'::jsonb,
  created_at  timestamptz default now()
);

create index idx_events_room_created on public.game_events(room_id, created_at desc);
```

### 7.3 Row-Level Security (RLS)

RLS is critical: all writes must go through Edge Functions, but reads must be scoped to the player's own rooms.

```sql
alter table public.profiles        enable row level security;
alter table public.game_rooms      enable row level security;
alter table public.room_players    enable row level security;
alter table public.tile_ownership  enable row level security;
alter table public.question_history enable row level security;
alter table public.game_events     enable row level security;

-- Profiles: anyone authenticated can read; only self can update.
create policy "profiles_read_all" on public.profiles
  for select to authenticated using (true);
create policy "profiles_update_self" on public.profiles
  for update to authenticated using (id = auth.uid());

-- Rooms: readable if you are a player in that room; writable only via Edge Function (service role bypasses RLS).
create policy "rooms_read_member" on public.game_rooms
  for select to authenticated using (
    exists (
      select 1 from public.room_players
      where room_id = game_rooms.id and player_id = auth.uid()
    )
    or status = 'waiting'  -- allow joining flow to look up by code
  );

-- Room players: readable by anyone in the same room.
create policy "room_players_read_same_room" on public.room_players
  for select to authenticated using (
    exists (
      select 1 from public.room_players me
      where me.room_id = room_players.room_id and me.player_id = auth.uid()
    )
  );

-- Same pattern for tile_ownership, game_events, question_history.

-- Questions: readable to authenticated, BUT correct_answer column must be hidden.
-- Solution: create a view that excludes correct_answer + explanation, expose only via function.
create view public.questions_public as
  select id, principle_no, source, question_text,
         option_a, option_b, option_c, option_d
  from public.questions;

grant select on public.questions_public to authenticated;
revoke all on public.questions from authenticated;
-- Edge Functions use service role to read full row including correct_answer.
```

> **⚠️ CRITICAL:** The `questions` table must NEVER be readable by clients. Only the Edge Function answering-validation code (running with service role) may read `correct_answer`. Otherwise players can inspect the network response and cheat.

---

## 8. Authentication & Authorization

### 8.1 Auth Flow

| Action                  | Implementation                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| **Sign up**             | Supabase Auth `signUp()` with email + password + `username` in metadata. Trigger creates profile row. |
| **Sign in**             | `signInWithPassword()`. Session token stored in localStorage by Supabase JS.                          |
| **Sign out**            | `signOut()` clears session.                                                                           |
| **Protected routes**    | Wrap with `<RequireAuth>` HOC; redirect to `/signin` if no session.                                   |
| **Username uniqueness** | Postgres `unique` constraint on `profiles.username`. Surface error in signup form.                    |

### 8.2 Routes

| Path              | Public? | Component     | Notes                                                       |
| ----------------- | ------- | ------------- | ----------------------------------------------------------- |
| `/`               | ✅      | `Landing`     | Marketing page, "Sign in" / "Sign up" CTAs                  |
| `/signin`         | ✅      | `SignIn`      |                                                             |
| `/signup`         | ✅      | `SignUp`      | Captures username, email, password                          |
| `/lobby`          | 🔒      | `Lobby`       | Create room / Join room by code / Recent games              |
| `/room/:roomCode` | 🔒      | `Room`        | Renders `WaitingRoom` or `GameBoard` based on `room.status` |
| `/profile`        | 🔒      | `Profile`     | Stats, edit display name                                    |
| `/leaderboard`    | 🔒      | `Leaderboard` | Top players by `games_won`                                  |

---

## 9. Realtime Architecture

### 9.1 Supabase Realtime Channels

Each player in a room subscribes to:

```ts
const channel = supabase
  .channel(`room:${roomId}`)
  // 1. Listen to changes in game_rooms (turn changes, phase changes)
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "game_rooms", filter: `id=eq.${roomId}` },
    onRoomUpdate,
  )

  // 2. Listen to changes in room_players (credits, position)
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "room_players", filter: `room_id=eq.${roomId}` },
    onPlayerUpdate,
  )

  // 3. Listen to changes in tile_ownership (purchases, layer builds)
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "tile_ownership", filter: `room_id=eq.${roomId}` },
    onOwnershipUpdate,
  )

  // 4. Listen to new game_events (for game log + animations)
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "game_events", filter: `room_id=eq.${roomId}` },
    onNewEvent,
  )

  // 5. Presence: track who is online
  .on("presence", { event: "sync" }, () => {
    const state = channel.presenceState();
    // update is_connected for each player
  })

  .subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      await channel.track({ player_id: currentUserId, online_at: new Date().toISOString() });
    }
  });
```

### 9.2 Server-Authoritative Pattern

**The client never mutates game state directly.** Every action is an Edge Function call:

```
[Client UI button] ──> POST /functions/v1/<action>
                              │
                              ▼
                       [Edge Function]
                       1. Verify JWT (auth.uid())
                       2. Load current game state
                       3. Validate action is legal in current phase
                       4. Apply changes in a transaction
                       5. Insert game_events row
                              │
                              ▼
                       [Postgres CDC fires]
                              │
                              ▼
                       [All clients receive update via Realtime]
```

This prevents tampering and keeps all 4 clients in sync without manual broadcast logic.

### 9.3 Edge Functions (Required)

| Function           | Purpose                     | Validates                                                                                                            |
| ------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `create-room`      | Create new game room        | User authenticated; generates unique 6-char code                                                                     |
| `join-room`        | Join by room code           | Room exists, status=waiting, < max_players, user not already in room                                                 |
| `leave-room`       | Leave waiting room          | User is in this room; if host leaves → reassign or close                                                             |
| `start-game`       | Host starts the game        | Caller is host; ≥ 2 players; randomizes turn order; sets status=active                                               |
| `roll-dice`        | Player rolls dice           | Caller is current_turn_player; phase=awaiting_roll; computes movement, handles doubles, jail logic                   |
| `answer-question`  | Submit MCQ answer           | Caller is current_turn_player; phase=awaiting_question; checks timer not expired; reads `correct_answer` server-side |
| `buy-tile`         | Buy after correct answer    | phase=awaiting_purchase; player has enough credits                                                                   |
| `skip-purchase`    | Decline to buy              | phase=awaiting_purchase                                                                                              |
| `build-layer`      | Add compliance layer        | Caller owns full color group; even-build rule; enough credits                                                        |
| `acknowledge-card` | Player closes card modal    | phase=awaiting_card_ack                                                                                              |
| `end-turn`         | Advance to next player      | phase=ended; handles bankruptcy check; checks win condition                                                          |
| `pay-jail-fine`    | Pay ₹50 to leave jail       | Player is in jail; has credits                                                                                       |
| `roll-jail-double` | Attempt to roll out of jail | Player is in jail; doubles_attempts < 3                                                                              |

---

## 10. Frontend Architecture

### 10.1 Folder Structure

```
src/
├── main.tsx
├── App.tsx
├── lib/
│   ├── supabase.ts                  # Supabase client init
│   ├── api.ts                       # Edge Function callers
│   └── types.ts                     # Shared TypeScript types
├── store/
│   └── gameStore.ts                 # Zustand store mirroring server state
├── hooks/
│   ├── useAuth.ts
│   ├── useRoom.ts                   # Subscribes to room realtime + state
│   └── useTimer.ts                  # 30s question timer
├── routes/
│   ├── Landing.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   ├── Lobby.tsx
│   ├── Profile.tsx
│   └── Room.tsx                     # Renders WaitingRoom | GameBoard
├── components/
│   ├── auth/
│   │   ├── AuthForm.tsx
│   │   └── RequireAuth.tsx
│   ├── lobby/
│   │   ├── CreateRoomCard.tsx
│   │   └── JoinRoomCard.tsx
│   ├── waiting/
│   │   ├── WaitingRoom.tsx
│   │   ├── PlayerSlot.tsx
│   │   └── ShareCode.tsx
│   ├── game/
│   │   ├── GameBoard.tsx            # The 20-tile board layout
│   │   ├── BoardTile.tsx            # Single tile render
│   │   ├── PlayerToken.tsx          # Animated token
│   │   ├── DicePanel.tsx
│   │   ├── PlayerPanel.tsx          # Sidebar with all 4 players' status
│   │   ├── PropertyDeed.tsx         # Card showing tile details + rent table
│   │   ├── EventLog.tsx             # Scrolling log of game_events
│   │   ├── modals/
│   │   │   ├── QuestionModal.tsx
│   │   │   ├── PurchaseModal.tsx
│   │   │   ├── RegulatorCardModal.tsx
│   │   │   ├── BuildLayerModal.tsx
│   │   │   ├── BankruptcyModal.tsx
│   │   │   └── GameOverModal.tsx
│   │   └── overlays/
│   │       ├── DiceRollOverlay.tsx
│   │       └── TurnIndicator.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       └── ...
└── styles/
    └── index.css                    # Tailwind directives
```

### 10.2 Game Board UI

Layout: a square CSS grid (`grid-template: repeat(7, 1fr) / repeat(7, 1fr)`) with the corners and 4 sides occupying the perimeter, and a central area for player panels and the dice/event feed.

**Tile rendering:**

- Property tiles show a colored band at the top (group color), the principle name, current owner avatar, and compliance-layer indicators (small icons).
- Hover/click shows the `PropertyDeed` card with full rent table.
- Player tokens are positioned absolutely on the tile, offset for multiple tokens.

**Animations (Framer Motion):**

- Token movement: animate through each tile sequentially when moving (so passing START is visible).
- Dice roll: 1.5s spin animation, then settle.
- Card draw: flip animation.
- Compliance layer build: small icon "pops in" on the tile.

### 10.3 State Management

Use **Zustand** for client state. The store mirrors what comes through Realtime — never the source of truth.

```ts
interface GameStore {
  room: GameRoom | null;
  players: RoomPlayer[];
  ownership: TileOwnership[];
  events: GameEvent[];
  myPlayerId: string | null;
  activeQuestion: QuestionPublic | null;
  // ... setters that just replace based on incoming Realtime payloads
}
```

Derived selectors:

```ts
const isMyTurn = (s: GameStore) => s.room?.current_turn_player_id === s.myPlayerId;
const myPlayer = (s: GameStore) => s.players.find((p) => p.player_id === s.myPlayerId);
```

---

## 11. Game Flow End-to-End (Sequence)

### 11.1 Creating and Joining a Room

```
Host (User A)
  │
  ├── Lobby → "Create Room" → POST /create-room
  │     ↳ server returns { room_code: "X7K2QB" }
  │
  ├── Redirect to /room/X7K2QB → WaitingRoom shows host slot
  │
  ├── Host shares code with friend
  │
Player B
  │
  ├── Lobby → "Join Room" → enters X7K2QB → POST /join-room
  │     ↳ server inserts row in room_players
  │
  ├── Redirect to /room/X7K2QB
  │
  └── Both clients see updated player list via Realtime

(Repeat for C, D up to 4)

Host clicks "Start Game" → POST /start-game
  │
  ├── status: waiting → active
  ├── randomize player_order
  ├── set current_turn_player_id = first player
  ├── seed tile_ownership rows (all unowned)
  ├── insert game_event 'game_started'
  │
  └── All clients flip to GameBoard view
```

### 11.2 A Single Turn

```
[Client: my turn detected via room.current_turn_player_id]
  │
  ├── DicePanel shows "Roll Dice" button
  │
  ├── Click → POST /roll-dice
  │     server: generates 2 random ints (1-6), updates dice_roll_1/2
  │     server: phase = moving
  │
  ├── All clients: animate token across tiles (one tile per 200ms)
  │     If token passes START: server already added ₹200 + emitted event
  │
  ├── server: phase = (depending on landed tile)
  │     ├── property unowned → awaiting_question, picks random unused MCQ
  │     ├── property owned by self → awaiting_build (or auto end if can't build)
  │     ├── property owned by other → awaiting_question (same MCQ pool)
  │     ├── tax → deduct credits, emit event, phase=ended
  │     ├── card → pick random regulator_card, phase=awaiting_card_ack
  │     ├── go_to_jail → move token, phase=ended
  │     ├── jail_visit → phase=ended
  │     └── free_audit → award pot, phase=ended
  │
  ├── If awaiting_question:
  │     QuestionModal opens with 30s timer
  │     User clicks A/B/C/D OR timer expires → POST /answer-question
  │     server: validates correct_answer
  │       ├── unowned + correct → award ₹50, phase=awaiting_purchase
  │       ├── unowned + wrong → phase=ended
  │       ├── owned-by-other + correct → phase=ended (no rent)
  │       └── owned-by-other + wrong → deduct rent, credit owner, phase=ended
  │     ExplanationModal shows for 8s to ALL players
  │
  ├── If awaiting_purchase:
  │     PurchaseModal with [Buy ₹X] / [Skip]
  │     User chooses → POST /buy-tile or /skip-purchase
  │     server: assigns tile_ownership, deducts credits, phase=ended
  │
  ├── If awaiting_card_ack:
  │     RegulatorCardModal shows card text + effect summary
  │     User clicks "OK" → POST /acknowledge-card
  │     server applies effect, phase=ended
  │
  └── End turn (automatic if doubles not rolled):
        POST /end-turn
        server: check bankruptcy of current player
                if only one solvent player → set winner, status=finished
                else → advance current_turn_player_id, reset phase=awaiting_roll
```

### 11.3 Bankruptcy Edge Case

When a player must pay rent/tax they can't afford:

1. Server triggers "force sell" flow: player must liquidate properties (in MVP, auto-sells in reverse purchase order at 50% until solvent).
2. If still negative, player is bankrupted: `is_bankrupt=true`, all remaining credits go to creditor (or bank if it was tax), all properties unowned.
3. Server checks: if only one solvent player remains, emit `game_ended`, set `winner_id`, `status='finished'`.
4. Client shows `GameOverModal` with final standings.

---

## 12. UI / UX Spec (Key Screens)

### 12.1 Lobby

- Header: app title + user avatar + sign-out.
- Two big cards side by side:
  - **"Start a New Game"** → button creates room, redirects.
  - **"Join with Code"** → text input + button.
- Below: "Recent Games" list (last 5 from `room_players` joined via `game_rooms`).

### 12.2 Waiting Room

- Big banner with the **room code** (large, copyable, with QR option).
- Up to 4 player slots:
  - Filled = avatar, username, "Connected" pill.
  - Empty = "Waiting for player…" placeholder.
- Token color picker (each player picks before start; default by join order).
- "Start Game" button (visible only to host, disabled until ≥ 2 players).
- "Leave Room" button.

### 12.3 Game Board

```
┌─────────────────────────────────────────────────────────────┐
│  [Turn: Alice]   [Round 4]   [Free Audit Pot: ₹250]         │ <- top bar
├─────────────────────────────────────────────────────────────┤
│  ┌─────[Tiles top row]─────┐    ┌─Player Panel──┐           │
│  │                         │    │ Alice (you)    │          │
│  │                         │    │ ₹1,420  P1,P3  │          │
│  │     [Center Area]       │    │ Bob            │          │
│  │   • Dice display        │    │ ₹1,200  P2     │          │
│  │   • Current player      │    │ Carol          │          │
│  │   • Roll button (mine)  │    │ ₹980    —      │          │
│  │   • Event log feed      │    │ Dan (jail)     │          │
│  │                         │    │ ₹1,500  P5     │          │
│  └─────[Tiles bot row]─────┘    └────────────────┘          │
│                                                              │
│  [My Properties Drawer ↑]                                   │
└─────────────────────────────────────────────────────────────┘
```

### 12.4 Question Modal

- Centered modal, dimmed background.
- Top: principle name + tile color band.
- Big timer ring (counts down from 30s, turns red below 10s).
- Question text (large, readable).
- 4 option buttons (A, B, C, D) — large, full-width on mobile, 2x2 grid on desktop.
- Submit button disabled until option clicked.
- After answer: instant "Correct!" / "Wrong!" feedback, then explanation slides in.

### 12.5 Mobile Responsiveness

- Below 768px: board scales down, player panel becomes a bottom drawer, tiles still tappable.
- Recommended minimum width: 360px (iPhone SE).

---

## 13. Security & Anti-Cheat

| Risk                                            | Mitigation                                                                                                                                                           |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Player reads `correct_answer` from network      | Edge Function never returns it; client only gets `id, question_text, options`.                                                                                       |
| Player calls Edge Function out of turn          | Every function checks `room.current_turn_player_id == auth.uid()`.                                                                                                   |
| Player calls function in wrong phase            | Every function checks `room.phase` matches expected.                                                                                                                 |
| Player tampers with credits via direct DB write | RLS denies all writes to `room_players` for `authenticated`. Only service role (Edge Functions) writes.                                                              |
| Player extends question timer                   | Server records `question_asked_at` and rejects answers > 30s + 2s grace.                                                                                             |
| Player creates 100 dummy accounts               | Supabase Auth has rate limits; add CAPTCHA on signup if needed.                                                                                                      |
| Player abandons mid-game                        | Heartbeat via Realtime presence; if `is_connected=false` for > 90s on their turn, server auto-ends turn (skips them). After 3 consecutive skips, mark them bankrupt. |
| Game state corruption from race condition       | Wrap all state mutations in a single Postgres transaction within the Edge Function.                                                                                  |

---

## 14. MVP Scope vs Future Roadmap

### 14.1 MVP (v1.0)

- ✅ Email/password auth, profile creation
- ✅ Lobby: create + join room by code
- ✅ Waiting room with up to 4 players
- ✅ Full 20-tile board with all 9 principles
- ✅ Dice roll + token movement
- ✅ Question modal with 30s timer
- ✅ Buy / skip purchase mechanic
- ✅ Rent + own-tile build mechanic (3 layers)
- ✅ Regulator cards (all 16 listed)
- ✅ DPB Hearing (jail) mechanic
- ✅ Bankruptcy + win detection
- ✅ Realtime sync for all 4 clients
- ✅ Question explanations shown to all players
- ✅ Game over modal with standings

### 14.2 v1.1 (Post-launch polish)

- Game replay viewer (uses `game_events` table)
- In-game chat
- Reconnect to disconnected game
- Spectator mode
- "Get out of jail" card inventory UI
- Sound effects & music

### 14.3 v2.0

- Auctions (when player skips purchase, others bid)
- Player-to-player trading (tiles + cards)
- Mortgage system
- Ranked multiplayer matchmaking
- Difficulty modes (easy = sector questions only; hard = mix; expert = 20s timer)
- Other DPDPA-compliant sectors (Healthcare, EdTech, E-commerce)
- Tournaments / ranked matchmaking
- Leaderboard with seasonal resets

---

## 15. Implementation Phases (Recommended Build Order)

| Phase  | Deliverable                                                                                                  | Blocking? |
| ------ | ------------------------------------------------------------------------------------------------------------ | --------- |
| **0**  | Supabase project setup, schema migration, seed scripts (board_tiles, principles, questions, regulator_cards) | Yes       |
| **1**  | Auth (signup, signin, signout, profile) — fully working with RLS                                             | Yes       |
| **2**  | Lobby + create-room + join-room Edge Functions, WaitingRoom UI with Realtime                                 | Yes       |
| **3**  | Static GameBoard component (renders board, tokens, player panel) using fixture data                          | No        |
| **4**  | start-game + roll-dice + token animation + end-turn loop (no questions yet)                                  | Yes       |
| **5**  | Question modal + answer-question Edge Function + explanation reveal                                          | Yes       |
| **6**  | Buy / build / rent flow                                                                                      | Yes       |
| **7**  | Regulator cards + tax tiles + jail mechanic                                                                  | Yes       |
| **8**  | Bankruptcy + win condition + game-over UI                                                                    | Yes       |
| **9**  | Disconnect handling, presence, edge-case polish                                                              | Yes       |
| **10** | Mobile responsive pass, animations, sound                                                                    | No        |
| **11** | Deploy to Vercel + Supabase production project                                                               | Yes       |

---

## 16. Sample Edge Function (`roll-dice`)

```ts
// supabase/functions/roll-dice/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response("Unauthorized", { status: 401 });

  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  // 1. Identify caller
  const {
    data: { user },
  } = await supa.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { roomId } = await req.json();

  // 2. Load room state
  const { data: room } = await supa.from("game_rooms").select("*").eq("id", roomId).single();

  if (!room) return new Response("Room not found", { status: 404 });
  if (room.status !== "active") return new Response("Game not active", { status: 400 });
  if (room.current_turn_player_id !== user.id)
    return new Response("Not your turn", { status: 403 });
  if (room.phase !== "awaiting_roll") return new Response("Wrong phase", { status: 400 });

  // 3. Roll
  const d1 = 1 + Math.floor(Math.random() * 6);
  const d2 = 1 + Math.floor(Math.random() * 6);
  const isDouble = d1 === d2;
  const newDoublesCount = isDouble ? room.doubles_count + 1 : 0;

  // 4. Three doubles in a row -> jail
  if (newDoublesCount >= 3) {
    await supa
      .from("room_players")
      .update({ position: 10, in_jail: true, jail_turns_remaining: 3 })
      .eq("room_id", roomId)
      .eq("player_id", user.id);

    await supa
      .from("game_rooms")
      .update({
        dice_roll_1: d1,
        dice_roll_2: d2,
        doubles_count: 0,
        phase: "ended",
      })
      .eq("id", roomId);

    await logEvent(supa, roomId, user.id, "sent_to_jail", { reason: "three_doubles" });
    return new Response(JSON.stringify({ d1, d2, sentToJail: true }));
  }

  // 5. Move (server computes new position; tile resolution happens in /resolve-tile or inline)
  const { data: player } = await supa
    .from("room_players")
    .select("*")
    .eq("room_id", roomId)
    .eq("player_id", user.id)
    .single();

  let newPos = (player!.position + d1 + d2) % 20;
  let creditsDelta = 0;
  if (player!.position + d1 + d2 >= 20) creditsDelta += 200; // passed START

  await supa
    .from("room_players")
    .update({
      position: newPos,
      credits: player!.credits + creditsDelta,
    })
    .eq("room_id", roomId)
    .eq("player_id", user.id);

  if (creditsDelta > 0) await logEvent(supa, roomId, user.id, "passed_start", { amount: 200 });
  await logEvent(supa, roomId, user.id, "dice_rolled", { d1, d2, isDouble });
  await logEvent(supa, roomId, user.id, "token_moved", { from: player!.position, to: newPos });

  // 6. Resolve tile -> sets next phase, may pick a question, etc.
  await resolveTile(supa, room, user.id, newPos, isDouble);

  return new Response(JSON.stringify({ d1, d2, newPos }), {
    headers: { "Content-Type": "application/json" },
  });
});

async function logEvent(supa: any, roomId: string, playerId: string, type: string, data: any) {
  await supa.from("game_events").insert({
    room_id: roomId,
    player_id: playerId,
    event_type: type,
    event_data: data,
  });
}

// resolveTile: determines next phase based on what tile was landed on.
// (Implementation depends on board_tiles + tile_ownership state.)
async function resolveTile(
  supa: any,
  room: any,
  playerId: string,
  pos: number,
  wasDouble: boolean,
) {
  // ... see full logic in the appendix
}
```

---

## 17. Open Questions for the Builder

When implementing, decide:

1. **Token color assignment** — auto-assign by join order, or let players pick in waiting room?
2. **Disconnect grace period** — how long before auto-skip? (Spec suggests 90s.)
3. **Should jail prevent rent collection?** Optional rule — leave as feature flag.
4. **Animation speed** — 200ms/tile feels good but could be configurable.
5. **Sound effects** — out of scope for MVP per spec, but library decision needed for v1.1 (Howler.js recommended).
6. **Analytics** — Posthog / Plausible? (Track: signups, games started, games completed, average duration, principle correct-answer rates → could reveal which DPDPA principle players struggle with most.)

---

## 18. Appendix A — Seed Data Reference

### A.1 board_tiles seed (insert all 20)

```sql
insert into public.board_tiles (tile_index, tile_type, display_name, data) values
(0,  'start',          'START',                       '{"pass_amount":200}'),
(1,  'property',       'P1: Lawful Processing',       '{}'),
(2,  'regulator_card', 'Regulator Card',              '{}'),
(3,  'property',       'P2: Notice & Transparency',   '{}'),
(4,  'tax',            'Compliance Penalty',          '{"penalty":100}'),
(5,  'free_audit',     'FREE AUDIT',                  '{}'),
(6,  'property',       'P3: Consent',                 '{}'),
(7,  'property',       'P4: Purpose Limitation',      '{}'),
(8,  'regulator_card', 'Regulator Card',              '{}'),
(9,  'property',       'P5: Data Minimization',       '{}'),
(10, 'jail_visit',     'DPB HEARING',                 '{}'),
(11, 'property',       'P6: Data Accuracy',           '{}'),
(12, 'property',       'P7: Storage Limitation',      '{}'),
(13, 'regulator_card', 'Regulator Card',              '{}'),
(14, 'property',       'P8: Security & Integrity',    '{}'),
(15, 'go_to_jail',     'GO TO DPB HEARING',           '{}'),
(16, 'tax',            'Compliance Penalty',          '{"penalty":150}'),
(17, 'property',       'P9: Accountability',          '{}'),
(18, 'regulator_card', 'Regulator Card',              '{}'),
(19, 'tax',            'Personal Data Breach Fine',   '{"penalty":200}');
```

### A.2 principles seed

```sql
insert into public.principles
(tile_index, principle_no, name,                       color_group, price, base_rent, layer_1_rent, layer_2_rent, layer_3_rent, layer_cost, description) values
(1,  1, 'Lawful Processing',          'A',  60, 6,  30,  90,  250, 50,  'Section 4 — Processing must be either consented or fall under Section 7 legitimate use.'),
(3,  2, 'Notice & Transparency',      'A',  80, 8,  40,  120, 300, 50,  'Section 5 + Rule 3 — Clear, plain, itemised notice in language of choice.'),
(6,  3, 'Consent',                    'B', 140, 12, 60,  180, 450, 100, 'Section 6 — Free, specific, informed, unconditional, unambiguous.'),
(7,  4, 'Purpose Limitation',         'B', 140, 12, 60,  180, 450, 100, 'Sections 6(1), 8(7) — Use data only for the stated purpose.'),
(9,  5, 'Data Minimization',          'B', 160, 14, 80,  220, 500, 100, 'Section 6(1) + Second Schedule — Collect only what is necessary.'),
(11, 6, 'Data Accuracy',              'C', 220, 18, 90,  270, 700, 150, 'Sections 8(3), 12 — Accuracy when used for decisions or shared.'),
(12, 7, 'Storage Limitation',         'C', 240, 20, 100, 300, 750, 150, 'Sections 8(7), 8(8) + Rule 8 — Erase when purpose served.'),
(14, 8, 'Security & Integrity',       'D', 300, 26, 130, 390, 900, 200, 'Section 8(5)/(6) + Rules 6, 7 — Reasonable safeguards + breach notice.'),
(17, 9, 'Accountability',             'D', 350, 30, 150, 450, 1000, 200, 'Section 8(1)/(2)/(4), 10 + Rule 13 — Fiduciary fully responsible.');
```

### A.3 regulator_cards seed (16 cards)

```sql
insert into public.regulator_cards (card_text, effect_type, effect_data) values
('Section 7(b): The State has used your data for a welfare scheme. Eligibility verified.',                'credits_change',   '{"amount":100}'),
('Personal data breach detected! Section 8(5) penalty applied.',                                          'credits_change',   '{"amount":-150}'),
('You complied with Section 6 consent requirements perfectly. Customer testimonial.',                     'credits_change',   '{"amount":50}'),
('Your DPO has flagged a violation. Report directly to Board.',                                            'go_to_jail',       '{}'),
('Customer files grievance under Section 13. 90-day clock starts.',                                       'skip_next_turn',   '{}'),
('You were notified as a Significant Data Fiduciary under Section 10. Honor and burden.',                 'credits_change',   '{"amount":200}'),
('Annual DPIA completed under Rule 13(1). Bonus.',                                                         'credits_change',   '{"amount":75}'),
('Failure to notify breach within 72 hours under Rule 7(2). Heavy penalty.',                              'credits_change',   '{"amount":-200}'),
('Move directly to START — collect ₹200.',                                                                 'move_to_tile',     '{"tile":0,"collect_pass":true}'),
('Move forward 3 tiles.',                                                                                  'move_relative',    '{"steps":3}'),
('Cross-border data transfer approved under Section 16.',                                                  'credits_change',   '{"amount":120}'),
('Cookie consent banner audit failed. Each opponent collects ₹50 from you.',                              'pay_to_each',      '{"amount":50}'),
('You are out on DPB Hearing parole.',                                                                     'jail_free_card',   '{}'),
('Consent Manager appointed under Section 6(7). System-wide upgrade bonus.',                              'credits_change',   '{"amount":80}'),
('Children''s data violation under Section 9 — ₹200 cr penalty equivalent.',                              'credits_change',   '{"amount":-200}'),
('Get out of DPB Hearing free — keep this card.',                                                          'jail_free_card',   '{}');
```

---

## 19. Glossary

- **Tile / District:** a position on the board (0–19).
- **Principle:** one of the 9 DPDPA principles, each occupying one property tile.
- **Compliance Layer:** the equivalent of a "house"; up to 3 per tile; multiplies rent.
- **Regulator Card:** the equivalent of "Chance" / "Community Chest"; a random event.
- **DPB Hearing:** the equivalent of "Jail"; player misses turns until they pay or roll a double.
- **Free Audit Pot:** the equivalent of "Free Parking"; collects penalty payments and awards them to whoever lands on tile 5.
- **Bankruptcy:** when a player can no longer pay an obligation even after liquidating all properties.
- **Significant Data Fiduciary (SDF):** referenced in flavor text; under Section 10 of DPDPA.

---

_End of specification. This document is intended as the complete brief for implementation. The implementer should be able to build the MVP from this without needing additional design input, except for the open questions in Section 17 and visual / brand polish._
