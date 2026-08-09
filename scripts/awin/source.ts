import { Readable } from "node:stream";
import gunzipMaybe from "gunzip-maybe";
import { parse } from "csv-parse";
import type { RawFeedRow } from "./types";

export async function* streamFeedRows(url: string): AsyncGenerator<RawFeedRow> {
  const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "MachPlan-FeedSync/1.0" } });
  if (!response.ok || !response.body) throw new Error(`Feed download failed with status ${response.status}`);
  yield* parseFeedStream(Readable.fromWeb(response.body as never));
}

export async function* parseFeedStream(source: Readable): AsyncGenerator<RawFeedRow> {
  const parser = source.pipe(gunzipMaybe()).pipe(parse({ columns: true, bom: true, skip_empty_lines: true, relax_column_count: true, trim: true }));
  for await (const row of parser) yield row as RawFeedRow;
}
