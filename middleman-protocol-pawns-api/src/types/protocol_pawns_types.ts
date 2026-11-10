// ========================================
// PROTOCOL PAWNS TYPES
// types for the responses of the protocol pawns api. they mirror the
// zod schemas the api validates with, so a shape here is a shape the
// server guarantees.
//
// NOTE ON DATES: timestamps are iso-8601 strings, not numbers.
// NOTE ON AMOUNTS: token amounts and elo are strings or floats as the
// contract stores them. elo is a float, token amounts are strings in
// the smallest unit of the token.
// ========================================

// the id of a game, as the contract builds it:
// [block_height, white_account_id, black_account_id_or_null]
export type PROTOCOL_PAWNS_GAME_ID = [
  number,
  string,
  string | null,
];

export type PROTOCOL_PAWNS_DIFFICULTY = "Easy" | "Medium" | "Hard" | "VeryHard";

export type PROTOCOL_PAWNS_COLOR = "White" | "Black";

export type PROTOCOL_PAWNS_GAME_STATUS =
  | "in_progress"
  | "finished"
  | "cancelled";

export type PROTOCOL_PAWNS_CHALLENGE_STATUS =
  | "pending"
  | "accepted"
  | "rejected";

export type PROTOCOL_PAWNS_BET_STATUS = "pending" | "locked" | "resolved";

// a game outcome. a stalemate has no color.
export type PROTOCOL_PAWNS_GAME_OUTCOME =
  | { result: "Stalemate" }
  | { result: "Victory"; color: PROTOCOL_PAWNS_COLOR };

// one side of a game. the black side of an ai game carries the
// difficulty instead of an account id.
export type PROTOCOL_PAWNS_PLAYER =
  | { type: "Human"; value: string }
  | { type: "Ai"; value: PROTOCOL_PAWNS_DIFFICULTY };

// the board as 8 strings, rank 8 first. ` ` is an empty square,
// uppercase is white, lowercase is black.
export type PROTOCOL_PAWNS_BOARD = string[];

// one game.
export interface PROTOCOL_PAWNS_GAME_OVERVIEW {
  game_id: PROTOCOL_PAWNS_GAME_ID;
  white: PROTOCOL_PAWNS_PLAYER;
  black: PROTOCOL_PAWNS_PLAYER;
  board: PROTOCOL_PAWNS_BOARD;
  fen?: string | null;
  status?: PROTOCOL_PAWNS_GAME_STATUS;
  resigner?: PROTOCOL_PAWNS_COLOR | null;
  outcome?: PROTOCOL_PAWNS_GAME_OUTCOME | null;
  created_at?: string;
  finished_at?: string | null;
  wager_token?: string | null;
  wager_amount?: string | null;
}

// a page of games.
export interface PROTOCOL_PAWNS_PAGINATED_GAMES {
  items: PROTOCOL_PAWNS_GAME_OVERVIEW[];
  next_cursor: string | null;
  total_count?: number;
  total_pages?: number;
  page?: number;
  per_page?: number;
}

// one move of a game, with the fen after it.
export interface PROTOCOL_PAWNS_GAME_MOVE {
  move_number: number;
  color: PROTOCOL_PAWNS_COLOR;
  move_notation: string;
  fen: string;
  outcome?: PROTOCOL_PAWNS_GAME_OUTCOME | null;
}

// one challenge between two accounts.
export interface PROTOCOL_PAWNS_CHALLENGE {
  id: string;
  challenger: string;
  challenged: string;
  wager_token: string | null;
  wager_amount: string | null;
  status: PROTOCOL_PAWNS_CHALLENGE_STATUS;
  game_id: string | null;
  created_at: string;
  resolved_at: string | null;
}

// a page of challenges.
export interface PROTOCOL_PAWNS_PAGINATED_CHALLENGES {
  items: PROTOCOL_PAWNS_CHALLENGE[];
  next_cursor: string | null;
  total_count?: number;
  total_pages?: number;
  page?: number;
  per_page?: number;
}

// the finished game ids of one account.
export interface PROTOCOL_PAWNS_ACCOUNT {
  finishedGameIds: PROTOCOL_PAWNS_GAME_ID[];
}

// win/loss/draw stats of one account.
export interface PROTOCOL_PAWNS_ACCOUNT_STATS {
  account_id: string;
  wins: number;
  losses: number;
  draws: number;
  total_games: number;
}

// an account search hit, with elo.
export interface PROTOCOL_PAWNS_ACCOUNT_SEARCH_RESULT
  extends PROTOCOL_PAWNS_ACCOUNT_STATS {
  elo: number | null;
}

// global platform counters.
export interface PROTOCOL_PAWNS_GLOBAL_STATS {
  total_games: number;
  active_games: number;
  finished_games: number;
  cancelled_games: number;
  total_moves: number;
}

// the last block the indexer processed.
export interface PROTOCOL_PAWNS_INFO {
  lastBlockHeight: number;
}

// one bet.
export interface PROTOCOL_PAWNS_BET {
  id: string;
  bettor: string;
  player_0: string;
  player_1: string;
  game_id: string | null;
  token_id: string;
  amount: string;
  winner: string;
  status: PROTOCOL_PAWNS_BET_STATUS;
  payout: string | null;
  created_at: string;
  locked_at: string | null;
  resolved_at: string | null;
}

// a page of bets.
export interface PROTOCOL_PAWNS_PAGINATED_BETS {
  items: PROTOCOL_PAWNS_BET[];
  next_cursor: string | null;
}

// wagered and won amounts for one token.
export interface PROTOCOL_PAWNS_TOKEN_BET_STATS {
  wagered: string;
  won: string;
}

// aggregate betting stats of one account.
export interface PROTOCOL_PAWNS_BET_STATS {
  account_id: string;
  total_bets: number;
  won_bets: number;
  by_token: Record<string, PROTOCOL_PAWNS_TOKEN_BET_STATS>;
}

// one entry of the bettor leaderboard.
export interface PROTOCOL_PAWNS_BET_LEADERBOARD_ENTRY {
  account_id: string;
  total_bets: number;
  won_bets: number;
  by_token: Record<string, PROTOCOL_PAWNS_TOKEN_BET_STATS>;
}

// one entry of the elo leaderboard.
export interface PROTOCOL_PAWNS_ELO_LEADERBOARD_ENTRY {
  rank: number;
  account_id: string;
  elo: number;
}

// one page of the elo leaderboard.
export interface PROTOCOL_PAWNS_ELO_LEADERBOARD_PAGE {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  entries: PROTOCOL_PAWNS_ELO_LEADERBOARD_ENTRY[];
}

// one entry of the combined elo + ppp ranking.
export interface PROTOCOL_PAWNS_RANKING_ENTRY {
  rank: number;
  account_id: string;
  elo: number | null;
  ppp: string;
  wins: number;
  losses: number;
  draws: number;
  total_games: number;
}

// one page of the combined elo + ppp ranking.
export interface PROTOCOL_PAWNS_RANKING_PAGE {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  entries: PROTOCOL_PAWNS_RANKING_ENTRY[];
}
