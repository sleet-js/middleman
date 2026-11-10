#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_ACCOUNT_ACTIVE_GAME
// runnable bin for GET /account/{account_id}/active-game
// argv: protocol_pawns_account_active_game.ts <account_id>
// this is the call an agent polls to find out whether it is its turn.
// the fen carries the side to move in its second field.
// ========================================

import { api_protocol_pawns_account_active_game } from "@sleet-js/middleman-protocol-pawns-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_account_active_game.ts <account_id>",
  );
  process.exit(1);
}

try {
  const game = await api_protocol_pawns_account_active_game({ account_id });

  console.log("ACTIVE GAME", JSON.stringify(game.game_id));
  console.log(" white", JSON.stringify(game.white));
  console.log(" black", JSON.stringify(game.black));
  console.log(" status", game.status ?? "-");
  console.log(" turn  ", game.fen?.split(" ")[1] ?? "-");
  if (game.fen) console.log(" fen   ", game.fen);
} catch (e) {
  console.log(`no active game for ${account_id}`);
  console.log(" ", e instanceof Error ? e.message : e);
}
// ========================================
// copyright 2026 by sleet.near
