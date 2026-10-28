// ========================================
// RHEA TOKEN TYPES
// types for token metadata and price responses.
// ========================================

export interface RHEA_TOKEN {
  spec: string;
  name: string;
  symbol: string;
  icon?: string;
  reference: string;
  reference_hash: string;
  decimals: number;
  [key: string]: unknown;
}

export type RHEA_TOKEN_MAP = Record<string, RHEA_TOKEN>;

export interface RHEA_TOKEN_PRICE {
  price: string;
  symbol: string;
  decimal: number;
  [key: string]: unknown;
}

export type RHEA_TOKEN_PRICE_MAP = Record<string, RHEA_TOKEN_PRICE>;
// ========================================
// copyright 2026 by sleet.near
