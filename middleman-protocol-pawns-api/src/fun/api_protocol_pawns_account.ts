// ========================================
// API_PROTOCOL_PAWNS_ACCOUNT
// GET /account/{account_id} — the finished game ids of one account.
// ========================================

import { api_protocol_pawns_get } from "../stuff/api_protocol_pawns_get";
import { PROTOCOL_PAWNS_ENDPOINT_PATHS } from "../stuff/protocol_pawns_endpoint_paths";
import { protocol_pawns_build_path } from "../stuff/protocol_pawns_endpoint_paths";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_ACCOUNT } from "../types/protocol_pawns_types";

export interface API_PROTOCOL_PAWNS_ACCOUNT_PARAMS {
  account_id: string;
  network?: PROTOCOL_PAWNS_NETWORK;
}

export async function api_protocol_pawns_account({
  account_id,
  network,
}: API_PROTOCOL_PAWNS_ACCOUNT_PARAMS): Promise<PROTOCOL_PAWNS_ACCOUNT> {
  const path = protocol_pawns_build_path(
    PROTOCOL_PAWNS_ENDPOINT_PATHS.protocol_pawns_account,
    { account_id },
  );

  return api_protocol_pawns_get<PROTOCOL_PAWNS_ACCOUNT>({
    path,
    network,
    label: "PROTOCOL PAWNS ACCOUNT",
    fallback: "api_protocol_pawns_account failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
