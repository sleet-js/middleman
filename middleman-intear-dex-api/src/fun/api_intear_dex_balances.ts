// ========================================
// API_INTEAR_DEX_BALANCES
// GET /balances?accountId=... — the dex balances and pending fees of
// one near account.
//
// accountId is REQUIRED. without it the api answers 400 with
// "Failed to deserialize query string: missing field `accountId`".
// ========================================

import { api_intear_dex_get } from "../stuff/api_intear_dex_get";
import type { INTEAR_DEX_BALANCES_RESPONSE } from "../types/intear_dex";

export interface API_INTEAR_DEX_BALANCES_PARAMS {
  accountId: string;
}

export async function api_intear_dex_balances(
  params: API_INTEAR_DEX_BALANCES_PARAMS,
): Promise<INTEAR_DEX_BALANCES_RESPONSE> {
  return api_intear_dex_get<INTEAR_DEX_BALANCES_RESPONSE>({
    key: "dex_balances",
    params,
    label: "INTEAR DEX BALANCES",
    fallback: "api_intear_dex_balances failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
