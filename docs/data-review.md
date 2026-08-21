# Affiliate data review

After a successful feed sync, open the matching queue under `data/review/` (`garden-house`, `dehumidifier`, `irrigation`, `robot-mower` or `flooring`). Candidates are ordered by offer count, then price and stable ID.

For a product selected for publication:

1. Confirm identity (GTIN, or brand and MPN) and variant.
2. Confirm all recommendation-relevant attributes on the merchant or manufacturer page. For robot mowers this includes rated area, slope and passage width; for flooring this includes floor type, installation, package coverage and suitability for heating/rooms.
3. Add an entry with the same `id` to the matching `data/overrides/<vertical>.json` file.
5. Set `reviewed: true` and `dataQuality: "curated"` only when the recommendation-relevant fields are verified. Use `mixed` if the override is only partially curated.
6. Keep the internal `reviewNote` concise; it is stripped from public data.
7. Run `npm run sync:products` again and then `npm run verify`.

Never approve dimensions, package coverage or technical limits parsed only from a product name without checking the actual source. Do not copy raw descriptions or secret feed URLs into overrides.
