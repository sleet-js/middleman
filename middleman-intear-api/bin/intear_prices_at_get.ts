#!/usr/bin/env bun
// ========================================
// INTEAR_PRICES_AT_GET
// runnable bin for GET /prices/at via middleman/intear. the middleman
// logs the framed request + response, so this bin only adds a
// one-line summary.
//
// argv:
//   bun middleman-intear-api/bin/intear_prices_at_get.ts <token_id> [timestamp_millis]
//       [--also token_id@timestamp_millis]
//
// timestamp defaults to one hour ago, which is the common "what was
// this worth recently" case; pass an explicit millis value for an
// exact block.
//
// examples:
//   bun middleman-intear-api/bin/intear_prices_at_get.ts wrap.near
//   bun middleman-intear-api/bin/intear_prices_at_get.ts wrap.near 1767225600000
//   bun middleman-intear-api/bin/intear_prices_at_get.ts wrap.near --also usdt.tether-token.near@1767225600000
// ========================================

import { api_intear_prices_at_get } from "@sleet-js/middleman-intear-api";
import { split_argv } from "./fun/split_argv";

// --- CONFIG --------------------------------------------------------
const ONE_HOUR_MS = 60 * 60 * 1000;

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const token_id = positional[0];
if (token_id === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_prices_at_get.ts <token_id> [timestamp_millis] " +
      "[--also token_id@timestamp_millis]",
  );
  process.exit(1);
}

const timestamp_raw = positional[1];
const timestamp_millis =
  timestamp_raw !== undefined
    ? Number(timestamp_raw)
    : Date.now() - ONE_HOUR_MS;

const queries = [{ token: token_id, timestamp_millis }];
for (const extra of (flags.get("--also") ?? "")
  .split(",")
  .filter((pair) => pair !== "")) {
  const at = extra.lastIndexOf("@");
  if (at === -1) {
    console.error(
      `invalid --also pair "${extra}", expected token_id@timestamp_millis`,
    );
    process.exit(1);
  }
  queries.push({
    token: extra.slice(0, at),
    timestamp_millis: Number(extra.slice(at + 1)),
  });
}

const response = await api_intear_prices_at_get({ queries });

// --- summary -------------------------------------------------------
console.log(
  "PRICES",
  `${response.prices.length} price(s) at height ${response.height}`,
);
queries.forEach((query, index) => {
  const price = response.prices[index];
  console.log(
    ` ${query.token} @ ${query.timestamp_millis}:`,
    // null means the token does not exist; "0" means it had no price
    // yet at that time. both are valid answers, not failures.
    price === null ? "no such token" : price,
  );
});
// ========================================
// copyright 2026 by sleet.near
