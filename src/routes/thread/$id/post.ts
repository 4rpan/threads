import { ErrorValue, SpaceProps, SuccessValue, ThreadProps } from "@/types";
import { oc } from "@orpc/contract";
import { type } from "arktype";

/**
 * Contract for creating a new thread within a space.
 */
export const createThreadInSpace = oc
  .route({
    method: "POST",
    path: "/thread/{id}",
    summary: "Create a new thread in a space",
  })
  .input(ThreadProps)
  .output(SuccessValue(ThreadProps.pick("id")).or(ErrorValue));
