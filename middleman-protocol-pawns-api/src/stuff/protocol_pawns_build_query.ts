// ========================================
// PROTOCOL_PAWNS_BUILD_QUERY
// build the query string for the endpoints that take one. undefined
// values are dropped, so an optional filter simply stays out of the
// url.
// ========================================

export type PROTOCOL_PAWNS_QUERY_VALUE = string | number | boolean;

export interface PROTOCOL_PAWNS_BUILD_QUERY_PARAMS {
  query?: Record<string, PROTOCOL_PAWNS_QUERY_VALUE | undefined>;
}

export function protocol_pawns_build_query({
  query = {},
}: PROTOCOL_PAWNS_BUILD_QUERY_PARAMS): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    parts.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );
  }

  return parts.length > 0 ? `?${parts.join("&")}` : "";
}
// ========================================
// copyright 2026 by sleet.near
