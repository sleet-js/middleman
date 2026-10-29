// ========================================
// POOL_ASSET_IDS
// bin primitive that pulls the asset ids out of a pool row, whichever
// pool flavour it is. the api returns one of four serde variants and
// each one keeps its assets somewhere different:
//   Public   -> assets[]
//   Private -> assets[]
//   Launch  -> launched_asset + near_amount
//   LaunchV2 -> quote_asset + launched_asset
// ========================================

import type { INTEAR_DEX_POOL } from "../../src";

export function pool_asset_ids(pool: INTEAR_DEX_POOL): string[] {
  const body = pool.pool;

  if ("Public" in body) {
    return body.Public.assets.map((asset) => asset.asset_id);
  }
  if ("Private" in body) {
    return body.Private.assets.map((asset) => asset.asset_id);
  }
  if ("Launch" in body) {
    return ["near", body.Launch.launched_asset.asset_id];
  }
  if ("LaunchV2" in body) {
    return [
      body.LaunchV2.quote_asset.asset_id,
      body.LaunchV2.launched_asset.asset_id,
    ];
  }
  return [];
}

// the flavour name of a pool, for a one-line summary.
export function pool_kind(pool: INTEAR_DEX_POOL): string {
  const keys = Object.keys(pool.pool);
  return keys[0] ?? "Unknown";
}
// ========================================
// copyright 2026 by sleet.near
