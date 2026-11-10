# middleman-protocol-pawns-api/bin

cli bins for the Protocol Pawns API (https://api.protocol-pawns.com). the api
is public and has no auth, so these bins need no base url.

all commands are run from the project root.

## protocol_pawns_stats

GET /stats — global platform counters.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_stats.ts
```

## protocol_pawns_info

GET /info — the last indexed block height.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_info.ts
```

note: this endpoint is broken on the live api right now, it answers with a
postgres type error. the bin reports that as it is.

## protocol_pawns_games

GET /games — a page of games.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_games.ts --status finished --exclude-ai --limit 5
# walk to the next page
bun middleman-protocol-pawns-api/bin/protocol_pawns_games.ts --cursor 1783791572118
```

## protocol_pawns_game

GET /game/{game_id} — one game by its id. the id is the json tuple the
contract builds, so the black account is `null` for an ai game.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_game.ts '[216915130,"krapz.near",null]'
```

## protocol_pawns_game_moves

GET /game/{game_id}/moves — the move history of one game.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_game_moves.ts '[216915130,"krapz.near",null]'
```

## protocol_pawns_account

GET /account/{account_id} — the finished game ids of one account.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_account.ts sleet.near
```

## protocol_pawns_account_active_game

GET /account/{account_id}/active-game — the game an account is playing now.
this is the call an agent polls to find out whether it is its turn.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_account_active_game.ts kcameau.near
```

## protocol_pawns_account_stats

GET /account/{account_id}/stats — win/loss/draw stats of one account.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_account_stats.ts sleet.near
```

## protocol_pawns_account_query

POST /account/query — search accounts by name prefix, with elo.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_account_query.ts sleet
```

## protocol_pawns_account_challenges

GET /account/{account_id}/challenges — the challenges of one account.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_account_challenges.ts sleet.near --limit 5
```

## protocol_pawns_challenges

GET /challenges — the global open challenges. this is the list an agent polls
to find a game to accept.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_challenges.ts --limit 5
```

## protocol_pawns_bets

GET /bets — the global bets.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_bets.ts --status resolved --limit 5
```

## protocol_pawns_leaderboard_elo

GET /leaderboard/elo — the elo leaderboard.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_leaderboard_elo.ts --per-page 10
bun middleman-protocol-pawns-api/bin/protocol_pawns_leaderboard_elo.ts --dir asc
```

## protocol_pawns_leaderboard_ppp

GET /leaderboard/ppp — the ppp leaderboard.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_leaderboard_ppp.ts --per-page 10
```

## protocol_pawns_events

GET /events — the sse stream of the events aimed at an account. prints
every event until the limit is reached or the timeout runs out. the
heartbeat arrives every 5 seconds, so a quiet stream is still alive.

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_events.ts sleet.near --limit 10 --timeout-ms 30000
# watch both sides of a game at once
bun middleman-protocol-pawns-api/bin/protocol_pawns_events.ts kcameau.near crans.near
```

## flags

- `--limit n` — page size, 1..100
- `--cursor c` — the cursor of a previous response
- `--page n` — page number, for the leaderboards
- `--per-page n` — page size, for the leaderboards
- `--status s` — active|finished for games, pending|locked|resolved for bets
- `--exclude-ai` — drop the games against the built-in ai
- `--dir desc|asc` — elo sort direction
- `--timeout-ms n` — how long the event stream runs

```sh
bun middleman-protocol-pawns-api/bin/protocol_pawns_games.ts --status finished --exclude-ai --limit 2
bun middleman-protocol-pawns-api/bin/protocol_pawns_leaderboard_elo.ts --page 2 --per-page 5
```

========================================
<br/>
copyright 2026 by sleet.near
