// ========================================
// API_NEAR_SOCIAL_HASHTAGS_TRENDING
// GET /v1/hashtags/trending — the top ten hashtags over the last
// 24 hours.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_HASHTAG,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export async function api_near_social_hashtags_trending(): Promise<
  NEAR_SOCIAL_PAGE<NEAR_SOCIAL_HASHTAG>
> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_HASHTAG>>({
    key: "near_social_hashtags_trending",
    label: "NEAR SOCIAL HASHTAGS TRENDING",
    fallback: "api_near_social_hashtags_trending failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
