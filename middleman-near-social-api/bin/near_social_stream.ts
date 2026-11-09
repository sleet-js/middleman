#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_STREAM
// runnable bin for GET /v1/stream — the server-sent-events block
// stream. it prints the events it receives until the timeout.
// ========================================

import {
  api_near_social_stream,
  api_near_social_stream_events,
} from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const seconds_raw = flags.get("--seconds");
const seconds = seconds_raw !== undefined ? Number(seconds_raw) : 10;

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), seconds * 1000);

const response = await api_near_social_stream();

const events = await api_near_social_stream_events({
  response,
  signal: controller.signal,
  on_event: (event) => {
    console.log(
      " BLOCK",
      event.block_height,
      `txs=${event.tx_hashes.length}`,
      `posts=${event.posts.length}`,
      `accounts=${event.accounts.length}`,
    );
  },
});

clearTimeout(timer);

console.log("STREAM", `${events.length} events in ${seconds}s`);
// ========================================
// copyright 2026 by sleet.near
