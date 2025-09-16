import { type } from "arktype";
import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, PostProps } from "@/types";

/**
 * Get a single post (with all its versions).
 * Useful for fetching post details directly when ID is known.
 * @route GET /post/{id}
 */
export const getPost = oc
  .route({
    method: "GET",
    path: "/post/{id}",
    summary: "Fetch a single post with its versions",
  })
  .input(type(PostProps.pick("id")))
  .output(SuccessValue(PostProps).or(ErrorValue));
