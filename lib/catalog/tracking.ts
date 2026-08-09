export interface AwinClickRefs {
  clickref: string;
  clickref2?: string;
  clickref3?: string;
  clickref4?: string;
}

const SAFE_REF = /^[a-z0-9][a-z0-9_-]{0,49}$/i;

export function addAwinClickRefs(url: string, refs: AwinClickRefs): string {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") throw new Error("Affiliate links must use HTTPS");
  Object.entries(refs).forEach(([key, value]) => {
    if (value === undefined) return;
    if (!SAFE_REF.test(value)) throw new Error(`Invalid ${key}`);
    parsed.searchParams.set(key, value);
  });
  return parsed.toString();
}

export function shortProductRef(productId: string): string {
  return productId.toLowerCase().replace(/[^a-z0-9]/g, "").slice(-24) || "product";
}
