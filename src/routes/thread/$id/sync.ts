import { oc } from "@orpc/contract";

/**
 * upgrades to a WebSocket endpoint
 * for bidirectional realtime updates between hosts
 * @route WS /thread/{id}/sync
 */
export const syncThread = oc.route({
  path: "/thread/{id}/live",
  summary: "WebSocket endpoint for syncing threads",
  // no input schema (connection only needs thread/:id path)
});
