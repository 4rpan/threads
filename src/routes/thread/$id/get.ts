// thread/$id/get.ts
import { type } from "arktype";
import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, ThreadProps } from "@/types";

/**
 * Fetch a thread by ID.
 * @route GET /thread/{id}
 * @returns Thread object
 */
export const getThread = oc
  .route({
    method: "GET",
    path: "/thread/{id}",
    summary: "Get a thread by ID",
  })
  .input(type(ThreadProps.pick("id")))
  .output(SuccessValue(ThreadProps).or(ErrorValue));
