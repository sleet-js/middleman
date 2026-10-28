// ========================================
// API_RHEA_TIMESTAMP
// GET /timestamp — indexer timestamp.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RheaTimestampResponse } from "../types/rhea_pool";

export async function api_rhea_timestamp(): Promise<RheaTimestampResponse> {
  return api_rhea_get<RheaTimestampResponse>({
    key: "rhea_timestamp",
    label: "RHEA TIMESTAMP",
    fallback: "api_rhea_timestamp failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
