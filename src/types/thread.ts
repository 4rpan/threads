import { type } from "arktype";
import { SpaceProps } from ".";

/**
 * **Thread** Body (object) schema.
 */
export const ThreadProps = type({
  id: "string",
  space: SpaceProps.pick("id"),
  members: "unknown[]", // Member schema is custom per-thread
  title: "string",
  "home?": "string",
  description: "string",
  visibility: "'public' | 'private' | 'personal'",
  labels: "string[]",
  kind: "'original' | 'sync' | 'clone'",
  meta: {
    foundingMember: "string",
    "directingMember?": "string",
    foundingEpoch: "number",
    sync: {
      interval: "number",
      volume: "number",
    },
  },
  servers: {
    root: "string[]",
    live: "string[]",
    events: "string[]",
  },
});
