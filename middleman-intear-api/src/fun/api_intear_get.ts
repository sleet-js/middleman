// ========================================
// API_INTEAR_GET
// the single fetch+log+error helper every `fun/api_intear_*` wrapper
// goes through.
// ========================================

import { INTEAR_BASE_URL } from "../stuff/intear_base_url";
import { intear_build_query } from "../stuff/intear_build_query";
import { intear_parse_error } from "../stuff/intear_parse_error";
import type { INTEAR_ENDPOINT_KEY } from "../stuff/intear_endpoint_paths";
import { INTEAR_ENDPOINT_PATHS } from "../stuff/intear_endpoint_paths";

export interface API_INTEAR_GET_PARAMS {
  key: INTEAR_ENDPOINT_KEY;
  params?: object;
  label: string;
  fallback: string;
}

export async function api_intear_get<t = unknown>({
  key,
  params = {},
  label,
  fallback,
}: API_INTEAR_GET_PARAMS): Promise<t> {
  const path = INTEAR_ENDPOINT_PATHS[key];
  const query = intear_build_query(params as Record<string, unknown>);
  const url =
    query.length > 0
      ? `${INTEAR_BASE_URL}${path}?${query}`
      : `${INTEAR_BASE_URL}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const error = await intear_parse_error(response, fallback);
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
