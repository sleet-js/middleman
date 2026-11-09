// ========================================
// API_NEAR_SOCIAL_TX
// GET /v1/tx/{tx_hash} — what the indexer did with a transaction's
// writes. poll it after sending a transaction.
// ========================================

import { api_near_social_get } from "../stuff/api_near_social_get";
import type { NEAR_SOCIAL_TX } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_TX_PARAMS {
  tx_hash: string;
}

export async function api_near_social_tx(
  params: API_NEAR_SOCIAL_TX_PARAMS,
): Promise<NEAR_SOCIAL_TX> {
  return api_near_social_get<NEAR_SOCIAL_TX>({
    key: "near_social_tx",
    path_params: { tx_hash: params.tx_hash },
    label: "NEAR SOCIAL TX",
    fallback: "api_near_social_tx failed",
  });
}
// ========================================
// copyright 2026 by sleet.near
