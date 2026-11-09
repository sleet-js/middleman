#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_POSTS_BATCH
// runnable bin for POST /v1/posts/batch.
// ========================================

import { api_near_social_posts_batch } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

// the keys come in as one comma separated argument.
const keys = (positional[0] ?? "")
  .split(",")
  .map((k) => k.trim())
  .filter((k) => k.length > 0);

if (keys.length === 0) {
  console.error(
    "usage: near_social_posts_batch <account_id/post_id,account_id/post_id,...> [--viewer <account_id>]",
  );
  process.exit(1);
}

const viewer = flags.get("--viewer");

const batch = await api_near_social_posts_batch({ keys, viewer });

console.log("POSTS BATCH", `${batch.items.length} of ${keys.length} keys`);
for (let i = 0; i < batch.items.length; i++) {
  const post = batch.items[i];
  const key = keys[i] ?? "?";
  if (post === null || post === undefined) {
    console.log(" ", key, "missing");
    continue;
  }
  console.log(" ", post.key, `by ${post.author.account_id}`);
  console.log("   ", post.text.slice(0, 120));
}
// ========================================
// copyright 2026 by sleet.near
