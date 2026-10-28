// ========================================
// RHEA TOKEN TYPES
// types for token metadata and price responses.
// ========================================

export interface RheaToken {
  spec: string;
  name: string;
  symbol: string;
  icon?: string;
  reference: string;
  reference_hash: string;
  decimals: number;
  [key: string]: unknown;
}

export type RheaTokenMap = Record<string, RheaToken>;

export interface RheaTokenPrice {
  price: string;
  symbol: string;
  decimal: number;
  [key: string]: unknown;
}

export type RheaTokenPriceMap = Record<string, RheaTokenPrice>;
// ========================================
// copyright 2026 by sleet.near
