// ========================================
// API_FASTDATA_KV_HISTORY_KEY
// GET /v0/history/{current_account_id}/{predecessor_id}/{key} — full
// history of one exact key. the key may contain slashes.
// ========================================

import { api_fastdata_kv_get } from "../stuff/api_fastdata_kv_get";
import { fastdata_kv_build_path } from "../stuff/fastdata_kv_endpoint_paths";
import { FASTDATA_KV_ENDPOINT_PATHS } from "../stuff/fastdata_kv_endpoint_paths";
import type { FASTDATA_KV_NETWORK } from "../stuff/fastdata_kv_network";
import type { FASTDATA_KV_RESPONSE } from "../types/fastdata_kv_types";

export interface API_FASTDATA_KV_HISTORY_KEY_PARAMS {
  current_account_id: string;
  predecessor_id: string;
  key: string;
  network?: FASTDATA_KV_NETWORK;
}

export async function api_fastdata_kv_history_key({
  current_account_id,
  predecessor_id,
  key,
  network,
}: API_FASTDATA_KV_HISTORY_KEY_PARAMS): Promise<FASTDATA_KV_RESPONSE> {
  const path = fastdata_kv_build_path(
    FASTDATA_KV_ENDPOINT_PATHS.fastdata_kv_history_key,
    { current_account_id, predecessor_id, key },
  );

  return api_fastdata_kv_get<FASTDATA_KV_RESPONSE>({
    path,
    network,
    label: "FASTDATA KV HISTORY KEY",
    fallback: "api_fastdata_kv_history_key failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
