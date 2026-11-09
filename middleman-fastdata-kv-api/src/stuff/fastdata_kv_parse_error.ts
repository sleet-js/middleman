// ========================================
// FASTDATA_KV_PARSE_ERROR
// turn a non-2xx fastdata kv response into a thrown Error. the api
// answers failures with `{ "error": "description" }`.
// ========================================

const is_record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface FASTDATA_KV_API_ERROR extends Error {
  status: number;
}

export async function fastdata_kv_parse_error(
  response: Response,
  fallback: string,
): Promise<FASTDATA_KV_API_ERROR> {
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  const message =
    is_record(parsed) && typeof parsed["error"] === "string"
      ? parsed["error"]
      : response.statusText || `HTTP ${response.status}`;

  const error = new Error(`${fallback}: ${message}`) as FASTDATA_KV_API_ERROR;
  error.name = "FASTDATA_KV_API_ERROR";
  error.status = response.status;
  return error;
}
// ========================================
// copyright 2026 by sleet.near
