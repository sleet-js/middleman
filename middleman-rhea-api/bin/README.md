# middleman-rhea-api/bin

cli bins for the rhea indexer api (https://api.rhea.finance). the api is
public and has no auth, so these bins need no base url.

all commands are run from the project root.

## rhea_fetch_all_pools

GET /fetchAllPools — all v1 pools (simple/stable/rated) plus block height.

```sh
bun middleman-rhea-api/bin/rhea_fetch_all_pools.ts
```

## rhea_list_token

GET /list-token — full token metadata map.

```sh
bun middleman-rhea-api/bin/rhea_list_token.ts --limit 20
```

## rhea_list_token_price

GET /list-token-price — token price map.

```sh
bun middleman-rhea-api/bin/rhea_list_token_price.ts --limit 20
```

## rhea_list_top_pools

GET /list-top-pools — top pools by tvl.

```sh
bun middleman-rhea-api/bin/rhea_list_top_pools.ts --limit 20
```

## rhea_list_pools

GET /list-pools — paginated/filtered pool list.

```sh
bun middleman-rhea-api/bin/rhea_list_pools.ts --limit 20 --sort tvl --order desc
```

## rhea_get_pool

GET /get-pool?pool_id=... — single pool.

```sh
bun middleman-rhea-api/bin/rhea_get_pool.ts 0
```

## rhea_list_pools_by_ids

GET /list-pools-by-ids?ids=... — pools by id (comma separated).

```sh
bun middleman-rhea-api/bin/rhea_list_pools_by_ids.ts 0,1
```

## rhea_list_pools_by_tokens

GET /list-pools-by-tokens?token0=...&token1=... — pools for a pair.

```sh
bun middleman-rhea-api/bin/rhea_list_pools_by_tokens.ts wrap.near usdt.tether-token.near
```

## rhea_pool_search

GET /pool/search — search pools by type (classic, dcl, all, stable, degen, hotPools).

```sh
bun middleman-rhea-api/bin/rhea_pool_search.ts --type dcl --sort tvl --limit 20
bun middleman-rhea-api/bin/rhea_pool_search.ts --type all --sort 24h --limit 20
# search pools containing a token (substring match on symbol/id)
bun middleman-rhea-api/bin/rhea_pool_search.ts --type all --sort tvl --limit 20 --token-list mbga
# fetch specific pools by id
bun middleman-rhea-api/bin/rhea_pool_search.ts --pool-id-list 0,1,2
```

## rhea_timestamp

GET /timestamp — indexer timestamp.

```sh
bun middleman-rhea-api/bin/rhea_timestamp.ts
```

## rhea_get_service_version

GET /get-service-version — indexer version string.

```sh
bun middleman-rhea-api/bin/rhea_get_service_version.ts
```

========================================
<br/>
copyright 2026 by sleet.near
