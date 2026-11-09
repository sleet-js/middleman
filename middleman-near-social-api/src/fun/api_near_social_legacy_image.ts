// ========================================
// API_NEAR_SOCIAL_LEGACY_IMAGE
// GET /v1/legacy/{account_id}/image/{kind} — the legacy avatar or
// banner image bytes, fetched by the server.
//
// this one answers with bytes, not json, so it uses a plain fetch
// instead of api_near_social_get.
// ========================================

import { NEAR_SOCIAL_BASE_URL } from "../stuff/near_social_base_url";
import { NEAR_SOCIAL_ENDPOINT_PATHS } from "../stuff/near_social_endpoint_paths";

export type NEAR_SOCIAL_LEGACY_IMAGE_KIND = "avatar" | "banner";

export interface API_NEAR_SOCIAL_LEGACY_IMAGE_PARAMS {
  account_id: string;
  kind: NEAR_SOCIAL_LEGACY_IMAGE_KIND;
}

export async function api_near_social_legacy_image(
  params: API_NEAR_SOCIAL_LEGACY_IMAGE_PARAMS,
): Promise<ArrayBuffer> {
  const template = NEAR_SOCIAL_ENDPOINT_PATHS.near_social_legacy_image;
  const path = template
    .replace("{account_id}", encodeURIComponent(params.account_id))
    .replace("{kind}", encodeURIComponent(params.kind));
  const url = `${NEAR_SOCIAL_BASE_URL}${path}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(
      `api_near_social_legacy_image failed: ${response.status}: ${response.statusText}${detail.length > 0 ? `: ${detail.slice(0, 300)}` : ""}`,
    );
    error.name = "NEAR_SOCIAL_API_ERROR";
    console.log("=============================");
    console.log(" NEAR SOCIAL LEGACY IMAGE FAILED on:", url);
    console.log(
      "RESPONSE STATUS:",
      `${response.status} - ${response.statusText}`,
    );
    console.log("ERROR:", error.message);
    console.log("=============================");
    throw error;
  }

  const buffer = await response.arrayBuffer();
  console.log("=============================");
  console.log(" NEAR SOCIAL LEGACY IMAGE via GET on:", url);
  console.log(
    "RESPONSE STATUS:",
    `${response.status} - ${response.statusText}`,
  );
  console.log("RESPONSE BYTES:", buffer.byteLength);
  console.log("=============================");
  return buffer;
}
// ========================================
// copyright 2026 by sleet.near
