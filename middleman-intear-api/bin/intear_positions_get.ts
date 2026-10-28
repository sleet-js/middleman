// ========================================
// INTEAR_POSITIONS_GET
// runnable bin for GET /positions via middleman/intear. the middleman
// logs the framed request + response, so this bin only adds a
// one-line summary.
//
// argv:
//   bun middleman-intear-api/bin/intear_positions_get.ts <account_id> [--limit n]
//
// examples:
//   bun middleman-intear-api/bin/intear_positions_get.ts sleet.near
//   bun middleman-intear-api/bin/intear_positions_get.ts sleet.near --limit 50
// ========================================

import { api_intear_positions_get } from "../src";
import { split_argv } from "./fun/split_argv";
import { check_limit } from "./fun/check_limit";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-intear-api/bin/intear_positions_get.ts <account_id> [--limit n]",
  );
  process.exit(1);
}

const limit_raw = flags.get("--limit");
const limit = check_limit(limit_raw, { min: 1, max: 1000 });

const response = await api_intear_positions_get({
  account: account_id,
  limit,
});

// --- summary -------------------------------------------------------
console.log(
  "POSITIONS",
  `${response.rows.length} position(s) for ${account_id} at height ${response.height}`,
);
for (const row of response.rows) {
  console.log(" ", row.join("  |  "));
}
// ========================================
// copyright 2026 by sleet.near
