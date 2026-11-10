#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_LEADERBOARD_ELO
// runnable bin for GET /leaderboard/elo
// argv: protocol_pawns_leaderboard_elo.ts [--page n] [--per-page n] [--dir desc|asc]
// ========================================

import { api_protocol_pawns_leaderboard_elo } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2));

const dir_raw = flags.get("--dir");
const dir = dir_raw === "asc" || dir_raw === "desc" ? dir_raw : undefined;

const res = await api_protocol_pawns_leaderboard_elo({
  page: check_limit(flags.get("--page"), { min: 1, max: 10000 }, "--page"),
  per_page: check_limit(
    flags.get("--per-page"),
    { min: 1, max: 100 },
    "--per-page",
  ),
  dir,
});

console.log(`ELO LEADERBOARD page ${res.page}/${res.total_pages} (${res.total})`);
for (const entry of res.entries) {
  console.log(
    ` ${String(entry.rank).padStart(3)}. ${entry.account_id.padEnd(32)} elo=${entry.elo?.toFixed(1) ?? "-"} ppp=${entry.ppp} w/l/d=${entry.wins}/${entry.losses}/${entry.draws}`,
  );
}
// ========================================
// copyright 2026 by sleet.near
