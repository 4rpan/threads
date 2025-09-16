# Threads: Unified Feed API

> URI: `post://thread@space/post/version`
## Manifesto

Social apps look different — feeds, chats, comments, forums, polls, videos, photos, matchmaking & whatnot — but underneath they are all the same: **a collection of posts curated for an user** or simply **threads**.

Threads should be:
- **One idea, many experiences** : **Universal** primitive, same foundation that scales from 1:1 DMs to global feeds or any structured content like polls or ratings or match or memes or whatever.
- Truly **Yours**: You own your spaces and threads. Host them yourself, or let trusted people replicate & host them. No single company needs to control your feed or conversations & shove shady/nefarious ads that you don't want. You have total control.
- **Minimal** AF: A small, consistent surface you can reason about. 30 total endpoints (28 fetch + 2 realtime) — enough to build rich apps without the bloat.
- **Familiar** interactions : Subscribe, reply, react, mark as seen (automatic) , rate (stars or like/dislike). The same interactions users already understand, standardized.
- Fully **Flexible** by design : A post can be text, image, video, or any custom type. Your server chooses the schema (you only click a checkbox, what you'll allow).No lock-in to one UI/UX, Your apps render the data as you wish; the protocol stays neutral all the way through, we only define absolute core,so that you can focus on building social experiences not re-inventing the wheel.
- **Centralized** control, **decentralized** efficiency : Your (& your trusted people's) servers acknowledge each other, prevent conflicts, and keep the system running without a fuss, scales almost infinitely while keeping you in control.
- **Self‑host friendly**: Plain JSON over HTTPS. Easy to deploy on a VPS, serverless, or on‑prem.

## Protocol

- **Transport:** HTTPS for REST endpoints
- **Realtime:** WebSocket + Server Sent Events (SSE)
---
### Endpoints

#### Spaces

| Action | Endpoint | Input | Output | Notes |
|--------|----------|-------|--------|-------|
| Create space* | `POST /space` | `{ name, about?, kind, meta?, servers }` | `Space` | Create new space |
| Get space* | `GET /space/:id` | `spaceId` | `Space` | Fetch a space |
| List spaces* | `GET /spaces` | `{ cursor?, limit? }` | `Space[]` | User’s spaces |
| Update space | `PATCH /space/:id` | `{ name?, about?, meta?, servers? }` | `Space` | Editable by owner |
| Delete space | `DELETE /space/:id` | `spaceId` | `{ success: boolean }` | Remove entire space |
| Create sub-space* | `POST /space/:id/spaces` | `{ name, about?, kind, meta?, servers }` | `Space` | Recursive space |
| List sub-spaces | `GET /space/:id/spaces` | `{ cursor?, limit? }` | `Space[]` | Sub-spaces under parent |
| Create thread* | `POST /space/:id/thread` | `{ title, description?, visibility, labels?, kind, meta?, servers }` | `Thread` | Canonical create thread |
| List threads* | `GET /space/:id/threads` | `{ cursor?, limit?, filter? }` | `Thread[]` | Canonical list threads |

---

#### Threads

| Action | Endpoint | Input | Output | Notes |
|--------|----------|-------|--------|-------|
| Get thread* | `GET /thread/:id` | `threadId` | `Thread` | Fetch thread |
| Update thread | `PATCH /thread/:id` | `{ title?, description?, visibility?, labels?, servers?, meta? }` | `Thread` | Co-founders only |
| Exit thread* (delete) | `DELETE /thread/:id` | `threadId` | `{ success: boolean }` | Member → unsubscribed; co-founder → privileges retracted |
| List posts* | `GET /thread/:id/posts` | `{ cursor?, limit?, filter? }` | `Post[]` | Paginated |
| Create post* | `POST /thread/:id/posts` | `{ id, authors, versionData }` | `Post` | Goes to incoming queue |
| Get thread servers | `GET /thread/:id/servers` | `threadId` | `{ root: string[], live: string[], events: string[] }` | Server endpoints |
| Get thread live (WS)* | `GET /thread/:id/live` | `threadId` | `WebSocket` | Realtime WebSocket |
| Get thread events (SSE)* | `GET /thread/:id/events` | `threadId` | `SSE` | Realtime SSE |

---
#### Posts

| Action | Endpoint | Input | Output | Notes |
|--------|----------|-------|--------|-------|
| Get single post* | `GET /post/:id` | `{ threadId, postId }` | `Post` | Full post w/ versions |
| Create version* | `POST /post/:id/version` | `{ versionData }` | `PostVersion` | Sequential per post |
| Get version | `GET /post/:id/version/:version` | `postId, version` | `PostVersion` | Exact version |
| React to post | `POST /post/:id/react` | `{ reaction }` | `{ count }` | Normalized reactions |
| View acknowledgement | `POST /post/:id/view` | `{ userId }` | `{ unseenCount }` | Enables unseen filtering |
| Rate post | `POST /post/:id/rate` | `{ rating } (0–10)` | `{ avg, count }` | Ratings normalized |
| Get post meta | `GET /post/:id/meta` | `postId` | `{ views, reactions, rating }` | Diff-synced metadata |

---
#### Server-to-Server

| Action | Endpoint | Input | Output | Notes |
|--------|----------|-------|--------|-------|
| Pre-check post* | `GET /sync/post` | `{ id, hash, version, authorIds }` | `{ ok: boolean, conflict?: reason }` | Conflict check |
| Sync post* | `POST /sync/post` | `{ post }` | `{ ok: boolean }` | Replication |
| Sync post meta | `POST /sync/post/meta` | `{ diffs }` | `{ ok: boolean }` | Aggregate diffs |
| Co-founder handshake | `POST /sync/cofounder` | `{ space, thread, serverUrl }` | `{ accepted: boolean }` | Consensus-driven join |
| Member status change | `POST /sync/member` | `{ member, status }` | `{ accepted: boolean }` | Subscribed ↔ Unsubscribed |

---
#### Misc

| Action | Endpoint | Input | Output | Notes |
|--------|----------|-------|--------|-------|
| Health check (optional) | `GET /health` | – | `{ ok: boolean, uptime }` | Node status |

---
### Technical Notes
#### Spaces
- Spaces are user-owned containers for organizing threads.
- They can be nested recursively to create hierarchies.
- The `id` is an immutable numeric string, unique per user.
- The `kind` property is a string hint (e.g., 'chat', 'feed') for developers and does not enforce behavior.
- Each space defines its own server endpoints: `{ root: string[], live: string[], events: string[] }`.

#### Threads
- The `id` is a user-defined unicode string, editable by co-founder consensus.
- Kinds define replication strategy: `original` (single server), `sync` (multi-cofounder, shared Source of Truth), and `clone` (read-only subscriber).
- "Exiting" a thread changes a member's status to `unsubscribed`; for co-founders, it revokes privileges but does not delete their local data replica.
- `members` have custom roles and permissions defined at the thread level. there are three broad category of 'member', 1. 'co-founder', 2. 'maintainer', 3. 'netizens'.

#### Posts
- The `id` is a client-generated UUIDv4, unique within a thread and immutable across versions.
- Each edit creates a new version with a monotonic integer.
- A canonical `hash` is calculated over `{day}.{time}-{type}\n---\n{value}`.
- An optional `sign` (signature) is calculated over `{id, version, hash}`.
- Time is discrete (`day` + `time`), providing an 864ms precision that doubles as a natural rate limit and prevents collisions per author.
- `ref` allows for thread-local replies, which servers are expected to validate.

#### Realtime
- Realtime communication is handled via two types of endpoints per thread.
- **WebSockets** (`/thread/:id/live`) provide bidirectional communication for interactive features.
- **Server-Sent Events** (`/thread/:id/events`) provide a lightweight, one-way stream for updates from the server to the client.

#### Consensus
- Co-founders are added or removed via a voting mechanism (e.g., founder + 1/2 or 2/3 of co-founders).
- New posts undergo a `pre-check` (`GET /sync/post`) where a post's minimal data is sent to other co-founders to detect conflicts before acceptance.
- If no conflict exists, the full post is propagated (`POST /sync/post`) to other co-founders.
- Dynamic metadata (views, reactions, ratings) is synced between co-founders using aggregate diffs to minimize network traffic; if there is no net change, no data is sent.

#### Misc
- The entire API surface consists of 30 endpoints: 28 RESTful endpoints over HTTPS and 2 realtime endpoints (WebSocket and SSE).
- Authentication is handled by individual co-founder servers and is outside the scope of this core protocol.
- The system is designed to be transport-agnostic, but the reference implementation uses JSON over HTTPS.
