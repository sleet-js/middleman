// ========================================
// API_NEAR_SOCIAL_ACCOUNT_REPLIES
// GET /v1/accounts/{account_id}/replies — the account's replies.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_ACCOUNT_REPLIES_PARAMS {
  account_id: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_account_replies(
  params: API_NEAR_SOCIAL_ACCOUNT_REPLIES_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_account_replies",
    path_params: { account_id: params.account_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL ACCOUNT REPLIES",
    fallback: "api_near_social_account_replies failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
