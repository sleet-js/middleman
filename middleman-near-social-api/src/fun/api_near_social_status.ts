// ========================================
// API_NEAR_SOCIAL_STATUS
// GET /v1/status — how far the indexer has got on the chain.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_STATUS } from "../types/near_social_types";

export async function api_near_social_status(): Promise<NEAR_SOCIAL_STATUS> {
  return api_near_social_get<NEAR_SOCIAL_STATUS>({
    key: "near_social_status",
    label: "NEAR SOCIAL STATUS",
    fallback: "api_near_social_status failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
