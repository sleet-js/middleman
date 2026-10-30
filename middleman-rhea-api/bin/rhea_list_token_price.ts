// ========================================
// RHEA_LIST_TOKEN_PRICE
// runnable bin for GET /list-token-price.
// ========================================

import { api_rhea_list_token_price } from "../src";
import { split_argv } from "./fun/split_argv";

const { flags } = split_argv(process.argv.slice(2), { boolean_flags: [] });

const limit_raw = flags.get("--limit");
const limit = limit_raw !== undefined ? Number(limit_raw) : 20;

const prices = await api_rhea_list_token_price();
const entries = Object.entries(prices);

console.log(
  "TOKEN PRICES",
  `${entries.length} total, showing ${Math.min(limit, entries.length)}`,
);
for (const [id, p] of entries.slice(0, limit)) {
  console.log(" ", id, p.symbol, p.price, "decimals=" + p.decimal);
}
// ========================================
// copyright 2026 by sleet.near
