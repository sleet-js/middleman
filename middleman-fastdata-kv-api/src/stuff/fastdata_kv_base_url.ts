// ========================================
// FASTDATA_KV_BASE_URL
// the two hosts the fastdata kv api runs on. mainnet is the default,
// testnet is the same api on the testnet chain.
// ========================================

export const FASTDATA_KV_MAINNET_BASE_URL = "https://kv.main.fastnear.com";

export const FASTDATA_KV_TESTNET_BASE_URL = "https://kv.test.fastnear.com";

export const FASTDATA_KV_BASE_URLS = {
  mainnet: FASTDATA_KV_MAINNET_BASE_URL,
  testnet: FASTDATA_KV_TESTNET_BASE_URL,
} as const;
// ========================================
// copyright 2026 by sleet.near
