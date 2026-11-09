// ========================================
// FASTDATA KV TYPES
// types for the entries and responses of the fastdata kv api.
// ========================================

// the raw json value as it was stored. the api keeps whatever json
// was handed to __fastdata_kv, so a value can be a scalar, an object
// or an array.
export type FASTDATA_KV_VALUE =
  string | number | boolean | null | Record<string, unknown> | unknown[];

// one kv entry, without the receipt metadata.
export interface FASTDATA_KV_ENTRY {
  predecessor_id: string;
  current_account_id: string;
  block_height: number;
  // NOTE ON TIME: the live api returns nanoseconds (e.g.
  // 1790730755404741772), not milliseconds. treat it as an opaque
  // number and divide by 1_000_000 only if you need a wall clock.
  block_timestamp: number;
  key: string;
  value: FASTDATA_KV_VALUE;
}

// one kv entry with the receipt metadata the api adds when
// include_metadata is true.
export interface FASTDATA_KV_ENTRY_WITH_METADATA extends FASTDATA_KV_ENTRY {
  receipt_id: string;
  action_index: number;
  // omitted by the api when there is no tx hash.
  tx_hash?: string;
  signer_id: string;
}

// the body every POST endpoint accepts.
export interface FASTDATA_KV_POST_BODY {
  // default 50, max 200
  limit?: number;
  // from the page_token of the previous response
  page_token?: string;
  // default false; adds receipt_id, tx_hash, signer_id, action_index
  include_metadata?: boolean;
  // default false; false is newest first
  asc?: boolean;
  // exact key
  key?: string;
  // prefix filter, mutually exclusive with key
  key_prefix?: string;
}

// the body of POST /v0/multi.
export interface FASTDATA_KV_MULTI_BODY {
  // max 100 entries, each `current_account_id/predecessor_id/key`
  keys: string[];
  include_metadata?: boolean;
  asc?: boolean;
}

// the response of every paginated endpoint. page_token is absent when
// there are no more results.
export interface FASTDATA_KV_RESPONSE {
  entries: FASTDATA_KV_ENTRY[];
  page_token?: string;
}

// the response of POST /v0/multi. entries match the input key order,
// a null entry means the key was not found.
export interface FASTDATA_KV_MULTI_RESPONSE {
  entries: (FASTDATA_KV_ENTRY | null)[];
}

// the response of POST /v0/multi with metadata on.
export interface FASTDATA_KV_MULTI_RESPONSE_WITH_METADATA {
  entries: (FASTDATA_KV_ENTRY_WITH_METADATA | null)[];
}
