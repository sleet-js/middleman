# @sleet-js/middleman-rhea-api

clean ts library for interacting with the Rhea indexer API (https://api.rhea.finance).

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

Rhea indexer API
<br/>
https://api.rhea.finance

the base url is `https://api.rhea.finance`, no api key. pool/lp and
token data come from the public indexer endpoints (`/fetchAllPools`,
`/list-token`, `/list-token-price`, `/list-pools`, ...); the swap
endpoints under `/api/...` need a bearer token and are not covered here.

=====================
<br/>
copyright 2026 by sleet.near
