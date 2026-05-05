# Data Guardian — Game Specification

A multiplayer board game that teaches India's **Digital Personal Data Protection Act, 2023** through a Monopoly-style loop themed around the **Banking & Insurance** sector. Players compete as Chief Data Officers of fictional financial institutions, acquiring "Compliance Districts" by answering MCQs and outlasting opponents through superior knowledge of data protection law.

---

## 1. At a Glance

| | |
|---|---|
| **Players** | 2–4 (multiplayer) · 1 human + 1–3 CPU (solo) |
| **Session length** | 20–45 minutes |
| **Board** | 20 tiles arranged on a 6×6 perimeter |
| **Win condition** | Be the last player not bankrupt |
| **Starting credits** | ₹1,500 per player |
| **Question bank** | 180 MCQs (90 core DPDPA + 90 Banking & Insurance) |
| **Modes** | Solo vs CPU · Multiplayer rooms (6-character join code, WhatsApp-shareable link) |

---

## 2. Players & Objective

Each player runs a fictional financial institution as its Chief Data Officer. The board is the regulatory landscape they must navigate. Players gain credits by answering questions correctly and acquiring DPDPA principles; they lose credits to penalties, rent, and breaches. **The last player still solvent wins.**

### 2.1 Identity

- Each browser is identified by a stable anonymous session ID (no signup required).
- Each player picks a **display name** and an **avatar** (from 8 themed Indian-coded avatars). Avatars are unique within a room.

### 2.2 Setup

| Step | Action |
|---|---|
| 1 | Pick a display name. Persisted to your browser. |
| 2 | **Solo:** choose 1–3 CPU opponents and start. **Multiplayer:** create a room (selecting 2/3/4 player capacity) or join one with a 6-character code. |
| 3 | All joined players choose unique avatars. |
| 4 | The host clicks **Start Game** once every seat is filled and every player has an avatar. |
| 5 | Turn order follows seat order (first to join goes first). All players begin at tile 0 (`START`) with ₹1,500. |

---

## 3. The Board

### 3.1 Layout

20 tiles wind clockwise around a 6×6 perimeter, with corners at `START` (0), `FREE AUDIT` (5), `DPB VISIT` (10), and `GO TO DPB HEARING` (15).

```
              [ 15 ]    [ 14 ]    [ 13 ]    [ 12 ]    [ 11 ]    [ 10 ]
              GO TO     Reg       P6        Tax       P5        DPB
              DPB       CARD      ACCURACY  ₹200      MINIMIZ   VISIT

[ 16 ]                                                                  [  9 ]
P7                                                                      Reg
STORAGE                                                                 CARD

[ 17 ]                                                                  [  8 ]
P8                              BOARD CENTER                            P4
SECURITY                       (3D dice + center pad)                   PURPOSE

[ 18 ]                                                                  [  7 ]
Reg                                                                     Tax
CARD                                                                    ₹150

[ 19 ]                                                                  [  6 ]
P9                                                                      P3
ACCOUNT                                                                 CONSENT

              [  0 ]    [  1 ]    [  2 ]    [  3 ]    [  4 ]    [  5 ]
              START     P1        Reg       P2        Tax       FREE
              ₹200      LAWFUL    CARD      NOTICE    ₹100      AUDIT
```

### 3.2 Tile Inventory

| #   | Tile                       | Type          | Effect                                     |
| --- | -------------------------- | ------------- | ------------------------------------------ |
| 0   | START                      | Start corner  | Pass / land = collect ₹200                 |
| 1   | P1 — Lawful Processing     | Principle     | Brown · ₹60                                |
| 2   | Regulator Card             | Event         | Draw card                                  |
| 3   | P2 — Notice & Transparency | Principle     | Brown · ₹80                                |
| 4   | Penalty                    | Tax           | Pay ₹100 → Free Audit pot                  |
| 5   | FREE AUDIT                 | Pot corner    | Collect the accumulated penalty pot        |
| 6   | P3 — Consent               | Principle     | Light Blue · ₹140                          |
| 7   | Penalty                    | Tax           | Pay ₹150 → Free Audit pot                  |
| 8   | P4 — Purpose Limitation    | Principle     | Light Blue · ₹140                          |
| 9   | Regulator Card             | Event         | Draw card                                  |
| 10  | DPB VISIT / HEARING        | Jail corner   | Just visiting OR serving a hearing         |
| 11  | P5 — Data Minimization     | Principle     | Light Blue · ₹160                          |
| 12  | Personal Data Breach Fine  | Tax           | Pay ₹200 → Free Audit pot                  |
| 13  | P6 — Data Accuracy         | Principle     | Pink · ₹220                                |
| 14  | Regulator Card             | Event         | Draw card                                  |
| 15  | GO TO DPB HEARING          | Go-to-jail    | Move to tile 10, enter DPB Hearing         |
| 16  | P7 — Storage Limitation    | Principle     | Pink · ₹240                                |
| 17  | P8 — Security & Integrity  | Principle     | Orange · ₹300                              |
| 18  | Regulator Card             | Event         | Draw card                                  |
| 19  | P9 — Accountability        | Principle     | Orange · ₹350                              |

### 3.3 The Nine DPDPA Principles

| # | Name                  | Group         | Section anchor                   |
|---|-----------------------|---------------|----------------------------------|
| 1 | Lawful Processing     | Foundation    | DPDPA Section 4                  |
| 2 | Notice & Transparency | Foundation    | DPDPA Section 5 + Rule 3         |
| 3 | Consent               | Consent Block | DPDPA Section 6                  |
| 4 | Purpose Limitation    | Consent Block | DPDPA Sections 6(1), 8(7)        |
| 5 | Data Minimization     | Consent Block | DPDPA Section 6(1) + Schedule 2  |
| 6 | Data Accuracy         | Data Lifecycle| DPDPA Sections 8(3), 12          |
| 7 | Storage Limitation    | Data Lifecycle| DPDPA Sections 8(7), 8(8) + Rule 8 |
| 8 | Security & Integrity  | Hard Obligations | DPDPA Sections 8(5)/(6) + Rules 6, 7 |
| 9 | Accountability        | Hard Obligations | DPDPA Sections 8(1)/(2)/(4), 10 + Rule 13 |

### 3.4 Property Groups & Pricing

Owning a complete color group with no layers built **doubles** base rent on those tiles. Building a Compliance Layer overrides the group bonus.

| Group              | Tiles      | Price            | Base Rent    | L1 Rent      | L2 Rent         | L3 Rent         | Layer Cost |
| ------------------ | ---------- | ---------------- | ------------ | ------------ | --------------- | --------------- | ---------- |
| Foundation         | P1, P2     | 60 / 80          | 6 / 8        | 30 / 40      | 90 / 120        | 250 / 300       | 50         |
| Consent Block      | P3, P4, P5 | 140 / 140 / 160  | 12 / 12 / 14 | 60 / 60 / 80 | 180 / 180 / 220 | 450 / 450 / 500 | 100        |
| Data Lifecycle     | P6, P7     | 220 / 240        | 18 / 20      | 90 / 100     | 270 / 300       | 700 / 750       | 150        |
| Hard Obligations   | P8, P9     | 300 / 350        | 26 / 30      | 130 / 150    | 390 / 450       | 900 / 1000      | 200        |

> Group pricing reflects DPDPA's real-world penalty severity. **Hard Obligations** (Security + Accountability) is most expensive because Sections 8(5) and 10 carry the heaviest statutory fines (₹250 cr and ₹150 cr).

---

## 4. The Turn

### 4.1 Phase Sequence

```
START_TURN  →  ROLL  →  MOVE  →  RESOLVE_TILE  →  END_TURN
```

A single six-sided die determines movement (1–6). After resolving the landed tile, the turn advances to the next non-eliminated, non-skipped player.

### 4.2 Tile Resolution Table

When a player lands on a tile, this is what happens:

| Tile type        | Outcome                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **START**        | Awarded ₹200 (also awarded for *passing* through it during movement).                                                     |
| **Principle, unowned** | Player must answer an MCQ (mode: *buy*). Correct → +₹50 bounty + Buy / Skip. Wrong → tile stays unowned, turn ends.    |
| **Principle, owned by self** | If a layer can be built (group complete + even-build OK + can afford), prompt Build / Skip. Otherwise turn ends.    |
| **Principle, owned by other** | Player must answer an MCQ (mode: *rent dispute*). Correct → "audit passed," no rent. Wrong → pay rent, turn ends. |
| **Tax**          | Pay the listed penalty (₹100 / ₹150 / ₹200). The amount is added to the Free Audit pot.                                  |
| **FREE AUDIT**   | Collect the entire Free Audit pot. Pot resets to 0.                                                                      |
| **Regulator Card** | Draw one of 16 cards. Card effects are listed in §6.                                                                    |
| **DPB VISIT**    | "Just visiting." No effect.                                                                                              |
| **GO TO DPB HEARING** | Teleport to tile 10. Enter DPB Hearing (jail) state with 3 escape attempts.                                           |

### 4.3 Bounty for Correct Answers

Answering correctly on an unowned principle awards a flat **₹50 bounty**, paid even if the player decides not to buy the tile afterward. This rewards engagement with the question regardless of acquisition strategy.

---

## 5. Question Mechanic

The educational core of the game.

### 5.1 Selection

- 180 MCQs total: 90 core DPDPA principle questions (10 per principle) + 90 Banking & Insurance sector scenarios (10 per principle).
- For each MCQ trigger, the engine prefers the **sector** pool first; falls back to **core** only if all sector questions for that principle have been used in the current game.
- Already-asked questions in the same game are excluded.

### 5.2 Presentation

When a question fires:

1. The question text and four options A/B/C/D appear in a modal overlay.
2. The four options are **shuffled per pick** — A/B/C/D positions are randomized so the correct answer's position is uniform across the game. (The static source data is biased toward B/C; the runtime shuffle corrects that.)
3. The player selects one option and clicks **Submit**.
4. The chosen option is highlighted; if wrong, the correct option is also highlighted, and an explanation referencing the relevant DPDPA section is shown inline.
5. The player clicks **Continue** to dismiss.

There is no time limit on answering.

### 5.3 Outcomes by Mode

| Mode             | Correct                                              | Wrong                                            |
| ---------------- | ---------------------------------------------------- | ------------------------------------------------ |
| Buy (unowned)    | +₹50 bounty, then Buy / Skip prompt                  | Tile stays unowned, no bounty                    |
| Rent dispute     | "Audit passed," no rent owed                          | Pay rent to owner                                |

---

## 6. Buying & Building

### 6.1 Buying

- Triggered after a correct answer on an unowned principle.
- Player chooses **Buy** (deducts the tile's `price` from credits, transfers ownership) or **Skip** (tile stays unowned; no auction).
- A player must have at least the price to buy; otherwise Buy is disabled.

### 6.2 Compliance Layers

Compliance Layers are the equivalent of "houses" — buildings on principles that scale rent.

**Eligibility:**

- Must own the **entire color group** of that principle.
- Must follow **even-build**: a tile cannot exceed the layer count of the lowest-layered tile in its group. (You can't build L2 on P3 until both P4 and P5 have at least L1.)
- Must afford the group's `layerCost` (50 / 100 / 150 / 200).

**Cap:** 3 layers per tile.

When you land on your own tile and any of these fail, the prompt is skipped.

### 6.3 Selling / Mortgaging

Not available. Once owned, a tile stays with that player until they go bankrupt.

---

## 7. Rent Calculation

When a player lands on an opponent's principle and answers the rent-dispute MCQ incorrectly, rent is computed as follows:

```
layers = number of Compliance Layers on this principle (0–3)

if   layers == 1   → rent = layer_1_rent
elif layers == 2   → rent = layer_2_rent
elif layers >= 3   → rent = layer_3_rent
elif owner owns the entire color group
                   → rent = base_rent × 2     (group bonus)
else               → rent = base_rent

If the owner is currently in DPB Hearing → rent = 0  (always)
```

Owners in DPB Hearing collect no rent because their fiduciary status is suspended. Tenants effectively get a free pass while their landlord is held by the regulator.

---

## 8. DPB Hearing (Jail)

### 8.1 Entering

A player enters DPB Hearing if they:

- Land on tile 15 (`GO TO DPB HEARING`), or
- Draw the "DPO Violation Flag" regulator card.

When entering, the player is teleported to tile 10 with an `inJail` flag and 3 escape attempts.

### 8.2 Escaping

On each subsequent turn while in jail, the player rolls the die:

| Condition                          | Result                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| Player holds a "Get out of DPB Free" card | Auto-used: released immediately. Card is consumed.                                |
| Roll = 6                           | Released. Move that many tiles normally.                                            |
| Roll ≠ 6, attempts remaining       | Stay in jail, attempts decrement, turn ends.                                        |
| Roll ≠ 6, attempts exhausted (3rd fail) | **Forced fine:** auto-pay ₹50, leave jail, turn ends. If can't afford → bankrupt. |

### 8.3 Owning Property in Jail

Players in DPB Hearing **continue to own** their tiles but **collect no rent** (see §7). They cannot move (other than during escape rolls), cannot buy, build, or be the target of trades.

---

## 9. Regulator Cards

When a player lands on a Regulator Card tile (2, 9, 14, 18), one card is drawn at random from a deck of 16. The card is shown in a modal; the player clicks Acknowledge to apply its effect.

### 9.1 Card List

| # | Card                                | Effect                                           |
|---|-------------------------------------|--------------------------------------------------|
| 1 | Welfare Scheme Verified             | +₹100                                            |
| 2 | Personal Data Breach                | −₹150                                            |
| 3 | Consent Requirements Met            | +₹50                                             |
| 4 | DPO Violation Flag                  | Go to DPB Hearing                                |
| 5 | Grievance Clock Starts              | Skip your next turn                              |
| 6 | Significant Data Fiduciary Notification | +₹200                                       |
| 7 | Annual DPIA Complete                | +₹75                                             |
| 8 | Late Breach Notice                  | −₹200                                            |
| 9 | Return to Start                     | Move to tile 0, collect ₹200                     |
| 10 | Move Forward                       | Move forward 3 tiles (collects ₹200 if passing START) |
| 11 | Cross-Border Transfer Approved     | +₹120                                            |
| 12 | Cookie Banner Failed               | Pay ₹50 to each opponent                         |
| 13 | DPB Hearing Parole                 | If currently in DPB Hearing, released immediately |
| 14 | Consent Manager Appointed          | +₹80                                             |
| 15 | Children's Data Violation          | −₹200                                            |
| 16 | Get Out of DPB Free                | Kept in inventory; auto-used on next jail entry  |

### 9.2 Card Effect Types

The 16 cards collectively use these effect classes:

- **Credits change** — straight gain or loss for the drawer.
- **Pay to each opponent** — drawer pays ₹X to each non-eliminated opponent.
- **Collect from each** — each non-eliminated opponent pays ₹X to drawer.
- **Move (absolute)** — teleport to a specific tile; collect ₹200 if landing on START.
- **Move relative** — advance N tiles; collect ₹200 if passing START.
- **Go to jail** — teleport to tile 10 with 3 escape attempts.
- **Jail-free card** — set `hasJailFreeCard=true`; consumed on next jail entry.
- **Skip next turn** — set `skipNextTurn=true`; turn rotation skips them once.
- **Parole** — frees the player from current DPB Hearing if applicable; otherwise no effect.

A card-induced negative effect can trigger bankruptcy if it drives credits below 0.

---

## 10. Bankruptcy & Win

### 10.1 Going Bankrupt

A player goes bankrupt the moment any state transition leaves their credits below 0. Triggers include:

- Failing rent payment they can't afford.
- Paying tax that exceeds their balance.
- A negative regulator card.
- The forced ₹50 jail fine after 3 failed escapes.
- Voluntarily leaving the game.

When this happens:

1. All their owned principles are returned to the bank (unowned).
2. All Compliance Layers on their tiles are wiped.
3. They are marked **eliminated** and skipped in turn rotation.
4. Their credits go to 0. (Remaining negative balance is **not** transferred to a creditor.)

### 10.2 Winning

The game ends as soon as **only one player is still solvent**. That player is declared the winner. If no players remain solvent (e.g., a simultaneous wipe via cards), the game ends with no winner.

A final standings screen shows credit balances, properties owned, and total layers built.

---

## 11. Multiplayer Specifics

### 11.1 Room Creation

The host:

1. Goes to **Lobby** → **Create Room**.
2. Picks player count (2 / 3 / 4).
3. Receives a **6-character room code** (uppercase alphanumeric, ambiguous characters like `0/O/1/I` excluded).
4. Lands on the Room Setup screen, which displays:
   - The room code in monospace.
   - A **Copy link** button that copies `https://<host>/game/<CODE>` to the clipboard.
   - A **Share on WhatsApp** button that opens `wa.me` with a prefilled invite message.

### 11.2 Joining

A player:

1. Goes to **Lobby** → **Join Room**.
2. Enters the 6-character code (auto-uppercased; invalid characters stripped).
3. Or clicks the shared link and lands directly on the room.

If the room is full or already started, an error toast is shown and they're returned to the lobby.

### 11.3 Avatar Selection

Each player picks a unique avatar from 8 options. Avatars are color-coded and named (e.g., Aarav, Priya, Ananya). Once an avatar is taken in a room, it's disabled for everyone else in that room.

The host's **Start Game** button enables only when:
- Every seat is filled (`roomPlayers.length === max_players`), AND
- Every player has chosen an avatar.

### 11.4 During the Game

All players see the same board state in real time. The active player's name is highlighted in the player panel and the message bar. Only the active player can roll, answer, or interact with prompts; other players see the action play out.

---

## 12. Solo Mode

A separate **Quick Play** flow:

1. Pick display name and avatar.
2. Choose 1, 2, or 3 CPU opponents.
3. Click Start.

CPU players follow the same rules as humans:

- They roll, move, and resolve tiles automatically.
- On MCQ triggers, they internally simulate a correct answer with **~55% probability** rather than being shown a question — the question modal only appears for the human player.
- They make purchase / build decisions automatically based on affordability.

Solo games never persist to the database; everything is in-memory.

---

## 13. UI Overview

### 13.1 Pages

| Page             | Purpose                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Landing (`/`)    | Brand intro, links to Solo and Multiplayer.                                                              |
| `/play`          | Solo setup: name, avatar, CPU count → game.                                                              |
| `/lobby`         | Create or join a multiplayer room.                                                                       |
| `/game/<code>`   | Room. Either Room Setup (waiting) or the live game.                                                      |
| `/how-it-works`  | Static rules reference.                                                                                  |

### 13.2 Game Screen Components

- **3D Board** — square Three.js canvas showing the 20-tile board with raised tiles, neon group stripes, animated player tokens, and a tumbling 3D die in the center.
- **Player Panel** — list of all players with credits, owned principles, and Compliance Layers.
- **Properties Breakdown** — per-player, per-group view of owned tiles and rent levels.
- **Roll Button** — visible only when it's the local human's turn and they're in the rolling phase.
- **Question Overlay** — modal with question text, four options, submit/continue button, and explanation.
- **Regulator Card Modal** — displays drawn card title and body, with Acknowledge button.
- **End Screen** — shown when the game ends; declares winner and shows final standings.

### 13.3 Theme

The whole app supports a **dark** (default neon-cyberpunk) and **light** mode, toggleable from the header. The 3D board recolors its surfaces, tiles, and dice to match the active theme. Theme choice persists across sessions.

---

## 14. Glossary

- **Principle** — one of the 9 DPDPA principles, each occupying one property tile on the board.
- **Compliance District** — synonym for an owned principle tile.
- **Compliance Layer** — a "house"; up to 3 per tile; multiplies rent.
- **Color group** — set of tiles sharing a color band (Foundation, Consent Block, Data Lifecycle, Hard Obligations).
- **Group bonus** — owning all tiles in a color group with no layers built doubles base rent on those tiles.
- **Regulator Card** — random event drawn on a Regulator tile.
- **DPB Hearing** — the "jail" mechanic; entered via Go-to-DPB tile or DPO Violation Flag card; left by rolling a 6, using a Jail-Free card, or paying ₹50 after three failed attempts.
- **Free Audit Pot** — accumulated tax payments; awarded in full to whoever lands on tile 5.
- **Bankruptcy** — credits drop below 0; player is eliminated, assets returned to the bank.
- **Turn order** — fixed at game start by seat order (join order); skipped players (eliminated or `skipNextTurn`) are bypassed but turn order is otherwise stable.
- **Significant Data Fiduciary (SDF)** — DPDPA Section 10 designation; appears in regulator card flavor text.
- **Sector questions** — Banking & Insurance scenario MCQs, preferred over generic principle MCQs during selection.

---