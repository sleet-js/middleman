// ========================================
// API_NEAR_SOCIAL_SEARCH_POSTS
// GET /v1/search/posts?q= — posts whose text contains the query,
// case-insensitive, newest first.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_SEARCH_POSTS_PARAMS {
  q: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_search_posts(
  params: API_NEAR_SOCIAL_SEARCH_POSTS_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_search_posts",
    params: {
      q: params.q,
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL SEARCH POSTS",
    fallback: "api_near_social_search_posts failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
