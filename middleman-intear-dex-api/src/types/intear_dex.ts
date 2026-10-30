// ========================================
// INTEAR DEX TYPES
// types for the json the dex backend returns. the shapes were read off
// the live api — there is no openapi spec to copy from.
//
// NOTE ON NUMBERS: balances, shares, tvl and locked amounts come back
// as decimal STRINGS with up to ~50 digits (near uses yoctoNEAR). never
// parse them with parseFloat — use BigInt or a decimal library.
// ========================================

// ---- pool core ----------------------------------------------------

// one asset sitting in a pool.
export interface INTEAR_DEX_POOL_ASSET {
  asset_id: string;
  balance: string;
}

// where a pool fee goes. either a named account or a community.
export type INTEAR_DEX_FEE_RECEIVER =
  "Pool" | { Account: string } | { Community: string };

// how the fee share is configured. fixed, or scheduled over a curve.
export type INTEAR_DEX_FEE_CONFIGURATION =
  | { Fixed: number }
  | {
      Scheduled: {
        start: [number, number];
        end: [number, number];
        curve: "Linear" | string;
      };
    };

// [receiver, share] pairs. shares are basis points (10000 = 100%).
export interface INTEAR_DEX_FEE_RECEIVERS {
  receivers: [INTEAR_DEX_FEE_RECEIVER, number][];
}

export interface INTEAR_DEX_FEE_CONFIGURATIONS {
  fee_configuration: {
    receivers: [INTEAR_DEX_FEE_RECEIVER, INTEAR_DEX_FEE_CONFIGURATION][];
  };
}

// the four pool flavours the api can return.
export interface INTEAR_DEX_PUBLIC_POOL {
  assets: INTEAR_DEX_POOL_ASSET[];
  fees: INTEAR_DEX_FEE_RECEIVERS;
  fee_configuration: INTEAR_DEX_FEE_CONFIGURATIONS["fee_configuration"];
  total_shares: string;
}

export interface INTEAR_DEX_PRIVATE_POOL {
  assets: INTEAR_DEX_POOL_ASSET[];
  fees: INTEAR_DEX_FEE_RECEIVERS;
  fee_configuration: INTEAR_DEX_FEE_CONFIGURATIONS["fee_configuration"];
  owner_id: string;
  locked: boolean;
}

export interface INTEAR_DEX_LAUNCH_POOL {
  near_amount: string;
  launched_asset: INTEAR_DEX_POOL_ASSET;
  fees: INTEAR_DEX_FEE_RECEIVERS;
  fee_configuration: INTEAR_DEX_FEE_CONFIGURATIONS["fee_configuration"];
  phantom_liquidity_near: string;
}

export interface INTEAR_DEX_LAUNCH_V2_POOL {
  quote_asset: INTEAR_DEX_POOL_ASSET;
  launched_asset: INTEAR_DEX_POOL_ASSET;
  fees: INTEAR_DEX_FEE_RECEIVERS;
  fee_configuration: INTEAR_DEX_FEE_CONFIGURATIONS["fee_configuration"];
  phantom_liquidity: string;
}

// the pool body is a serde enum — exactly one variant is present.
export type INTEAR_DEX_POOL_BODY =
  | { Public: INTEAR_DEX_PUBLIC_POOL }
  | { Private: INTEAR_DEX_PRIVATE_POOL }
  | { Launch: INTEAR_DEX_LAUNCH_POOL }
  | { LaunchV2: INTEAR_DEX_LAUNCH_V2_POOL };

export type INTEAR_DEX_POOL_KIND = "Public" | "Private" | "Launch" | "LaunchV2";

// one row of GET /pools/all.
export interface INTEAR_DEX_POOL {
  id: number;
  pool: INTEAR_DEX_POOL_BODY;
  liquidity_usd: string;
  volume_24h_usd: number;
  volume_7d_usd: number;
  apy: number;
}

export type INTEAR_DEX_POOLS_RESPONSE = INTEAR_DEX_POOL[];

// ---- stats --------------------------------------------------------

// one point of a tvl series.
export interface INTEAR_DEX_TVL_POINT {
  timestamp: string;
  tvl_usd: number;
}

export type INTEAR_DEX_TVL_RESPONSE = INTEAR_DEX_TVL_POINT[];

// one point of a volume series.
export interface INTEAR_DEX_VOLUME_POINT {
  timestamp: string;
  volume_usd: number;
}

export type INTEAR_DEX_VOLUME_RESPONSE = INTEAR_DEX_VOLUME_POINT[];

// one row of GET /stats/top/assets/{period}.
export interface INTEAR_DEX_TOP_ASSET {
  asset_id: string;
  volume_usd: number;
}

export type INTEAR_DEX_TOP_ASSETS_RESPONSE = INTEAR_DEX_TOP_ASSET[];

// one row of GET /stats/top/pools/{period}.
export interface INTEAR_DEX_TOP_POOL {
  pool_id: number;
  volume_usd: number;
}

export type INTEAR_DEX_TOP_POOLS_RESPONSE = INTEAR_DEX_TOP_POOL[];

// ---- account scoped ------------------------------------------------

// GET /balances?accountId=...
export interface INTEAR_DEX_BALANCES_RESPONSE {
  balances: Record<string, string>;
  pending_fees: Record<string, string>;
}

// GET /tear/staking?accountId=...
export interface INTEAR_DEX_TEAR_STAKING_RESPONSE {
  total_locked: string;
  unlock_period_ns: string;
  account: unknown | null;
}
// ========================================
// copyright 2026 by sleet.near
