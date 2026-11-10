// ========================================
// PROTOCOL_PAWNS_PARSE_ERROR
// turn a non-2xx protocol pawns response into a thrown Error. the api
// answers failures with `{ "error": "..." }`, sometimes with an extra
// `message`.
// ========================================

const is_record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface PROTOCOL_PAWNS_API_ERROR extends Error {
  status: number;
}

export async function protocol_pawns_parse_error(
  response: Response,
  fallback: string,
): Promise<PROTOCOL_PAWNS_API_ERROR> {
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  const detail =
    is_record(parsed) && typeof parsed["message"] === "string"
      ? parsed["message"]
      : is_record(parsed) && typeof parsed["error"] === "string"
        ? parsed["error"]
        : null;

  const message = detail ?? response.statusText ?? `HTTP ${response.status}`;

  const error = new Error(
    `${fallback}: ${message}`,
  ) as PROTOCOL_PAWNS_API_ERROR;
  error.name = "PROTOCOL_PAWNS_API_ERROR";
  error.status = response.status;
  return error;
}
// ========================================
// copyright 2026 by sleet.near
