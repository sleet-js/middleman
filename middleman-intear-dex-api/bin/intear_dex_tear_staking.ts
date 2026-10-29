// ========================================
// INTEAR_DEX_TEAR_STAKING
// runnable bin for GET /tear/staking?accountId=... . the middleman logs
// the framed request + response, so this bin only adds a one-line
// summary.
//
// argv:
//   bun middleman-intear-dex-api/bin/intear_dex_tear_staking.ts [account_id]
//
// examples:
//   bun middleman-intear-dex-api/bin/intear_dex_tear_staking.ts
//   bun middleman-intear-dex-api/bin/intear_dex_tear_staking.ts ref.huggies.near
//
// accountId is optional on this route — without it the api still
// answers 200 with the pool-wide numbers.
// ========================================

import { api_intear_dex_tear_staking } from "../src";
import { split_argv } from "./fun/split_argv";

// --- argv ----------------------------------------------------------
const { positional } = split_argv(process.argv.slice(2));

const account_id = positional[0];

// --- call ----------------------------------------------------------
const response = await api_intear_dex_tear_staking(
  account_id !== undefined ? { accountId: account_id } : {},
);

// --- summary -------------------------------------------------------
const unlock_hours = Number(response.unlock_period_ns) / 3_600_000_000_000;
console.log(
  "TEAR STAKING",
  `total_locked=${response.total_locked}`,
  `unlock_period=${unlock_hours}h`,
  `account=${response.account === null ? "none" : JSON.stringify(response.account)}`,
);
// ========================================
// copyright 2026 by sleet.near
