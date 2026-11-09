// ========================================
// API_NEAR_SOCIAL_POST
// GET /v1/posts/{account_id}/{post_id} — the post itself plus the
// chain of ancestors it replies to.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_THREAD } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_POST_PARAMS {
  account_id: string;
  post_id: string | number;
  viewer?: string;
}

export async function api_near_social_post(
  params: API_NEAR_SOCIAL_POST_PARAMS,
): Promise<NEAR_SOCIAL_THREAD> {
  return api_near_social_get<NEAR_SOCIAL_THREAD>({
    key: "near_social_post",
    path_params: { account_id: params.account_id, post_id: params.post_id },
    params: { viewer: params.viewer },
    label: "NEAR SOCIAL POST",
    fallback: "api_near_social_post failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
