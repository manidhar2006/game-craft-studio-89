# 🎲 DPDPA Compliance Tycoon — Updated Game Specification

> **A multiplayer, browser-based Monopoly-style educational game** themed around the **9 Principles of the Digital Personal Data Protection Act, 2023** (DPDPA). Players acquire Compliance Districts, answer MCQs to earn or defend credits, and strategically bankrupt opponents through superior knowledge of data protection law.

---

## 📋 Executive Summary

| Item                   | Details                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Game Title**         | DPDPA Compliance Tycoon                                                             |
| **Genre**              | Educational Multiplayer Board Game (Monopoly-style)                                 |
| **Players**            | 2–4 per room                                                                        |
| **Session Duration**   | 20–45 minutes                                                                       |
| **Platform**           | Web (Desktop-first, Mobile-responsive)                                              |
| **Frontend Stack**     | React + Vite + TypeScript + Tailwind CSS                                            |
| **Backend & Database** | **Lovable Cloud** (Supabase: Postgres + Auth + Realtime + Edge Functions)           |
| **Win Condition**      | Last remaining active player wins                                                   |
| **Core Loop**          | Roll → Move → Land on Tile → Answer Question/Trigger Event → Take Action → End Turn |
| **Question Bank**      | 180 MCQs (90 general DPDPA + 90 Banking/Insurance sector), 20 per principle         |

---

## 🚀 Key Updates from Initial Spec

### What Changed?

- ✅ **Simplified Game Flow** — Streamlined core loop with clear state progression
- ✅ **No Duplicate Avatars** — Enforce unique avatar selection per player
- ✅ **Dynamic Rent System** — Rent decreases on wrong answers; tiles become unowned at 0 rent
- ✅ **Clarified Lovable Cloud** — All backend explicitly uses Lovable Cloud (Supabase)
- ✅ **Separated Solo vs Multiplayer** — Solo mode plays vs Computer; Multiplayer via room system
- ✅ **Mobile Optimization** — Responsive design + WhatsApp sharing for lobby links

### What Stayed?

- ✅ 9 DPDPA Principles as properties (color groups A, B, C, D)
- ✅ 20-tile board with corners: START, FREE AUDIT, DPB HEARING, GO TO DPB HEARING
- ✅ Regulator Cards (like Chance cards)
- ✅ Compliance Layers (like houses; max 3)
- ✅ Jail System (DPB Hearing) with strategic importance
- ✅ Question-based ownership mechanics
- ✅ Banking & Insurance sector theming

---

## 🎮 Game Modes

### Solo Mode

- Player vs Computer opponent
- Single-player experience
- No multiplayer synchronization required
- Good for learning / testing

### Multiplayer Mode

- **Create Room** — Host generates Room ID + WhatsApp share link
- **Join Room** — Players join via Room ID or invite link
- **Player Limit** — 2–4 players per room
- **Host Authority** — Only host can start game after all players select avatars
- **Real-time Sync** — Lovable Cloud (Supabase Realtime) keeps all clients synchronized

---

## 🏠 Landing Page

### Layout

- **Top Right Corner:**
  - Sign In (if logged out)
  - Sign Up (if logged out)
  - Sign Out (if logged in)

- **Main Content:**
  - Game Title + Logo
  - Brief Description
  - Two Buttons:
    - "How It Works" → Help/Tutorial
    - "Get Started" → Auth (if needed) → Lobby

### User Flow

```
Landing → (Auth if not logged in) → Lobby
```

---

## 🎭 Avatar Selection

### Mechanics

- **8 Avatars Available:** 4 Male, 4 Female
- **No Duplicates:** Once selected, avatar is unavailable to other players
- **Mandatory Selection:** Players must choose before game starts
- **Avatar = Token:** Selected avatar represents player on the board

### Workflow

1. All players join room
2. Each player picks unique avatar from available pool
3. Host can only start game after ALL players have selected
4. Game begins with player tokens placed on START tile

---

## 🎯 Board Design

    there should 16 tiles
    9 principle tiles
    1 start
    2 Data Breach Cards
    2 DPB and go to DPB 
    2 Regulator Cards

## 💰 Principle Tiles & Mechanics

### Landing on Unowned Principle Tile

1. **Question Appears** — MCQ related to that principle
2. **Correct Answer** → Option to buy at listed price OR skip
3. **Wrong Answer** → Nothing happens, turn ends

### Landing on Opponent's Principle Tile

1. **Question Appears** — Same MCQ
2. **Correct Answer** → "Passed audit," no rent owed
3. **Wrong Answer** → Pay rent to owner (amount depends on compliance layers)

### Landing on Own Principle Tile

1. **Question Appears** — MCQ
2. **Correct Answer** → Option to sell tile back to bank
3. **Wrong Answer** → Rent decreases (see Dynamic Rent System)

---

## 📊 Dynamic Rent System

### Rent Calculation

- **Base Rent** — Initial rent for unimproved tile
- **Compliance Layers** — Rent multiplies per layer (×1, ×3, ×9 for layers 1, 2, 3)
- **Wrong Answers** — Rent decreases by 1 tier per wrong answer when landing on opponent's tile

### Rent Tiers & Decreases

```
Tier 3 (3 layers) → Wrong answer → Tier 2 (2 layers)
Tier 2 (2 layers) → Wrong answer → Tier 1 (1 layer)
Tier 1 (1 layer)  → Wrong answer → Base rent
Base rent         → Wrong answer → 0 rent
```

### Tile Ownership Loss

- When rent reaches ₹0, tile ownership is lost
- Tile reverts to unowned state
- Compliance layers are removed

---

## 🏗️ Compliance Layers

### Rules

- **Build Only When** — Owns complete color group (all properties in that group)
- **Maximum Layers** — 3 per tile (equivalent to 3 houses in Monopoly)
- **Cost Per Layer** — Varies by group (₹50–₹200 per layer)
- **Rent Multiplier:**
  - Layer 1 → ×5 base rent
  - Layer 2 → ×15 base rent
  - Layer 3 → ×45 base rent

### Example

If you own **P1 (₹60, base rent ₹6)** with a complete Group A:

- Undeveloped: ₹6 rent
- Layer 1: ₹30 rent
- Layer 2: ₹90 rent
- Layer 3: ₹250 rent

---

## 🎨 Principle Color Groups

| Color        | Principles | Group Name                  | Theme                |
| ------------ | ---------- | --------------------------- | -------------------- |
| 🟫 Saffron   | P1, P5, P9 | Foundation & Accountability | Core obligations     |
| ⚪ White     | P2, P6     | Transparency & Accuracy     | Data integrity       |
| 🟢 Green     | P3, P7     | Consent & Storage           | Data lifecycle       |
| 🔵 Navy Blue | P4, P8     | Purpose & Security          | Control & Protection |

---

## 🎴 Regulator Cards

### Overview

- Similar to "Chance" / "Community Chest" in Monopoly
- Drawn when landing on Regulator Card tiles
- Contain DPDPA-themed events with positive/negative effects
- NO Get Out of Jail Free cards (jail can only be exited by serving time)

### Example Cards

| Effect         | Example                                          |
| -------------- | ------------------------------------------------ |
| Credit Bonus   | "State used your data for welfare scheme. +₹100" |
| Credit Penalty | "Personal data breach detected. -₹150"           |
| Movement       | "Move to START" or "Move forward 3 tiles"        |
| Jail           | "DPO flagged violation. Go to DPB Hearing"       |
| Skip Turn      | "Customer files grievance. Skip next turn"       |

### Card Count

- ~14 cards in circulation
- Cards cycle and repeat

---

## 🚔 Jail System (DPB Hearing)

### Entering Jail

- Land on "GO TO DPB HEARING" tile (tile 15), OR
- Draw Regulator Card with jail effect

### Penalty & Restrictions

- **Duration** — Skip 2 turns while in jail
- **Cannot During Jail:**
  - Move
  - Roll dice
  - Answer questions
  - Trade properties
- **Rent Collection** — Cannot collect rent on owned properties while in jail

### Exit Option

- **ONLY WAY TO EXIT:** Complete 2 turns in jail, then automatically released

### Strategic Value

- Staying in jail is sometimes beneficial (protects from bad tiles / regulator cards)
- Players must decide if being trapped is worth the protection
- Adds risk/reward gameplay element

---

## 🏦 Player Elimination

### Elimination Condition

- Player loses all credits and all properties (cannot meet obligations)
- Eliminated player becomes observer/spectator only

### Leaving Game Voluntarily

- Treated as voluntary elimination
- Assets distributed according to debts
- Cannot rejoin mid-game

### Winner

- Last remaining active player wins the game

---

## 🎮 Controls

### Player Actions

- **Roll Dice** — Initiate movement phase
- **Leave Game** — Voluntarily exit (counts as elimination)
- **Manage Properties:**
  - Buy principle tile (when eligible)
  - Build compliance layers
  - Sell to bank
  - Trade with other players (future enhancement)
- **Answer Questions** — Submit MCQ answer when prompted

### UI Layout

- Dice roll button (prominent, center-bottom)
- Property management panel (right sidebar)
- Player status panel (left sidebar)
- Game log (center-bottom, scrollable)

---

## 🎲 Dice & Movement

### Mechanics

- **Single Dice** — Roll once per turn (d6)
- **Movement** — Move token by rolled amount (0–20 tiles, wrapping)
- **Passing START** — Collect ₹200 when position exceeds 19

### Animation

- Dice roll animated (0.5s)
- Token smooth movement (200ms per tile)
- No double-rolls (simplification from classic Monopoly)

---

## ✨ Animations & Polish

### Priority Animations

1. **Dice Roll** — Roll animation (0.5s) + result display
2. **Token Movement** — Smooth glide across tiles (200ms per tile)
3. **Card Flip** — Regulator card reveal (0.4s)
4. **Tile Icons** — Subtle hover / highlight effects
5. **Credit Changes** — Floating number effects (±₹X feedback)

### Performance

- All animations on GPU (CSS transforms)
- Fallback for low-end devices
- Option to disable animations (settings)

---

## 🌐 Multiplayer with Lovable Cloud

### Architecture

- **Frontend** → **Lovable Cloud (Supabase)** → **Postgres Database**
- **Real-time Sync** — Supabase Realtime channels (WebSocket)
- **Presence Tracking** — Supabase Presence API (who's online)
- **Auth** — Supabase Auth (email, Google OAuth optional)

### Key Lovable Cloud Services

1. **Supabase Auth** — User sign-in/sign-up
2. **Postgres Database** — Game state, player data, room data
3. **Realtime** — Live game synchronization across players
4. **Edge Functions** — Optional server-side logic (MCQ validation, anti-cheat)

### Room System

```sql
rooms:
  - room_id (unique)
  - host_id
  - status (waiting, in_progress, completed)
  - created_at
  - updated_at

room_players:
  - room_id
  - player_id
  - avatar_id
  - position (tile index 0–19)
  - credits (current balance)
  - properties (owned principle tiles)
  - compliance_layers (per tile)
  - is_eliminated
  - in_jail
  - jail_turns_remaining
```

---

## 📊 Database Schema (Lovable Cloud / Supabase)

### Core Tables

#### `users`

```sql
id UUID PRIMARY KEY
email VARCHAR(255) UNIQUE
created_at TIMESTAMP
```

#### `rooms`

```sql
id UUID PRIMARY KEY
host_id UUID (FK: users.id)
status VARCHAR (waiting, in_progress, completed)
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### `room_players`

```sql
id UUID PRIMARY KEY
room_id UUID (FK: rooms.id)
player_id UUID (FK: users.id)
avatar_id INT (0–7)
position INT (0–19)
credits INT
properties JSONB (array of owned tile indices)
compliance_layers JSONB (map: tile_id -> layer_count)
is_eliminated BOOLEAN
in_jail BOOLEAN
jail_turns_remaining INT
created_at TIMESTAMP
```

#### `board_tiles`

```sql
id INT PRIMARY KEY
tile_index INT (0–19)
tile_type VARCHAR (property, tax, corner, event, etc.)
display_name VARCHAR
color_group VARCHAR (A, B, C, D or null)
base_price INT (if property)
base_rent INT (if property)
data JSONB (flexible)
```

#### `principles`

```sql
id INT PRIMARY KEY
tile_index INT (0–19)
principle_no INT (1–9)
name VARCHAR
color_group VARCHAR
price INT
base_rent INT
layer_1_rent INT
layer_2_rent INT
layer_3_rent INT
layer_cost INT
description TEXT
```

#### `regulator_cards`

```sql
id UUID PRIMARY KEY
card_text TEXT
effect_type VARCHAR (credits_change, move_to_tile, go_to_jail, etc.)
effect_data JSONB
```

#### `questions`

```sql
id UUID PRIMARY KEY
principle_no INT (1–9)
question_text TEXT
option_a VARCHAR
option_b VARCHAR
option_c VARCHAR
option_d VARCHAR
correct_answer VARCHAR (a, b, c, d)
category VARCHAR (general, banking_insurance)
```

#### `game_events` (optional, for analytics/logging)

```sql
id UUID PRIMARY KEY
room_id UUID
player_id UUID
event_type VARCHAR (dice_rolled, tile_landed, question_answered, etc.)
event_data JSONB
created_at TIMESTAMP
```

---

## 🔄 Game Flow

### Phase Sequence

```
Landing Page
    ↓
Sign In / Sign Up (if needed)
    ↓
Lobby (Choose Solo or Multiplayer)
    ↓
IF Multiplayer:
  Create/Join Room
  Wait for all players to join
IF Solo:
  Start immediately vs computer
    ↓
Avatar Selection (all players pick unique avatar)
    ↓
Game Board Loads (all players synced)
    ↓
Game Loop (see Core Loop)
    ↓
Player Eliminated or Wins
    ↓
Results Screen → Option to Play Again or Return to Lobby
```

### Core Game Loop (Per Turn)

```
1. ROLL PHASE
   → Player clicks "Roll Dice"
   → Dice animates
   → Result displayed (1–6)

2. MOVE PHASE
   → Token slides across tiles
   → If pass START → collect ₹200
   → Position updated in Lovable Cloud

3. TILE RESOLUTION
   → Determine tile type (property, tax, event, etc.)
   → Trigger appropriate action

4. ACTION PHASE
   → IF property & unowned → Show buy dialog
   → IF opponent's property → Show question
   → IF tax → Auto-deduct
   → IF event → Draw regulator card
   → IF jail → Enter jail state

5. END TURN
   → Next player's turn begins
   → All clients synced via Lovable Cloud Realtime
```

---

## 🏆 Win Condition

### Victory

- **Last active player** (not eliminated) wins the game
- Game ends when all but one player are eliminated

### Results Screen

- Display final standings
- Show final credit balances
- Offer "Play Again" or "Return to Lobby"
- Optional stats: highest rent paid, most properties owned, etc.

---

## 📱 UX Requirements

### Mobile Responsiveness

- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px – 1024px
  - Desktop: > 1024px
- **Board Scaling:** Responsive SVG board (scales to fit viewport)
- **Touch Controls:** Large touch targets for dice roll, property management
- **Orientation:** Portrait on mobile, landscape optional

### Performance

- Page load < 3s
- Dice animation smooth (60 FPS)
- Real-time updates < 500ms latency
- Lovable Cloud Realtime ensures instant sync

### Social Sharing

- **WhatsApp Share Button** — Room invite link
- **Copy Room ID** — Easy clipboard copy
- **Deep Linking** — Link directly to join room (if supported)

### Accessibility

- Alt text on avatars
- Keyboard navigation
- Color contrast (WCAG AA)
- Readable fonts (16px+)

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context + Lovable Cloud Realtime (for multiplayer sync)
- **HTTP Client:** fetch API or Axios
- **Animations:** CSS + React Spring (optional)

### Backend (Lovable Cloud)

- **Platform:** Lovable Cloud (Supabase)
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth (email, OAuth)
- **Real-time Sync:** Supabase Realtime (WebSocket)
- **Edge Functions:** Deno runtime (optional, for server-side logic)
- **Storage:** Supabase Storage (for avatar images, if needed)

### Deployment

- **Frontend Hosting:** Vercel / Netlify / GitHub Pages
- **Backend Hosting:** Lovable Cloud (Supabase managed service)
- **CI/CD:** GitHub Actions

---

## 🚀 Implementation Roadmap

### Phase 1: MVP (Core Game)

- [ ] Landing page + Auth (Lovable Cloud)
- [ ] Lobby system (solo + multiplayer modes)
- [ ] Avatar selection
- [ ] Board rendering
- [ ] Dice roll + token movement
- [ ] Basic tile resolution (property, tax, corner)
- [ ] Multiplayer sync via Lovable Cloud Realtime
- [ ] Player elimination check

### Phase 2: Gameplay Mechanics

- [ ] MCQ system (questions database)
- [ ] Ownership + buying mechanics
- [ ] Rent calculation + payment
- [ ] Compliance layers + building
- [ ] Dynamic rent system (decreases on wrong answers)
- [ ] Regulator cards

### Phase 3: Advanced Features

- [ ] Jail system (DPB Hearing)
- [ ] Property trading (peer-to-peer)
- [ ] Game history / analytics
- [ ] Leaderboards
- [ ] Sound effects (Howler.js)

### Phase 4: Polish & Optimization

- [ ] Mobile optimization
- [ ] Animation tuning
- [ ] Performance profiling
- [ ] Accessibility audit
- [ ] Security hardening (Lovable Cloud)

---

## ❓ Open Questions for Builders

1. **Computer Opponent AI** — How smart should solo mode opponent be? Random, strategic, or learning-based?
2. **Disconnect Handling** — Grace period before auto-skip if player disconnects? (Recommend 90 seconds)
3. **Jail Hard Mode** — Should jail prevent rent collection? (Optional feature flag)
4. **Double Rolls** — Include double roll mechanic (classic Monopoly) or keep single dice? (Spec recommends single)
5. **Trade System** — Should MVP include property trading, or save for v1.1?
6. **Analytics** — Track which principles players struggle with most (via PostHog or Plausible)
7. **Spectator Mode** — Should eliminated players watch remaining game, or get kicked to results?

---

## 📚 Glossary

- **Tile / District** — A position on the board (0–19)
- **Principle** — One of the 9 DPDPA principles (property tile)
- **Compliance Layer** — Equivalent to houses; max 3 per tile; multiplies rent
- **Regulator Card** — Chance/Community Chest equivalent; random DPDPA-themed event
- **DPB Hearing** — Jail equivalent; player misses turns
- **Free Audit Pot** — Free Parking equivalent; collects penalty payments
- **Significant Data Fiduciary (SDF)** — Referenced in flavor text (DPDPA Section 10)
- **Lovable Cloud** — Supabase-powered backend for auth, database, real-time sync, and edge functions

---

## ✅ Notes

- **Backend Clarity:** This specification uses **Lovable Cloud (Supabase)** exclusively for all backend services
- **Knowledge-Based Gameplay** — Every ownership action and rent payment is tied to DPDPA knowledge
- **Strategy + Learning Combined** — Players learn data protection law while playing competitive strategy game
- **Dynamic Ownership System** — Wrong answers can cause players to lose property (unique mechanic)
- **Sector Theming** — All flavor text ties to Banking & Insurance regulation for real-world relevance

---

_This document is the complete implementation brief. Builders should be able to create the MVP from this specification without additional design input, except for the open questions above and visual/brand polish decisions._

_Questions? Refer to Lovable Cloud (Supabase) documentation at https://supabase.com/docs for backend implementation._
