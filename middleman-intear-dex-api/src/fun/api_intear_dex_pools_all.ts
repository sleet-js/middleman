// ========================================
// API_INTEAR_DEX_POOLS_ALL
// GET /pools/all — every pool the dex knows about, with liquidity,
// 24h/7d volume and apy.
//
// note: accountId is accepted by the api but does NOT filter the
// result set — with and without it the response is identical. filter
// client side if you need per-account pools.
// ========================================

import { api_intear_dex_get } from "../stuff/api_intear_dex_get";
import type { INTEAR_DEX_POOLS_RESPONSE } from "../types/intear_dex";

export interface API_INTEAR_DEX_POOLS_ALL_PARAMS {
  accountId?: string;
}

export async function api_intear_dex_pools_all(
  params: API_INTEAR_DEX_POOLS_ALL_PARAMS = {},
): Promise<INTEAR_DEX_POOLS_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_POOLS_RESPONSE>({
    key: "dex_pools_all",
    params,
    label: "INTEAR DEX POOLS ALL",
    fallback: "api_intear_dex_pools_all failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
