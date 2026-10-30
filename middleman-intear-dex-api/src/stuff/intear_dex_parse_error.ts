// ========================================
// INTEAR_DEX_PARSE_ERROR
// turn a non-2xx intear dex response into a thrown Error. this api
// answers failures with a plain-text body (serde query errors), not
// json, so the body text is the message.
// ========================================

export interface INTEAR_DEX_API_ERROR extends Error {
  status: number;
}

export async function intear_dex_parse_error(
  response: Response,
  fallback: string,
): Promise<INTEAR_DEX_API_ERROR> {
  const text = (await response.text()).trim();
  const message =
    text.length > 0 ? text : response.statusText || `HTTP ${response.status}`;

  const error = new Error(
    `${fallback}: ${response.status}: ${message}`,
  ) as INTEAR_DEX_API_ERROR;
  error.name = "INTEAR_DEX_API_ERROR";
  error.status = response.status;
  return error;
}
// ========================================
// copyright 2026 by sleet.near
