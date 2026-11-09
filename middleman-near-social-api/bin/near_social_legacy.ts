#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_LEGACY
// runnable bin for GET /v1/legacy/{account_id}.
// ========================================

import { api_near_social_legacy } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const account_id = positional[0];
if (account_id === undefined) {
  console.error("usage: near_social_legacy <account_id>");
  process.exit(1);
}

const legacy = await api_near_social_legacy({ account_id });

console.log("LEGACY", legacy.account_id);
console.log("  exists:", legacy.exists);
console.log("  name:", legacy.profile?.name ?? "none");
console.log("  about:", legacy.profile?.about ?? "none");
console.log("  location:", legacy.profile?.location ?? "none");
console.log("  links:", JSON.stringify(legacy.profile?.links ?? {}));
console.log("  avatar:", legacy.avatar?.proxy_url ?? "none");
console.log("  banner:", legacy.banner?.proxy_url ?? "none");
console.log("  follows:", legacy.follows.length);
console.log(
  "  follows_on_network:",
  legacy.follows_on_network,
  "already_following:",
  legacy.already_following,
);
// ========================================
// copyright 2026 by sleet.near
