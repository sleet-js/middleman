// ========================================
// API_PROTOCOL_PAWNS_LEADERBOARD_PPP
// GET /leaderboard/ppp — the ppp leaderboard, a page of ranked
// accounts.
//
// like the elo leaderboard it returns the combined ranking page, so
// every entry also carries elo and the win/loss/draw counts.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_RANKING_PAGE } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_LEADERBOARD_PPP_PARAMS {
  // starts at 1
  page?: number;
  // defaults to 25 on the server
  per_page?: number;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_leaderboard_ppp({
  page,
  per_page,
  network,
}: API_PROTOCOL_PAWNS_LEADERBOARD_PPP_PARAMS): Promise<PROTOCOL_PAWNS_RANKING_PAGE> {
  const path = `${PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_leaderboard_ppp}${protocol_pawns_build_query({
    query: { page, per_page },
  })}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_RANKING_PAGE>({
    path,
    network,
    label: "PROTOCOL PAWNS LEADERBOARD PPP",
    fallback: "api_protocol_pawns_leaderboard_ppp failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
