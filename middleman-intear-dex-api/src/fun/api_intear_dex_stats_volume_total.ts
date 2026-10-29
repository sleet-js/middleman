// ========================================
// API_INTEAR_DEX_STATS_VOLUME_TOTAL
// GET /stats/volume/total/{period} — total traded volume over time.
//
// period is one of day | week | month | year | total.
// ========================================

import { api_intear_dex_get } from "./api_intear_dex_get";
import type { INTEAR_DEX_VOLUME_RESPONSE } from "../types/intear_dex";
import type { INTEAR_DEX_PERIOD } from "../stuff/intear_dex_endpoint_paths";

export async function api_intear_dex_stats_volume_total(
  period: INTEAR_DEX_PERIOD,
): Promise<INTEAR_DEX_VOLUME_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_VOLUME_RESPONSE>({
    key: "dex_stats_volume_total",
    period,
    label: "INTEAR DEX STATS VOLUME TOTAL",
    fallback: "api_intear_dex_stats_volume_total failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
