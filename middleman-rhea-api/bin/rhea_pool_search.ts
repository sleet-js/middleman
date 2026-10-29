// ========================================
// RHEA_POOL_SEARCH
// runnable bin for GET /pool/search.
// argv: rhea_pool_search.ts [--type classic|dcl|all|stable|degen|hotPools] [--sort tvl|24h] [--limit n] [--offset n]
// ========================================

import { api_rhea_pool_search } from "../src";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const type = flags.get("--type") ?? "all";
const sort = flags.get("--sort") ?? "tvl";
const limit_raw = flags.get("--limit");
const offset_raw = flags.get("--offset");

const res = await api_rhea_pool_search({
  type,
  sort,
  limit: limit_raw !== undefined ? Number(limit_raw) : 20,
  offset: offset_raw !== undefined ? Number(offset_raw) : 0,
});

const list = res.data?.list ?? [];
console.log("POOLS", `type=${type} sort=${sort} -> ${list.length} returned (total=${res.data?.total})`);
for (const p of list) {
  console.log(" ", p.id, (p.token_symbols || []).join("/"), "kind=" + p.pool_kind, "tvl=" + p.tvl);
}
// ========================================
// copyright 2026 by sleet.near
