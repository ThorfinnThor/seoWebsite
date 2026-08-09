import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export function stableJson(value: unknown): string {
  return `${JSON.stringify(value, (_key, child) => {
    if (!child || typeof child !== "object" || Array.isArray(child)) return child;
    return Object.fromEntries(Object.entries(child as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)));
  }, 2)}\n`;
}

export async function writeFilesAtomically(files: Record<string, unknown>): Promise<void> {
  const tempRoot = path.join(process.cwd(), ".tmp", `catalog-${process.pid}-${Date.now()}`);
  await mkdir(tempRoot, { recursive: true });
  try {
    for (const [destination, value] of Object.entries(files)) {
      const relative = path.relative(process.cwd(), path.resolve(destination));
      if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`Refusing to write outside workspace: ${destination}`);
      const staged = path.join(tempRoot, relative);
      await mkdir(path.dirname(staged), { recursive: true });
      await writeFile(staged, stableJson(value), { encoding: "utf8", mode: 0o644 });
    }
    for (const destination of Object.keys(files).sort()) {
      const relative = path.relative(process.cwd(), path.resolve(destination));
      const staged = path.join(tempRoot, relative);
      await mkdir(path.dirname(path.resolve(destination)), { recursive: true });
      await rename(staged, path.resolve(destination));
    }
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}
