#!/usr/bin/env bun
// ========================================
// PROTOCOL_PAWNS_EVENTS
// runnable bin for the sse stream at GET /events
// argv: protocol_pawns_events.ts <account_id> [account_id ...] [--limit n] [--timeout-ms n]
//
// prints every event the api sends for those accounts, until --limit
// events arrived or the timeout runs out. the heartbeat shows up every
// 5 seconds, so a quiet stream is still alive.
// ========================================

import { api_protocol_pawns_events } from "@sleet-js/middleman-protocol-pawns-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2));

const accounts = positional;
if (accounts.length === 0) {
  console.error(
    "usage: bun middleman-protocol-pawns-api/bin/protocol_pawns_events.ts <account_id> [account_id ...] [--limit n] [--timeout-ms n]",
  );
  process.exit(1);
}

const limit = check_limit(flags.get("--limit"), { min: 1, max: 10000 }, "--limit") ?? 20;
const timeout_ms = check_limit(
  flags.get("--timeout-ms"),
  { min: 1000, max: 3600000 },
  "--timeout-ms",
);

console.log("watching", accounts.join(", "));

const stream = await api_protocol_pawns_events({
  account_id: accounts,
  timeout_ms,
});

const started = Date.now();
let count = 0;

try {
  for await (const event of stream) {
    count++;
    const at = ((Date.now() - started) / 1000).toFixed(1);
    const data = JSON.stringify(event.event_data);
    console.log(`[${at}s] ${event.event_type}`, data.slice(0, 200));
    if (count >= limit) break;
  }
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  // the timeout is the normal way to end a quiet stream, it is not a
  // failure worth shouting about.
  if (msg.includes("timed out") || msg.includes("timeout")) {
    console.log(`\n${count} event(s), timeout reached, closed`);
  } else {
    console.log("\nstream error:", msg);
    console.log(`\n${count} event(s), closed`);
  }
} finally {
  await stream.return?.();
}
// ========================================
// copyright 2026 by sleet.near
