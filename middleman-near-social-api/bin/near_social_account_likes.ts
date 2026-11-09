#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_ACCOUNT_LIKES
// runnable bin for GET /v1/accounts/{account_id}/likes.
// ========================================

import { api_near_social_account_likes } from "@sleet-js/middleman-near-social-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const account_id = positional[0];
if (account_id === undefined) {
  console.error("usage: near_social_account_likes <account_id> [--limit N]");
  process.exit(1);
}

const limit = check_limit(flags.get("--limit"), { min: 1, max: 100 });
const viewer = flags.get("--viewer");
const cursor = flags.get("--cursor");

const page = await api_near_social_account_likes({
  account_id,
  viewer,
  limit,
  cursor,
});

console.log("ACCOUNT LIKES", account_id, `${page.items.length} items`);
for (const item of page.items) {
  const p = item.post;
  console.log(" ", p.key, `by ${p.author.account_id}`);
  console.log("   ", p.text.slice(0, 120));
}
console.log("NEXT CURSOR:", page.next_cursor ?? "none");
// ========================================
// copyright 2026 by sleet.near
