// ========================================
// API_INTEAR_POST
// the one POST helper every `fun/api_intear_*_post` wrapper goes
// through. the twin of api_intear_get.ts, for the endpoints whose
// params do not fit in a url.
// ========================================

import { INTEAR_BASE_URL } from "../stuff/intear_base_url";
import { intear_parse_error } from "../stuff/intear_parse_error";
import type { INTEAR_ENDPOINT_KEY } from "../stuff/intear_endpoint_paths";
import { INTEAR_ENDPOINT_PATHS } from "../stuff/intear_endpoint_paths";

export interface API_INTEAR_POST_PARAMS {
  key: INTEAR_ENDPOINT_KEY;
  params?: object;
  label: string;
  fallback: string;
}

export async function api_intear_post<t = unknown>({
  key,
  params = {},
  label,
  fallback,
}: API_INTEAR_POST_PARAMS): Promise<t> {
  const path = INTEAR_ENDPOINT_PATHS[key];
  const url = `${INTEAR_BASE_URL}${path}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
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
