// ========================================
// API_INTEAR_TOKENS_POST
// POST /tokens — the same endpoint as api_intear_tokens_get, with the
// params in a JSON body instead of the query string.
// ========================================

import type {
  token_requested_field,
  tokens_get_params,
  tokens_get_response,
} from "@sleet-js/intear-api-tool-box";
import { api_intear_post } from "../stuff/api_intear_post";

export async function api_intear_tokens_post<
  f extends readonly token_requested_field[],
>(params: tokens_get_params<f>): Promise<tokens_get_response<f>> {
  return api_intear_post<tokens_get_response<f>>({
    key: "api_intear_tokens",
    params,
    label: "INTEAR TOKENS POST",
    fallback: "api_intear_tokens_post failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
