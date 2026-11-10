// ========================================
// API_PROTOCOL_PAWNS_ACCOUNT_STATS_BATCH
// POST /account/stats/batch — win/loss/draw stats for many accounts in
// one call.
// ========================================

import { api_protocol_pawns_post } from "../stuff/api_protocol_pawns_post";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_ACCOUNT_STATS } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_ACCOUNT_STATS_BATCH_PARAMS {
  account_ids: string[];
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_account_stats_batch({
  account_ids,
  network,
}: API_PROTOCOL_PAWNS_ACCOUNT_STATS_BATCH_PARAMS): Promise<
  PROTOCOL_PAWNS_ACCOUNT_STATS[]
> {
  return api_protocol_pawns_post<PROTOCOL_PAWNS_ACCOUNT_STATS[]>({
    path: PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_account_stats_batch,
    body: { account_ids },
    network,
    label: "PROTOCOL PAWNS ACCOUNT STATS BATCH",
    fallback: "api_protocol_pawns_account_stats_batch failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
