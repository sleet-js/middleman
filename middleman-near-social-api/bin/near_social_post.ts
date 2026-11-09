#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_POST
// runnable bin for GET /v1/posts/{account_id}/{post_id}.
// ========================================

import { api_near_social_post } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const account_id = positional[0];
const post_id = positional[1];
if (account_id === undefined || post_id === undefined) {
  console.error(
    "usage: near_social_post <account_id> <post_id> [--viewer <account_id>]",
  );
  process.exit(1);
}

const viewer = flags.get("--viewer");

const thread = await api_near_social_post({ account_id, post_id, viewer });

console.log("THREAD", thread.post.key);
console.log("  text:", thread.post.text);
console.log(
  "  counts:",
  `likes=${thread.post.counts.likes}`,
  `replies=${thread.post.counts.replies}`,
  `reposts=${thread.post.counts.reposts}`,
  `quotes=${thread.post.counts.quotes}`,
);
console.log("  parent_missing:", thread.parent_missing);
console.log("  ancestors:", thread.ancestors.length);
for (const a of thread.ancestors) {
  console.log("   ", a.key, `by ${a.author.account_id}`);
}
// ========================================
// copyright 2026 by sleet.near
