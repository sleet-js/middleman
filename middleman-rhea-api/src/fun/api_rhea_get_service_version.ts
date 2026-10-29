// ========================================
// API_RHEA_GET_SERVICE_VERSION
// GET /get-service-version — indexer version string.
// ========================================

import { api_rhea_get } from "../stuff/api_rhea_get";

export async function api_rhea_get_service_version(): Promise<string> {
  return api_rhea_get<string>({
    key: "rhea_get_service_version",
    label: "RHEA GET SERVICE VERSION",
    fallback: "api_rhea_get_service_version failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
