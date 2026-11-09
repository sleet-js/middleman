#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_ACCOUNT
// runnable bin for GET /v1/accounts/{account_id}.
// ========================================

import { api_near_social_account } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional, flags } = split_argv(process.argv.slice(2), {
  boolean_flags: [],
});

const account_id = positional[0];
if (account_id === undefined) {
  console.error(
    "usage: near_social_account <account_id> [--viewer <account_id>]",
  );
  process.exit(1);
}

const viewer = flags.get("--viewer");

const profile = await api_near_social_account({ account_id, viewer });

console.log("ACCOUNT", profile.account_id);
console.log("  has_profile:", profile.has_profile);
console.log("  name:", profile.name ?? "none");
console.log("  about:", profile.about ?? "none");
console.log("  location:", profile.location ?? "none");
console.log("  avatar_url:", profile.avatar_url ?? "none");
console.log("  banner_url:", profile.banner_url ?? "none");
console.log("  links:", JSON.stringify(profile.links));
console.log(
  "  counts:",
  `followers=${profile.counts.followers}`,
  `following=${profile.counts.following}`,
  `posts=${profile.counts.posts}`,
);
console.log("  joined_at:", profile.joined_at ?? "none");
if (profile.viewer !== undefined) {
  console.log(
    "  viewer:",
    `following=${profile.viewer.following}`,
    `followed_by=${profile.viewer.followed_by}`,
  );
}
// ========================================
// copyright 2026 by sleet.near
