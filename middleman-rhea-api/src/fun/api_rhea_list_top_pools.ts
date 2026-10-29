// ========================================
// API_RHEA_LIST_TOP_POOLS
// GET /list-top-pools — top pools by tvl.
// ========================================

import { api_rhea_get } from "../stuff/api_rhea_get";
import type { RHEA_POOL_LIST_RESPONSE } from "../types/rhea_pool";

export async function api_rhea_list_top_pools(): Promise<RHEA_POOL_LIST_RESPONSE> {
  return api_rhea_get<RHEA_POOL_LIST_RESPONSE>({
    key: "rhea_list_top_pools",
    label: "RHEA LIST TOP POOLS",
    fallback: "api_rhea_list_top_pools failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
