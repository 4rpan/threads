import { type } from "arktype";
import { FilterFields } from "@/types";

/**
 * Schema for a single Post Version.
 */
export const PostBody = type({
  author: "string", // must be in `post.authors`
  version: "number", // monotonic integer
  day: "number", // relative to thread epoch
  time: "number", // 1/100,000th of a day (864ms resolution)
  "type?": "string", // schema identifier, e.g. '@std/text'
  value: "unknown", // payload content
  hash: "string", // checksum of canonical {day}.{time}-{type}\n---\n{value}
  "sign?": "string|null", // optional signature
  "ref?": "string|null", // post reference {postId} or {postId}.{version}
});

/**
 * Schema for full Post object.
 */
export const PostProps = type({
  space: "string", // space ID
  thread: "string", // thread ID
  id: "string", // post ID (UUIDv4, immutable)
  authors: "string[]", // authorized authors
  meta: {
    "views?": "number",
    "reactions?": "Record<string, number>",
    "averageRating?": "number",
    "comments?": "string",
  }, // server managed (views, reactions, ratings)
  versions: PostBody.array(), // ordered versions
});

export const PostFilters = type({
  "...": FilterFields,
  "unseen?": "boolean",
  filterBy: "'id'| 'time' = 'time'",
  /**
   * on a specific day or between specific days
   */
  "day?": "number | number[]",
  "time?": "number | number[]",
  /**
   * before/after/between specific post id
   */
  "before?": "string",
  "after?": "string",
  "between?": "string[]",
});
