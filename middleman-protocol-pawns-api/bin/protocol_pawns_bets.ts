#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_BETS
// runnable bin for GET /bets — the global bets
// argv: protocol_pawns_bets.ts [--status pending|locked|resolved] [--limit n] [--cursor c]
// ========================================

import { api_protocol_pawns_bets } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2));

const status_raw = flags.get("--status");
const status =
  status_raw === "pending" || status_raw === "locked" || status_raw === "resolved"
    ? status_raw
    : undefined;

const res = await api_protocol_pawns_bets({
  status,
  limit: check_limit(flags.get("--limit"), { min: 1, max: 100 }),
  cursor: flags.get("--cursor"),
});

console.log(`BETS ${res.items.length} item(s)`);
for (const bet of res.items) {
  console.log(
    ` ${bet.bettor} -> ${bet.winner} ${bet.amount} ${bet.token_id} status=${bet.status} payout=${bet.payout ?? "-"}`,
  );
}
if (res.next_cursor !== null) {
  console.log("NEXT CURSOR", res.next_cursor);
}
// ========================================
// copyright 2026 by sleet.near
