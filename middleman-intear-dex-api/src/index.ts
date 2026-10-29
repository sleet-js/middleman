// ========================================
// INTEAR DEX
// typed client for the intear dex backend
// (https://dex-backend.intear.tech). one-shot HTTP only.
//
// SCOPE: this host only. the token indexer (api.intea.rs) lives in
// @sleet-js/middleman-intear-api, and the swap router
// (router.intear.tech) is not covered here.
//
// the api is GET only, needs no auth, and sends
// `access-control-allow-origin: *` so browsers can call it directly.
// one endpoint per file in fun/, shared plumbing in stuff/. every call
// logs a framed block, same as the other middlemen.
// ========================================

export * from "./fun/api_intear_dex_get";
export * from "./fun/api_intear_dex_pools_all";
export * from "./fun/api_intear_dex_stats_tvl_total";
export * from "./fun/api_intear_dex_stats_volume_total";
export * from "./fun/api_intear_dex_stats_top_assets";
export * from "./fun/api_intear_dex_stats_top_pools";
export * from "./fun/api_intear_dex_balances";
export * from "./fun/api_intear_dex_tear_staking";

export { INTEAR_DEX_BASE_URL } from "./stuff/intear_dex_base_url";
export {
  INTEAR_DEX_ENDPOINT_PATHS,
  INTEAR_DEX_PERIODS,
} from "./stuff/intear_dex_endpoint_paths";
export type {
  INTEAR_DEX_ENDPOINT_KEY,
  INTEAR_DEX_PERIOD,
} from "./stuff/intear_dex_endpoint_paths";
export type { INTEAR_DEX_API_ERROR } from "./stuff/intear_dex_parse_error";

export * from "./types/intear_dex";
// ========================================
// copyright 2026 by sleet.near
