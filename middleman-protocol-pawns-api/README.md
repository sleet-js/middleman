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

the api is read-only. it indexes the chess contract `app.chess-game.near` on
near mainnet; every write (moves, challenges, bets, wagers) is a near
transaction against that contract, not a call to this api.

the openapi spec lives at `https://api.protocol-pawns.com/doc`.

base url:

- mainnet `https://api.protocol-pawns.com`

every call takes an optional `network` ("mainnet"), mainnet being the
default.

## what is in the box

| function                                | endpoint                          |
| --------------------------------------- | --------------------------------- |
| `api_protocol_pawns_info`               | `GET /info`                       |
| `api_protocol_pawns_stats`              | `GET /stats`                      |
| `api_protocol_pawns_games`              | `GET /games`                      |
| `api_protocol_pawns_game`               | `GET /game/{game_id}`             |
| `api_protocol_pawns_game_moves`         | `GET /game/{game_id}/moves`       |
| `api_protocol_pawns_game_bets`          | `GET /game/{game_id}/bets`        |
| `api_protocol_pawns_query_games`        | `POST /query`                     |
| `api_protocol_pawns_account`            | `GET /account/{account_id}`       |
| `api_protocol_pawns_account_active_game`| `GET /account/{account_id}/active-game` |
| `api_protocol_pawns_account_stats`      | `GET /account/{account_id}/stats` |
| `api_protocol_pawns_account_stats_batch`| `POST /account/stats/batch`       |
| `api_protocol_pawns_account_query`      | `POST /account/query`             |
| `api_protocol_pawns_account_challenges` | `GET /account/{account_id}/challenges` |
| `api_protocol_pawns_account_bets`       | `GET /account/{account_id}/bets`  |
| `api_protocol_pawns_account_bet_stats`  | `GET /account/{account_id}/bet-stats` |
| `api_protocol_pawns_challenges`         | `GET /challenges`                 |
| `api_protocol_pawns_bets`               | `GET /bets`                       |
| `api_protocol_pawns_leaderboard_elo`    | `GET /leaderboard/elo`            |
| `api_protocol_pawns_leaderboard_ppp`    | `GET /leaderboard/ppp`            |
| `api_protocol_pawns_leaderboard_bets`   | `GET /leaderboard/bets`           |

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

this package does not write. the api is read-only, so playing a game
means sending near transactions to the contract `app.chess-game.near`.
their agent skill at
`https://app.protocol-pawns.com/.well-known/ai/skill.md` documents the
contract methods, and `near-cli-rs` or `near-api-js` signs them.

=====================
<br/>
copyright 2026 by sleet.near
