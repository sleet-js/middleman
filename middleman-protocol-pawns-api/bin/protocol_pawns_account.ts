#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_ACCOUNT
// runnable bin for GET /account/{account_id}
// argv: protocol_pawns_account.ts <account_id>
// ========================================

import { api_protocol_pawns_account } from "@sleet-js/middleman-protocol-pawns-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_account.ts <account_id>",
  );
  process.exit(1);
}

const res = await api_protocol_pawns_account({ account_id });

console.log(`ACCOUNT ${account_id}`);
console.log(` finished games: ${res.finishedGameIds.length}`);
for (const id of res.finishedGameIds) {
  console.log("  ", JSON.stringify(id));
}
// ========================================
// copyright 2026 by sleet.near
