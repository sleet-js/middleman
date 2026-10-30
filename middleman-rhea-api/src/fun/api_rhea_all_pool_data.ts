// ========================================
// API_RHEA_ALL_POOL_DATA
// GET /all-pool-data — the dex's own tvl and 24h volume, over every
// pool the indexer knows about.
//
// this is the number the dex as a whole has, not the sum of one page
// of pools. use it for a headline figure.
// ========================================

import { api_rhea_get } from "../stuff/api_rhea_get";
import type { RHEA_ALL_POOL_DATA_RESPONSE } from "../types/rhea_pool";

export async function api_rhea_all_pool_data(): Promise<RHEA_ALL_POOL_DATA_RESPONSE> {
  return api_rhea_get<RHEA_ALL_POOL_DATA_RESPONSE>({
    key: "rhea_all_pool_data",
    label: "RHEA ALL POOL DATA",
    fallback: "api_rhea_all_pool_data failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
