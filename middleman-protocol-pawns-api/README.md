# @sleet-js/middleman-protocol-pawns-api

clean ts library for interacting with the Protocol Pawns API (https://api.protocol-pawns.com).

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

Protocol Pawns API
<br/>
https://api.protocol-pawns.com

the api is read-only on the chain. it indexes the chess contract
`app.chess-game.near` on near mainnet; every move, challenge, bet and
wager is a near transaction against that contract, never a call to this
api.

the api does write to its own postgres for web push subscriptions, and
`POST /notify/move` nudges the opponent over the event stream without
touching the chain.

the openapi spec lives at `https://api.protocol-pawns.com/doc`.

base url:

- mainnet `https://api.protocol-pawns.com`

every call takes an optional `network` ("mainnet"), mainnet being the
default.

## what is in the box

| function                                 | endpoint                                         |
| ---------------------------------------- | ------------------------------------------------ |
| `api_protocol_pawns_info`                | `GET /info`                                      |
| `api_protocol_pawns_stats`               | `GET /stats`                                     |
| `api_protocol_pawns_games`               | `GET /games`                                     |
| `api_protocol_pawns_game`                | `GET /game/{game_id}`                            |
| `api_protocol_pawns_game_moves`          | `GET /game/{game_id}/moves`                      |
| `api_protocol_pawns_game_bets`           | `GET /game/{game_id}/bets`                       |
| `api_protocol_pawns_query_games`         | `POST /query`                                    |
| `api_protocol_pawns_account`             | `GET /account/{account_id}`                      |
| `api_protocol_pawns_account_active_game` | `GET /account/{account_id}/active-game`          |
| `api_protocol_pawns_account_stats`       | `GET /account/{account_id}/stats`                |
| `api_protocol_pawns_account_stats_batch` | `POST /account/stats/batch`                      |
| `api_protocol_pawns_account_query`       | `POST /account/query`                            |
| `api_protocol_pawns_account_challenges`  | `GET /account/{account_id}/challenges`           |
| `api_protocol_pawns_account_bets`        | `GET /account/{account_id}/bets`                 |
| `api_protocol_pawns_account_bet_stats`   | `GET /account/{account_id}/bet-stats`            |
| `api_protocol_pawns_challenges`          | `GET /challenges`                                |
| `api_protocol_pawns_bets`                | `GET /bets`                                      |
| `api_protocol_pawns_leaderboard_elo`     | `GET /leaderboard/elo`                           |
| `api_protocol_pawns_leaderboard_ppp`     | `GET /leaderboard/ppp`                           |
| `api_protocol_pawns_leaderboard_bets`    | `GET /leaderboard/bets`                          |
| `api_protocol_pawns_events`              | `GET /events` (sse)                              |
| `api_protocol_pawns_notify_move`         | `POST /notify/move`                              |
| `api_protocol_pawns_vapid_public_key`    | `GET /vapid-public-key`                          |
| `api_protocol_pawns_subscribe_push`      | `POST /account/{account_id}/push-subscription`   |
| `api_protocol_pawns_unsubscribe_push`    | `DELETE /account/{account_id}/push-subscription` |

## the event stream

`GET /events?account={account_id}` is a server-sent event stream that
carries the events aimed at an account: a move played, a challenge
made, a game created. it is the efficient way for an agent to learn
that it is its turn, without polling.

read it as an async iterator:

```ts
const stream = await api_protocol_pawns_events({
  account_id: "sleet.near",
});

for await (const event of stream) {
  if (event.event_type === "play_move") {
    // it is your turn
  }
  if (event.event_type === "heartbeat") {
    // the stream is alive
  }
}
```

more than one account can be watched at once, the api takes the param
repeated:

```ts
const stream = await api_protocol_pawns_events({
  account_id: ["kcameau.near", "crans.near"],
});
```

the events that come out are typed. `play_move` carries the game id,
the side that moved, the move in coordinate notation and the board
after it, `challenge` carries the challenger and the challenged, and
so on. an event type the api adds later comes through as
`PROTOCOL_PAWNS_UNKNOWN_EVENT`, so a new server event does not break
the stream.

the api sends a `heartbeat` every 5 seconds. a missing heartbeat for
about 10 seconds means the stream is dead and should be reopened.

breaking out of the loop closes the connection, and so does calling
`.return()` on the iterator.

### telling the opponent a move landed

`POST /notify/move` tells the opponent of a game that a move landed, so
they can pull the tx logs instead of waiting for the indexer to catch
up. the caller has to be a participant in the game, the api answers 403
otherwise, and it is rate limited to one request per second.

```ts
await api_protocol_pawns_notify_move({
  tx_hash,
  game_id: [206540279, "kcameau.near", "crans.near"],
  account_id: "kcameau.near",
});
```

## the game id

the api takes the game id as the json-stringified tuple the contract
builds: `[123456,"white.near","black.near"]`. the black account is `null`
for a game against the built-in ai. the package takes the tuple as an
array and encodes it into the path for you:

```ts
await api_protocol_pawns_game({
  game_id: [216915130, "krapz.near", null],
});
```

the tuple is the same shape the contract uses, so a game id read off the
chain works unchanged.

## pagination

the list endpoints come in two flavours. the leaderboards paginate by
page number, everything else by cursor. the cursor of the next page is
in the response as `next_cursor`, send it back to walk on:

```ts
let cursor: string | undefined = undefined;

do {
  const res = await api_protocol_pawns_games({ status: "active", cursor });
  // ... use res.items
  cursor = res.next_cursor ?? undefined;
} while (cursor !== undefined);
```

## finding out whose turn it is

an agent polls the active game of its account. the fen carries the side
to move in its second field:

```ts
const game = await api_protocol_pawns_account_active_game({
  account_id: "sleet.near",
});

const turn = game.fen?.split(" ")[1] === "w" ? "White" : "Black";
const my_color = game.white.value === "sleet.near" ? "White" : "Black";
const my_turn = turn === my_color;
```

## known issue on the live api

`GET /info` is broken right now. it answers with a postgres type error
(`COALESCE types text and integer cannot be matched`), a bug in their
indexer. the wrapper is correct, the server side needs a fix, so
`api_protocol_pawns_info` throws until they ship the fix.

## writing to the game

this package does not play the game. the chain is the source of truth,
so playing means sending near transactions to the contract
`app.chess-game.near`. their agent skill at
`https://app.protocol-pawns.com/.well-known/ai/skill.md` documents the
contract methods, and `near-cli-rs` or `near-api-js` signs them.

the api does have two endpoints that write, but neither of them touches
the chain: the push subscription pair writes to the api's own database,
and `POST /notify/move` only nudges the opponent over the event
stream.

=====================
<br/>
copyright 2026 by sleet.near
