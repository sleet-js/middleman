// ========================================
// RHEA POOL TYPES
// types for the pool objects returned by the rhea indexer.
// ========================================

// list-pools / get-pool / list-top-pools / list-pools-by-ids style pool
export interface RHEA_POOL {
  pool_kind: string;
  token_account_ids: string[];
  amounts: string[];
  total_fee: number | string;
  shares_total_supply: string;
  amp: number;
  farming?: boolean;
  token_symbols: string[];
  update_time?: number;
  id: string | number;
  tvl: string;
  token0_ref_price?: string;
  [key: string]: unknown;
}

// pool/search style pool (same core fields plus search-only fields)
export interface RHEA_POOL_SEARCH_ITEM {
  id: string;
  pool_kind: string;
  token_account_ids: string[];
  amounts: string[];
  token_symbols: string[];
  tvl: string;
  total_fee: string;
  amp: number;
  shares_total_supply: string;
  volume_24h: string;
  fee_volume_24h: string;
  apy: string;
  farm_apy: string;
  is_farm: boolean;
  is_new: boolean;
  is_meme: boolean;
  is_boosted: boolean;
  farm_is_multi_currency: boolean;
  top: boolean;
  rates: unknown;
  c_amounts: unknown;
  degens: unknown;
  uncertified_tokens: unknown;
  Type: string;
  [key: string]: unknown;
}

export interface RHEA_FETCH_ALL_POOL {
  id: string | number;
  tokenIds: string[];
  supplies: Record<string, string>;
  fee: number;
  shareSupply: string;
  pool_kind: string;
  [key: string]: unknown;
}

export interface RHEA_FETCH_ALL_POOLS_RESPONSE {
  block_number: number;
  block_time: number;
  simplePools: RHEA_FETCH_ALL_POOL[];
  unRatedPools: RHEA_FETCH_ALL_POOL[];
  ratedPools: RHEA_FETCH_ALL_POOL[];
}

export type RHEA_POOL_LIST_RESPONSE = RHEA_POOL[];

export type RHEA_POOL_SEARCH_TYPE =
  "classic" | "dcl" | "all" | "stable" | "degen" | "hotPools";

export type RHEA_POOL_SORT = "tvl" | "24h" | "apy" | "volume_24h";

export interface RHEA_POOL_SEARCH_RESPONSE {
  code?: number;
  message?: string;
  data?: {
    list: RHEA_POOL_SEARCH_ITEM[];
    total: number;
  };
}

export interface RHEA_TIMESTAMP_RESPONSE {
  ts: number;
}
// ========================================
// copyright 2026 by sleet.near
