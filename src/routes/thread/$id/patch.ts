import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, ThreadProps } from "@/types";

/**
 * Update thread metadata.
 * Only editable by co-founders, updates do not affect posts.
 * @route PATCH /thread/{id}
 */
export const updateThread = oc
  .route({
    method: "PATCH",
    path: "/thread/{id}",
    summary: "Update thread metadata",
  })
  .input(ThreadProps.partial())
  .output(SuccessValue(ThreadProps.pick("id")).or(ErrorValue));
