// ========================================
// PROTOCOL_PAWNS_PARSE_SSE
// parse the text/event-stream wire format into the events the api
// sends.
//
// the format is the one the html spec defines: a block of lines
// separated by a blank line, each block holding `field: value` lines.
// a line starting with a colon is a comment, the api uses it for its
// `: connected` greeting.
//
// this is a plain text parser, it does not open a connection.
// ========================================

import type {
  PROTOCOL_PAWNS_EVENT,
  PROTOCOL_PAWNS_EVENT_ENVELOPE,
} from "../types/protocol_pawns_event_types";

const is_record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// one field of one block.
interface SSE_FIELD {
  name: string;
  value: string;
}

// split a raw chunk into its blocks. a block ends at a blank line.
export function protocol_pawns_split_sse_blocks(
  chunk: string,
): { blocks: string[]; rest: string } {
  const normalized = chunk.replace(/\r\n/g, "\n");
  const parts = normalized.split("\n\n");
  const rest = parts.pop() ?? "";
  return { blocks: parts, rest };
}

// read the fields of one block. comments are dropped, `data` lines are
// joined with a newline.
export function protocol_pawns_parse_sse_block(
  block: string,
): { event: string; data: string } | null {
  const fields: SSE_FIELD[] = [];

  for (const line of block.split("\n")) {
    if (line.length === 0) continue;
    // a comment, the api sends `: connected` first
    if (line.startsWith(":")) continue;

    const colon = line.indexOf(":");
    if (colon === -1) {
      fields.push({ name: line, value: "" });
      continue;
    }

    const name = line.slice(0, colon);
    let value = line.slice(colon + 1);
    // a single leading space after the colon is part of the framing
    if (value.startsWith(" ")) value = value.slice(1);

    fields.push({ name, value });
  }

  if (fields.length === 0) return null;

  const event_field = fields.find((f) => f.name === "event");
  const data_fields = fields.filter((f) => f.name === "data");

  return {
    event: event_field?.value ?? "message",
    data: data_fields.map((f) => f.value).join("\n"),
  };
}

// turn one parsed block into a typed event.
export function protocol_pawns_parse_sse_event(
  event: string,
  data: string,
): PROTOCOL_PAWNS_EVENT | null {
  if (event === "heartbeat") {
    // the api sends a bare `data: {}` for the heartbeat, so the
    // envelope is filled in with zeroes. the shape stays the same as
    // every other event, so a consumer can read event_data of any
    // event without checking the type first.
    return {
      event_type: "heartbeat",
      trigger_block_height: 0,
      trigger_block_timestamp: 0,
      event_data: {},
    };
  }

  if (data.length === 0) return null;

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(data);
  } catch {
    // a block we cannot read is not worth breaking the stream over
    return null;
  }

  if (!is_record(parsed)) return null;

  const event_data = is_record(parsed["event_data"])
    ? parsed["event_data"]
    : {};

  const envelope: PROTOCOL_PAWNS_EVENT_ENVELOPE = {
    trigger_block_height: Number(parsed["trigger_block_height"] ?? 0),
    trigger_block_timestamp:
      parsed["trigger_block_timestamp"] as string | number,
    event_data,
  };

  return {
    event_type: event,
    ...envelope,
  } as PROTOCOL_PAWNS_EVENT;
}
// ========================================
// copyright 2026 by sleet.near
