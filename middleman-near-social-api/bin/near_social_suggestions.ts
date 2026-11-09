#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_SUGGESTIONS
// runnable bin for GET /v1/suggestions.
// ========================================

import { api_near_social_suggestions } from "@sleet-js/middleman-near-social-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const limit = check_limit(flags.get("--limit"), { min: 1, max: 100 });
const viewer = flags.get("--viewer");
const cursor = flags.get("--cursor");

const page = await api_near_social_suggestions({ viewer, limit, cursor });

console.log("SUGGESTIONS", `${page.items.length} items`);
for (const card of page.items) {
  console.log(
    " ",
    card.account_id,
    card.name ?? "",
    `followers=${card.followers}`,
  );
}
console.log("NEXT CURSOR:", page.next_cursor ?? "none");
// ========================================
// copyright 2026 by sleet.near
