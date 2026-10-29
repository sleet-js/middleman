// ========================================
// API_RHEA_POOL_SEARCH
// GET /pool/search — search pools. params pass through.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type {
  RHEA_POOL_SEARCH_RESPONSE,
  RHEA_POOL_SEARCH_TYPE,
  RHEA_POOL_SORT,
} from "../types/rhea_pool";

export interface API_RHEA_POOL_SEARCH_PARAMS {
  type?: RHEA_POOL_SEARCH_TYPE;
  sort?: RHEA_POOL_SORT | string;
  limit?: number | string;
  offset?: number | string;
  farm?: string | boolean;
  hide_low_pool?: string | boolean;
  order_by?: string;
  token_type?: string;
  token_list?: string;
  pool_id_list?: string;
  onlyUseId?: boolean;
}

export async function api_rhea_pool_search(
  params: API_RHEA_POOL_SEARCH_PARAMS = {},
): Promise<RHEA_POOL_SEARCH_RESPONSE> {
  return api_rhea_get<RHEA_POOL_SEARCH_RESPONSE>({
    key: "rhea_pool_search",
    params,
    label: "RHEA POOL SEARCH",
    fallback: "api_rhea_pool_search failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
