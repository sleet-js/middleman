// ========================================
// API_PROTOCOL_PAWNS_GAME_MOVES
// GET /game/{game_id}/moves — the move history of one game, with the
// fen after every move.
//
// the game id is the json-stringified tuple, percent-encoded into the
// path.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_encode_game_id } from "../stuff/protocol_pawns_game_id";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type {
  PROTOCOL_PAWNS_GAME_ID,
  PROTOCOL_PAWNS_GAME_MOVE,
} from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_GAME_MOVES_PARAMS {
  game_id: PROTOCOL_PAWNS_GAME_ID;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_game_moves({
  game_id,
  network,
}: API_PROTOCOL_PAWNS_GAME_MOVES_PARAMS): Promise<PROTOCOL_PAWNS_GAME_MOVE[]> {
  const path = protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_game_moves,
    { game_id: protocol_pawns_encode_game_id({ game_id }) },
  );

  return api_protocol_pawns_get<PROTOCOL_PAWNS_GAME_MOVE[]>({
    path,
    network,
    label: "PROTOCOL PAWNS GAME MOVES",
    fallback: "api_protocol_pawns_game_moves failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
