# Architecture

MachPlan is intentionally serverless in the literal sense: every user-facing route is statically exported and all calculator/recommendation logic runs in the browser. Garden-house, dehumidifier and irrigation product data is split into separate static catalogs; a planner fetches only its relevant catalog and only when results need product data. The terrace material calculator has no product catalog and works entirely from its typed local rules.

The public site currently exposes four deterministic planning areas:

- garden-house requirements and reviewed product matching;
- domestic dehumidifier sizing and reviewed product matching;
- irrigation component/system planning;
- terrace decking and substructure quantity planning.

Product ingestion is an offline build concern. GitHub Actions streams configured Awin feeds through decompression and CSV parsing, identifies broad candidates, normalizes conservative product attributes, applies curated overrides and validates all output before atomically replacing public snapshots.

Where products are recommended, products and merchant offers are separate entities. Recommendation functions first enforce review, availability, physical compatibility, hard preferences and budget status. Only compatible products are scored. Commission data is absent from every recommendation input.

See [IMPLEMENTATION.md](../IMPLEMENTATION.md) for full constraints and future Supabase thresholds.
