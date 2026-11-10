// ========================================
// API_PROTOCOL_PAWNS_EVENTS
// subscribe to the sse stream of the protocol pawns api and read the
// events as an async iterator.
//
// GET /events?account={account_id} — a server-sent event stream that
// carries the events aimed at one account: a move played, a challenge
// made, a game created.
//
// the api sends a `heartbeat` every 5 seconds. the stream is dead
// when one is missing for about 10 seconds, so a caller that cares
// about liveness should watch for the heartbeats.
//
// the iterator cleans up after itself: leaving the for-await loop
// closes the connection.
// ========================================

import { protocol_pawns_parse_sse_block } from "../stuff/protocol_pawns_parse_sse";
import { protocol_pawns_parse_sse_event } from "../stuff/protocol_pawns_parse_sse";
import { protocol_pawns_split_sse_blocks } from "../stuff/protocol_pawns_parse_sse";
import { protocol_pawns_resolve_base_url } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_NETWORK } from "../stuff/protocol_pawns_network";
import type { PROTOCOL_PAWNS_EVENT } from "../types/protocol_pawns_event_types";

export interface API_PROTOCOL_PAWNS_EVENTS_PARAMS {
  // the account to watch. more than one can be watched at once, the
  // api takes the param repeated.
  account_id: string | string[];
  network?: PROTOCOL_PAWNS_NETWORK;
  // headers to add to the request.
  headers?: Record<string, string>;
  // how long to wait for the stream to open, in ms. 0 waits forever.
  timeout_ms?: number;
}

// an async iterator over the events of the stream.
export type PROTOCOL_PAWNS_EVENT_STREAM = AsyncIterableIterator<
  PROTOCOL_PAWNS_EVENT
>;

// build the url of the stream.
export function protocol_pawns_events_url({
  account_id,
  network,
}: {
  account_id: string | string[];
  network?: PROTOCOL_PAWNS_NETWORK;
}): string {
  const accounts = Array.isArray(account_id) ? account_id : [account_id];
  const params = new URLSearchParams();
  for (const account of accounts) {
    params.append("account", account);
  }
  return `${protocol_pawns_resolve_base_url(network)}/events?${params.toString()}`;
}

// open the stream and read it as an async iterator.
//
// the returned iterator yields every event the api sends, heartbeats
// included. break out of the loop, or call `.return()`, to close the
// connection.
export async function api_protocol_pawns_events({
  account_id,
  network,
  headers = {},
  timeout_ms,
}: API_PROTOCOL_PAWNS_EVENTS_PARAMS): Promise<PROTOCOL_PAWNS_EVENT_STREAM> {
  const url = protocol_pawns_events_url({ account_id, network });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/event-stream",
      ...headers,
    },
    signal:
      timeout_ms === undefined ? undefined : AbortSignal.timeout(timeout_ms),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `api_protocol_pawns_events failed: ${response.status} ${text}`,
    );
  }

  const body = response.body;
  if (body === null) {
    throw new Error("api_protocol_pawns_events failed: the response has no body");
  }

  const reader = body.getReader();
  const decoder = new TextDecoder();

  // events waiting to be handed out, plus the text of a block that
  // was cut in half by a chunk boundary.
  const queue: PROTOCOL_PAWNS_EVENT[] = [];
  let buffer = "";
  let done = false;

  // read one chunk and turn it into events.
  const pump = async (): Promise<boolean> => {
    const chunk = await reader.read();
    if (chunk.value === undefined) return false;

    buffer += decoder.decode(chunk.value, { stream: true });

    const { blocks, rest } = protocol_pawns_split_sse_blocks(buffer);
    buffer = rest;

    for (const block of blocks) {
      const parsed = protocol_pawns_parse_sse_block(block);
      if (parsed === null) continue;
      const event = protocol_pawns_parse_sse_event(parsed.event, parsed.data);
      if (event !== null) queue.push(event);
    }

    return true;
  };

  const stream: PROTOCOL_PAWNS_EVENT_STREAM = {
    async next(): Promise<IteratorResult<PROTOCOL_PAWNS_EVENT>> {
      for (;;) {
        if (queue.length > 0) {
          const value = queue.shift() as PROTOCOL_PAWNS_EVENT;
          return { value, done: false };
        }
        if (done) return { value: undefined, done: true };

        const alive = await pump();
        if (!alive) {
          done = true;
          return { value: undefined, done: true };
        }
      }
    },

    async return(): Promise<IteratorResult<PROTOCOL_PAWNS_EVENT>> {
      done = true;
      queue.length = 0;
      try {
        await reader.cancel();
      } catch {
        /* the stream is already gone */
      }
      return { value: undefined, done: true };
    },

    async throw(error?: unknown): Promise<IteratorResult<PROTOCOL_PAWNS_EVENT>> {
      await stream.return?.();
      throw error;
    },

    [Symbol.asyncIterator]() {
      return stream;
    },
  };

  return stream;
}
// ========================================
// copyright 2026 by sleet.near
