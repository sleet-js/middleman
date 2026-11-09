// ========================================
// API_NEAR_SOCIAL_LEGACY
// GET /v1/legacy/{account_id} — the account's legacy near.social
// profile and follows, already converted to social-kv/1 fields.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_LEGACY } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_LEGACY_PARAMS {
  account_id: string;
}

export async function api_near_social_legacy(
  params: API_NEAR_SOCIAL_LEGACY_PARAMS,
): Promise<NEAR_SOCIAL_LEGACY> {
  return api_near_social_get<NEAR_SOCIAL_LEGACY>({
    key: "near_social_legacy",
    path_params: { account_id: params.account_id },
    label: "NEAR SOCIAL LEGACY",
    fallback: "api_near_social_legacy failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
