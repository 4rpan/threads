import { ErrorValue, FilterFields, SuccessValue, ThreadProps } from "@/types";
import { oc } from "@orpc/contract";
import { type } from "arktype";

/**
 * Contract for listing threads within a space.
 */
export const listThreadsInSpace = oc
  .route({
    method: "GET",
    path: "/space/{id}/threads",
    summary: "List all threads in a space",
  })
  .input(
    type({
      /**
       * Parent space ID from path
       */
      id: "string",
      "...": FilterFields,
    })
  )
  .output(SuccessValue(ThreadProps.pick("id").array()).or(ErrorValue));
