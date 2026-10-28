// ========================================
// API_RHEA_LIST_TOKEN
// GET /list-token — full token metadata map.
// ========================================

import { api_rhea_get } from "./api_rhea_get";
import type { RHEA_TOKEN_MAP } from "../types/rhea_token";

export async function api_rhea_list_token(): Promise<RHEA_TOKEN_MAP> {
  return api_rhea_get<RHEA_TOKEN_MAP>({
    key: "rhea_list_token",
    label: "RHEA LIST TOKEN",
    fallback: "api_rhea_list_token failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
