import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, PostBody, PostProps } from "@/types";

/**
 * Create a new version of an existing post.
 * Each version has a monotonic integer, hash, and optional signature.
 * @route POST /post/{id}/{version}
 */
export const createPostVersion = oc
  .route({
    method: "POST",
    path: "/post/{id}/{version}",
    summary: "Create a new version of a post",
  })
  .input(PostProps.pick("id").and(PostBody))
  .output(
    SuccessValue(PostProps.pick("id").and(PostBody.pick("version"))).or(
      ErrorValue
    )
  );
