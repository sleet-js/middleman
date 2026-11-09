// ========================================
// API_NEAR_SOCIAL_FEED_GLOBAL
// GET /v1/feed/global — every top-level post, newest first. no
// replies and no reposts.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_FEED_GLOBAL_PARAMS {
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_feed_global(
  params: API_NEAR_SOCIAL_FEED_GLOBAL_PARAMS = {},
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_feed_global",
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL FEED GLOBAL",
    fallback: "api_near_social_feed_global failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
