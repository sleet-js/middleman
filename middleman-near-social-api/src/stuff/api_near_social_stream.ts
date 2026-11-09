// ========================================
// API_NEAR_SOCIAL_STREAM
// open the server-sent-events stream at /v1/stream and hand the raw
// response to the caller, who reads it with their own reader.
//
// the api sends one `block` event per indexed block that contains
// social writes. each event's data is a NEAR_SOCIAL_BLOCK_EVENT.
//
// use `api_near_social_stream_events` for the parsed version; this
// one is there for callers that want the raw response.
// ========================================

import { NEAR_SOCIAL_BASE_URL } from "./near_social_base_url";
import type { NEAR_SOCIAL_BLOCK_EVENT } from "../types/near_social_types";

export interface API_NEAR_SOCIAL_STREAM_PARAMS {
  label?: string;
  fallback?: string;
}

export async function api_near_social_stream(
  params: API_NEAR_SOCIAL_STREAM_PARAMS = {},
): Promise<Response> {
  const label = params.label ?? "NEAR SOCIAL STREAM";
  const fallback = params.fallback ?? "api_near_social_stream failed";
  const url = `${NEAR_SOCIAL_BASE_URL}/v1/stream`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "text/event-stream" },
  });

  if (!response.ok) {
    const error = new Error(
      `${fallback}: ${response.status}: ${response.statusText}`,
    );
    error.name = "NEAR_SOCIAL_API_ERROR";
    throw error;
  }

  console.log("=============================");
  console.log(` ${label} via GET on:`, url);
  console.log(
    "RESPONSE STATUS:",
    `${response.status} - ${response.statusText}`,
  );
  console.log("=============================");
  return response;
}

// parse the sse body into the events it carries. `signal` stops the
// loop; without one the stream runs until the caller breaks out.
export async function api_near_social_stream_events(options: {
  response: Response;
  signal?: AbortSignal;
  on_event?: (event: NEAR_SOCIAL_BLOCK_EVENT) => void;
}): Promise<NEAR_SOCIAL_BLOCK_EVENT[]> {
  const { response, signal, on_event } = options;
  const body = response.body;
  if (body === null) return [];

  const events: NEAR_SOCIAL_BLOCK_EVENT[] = [];
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // a pending read never wakes on its own, so an abort has to cancel
  // the reader for the signal to take effect.
  const on_abort = () => {
    reader.cancel().catch(() => {
      // the stream is going away anyway.
    });
  };
  if (signal !== undefined) {
    if (signal.aborted) on_abort();
    else signal.addEventListener("abort", on_abort, { once: true });
  }

  try {
    while (true) {
      if (signal?.aborted === true) break;

      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // sse frames are separated by a blank line.
      let split = buffer.indexOf("\n\n");
      while (split !== -1) {
        const frame = buffer.slice(0, split);
        buffer = buffer.slice(split + 2);

        const data_lines: string[] = [];
        for (const line of frame.split("\n")) {
          if (line.startsWith("data:")) {
            data_lines.push(line.slice(5).trim());
          }
        }
        if (data_lines.length > 0) {
          try {
            const parsed = JSON.parse(
              data_lines.join("\n"),
            ) as NEAR_SOCIAL_BLOCK_EVENT;
            events.push(parsed);
            on_event?.(parsed);
          } catch {
            // a frame we cannot read is skipped, not fatal.
          }
        }

        split = buffer.indexOf("\n\n");
      }
    }
  } finally {
    signal?.removeEventListener("abort", on_abort);
    reader.releaseLock();
  }

  return events;
}
// ========================================
// copyright 2026 by sleet.near
