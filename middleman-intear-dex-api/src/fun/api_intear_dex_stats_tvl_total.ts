// ========================================
// API_INTEAR_DEX_STATS_TVL_TOTAL
// GET /stats/tvl/total/{period} — total value locked over time.
//
// period is one of day | week | month | year | total. the api answers
// anything else with "Invalid period. Expected day|week|month|year|total".
// ========================================

import { api_intear_dex_get } from "../stuff/api_intear_dex_get";
import type { INTEAR_DEX_TVL_RESPONSE } from "../types/intear_dex";
import type { INTEAR_DEX_PERIOD } from "../stuff/intear_dex_endpoint_paths";

export async function api_intear_dex_stats_tvl_total(
  period: INTEAR_DEX_PERIOD,
): Promise<INTEAR_DEX_TVL_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_TVL_RESPONSE>({
    key: "dex_stats_tvl_total",
    period,
    label: "INTEAR DEX STATS TVL TOTAL",
    fallback: "api_intear_dex_stats_tvl_total failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
