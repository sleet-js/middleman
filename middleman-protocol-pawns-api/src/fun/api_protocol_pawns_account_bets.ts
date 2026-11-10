// ========================================
// API_PROTOCOL_PAWNS_ACCOUNT_BETS
// GET /account/{account_id}/bets — the bets one account placed.
//
// `status` filters by "pending", "locked" or "resolved". the response
// is cursor paginated.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_PAGINATED_BETS } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_ACCOUNT_BETS_PARAMS {
  account_id: string;
  status?: "pending" | "locked" | "resolved";
  cursor?: string;
  limit?: number;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_account_bets({
  account_id,
  status,
  cursor,
  limit,
  network,
}: API_PROTOCOL_PAWNS_ACCOUNT_BETS_PARAMS): Promise<PROTOCOL_PAWNS_PAGINATED_BETS> {
  const path = `${protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_account_bets,
    { account_id },
  )}${protocol_pawns_build_query({ query: { status, cursor, limit } })}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_PAGINATED_BETS>({
    path,
    network,
    label: "PROTOCOL PAWNS ACCOUNT BETS",
    fallback: "api_protocol_pawns_account_bets failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
