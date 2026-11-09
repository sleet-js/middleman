// ========================================
// FASTDATA_KV_NETWORK
// which chain the kv api talks to. the api runs the same endpoints on
// both, so the network only picks the host.
// ========================================

import {
  FASTDATA_KV_BASE_URLS,
  FASTDATA_KV_MAINNET_BASE_URL,
} from "./fastdata_kv_base_url";

export type FASTDATA_KV_NETWORK = "mainnet" | "testnet";

export const FASTDATA_KV_NETWORKS: readonly FASTDATA_KV_NETWORK[] = [
  "mainnet",
  "testnet",
];

export const FASTDATA_KV_DEFAULT_NETWORK: FASTDATA_KV_NETWORK = "mainnet";

export function fastdata_kv_is_network(
  value: string,
): value is FASTDATA_KV_NETWORK {
  return value === "mainnet" || value === "testnet";
}

export function fastdata_kv_resolve_base_url(
  network: FASTDATA_KV_NETWORK = FASTDATA_KV_DEFAULT_NETWORK,
): string {
  return FASTDATA_KV_BASE_URLS[network] ?? FASTDATA_KV_MAINNET_BASE_URL;
}
// ========================================
// copyright 2026 by sleet.near
