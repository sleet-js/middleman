// ========================================
// API_NEAR_SOCIAL_ACCOUNT
// GET /v1/accounts/{account_id} — the account's profile.
//
// any syntactically valid account id answers, even one that has
// never posted (the profile comes back empty with `has_profile: false`).
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_PROFILE } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_ACCOUNT_PARAMS {
  account_id: string;
  viewer?: string;
}

export async function api_near_social_account(
  params: API_NEAR_SOCIAL_ACCOUNT_PARAMS,
): Promise<NEAR_SOCIAL_PROFILE> {
  return api_near_social_get<NEAR_SOCIAL_PROFILE>({
    key: "near_social_account",
    path_params: { account_id: params.account_id },
    params: { viewer: params.viewer },
    label: "NEAR SOCIAL ACCOUNT",
    fallback: "api_near_social_account failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
