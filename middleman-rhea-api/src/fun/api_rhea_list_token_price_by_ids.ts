// ========================================
// API_RHEA_LIST_TOKEN_PRICE_BY_IDS
// GET /list-token-price-by-ids?ids=... — prices for given token ids.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RheaTokenPriceMap } from "../types/rhea_token";

export interface API_RHEA_LIST_TOKEN_PRICE_BY_IDS_PARAMS {
  ids: string;
}

export async function api_rhea_list_token_price_by_ids(
  params: API_RHEA_LIST_TOKEN_PRICE_BY_IDS_PARAMS,
): Promise<RheaTokenPriceMap> {
  return api_rhea_get<RheaTokenPriceMap>({
    key: "rhea_list_token_price_by_ids",
    params,
    label: "RHEA LIST TOKEN PRICE BY IDS",
    fallback: "api_rhea_list_token_price_by_ids failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
