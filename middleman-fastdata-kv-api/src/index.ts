// ========================================
// FASTDATA KV
// typed client for the fastdata kv api (https://kv.main.fastnear.com).
// one-shot HTTP only. response types are defined locally in
// src/types/ since there is no fastdata tool-box package.
//
// the api is read-only: kv writes happen in a near transaction that
// calls `__fastdata_kv` on the target contract.
// ========================================

export * from "./stuff/api_fastdata_kv_get";
export * from "./stuff/api_fastdata_kv_post";
export * from "./fun/api_fastdata_kv_latest_key";
export * from "./fun/api_fastdata_kv_history_key";
export * from "./fun/api_fastdata_kv_all";
export * from "./fun/api_fastdata_kv_history_predecessor";
export * from "./fun/api_fastdata_kv_latest_predecessor";
export * from "./fun/api_fastdata_kv_history_contract";
export * from "./fun/api_fastdata_kv_latest_contract";
export * from "./fun/api_fastdata_kv_history_global";
export * from "./fun/api_fastdata_kv_multi";

export {
  FASTDATA_KV_MAINNET_BASE_URL,
  FASTDATA_KV_TESTNET_BASE_URL,
  FASTDATA_KV_BASE_URLS,
} from "./stuff/fastdata_kv_base_url";
export {
  FASTDATA_KV_ENDPOINT_PATHS,
  fastdata_kv_build_path,
} from "./stuff/fastdata_kv_endpoint_paths";
export type { FASTDATA_KV_ENDPOINT_KEY } from "./stuff/fastdata_kv_endpoint_paths";
export { fastdata_kv_build_body } from "./stuff/fastdata_kv_build_body";
export type { FASTDATA_KV_BUILD_BODY_PARAMS } from "./stuff/fastdata_kv_build_body";
export {
  FASTDATA_KV_NETWORKS,
  FASTDATA_KV_DEFAULT_NETWORK,
  fastdata_kv_is_network,
  fastdata_kv_resolve_base_url,
} from "./stuff/fastdata_kv_network";
export type { FASTDATA_KV_NETWORK } from "./stuff/fastdata_kv_network";
export { fastdata_kv_parse_error } from "./stuff/fastdata_kv_parse_error";
export type { FASTDATA_KV_API_ERROR } from "./stuff/fastdata_kv_parse_error";

export * from "./types/fastdata_kv_types";
// ========================================
// copyright 2026 by sleet.near
