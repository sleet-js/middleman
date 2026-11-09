// ========================================
// API_NEAR_SOCIAL_POSTS_BATCH
// POST /v1/posts/batch — up to one hundred posts by key, in the
// order the keys were given. a key that does not exist comes back
// as null in the same slot.
// ========================================

import { api_near_social_post } from "../stuff/api_near_social_post";
import type { NEAR_SOCIAL_BATCH_RESPONSE } from "../types/near_social_types";

// the api takes at most one hundred keys per call.
const NEAR_SOCIAL_POSTS_BATCH_MAX_KEYS = 100;

export interface API_NEAR_SOCIAL_POSTS_BATCH_PARAMS {
  keys: string[];
  viewer?: string;
}

export async function api_near_social_posts_batch(
  params: API_NEAR_SOCIAL_POSTS_BATCH_PARAMS,
): Promise<NEAR_SOCIAL_BATCH_RESPONSE> {
  if (params.keys.length > NEAR_SOCIAL_POSTS_BATCH_MAX_KEYS) {
    throw new Error(
      `api_near_social_posts_batch: too many keys, the api takes at most ${NEAR_SOCIAL_POSTS_BATCH_MAX_KEYS} (got ${params.keys.length})`,
    );
  }

  return api_near_social_post<NEAR_SOCIAL_BATCH_RESPONSE>({
    key: "near_social_posts_batch",
    body: { keys: params.keys, viewer: params.viewer },
    label: "NEAR SOCIAL POSTS BATCH",
    fallback: "api_near_social_posts_batch failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
