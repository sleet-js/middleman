// ========================================
// INTEAR_TOKENS_SEARCH
// runnable bin for GET /tokens/search via middleman/intear.
//
// argv:
//   bun middleman-intear-api/bin/intear_tokens_search.ts <q> [--fields a,b] [--limit n]
//       [--holder account.near] [--parent token] [--min-reputation r]
//
// examples:
//   bun middleman-intear-api/bin/intear_tokens_search.ts wnear
//   bun middleman-intear-api/bin/intear_tokens_search.ts 'wrapped near' --fields symbol,price_usd --limit 10
//   bun middleman-intear-api/bin/intear_tokens_search.ts '' --holder sleet.near --limit 10
// ========================================

import type { token_requested_field } from "@sleet-js/intear-api-tool-box";
import { api_intear_tokens_search } from "../src";
import { split_argv } from "./fun/split_argv";
import { check_limit } from "./fun/check_limit";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

// q is required but may legitimately be an empty string, so presence
// of the positional is the check, not its truthiness.
if (positional.length === 0) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_tokens_search.ts <q> [--fields a,b] [--limit n] " +
      "[--holder account.near] [--parent token] [--min-reputation r]",
  );
  process.exit(1);
}

const q = positional[0] ?? "";

// --- WHY --- `account_id` is not in the selectable field list on any
// endpoint: it is always the row's leading column, returned whether
// or not it is asked for. defaulting to it here would 400.
const requested = flags.get("--fields")?.split(",") ?? ["symbol", "price_usd"];

const limit_raw = flags.get("--limit");
// --- WHY --- the api caps tokens.search at 100 rows, so a larger
// limit is a 400 rather than a bigger page.
const limit = check_limit(limit_raw, { min: 1, max: 100 });

const response = await api_intear_tokens_search({
  q,
  fields: requested as token_requested_field[],
  limit,
  holder: flags.get("--holder"),
  parent: flags.get("--parent"),
  min_reputation: flags.get("--min-reputation") as never,
});

console.log(
  "TOKENS SEARCH",
  `${response.rows.length} row(s) at height ${response.height}`,
);
for (const row of response.rows) {
  console.log(" ", row.join("  |  "));
}
// ========================================
// copyright 2026 by sleet.near
