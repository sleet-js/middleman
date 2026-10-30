// ========================================
// CHECK_PERIOD
// bin primitive that checks a period value against the set the dex
// backend accepts, so a bad period fails with a usage line instead of
// a raw 400 from the server.
//
// the api answers anything else with:
//   "Invalid period. Expected day|week|month|year|total"
// ========================================

import { INTEAR_DEX_PERIODS } from "../../src";
import type { INTEAR_DEX_PERIOD } from "../../src";

export function check_period(
  raw: string | undefined,
  flag: string = "--period",
): INTEAR_DEX_PERIOD {
  if (raw === undefined) {
    console.error(
      `${flag} is required, expected one of ${INTEAR_DEX_PERIODS.join(", ")}`,
    );
    process.exit(1);
  }

  if (!(INTEAR_DEX_PERIODS as readonly string[]).includes(raw)) {
    console.error(
      `invalid ${flag} "${raw}", expected one of ${INTEAR_DEX_PERIODS.join(", ")}`,
    );
    process.exit(1);
  }
  return raw as INTEAR_DEX_PERIOD;
}
// ========================================
// copyright 2026 by sleet.near
