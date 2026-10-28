// ========================================
// RHEA_LIST_POOLS_BY_TOKENS
// runnable bin for GET /list-pools-by-tokens?token0=...&token1=...
// argv: rhea_list_pools_by_tokens.ts <token0> <token1>
// ========================================

import { api_rhea_list_pools_by_tokens } from "../src";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const token0 = positional[0];
const token1 = positional[1];
if (token0 === undefined || token1 === undefined) {
  console.error("usage: bun middleman-rhea-api/bin/rhea_list_pools_by_tokens.ts <token0> <token1>");
  process.exit(1);
}

const pools = await api_rhea_list_pools_by_tokens({ token0, token1 });

console.log("POOLS", `${pools.length} returned`);
for (const p of pools) {
  console.log(" ", p.id, p.token_symbols.join("/"), "tvl=" + p.tvl);
}
// ========================================
// copyright 2026 by sleet.near
