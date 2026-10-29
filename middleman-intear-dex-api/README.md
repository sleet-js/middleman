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

## bins

one cli bin per endpoint, in `bin/`. see [`bin/README.md`](./bin/README.md).

```sh
bun middleman-intear-dex-api/bin/intear_dex_pools_all.ts --kind LaunchV2
bun middleman-intear-dex-api/bin/intear_dex_stats_tvl_total.ts day
bun middleman-intear-dex-api/bin/intear_dex_balances.ts ref.huggies.near
```

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

=====================
<br/>
copyright 2026 by sleet.near
