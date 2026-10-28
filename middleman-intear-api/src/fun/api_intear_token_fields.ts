// ========================================
// API_INTEAR_TOKEN_FIELDS
// the field names /tokens accepts, used by bins to reject a bad
// --fields value before spending a request on it.
// ========================================

import type { api_schema } from "@sleet-js/intear-api-tool-box";
import { api_intear_get } from "./api_intear_get";

export async function api_intear_token_fields(): Promise<string[]> {
  const schema = await api_intear_get<api_schema>({
    key: "api_intear_schema",
    label: "INTEAR SCHEMA GET",
    fallback: "api_intear_token_fields failed",
  });
  return schema.token_fields.map((field) => field.name);
}
// ========================================
// copyright 2026 by sleet.near
