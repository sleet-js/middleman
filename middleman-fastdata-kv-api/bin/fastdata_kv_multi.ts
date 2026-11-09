#!/usr/bin/env bun
// ========================================
// FASTDATA_KV_MULTI
// runnable bin for POST /v0/multi
// argv: fastdata_kv_multi.ts <current_account_id/predecessor_id/key> [...] [--metadata] [--asc] [--network mainnet|testnet]
// ========================================

import { api_fastdata_kv_multi } from "@sleet-js/middleman-fastdata-kv-api";
import { split_argv } from "./fun/split_argv";

const { positional, flags, seen } = split_argv(process.argv.slice(2), {
  boolean_flags: ["--asc", "--metadata"],
});

if (positional.length === 0) {
  console.error(
    "usage: bun middleman-fastdata-kv-api/bin/fastdata_kv_multi.ts <current_account_id/predecessor_id/key> [...] [--metadata] [--asc] [--network mainnet|testnet]",
  );
  process.exit(1);
}

if (positional.length > 100) {
  console.error("fastdata_kv_multi takes at most 100 keys");
  process.exit(1);
}

const network_raw = flags.get("--network");
const network =
  network_raw === "mainnet" || network_raw === "testnet"
    ? network_raw
    : "mainnet";

const res = await api_fastdata_kv_multi({
  network,
  body: {
    keys: positional,
    include_metadata: seen.has("--metadata"),
    asc: seen.has("--asc"),
  },
});

console.log("MULTI", `${res.entries.length} entry(s)`);
res.entries.forEach((entry, index) => {
  if (entry === null) {
    console.log(" ", index, positional[index], "not found");
    return;
  }
  console.log(
    " ",
    index,
    entry.current_account_id,
    entry.predecessor_id,
    entry.key,
    "block=" + entry.block_height,
    "value=" + JSON.stringify(entry.value),
  );
});
// ========================================
// copyright 2026 by sleet.near
