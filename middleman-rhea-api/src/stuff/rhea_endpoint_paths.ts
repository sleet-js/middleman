// ========================================
// RHEA_ENDPOINT_PATHS
// the path for every endpoint this middleman knows about. one key
// per endpoint so the path is written down exactly once. logic for
// each endpoint lives in src/fun/ (only a subset implemented so far).
// ========================================

export const RHEA_ENDPOINT_PATHS = {
  // pools
  rhea_fetch_all_pools: "/fetchAllPools",
  rhea_list_top_pools: "/list-top-pools",
  rhea_list_pools: "/list-pools",
  rhea_get_pool: "/get-pool",
  rhea_list_pools_by_ids: "/list-pools-by-ids",
  rhea_list_pools_by_tokens: "/list-pools-by-tokens",
  rhea_pool_search: "/pool/search",
  rhea_pool_detail: "/pool/detail",
  rhea_all_pool_data: "/all-pool-data",

  // dcl
  rhea_get_dcl_bin_points: "/get-dcl-bin-points",
  rhea_get_dcl_points: "/get-dcl-points",
  rhea_get_dcl_points_by_account: "/get-dcl-points-by-account",
  rhea_get_dcl_pools_volume: "/get-dcl-pools-volume",
  rhea_get_dcl_pools_tvl_list: "/get-dcl-pools-tvl-list",
  rhea_get_recent_transaction_dcl_swap: "/get-recent-transaction-dcl-swap",
  rhea_get_recent_transaction_dcl_liquidity: "/get-recent-transaction-dcl-liquidity",

  // classic pool transactions
  rhea_get_recent_transaction_swap: "/get-recent-transaction-swap",
  rhea_get_recent_transaction_liquidity: "/get-recent-transaction-liquidity",
  rhea_get_recent_transaction_limit_order: "/get-recent-transaction-limit-order",

  // tokens
  rhea_list_token: "/list-token",
  rhea_list_token_v2: "/list-token-v2",
  rhea_list_token_price: "/list-token-price",
  rhea_list_token_price_by_ids: "/list-token-price-by-ids",
  rhea_get_token_price: "/get-token-price",

  // volumes
  rhea_get_24h_volume_by_id: "/get-24h-volume-by-id",
  rhea_get_24h_volume_list: "/get-24h-volume-list",
  rhea_get_24h_volume_variation: "/24h_volume_variation",
  rhea_historical_tvl: "/historical_tvl",

  // charts / v3
  rhea_v3_chart_24h: "/v3/24h/chart/line",
  rhea_v3_chart_tvl: "/v3/tvl/chart/line",
  rhea_v3_competition_tokens: "/v3/competition/tokens",

  // accounts / assets
  rhea_liquidity_pools: "/liquidity-pools",
  rhea_get_assets_by_account: "/get-assets-by-account",
  rhea_latest_actions: "/latest-actions",
  rhea_add_user_wallet: "/add-user-wallet",

  // history / reports
  rhea_list_history_token_price_by_ids: "/list-history-token-price-by-ids",
  rhea_token_price_report: "/token-price-report",
  rhea_get_proposal_hash_by_id: "/get-proposal-hash-by-id",

  // misc
  rhea_timestamp: "/timestamp",
  rhea_get_service_version: "/get-service-version",
  rhea_get_token_flow: "/get-token-flow",
} as const;

export type RHEA_ENDPOINT_KEY = keyof typeof RHEA_ENDPOINT_PATHS;

// ========================================
// RHEA_APIDATA_BASE_URL
// separate host for pool tvl/volume history.
// ========================================
export const RHEA_APIDATA_BASE_URL = "https://apidata.rhea.finance";

export const RHEA_APIDATA_ENDPOINT_PATHS = {
  rhea_apidata_pool_tvl: "/api/pool/{id}/tvl",
  rhea_apidata_pool_volume: "/api/pool/{id}/volume",
} as const;

export type RHEA_APIDATA_ENDPOINT_KEY = keyof typeof RHEA_APIDATA_ENDPOINT_PATHS;
// ========================================
// copyright 2026 by sleet.near
