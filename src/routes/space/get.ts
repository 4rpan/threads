import { oc } from "@orpc/contract";
import { ErrorValue, FilterFields, SpaceProps, SuccessValue } from "@/types";

/**
 * Contract for listing the user's spaces with pagination or sub-spaces within a parent space.
 */
export const listSpaces = oc
  .route({
    method: "GET",
    path: "/spaces",
    summary: "List all accessible spaces or sub-spaces for the user",
  })
  .input(FilterFields.and(SpaceProps.pick("parentSpaceId")))
  .output(SuccessValue(SpaceProps.pick("id").array()).or(ErrorValue));
