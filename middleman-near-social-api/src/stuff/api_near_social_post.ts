// ========================================
// API_NEAR_SOCIAL_POST
// the one POST helper every `fun/api_near_social_*_post` wrapper goes
// through. the twin of api_near_social_get.ts, for the endpoints
// whose params do not fit in a url. it lives in stuff/ next to the
// other shared plumbing.
// ========================================

import { NEAR_SOCIAL_BASE_URL } from "./near_social_base_url";
import type { NEAR_SOCIAL_ENDPOINT_KEY } from "./near_social_endpoint_paths";
import { NEAR_SOCIAL_ENDPOINT_PATHS } from "./near_social_endpoint_paths";
import { near_social_parse_error } from "./near_social_parse_error";

export interface API_NEAR_SOCIAL_POST_PARAMS {
  key: NEAR_SOCIAL_ENDPOINT_KEY;
  body?: object;
  label: string;
  fallback: string;
}

export async function api_near_social_post<t = unknown>({
  key,
  body = {},
  label,
  fallback,
}: API_NEAR_SOCIAL_POST_PARAMS): Promise<t> {
  const url = `${NEAR_SOCIAL_BASE_URL}${NEAR_SOCIAL_ENDPOINT_PATHS[key]}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await near_social_parse_error(response, fallback);
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
