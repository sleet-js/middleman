#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_ACCOUNT_QUERY
// runnable bin for POST /account/query
// argv: protocol_pawns_account_query.ts <query>
// the query is a name prefix, 1..64 characters.
// ========================================

import { api_protocol_pawns_account_query } from "@sleet-js/middleman-protocol-pawns-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2));

const query = positional[0];
if (query === undefined || query.length === 0) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_account_query.ts <query>",
  );
  process.exit(1);
}

const res = await api_protocol_pawns_account_query({ query });

console.log(`ACCOUNT QUERY "${query}" ${res.length} hit(s)`);
for (const acc of res) {
  console.log(
    ` ${acc.account_id.padEnd(32)} elo=${acc.elo?.toFixed(1) ?? "-"} w/l/d=${acc.wins}/${acc.losses}/${acc.draws} games=${acc.total_games}`,
  );
}
// ========================================
// copyright 2026 by sleet.near
