// ========================================
// PROTOCOL_PAWNS EVENT TYPES
// the event types the sse stream carries, and the payload of each.
//
// every event on the wire looks like this:
//
//   event: play_move
//   data: {"trigger_block_height":128903500,"trigger_block_timestamp":"...",
//          "event_data":{"game_id":[...],"color":"Black","mv":"e7e5",...}}
//
// the envelope carries the block that triggered the event, the payload
// lives in `event_data`.
// ========================================

import type { PROTOCOL_PAWNS_COLOR } from "./protocol_pawns_types";
import type { PROTOCOL_PAWNS_GAME_ID } from "./protocol_pawns_types";
import type { PROTOCOL_PAWNS_GAME_OUTCOME } from "./protocol_pawns_types";

// the envelope every event shares.
export interface PROTOCOL_PAWNS_EVENT_ENVELOPE {
  trigger_block_height: number;
  trigger_block_timestamp: string | number;
  event_data: Record<string, unknown>;
}

// a game was created. the payload carries the game id, the two sides
// and the starting board.
export interface PROTOCOL_PAWNS_CREATE_GAME_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "create_game";
  event_data: {
    game_id: PROTOCOL_PAWNS_GAME_ID;
    white: unknown;
    black: unknown;
    board: string[];
  };
}

// a move was played. the payload carries the game id, the side that
// moved, the move in coordinate notation and the board after it.
export interface PROTOCOL_PAWNS_PLAY_MOVE_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "play_move";
  event_data: {
    game_id: PROTOCOL_PAWNS_GAME_ID;
    color: PROTOCOL_PAWNS_COLOR;
    mv: string;
    board: string[];
    outcome?: PROTOCOL_PAWNS_GAME_OUTCOME | null;
  };
}

// a player resigned.
export interface PROTOCOL_PAWNS_RESIGN_GAME_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "resign_game";
  event_data: {
    game_id: PROTOCOL_PAWNS_GAME_ID;
    resigner: string;
    outcome?: PROTOCOL_PAWNS_GAME_OUTCOME | null;
  };
}

// a game was cancelled.
export interface PROTOCOL_PAWNS_CANCEL_GAME_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "cancel_game";
  event_data: {
    game_id: PROTOCOL_PAWNS_GAME_ID;
    cancelled_by: string;
  };
}

// somebody challenged you.
export interface PROTOCOL_PAWNS_CHALLENGE_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "challenge";
  event_data: {
    id: string;
    challenger: string;
    challenged: string;
    wager?: string | null;
  };
}

// a challenge was accepted.
export interface PROTOCOL_PAWNS_ACCEPT_CHALLENGE_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "accept_challenge";
  event_data: {
    challenge_id: string;
    game_id?: PROTOCOL_PAWNS_GAME_ID | null;
  };
}

// a challenge was rejected.
export interface PROTOCOL_PAWNS_REJECT_CHALLENGE_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "reject_challenge";
  event_data: {
    challenge_id: string;
  };
}

// the keep-alive. the api sends one every 5 seconds. if one is
// missing for ~10 seconds the stream is dead and should be reopened.
//
// the shape matches the other events, the payload is empty.
export interface PROTOCOL_PAWNS_HEARTBEAT_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "heartbeat";
  event_data: Record<string, unknown>;
}

// a move landed and the opponent was told about it over the stream,
// so they can pull the tx logs. this one is not sent by the indexer
// but by the caller of POST /notify/move.
export interface PROTOCOL_PAWNS_PLAY_MOVE_TX_EVENT extends PROTOCOL_PAWNS_EVENT_ENVELOPE {
  event_type: "play_move_tx";
  event_data: {
    game_id: PROTOCOL_PAWNS_GAME_ID;
    tx_hash?: string;
    [key: string]: unknown;
  };
}

// any event the api might add later. the payload stays untyped so a
// new event type does not break the stream.
export interface PROTOCOL_PAWNS_UNKNOWN_EVENT {
  event_type: string;
  event_data: Record<string, unknown>;
}

// every event the stream can carry.
export type PROTOCOL_PAWNS_EVENT =
  | PROTOCOL_PAWNS_CREATE_GAME_EVENT
  | PROTOCOL_PAWNS_PLAY_MOVE_EVENT
  | PROTOCOL_PAWNS_RESIGN_GAME_EVENT
  | PROTOCOL_PAWNS_CANCEL_GAME_EVENT
  | PROTOCOL_PAWNS_CHALLENGE_EVENT
  | PROTOCOL_PAWNS_ACCEPT_CHALLENGE_EVENT
  | PROTOCOL_PAWNS_REJECT_CHALLENGE_EVENT
  | PROTOCOL_PAWNS_PLAY_MOVE_TX_EVENT
  | PROTOCOL_PAWNS_HEARTBEAT_EVENT
  | PROTOCOL_PAWNS_UNKNOWN_EVENT;

// the names of the events the api documents.
export type PROTOCOL_PAWNS_EVENT_TYPE =
  | "create_game"
  | "play_move"
  | "play_move_tx"
  | "resign_game"
  | "cancel_game"
  | "challenge"
  | "accept_challenge"
  | "reject_challenge"
  | "heartbeat";
