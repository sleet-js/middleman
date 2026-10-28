// ========================================
// API_RHEA_LIST_TOKEN_V2
// GET /list-token-v2 — lighter token metadata map (no icon).
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RheaTokenMap } from "../types/rhea_token";

export async function api_rhea_list_token_v2(): Promise<RheaTokenMap> {
  return api_rhea_get<RheaTokenMap>({
    key: "rhea_list_token_v2",
    label: "RHEA LIST TOKEN V2",
    fallback: "api_rhea_list_token_v2 failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
