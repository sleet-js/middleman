// ========================================
// RHEA_LIST_POOLS_BY_IDS
// runnable bin for GET /list-pools-by-ids?ids=...
// argv: rhea_list_pools_by_ids.ts <id,id,...>
// ========================================

import { api_rhea_list_pools_by_ids } from "../src";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const ids_raw = positional[0];
if (ids_raw === undefined) {
  console.error("usage: bun middleman-rhea-api/bin/rhea_list_pools_by_ids.ts <id,id,...>");
  process.exit(1);
}
const ids = ids_raw.split(",").filter((x) => x !== "").join("|");

const pools = await api_rhea_list_pools_by_ids({ ids });

console.log("POOLS", `${pools.length} returned`);
for (const p of pools) {
  console.log(" ", p.id, p.token_symbols.join("/"), "tvl=" + p.tvl);
}
// ========================================
// copyright 2026 by sleet.near
