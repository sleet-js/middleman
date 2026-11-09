// ========================================
// API_FASTDATA_KV_ALL
// POST /v0/all/{predecessor_id} — latest values of all keys across all
// contracts for a predecessor. no key filtering, always paginated.
// ========================================

import { api_fastdata_kv_post } from "../stuff/api_fastdata_kv_post";
import { fastdata_kv_build_path } from "../stuff/fastdata_kv_endpoint_paths";
import { FASTDATA_KV_ENDPOINT_PATHS } from "../stuff/fastdata_kv_endpoint_paths";
import type { FASTDATA_KV_NETWORK } from "../stuff/fastdata_kv_network";
import type {
  FASTDATA_KV_POST_BODY,
  FASTDATA_KV_RESPONSE,
} from "../types/fastdata_kv_types";

export interface API_FASTDATA_KV_ALL_PARAMS {
  predecessor_id: string;
  body?: FASTDATA_KV_POST_BODY;
  network?: FASTDATA_KV_NETWORK;
}

export async function api_fastdata_kv_all({
  predecessor_id,
  body = {},
  network,
}: API_FASTDATA_KV_ALL_PARAMS): Promise<FASTDATA_KV_RESPONSE> {
  const path = fastdata_kv_build_path(
    FASTDATA_KV_ENDPOINT_PATHS.fastdata_kv_all,
    { predecessor_id },
  );

  return api_fastdata_kv_post<FASTDATA_KV_RESPONSE>({
    path,
    body,
    network,
    label: "FASTDATA KV ALL",
    fallback: "api_fastdata_kv_all failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
