#!/usr/bin/env bun
// ========================================
// RHEA_ALL_POOL_DATA
// runnable bin for GET /all-pool-data — the dex's own tvl and 24h
// volume over every indexed pool.
// ========================================

import { api_rhea_all_pool_data } from "@sleet-js/middleman-rhea-api";

const response = await api_rhea_all_pool_data();
const data = response.data;
if (data === undefined) {
  console.log("NO DATA", response);
} else {
  console.log("TVL", Number(data.tvl).toFixed(2));
  console.log("VOLUME 24H", Number(data.volume_24h).toFixed(2));
}
// ========================================
// copyright 2026 by sleet.near
