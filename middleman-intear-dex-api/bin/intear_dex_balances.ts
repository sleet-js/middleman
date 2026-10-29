// ========================================
// INTEAR_DEX_BALANCES
// runnable bin for GET /balances?accountId=... . the middleman logs
// the framed request + response, so this bin only adds a one-line
// summary.
//
// argv:
//   bun middleman-intear-dex-api/bin/intear_dex_balances.ts <account_id>
//
// examples:
//   bun middleman-intear-dex-api/bin/intear_dex_balances.ts ref.huggies.near
//   bun middleman-intear-dex-api/bin/intear_dex_balances.ts sleet.near
//
// accountId is REQUIRED by the api — without it the server answers 400
// with "missing field `accountId`".
// ========================================

import { api_intear_dex_balances } from "../src";
import { split_argv } from "./fun/split_argv";

// --- argv ----------------------------------------------------------
const { positional } = split_argv(process.argv.slice(2));

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: bun middleman-intear-dex-api/bin/intear_dex_balances.ts <account_id>",
  );
  process.exit(1);
}

// --- call ----------------------------------------------------------
const response = await api_intear_dex_balances({ accountId: account_id });

// --- summary -------------------------------------------------------
const balance_entries = Object.entries(response.balances);
const fee_entries = Object.entries(response.pending_fees);

console.log(
  "BALANCES",
  `${balance_entries.length} balance(s), ${fee_entries.length} pending fee(s) for ${account_id}`,
);
for (const [asset_id, balance] of balance_entries) {
  console.log(" ", asset_id, balance);
}
if (fee_entries.length > 0) {
  console.log(" PENDING FEES");
  for (const [asset_id, fee] of fee_entries) {
    console.log(" ", asset_id, fee);
  }
}
// ========================================
// copyright 2026 by sleet.near
