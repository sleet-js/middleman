// ========================================
// RHEA
// typed client for the rhea indexer api (https://api.rhea.finance).
// one-shot HTTP only. response types are defined locally in
// src/types/ since there is no rhea tool-box package.
// ========================================

export * from "./fun/api_rhea_get";
export * from "./fun/api_rhea_fetch_all_pools";
export * from "./fun/api_rhea_list_token";
export * from "./fun/api_rhea_list_token_v2";
export * from "./fun/api_rhea_list_token_price";
export * from "./fun/api_rhea_list_token_price_by_ids";
export * from "./fun/api_rhea_list_top_pools";
export * from "./fun/api_rhea_list_pools";
export * from "./fun/api_rhea_get_pool";
export * from "./fun/api_rhea_list_pools_by_ids";
export * from "./fun/api_rhea_list_pools_by_tokens";
export * from "./fun/api_rhea_pool_search";
export * from "./fun/api_rhea_timestamp";
export * from "./fun/api_rhea_get_service_version";

export { RHEA_BASE_URL } from "./stuff/rhea_base_url";
export { RHEA_ENDPOINT_PATHS } from "./stuff/rhea_endpoint_paths";
export type { RHEA_ENDPOINT_KEY } from "./stuff/rhea_endpoint_paths";
export type { RHEA_API_ERROR } from "./stuff/rhea_parse_error";

export * from "./types/rhea_pool";
export * from "./types/rhea_token";
// ========================================
// copyright 2026 by sleet.near
