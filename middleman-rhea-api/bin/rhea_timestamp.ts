// ========================================
// RHEA_TIMESTAMP
// runnable bin for GET /timestamp.
// ========================================

import { api_rhea_timestamp } from "../src";

const res = await api_rhea_timestamp();
console.log("TIMESTAMP", res.ts);
// ========================================
// copyright 2026 by sleet.near
