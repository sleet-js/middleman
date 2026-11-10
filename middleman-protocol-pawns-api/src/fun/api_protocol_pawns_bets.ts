// ========================================
// API_PROTOCOL_PAWNS_BETS
// GET /bets — the global bets, a page of them.
//
// `status` filters by "pending", "locked" or "resolved". the response
// is cursor paginated.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_PAGINATED_BETS } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_BETS_PARAMS {
  status?: "pending" | "locked" | "resolved";
  cursor?: string;
  limit?: number;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_bets({
  status,
  cursor,
  limit,
  network,
}: API_PROTOCOL_PAWNS_BETS_PARAMS): Promise<PROTOCOL_PAWNS_PAGINATED_BETS> {
  const path = `${PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_bets}${protocol_pawns_build_query(
    {
      query: { status, cursor, limit },
    },
  )}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_PAGINATED_BETS>({
    path,
    network,
    label: "PROTOCOL PAWNS BETS",
    fallback: "api_protocol_pawns_bets failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
