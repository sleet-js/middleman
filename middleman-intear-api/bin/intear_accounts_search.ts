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

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const prefix = positional[0];
if (prefix === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_accounts_search.ts <prefix> [--limit n]",
  );
  process.exit(1);
}

const limit_raw = flags.get("--limit");

const response = await api_intear_accounts_search({
  prefix,
  limit: limit_raw !== undefined ? Number(limit_raw) : undefined,
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
