// ========================================
// API_PROTOCOL_PAWNS_ACCOUNT_QUERY
// POST /account/query — search accounts by name prefix, with elo and
// win/loss/draw stats.
//
// the query is 1 to 64 characters.
// ========================================

import { api_protocol_pawns_post } from "../stuff/api_protocol_pawns_post";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_ACCOUNT_SEARCH_RESULT } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_ACCOUNT_QUERY_PARAMS {
  query: string;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_account_query({
  query,
  network,
}: API_PROTOCOL_PAWNS_ACCOUNT_QUERY_PARAMS): Promise<
  PROTOCOL_PAWNS_ACCOUNT_SEARCH_RESULT[]
> {
  return api_protocol_pawns_post<PROTOCOL_PAWNS_ACCOUNT_SEARCH_RESULT[]>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_account_query,
    body: { query },
    network,
    label: "PROTOCOL PAWNS ACCOUNT QUERY",
    fallback: "api_protocol_pawns_account_query failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
