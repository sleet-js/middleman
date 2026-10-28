// ========================================
// RHEA POOL TYPES
// types for the pool objects returned by the rhea indexer.
// ========================================

export interface RHEA_POOL {
  pool_kind: string;
  token_account_ids: string[];
  amounts: string[];
  total_fee: number;
  shares_total_supply: string;
  amp: number;
  farming: boolean;
  token_symbols: string[];
  update_time: number;
  id: string | number;
  tvl: string;
  token0_ref_price: string;
  [key: string]: unknown;
}

export interface RHEA_FETCH_ALL_POOLS_RESPONSE {
  block_number: number;
  block_time: number;
  simplePools: RHEA_POOL[];
  unRatedPools: RHEA_POOL[];
  ratedPools: RHEA_POOL[];
}

export type RHEA_POOL_LIST_RESPONSE = RHEA_POOL[];

export interface RHEA_POOL_SEARCH_RESPONSE {
  code?: number;
  message?: string;
  data?: {
    list: RHEA_POOL[];
    total: number;
  };
}

export interface RHEA_TIMESTAMP_RESPONSE {
  ts: number;
}
// ========================================
// copyright 2026 by sleet.near
