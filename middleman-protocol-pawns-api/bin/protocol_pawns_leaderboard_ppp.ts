#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_LEADERBOARD_PPP
// runnable bin for GET /leaderboard/ppp
// argv: protocol_pawns_leaderboard_ppp.ts [--page n] [--per-page n]
// ========================================

import { api_protocol_pawns_leaderboard_ppp } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2));

const res = await api_protocol_pawns_leaderboard_ppp({
  page: check_limit(flags.get("--page"), { min: 1, max: 10000 }, "--page"),
  per_page: check_limit(
    flags.get("--per-page"),
    { min: 1, max: 100 },
    "--per-page",
  ),
});

console.log(`PPP LEADERBOARD page ${res.page}/${res.total_pages} (${res.total})`);
for (const entry of res.entries) {
  console.log(
    ` ${String(entry.rank).padStart(3)}. ${entry.account_id.padEnd(32)} ppp=${entry.ppp} elo=${entry.elo?.toFixed(1) ?? "-"} w/l/d=${entry.wins}/${entry.losses}/${entry.draws}`,
  );
}
// ========================================
// copyright 2026 by sleet.near
