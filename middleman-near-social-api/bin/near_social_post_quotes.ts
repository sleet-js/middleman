#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_POST_QUOTES
// runnable bin for GET /v1/posts/{account_id}/{post_id}/quotes.
// ========================================

import { api_near_social_post_quotes } from "@sleet-js/middleman-near-social-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const account_id = positional[0];
const post_id = positional[1];
if (account_id === undefined || post_id === undefined) {
  console.error(
    "usage: near_social_post_quotes <account_id> <post_id> [--limit N]",
  );
  process.exit(1);
}

const limit = check_limit(flags.get("--limit"), { min: 1, max: 100 });
const viewer = flags.get("--viewer");
const cursor = flags.get("--cursor");

const page = await api_near_social_post_quotes({
  account_id,
  post_id,
  viewer,
  limit,
  cursor,
});

console.log(
  "POST QUOTES",
  `${account_id}/${post_id}`,
  `${page.items.length} items`,
);
for (const item of page.items) {
  const p = item.post;
  console.log(" ", p.key, `by ${p.author.account_id}`);
  console.log("   ", p.text.slice(0, 120));
}
console.log("NEXT CURSOR:", page.next_cursor ?? "none");
// ========================================
// copyright 2026 by sleet.near
