import {
  protocol_pawns_parse_sse_block,
  protocol_pawns_parse_sse_event,
  protocol_pawns_split_sse_blocks,
} from "../src/index.ts";

let pass = 0;
let fail = 0;

const check = (name: string, cond: boolean, detail?: unknown) => {
  if (cond) {
    pass++;
    console.log(`  OK   ${name}`);
  } else {
    fail++;
    console.log(`  FAIL ${name}`, detail !== undefined ? JSON.stringify(detail) : "");
  }
};

console.log("--- wire format ---");

// the api's own opening frame
check(
  "comment-only block is skipped",
  protocol_pawns_parse_sse_block(": connected\n") === null,
);

// a block split across chunk boundaries must survive
{
  const raw = "event: play_move\ndata: {\"a\":1}\n\nevent: heartbeat\ndata: {}\n\n";
  const { blocks, rest } = protocol_pawns_split_sse_blocks(raw);
  check("splits into blocks", blocks.length === 2, blocks.length);
  check("no leftover", rest === "", rest);
}

// a partial block stays in rest
{
  const { blocks, rest } = protocol_pawns_split_sse_blocks(
    "event: play_move\ndata: {\"a\":1}\n\nevent: play",
  );
  check("partial block held back", blocks.length === 1 && rest === "event: play", {
    blocks,
    rest,
  });
}

// multi-line data is joined
{
  const b = protocol_pawns_parse_sse_block("event: x\ndata: line1\ndata: line2");
  check("data lines joined", b?.data === "line1\nline2", b?.data);
}

console.log("--- payloads from the indexer ---");

// create_game, as the indexer reads it
{
  const data = JSON.stringify({
    trigger_block_height: 128903456,
    trigger_block_timestamp: "2026-01-01T00:00:00.000Z",
    event_data: {
      game_id: [128903456, "agent.near", null],
      white: { type: "Human", value: "agent.near" },
      black: { type: "Ai", value: "Easy" },
      board: ["rnbqkbnr", "pppppppp", "        ", "        ", "        ", "        ", "PPPPPPPP", "RNBQKBNR"],
    },
  });
  const ev = protocol_pawns_parse_sse_event("create_game", data) as any;
  check("create_game type", ev.event_type === "create_game");
  check("create_game block height", ev.trigger_block_height === 128903456);
  check("create_game timestamp", ev.trigger_block_timestamp === "2026-01-01T00:00:00.000Z");
  check("create_game game_id", JSON.stringify(ev.event_data.game_id) === '[128903456,"agent.near",null]');
  check("create_game board rows", ev.event_data.board.length === 8);
}

// play_move
{
  const data = JSON.stringify({
    trigger_block_height: 128903500,
    trigger_block_timestamp: "2026-01-01T00:00:01.000Z",
    event_data: {
      game_id: [128903456, "agent.near", "opponent.near"],
      color: "Black",
      mv: "e7e5",
      board: ["rnbqkbnr"],
      outcome: null,
    },
  });
  const ev = protocol_pawns_parse_sse_event("play_move", data) as any;
  check("play_move type", ev.event_type === "play_move");
  check("play_move color", ev.event_data.color === "Black");
  check("play_move mv", ev.event_data.mv === "e7e5");
  check("play_move outcome null", ev.event_data.outcome === null);
}

// play_move with an outcome
{
  const data = JSON.stringify({
    trigger_block_height: 128903500,
    trigger_block_timestamp: 1767225600000,
    event_data: {
      game_id: [1, "a.near", "b.near"],
      color: "White",
      mv: "e2e4",
      board: [],
      outcome: { result: "Victory", color: "White" },
    },
  });
  const ev = protocol_pawns_parse_sse_event("play_move", data) as any;
  check("play_move victory", ev.event_data.outcome.result === "Victory");
  check("play_move victory color", ev.event_data.outcome.color === "White");
  check("numeric timestamp kept", ev.trigger_block_timestamp === 1767225600000);
}

// challenge
{
  const data = JSON.stringify({
    trigger_block_height: 1,
    trigger_block_timestamp: "x",
    event_data: { id: "a.near-vs-b.near", challenger: "a.near", challenged: "b.near", wager: null },
  });
  const ev = protocol_pawns_parse_sse_event("challenge", data) as any;
  check("challenge id", ev.event_data.id === "a.near-vs-b.near");
}

// resign_game
{
  const data = JSON.stringify({
    trigger_block_height: 1,
    trigger_block_timestamp: "x",
    event_data: { game_id: [1, "a.near", "b.near"], resigner: "a.near", outcome: { result: "Victory", color: "Black" } },
  });
  const ev = protocol_pawns_parse_sse_event("resign_game", data) as any;
  check("resign resigner", ev.event_data.resigner === "a.near");
}

// cancel_game
{
  const data = JSON.stringify({
    trigger_block_height: 1,
    trigger_block_timestamp: "x",
    event_data: { game_id: [1, "a.near", "b.near"], cancelled_by: "a.near" },
  });
  const ev = protocol_pawns_parse_sse_event("cancel_game", data) as any;
  check("cancel cancelled_by", ev.event_data.cancelled_by === "a.near");
}

// accept_challenge / reject_challenge
{
  const data = JSON.stringify({
    trigger_block_height: 1,
    trigger_block_timestamp: "x",
    event_data: { challenge_id: "a.near-vs-b.near", game_id: [1, "a.near", "b.near"] },
  });
  const ev = protocol_pawns_parse_sse_event("accept_challenge", data) as any;
  check("accept challenge_id", ev.event_data.challenge_id === "a.near-vs-b.near");
}

// heartbeat
{
  const ev = protocol_pawns_parse_sse_event("heartbeat", "{}") as any;
  check("heartbeat type", ev.event_type === "heartbeat");
  check("heartbeat has event_data", typeof ev.event_data === "object");
}

console.log("--- robustness ---");

// garbage must not throw
check("bad json returns null", protocol_pawns_parse_sse_event("play_move", "not json") === null);
check("empty data returns null", protocol_pawns_parse_sse_event("play_move", "") === null);
check("non object json returns null", protocol_pawns_parse_sse_event("play_move", "[1,2]") === null);

// an unknown event type still comes through, so a new server event
// does not break the stream
{
  const data = JSON.stringify({ trigger_block_height: 1, trigger_block_timestamp: "x", event_data: { a: 1 } });
  const ev = protocol_pawns_parse_sse_event("brand_new_event", data) as any;
  check("unknown event passes through", ev.event_type === "brand_new_event");
}

// an event with no event_data key still parses
{
  const data = JSON.stringify({ trigger_block_height: 1, trigger_block_timestamp: "x" });
  const ev = protocol_pawns_parse_sse_event("weird", data) as any;
  check("missing event_data defaults to {}", JSON.stringify(ev.event_data) === "{}");
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
