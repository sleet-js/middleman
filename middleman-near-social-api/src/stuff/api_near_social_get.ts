// ========================================
// API_NEAR_SOCIAL_GET
// the single fetch+log+error helper every `fun/api_near_social_*`
// wrapper goes through. it lives in stuff/ next to the other shared
// plumbing.
//
// endpoint paths carry `{placeholders}`; `path_params` fills them in.
// a placeholder left empty is an error, since every endpoint here
// needs its account id.
// ========================================

import { NEAR_SOCIAL_BASE_URL } from "./near_social_base_url";
import { near_social_build_query } from "./near_social_build_query";
import type { NEAR_SOCIAL_ENDPOINT_KEY } from "./near_social_endpoint_paths";
import { NEAR_SOCIAL_ENDPOINT_PATHS } from "./near_social_endpoint_paths";
import { near_social_parse_error } from "./near_social_parse_error";

export interface API_NEAR_SOCIAL_GET_PARAMS {
  key: NEAR_SOCIAL_ENDPOINT_KEY;
  params?: object;
  path_params?: Record<string, string | number>;
  label: string;
  fallback: string;
}

// fill `{name}` placeholders in a path template.
function fill_path(
  template: string,
  path_params: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_match, name: string) => {
    const value = path_params[name];
    if (value === undefined || value === null || value === "") {
      throw new Error(
        `api_near_social_get: missing path param "${name}" for "${template}"`,
      );
    }
    return encodeURIComponent(String(value));
  });
}

export async function api_near_social_get<t = unknown>({
  key,
  params = {},
  path_params = {},
  label,
  fallback,
}: API_NEAR_SOCIAL_GET_PARAMS): Promise<t> {
  const template = NEAR_SOCIAL_ENDPOINT_PATHS[key];
  const path = fill_path(template, path_params);
  const query = near_social_build_query(params as Record<string, unknown>);
  const url =
    query.length > 0
      ? `${NEAR_SOCIAL_BASE_URL}${path}?${query}`
      : `${NEAR_SOCIAL_BASE_URL}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
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
