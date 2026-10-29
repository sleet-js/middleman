// ========================================
// API_RHEA_LIST_TOKEN_PRICE
// GET /list-token-price — token price map.
// ========================================

import { api_rhea_get } from "../stuff/api_rhea_get";
import type { RHEA_TOKEN_PRICE_MAP } from "../types/rhea_token";

export async function api_rhea_list_token_price(): Promise<RHEA_TOKEN_PRICE_MAP> {
  return api_rhea_get<RHEA_TOKEN_PRICE_MAP>({
    key: "rhea_list_token_price",
    label: "RHEA LIST TOKEN PRICE",
    fallback: "api_rhea_list_token_price failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
