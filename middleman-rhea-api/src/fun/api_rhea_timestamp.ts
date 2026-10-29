// ========================================
// API_RHEA_TIMESTAMP
// GET /timestamp — indexer timestamp.
// ========================================

import { api_rhea_get } from "../stuff/api_rhea_get";
import type { RHEA_TIMESTAMP_RESPONSE } from "../types/rhea_pool";

export async function api_rhea_timestamp(): Promise<RHEA_TIMESTAMP_RESPONSE> {
  return api_rhea_get<RHEA_TIMESTAMP_RESPONSE>({
    key: "rhea_timestamp",
    label: "RHEA TIMESTAMP",
    fallback: "api_rhea_timestamp failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
