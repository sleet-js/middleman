// ========================================
// RHEA_LIST_POOLS
// runnable bin for GET /list-pools.
// ========================================

import { api_rhea_list_pools } from "../src";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const type = flags.get("--type") ?? "classic";
const sort = flags.get("--sort") ?? "tvl";
const order = flags.get("--order") ?? "desc";
const limit_raw = flags.get("--limit");
const offset_raw = flags.get("--offset");
const token_type = flags.get("--token-type") ?? "all";

const pools = await api_rhea_list_pools({
  type,
  sort,
  order_by: order,
  limit: limit_raw !== undefined ? Number(limit_raw) : 20,
  offset: offset_raw !== undefined ? Number(offset_raw) : 0,
  token_type,
});

console.log("POOLS", `${pools.length} returned`);
for (const p of pools) {
  console.log(" ", p.id, p.token_symbols.join("/"), "tvl=" + p.tvl);
}
// ========================================
// copyright 2026 by sleet.near
