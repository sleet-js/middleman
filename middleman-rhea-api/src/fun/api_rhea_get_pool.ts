// ========================================
// API_RHEA_GET_POOL
// GET /get-pool?pool_id=... — single pool.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RheaPool } from "../types/rhea_pool";

export interface API_RHEA_GET_POOL_PARAMS {
  pool_id: string | number;
}

export async function api_rhea_get_pool(
  params: API_RHEA_GET_POOL_PARAMS,
): Promise<RheaPool> {
  return api_rhea_get<RheaPool>({
    key: "rhea_get_pool",
    params,
    label: "RHEA GET POOL",
    fallback: "api_rhea_get_pool failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
