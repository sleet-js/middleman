#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_TX
// runnable bin for GET /v1/tx/{tx_hash}.
// ========================================

import { api_near_social_tx } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const tx_hash = positional[0];
if (tx_hash === undefined) {
  console.error("usage: near_social_tx <tx_hash>");
  process.exit(1);
}

const tx = await api_near_social_tx({ tx_hash });

console.log("TX", tx.tx_hash);
console.log("  indexed:", tx.indexed);
if (tx.block_height !== undefined)
  console.log("  block_height:", tx.block_height);
if (tx.block_ts !== undefined) console.log("  block_ts:", tx.block_ts);
if (tx.predecessor_id !== undefined)
  console.log("  predecessor_id:", tx.predecessor_id);
for (const action of tx.actions ?? []) {
  console.log("  action:", action.kind, `status=${action.status}`);
  for (const key of action.keys ?? []) {
    console.log("    key:", key.key, `status=${key.status}`, key.reason ?? "");
  }
  if (action.file !== undefined) {
    console.log(
      "    file:",
      action.file.path,
      `deleted=${action.file.deleted}`,
    );
  }
}
// ========================================
// copyright 2026 by sleet.near
