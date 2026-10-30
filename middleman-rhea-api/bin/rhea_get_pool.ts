// ========================================
// RHEA_GET_POOL
// runnable bin for GET /get-pool?pool_id=...
// argv: rhea_get_pool.ts <pool_id>
// ========================================

import { api_rhea_get_pool } from "../src";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const pool_id = positional[0];
if (pool_id === undefined) {
  console.error("usage: bun middleman-rhea-api/bin/rhea_get_pool.ts <pool_id>");
  process.exit(1);
}

const pool = await api_rhea_get_pool({ pool_id });

console.log(
  "POOL",
  pool.id,
  pool.token_symbols.join("/"),
  "tvl=" + pool.tvl,
  "fee=" + pool.total_fee,
);
console.log(JSON.stringify(pool, null, 2));
// ========================================
// copyright 2026 by sleet.near
