# Threads: Unified Feed API

> URI: `post://thread@space/post/version`

## Manifesto

Social apps look different — feeds, chats, comments, forums, polls, videos, photos, matchmaking & whatnot — but underneath they are all the same: **a collection of posts curated for an user** or simply **threads**. Be it :

- microblog/videos/audios/images in social feeds,
- messages in chats,
- listings (products/ services/ profiles) in discovery marketplace,
- reactions/comments/reviews/ratings in posts
- or any such rich (pre-defined/structured) data formats

`thread` is the only primitive you'll ever need, if it covers:

- **One idea, many experiences**: **Universal** primitive, same foundation that scales from 1:1 DMs to global feeds or any structured content like polls or ratings or match or memes or whatever.
- Truly **Yours**: You own your spaces and threads. Host them yourself, or let trusted people replicate & host them. No single company needs to control your feed or conversations & shove shady/nefarious ads that you don't want. You have total control.
- **Minimal** AF: A small, consistent surface you can reason about. 17 RESTful endpoints plus dedicated realtime and sync channels — enough to build rich apps without the bloat.
- **Familiar** interactions: Subscribe, reply, react, mark as seen (automatic), rate (stars or like/dislike). The same interactions users already understand, standardized.
- Fully **Flexible** by design: A post can be text, image, video, or any custom type. Your server chooses the schema (you only click a checkbox, what you'll allow). No lock-in to one UI/UX, Your apps render the data as you wish; the protocol stays neutral all the way through, we only define absolute core,so that you can focus on building social experiences not re-inventing the wheel.
- **Centralized** control, **decentralized** efficiency : Your (& your trusted people's) servers acknowledge each other, prevent conflicts, and keep the system running without a fuss, scales almost infinitely while keeping you in control.
- **Self‑host friendly**: Plain JSON over HTTPS. Easy to deploy on a VPS, serverless, or on‑prem.

---

## Protocol

- **Transport:** HTTPS for REST endpoints with JSON payload
- **Client Realtime:** WebSocket for bidirectional streams and Server-Sent Events (SSE) for one-way streams.
- **Server Sync:** An optional WebSocket for host-to-host communication.

---

## Endpoints

### Spaces (7 Endpoints)

| Action       | Endpoint                  | Notes                                          |
| :----------- | :------------------------ | :--------------------------------------------- |
| Create Space | `POST /space`             | Creates a new top-level space for the user.    |
| Get Space    | `GET /space/{id}`         | Retrieves a single space by its unique ID.     |
| List Spaces  | `GET /space`              | Lists all spaces accessible to the user.       |
| Update Space | `PATCH /space/{id}`       | Partially updates a space's metadata.          |
| Delete Space | `DELETE /space/{id}`      | Deletes an entire space and its memberships.   |
| List Threads | `GET /space/{id}/threads` | Lists all threads organized within a space.    |
| List Posts   | `GET /space/{id}/posts`   | Lists all posts across all threads in a space. |

### Threads (4 REST + 3 Realtime/Sync)

| Action                 | Endpoint                  | Notes                                                                  |
| :--------------------- | :------------------------ | :--------------------------------------------------------------------- |
| Create Thread          | `POST /thread`            | Creates a new thread; client generates the ID.                         |
| Get Thread             | `GET /thread/{id}`        | Retrieves a thread's metadata and properties.                          |
| Update Thread          | `PATCH /thread/{id}`      | Updates a thread's metadata (co-founders only).                        |
| Exit Thread            | `DELETE /thread/{id}`     | User unsubscribes; co-founders lose privileges.                        |
| Get Servers            | `GET /thread/{id}/urls`   | Fetches the server URLs (root, live, events) for the thread.           |
| Live Events (Client)   | `GET /thread/{id}/live`   | **WebSocket** for bidirectional client-server communication.           |
| Stream Events (Client) | `GET /thread/{id}/events` | **SSE** for lightweight, one-way server-to-client updates.             |
| Sync (Server)          | `WS /thread/{id}/sync`    | **WebSocket** for optional server-to-server consensus and replication. |

### Posts (6 Endpoints)

| Action          | Endpoint                                          | Notes                                                       |
| :-------------- | :------------------------------------------------ | :---------------------------------------------------------- |
| Create Version  | `POST /thread/{threadId}/post/{postId}/{version}` | Creates the first version of a post or a subsequent one.    |
| Get Full Post   | `GET /thread/{threadId}/post/{postId}`            | Retrieves a post with its complete version history.         |
| Get Version     | `GET /thread/{threadId}/post/{postId}/{version}`  | Retrieves a single, specific version of a post.             |
| Get Metadata    | `GET /thread/{threadId}/post/{postId}/meta`       | Fetches a post's dynamic metadata (views, reactions, etc.). |
| Update Metadata | `PATCH /thread/{threadId}/post/{postId}/meta`     | Updates metadata like reactions, views, or ratings.         |

---

## Technical Notes

#### Spaces

- Spaces are user-owned containers for organizing threads and can be nested recursively.
- The `id` is an immutable numeric string, unique per user.
- The `kind` property ('chat', 'feed') is a developer hint and does not enforce behavior.

#### Threads

- The thread `id` is a client-generated, user-defined unicode string, which is editable by co-founder consensus.
- Kinds (`original`, `sync`, `clone`) define the replication strategy.
- Member roles fall into three broad categories: `co-founder`, `maintainer`, and `netizen`.

#### Posts

- The `id` is a client-generated UUIDv4, unique within a thread and immutable.
- Each edit creates a new `version` with a monotonic integer, a canonical `hash`, and an optional `sign` (signature).
- Time is discrete (`day` + `time`) to provide a natural rate limit (864ms precision) and prevent collisions.

#### Realtime

- Client-facing realtime is split: `WebSockets` (`/live`) for bidirectional interaction and `SSE` (`/events`) for lightweight server push.
- Server-to-server sync is handled over a dedicated, optional WebSocket (`/sync`).

#### Consensus

- Co-founders are managed via a voting mechanism.
- Host-to-host communication for post pre-checks, propagation, and meta-diffs now occurs over the optional `WS /thread/{id}/sync` channel instead of separate REST endpoints.

#### Misc

- The entire API surface consists of 17 RESTful endpoints, 2 client-facing realtime endpoints (WS/SSE), and 1 optional server-to-server sync WebSocket.
- Authentication is handled by individual co-founder servers and is outside the scope of this core protocol.
