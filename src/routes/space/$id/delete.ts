// filename -> /space/delete.ts

import { ErrorValue, SpaceProps, SuccessValue } from "@/types";
import { oc } from "@orpc/contract";

/**
 * Contract for deleting a space. Ideally keep a backup before deleting
 */
export const deleteSpace = oc
  .route({
    method: "DELETE",
    path: "/space/{id}",
    summary: "Delete a space by its ID",
  })
  .input(SpaceProps.pick("id"))
  .output(SuccessValue({ deleted: "true" }).or(ErrorValue));
