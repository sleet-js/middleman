// ========================================
// PROTOCOL_PAWNS_ENDPOINT_PATHS
// the path template for every endpoint this middleman knows about. one
// key per endpoint so the path is written down exactly once. `{name}`
// marks a placeholder the wrapper fills in.
//
// NOTE: the api takes the game id as a json-stringified tuple, e.g.
// `[123,"a.near","b.near"]`, percent-encoded into the path. the
// placeholder therefore holds a value that may contain slashes and
// brackets, so it is not percent-encoded again by the path builder.
// ========================================

export const PROTOCOL_PAWNS_ENDPOINT_PATHS = {
  // last indexed block height
  protocol_pawns_info: "/info",

  // global platform statistics
  protocol_pawns_stats: "/stats",

  // one game by id
  protocol_pawns_game: "/game/{game_id}",

  // move history of one game, with fen
  protocol_pawns_game_moves: "/game/{game_id}/moves",

  // bets placed on one game
  protocol_pawns_game_bets: "/game/{game_id}/bets",

  // paginated games, filtered by status
  protocol_pawns_games: "/games",

  // batch game lookup by game id
  protocol_pawns_query_games: "/query",

  // finished game ids of one account
  protocol_pawns_account: "/account/{account_id}",

  // the active game of one account
  protocol_pawns_account_active_game: "/account/{account_id}/active-game",

  // win/loss/draw stats of one account
  protocol_pawns_account_stats: "/account/{account_id}/stats",

  // batch stats for many accounts
  protocol_pawns_account_stats_batch: "/account/stats/batch",

  // account search by prefix
  protocol_pawns_account_query: "/account/query",

  // challenges of one account
  protocol_pawns_account_challenges: "/account/{account_id}/challenges",

  // bets placed by one account
  protocol_pawns_account_bets: "/account/{account_id}/bets",

  // aggregate betting stats of one account
  protocol_pawns_account_bet_stats: "/account/{account_id}/bet-stats",

  // elo leaderboard
  protocol_pawns_leaderboard_elo: "/leaderboard/elo",

  // ppp leaderboard
  protocol_pawns_leaderboard_ppp: "/leaderboard/ppp",

  // bettor leaderboard
  protocol_pawns_leaderboard_bets: "/leaderboard/bets",

  // global open challenges
  protocol_pawns_challenges: "/challenges",

  // global bets
  protocol_pawns_bets: "/bets",
} as const;

export type PROTOCOL_PAWNS_ENDPOINT_KEY =
  keyof typeof PROTOCOL_PAWNS_ENDPOINT_PATHS;

// ========================================
// PROTOCOL_PAWNS_BUILD_PATH
// fill the `{name}` placeholders of a path template. a placeholder
// holding a game id or an account id may contain characters that are
// meaningful in a path, so the value is inserted as it is and the
// caller decides how to encode it.
// ========================================

export function protocol_pawns_build_path(
  template: string,
  params: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_match, name: string) => {
    const value = params[name];
    if (value === undefined) {
      throw new Error(`missing path parameter: ${name}`);
    }
    return value;
  });
}
// ========================================
// copyright 2026 by sleet.near
