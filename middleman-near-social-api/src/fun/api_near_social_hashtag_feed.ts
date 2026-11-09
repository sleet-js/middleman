// ========================================
// API_NEAR_SOCIAL_HASHTAG_FEED
// GET /v1/hashtags/{tag} — posts with the hashtag, newest first.
// the tag is lowercased by the api.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_HASHTAG_FEED_PARAMS {
  tag: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_hashtag_feed(
  params: API_NEAR_SOCIAL_HASHTAG_FEED_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_hashtag_feed",
    path_params: { tag: params.tag },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL HASHTAG FEED",
    fallback: "api_near_social_hashtag_feed failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
