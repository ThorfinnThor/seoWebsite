import { describe, expect, it } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  analyticsCookieDomains,
  analyticsCookieNames,
  deleteAnalyticsCookies,
  getConsentStorage,
  isEmbeddedContext,
  readConsent,
  writeConsent,
} from "./consent";

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => void values.set(key, value) };
}

describe("consent storage", () => {
  it("has no preselected choice", () => {
    expect(readConsent(memoryStorage())).toBeNull();
  });

  it("round-trips granted and denied and ignores unknown values", () => {
    const storage = memoryStorage();
    writeConsent(storage, "granted");
    expect(readConsent(storage)).toBe("granted");
    writeConsent(storage, "denied");
    expect(readConsent(storage)).toBe("denied");
    expect(readConsent(memoryStorage({ [CONSENT_STORAGE_KEY]: "yes" }))).toBeNull();
  });

  it("tolerates storage that throws, as in sandboxed iframes", () => {
    const scope = Object.defineProperty({}, "localStorage", { get: () => { throw new Error("SecurityError"); } }) as { localStorage: never };
    expect(getConsentStorage(scope)).toBeNull();
    expect(readConsent(null)).toBeNull();
    expect(() => writeConsent(null, "granted")).not.toThrow();
  });
});

describe("embed detection", () => {
  it("treats the embed route and any iframe as embedded", () => {
    expect(isEmbeddedContext("/embed/gartenhaus-planer/", true)).toBe(true);
    expect(isEmbeddedContext("/garten/gartenhaus-planer/", false)).toBe(true);
    expect(isEmbeddedContext("/garten/gartenhaus-planer/", true)).toBe(false);
    expect(isEmbeddedContext("/embedded-guide/", true)).toBe(false);
  });
});

describe("analytics cookie removal", () => {
  it("finds only Google Analytics cookies", () => {
    expect(analyticsCookieNames("_ga=GA1.1.1; theme=dark; _ga_Q8FZ5Z7V04=GS1; _gid=x")).toEqual(["_ga", "_ga_Q8FZ5Z7V04", "_gid"]);
  });

  it("covers host-only and parent domains", () => {
    expect(analyticsCookieDomains("www.passendplanen.de")).toEqual([null, ".www.passendplanen.de", ".passendplanen.de"]);
  });

  it("expires every analytics cookie on every domain variant", () => {
    const writes: string[] = [];
    const doc = { get cookie() { return "_ga=1; other=2; _ga_ABC=3"; }, set cookie(value: string) { writes.push(value); } };
    deleteAnalyticsCookies(doc, "passendplanen.de");
    expect(writes).toHaveLength(4);
    expect(writes.every((write) => write.includes("expires=Thu, 01 Jan 1970"))).toBe(true);
    expect(writes.some((write) => write.startsWith("other="))).toBe(false);
  });
});
