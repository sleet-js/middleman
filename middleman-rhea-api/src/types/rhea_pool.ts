// ========================================
// RHEA POOL TYPES
// types for the pool objects returned by the rhea indexer.
// ========================================

export interface RheaPool {
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

export interface RheaFetchAllPoolsResponse {
  block_number: number;
  block_time: number;
  simplePools: RheaPool[];
  unRatedPools: RheaPool[];
  ratedPools: RheaPool[];
}

export type RheaPoolListResponse = RheaPool[];

export interface RheaPoolSearchResponse {
  code?: number;
  message?: string;
  data?: {
    list: RheaPool[];
    total: number;
  };
}

export interface RheaTimestampResponse {
  ts: number;
}
// ========================================
// copyright 2026 by sleet.near
