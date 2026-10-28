// ========================================
// RHEA_LIST_TOKEN
// runnable bin for GET /list-token. optional --limit to cap rows.
// ========================================

import { api_rhea_list_token } from "../src";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const limit_raw = flags.get("--limit");
const limit = limit_raw !== undefined ? Number(limit_raw) : 20;

const tokens = await api_rhea_list_token();
const entries = Object.entries(tokens);

console.log("TOKENS", `${entries.length} total, showing ${Math.min(limit, entries.length)}`);
for (const [id, t] of entries.slice(0, limit)) {
  console.log(" ", id, t.symbol, t.decimals, t.name);
}
// ========================================
// copyright 2026 by sleet.near
