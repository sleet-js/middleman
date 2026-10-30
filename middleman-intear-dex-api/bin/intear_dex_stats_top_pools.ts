#!/usr/bin/env bun
// ========================================
// INTEAR_DEX_STATS_TOP_POOLS
// runnable bin for GET /stats/top/pools/{period}. the middleman logs
// the framed request + response, so this bin only adds a one-line
// summary.
//
// argv:
//   bun middleman-intear-dex-api/bin/intear_dex_stats_top_pools.ts <period> [--limit n]
//
// periods: day | week | month | year | total
//
// examples:
//   bun middleman-intear-dex-api/bin/intear_dex_stats_top_pools.ts day
//   bun middleman-intear-dex-api/bin/intear_dex_stats_top_pools.ts week --limit 10
// ========================================

import { api_intear_dex_stats_top_pools } from "@sleet-js/middleman-intear-dex-api";
import { split_argv } from "./fun/split_argv";
import { check_period } from "./fun/check_period";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const period_raw = positional[0];
if (period_raw === undefined) {
  console.error(
    "usage: bun middleman-intear-dex-api/bin/intear_dex_stats_top_pools.ts " +
      "<day|week|month|year|total> [--limit n]",
  );
  process.exit(1);
}
const period = check_period(period_raw, "<period>");
const limit_raw = flags.get("--limit");
const limit = limit_raw !== undefined ? Number(limit_raw) : undefined;

// --- call ----------------------------------------------------------
const pools = await api_intear_dex_stats_top_pools(period);
const shown = limit !== undefined ? pools.slice(0, limit) : pools;

// --- summary -------------------------------------------------------
console.log("TOP POOLS", `${shown.length} pool(s) for period=${period}`);
for (const pool of shown) {
  console.log(" ", `pool_id=${pool.pool_id}`, pool.volume_usd);
}
// ========================================
// copyright 2026 by sleet.near
