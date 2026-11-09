// ========================================
// API_NEAR_SOCIAL_POST_REPOSTS
// GET /v1/posts/{account_id}/{post_id}/reposts — the accounts that
// reposted the post.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_ACCOUNT_CARD,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_POST_REPOSTS_PARAMS {
  account_id: string;
  post_id: string | number;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_post_reposts(
  params: API_NEAR_SOCIAL_POST_REPOSTS_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_ACCOUNT_CARD>>({
    key: "near_social_post_reposts",
    path_params: { account_id: params.account_id, post_id: params.post_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL POST REPOSTS",
    fallback: "api_near_social_post_reposts failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
