# Architecture

MachPlan is intentionally serverless in the literal sense: every user-facing route is statically exported and all calculator/recommendation logic runs in the browser. Garden-house, dehumidifier and irrigation product data is split into separate static catalogs; a planner fetches only its relevant catalog and only when results need product data. The terrace, privacy-screen, flooring, greenhouse, robot-mower, carport and drywall planning tools have no product catalog and work entirely from typed local rules.

The public site currently exposes ten deterministic planning areas:

- garden-house requirements and reviewed product matching;
- domestic dehumidifier sizing and reviewed product matching;
- irrigation component/system planning;
- terrace decking and substructure quantity planning;
- privacy-screen fields, gate modules, posts and system-raster planning for straight runs;
- floating flooring, package, underlay and skirting-board quantity planning;
- greenhouse footprint, internal layout, base-profile and rainwater-framework planning.
- robot-mower net-area, capacity-class, terrain and installation-framework planning.
- carport clear-space, movement-reserve and roof-water-framework planning.
- drywall board, uninterrupted stud-grid, track and insulation quantity planning.

Planner inputs are validated before being stored in the current tab's `sessionStorage`. This protects work across accidental reloads without creating an account, server write or cross-device profile. Invalid or outdated stored shapes are discarded; reset controls overwrite them with the typed defaults.

Product ingestion is an offline build concern. GitHub Actions streams configured Awin feeds through decompression and CSV parsing, identifies broad candidates, normalizes conservative product attributes, applies curated overrides and validates all output before atomically replacing public snapshots.

Where products are recommended, products and merchant offers are separate entities. Recommendation functions first enforce review, availability, physical compatibility, hard preferences and budget status. Only compatible products are scored. Commission data is absent from every recommendation input.

See [IMPLEMENTATION.md](../IMPLEMENTATION.md) for full constraints and future Supabase thresholds.
