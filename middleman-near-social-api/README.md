# @sleet-js/middleman-near-social-api

clean ts library for interacting with the near.social indexer API (https://api2.near.social).

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

near.social indexer API
<br/>
https://api2.near.social

the base url is `https://api2.near.social`, no api key. the api is
read-only: it serves what the indexer has seen of `social-kv/1` writes
(accounts, posts, replies, likes, follows, hashtags, notifications) and
never writes anything. it is mainnet-only, so there is no testnet
variant to point the base url at.

every list endpoint takes `limit` (1..100) and `cursor`, and answers
with `{ items, next_cursor }`. pass `next_cursor` back as `cursor` to
walk the pages.

the api docs live at https://api2.near.social/api.md.

=====================
<br/>
copyright 2026 by sleet.near
