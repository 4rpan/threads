import { oc } from "@orpc/contract";
import {
  ErrorValue,
  SuccessValue,
  PostProps,
  FilterFields,
  SpaceProps,
  PostFilters,
} from "@/types";

/**
 * List posts in a space.
 * Supports cursor, day/time, before/after, between ranges, or unseen fetch.
 * @route GET /space/{id}/posts
 */
export const listPosts = oc
  .route({
    method: "GET",
    path: "/space/{id}/posts",
    summary: "List posts in a space",
  })
  .input(SpaceProps.pick("id").and(PostFilters))
  .output(SuccessValue(PostProps.pick("id", "thread", "space")).or(ErrorValue));
