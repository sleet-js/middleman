// ========================================
// API_NEAR_SOCIAL_POST_PREVIEW
// GET /v1/posts/{account_id}/{post_id}/preview — the link preview for
// the post's url. the server fetches and caches it on demand.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_LINK } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_POST_PREVIEW_PARAMS {
  account_id: string;
  post_id: string | number;
}

export async function api_near_social_post_preview(
  params: API_NEAR_SOCIAL_POST_PREVIEW_PARAMS,
): Promise<NEAR_SOCIAL_LINK> {
  return api_near_social_get<NEAR_SOCIAL_LINK>({
    key: "near_social_post_preview",
    path_params: { account_id: params.account_id, post_id: params.post_id },
    label: "NEAR SOCIAL POST PREVIEW",
    fallback: "api_near_social_post_preview failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
