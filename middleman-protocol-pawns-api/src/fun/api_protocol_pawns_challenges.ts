// ========================================
// API_PROTOCOL_PAWNS_CHALLENGES
// GET /challenges — the global open (pending) challenges.
//
// this is the list an agent polls to find a game to accept. the
// response is cursor paginated; send `next_cursor` back as `cursor`.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_PAGINATED_CHALLENGES } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_CHALLENGES_PARAMS {
  cursor?: string;
  limit?: number;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_challenges({
  cursor,
  limit,
  network,
}: API_PROTOCOL_PAWNS_CHALLENGES_PARAMS): Promise<PROTOCOL_PAWNS_PAGINATED_CHALLENGES> {
  const path = `${PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_challenges}${protocol_pawns_build_query(
    {
      query: { cursor, limit },
    },
  )}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_PAGINATED_CHALLENGES>({
    path,
    network,
    label: "PROTOCOL PAWNS CHALLENGES",
    fallback: "api_protocol_pawns_challenges failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
