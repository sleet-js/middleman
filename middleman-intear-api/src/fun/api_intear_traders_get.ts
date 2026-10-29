// ========================================
// API_INTEAR_TRADERS_GET
// GET /traders — a token's top traders by profit over a time range.
// ========================================

import type {
  traders_get_params,
  traders_get_response,
} from "@sleet-js/intear-api-tool-box";
import { api_intear_get } from "../stuff/api_intear_get";

export async function api_intear_traders_get(
  params: traders_get_params,
): Promise<traders_get_response> {
  return api_intear_get<traders_get_response>({
    key: "api_intear_traders",
    params,
    label: "INTEAR TRADERS GET",
    fallback: "api_intear_traders_get failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
