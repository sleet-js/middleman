#!/usr/bin/env bun
// ========================================
// FASTDATA_KV_LATEST_KEY
// runnable bin for GET /v0/latest/{current_account_id}/{predecessor_id}/{key}
// argv: fastdata_kv_latest_key.ts <current_account_id> <predecessor_id> <key> [--network mainnet|testnet]
// ========================================

import { api_fastdata_kv_latest_key } from "@sleet-js/middleman-fastdata-kv-api";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const current_account_id = positional[0];
const predecessor_id = positional[1];
const key = positional[2];

if (
  current_account_id === undefined ||
  predecessor_id === undefined ||
  key === undefined
) {
  console.error(
    "usage: bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_key.ts <current_account_id> <predecessor_id> <key> [--network mainnet|testnet]",
  );
  process.exit(1);
}

const network_raw = flags.get("--network");
const network =
  network_raw === "mainnet" || network_raw === "testnet"
    ? network_raw
    : "mainnet";

const res = await api_fastdata_kv_latest_key({
  current_account_id,
  predecessor_id,
  key,
  network,
});

console.log("LATEST KEY", `${res.entries.length} entry(s)`);
for (const entry of res.entries) {
  console.log(
    " ",
    entry.predecessor_id,
    entry.key,
    "block=" + entry.block_height,
    "value=" + JSON.stringify(entry.value),
  );
}
// ========================================
// copyright 2026 by sleet.near
