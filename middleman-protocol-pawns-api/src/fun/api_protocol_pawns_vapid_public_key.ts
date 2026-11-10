// ========================================
// API_PROTOCOL_PAWNS_VAPID_PUBLIC_KEY
// GET /vapid-public-key — the vapid public key the api signs its web
// push messages with.
//
// a browser needs this to subscribe to push notifications, then it
// posts the subscription with api_protocol_pawns_subscribe_push.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";

export interface API_PROTOCOL_PAWNS_VAPID_PUBLIC_KEY_PARAMS {
  network?: PROTOCOL_PAWNS_NETWORK;
}

export interface PROTOCOL_PAWNS_VAPID_PUBLIC_KEY {
  publicKey: string;
}

export async function api_protocol_pawns_vapid_public_key({
  network,
}: API_PROTOCOL_PAWNS_VAPID_PUBLIC_KEY_PARAMS): Promise<PROTOCOL_PAWNS_VAPID_PUBLIC_KEY> {
  return api_protocol_pawns_get<PROTOCOL_PAWNS_VAPID_PUBLIC_KEY>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_vapid_public_key,
    network,
    label: "PROTOCOL PAWNS VAPID PUBLIC KEY",
    fallback: "api_protocol_pawns_vapid_public_key failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
