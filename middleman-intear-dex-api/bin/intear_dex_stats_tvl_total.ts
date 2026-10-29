// ========================================
// INTEAR_DEX_STATS_TVL_TOTAL
// runnable bin for GET /stats/tvl/total/{period}. the middleman logs
// the framed request + response, so this bin only adds a one-line
// summary.
//
// argv:
//   bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts <period>
//
// periods: day | week | month | year | total
//
// examples:
//   bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts day
//   bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts month
// ========================================

import { api_intear_dex_stats_tvl_total } from "../src";
import { split_argv } from "./fun/split_argv";
import { check_period } from "./fun/check_period";

// --- argv ----------------------------------------------------------
const { positional } = split_argv(process.argv.slice(2));

const period_raw = positional[0];
if (period_raw === undefined) {
  console.error(
    "usage: bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts " +
      "<day|week|month|year|total>",
  );
  process.exit(1);
}
const period = check_period(period_raw, "<period>");

// --- call ----------------------------------------------------------
const points = await api_intear_dex_stats_tvl_total(period);

// --- summary -------------------------------------------------------
console.log("TVL", `${points.length} point(s) for period=${period}`);
for (const point of points) {
  console.log(" ", point.timestamp, point.tvl_usd);
}
// ========================================
// copyright 2026 by sleet.near
