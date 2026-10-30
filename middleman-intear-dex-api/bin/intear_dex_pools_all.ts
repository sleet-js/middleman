#!/usr/bin/env bun
// ========================================
// INTEAR_DEX_POOLS_ALL
// runnable bin for GET /pools/all. the middleman logs the framed
// request + response, so this bin only adds a one-line summary.
//
// argv:
//   bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts [--account-id id]
//       [--kind Public|Private|Launch|LaunchV2] [--asset id] [--limit n]
//
// examples:
//   bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts
//   bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --kind LaunchV2
//   bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --asset near --limit 10
//   bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --top-tvl 10
//
// NOTE: --account-id is sent to the api, but the api does NOT actually
// filter on it — the response comes back the same either way. the bin
// filters locally so the flag still does what it says.
// ========================================

import { api_intear_dex_pools_all } from "@sleet-js/middleman-intear-dex-api";
import type { INTEAR_DEX_POOL } from "@sleet-js/middleman-intear-dex-api";
import { split_argv } from "./fun/split_argv";
import { pool_asset_ids, pool_kind } from "./fun/pool_asset_ids";

// --- argv ----------------------------------------------------------
const { flags } = split_argv(process.argv.slice(2));

const account_id = flags.get("--account-id");
const kind = flags.get("--kind");
const asset = flags.get("--asset");
const limit_raw = flags.get("--limit");
const top_tvl_raw = flags.get("--top-tvl");

const limit = limit_raw !== undefined ? Number(limit_raw) : undefined;
const top_tvl = top_tvl_raw !== undefined ? Number(top_tvl_raw) : undefined;

// --- call ----------------------------------------------------------
let pools = await api_intear_dex_pools_all(
  account_id !== undefined ? { accountId: account_id } : {},
);

// --- local filters -------------------------------------------------
if (kind !== undefined) {
  pools = pools.filter((pool) => pool_kind(pool) === kind);
}
if (asset !== undefined) {
  pools = pools.filter((pool) => pool_asset_ids(pool).includes(asset));
}
if (top_tvl !== undefined) {
  pools = [...pools].sort(
    (a, b) => Number(b.liquidity_usd) - Number(a.liquidity_usd),
  );
}
if (limit !== undefined) {
  pools = pools.slice(0, limit);
}

// --- summary -------------------------------------------------------
console.log("POOLS", `${pools.length} pool(s)`);
for (const pool of pools as INTEAR_DEX_POOL[]) {
  console.log(
    " ",
    `id=${pool.id}`,
    `kind=${pool_kind(pool)}`,
    `assets=${pool_asset_ids(pool).join(",")}`,
    `tvl=${pool.liquidity_usd}`,
    `vol24h=${pool.volume_24h_usd}`,
    `apy=${pool.apy}`,
  );
}
// ========================================
// copyright 2026 by sleet.near
