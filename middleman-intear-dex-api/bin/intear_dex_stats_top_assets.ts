// ========================================
// INTEAR_DEX_STATS_TOP_ASSETS
// runnable bin for GET /stats/top/assets/{period}. the middleman logs
// the framed request + response, so this bin only adds a one-line
// summary.
//
// argv:
//   bun middleman-intear-dex-api/bin/intear_dex_stats_top_assets.ts <period> [--limit n]
//
// periods: day | week | month | year | total
//
// examples:
//   bun middleman-intear-dex-api/bin/intear_dex_stats_top_assets.ts day
//   bun middleman-intear-dex-api/bin/intear_dex_stats_top_assets.ts month --limit 20
// ========================================

import { api_intear_dex_stats_top_assets } from "../src";
import { split_argv } from "./fun/split_argv";
import { check_period } from "./fun/check_period";

// --- argv ----------------------------------------------------------
const { positional, flags } = split_argv(process.argv.slice(2));

const period_raw = positional[0];
if (period_raw === undefined) {
  console.error(
    "usage: bun middleman-intear-dex-api/bin/intear_dex_stats_top_assets.ts " +
      "<day|week|month|year|total> [--limit n]",
  );
  process.exit(1);
}
const period = check_period(period_raw, "<period>");
const limit_raw = flags.get("--limit");
const limit = limit_raw !== undefined ? Number(limit_raw) : undefined;

// --- call ----------------------------------------------------------
const assets = await api_intear_dex_stats_top_assets(period);
const shown = limit !== undefined ? assets.slice(0, limit) : assets;

// --- summary -------------------------------------------------------
console.log("TOP ASSETS", `${shown.length} asset(s) for period=${period}`);
for (const asset of shown) {
  console.log(" ", asset.asset_id, asset.volume_usd);
}
// ========================================
// copyright 2026 by sleet.near
