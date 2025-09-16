import { oc } from "@orpc/contract";
import { ErrorValue, PostProps, SuccessValue } from "@/types";

/**
 * Update a post’s metadata.
 * For syncing between co-founders,
 * they maintain a (generated algorithmically) thread for every new post
 * users (post) their seen acknowledgement, reactions, review/rating, comments etc. in that thread
 * then on a regular time interval, a cron task calls this endpoint to update 'meta'
 * @route PATCH /post/{id}/meta
 */
export const updatePostMeta = oc
  .route({
    method: "PATCH",
    path: "/post/{id}/meta",
    summary: "Update post metadata (views, reactions, rating, etc.)",
  })
  .input(PostProps.pick("meta"))
  .output(SuccessValue(PostProps.pick("id")).or(ErrorValue));
