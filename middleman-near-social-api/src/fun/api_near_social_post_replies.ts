// ========================================
// API_NEAR_SOCIAL_POST_REPLIES
// GET /v1/posts/{account_id}/{post_id}/replies — the replies to the
// post, the author's own first and then everyone else's.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type {
  NEAR_SOCIAL_FEED_ITEM,
  NEAR_SOCIAL_PAGE,
} from "../types/near_social_types";

export interface API_NEAR_SOCIAL_POST_REPLIES_PARAMS {
  account_id: string;
  post_id: string | number;
  viewer?: string;
  limit?: number;
  cursor?: string;
}

export async function api_near_social_post_replies(
  params: API_NEAR_SOCIAL_POST_REPLIES_PARAMS,
): Promise<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>> {
  return api_near_social_get<NEAR_SOCIAL_PAGE<NEAR_SOCIAL_FEED_ITEM>>({
    key: "near_social_post_replies",
    path_params: { account_id: params.account_id, post_id: params.post_id },
    params: {
      viewer: params.viewer,
      limit: params.limit,
      cursor: params.cursor,
    },
    label: "NEAR SOCIAL POST REPLIES",
    fallback: "api_near_social_post_replies failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
