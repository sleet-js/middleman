// ========================================
// API_RHEA_GET
// the single fetch+log+error helper every `fun/api_rhea_*` wrapper
// goes through. it lives in stuff/ next to the other shared plumbing.
// ========================================

import { RHEA_BASE_URL } from "./rhea_base_url";
import { rhea_build_query } from "./rhea_build_query";
import { rhea_parse_error } from "./rhea_parse_error";
import type { RHEA_ENDPOINT_KEY } from "./rhea_endpoint_paths";
import { RHEA_ENDPOINT_PATHS } from "./rhea_endpoint_paths";

export interface API_RHEA_GET_PARAMS {
  key: RHEA_ENDPOINT_KEY;
  params?: object;
  label: string;
  fallback: string;
}

export async function api_rhea_get<t = unknown>({
  key,
  params = {},
  label,
  fallback,
}: API_RHEA_GET_PARAMS): Promise<t> {
  const path = RHEA_ENDPOINT_PATHS[key];
  const query = rhea_build_query(params as Record<string, unknown>);
  const url =
    query.length > 0
      ? `${RHEA_BASE_URL}${path}?${query}`
      : `${RHEA_BASE_URL}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const error = await rhea_parse_error(response, fallback);
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
