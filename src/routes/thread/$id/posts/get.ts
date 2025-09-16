import { oc } from "@orpc/contract";
import {
  ErrorValue,
  SuccessValue,
  ThreadProps,
  PostProps,
  FilterFields,
  PostFilters,
} from "@/types";

/**
 * List posts in a thread.
 * Supports cursor, day/time, before/after, between ranges, or unseen fetch.
 * @route GET /thread/{id}/posts
 */
export const listPosts = oc
  .route({
    method: "GET",
    path: "/thread/{id}/posts",
    summary: "List posts in a thread",
  })
  .input(ThreadProps.pick("id").and(PostFilters))
  .output(SuccessValue(PostProps.pick("id", "thread", "space")).or(ErrorValue));
