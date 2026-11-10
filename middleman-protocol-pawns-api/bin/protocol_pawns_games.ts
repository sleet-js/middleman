#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_GAMES
// runnable bin for GET /games
// argv: protocol_pawns_games.ts [--status active|finished] [--limit n] [--cursor c] [--page n] [--exclude-ai]
// ========================================

import { api_protocol_pawns_games } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags, seen } = split_argv(process.argv.slice(2), {
  boolean_flags: ["--exclude-ai"],
});

const status_raw = flags.get("--status");
const status =
  status_raw === "active" || status_raw === "finished" ? status_raw : undefined;

const res = await api_protocol_pawns_games({
  status,
  limit: check_limit(flags.get("--limit"), { min: 1, max: 100 }),
  cursor: flags.get("--cursor"),
  page: check_limit(flags.get("--page"), { min: 1, max: 10000 }, "--page"),
  exclude_ai: seen.has("--exclude-ai") ? true : undefined,
});

console.log(`GAMES ${res.items.length} item(s)`);
for (const game of res.items) {
  const white = game.white.value;
  const black =
    game.black.type === "Ai" ? `ai:${game.black.value}` : game.black.value;
  console.log(
    ` ${JSON.stringify(game.game_id)} ${white} vs ${black} status=${game.status ?? "-"}`,
  );
}
if (res.next_cursor !== null) {
  console.log("NEXT CURSOR", res.next_cursor);
}
// ========================================
// copyright 2026 by sleet.near
