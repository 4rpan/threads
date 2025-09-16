import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, PostBody, PostProps } from "@/types";

/**
 * Get a specific version of a post.
 * @route GET /post/{id}/{version}
 */
export const getPostVersion = oc
  .route({
    method: "GET",
    path: "/post/{id}/{version}",
    summary: "Fetch a specific post version",
  })
  .input(PostProps.pick("id").and(PostBody.pick("version")))
  .output(SuccessValue(PostBody).or(ErrorValue));
