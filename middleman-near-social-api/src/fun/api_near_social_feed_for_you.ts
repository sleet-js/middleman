// ========================================
// API_NEAR_SOCIAL_FEED_FOR_YOU
// GET /v1/feed/for_you — the home feed. interleaves the viewer's
// following feed with trending posts from accounts they do not
// follow.
//
// pass `viewer` to get the viewer's own feed and the `following`,
// `trending` and `new` reasons on every item.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_FEED_FOR_YOU_PARAMS {
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_feed_for_you(
  params: API_NEAR_SOCIAL_FEED_FOR_YOU_PARAMS = {},
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_feed_for_you",
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL FEED FOR YOU",
    fallback: "api_near_social_feed_for_you failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
