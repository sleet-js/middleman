#!/usr/bin/env bun
// ========================================
// NEAR_SOCIAL_STATUS
// runnable bin for GET /v1/status.
// ========================================

import { api_near_social_status } from "@sleet-js/middleman-near-social-api";

const status = await api_near_social_status();

console.log("STATUS", status.standard, status.chain_id);
console.log("  social_account_id:", status.social_account_id);
console.log(
  "  last_block_height:",
  status.last_block_height,
  "lag_ms:",
  status.lag_ms,
);
console.log(
  "  counts:",
  `accounts=${status.counts.accounts}`,
  `posts=${status.counts.posts}`,
  `likes=${status.counts.likes}`,
  `follows=${status.counts.follows}`,
);
// ========================================
// copyright 2026 by sleet.near
