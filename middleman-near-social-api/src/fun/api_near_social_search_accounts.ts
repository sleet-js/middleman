// ========================================
// API_NEAR_SOCIAL_SEARCH_ACCOUNTS
// GET /v1/search/accounts?q= — accounts matching the query. it
// matches the account id prefix first, then name-word prefixes,
// ranked by followers.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_ACCOUNT_CARD,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_SEARCH_ACCOUNTS_PARAMS {
  q: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_search_accounts(
  params: API_NEAR_SOCIAL_SEARCH_ACCOUNTS_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>>({
    key: "near_social_search_accounts",
    params: {
      q: params.q,
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL SEARCH ACCOUNTS",
    fallback: "api_near_social_search_accounts failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
