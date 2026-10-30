// ========================================
// RHEA_PARSE_ERROR
// turn a non-2xx rhea response into a thrown Error. rhea answers
// failures with `{ "code": <number>, "msg": <string>, "data": ... }`
// and 404s with an html page.
// ========================================

const is_record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface RHEA_API_ERROR extends Error {
  status: number;
  code: number | string;
}

export async function rhea_parse_error(
  response: Response,
  fallback: string,
): Promise<RHEA_API_ERROR> {
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  const code =
    is_record(parsed) && typeof parsed["code"] === "number"
      ? parsed["code"]
      : response.status;
  const message =
    is_record(parsed) && typeof parsed["msg"] === "string"
      ? parsed["msg"]
      : response.statusText || `HTTP ${response.status}`;

  const error = new Error(`${fallback}: ${code}: ${message}`) as RHEA_API_ERROR;
  error.name = "RHEA_API_ERROR";
  error.status = response.status;
  error.code = code;
  return error;
}
// ========================================
// copyright 2026 by sleet.near
