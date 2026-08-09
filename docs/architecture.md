# Architecture

MachPlan is intentionally serverless in the literal sense: every user-facing route is statically exported and the recommendation logic runs in the browser. The browser fetches only `public/data/garden-house/catalog.json` when the user asks for results.

Product ingestion is an offline build concern. GitHub Actions streams configured Awin feeds through decompression and CSV parsing, identifies broad candidates, normalizes conservative product attributes, applies curated overrides and validates all output before atomically replacing public snapshots.

Products and merchant offers are separate entities. Recommendation functions first enforce review, availability, physical compatibility, hard preferences and budget status. Only compatible products are scored. Commission data is absent from the recommendation input.

See [IMPLEMENTATION.md](../IMPLEMENTATION.md) for full constraints and future Supabase thresholds.
