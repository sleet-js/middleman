#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_NOTIFICATIONS_COUNT
// runnable bin for GET /v1/notifications/{account_id}/count.
// ========================================

import { api_near_social_notifications_count } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: near_social_notifications_count <account_id> [--since <ms>]",
  );
  process.exit(1);
}

const since_raw = flags.get("--since");
const since = since_raw !== undefined ? Number(since_raw) : undefined;

const result = await api_near_social_notifications_count({ account_id, since });

console.log("NOTIFICATIONS COUNT", account_id, result.count);
// ========================================
// copyright 2026 by sleet.near
