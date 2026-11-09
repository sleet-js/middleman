// ========================================
// API_FASTDATA_KV_POST
// the single fetch+log+error helper every `fun/api_fastdata_kv_*_post`
// wrapper goes through. the twin of api_fastdata_kv_get.ts, for the
// endpoints whose params do not fit in a url.
// ========================================

import { fastdata_kv_parse_error } from "./fastdata_kv_parse_error";
import type { FASTDATA_KV_NETWORK } from "./fastdata_kv_network";
import { fastdata_kv_resolve_base_url } from "./fastdata_kv_network";

export interface API_FASTDATA_KV_POST_PARAMS {
  path: string;
  body?: object;
  network?: FASTDATA_KV_NETWORK;
  label: string;
  fallback: string;
}

export async function api_fastdata_kv_post<t = unknown>({
  path,
  body = {},
  network,
  label,
  fallback,
}: API_FASTDATA_KV_POST_PARAMS): Promise<t> {
  const url = `${fastdata_kv_resolve_base_url(network)}${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await fastdata_kv_parse_error(response, fallback);
    console.log("=============================");
    console.log(` ${label} FAILED on:`, url);
    console.log(
      "RESPONSE STATUS:",
      `${response.status} - ${response.statusText}`,
    );
    console.log("ERROR:", error.message);
    console.log("=============================");
    throw error;
  }

  const json = (await response.json()) as t;
  console.log("=============================");
  console.log(` ${label} via POST on:`, url);
  console.log(
    "RESPONSE STATUS:",
    `${response.status} - ${response.statusText}`,
  );
  console.log("RESPONSE:", json);
  console.log("=============================");
  return json;
}
// ========================================
// copyright 2026 by sleet.near
