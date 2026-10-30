// ========================================
// RHEA_LIST_TOP_POOLS
// runnable bin for GET /list-top-pools.
// ========================================

import { api_rhea_list_top_pools } from "../src";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const limit_raw = flags.get("--limit");
const limit = limit_raw !== undefined ? Number(limit_raw) : 20;

const pools = await api_rhea_list_top_pools();

console.log(
  "TOP POOLS",
  `${pools.length} total, showing ${Math.min(limit, pools.length)}`,
);
for (const p of pools.slice(0, limit)) {
  console.log(" ", p.id, p.token_symbols.join("/"), "tvl=" + p.tvl);
}
// ========================================
// copyright 2026 by sleet.near
