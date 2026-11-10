// ========================================
// API_PROTOCOL_PAWNS_UNSUBSCRIBE_PUSH
// DELETE /account/{account_id}/push-subscription — remove a browser
// push endpoint from an account.
//
// the endpoint is the only thing needed, it is the key of the
// subscription.
//
// NOTE: this one writes to the api's own database, it is not a read.
// it does not touch the chain.
// ========================================

import { api_protocol_pawns_delete } from "../stuff/api_protocol_pawns_delete";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";

export interface API_PROTOCOL_PAWNS_UNSUBSCRIBE_PUSH_PARAMS {
  account_id: string;
  // the push service endpoint of the browser.
  endpoint: string;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export interface PROTOCOL_PAWNS_UNSUBSCRIBE_PUSH_RESULT {
  ok: boolean;
}

export async function api_protocol_pawns_unsubscribe_push({
  account_id,
  endpoint,
  network,
}: API_PROTOCOL_PAWNS_UNSUBSCRIBE_PUSH_PARAMS): Promise<PROTOCOL_PAWNS_UNSUBSCRIBE_PUSH_RESULT> {
  const path = protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_unsubscribe_push,
    { account_id },
  );

  return api_protocol_pawns_delete<PROTOCOL_PAWNS_UNSUBSCRIBE_PUSH_RESULT>({
    path,
    body: { endpoint },
    network,
    label: "PROTOCOL PAWNS UNSUBSCRIBE PUSH",
    fallback: "api_protocol_pawns_unsubscribe_push failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
