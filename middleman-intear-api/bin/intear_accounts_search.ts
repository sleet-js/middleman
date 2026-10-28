// ========================================
// INTEAR_ACCOUNTS_SEARCH
// runnable bin for GET /accounts/search via middleman/intear.
//
// argv:
//   bun middleman-intear-api/bin/intear_accounts_search.ts <prefix> [--limit n]
//
// examples:
//   bun middleman-intear-api/bin/intear_accounts_search.ts sleet
//   bun middleman-intear-api/bin/intear_accounts_search.ts wrap --limit 20
// ========================================

import { api_intear_accounts_search } from "../src";
import { split_argv } from "./fun/split_argv";
import { check_limit } from "./fun/check_limit";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const prefix = positional[0];
if (prefix === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_accounts_search.ts <prefix> [--limit n]",
  );
  process.exit(1);
}
// --- WHY --- the api wants 3 to 64 characters of a-z, 0-9, `.`, `_`
// and `-` for a prefix, and answers a shorter one with a 400. the
// length is checked here so the user gets the rule instead of the
// server's error.
if (prefix.length < 3 || prefix.length > 64) {
  console.error("prefix must be 3 to 64 characters");
  process.exit(1);
}

const limit_raw = flags.get("--limit");
// --- WHY --- the api caps accounts.search at 50 rows, so a larger
// limit is a 400 rather than a bigger page.
const limit = check_limit(limit_raw, { min: 1, max: 50 });

const response = await api_intear_accounts_search({
  prefix,
  limit,
});

console.log(
  "ACCOUNTS",
  `${response.rows.length} row(s) at height ${response.height}`,
);
for (const row of response.rows) {
  console.log(" ", row.join("  |  "));
}
// ========================================
// copyright 2026 by sleet.near
