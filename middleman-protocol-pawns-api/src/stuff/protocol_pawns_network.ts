// ========================================
// PROTOCOL_PAWNS_NETWORK
// which chain the api indexes. the api exposes one deployment today,
// on near mainnet, so the network only picks the host.
// ========================================

import {
  PROTOCOL_PAWNS_BASE_URL,
  PROTOCOL_PAWNS_BASE_URLS,
} from "./protocol_pawns_base_url";

export type PROTOCOL_PAWNS_NETWORK = "mainnet";

export const PROTOCOL_PAWNS_NETWORKS: readonly PROTOCOL_PAWNS_NETWORK[] = [
  "mainnet",
];

export const PROTOCOL_PAWNS_DEFAULT_NETWORK: PROTOCOL_PAWNS_NETWORK =
  "mainnet";

export function protocol_pawns_is_network(
  value: string,
): value is PROTOCOL_PAWNS_NETWORK {
  return value === "mainnet";
}

export function protocol_pawns_resolve_base_url(
  network: PROTOCOL_PAWNS_NETWORK = PROTOCOL_PAWNS_DEFAULT_NETWORK,
): string {
  return PROTOCOL_PAWNS_BASE_URLS[network] ?? PROTOCOL_PAWNS_BASE_URL;
}
// ========================================
// copyright 2026 by sleet.near
