// ========================================
// API_PROTOCOL_PAWNS_GET
// the single fetch+log+error helper every `fun/api_protocol_pawns_*`
// wrapper goes through. it lives in stuff/ next to the other shared
// plumbing.
// ========================================

import { protocol_pawns_parse_error } from "./protocol_pawns_parse_error";
import type { PROTOCOL_PAWNS_NETWORK } from "./protocol_pawns_network";
import { protocol_pawns_resolve_base_url } from "./protocol_pawns_network";

export interface API_PROTOCOL_PAWNS_GET_PARAMS {
  path: string;
  network?: PROTOCOL_PAWNS_NETWORK;
  label: string;
  fallback: string;
}

export async function api_protocol_pawns_get<t = unknown>({
  path,
  network,
  label,
  fallback,
}: API_PROTOCOL_PAWNS_GET_PARAMS): Promise<t> {
  const url = `${protocol_pawns_resolve_base_url(network)}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const error = await protocol_pawns_parse_error(response, fallback);
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
