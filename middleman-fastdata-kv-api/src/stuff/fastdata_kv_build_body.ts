// ========================================
// FASTDATA_KV_BUILD_BODY
// build the json body for a post endpoint from the parts a caller
// gives us. key and key_prefix are mutually exclusive on the server;
// checking here turns a 400 into a clear message before the request
// goes out.
// ========================================

import type { FASTDATA_KV_POST_BODY } from "../types/fastdata_kv_types";

export interface FASTDATA_KV_BUILD_BODY_PARAMS {
  body?: FASTDATA_KV_POST_BODY;
  // an exact key, given at the top level for convenience.
  key?: string;
  // a prefix filter, given at the top level for convenience.
  key_prefix?: string;
}

export function fastdata_kv_build_body({
  body = {},
  key,
  key_prefix,
}: FASTDATA_KV_BUILD_BODY_PARAMS): FASTDATA_KV_POST_BODY {
  const merged: FASTDATA_KV_POST_BODY = { ...body };

  if (key !== undefined) merged.key = key;
  if (key_prefix !== undefined) merged.key_prefix = key_prefix;

  if (merged.key !== undefined && merged.key_prefix !== undefined) {
    throw new Error(
      "fastdata_kv_build_body: key and key_prefix are mutually exclusive",
    );
  }

  return merged;
}
// ========================================
// copyright 2026 by sleet.near
