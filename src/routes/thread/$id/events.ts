// thread/$id/events.ts
import { oc } from "@orpc/contract";

/**
 * Server-Sent Events (SSE) endpoint
 * Lightweight one-way updates for this thread.
 * (new posts, versions, meta changes)
 * @route SSE /thread/{id}/events
 */
export const getThreadEvents = oc.route({
  method: "GET",
  path: "/thread/{id}/events",
  summary: "SSE endpoint for a thread",
  // no input schema (connection only needs thread/:id path)
});
