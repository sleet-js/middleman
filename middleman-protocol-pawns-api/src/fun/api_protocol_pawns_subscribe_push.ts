// ========================================
// API_PROTOCOL_PAWNS_SUBSCRIBE_PUSH
// POST /account/{account_id}/push-subscription — register a browser
// push endpoint for an account.
//
// the browser asks push api for a subscription, then posts it here with
// the endpoint and the two keys. the api uses it to send a web push
// when something happens to the account.
//
// NOTE: this one writes to the api's own database, it is not a read.
// it does not touch the chain.
//
// the vapid public key comes from api_protocol_pawns_vapid_public_key.
// ========================================

import { api_protocol_pawns_post } from "../stuff/api_protocol_pawns_post";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";

export interface API_PROTOCOL_PAWNS_SUBSCRIBE_PUSH_PARAMS {
  account_id: string;
  // the push service endpoint of the browser.
  endpoint: string;
  // the p256dh key of the subscription.
  p256dh: string;
  // the auth secret of the subscription.
  auth: string;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export interface PROTOCOL_PAWNS_SUBSCRIBE_PUSH_RESULT {
  ok: boolean;
}

export async function api_protocol_pawns_subscribe_push({
  account_id,
  endpoint,
  p256dh,
  auth,
  network,
}: API_PROTOCOL_PAWNS_SUBSCRIBE_PUSH_PARAMS): Promise<PROTOCOL_PAWNS_SUBSCRIBE_PUSH_RESULT> {
  const path = protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_subscribe_push,
    { account_id },
  );

  return api_protocol_pawns_post<PROTOCOL_PAWNS_SUBSCRIBE_PUSH_RESULT>({
    path,
    body: { endpoint, keys: { p256dh, auth } },
    network,
    label: "PROTOCOL PAWNS SUBSCRIBE PUSH",
    fallback: "api_protocol_pawns_subscribe_push failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
