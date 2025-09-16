import { oc } from "@orpc/contract";
import { ErrorValue, PostProps, SuccessValue } from "@/types";

/**
 * Fetch a post’s metadata.
 * Returns diff-synced views, reactions, and ratings.
 * @route GET /post/{id}/meta
 * 
 */
export const getPostMeta = oc
  .route({
    method: "GET",
    path: "/post/{id}/meta",
    summary: "Get post metadata (views, reactions, rating)",
  })
  .input(PostProps.pick("id"))
  .output(SuccessValue(PostProps.pick("meta")).or(ErrorValue));
