# Garden-house data review

After a successful feed sync, open `data/review/garden-house.json`. Candidates are ordered by offer count, then price and stable ID.

For a product selected for publication:

1. Confirm identity (GTIN, or brand and MPN) and variant.
2. Confirm assembled width and depth, footprint, material and roof type on the merchant or manufacturer page.
3. Check door width and whether a floor is included or a compatible floor kit is available.
4. Add an entry with the same `id` to `data/overrides/garden-house.json`.
5. Set `reviewed: true` and `dataQuality: "curated"` only when the recommendation-relevant fields are verified. Use `mixed` if the override is only partially curated.
6. Keep the internal `reviewNote` concise; it is stripped from public data.
7. Run `npm run sync:products` again and then `npm run verify`.

Never approve dimensions parsed only from a product name without checking the actual assembled-dimension source. Do not copy raw descriptions or secret feed URLs into overrides.
