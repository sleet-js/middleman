#!/usr/bin/env bun
// ========================================
// FASTDATA_KV_HISTORY_GLOBAL
// runnable bin for POST /v0/history
// argv: fastdata_kv_history_global.ts <key> [--limit n] [--page-token t] [--asc] [--metadata] [--network mainnet|testnet]
// ========================================

import { api_fastdata_kv_history_global } from "@sleet-js/middleman-fastdata-kv-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags, seen } = split_argv(process.argv.slice(2), {
  boolean_flags: ["--asc", "--metadata"],
});

const key = positional[0];
if (key === undefined) {
  console.error(
    "usage: bun middleman-fastdata-kv-api/bin/fastdata_kv_history_global.ts <key> [--limit n] [--page-token t] [--asc] [--metadata] [--network mainnet|testnet]",
  );
  process.exit(1);
}

const network_raw = flags.get("--network");
const network =
  network_raw === "mainnet" || network_raw === "testnet"
    ? network_raw
    : "mainnet";

const limit = check_limit(flags.get("--limit"), { min: 1, max: 200 });
const page_token = flags.get("--page-token");

const res = await api_fastdata_kv_history_global({
  network,
  body: {
    key,
    limit,
    page_token,
    asc: seen.has("--asc"),
    include_metadata: seen.has("--metadata"),
  },
});

console.log("HISTORY GLOBAL", `${res.entries.length} entry(s)`);
for (const entry of res.entries) {
  console.log(
    " ",
    entry.current_account_id,
    entry.predecessor_id,
    entry.key,
    "block=" + entry.block_height,
    "value=" + JSON.stringify(entry.value),
  );
}
if (res.page_token !== undefined) {
  console.log("PAGE TOKEN", res.page_token);
}
// ========================================
// copyright 2026 by sleet.near
