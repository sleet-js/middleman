// ========================================
// API_FASTDATA_KV_HISTORY_PREDECESSOR
// POST /v0/history/{current_account_id}/{predecessor_id} — full history
// of kv writes by a predecessor to a contract.
// ========================================

import { api_fastdata_kv_post } from "../stuff/api_fastdata_kv_post";
import { fastdata_kv_build_body } from "../stuff/fastdata_kv_build_body";
import { fastdata_kv_build_path } from "../stuff/fastdata_kv_endpoint_paths";
import { FASTDATA_KV_ENDPOINT_PATHS } from "../stuff/fastdata_kv_endpoint_paths";
import type { FASTDATA_KV_NETWORK } from "../stuff/fastdata_kv_network";
import type {
  FASTDATA_KV_POST_BODY,
  FASTDATA_KV_RESPONSE,
} from "../types/fastdata_kv_types";

export interface API_FASTDATA_KV_HISTORY_PREDECESSOR_PARAMS {
  current_account_id: string;
  predecessor_id: string;
  body?: FASTDATA_KV_POST_BODY;
  // an exact key, given at the top level for convenience.
  key?: string;
  // a prefix filter, given at the top level for convenience.
  key_prefix?: string;
  network?: FASTDATA_KV_NETWORK;
}

export async function api_fastdata_kv_history_predecessor({
  current_account_id,
  predecessor_id,
  body,
  key,
  key_prefix,
  network,
}: API_FASTDATA_KV_HISTORY_PREDECESSOR_PARAMS): Promise<FASTDATA_KV_RESPONSE> {
  const path = fastdata_kv_build_path(
    FASTDATA_KV_ENDPOINT_PATHS.fastdata_kv_history_predecessor,
    { current_account_id, predecessor_id },
  );

  return api_fastdata_kv_post<FASTDATA_KV_RESPONSE>({
    path,
    body: fastdata_kv_build_body({ body, key, key_prefix }),
    network,
    label: "FASTDATA KV HISTORY PREDECESSOR",
    fallback: "api_fastdata_kv_history_predecessor failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
