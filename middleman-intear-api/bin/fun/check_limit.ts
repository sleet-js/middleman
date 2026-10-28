// ========================================
// CHECK_LIMIT
// bin primitive that checks a --limit value against the range the
// endpoint accepts, so a too-large limit fails with a usage line
// instead of a raw 400 from the server.
//
// the ranges come from the Intear docs, and are per-endpoint:
//   tokens.search  1..100
//   holders        1..100
//   accounts.search 1..50
//   trades/transfers 1..200
//   positions      1..1000
//
// WHY a helper and not a check in each bin: the same eight bins ask
// for a limit, and they must agree on the range or the same number
// would be fine in one bin and a 400 in the next.
// ========================================

export interface CHECK_LIMIT_RANGE {
  min: number;
  max: number;
}

export function check_limit(
  raw: string | undefined,
  range: CHECK_LIMIT_RANGE,
  flag: string = "--limit",
): number | undefined {
  if (raw === undefined) return undefined;

  const value = Number(raw);
  if (!Number.isInteger(value) || value < range.min || value > range.max) {
    console.error(`${flag} must be an integer ${range.min}..${range.max}`);
    process.exit(1);
  }
  return value;
}
// ========================================
// copyright 2026 by sleet.near
