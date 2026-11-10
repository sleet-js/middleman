// ========================================
// API_PROTOCOL_PAWNS_ACCOUNT_ACTIVE_GAME
// GET /account/{account_id}/active-game — the game one account is
// currently playing.
//
// this is the call an agent polls to find out whether it is its turn.
// the fen carries the side to move in its second field.
//
// throws when the account has no active game (404).
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_GAME_OVERVIEW } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_ACCOUNT_ACTIVE_GAME_PARAMS {
  account_id: string;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_account_active_game({
  account_id,
  network,
}: API_PROTOCOL_PAWNS_ACCOUNT_ACTIVE_GAME_PARAMS): Promise<PROTOCOL_PAWNS_GAME_OVERVIEW> {
  const path = protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_account_active_game,
    { account_id },
  );

  return api_protocol_pawns_get<PROTOCOL_PAWNS_GAME_OVERVIEW>({
    path,
    network,
    label: "PROTOCOL PAWNS ACCOUNT ACTIVE GAME",
    fallback: "api_protocol_pawns_account_active_game failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
