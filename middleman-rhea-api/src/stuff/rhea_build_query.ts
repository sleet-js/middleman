// ========================================
// RHEA_BUILD_QUERY
// turn a params object into a rhea query string. rhea uses ordinary
// url params, so this is a thin wrapper; kept as its own module so
// the encoding lives in one place.
// ========================================

function encode_scalar(value: unknown): string {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number")
    return Number.isFinite(value) ? String(value) : "";
  if (value === null || value === undefined) return "";
  return String(value);
}

export function rhea_build_query(params: Record<string, unknown>): string {
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

    if (typeof value === "object") {
      for (const [nested_key, nested_value] of Object.entries(
        value as Record<string, unknown>,
      )) {
        if (nested_value === undefined || nested_value === null) continue;
        parts.push(
          `${encodeURIComponent(key + "." + nested_key)}=${encodeURIComponent(
            encode_scalar(nested_value),
          )}`,
        );
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
