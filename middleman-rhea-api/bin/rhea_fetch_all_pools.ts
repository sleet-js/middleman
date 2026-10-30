#!/usr/bin/env bun
// ========================================
// RHEA_FETCH_ALL_POOLS
// runnable bin for GET /fetchAllPools.
// ========================================

import { api_rhea_fetch_all_pools } from "@sleet-js/middleman-rhea-api";

const pools = await api_rhea_fetch_all_pools();

console.log(
  "POOLS",
  `simple=${pools.simplePools.length} stable=${pools.unRatedPools.length} rated=${pools.ratedPools.length} block=${pools.block_number}`,
);
for (const p of pools.simplePools.slice(0, 10)) {
  console.log(" ", p.id, (p.tokenIds || []).join("/"));
}
// ========================================
// copyright 2026 by sleet.near
