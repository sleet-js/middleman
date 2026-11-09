# @sleet-js/middleman-fastdata-kv-api

clean ts library for interacting with the FastData KV API (https://kv.main.fastnear.com).

```sh
bun i
bun run build
# publish
bun publish --dry-run
bunx npm login
bun publish --access public
# other
bun run typecheck
bunx prettier . --write
```

---

FastData KV API
<br/>
https://kv.main.fastnear.com

the api is read-only. kv writes happen in a near transaction that calls
`__fastdata_kv` on the target contract.

base urls:

- mainnet `https://kv.main.fastnear.com`
- testnet `https://kv.test.fastnear.com`

every call takes an optional `network` ("mainnet" | "testnet"), mainnet
being the default. the endpoints are `GET /v0/latest/...`,
`GET /v0/history/...` and the POST family `/v0/all`, `/v0/multi`,
`/v0/latest`, `/v0/history`. responses are paginated with a
`page_token`; send it back to walk the next page.

the endpoints that filter by key take `key` and `key_prefix` at the
top level, next to `body`:

```ts
await api_fastdata_kv_latest_predecessor({
  current_account_id: "social",
  predecessor_id: "mob.near",
  key_prefix: "profile/",
});
```

`key` and `key_prefix` are mutually exclusive, the same rule the api
enforces; the package checks it before the request goes out, so you
get a clear error instead of a 400.

=====================
<br/>
copyright 2026 by sleet.near
