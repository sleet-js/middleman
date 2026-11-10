// ========================================
// PROTOCOL_PAWNS_BASE_URL
// the host the protocol pawns api runs on. the api is read-only and
// indexed from the chess contract on near mainnet, so there is a
// single host.
// ========================================

export const PROTOCOL_PAWNS_BASE_URL = "https://api.protocol-pawns.com";

export const PROTOCOL_PAWNS_BASE_URLS = {
  mainnet: PROTOCOL_PAWNS_BASE_URL,
} as const;
// ========================================
// copyright 2026 by sleet.near
