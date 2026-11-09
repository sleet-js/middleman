// ========================================
// API_FASTDATA_KV_HISTORY_GLOBAL
// POST /v0/history — global lookup: all writes to a key across all
// accounts. the body must carry a key.
// ========================================

import { api_fastdata_kv_post } from "../stuff/api_fastdata_kv_post";
import { fastdata_kv_build_body } from "../stuff/fastdata_kv_build_body";
import { FASTDATA_KV_ENDPOINT_PATHS } from "../stuff/fastdata_kv_endpoint_paths";
import type { FASTDATA_KV_NETWORK } from "../stuff/fastdata_kv_network";
import type {
  FASTDATA_KV_POST_BODY,
  FASTDATA_KV_RESPONSE,
} from "../types/fastdata_kv_types";

export interface API_FASTDATA_KV_HISTORY_GLOBAL_PARAMS {
  body?: FASTDATA_KV_POST_BODY;
  // the key to look up. the api requires it on this endpoint.
  key?: string;
  network?: FASTDATA_KV_NETWORK;
}

export async function api_fastdata_kv_history_global({
  body,
  key,
  network,
}: API_FASTDATA_KV_HISTORY_GLOBAL_PARAMS): Promise<FASTDATA_KV_RESPONSE> {
  const merged = fastdata_kv_build_body({ body, key });

  if (merged.key === undefined) {
    throw new Error(
      "api_fastdata_kv_history_global: a key is required on this endpoint",
    );
  }

  return api_fastdata_kv_post<FASTDATA_KV_RESPONSE>({
    path: FASTDATA_KV_ENDPOINT_PATHS.fastdata_kv_history_global,
    body: merged,
    network,
    label: "FASTDATA KV HISTORY GLOBAL",
    fallback: "api_fastdata_kv_history_global failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
