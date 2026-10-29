// ========================================
// API_INTEAR_DEX_TEAR_STAKING
// GET /tear/staking?accountId=... — the TEAR staking pool state.
//
// accountId is optional here (the api answers 200 without it) but when
// given it narrows the `account` field to that account.
// ========================================

import { api_intear_dex_get } from "../stuff/api_intear_dex_get";
import type { INTEAR_DEX_TEAR_STAKING_RESPONSE } from "../types/intear_dex";

export interface API_INTEAR_DEX_TEAR_STAKING_PARAMS {
  accountId?: string;
}

export async function api_intear_dex_tear_staking(
  params: API_INTEAR_DEX_TEAR_STAKING_PARAMS = {},
): Promise<INTEAR_DEX_TEAR_STAKING_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_TEAR_STAKING_RESPONSE>({
    key: "dex_tear_staking",
    params,
    label: "INTEAR DEX TEAR STAKING",
    fallback: "api_intear_dex_tear_staking failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
