// ========================================
// INTEAR_DEX_ENDPOINT_PATHS
// the path for every endpoint this middleman knows about. one key per
// endpoint so the path is written down exactly once.
//
// there is no published openapi/swagger for this api, so this list was
// built by probing the live host. confirmed 200s are marked, everything
// else is a best guess from the observed url patterns.
//
// paths ending in {period} take one of day | week | month | year | total.
// the api answers anything else with:
//   "Invalid period. Expected day|week|month|year|total"
// ========================================

export const INTEAR_DEX_ENDPOINT_PATHS = {
  // ---- pools -------------------------------------------------------
  // GET /pools/all — every pool with its liquidity/volume/apy.
  // accountId is accepted but does not actually filter the result set.
  dex_pools_all: "/pools/all",

  // ---- stats: total series -----------------------------------------
  // GET /stats/{metric}/total/{period} — time series of one metric.
  // confirmed metrics: tvl, volume. others (fees, revenue, transactions)
  // return 404.
  dex_stats_tvl_total: "/stats/tvl/total/{period}",
  dex_stats_volume_total: "/stats/volume/total/{period}",

  // ---- stats: top lists --------------------------------------------
  // GET /stats/top/{dimension}/{period}
  // confirmed dimensions: assets, pools.
  dex_stats_top_assets: "/stats/top/assets/{period}",
  dex_stats_top_pools: "/stats/top/pools/{period}",

  // ---- account scoped ----------------------------------------------
  // GET /balances?accountId=... — required param, 400 without it.
  dex_balances: "/balances",
  // GET /tear/staking?accountId=... — accountId is optional here.
  dex_tear_staking: "/tear/staking",
} as const;

export type INTEAR_DEX_ENDPOINT_KEY = keyof typeof INTEAR_DEX_ENDPOINT_PATHS;

// the period values the api accepts on the stats routes.
export const INTEAR_DEX_PERIODS = [
  "day",
  "week",
  "month",
  "year",
  "total",
] as const;

export type INTEAR_DEX_PERIOD = (typeof INTEAR_DEX_PERIODS)[number];
// ========================================
// copyright 2026 by sleet.near
