// thread/$id/delete.ts
import { type } from "arktype";
import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, ThreadProps } from "@/types";

/**
 * Exit a thread (unsubscribe for members, privilege revocation for co-founders).
 * @route DELETE /thread/{id}
 * @returns Success response
 */
export const exitThread = oc
  .route({
    method: "DELETE",
    path: "/thread/{id}",
    summary: "Exit or unsubscribe from a thread",
  })
  .input(type(ThreadProps.pick("id")))
  .output(SuccessValue({ unsubscribed: "true" }).or(ErrorValue));
