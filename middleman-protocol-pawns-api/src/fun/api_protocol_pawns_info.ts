// ========================================
// API_PROTOCOL_PAWNS_INFO
// GET /info — the last block the indexer processed.
//
// NOTE: this endpoint is known to fail on the live api with a postgres
// type error ("COALESCE types text and integer cannot be matched").
// the wrapper is correct, the server side needs a fix.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_INFO } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_INFO_PARAMS {
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_info({
  network,
}: API_PROTOCOL_PAWNS_INFO_PARAMS): Promise<PROTOCOL_PAWNS_INFO> {
  return api_protocol_pawns_get<PROTOCOL_PAWNS_INFO>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_info,
    network,
    label: "PROTOCOL PAWNS INFO",
    fallback: "api_protocol_pawns_info failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
