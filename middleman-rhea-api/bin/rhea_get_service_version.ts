// ========================================
// RHEA_GET_SERVICE_VERSION
// runnable bin for GET /get-service-version.
// ========================================

import { api_rhea_get_service_version } from "../src";

const version = await api_rhea_get_service_version();
console.log("VERSION", version);
// ========================================
// copyright 2026 by sleet.near
