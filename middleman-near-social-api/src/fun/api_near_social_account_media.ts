// ========================================
// API_NEAR_SOCIAL_ACCOUNT_MEDIA
// GET /v1/accounts/{account_id}/media — the account's posts that
// carry media.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_ACCOUNT_MEDIA_PARAMS {
  account_id: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_account_media(
  params: API_NEAR_SOCIAL_ACCOUNT_MEDIA_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_account_media",
    path_params: { account_id: params.account_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL ACCOUNT MEDIA",
    fallback: "api_near_social_account_media failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
