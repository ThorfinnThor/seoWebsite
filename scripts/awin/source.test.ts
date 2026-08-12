import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { parseFeedStream } from "./source";

describe("Awin feed source limits", () => {
  it("parses rows up to the configured maximum", async () => {
    const rows = [];
    for await (const row of parseFeedStream(Readable.from(["id,name\n1,Haus\n2,Gerät\n"]), { maxRows: 2 })) rows.push(row);
    expect(rows).toEqual([{ id: "1", name: "Haus" }, { id: "2", name: "Gerät" }]);
  });

  it("rejects a feed that exceeds the row limit", async () => {
    const consume = async () => {
      for await (const _row of parseFeedStream(Readable.from(["id\n1\n2\n"]), { maxRows: 1 })) {
        // Consume the stream to trigger the boundary.
      }
    };
    await expect(consume()).rejects.toThrow("Feed exceeds the 1 row limit");
  });
});
