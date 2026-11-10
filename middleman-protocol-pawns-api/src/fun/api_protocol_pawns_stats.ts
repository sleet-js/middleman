// ========================================
// API_PROTOCOL_PAWNS_STATS
// GET /stats — global platform counters: total, active, finished and
// cancelled games, plus the total number of moves played.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_GLOBAL_STATS } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_STATS_PARAMS {
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_stats({
  network,
}: API_PROTOCOL_PAWNS_STATS_PARAMS): Promise<PROTOCOL_PAWNS_GLOBAL_STATS> {
  return api_protocol_pawns_get<PROTOCOL_PAWNS_GLOBAL_STATS>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_stats,
    network,
    label: "PROTOCOL PAWNS STATS",
    fallback: "api_protocol_pawns_stats failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
