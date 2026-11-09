// ========================================
// API_FASTDATA_KV_MULTI
// POST /v0/multi — batch latest-value lookup for up to 100 keys. each
// key is `current_account_id/predecessor_id/key` and may hold slashes.
// ========================================

import { api_fastdata_kv_post } from "../stuff/api_fastdata_kv_post";
import { FASTDATA_KV_ENDPOINT_PATHS } from "../stuff/fastdata_kv_endpoint_paths";
import type { FASTDATA_KV_NETWORK } from "../stuff/fastdata_kv_network";
import type {
  FASTDATA_KV_MULTI_BODY,
  FASTDATA_KV_MULTI_RESPONSE,
} from "../types/fastdata_kv_types";

export interface API_FASTDATA_KV_MULTI_PARAMS {
  body: FASTDATA_KV_MULTI_BODY;
  network?: FASTDATA_KV_NETWORK;
}

export async function api_fastdata_kv_multi({
  body,
  network,
}: API_FASTDATA_KV_MULTI_PARAMS): Promise<FASTDATA_KV_MULTI_RESPONSE> {
  return api_fastdata_kv_post<FASTDATA_KV_MULTI_RESPONSE>({
    path: FASTDATA_KV_ENDPOINT_PATHS.fastdata_kv_multi,
    body,
    network,
    label: "FASTDATA KV MULTI",
    fallback: "api_fastdata_kv_multi failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
