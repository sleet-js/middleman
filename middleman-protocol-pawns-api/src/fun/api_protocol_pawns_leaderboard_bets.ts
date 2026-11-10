// ========================================
// API_PROTOCOL_PAWNS_LEADERBOARD_BETS
// GET /leaderboard/bets — the top bettors, ranked by their winnings.
//
// the response is cursor paginated.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_BET_LEADERBOARD_ENTRY } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_LEADERBOARD_BETS_PARAMS {
  cursor?: string;
  limit?: number;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export interface PROTOCOL_PAWNS_BET_LEADERBOARD_PAGE {
  items: PROTOCOL_PAWNS_BET_LEADERBOARD_ENTRY[];
  next_cursor: string | null;
}

export async function api_protocol_pawns_leaderboard_bets({
  cursor,
  limit,
  network,
}: API_PROTOCOL_PAWNS_LEADERBOARD_BETS_PARAMS): Promise<PROTOCOL_PAWNS_BET_LEADERBOARD_PAGE> {
  const path = `${PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_leaderboard_bets}${protocol_pawns_build_query({
    query: { cursor, limit },
  })}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_BET_LEADERBOARD_PAGE>({
    path,
    network,
    label: "PROTOCOL PAWNS LEADERBOARD BETS",
    fallback: "api_protocol_pawns_leaderboard_bets failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
