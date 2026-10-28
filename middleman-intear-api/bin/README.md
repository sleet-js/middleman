# middleman-intear-api/bin

cli bins for the intear api, called through `middleman/intear`. the api
is public and has no auth, so these bins need no base url.

**one bin per one-shot endpoint — 13 bins over 12 endpoints.** the api's
websocket endpoints (`*.subscribe`) are intentionally not covered, since
`middleman/intear/` is HTTP-only. `/tokens` gets two bins, one for each
http method.

all commands are run from the project root.

## intear_tokens_get

GET /tokens — token rows. token ids are positional and optional; with no
ids and a `--sort` you get the top tokens by that field. note: the api
requires `sort` whenever `limit` is passed.

```sh
bun middleman-intear-api/bin/intear_tokens_get.ts wrap.near
bun middleman-intear-api/bin/intear_tokens_get.ts wrap.near,usdt.tether-token.near --fields symbol,price_usd

# top 20 by volume, filters applied via --where key=value
bun middleman-intear-api/bin/intear_tokens_get.ts --fields symbol,volume_usd_24h \
  --sort volume_usd_24h --desc --limit 20 \
  --where min_reputation=NotFake
```

## intear_tokens_post

POST /tokens — the same endpoint as `intear_tokens_get`, with the params
in a JSON body. this is the one to use when a list of token ids does
not fit in a url: the body limit is 64KB, against ~8KB for the url.

```sh
bun middleman-intear-api/bin/intear_tokens_post.ts wrap.near
bun middleman-intear-api/bin/intear_tokens_post.ts --fields symbol,icon --limit 20 --sort volume_usd_24h --desc
```

## intear_tokens_search

GET /tokens/search — fuzzy search by name/symbol. needs no `--sort`.
the query is positional and may be an empty string.

```sh
bun middleman-intear-api/bin/intear_tokens_search.ts wnear --limit 10
bun middleman-intear-api/bin/intear_tokens_search.ts '' --holder sleet.near
```

## intear_trades_query

GET /trades — every trade. a trade is a swap, so the useful columns are
token_in/amount_in vs token_out/amount_out plus usd_value.

```sh
bun middleman-intear-api/bin/intear_trades_query.ts --limit 20
bun middleman-intear-api/bin/intear_trades_query.ts --token wrap.near --side buy --limit 10
bun middleman-intear-api/bin/intear_trades_query.ts --min-usd 10000 --limit 5 --order oldest
```

## intear_transfers_query

GET /transfers — token transfers. REQUIRES an account/sender/receiver.
`--include-transactions` is a flag with no value: it adds transactions
alongside the transfers.

```sh
bun middleman-intear-api/bin/intear_transfers_query.ts sleet.near --limit 20
bun middleman-intear-api/bin/intear_transfers_query.ts sleet.near --sender sleet.near --kind mint
bun middleman-intear-api/bin/intear_transfers_query.ts sleet.near --include-transactions
```

## intear_activity_query

GET /activity — trades AND transfers of one account in one merged feed.
this is what the FEED page wants.

```sh
bun middleman-intear-api/bin/intear_activity_query.ts sleet.near --limit 20
bun middleman-intear-api/bin/intear_activity_query.ts sleet.near trade --limit 10
bun middleman-intear-api/bin/intear_activity_query.ts sleet.near trade,transfer --token wrap.near
```

## intear_candles_get

GET /candles — OHLCV series, up to 200 tokens per call. resolution
defaults to 1h; quote is usd or near.

```sh
bun middleman-intear-api/bin/intear_candles_get.ts wrap.near
bun middleman-intear-api/bin/intear_candles_get.ts wrap.near,usdt.tether-token.near 1d --count-back 30
bun middleman-intear-api/bin/intear_candles_get.ts wrap.near 1h --quote near --series open,high,low,close
```

## intear_balances_get

GET /balances — one account's balances. sources defaults to all three
(direct,native,rhea); pass a subset to narrow the request.

```sh
bun middleman-intear-api/bin/intear_balances_get.ts sleet.near
bun middleman-intear-api/bin/intear_balances_get.ts sleet.near direct
bun middleman-intear-api/bin/intear_balances_get.ts sleet.near direct --tokens wrap.near
```

## intear_holders_get

GET /holders — holders of one token, paginated. pass the cursor printed
at the end of a run to fetch the next page.

```sh
bun middleman-intear-api/bin/intear_holders_get.ts wrap.near --limit 20
bun middleman-intear-api/bin/intear_holders_get.ts wrap.near --cursor 'account:balance'
```

## intear_positions_get

GET /positions — known positions of one account.

```sh
bun middleman-intear-api/bin/intear_positions_get.ts sleet.near --limit 50
```

## intear_prices_at_get

GET /prices/at — price of a token at a timestamp. the timestamp defaults
to one hour ago (the "what was this worth" case); add extra queries with
`--also token@millis`.

```sh
bun middleman-intear-api/bin/intear_prices_at_get.ts wrap.near
bun middleman-intear-api/bin/intear_prices_at_get.ts wrap.near 1767225600000
bun middleman-intear-api/bin/intear_prices_at_get.ts wrap.near \
  --also usdt.tether-token.near@1767225600000
```

## intear_accounts_search

GET /accounts/search — accounts by id prefix, for an account picker.

```sh
bun middleman-intear-api/bin/intear_accounts_search.ts sleet --limit 20
```

## intear_traders_get

GET /traders — a token's top traders by profit over a time range, highest
`pnl_usd` first. the range is `24h`, `7d`, `30d` or `all`, and defaults to
`24h`.

```sh
bun middleman-intear-api/bin/intear_traders_get.ts token.intear.near
bun middleman-intear-api/bin/intear_traders_get.ts token.intear.near 7d --top 10
```

========================================
<br/>
copyright 2026 by sleet.near
