// ========================================
// API_FASTDATA_KV_GET
// the single fetch+log+error helper every `fun/api_fastdata_kv_*_get`
// wrapper goes through. it lives in stuff/ next to the other shared
// plumbing.
// ========================================

import { fastdata_kv_parse_error } from "./fastdata_kv_parse_error";
import type { FASTDATA_KV_NETWORK } from "./fastdata_kv_network";
import { fastdata_kv_resolve_base_url } from "./fastdata_kv_network";

export interface API_FASTDATA_KV_GET_PARAMS {
  path: string;
  network?: FASTDATA_KV_NETWORK;
  label: string;
  fallback: string;
}

export async function api_fastdata_kv_get<t = unknown>({
  path,
  network,
  label,
  fallback,
}: API_FASTDATA_KV_GET_PARAMS): Promise<t> {
  const url = `${fastdata_kv_resolve_base_url(network)}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
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
  console.log(` ${label} via GET on:`, url);
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
