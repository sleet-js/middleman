#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_INFO
// runnable bin for GET /info — the last indexed block height
// argv: protocol_pawns_info.ts
//
// NOTE: this endpoint is broken on the live api right now, it answers
// with a postgres type error. the bin reports that as it is.
// ========================================

import { api_protocol_pawns_info } from "@sleet-js/middleman-protocol-pawns-api";

try {
  const res = await api_protocol_pawns_info({});
  console.log("INFO last indexed block", res.lastBlockHeight);
} catch (e) {
  console.log("INFO failed:", e instanceof Error ? e.message : e);
}
// ========================================
// copyright 2026 by sleet.near
