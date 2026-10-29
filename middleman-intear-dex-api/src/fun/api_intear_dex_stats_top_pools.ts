// ========================================
// API_INTEAR_DEX_STATS_TOP_POOLS
// GET /stats/top/pools/{period} — pools ranked by volume.
//
// period is one of day | week | month | year | total.
// ========================================

import { api_intear_dex_get } from "./api_intear_dex_get";
import type { INTEAR_DEX_TOP_POOLS_RESPONSE } from "../types/intear_dex";
import type { INTEAR_DEX_PERIOD } from "../stuff/intear_dex_endpoint_paths";

export async function api_intear_dex_stats_top_pools(
  period: INTEAR_DEX_PERIOD,
): Promise<INTEAR_DEX_TOP_POOLS_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_TOP_POOLS_RESPONSE>({
    key: "dex_stats_top_pools",
    period,
    label: "INTEAR DEX STATS TOP POOLS",
    fallback: "api_intear_dex_stats_top_pools failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
