// ========================================
// API_INTEAR_DEX_GET
// the single fetch+log+error helper every `fun/api_intear_dex_*`
// wrapper goes through.
//
// the api is GET only — POST/PUT/DELETE/PATCH all answer 405 — and it
// needs no auth. it does send `access-control-allow-origin: *`, so a
// browser can call it cross origin as well.
// ========================================

import { INTEAR_DEX_BASE_URL } from "../stuff/intear_dex_base_url";
import { intear_dex_build_query } from "../stuff/intear_dex_build_query";
import { intear_dex_parse_error } from "../stuff/intear_dex_parse_error";
import type {
  INTEAR_DEX_ENDPOINT_KEY,
  INTEAR_DEX_PERIOD,
} from "../stuff/intear_dex_endpoint_paths";
import { INTEAR_DEX_ENDPOINT_PATHS } from "../stuff/intear_dex_endpoint_paths";

export interface API_INTEAR_DEX_GET_PARAMS {
  key: INTEAR_DEX_ENDPOINT_KEY;
  params?: object;
  period?: INTEAR_DEX_PERIOD;
  label: string;
  fallback: string;
}

// fill {period} in the endpoint path, when the route has one.
function resolve_path(
  path: string,
  period: INTEAR_DEX_PERIOD | undefined,
): string {
  if (!path.includes("{period}")) return path;
  if (period === undefined) {
    throw new Error(
      `intear_dex: endpoint "${path}" needs a period (day|week|month|year|total)`,
    );
  }
  return path.replace("{period}", period);
}

export async function api_intear_dex_get<t = unknown>({
  key,
  params = {},
  period,
  label,
  fallback,
}: API_INTEAR_DEX_GET_PARAMS): Promise<t> {
  const path = resolve_path(INTEAR_DEX_ENDPOINT_PATHS[key], period);
  const query = intear_dex_build_query(params as Record<string, unknown>);
  const url =
    query.length > 0
      ? `${INTEAR_DEX_BASE_URL}${path}?${query}`
      : `${INTEAR_DEX_BASE_URL}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const error = await intear_dex_parse_error(response, fallback);
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
