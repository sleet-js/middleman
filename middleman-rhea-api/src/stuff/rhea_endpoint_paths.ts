// ========================================
// RHEA_ENDPOINT_PATHS
// the path for every endpoint this middleman calls. one key per
// endpoint so the path is written down exactly once.
// ========================================

export const RHEA_ENDPOINT_PATHS = {
  rhea_fetch_all_pools: "/fetchAllPools",
  rhea_list_token: "/list-token",
  rhea_list_token_v2: "/list-token-v2",
  rhea_list_token_price: "/list-token-price",
  rhea_list_token_price_by_ids: "/list-token-price-by-ids",
  rhea_list_top_pools: "/list-top-pools",
  rhea_list_pools: "/list-pools",
  rhea_get_pool: "/get-pool",
  rhea_list_pools_by_ids: "/list-pools-by-ids",
  rhea_list_pools_by_tokens: "/list-pools-by-tokens",
  rhea_pool_search: "/pool/search",
  rhea_timestamp: "/timestamp",
  rhea_get_service_version: "/get-service-version",
} as const;

export type RHEA_ENDPOINT_KEY = keyof typeof RHEA_ENDPOINT_PATHS;
// ========================================
// copyright 2026 by sleet.near
