# middleman-intear-dex-api/bin

cli bins for the intear dex backend (https://dex-backend.intear.tech). the
api is public, needs no auth, and is GET only, so these bins need no base
url.

**one bin per endpoint — 7 bins over 7 endpoints.**

all commands are run from the project root.

## intear_dex_pools_all

GET /pools/all — every pool with its liquidity, 24h/7d volume and apy.
the pool body is a serde enum, so the bins flatten it into a kind name
and an asset list.

```sh
bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts
bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --kind LaunchV2
bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --asset near --limit 10
bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --top-tvl 10
```

> note: `--account-id` is sent to the api, but the api does **not** apply
> it — the response is identical with and without it. the bin filters
> locally so the flag still does what it says.

## intear_dex_stats_tvl_total

GET /stats/tvl/total/{period} — total value locked over time.

```sh
bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts day
bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts month
```

## intear_dex_stats_volume_total

GET /stats/volume/total/{period} — total traded volume over time.

```sh
bun middleman-intear-dex-api/bin/intear_dex_stats_volume_total.ts day
bun middleman-intear-dex-api/bin/intear_dex_stats_volume_total.ts week
```

## intear_dex_stats_top_assets

GET /stats/top/assets/{period} — assets ranked by volume.

```sh
bun middleman-intear-dex-api/bin/intear_dex_stats_top_assets.ts day
bun middleman-intear-dex-api/bin/intear_dex_stats_top_assets.ts month --limit 20
```

## intear_dex_stats_top_pools

GET /stats/top/pools/{period} — pools ranked by volume.

```sh
bun middleman-intear-dex-api/bin/intear_dex_stats_top_pools.ts day
bun middleman-intear-dex-api/bin/intear_dex_stats_top_pools.ts week --limit 10
```

## intear_dex_balances

GET /balances?accountId=... — the dex balances and pending fees of one
near account. `accountId` is **required**.

```sh
bun middleman-intear-dex-api/bin/intear_dex_balances.ts ref.huggies.near
bun middleman-intear-dex-api/bin/intear_dex_balances.ts sleet.near
```

## intear_dex_tear_staking

GET /tear/staking?accountId=... — the TEAR staking pool state.
`accountId` is optional here.

```sh
bun middleman-intear-dex-api/bin/intear_dex_tear_staking.ts
bun middleman-intear-dex-api/bin/intear_dex_tear_staking.ts ref.huggies.near
```

## periods

the four stats bins share one period argument:

```text
day | week | month | year | total
```

anything else fails locally with a usage line. the api itself would
answer `400 Invalid period. Expected day|week|month|year|total`.

=====================
<br/>
copyright 2026 by sleet.near
