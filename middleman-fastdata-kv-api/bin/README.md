# middleman-fastdata-kv-api/bin

cli bins for the FastData KV API (https://kv.main.fastnear.com). the api is
public and has no auth, so these bins need no base url.

every bin takes an optional `--network mainnet|testnet`, mainnet being
the default.

all commands are run from the project root.

## fastdata_kv_latest_key

GET /v0/latest/{current_account_id}/{predecessor_id}/{key} — latest value of
one exact key. the key may contain slashes.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_key.ts social mob.near profile/name
```

## fastdata_kv_history_key

GET /v0/history/{current_account_id}/{predecessor_id}/{key} — full history of
one exact key. the key may contain slashes.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_history_key.ts social mob.near profile/name
```

## fastdata_kv_all

POST /v0/all/{predecessor_id} — latest values of all keys across all contracts
for a predecessor. always paginated.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_all.ts mob.near --limit 20
# walk to the next page
bun middleman-fastdata-kv-api/bin/fastdata_kv_all.ts mob.near --limit 20 --page-token eyJhIjoi...
```

## fastdata_kv_history_predecessor

POST /v0/history/{current_account_id}/{predecessor_id} — full history of kv
writes by a predecessor to a contract.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_history_predecessor.ts social mob.near --key post/1790730753936
bun middleman-fastdata-kv-api/bin/fastdata_kv_history_predecessor.ts social mob.near --key-prefix post/ --limit 10
```

## fastdata_kv_latest_predecessor

POST /v0/latest/{current_account_id}/{predecessor_id} — latest value per key by
predecessor + contract.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_predecessor.ts social mob.near --key-prefix post/ --limit 5
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_predecessor.ts social mob.near --key-prefix profile/
```

## fastdata_kv_history_contract

POST /v0/history/{current_account_id} — full history of all kv writes to a
contract, every predecessor.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_history_contract.ts social --key graph/follow/mob.near
```

## fastdata_kv_latest_contract

POST /v0/latest/{current_account_id} — latest value per (key, predecessor) for
a contract.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_contract.ts social --key graph/follow/mob.near
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_contract.ts social --key-prefix post/ --limit 5
```

## fastdata_kv_history_global

POST /v0/history — global lookup: all writes to a key across all accounts. the
key is required.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_history_global.ts profile/name --limit 10
```

## fastdata_kv_multi

POST /v0/multi — batch latest-value lookup for up to 100 keys. each key is
`current_account_id/predecessor_id/key` and may hold slashes.

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_multi.ts social/mob.near/profile/name social/mob.near/profile/about
```

## flags

- `--network mainnet|testnet` — pick the chain, mainnet is the default
- `--limit n` — page size, 1..200
- `--page-token t` — the token of a previous response
- `--key k` — exact key filter
- `--key-prefix p` — prefix filter
- `--asc` — oldest first instead of newest first
- `--metadata` — add receipt_id, tx_hash, signer_id, action_index

```sh
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_contract.ts social --key-prefix post/ --limit 2 --asc --metadata
bun middleman-fastdata-kv-api/bin/fastdata_kv_latest_contract.ts social --key-prefix post/ --limit 2 --network testnet
```

========================================
<br/>
copyright 2026 by sleet.near
