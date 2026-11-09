#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_HASHTAGS_TRENDING
// runnable bin for GET /v1/hashtags/trending.
// ========================================

import { api_near_social_hashtags_trending } from "@sleet-js/middleman-near-social-api";

const page = await api_near_social_hashtags_trending();

console.log("TRENDING HASHTAGS", `${page.items.length} items`);
for (const tag of page.items) {
  console.log(" ", `#${tag.tag}`, `count=${tag.count}`);
}
// ========================================
// copyright 2026 by sleet.near
