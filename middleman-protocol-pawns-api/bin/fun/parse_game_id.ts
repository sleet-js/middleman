// ========================================
// PARSE_GAME_ID
// bin primitive that turns the game id from the command line into the
// tuple the api expects.
//
// the id is the json-stringified tuple the contract builds:
// `[123456,"white.near","black.near"]`. the black account is null for
// an ai game.
// ========================================

import type { PROTOCOL_PAWNS_GAME_ID } from "@sleet-js/middleman-protocol-pawns-api";

export function parse_game_id(raw: string): PROTOCOL_PAWNS_GAME_ID {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error(
      `game id must be a json array like [123456,"white.near","black.near"], got: ${raw}`,
    );
    process.exit(1);
  }

  if (!Array.isArray(parsed) || parsed.length !== 3) {
    console.error(
      `game id must be a json array of 3 items like [123456,"white.near","black.near"], got: ${raw}`,
    );
    process.exit(1);
  }

  const [block_height, white, black] = parsed as [
    unknown,
    unknown,
    unknown,
  ];

  if (typeof block_height !== "number" || !Number.isInteger(block_height)) {
    console.error("game id: the block height must be an integer");
    process.exit(1);
  }

  if (typeof white !== "string" || white.length === 0) {
    console.error("game id: the white account must be a non-empty string");
    process.exit(1);
  }

  if (black !== null && typeof black !== "string") {
    console.error("game id: the black account must be a string or null");
    process.exit(1);
  }

  return [block_height, white, black];
}
// ========================================
// copyright 2026 by sleet.near
