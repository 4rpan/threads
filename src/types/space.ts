import { type } from "arktype";

/**
 * **Space** Body (object) Schema
 */
export const SpaceProps = type({
  id: "string",
  "parentSpaceId?": "string",
  owner: "string",
  name: "string",
  "about?": "string",
  kind: "string",
  "meta?": "Record<string, unknown>",
  threads: "string[]",
  servers: {
    root: "string[]",
    live: "string[]",
    events: "string[]",
  },
  "tags?": "string.alpha",
});
