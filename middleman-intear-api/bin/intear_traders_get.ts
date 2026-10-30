#!/usr/bin/env bun
// ========================================
// INTEAR_TRADERS_GET
// runnable bin for GET /traders via middleman/intear. a token's top
// traders by profit over a time range, highest pnl_usd first.
//
// argv:
//   bun middleman-intear-api/bin/intear_traders_get.ts <token_id> [range]
//       [--top n]
//
// range is one of 24h, 7d, 30d or all, and defaults to 24h.
//
// examples:
//   bun middleman-intear-api/bin/intear_traders_get.ts token.intear.near
//   bun middleman-intear-api/bin/intear_traders_get.ts token.intear.near 7d
//   bun middleman-intear-api/bin/intear_traders_get.ts token.intear.near all --top 10
// ========================================

import type { trader_range } from "@sleet-js/intear-api-tool-box";
import { api_intear_traders_get } from "@sleet-js/middleman-intear-api";
import { split_argv } from "./fun/split_argv";
import { check_limit } from "./fun/check_limit";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const token_id = positional[0];
if (token_id === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_traders_get.ts <token_id> [range] [--top n]",
  );
  process.exit(1);
}

const RANGES: readonly trader_range[] = ["24h", "7d", "30d", "all"];
const range_raw = positional[1] ?? "24h";
if (!RANGES.includes(range_raw as trader_range)) {
  console.error(
    `invalid range "${range_raw}", expected one of ${RANGES.join(", ")}`,
  );
  process.exit(1);
}
const range = range_raw as trader_range;

const top = check_limit(flags.get("--top"), { min: 1, max: 100 }, "--top");

const response = await api_intear_traders_get({
  token: token_id,
  range,
  top,
});

console.log(
  "TRADERS",
  `${response.rows.length} trader(s) for ${token_id} over ${range} at height ${response.height}`,
);
for (const row of response.rows) {
  console.log(" ", row.join("  |  "));
}
// ========================================
// copyright 2026 by sleet.near
