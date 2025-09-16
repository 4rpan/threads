import { ErrorValue, SpaceProps, SuccessValue } from "@/types";
import { oc } from "@orpc/contract";

/**
 * Contract for fetching a single space by its ID.
 */
export const getSpace = oc
  .route({
    method: "GET",
    path: "/space/{id}",
    summary: "Get a space by its ID",
  })
  .input(SpaceProps.pick("id"))
  .output(SuccessValue(SpaceProps).or(ErrorValue));
