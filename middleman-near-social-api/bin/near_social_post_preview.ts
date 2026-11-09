#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_POST_PREVIEW
// runnable bin for GET /v1/posts/{account_id}/{post_id}/preview.
// ========================================

import { api_near_social_post_preview } from "@sleet-js/middleman-near-social-api";
import { split_argv } from "./fun/split_argv";

const { positional } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const account_id = positional[0];
const post_id = positional[1];
if (account_id === undefined || post_id === undefined) {
  console.error("usage: near_social_post_preview <account_id> <post_id>");
  process.exit(1);
}

const link = await api_near_social_post_preview({ account_id, post_id });

console.log("PREVIEW", link.url);
const preview = link.preview;
if (preview === undefined) {
  console.log("  no preview yet");
} else {
  console.log("  kind:", preview.kind);
  if (preview.title !== undefined) console.log("  title:", preview.title);
  if (preview.description !== undefined)
    console.log("  description:", preview.description);
  if (preview.site_name !== undefined)
    console.log("  site_name:", preview.site_name);
  if (preview.image !== undefined) console.log("  image:", preview.image);
  if (preview.video_id !== undefined)
    console.log("  video_id:", preview.video_id);
  if (preview.artist !== undefined) console.log("  artist:", preview.artist);
}
// ========================================
// copyright 2026 by sleet.near
