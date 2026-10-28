// ========================================
// API_RHEA_LIST_POOLS_BY_IDS
// GET /list-pools-by-ids?ids=... — pools by id (pipe-separated).
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RheaPoolListResponse } from "../types/rhea_pool";

export interface API_RHEA_LIST_POOLS_BY_IDS_PARAMS {
  ids: string;
}

export async function api_rhea_list_pools_by_ids(
  params: API_RHEA_LIST_POOLS_BY_IDS_PARAMS,
): Promise<RheaPoolListResponse> {
  return api_rhea_get<RheaPoolListResponse>({
    key: "rhea_list_pools_by_ids",
    params,
    label: "RHEA LIST POOLS BY IDS",
    fallback: "api_rhea_list_pools_by_ids failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
