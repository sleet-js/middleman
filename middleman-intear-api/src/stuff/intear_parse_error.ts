// ========================================
// INTEAR_PARSE_ERROR
// turn a non-2xx intear response into a thrown Error. intear answers
// failures with `{ "error": { "code", "message" } }`.
// ========================================

const is_record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface INTEAR_API_ERROR extends Error {
  status: number;
  code: string;
}

export async function intear_parse_error(
  response: Response,
  fallback: string,
): Promise<INTEAR_API_ERROR> {
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  const raw_error = is_record(parsed) ? parsed["error"] : undefined;
  const code =
    is_record(raw_error) && typeof raw_error["code"] === "string"
      ? raw_error["code"]
      : response.status === 404
        ? "not_found"
        : "internal";
  const message =
    is_record(raw_error) && typeof raw_error["message"] === "string"
      ? raw_error["message"]
      : response.statusText || `HTTP ${response.status}`;

  const error = new Error(
    `${fallback}: ${code}: ${message}`,
  ) as INTEAR_API_ERROR;
  error.name = "INTEAR_API_ERROR";
  error.status = response.status;
  error.code = code;
  return error;
}
// ========================================
// copyright 2026 by sleet.near
