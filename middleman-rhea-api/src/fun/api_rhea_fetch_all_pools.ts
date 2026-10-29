// ========================================
// API_RHEA_FETCH_ALL_POOLS
// GET /fetchAllPools — every v1 pool (simple/stable/rated) plus
// block height/time.
// ========================================

import { api_rhea_get } from "../stuff/api_rhea_get";
import type { RHEA_FETCH_ALL_POOLS_RESPONSE } from "../types/rhea_pool";

export async function api_rhea_fetch_all_pools(): Promise<RHEA_FETCH_ALL_POOLS_RESPONSE> {
  return api_rhea_get<RHEA_FETCH_ALL_POOLS_RESPONSE>({
    key: "rhea_fetch_all_pools",
    label: "RHEA FETCH ALL POOLS",
    fallback: "api_rhea_fetch_all_pools failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
