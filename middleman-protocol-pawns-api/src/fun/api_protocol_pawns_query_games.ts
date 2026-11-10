// ========================================
// API_PROTOCOL_PAWNS_QUERY_GAMES
// POST /query — batch game lookup. the body holds the game ids, the
// response holds the games that exist.
//
// a batch is the cheap way to resolve many games at once, e.g. the
// finished game ids of an account.
// ========================================

import { api_protocol_pawns_post } from "../stuff/api_protocol_pawns_post";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type {
  PROTOCOL_PAWNS_GAME_ID,
  PROTOCOL_PAWNS_GAME_OVERVIEW,
} from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_QUERY_GAMES_PARAMS {
  game_ids: PROTOCOL_PAWNS_GAME_ID[];
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_query_games({
  game_ids,
  network,
}: API_PROTOCOL_PAWNS_QUERY_GAMES_PARAMS): Promise<
  PROTOCOL_PAWNS_GAME_OVERVIEW[]
> {
  return api_protocol_pawns_post<PROTOCOL_PAWNS_GAME_OVERVIEW[]>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_query_games,
    body: { gameIds: game_ids },
    network,
    label: "PROTOCOL PAWNS QUERY GAMES",
    fallback: "api_protocol_pawns_query_games failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
