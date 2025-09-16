
import { oc } from "@orpc/contract";
import { ThreadProps } from "@/types";

/**
 * upgrades to a WebSocket endpoint 
 * for bidirectional realtime updates
 * (new posts, versions, meta changes).
 * @route WS /thread/{id}/live
 */
export const getThreadLive = oc.route({
  method: "GET",
  path: "/thread/{id}/live",
  summary: "WebSocket endpoint for a thread",
  // no input schema (connection only needs thread/:id path)
});
