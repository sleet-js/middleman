// ========================================
// API_PROTOCOL_PAWNS_LEADERBOARD_ELO
// GET /leaderboard/elo — the elo leaderboard, a page of ranked
// accounts.
//
// NOTE: the route is named "elo" but it returns the combined ranking
// page, so every entry also carries ppp and the win/loss/draw counts.
// `dir` sorts by elo, "desc" (highest first) by default. `page`
// starts at 1, `per_page` defaults to 25.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_RANKING_PAGE } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_LEADERBOARD_ELO_PARAMS {
  // starts at 1
  page?: number;
  // defaults to 25 on the server
  per_page?: number;
  // elo sort direction, highest first by default
  dir?: "desc" | "asc";
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_leaderboard_elo({
  page,
  per_page,
  dir,
  network,
}: API_PROTOCOL_PAWNS_LEADERBOARD_ELO_PARAMS): Promise<PROTOCOL_PAWNS_RANKING_PAGE> {
  const path = `${PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_leaderboard_elo}${protocol_pawns_build_query({
    query: { page, per_page, dir },
  })}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_RANKING_PAGE>({
    path,
    network,
    label: "PROTOCOL PAWNS LEADERBOARD ELO",
    fallback: "api_protocol_pawns_leaderboard_elo failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
