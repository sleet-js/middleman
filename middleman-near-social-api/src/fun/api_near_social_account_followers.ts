// ========================================
// API_NEAR_SOCIAL_ACCOUNT_FOLLOWERS
// GET /v1/accounts/{account_id}/followers — who follows the account,
// newest first.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_ACCOUNT_CARD,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_ACCOUNT_FOLLOWERS_PARAMS {
  account_id: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_account_followers(
  params: API_NEAR_SOCIAL_ACCOUNT_FOLLOWERS_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>>({
    key: "near_social_account_followers",
    path_params: { account_id: params.account_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL ACCOUNT FOLLOWERS",
    fallback: "api_near_social_account_followers failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
