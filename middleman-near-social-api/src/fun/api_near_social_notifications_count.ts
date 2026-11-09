// ========================================
// API_NEAR_SOCIAL_NOTIFICATIONS_COUNT
// GET /v1/notifications/{account_id}/count — how many notifications
// the account has newer than `since`.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_NOTIFICATIONS_COUNT } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_NOTIFICATIONS_COUNT_PARAMS {
  account_id: string;
  since?: number;
}

export async function api_near_social_notifications_count(
  params: API_NEAR_SOCIAL_NOTIFICATIONS_COUNT_PARAMS,
): Promise<NEAR_SOCIAL_NOTIFICATIONS_COUNT> {
  return api_near_social_get<NEAR_SOCIAL_NOTIFICATIONS_COUNT>({
    key: "near_social_notifications_count",
    path_params: { account_id: params.account_id },
    params: { since: params.since },
    label: "NEAR SOCIAL NOTIFICATIONS COUNT",
    fallback: "api_near_social_notifications_count failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
