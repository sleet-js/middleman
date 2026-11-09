#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_FEED_GLOBAL
// runnable bin for GET /v1/feed/global.
// ========================================

import { api_near_social_feed_global } from "@sleet-js/middleman-near-social-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const limit = check_limit(flags.get("--limit"), { min: 1, max: 100 });
const viewer = flags.get("--viewer");
const cursor = flags.get("--cursor");

const page = await api_near_social_feed_global({ viewer, limit, cursor });

console.log("GLOBAL FEED", `${page.items.length} items`);
for (const item of page.items) {
  const p = item.post;
  console.log(
    " ",
    item.type,
    p.key,
    `by ${p.author.account_id}`,
    `likes=${p.counts.likes}`,
    `replies=${p.counts.replies}`,
  );
  console.log("   ", p.text.slice(0, 120));
}
console.log("NEXT CURSOR:", page.next_cursor ?? "none");
// ========================================
// copyright 2026 by sleet.near
