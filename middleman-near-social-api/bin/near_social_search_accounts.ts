#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_SEARCH_ACCOUNTS
// runnable bin for GET /v1/search/accounts?q=.
// ========================================

import { api_near_social_search_accounts } from "@sleet-js/middleman-near-social-api";
import { check_limit } from "./fun/check_limit";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const q = positional[0];
if (q === undefined) {
  console.error("usage: near_social_search_accounts <query> [--limit N]");
  process.exit(1);
}

const limit = check_limit(flags.get("--limit"), { min: 1, max: 100 });
const viewer = flags.get("--viewer");
const cursor = flags.get("--cursor");

const page = await api_near_social_search_accounts({
  q,
  viewer,
  limit,
  cursor,
});

console.log("SEARCH ACCOUNTS", `"${q}"`, `${page.items.length} items`);
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
