#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_STATS
// runnable bin for GET /stats
// argv: protocol_pawns_stats.ts
// ========================================

import { api_protocol_pawns_stats } from "@sleet-js/middleman-protocol-pawns-api";

const res = await api_protocol_pawns_stats({});

console.log("STATS");
console.log(" total games   ", res.total_games);
console.log(" active games  ", res.active_games);
console.log(" finished games", res.finished_games);
console.log(" cancelled     ", res.cancelled_games);
console.log(" total moves   ", res.total_moves);
// ========================================
// copyright 2026 by sleet.near
