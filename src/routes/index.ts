// 7x Space related endpoints
import { deleteSpace } from "./space/$id/delete";
import { getSpace } from "./space/$id/get";
import { updateSpace } from "./space/$id/patch";
import { createSpace } from "./space/$id/post";
import { listPostsInSpace } from "./space/$id/posts/get";
import { listThreadsInSpace } from "./space/$id/threads/get";
import { listSpaces } from "./space/get";

// 4x Thread related endpoints
import { exitThread } from "./thread/$id/delete";
import { getThread } from "./thread/$id/get";
import { updateThread } from "./thread/$id/patch";
import { getThreadServers } from "./thread/$id/urls/get";

// 3x Extra endpoints for threads management & realtime capability
import { threadServerSentEvents } from "./thread/$id/events";
import { threadWebSocket } from "./thread/$id/live";
import { syncThread } from "./thread/$id/sync";

// 6x Post releted endpoints
import { createPostVersion } from "./thread/$id/post/$id/$version/post";
import { getPost } from "./thread/$id/post/$id/get";
import { getPostVersion } from "./thread/$id/post/$id/$version/get";
import { getPostMeta } from "./thread/$id/post/$id/meta/get";
import { updatePostMeta } from "./thread/$id/post/$id/meta/patch";
import { createThreadInSpace } from "./thread/$id/post";

/**
 * The `threads` spec
 * - Unified Feed API over HTTPS + Realtime
 * - RESTful endpoints expressed as RPC contracts
 * @property space 'Organizing spaces & recursive sub-spaces'
 * @property thread 'Thread lifecycle, servers, posts in a thread'
 * @property post 'Single posts, versions, meta interactions'
 * @property sync 'Server-to-server replication & consensus'
 */
const routes = {
  /**
   * Space related procedures
   */
  space: {
    create: createSpace,
    retrieve: getSpace,
    list: listSpaces,
    update: updateSpace,
    delete: deleteSpace,
    listThreads: listThreadsInSpace,
    listPost: listPostsInSpace,
  },

  /**
   * Thread related procedures
   */
  thread: {
    create: createThreadInSpace,
    retrieve: getThread,
    update: updateThread,
    exit: exitThread,
    servers: getThreadServers,
    live: threadWebSocket,
    events: threadServerSentEvents,
  },

  /**
   * Post related procedures
   */
  post: {
    retrieveFull: getPost,
    create: createPostVersion,
    retrieve: getPostVersion,
    meta: {
      fetch: getPostMeta,
      update: updatePostMeta,
    },
  },

  /**
   * Server-to-server sync over websocket
   */
  sync: syncThread,
};

export { routes as spec };
