#!/usr/bin/env bun
// ========================================
// FASTDATA_KV_LATEST_CONTRACT
// runnable bin for POST /v0/latest/{current_account_id}
// argv: fastdata_kv_latest_contract.ts <current_account_id> [--key k | --key-prefix p] [--limit n] [--page-token t] [--asc] [--metadata] [--network mainnet|testnet]
// ========================================

import { api_fastdata_kv_latest_contract } from "@sleet-js/middleman-fastdata-kv-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags, seen } = split_argv(process.argv.slice(2), {
  boolean_flags: ["--asc", "--metadata"],
});

const current_account_id = positional[0];
if (current_account_id === undefined) {
  console.error(
    "usage: bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_contract.ts <current_account_id> [--key k | --key-prefix p] [--limit n] [--page-token t] [--asc] [--metadata] [--network mainnet|testnet]",
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

const res = await api_fastdata_kv_latest_contract({
  current_account_id,
  network,
  body: {
    key: flags.get("--key"),
    key_prefix: flags.get("--key-prefix"),
    limit,
    page_token,
    asc: seen.has("--asc"),
    include_metadata: seen.has("--metadata"),
  },
});

console.log("LATEST CONTRACT", `${res.entries.length} entry(s)`);
for (const entry of res.entries) {
  console.log(
    " ",
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
