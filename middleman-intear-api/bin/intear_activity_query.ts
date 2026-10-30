#!/usr/bin/env bun
// ========================================
// INTEAR_ACTIVITY_QUERY
// runnable bin for GET /activity via middleman/intear. this merges
// trades and transfers of one account into a single feed, which is
// what the FEED page wants.
//
// argv:
//   bun middleman-intear-api/bin/intear_activity_query.ts <account_id> [kinds]
//       [--token t] [--side buy|sell] [--min-usd v] [--fields a,b]
//       [--limit n] [--order newest|oldest] [--cursor c]
//
// kinds defaults to both trade and transfer, comma separated.
//
// examples:
//   bun middleman-intear-api/bin/intear_activity_query.ts sleet.near
//   bun middleman-intear-api/bin/intear_activity_query.ts sleet.near trade --limit 20
//   bun middleman-intear-api/bin/intear_activity_query.ts sleet.near trade,transfer --token wrap.near
// ========================================

import type {
  activity_fields,
  activity_kind,
} from "@sleet-js/intear-api-tool-box";
import { api_intear_activity_query } from "@sleet-js/middleman-intear-api";
import { split_argv } from "./fun/split_argv";
import { check_limit } from "./fun/check_limit";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_activity_query.ts <account_id> [kinds] " +
      "[--token t] [--side buy|sell] [--min-usd v] [--fields a,b] [--limit n] [--order newest|oldest]",
  );
  process.exit(1);
}

const kinds_raw = positional[1] ?? "trade,transfer";
const kinds = kinds_raw.split(",");
const limit_raw = flags.get("--limit");
const limit = check_limit(limit_raw, { min: 1, max: 200 });

const requested = flags.get("--fields")?.split(",");
const fields: activity_fields = {};
for (const kind of kinds) {
  fields[kind as keyof activity_fields] =
    (requested as never) ??
    (kind === "trade"
      ? ["token", "side", "amount", "usd_value"]
      : kind === "transfer"
        ? ["token", "sender", "receiver", "amount", "kind"]
        : ["transaction_id", "sender", "receiver"]);
}

const response = await api_intear_activity_query({
  account: account_id,
  kinds: kinds as activity_kind[],
  fields,
  token: flags.get("--token"),
  side: flags.get("--side") as never,
  min_usd: flags.get("--min-usd") as never,
  limit,
  order: flags.get("--order") as never,
  cursor: flags.get("--cursor"),
});

console.log(
  "ACTIVITY",
  `${response.rows.length} row(s) at height ${response.height}`,
);
for (const row of response.rows) {
  console.log(" ", row.join("  |  "));
}
if (response.next_cursor !== null) {
  console.log(" next cursor:", response.next_cursor);
}
// ========================================
// copyright 2026 by sleet.near
