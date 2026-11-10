#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_ACCOUNT_CHALLENGES
// runnable bin for GET /account/{account_id}/challenges
// argv: protocol_pawns_account_challenges.ts <account_id> [--limit n] [--cursor c]
// ========================================

import { api_protocol_pawns_account_challenges } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_account_challenges.ts <account_id> [--limit n] [--cursor c]",
  );
  process.exit(1);
}

const res = await api_protocol_pawns_account_challenges({
  account_id,
  limit: check_limit(flags.get("--limit"), { min: 1, max: 100 }),
  cursor: flags.get("--cursor"),
});

console.log(`CHALLENGES ${account_id} ${res.items.length} item(s)`);
for (const ch of res.items) {
  const wager =
    ch.wager_token === null ? "-" : `${ch.wager_amount} ${ch.wager_token}`;
  console.log(
    ` ${ch.id} status=${ch.status} wager=${wager} game=${ch.game_id ?? "-"}`,
  );
}
if (res.next_cursor !== null) {
  console.log("NEXT CURSOR", res.next_cursor);
}
// ========================================
// copyright 2026 by sleet.near
