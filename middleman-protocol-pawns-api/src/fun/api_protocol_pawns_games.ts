// ========================================
// API_PROTOCOL_PAWNS_GAMES
// GET /games — a page of games.
//
// the api takes `status` ("active" | "finished"), an optional `cursor`
// for cursor pagination, or `page` for page pagination. `limit` caps
// the page size. `exclude_ai` drops the games against the built-in
// ai, so only human games are left.
//
// the response carries `next_cursor`; send it back to walk the next
// page.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { protocol_pawns_build_query } from "../stuff/protocol_pawns_build_query";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_PAGINATED_GAMES } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_GAMES_PARAMS {
  // default "active" on the server
  status?: "active" | "finished";
  // cursor of the next page, from the previous response
  cursor?: string;
  // page number, alternative to cursor pagination
  page?: number;
  // page size
  limit?: number;
  // drop the games against the built-in ai
  exclude_ai?: boolean;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_games({
  status,
  cursor,
  page,
  limit,
  exclude_ai,
  network,
}: API_PROTOCOL_PAWNS_GAMES_PARAMS): Promise<PROTOCOL_PAWNS_PAGINATED_GAMES> {
  const path = `${PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_games}${protocol_pawns_build_query({
    query: {
      status,
      cursor,
      page,
      limit,
      // the api reads this as the string "true" or "1"
      exclude_ai: exclude_ai === undefined ? undefined : String(exclude_ai),
    },
  })}`;

  return api_protocol_pawns_get<PROTOCOL_PAWNS_PAGINATED_GAMES>({
    path,
    network,
    label: "PROTOCOL PAWNS GAMES",
    fallback: "api_protocol_pawns_games failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
