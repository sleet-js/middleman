// ========================================
// API_RHEA_LIST_POOLS
// GET /list-pools — paginated/filtered pool list. params pass through.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RheaPoolListResponse } from "../types/rhea_pool";

export interface API_RHEA_LIST_POOLS_PARAMS {
  type?: string;
  sort?: string;
  limit?: number | string;
  offset?: number | string;
  farm?: string | boolean;
  hide_low_pool?: string | boolean;
  order_by?: string;
  token_type?: string;
  token_list?: string;
  pool_id_list?: string;
  amounts?: string;
}

export async function api_rhea_list_pools(
  params: API_RHEA_LIST_POOLS_PARAMS = {},
): Promise<RheaPoolListResponse> {
  return api_rhea_get<RheaPoolListResponse>({
    key: "rhea_list_pools",
    params,
    label: "RHEA LIST POOLS",
    fallback: "api_rhea_list_pools failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
