// ========================================
// FASTDATA_KV_ENDPOINT_PATHS
// the path template for every endpoint this middleman knows about. one
// key per endpoint so the path is written down exactly once. `{name}`
// marks a placeholder the wrapper fills in.
// ========================================

export const FASTDATA_KV_ENDPOINT_PATHS = {
  // latest value of one exact key
  fastdata_kv_latest_key:
    "/v0/latest/{current_account_id}/{predecessor_id}/{key}",

  // full history of one exact key
  fastdata_kv_history_key:
    "/v0/history/{current_account_id}/{predecessor_id}/{key}",

  // latest values of all keys of a predecessor, across all contracts
  fastdata_kv_all: "/v0/all/{predecessor_id}",

  // kv writes by a predecessor to a contract
  fastdata_kv_history_predecessor:
    "/v0/history/{current_account_id}/{predecessor_id}",

  // latest values by predecessor + contract
  fastdata_kv_latest_predecessor:
    "/v0/latest/{current_account_id}/{predecessor_id}",

  // all kv writes to a contract, every predecessor
  fastdata_kv_history_contract: "/v0/history/{current_account_id}",

  // latest values for a contract, every predecessor
  fastdata_kv_latest_contract: "/v0/latest/{current_account_id}",

  // global lookup: all writes to a key, every account
  fastdata_kv_history_global: "/v0/history",

  // batch latest lookup for up to 100 keys
  fastdata_kv_multi: "/v0/multi",
} as const;

export type FASTDATA_KV_ENDPOINT_KEY = keyof typeof FASTDATA_KV_ENDPOINT_PATHS;

// ========================================
// FASTDATA_KV_BUILD_PATH
// fill the `{name}` placeholders of a path template. a placeholder
// holding a key may contain slashes, so only the parts that are a
// single path segment get percent-encoded.
// ========================================

export function fastdata_kv_build_path(
  template: string,
  params: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_match, name: string) => {
    const value = params[name];
    if (value === undefined) {
      throw new Error(`missing path parameter: ${name}`);
    }
    return value;
  });
}
// ========================================
// copyright 2026 by sleet.near
