// ========================================
// API_NEAR_SOCIAL_FEED_FOLLOWING
// GET /v1/feed/following/{account_id} — posts and reposts from the
// account and everyone it follows, newest first. no replies.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_FEED_FOLLOWING_PARAMS {
  account_id: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_feed_following(
  params: API_NEAR_SOCIAL_FEED_FOLLOWING_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_feed_following",
    path_params: { account_id: params.account_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL FEED FOLLOWING",
    fallback: "api_near_social_feed_following failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
