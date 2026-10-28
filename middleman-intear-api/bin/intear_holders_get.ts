// ========================================
// INTEAR_HOLDERS_GET
// runnable bin for GET /holders via middleman/intear. the middleman
// logs the framed request + response, so this bin only adds a
// one-line summary.
//
// argv:
//   bun middleman-intear-api/bin/intear_holders_get.ts <token_id> [--limit n] [--cursor c]
//
// examples:
//   bun middleman-intear-api/bin/intear_holders_get.ts wrap.near
//   bun middleman-intear-api/bin/intear_holders_get.ts wrap.near --limit 20
//   bun middleman-intear-api/bin/intear_holders_get.ts wrap.near --cursor eyJ...   # next page
// ========================================

import { api_intear_holders_get } from "../src";
import { split_argv } from "./fun/split_argv";
import { check_limit } from "./fun/check_limit";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const token_id = positional[0];
if (token_id === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_holders_get.ts <token_id> [--limit n] [--cursor c]",
  );
  process.exit(1);
}

const limit_raw = flags.get("--limit");
// --- WHY --- the api caps a holders page at 100 rows, so a larger
// limit is a 400 rather than a bigger page.
const limit = check_limit(limit_raw, { min: 1, max: 100 });

const response = await api_intear_holders_get({
  token: token_id,
  limit,
  cursor: flags.get("--cursor"),
});

// --- summary -------------------------------------------------------
console.log(
  "HOLDERS",
  `${response.rows.length} of ${response.total} holder(s) at height ${response.height}`,
);
for (const row of response.rows) {
  console.log(" ", row.join("  |  "));
}
if (response.next_cursor !== null) {
  console.log(" next cursor:", response.next_cursor);
}
// ========================================
// copyright 2026 by sleet.near
