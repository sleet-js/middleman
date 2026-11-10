// ========================================
// API_PROTOCOL_PAWNS_NOTIFY_MOVE
// POST /notify/move — tell the opponent of a game that a move landed,
// so they can pull the tx logs instead of waiting for the indexer.
//
// the caller has to be a participant in the game, the api answers 403
// otherwise. it is rate limited to one request per second per
// account.
//
// this does not change the game state, the move itself is a near
// transaction against the chess contract. this only nudges the
// opponent over the event stream.
// ========================================

import { api_protocol_pawns_post } from "../stuff/api_protocol_pawns_post";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_GAME_ID } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_NOTIFY_MOVE_PARAMS {
  // the hash of the transaction that carried the move.
  tx_hash: string;
  // the game the move was played in.
  game_id: PROTOCOL_PAWNS_GAME_ID;
  // the account that made the move.
  account_id: string;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export interface PROTOCOL_PAWNS_NOTIFY_MOVE_RESULT {
  ok: boolean;
  delivered: number;
  // why the notification did not go out, when it did not.
  reason?: string;
}

export async function api_protocol_pawns_notify_move({
  tx_hash,
  game_id,
  account_id,
  network,
}: API_PROTOCOL_PAWNS_NOTIFY_MOVE_PARAMS): Promise<PROTOCOL_PAWNS_NOTIFY_MOVE_RESULT> {
  return api_protocol_pawns_post<PROTOCOL_PAWNS_NOTIFY_MOVE_RESULT>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_notify_move,
    body: { tx_hash, game_id, account_id },
    network,
    label: "PROTOCOL PAWNS NOTIFY MOVE",
    fallback: "api_protocol_pawns_notify_move failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
