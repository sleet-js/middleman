#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_GAME_MOVES
// runnable bin for GET /game/{game_id}/moves
// argv: protocol_pawns_game_moves.ts '<game_id>'
// ========================================

import { api_protocol_pawns_game_moves } from "@sleet-js/middleman-protocol-pawns-api";
import { parse_game_id } from "./fun/parse_game_id";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2));

const raw = positional[0];
if (raw === undefined) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_game_moves.ts '<game_id>'",
  );
  process.exit(1);
}

const moves = await api_protocol_pawns_game_moves({
  game_id: parse_game_id(raw),
});

console.log(`MOVES ${moves.length}`);
for (const move of moves) {
  console.log(
    ` ${String(move.move_number).padStart(3)}. ${move.color.padEnd(5)} ${move.move_notation}`,
  );
  if (move.outcome) console.log("      result:", JSON.stringify(move.outcome));
}
// ========================================
// copyright 2026 by sleet.near
