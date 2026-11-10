#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_ACCOUNT_STATS
// runnable bin for GET /account/{account_id}/stats
// argv: protocol_pawns_account_stats.ts <account_id>
// ========================================

import { api_protocol_pawns_account_stats } from "@sleet-js/middleman-protocol-pawns-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_account_stats.ts <account_id>",
  );
  process.exit(1);
}

const res = await api_protocol_pawns_account_stats({ account_id });

console.log(`STATS ${res.account_id}`);
console.log(" wins     ", res.wins);
console.log(" losses   ", res.losses);
console.log(" draws    ", res.draws);
console.log(" total    ", res.total_games);
// ========================================
// copyright 2026 by sleet.near
