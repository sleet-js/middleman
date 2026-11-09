// ========================================
// NEAR_SOCIAL_BUILD_QUERY
// turn a params object into a near.social query string. the api uses
// ordinary url params, so this is a thin wrapper; kept as its own
// module so the encoding lives in one place.
//
// `viewer` is sent as a plain string, never expanded into an object.
// `limit` and `cursor` are numbers and strings and pass through as
// they are.
// ========================================

function encode_scalar(value: unknown): string {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number")
    return Number.isFinite(value) ? String(value) : "";
  if (value === null || value === undefined) return "";
  return String(value);
}

export function near_social_build_query(
  params: Record<string, unknown>,
): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      const csv = value
        .filter((v) => v !== undefined && v !== null)
        .map((v) => encode_scalar(v))
        .join(",");
      if (csv.length > 0) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(csv)}`);
      }
      continue;
    }

    const scalar = encode_scalar(value);
    if (scalar.length > 0 || typeof value === "string") {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(scalar)}`);
    }
  }

  return parts.join("&");
}
// ========================================
// copyright 2026 by sleet.near
