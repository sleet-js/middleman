// ========================================
// API_INTEAR_DEX_STATS_TOP_ASSETS
// GET /stats/top/assets/{period} — assets ranked by volume.
//
// period is one of day | week | month | year | total.
// ========================================

import { api_intear_dex_get } from "../stuff/api_intear_dex_get";
import type { INTEAR_DEX_TOP_ASSETS_RESPONSE } from "../types/intear_dex";
import type { INTEAR_DEX_PERIOD } from "../stuff/intear_dex_endpoint_paths";

export async function api_intear_dex_stats_top_assets(
  period: INTEAR_DEX_PERIOD,
): Promise<INTEAR_DEX_TOP_ASSETS_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_TOP_ASSETS_RESPONSE>({
    key: "dex_stats_top_assets",
    period,
    label: "INTEAR DEX STATS TOP ASSETS",
    fallback: "api_intear_dex_stats_top_assets failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
