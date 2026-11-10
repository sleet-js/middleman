// ========================================
// PROTOCOL PAWNS
// typed client for the protocol pawns api (https://api.protocol-pawns.com).
// one-shot HTTP only. response types are defined locally in
// src/types/ since there is no protocol pawns tool-box package.
//
// the api is read-only. it indexes the chess contract `app.chess-game.near`
// on near mainnet; every write (moves, challenges, bets, wagers) is a
// near transaction against that contract, not a call to this api.
// ========================================

export * from "./stuff/api_protocol_pawns_get";
export * from "./stuff/api_protocol_pawns_post";
export * from "./fun/api_protocol_pawns_info";
export * from "./fun/api_protocol_pawns_stats";
export * from "./fun/api_protocol_pawns_games";
export * from "./fun/api_protocol_pawns_game";
export * from "./fun/api_protocol_pawns_game_moves";
export * from "./fun/api_protocol_pawns_game_bets";
export * from "./fun/api_protocol_pawns_query_games";
export * from "./fun/api_protocol_pawns_account";
export * from "./fun/api_protocol_pawns_account_active_game";
export * from "./fun/api_protocol_pawns_account_stats";
export * from "./fun/api_protocol_pawns_account_stats_batch";
export * from "./fun/api_protocol_pawns_account_query";
export * from "./fun/api_protocol_pawns_account_challenges";
export * from "./fun/api_protocol_pawns_account_bets";
export * from "./fun/api_protocol_pawns_account_bet_stats";
export * from "./fun/api_protocol_pawns_leaderboard_elo";
export * from "./fun/api_protocol_pawns_leaderboard_ppp";
export * from "./fun/api_protocol_pawns_leaderboard_bets";
export * from "./fun/api_protocol_pawns_challenges";
export * from "./fun/api_protocol_pawns_bets";

export {
  PROTOCOL_PAWNS_BASE_URL,
  PROTOCOL_PAWNS_BASE_URLS,
} from "./stuff/protocol_pawns_base_url";
export {
  PROTOCOL_PAWNS_ENDPOINT_PATHS,
  protocol_pawns_build_path,
} from "./stuff/protocol_pawns_endpoint_paths";
export type { PROTOCOL_PAWNS_ENDPOINT_KEY } from "./stuff/protocol_pawns_endpoint_paths";
export {
  PROTOCOL_PAWNS_NETWORKS,
  PROTOCOL_PAWNS_DEFAULT_NETWORK,
  protocol_pawns_is_network,
  protocol_pawns_resolve_base_url,
} from "./stuff/protocol_pawns_network";
export type { PROTOCOL_PAWNS_NETWORK } from "./stuff/protocol_pawns_network";
export { protocol_pawns_parse_error } from "./stuff/protocol_pawns_parse_error";
export type { PROTOCOL_PAWNS_API_ERROR } from "./stuff/protocol_pawns_parse_error";
export { protocol_pawns_build_query } from "./stuff/protocol_pawns_build_query";
export type {
  PROTOCOL_PAWNS_QUERY_VALUE,
  PROTOCOL_PAWNS_BUILD_QUERY_PARAMS,
} from "./stuff/protocol_pawns_build_query";
export {
  protocol_pawns_encode_game_id,
  protocol_pawns_game_id_to_string,
} from "./stuff/protocol_pawns_game_id";
export type { PROTOCOL_PAWNS_GAME_ID_PARAMS } from "./stuff/protocol_pawns_game_id";

export * from "./types/protocol_pawns_types";
// ========================================
// copyright 2026 by sleet.near
