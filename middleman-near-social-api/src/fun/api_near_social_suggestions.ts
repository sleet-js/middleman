// ========================================
// API_NEAR_SOCIAL_SUGGESTIONS
// GET /v1/suggestions — popular accounts to follow. with a `viewer`
// it leaves out the viewer and the accounts they already follow.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_ACCOUNT_CARD,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_SUGGESTIONS_PARAMS {
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_suggestions(
  params: API_NEAR_SOCIAL_SUGGESTIONS_PARAMS = {},
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>>({
    key: "near_social_suggestions",
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL SUGGESTIONS",
    fallback: "api_near_social_suggestions failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
