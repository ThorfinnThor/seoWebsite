import { Readable, Transform } from "node:stream";
import gunzipMaybe from "gunzip-maybe";
import { parse } from "csv-parse";
import type { RawFeedRow } from "./types";

const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_MAX_DOWNLOAD_BYTES = 500_000_000;
const DEFAULT_MAX_ROWS = 1_000_000;

type FeedLimits = { timeoutMs: number; maxDownloadBytes: number; maxRows: number };

export async function* streamFeedRows(url: string): AsyncGenerator<RawFeedRow> {
  const limits = readFeedLimits();
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "PassendPlanen-FeedSync/1.0" },
    signal: AbortSignal.timeout(limits.timeoutMs),
  });
  if (!response.ok || !response.body) throw new Error(`Feed download failed with status ${response.status}`);
  const declaredBytes = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredBytes) && declaredBytes > limits.maxDownloadBytes) {
    throw new Error(`Feed download exceeds the ${limits.maxDownloadBytes} byte limit`);
  }
  const limitedSource = Readable.fromWeb(response.body as never).pipe(limitBytes(limits.maxDownloadBytes));
  yield* parseFeedStream(limitedSource, { maxRows: limits.maxRows });
}

export async function* parseFeedStream(source: Readable, { maxRows = DEFAULT_MAX_ROWS }: { maxRows?: number } = {}): AsyncGenerator<RawFeedRow> {
  const parser = source.pipe(gunzipMaybe()).pipe(parse({ columns: true, bom: true, skip_empty_lines: true, relax_column_count: true, trim: true }));
  let rows = 0;
  for await (const row of parser) {
    rows += 1;
    if (rows > maxRows) throw new Error(`Feed exceeds the ${maxRows} row limit`);
    yield row as RawFeedRow;
  }
}

function readFeedLimits(): FeedLimits {
  return {
    timeoutMs: positiveInteger("FEED_DOWNLOAD_TIMEOUT_MS", DEFAULT_TIMEOUT_MS),
    maxDownloadBytes: positiveInteger("FEED_MAX_DOWNLOAD_BYTES", DEFAULT_MAX_DOWNLOAD_BYTES),
    maxRows: positiveInteger("FEED_MAX_ROWS", DEFAULT_MAX_ROWS),
  };
}

function positiveInteger(name: string, fallback: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${name} must be a positive integer`);
  return value;
}

function limitBytes(maxBytes: number) {
  let bytes = 0;
  return new Transform({
    transform(chunk, _encoding, callback) {
      bytes += Buffer.byteLength(chunk);
      if (bytes > maxBytes) callback(new Error(`Feed download exceeds the ${maxBytes} byte limit`));
      else callback(null, chunk);
    },
  });
}
