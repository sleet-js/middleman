// ========================================
// API_RHEA_LIST_POOLS_BY_TOKENS
// GET /list-pools-by-tokens?token0=...&token1=... — pools for a pair.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RHEA_POOL_LIST_RESPONSE } from "../types/rhea_pool";

export interface API_RHEA_LIST_POOLS_BY_TOKENS_PARAMS {
  token0: string;
  token1: string;
}

export async function api_rhea_list_pools_by_tokens(
  params: API_RHEA_LIST_POOLS_BY_TOKENS_PARAMS,
): Promise<RHEA_POOL_LIST_RESPONSE> {
  return api_rhea_get<RHEA_POOL_LIST_RESPONSE>({
    key: "rhea_list_pools_by_tokens",
    params,
    label: "RHEA LIST POOLS BY TOKENS",
    fallback: "api_rhea_list_pools_by_tokens failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
