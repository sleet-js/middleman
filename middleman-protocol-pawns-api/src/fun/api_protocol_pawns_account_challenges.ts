// ========================================
// API_PROTOCOL_PAWNS_ACCOUNT_CHALLENGES
// GET /account/{account_id}/challenges — the challenges of one account,
// both the ones it sent and the ones it received.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_PAGINATED_CHALLENGES } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_ACCOUNT_CHALLENGES_PARAMS {
  account_id: string;
  limit?: number;
  cursor?: string;
  page?: number;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_account_challenges({
  account_id,
  limit,
  cursor,
  page,
  network,
}: API_PROTOCOL_PAWNS_ACCOUNT_CHALLENGES_PARAMS): Promise<PROTOCOL_PAWNS_PAGINATED_CHALLENGES> {
  const path = `${protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_account_challenges,
    { account_id },
  )}${protocol_pawns_build_query({ query: { limit, cursor, page } })}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_PAGINATED_CHALLENGES>({
    path,
    network,
    label: "PROTOCOL PAWNS ACCOUNT CHALLENGES",
    fallback: "api_protocol_pawns_account_challenges failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
