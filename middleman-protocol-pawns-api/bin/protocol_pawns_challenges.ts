#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_CHALLENGES
// runnable bin for GET /challenges — the global open challenges
// argv: protocol_pawns_challenges.ts [--limit n] [--cursor c]
// ========================================

import { api_protocol_pawns_challenges } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2));

const res = await api_protocol_pawns_challenges({
  limit: check_limit(flags.get("--limit"), { min: 1, max: 100 }),
  cursor: flags.get("--cursor"),
});

console.log(`CHALLENGES ${res.items.length} item(s)`);
for (const ch of res.items) {
  const wager =
    ch.wager_token === null ? "-" : `${ch.wager_amount} ${ch.wager_token}`;
  console.log(
    ` ${ch.id} status=${ch.status} wager=${wager} created=${ch.created_at}`,
  );
}
if (res.next_cursor !== null) {
  console.log("NEXT CURSOR", res.next_cursor);
}
// ========================================
// copyright 2026 by sleet.near
