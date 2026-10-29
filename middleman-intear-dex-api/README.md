# @sleet-js/middleman-intear-dex-api

clean ts library for interacting with the Intear DEX backend
(https://dex-backend.intear.tech).

```sh
bun i
# bun run build
bun run tsc
# publish
bun publish --dry-run
bunx npm login
bun publish --access public
# other
bun run tsc --noEmit
bunx prettier . --write
```

---

## scope

this package talks to **one host only**: `https://dex-backend.intear.tech`.

- the token indexer (`https://api.intea.rs`) is already covered by
  `@sleet-js/middleman-intear-api`
- the swap router (`https://router.intear.tech`) is not covered here

the api is **GET only** — `POST`/`PUT`/`DELETE`/`PATCH` all answer `405` —
and needs **no api key**. it sends `access-control-allow-origin: *`, so a
browser can call it cross origin without a proxy.

there is **no openapi/swagger** for this api (`/docs`, `/openapi.json`,
`/swagger.json` are all `404`), so the endpoint list below was built by
probing the live host.

## endpoints

| function                                    | path                                  | notes                                              |
| ------------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| `api_intear_dex_pools_all`                  | `/pools/all`                          | every pool; `accountId` is accepted but **not** applied |
| `api_intear_dex_stats_tvl_total`            | `/stats/tvl/total/{period}`           | tvl series                                          |
| `api_intear_dex_stats_volume_total`         | `/stats/volume/total/{period}`        | volume series                                       |
| `api_intear_dex_stats_top_assets`           | `/stats/top/assets/{period}`          | assets ranked by volume                             |
| `api_intear_dex_stats_top_pools`            | `/stats/top/pools/{period}`           | pools ranked by volume                              |
| `api_intear_dex_balances`                   | `/balances?accountId=`                | `accountId` **required**                            |
| `api_intear_dex_tear_staking`               | `/tear/staking?accountId=`            | `accountId` optional                                |

`{period}` is one of `day | week | month | year | total`. anything else
gets back `Invalid period. Expected day|week|month|year|total`.

the raw path table is exported as `INTEAR_DEX_ENDPOINT_PATHS`.

## usage

```ts
import {
  api_intear_dex_pools_all,
  api_intear_dex_stats_tvl_total,
  api_intear_dex_balances,
} from "@sleet-js/middleman-intear-dex-api";

const pools = await api_intear_dex_pools_all();
const tvl = await api_intear_dex_stats_tvl_total("day");
const balances = await api_intear_dex_balances({
  accountId: "ref.huggies.near",
});
```

## gotchas

- **big numbers are strings.** balances, shares, tvl and locked amounts come
  back as decimal strings with up to ~50 digits (near uses yoctoNEAR). use
  `BigInt` or a decimal library, never `parseFloat`.
- **`pool` is a serde enum.** every pool has exactly one of `Public`,
  `Private`, `Launch` or `LaunchV2` under `pool`.
- **fee receivers are tagged.** a receiver is either the string `"Pool"` or
  an object `{ Account: "..." }` / `{ Community: "..." }`.
- **fee shares are basis points.** `10000` = 100%.
- **no rate limit headers.** the api does not advertise `ratelimit` /
  `retry-after`, so cache `/pools/all` (it is ~165 KB) rather than polling
  it.

=====================
<br/>
copyright 2026 by sleet.near
