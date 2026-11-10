// ========================================
// PROTOCOL_PAWNS_GAME_ID
// the api takes a game id as the json-stringified tuple the contract
// builds: `[123456,"white.near","black.near"]`. it goes into the path
// percent-encoded, because the brackets and quotes are not safe in a
// url path.
//
// the black account is null for an ai game.
// ========================================

import type { PROTOCOL_PAWNS_GAME_ID } from "../types/protocol_pawns_types";

export interface PROTOCOL_PAWNS_GAME_ID_PARAMS {
  game_id: PROTOCOL_PAWNS_GAME_ID;
}

// turn a game id into the path-safe string the api expects.
export function protocol_pawns_encode_game_id({
  game_id,
}: PROTOCOL_PAWNS_GAME_ID_PARAMS): string {
  return encodeURIComponent(JSON.stringify(game_id));
}

// the same thing, but without encoding, for the bodies of the post
// endpoints and for building urls by hand.
export function protocol_pawns_game_id_to_string(
  game_id: PROTOCOL_PAWNS_GAME_ID,
): string {
  return JSON.stringify(game_id);
}
// ========================================
// copyright 2026 by sleet.near
