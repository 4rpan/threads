import { ErrorValue, SpaceProps, SuccessValue } from "@/types";
import { oc } from "@orpc/contract";

/**
 * Contract for updating an existing space.
 * All fields in the input body are optional.
 */
export const updateSpace = oc
  .route({
    method: "PATCH",
    path: "/space/{id}",
    summary: "Update a space's properties",
  })
  .input(SpaceProps.partial())
  .output(SuccessValue(SpaceProps.pick("id")).or(ErrorValue));
