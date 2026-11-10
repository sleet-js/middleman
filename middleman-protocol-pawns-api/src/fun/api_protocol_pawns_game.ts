// ========================================
// API_PROTOCOL_PAWNS_GAME
// GET /game/{game_id} — one game by its id.
//
// the game id is the json-stringified tuple the contract builds,
// `[123456,"white.near","black.near"]`, with the black account null
// for an ai game. it is percent-encoded into the path.
//
// throws when the game does not exist (404).
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_encode_game_id } from "../stuff/protocol_pawns_game_id";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type {
  PROTOCOL_PAWNS_GAME_ID,
  PROTOCOL_PAWNS_GAME_OVERVIEW,
} from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_GAME_PARAMS {
  game_id: PROTOCOL_PAWNS_GAME_ID;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_game({
  game_id,
  network,
}: API_PROTOCOL_PAWNS_GAME_PARAMS): Promise<PROTOCOL_PAWNS_GAME_OVERVIEW> {
  const path = protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_game,
    { game_id: protocol_pawns_encode_game_id({ game_id }) },
  );

  return api_protocol_pawns_get<PROTOCOL_PAWNS_GAME_OVERVIEW>({
    path,
    network,
    label: "PROTOCOL PAWNS GAME",
    fallback: "api_protocol_pawns_game failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
