import { type } from "arktype";
import { oc } from "@orpc/contract";
import { ErrorValue, SuccessValue, ThreadProps } from "@/types";

/**
 * Fetch server endpoints (root/live/events) for a thread.
 * @route GET /thread/{id}/servers
 */
export const getThreadServers = oc
  .route({
    method: "GET",
    path: "/thread/{id}/servers",
    summary: "Get thread server endpoints",
  })
  .input(type(ThreadProps.pick("id")))
  .output(
    SuccessValue(
      type({
        /**
         * Restful API Root endpoints
         * - only thread & it's subroutes are exposed,
         * - space endpoints aren't exposed for thread members as it's personal
         * - examples:
         *  - `https://original.founder.tld/space/xyz/thread/abc/`
         *  - `https://thread.community.org/`
         */
        root: "string[]",
        /**
         * WebSocket Endpoints
         */
        live: "string[]",
        /**
         * SSE Endpoints
         */
        events: "string[]",
      })
    ).or(ErrorValue)
  );
