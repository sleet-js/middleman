// ========================================
// API_NEAR_SOCIAL_NOTIFICATIONS
// GET /v1/notifications/{account_id} — the account's notifications,
// newest first.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_NOTIFICATION,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_NOTIFICATIONS_PARAMS {
  account_id: string;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_notifications(
  params: API_NEAR_SOCIAL_NOTIFICATIONS_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_NOTIFICATION>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_NOTIFICATION>>({
    key: "near_social_notifications",
    path_params: { account_id: params.account_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL NOTIFICATIONS",
    fallback: "api_near_social_notifications failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
