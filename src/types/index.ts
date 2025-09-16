import { type } from "arktype";

export { PostProps, PostBody } from "./post";
export { ThreadProps } from "./thread";
export { SpaceProps } from "./space";

/**
 * Error Schema JSON payload
 */
export const ErrorValue = type({
  success: "false",
  "errors?": "string[]",
  message: "string",
});

/**
 * Error Schema JSON payload base
 */
export const SuccessValue = type("<T>", {
  success: "true",
  message: "string",
  data: "T",
});

/**
 * Filter or Pagination Schema
 */
export const FilterFields = type({
  /**
   * Page number
   */
  "cursor?": "string",
  /**
   * Items per page
   */
  "limit?": "number",
});
