#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_LEGACY_IMAGE
// runnable bin for GET /v1/legacy/{account_id}/image/{kind}.
// ========================================

import { api_near_social_legacy_image } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const account_id = positional[0];
const kind = positional[1] ?? "avatar";
if (account_id === undefined) {
  console.error("usage: near_social_legacy_image <account_id> [avatar|banner]");
  process.exit(1);
}
if (kind !== "avatar" && kind !== "banner") {
  console.error("kind must be avatar or banner");
  process.exit(1);
}

const bytes = await api_near_social_legacy_image({ account_id, kind });

console.log("LEGACY IMAGE", account_id, kind, `${bytes.byteLength} bytes`);
// ========================================
// copyright 2026 by sleet.near
