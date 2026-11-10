#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_GAME
// runnable bin for GET /game/{game_id}
// argv: protocol_pawns_game.ts '<game_id>'
// the game id is the json tuple the contract builds, e.g.
// '[216915130,"krapz.near",null]'
// ========================================

import { api_protocol_pawns_game } from "@sleet-js/middleman-protocol-pawns-api";
import { parse_game_id } from "./fun/parse_game_id";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2));

const raw = positional[0];
if (raw === undefined) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_game.ts '<game_id>'",
  );
  process.exit(1);
}

const game = await api_protocol_pawns_game({ game_id: parse_game_id(raw) });

console.log("GAME", JSON.stringify(game.game_id));
console.log(" white", JSON.stringify(game.white));
console.log(" black", JSON.stringify(game.black));
console.log(" status", game.status ?? "-");
console.log(" turn  ", game.fen?.split(" ")[1] ?? "-");
if (game.fen) console.log(" fen   ", game.fen);
if (game.outcome) console.log(" result", JSON.stringify(game.outcome));
console.log(" board");
for (const rank of game.board) console.log("  ", rank.replace(/ /g, "."));
// ========================================
// copyright 2026 by sleet.near
