// ========================================
// NEAR_SOCIAL_PARSE_ERROR
// turn a non-2xx near.social response into a thrown Error. the api
// answers failures with `{ "error": "not_found", "message": "..." }`
// and everything else with a plain text body.
// ========================================

const is_record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export interface NEAR_SOCIAL_API_ERROR extends Error {
  status: number;
  error: string | null;
}

export async function near_social_parse_error(
  response: Response,
  fallback: string,
): Promise<NEAR_SOCIAL_API_ERROR> {
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  const code =
    is_record(parsed) && typeof parsed["error"] === "string"
      ? parsed["error"]
      : null;
  const detail =
    is_record(parsed) && typeof parsed["message"] === "string"
      ? parsed["message"]
      : text.length > 0 && text.length < 500
        ? text
        : response.statusText || `HTTP ${response.status}`;

  const error = new Error(
    code === null
      ? `${fallback}: ${response.status}: ${detail}`
      : `${fallback}: ${code}: ${detail}`,
  ) as NEAR_SOCIAL_API_ERROR;
  error.name = "NEAR_SOCIAL_API_ERROR";
  error.status = response.status;
  error.error = code;
  return error;
}
// ========================================
// copyright 2026 by sleet.near
