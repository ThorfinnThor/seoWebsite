# MachPlan – Implementation Plan

**Status:** implementation-ready specification for Codex / coding agent  
**Target:** Germany-first static affiliate decision-engine for Haus & Garten  
**Primary stack:** Next.js + TypeScript + GitHub + GitHub Actions + Vercel  
**Runtime database:** none in V1  
**Runtime APIs:** none in V1  
**Product data:** normalized static JSON generated from affiliate product feeds  
**AI/LLM inference:** none  
**Future database option:** Supabase only when explicit thresholds in this document are reached

---

## 0. Instructions to the coding agent

Treat this file as the source-of-truth implementation specification.

### Hard constraints

1. **Do not add Supabase, Prisma, Drizzle, Firebase, Redis, Elasticsearch, Algolia, a vector database, or any runtime database in V1.**
2. **Do not add an LLM, image model, embeddings, or any AI API.**
3. **Do not add Next.js API routes, Server Actions, middleware that requires a server runtime, SSR, ISR, or other runtime compute unless this document is explicitly amended.**
4. The user-facing site must work as a **static Next.js export** with `output: "export"`.
5. Product selection and calculators run **deterministically in the browser** from static JSON.
6. External feed ingestion runs **offline in GitHub Actions**, not from the browser and not from Vercel Functions.
7. Never expose affiliate feed credentials, Awin data-feed keys, Publisher API tokens, or feed download URLs to browser bundles or `public/`.
8. Never commit raw merchant feed files. Commit only compact normalized/validated data that is safe to publish.
9. **Affiliate commission must never be a recommendation-ranking factor.** Recommendations are user-oriented.
10. New feed products are **not allowed into recommendations automatically**. They must pass the review gate (`reviewed: true`).
11. Price, stock and product claims must carry a `generatedAt` / `updatedAt` timestamp so stale data can be recognized.
12. Do not implement legal, planning-permission, structural-engineering, electrical, medical, mold-remediation, or hydraulic-engineering decisions as authoritative results.
13. Prefer simple typed TypeScript functions over a generic rule DSL. Extract generic infrastructure only after at least two verticals demonstrate a real shared pattern.
14. Keep the repository private at launch because generated/review data and operational configuration are business assets.
15. Before considering the project complete, run all acceptance checks specified in this file.

### Working project name

Use **MachPlan** as a working name only. Do not assume a domain is available or a trademark has been cleared.

### Product promise

> Plane dein Haus- oder Gartenprojekt. Berechne, was du brauchst. Finde passende Produkte.

The site is a **decision and planning engine**, not a generic review blog and not a marketplace.

---

# 1. Product strategy

## 1.1 Core user flow

Every vertical should conform to the same conceptual flow:

```text
User problem / project
        ↓
5–10 deterministic questions
        ↓
Typed rules / calculator
        ↓
Requirement object
        ↓
Hard product compatibility filters
        ↓
User-centric scoring
        ↓
Top product options / material list
        ↓
Affiliate merchant links
```

The competitive advantage is the structured mapping:

```text
Problem → requirements → compatible products → shopping decision
```

The product-feed itself is not the moat. The proprietary asset is the curated decision logic, product attribute corrections, compatibility data and conversion data accumulated over time.

## 1.2 Initial verticals

Build the platform to support these three verticals:

1. **Gartenhaus-Planer** – first production vertical and primary initial implementation.
2. **Luftentfeuchter-Rechner** – second vertical; validates high-traffic/lower-AOV economics.
3. **Bewässerungsplaner** – third vertical; validates multi-item basket/compatibility economics.

Do not block launch on all three. The implementation sequence is:

```text
shared shell
→ Gartenhaus production-ready
→ deploy
→ real feed quality validation
→ Luftentfeuchter
→ Bewässerung
```

## 1.3 Future verticals that fit the same site

Potential later clusters:

- Terrasse
- Zaun / Sichtschutz
- Carport
- Gewächshaus
- Pooltechnik
- Rasen / Mähroboter
- Boden / Laminat / Vinyl
- Trockenbau
- Raumklima / Klimaanlage / Luftreiniger
- Werkzeug / Akkusysteme
- Energie / Balkonkraftwerk / Powerstation

Do not add unrelated verticals such as coffee, pet food, fashion or travel to this domain merely for affiliate revenue.

---

# 2. High-level architecture

## 2.1 V1 architecture

```text
                         PRIVATE / BUILD TIME

  Awin merchant feeds
          │
          │  GitHub Actions scheduled ingestion
          ▼
  streaming download + decompression + CSV parse
          │
          ▼
  vertical candidate detection
          │
          ▼
  normalization
          │
          ├──────────► feed quality report
          │
          ├──────────► manual review queue
          │
          ▼
  manual overrides / curated attributes
          │
          ▼
  validation + safety guards
          │
          ▼
  compact versioned catalog JSON
          │
          ▼
  commit generated catalog to GitHub
          │
          ▼
  Vercel Git integration triggers static build


                         PUBLIC / RUNTIME

  static HTML/CSS/JS + JSON on Vercel CDN
          │
          ▼
  visitor opens calculator
          │
          ▼
  browser loads only relevant vertical JSON
          │
          ▼
  deterministic rules + filters + scoring
          │
          ▼
  product result cards
          │
          ▼
  Awin affiliate tracking URL
          │
          ▼
  merchant
```

## 2.2 Why no Supabase in V1

The system initially has:

- no user accounts;
- no saved projects;
- no writes from visitors;
- no need for real-time data;
- no server-side personalization;
- relatively small, curated product catalogs;
- deterministic calculations that run cheaply in-browser.

A runtime database would add operational cost and failure modes without solving a current problem.

## 2.3 Source of truth

GitHub is the source of truth for:

- application code;
- product rule code;
- configurable heuristics;
- curated overrides;
- source/merchant configuration without secrets;
- normalized public catalog snapshots;
- SEO pages;
- schemas and migrations;
- CI/CD workflows.

Do **not** commit:

- Awin API/data-feed secrets;
- raw downloaded CSV/GZIP feeds;
- raw affiliate transactions;
- any personal user data.

---

# 3. Technology stack

## 3.1 Required

- Node.js 24
- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Zod for runtime data validation
- Vitest for unit tests
- `csv-parse` for feed ingestion
- `gunzip-maybe` for compressed feed streams
- GitHub private repository
- GitHub Actions for CI and feed ingestion
- Vercel Git integration for Preview + Production deployment

## 3.2 Explicitly not required

- Supabase
- PostgreSQL at runtime
- Vercel Functions
- Edge Functions
- Server Actions
- API routes
- ISR
- Redis
- background workers outside GitHub Actions
- AI APIs
- vector search
- full-text search service

## 3.3 Next.js static config

Use:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

`next build` must produce the static deployment in `out/`.

Do not introduce features unsupported by static export. In particular, avoid runtime-only Server Actions, ISR, redirects/headers requiring server configuration, and default dynamic image optimization.

---

# 4. Repository structure

Use the following target structure. Existing files may be retained if equivalent, but move gradually toward this organization.

```text
machplan/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   │
│   ├── garten/
│   │   ├── page.tsx
│   │   ├── gartenhaus-planer/
│   │   │   ├── page.tsx
│   │   │   └── GardenHousePlanner.tsx
│   │   ├── gartenhaus-fundament/
│   │   │   └── page.tsx
│   │   ├── gartenhaus-groesse/
│   │   │   └── page.tsx
│   │   ├── gartenhaus-kosten/
│   │   │   └── page.tsx
│   │   └── bewaesserungs-planer/
│   │       ├── page.tsx
│   │       └── IrrigationPlanner.tsx
│   │
│   └── haus/
│       └── raumklima/
│           ├── page.tsx
│           ├── luftentfeuchter-rechner/
│           │   ├── page.tsx
│           │   └── DehumidifierPlanner.tsx
│           ├── luftentfeuchter-keller/
│           │   └── page.tsx
│           └── luftentfeuchter-stromverbrauch/
│               └── page.tsx
│
├── components/
│   ├── affiliate/
│   │   ├── AffiliateDisclosure.tsx
│   │   └── AffiliateLink.tsx
│   ├── calculator/
│   │   ├── CalculatorShell.tsx
│   │   ├── Step.tsx
│   │   └── ResultSummary.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductImage.tsx
│   │   ├── ProductReasons.tsx
│   │   └── PriceDisplay.tsx
│   └── seo/
│       └── Breadcrumbs.tsx
│
├── lib/
│   ├── catalog/
│   │   ├── types.ts
│   │   ├── load-client-catalog.ts
│   │   ├── tracking.ts
│   │   └── price.ts
│   ├── garden-house/
│   │   ├── types.ts
│   │   ├── rules.ts
│   │   ├── recommend.ts
│   │   └── *.test.ts
│   ├── dehumidifier/
│   │   ├── types.ts
│   │   ├── rules.ts
│   │   ├── recommend.ts
│   │   └── *.test.ts
│   └── irrigation/
│       ├── types.ts
│       ├── rules.ts
│       ├── recommend.ts
│       └── *.test.ts
│
├── data/
│   ├── manual/
│   │   ├── garden-house-rules.json
│   │   ├── dehumidifier-rules.json
│   │   ├── irrigation-rules.json
│   │   └── merchants.json
│   ├── overrides/
│   │   ├── garden-house.json
│   │   ├── dehumidifier.json
│   │   └── irrigation.json
│   └── review/
│       ├── garden-house.json
│       ├── dehumidifier.json
│       └── irrigation.json
│
├── public/
│   └── data/
│       ├── manifest.json
│       ├── garden-house/
│       │   ├── catalog.json
│       │   └── feed-report.json
│       ├── dehumidifier/
│       │   ├── catalog.json
│       │   └── feed-report.json
│       └── irrigation/
│           ├── catalog.json
│           └── feed-report.json
│
├── scripts/
│   ├── awin/
│   │   ├── source.ts
│   │   ├── types.ts
│   │   ├── sync-products.ts
│   │   ├── garden-house-normalizer.ts
│   │   ├── dehumidifier-normalizer.ts
│   │   └── irrigation-normalizer.ts
│   ├── catalog/
│   │   ├── validate.ts
│   │   ├── safeguards.ts
│   │   └── write-atomic.ts
│   └── validate-data.ts
│
├── tests/
│   └── fixtures/
│       └── awin/
│           ├── garden-house.csv
│           ├── dehumidifier.csv
│           └── irrigation.csv
│
├── .github/
│   ├── dependabot.yml                 # optional but recommended
│   └── workflows/
│       ├── ci.yml
│       └── sync-products.yml
│
├── docs/
│   ├── architecture.md
│   ├── deployment.md
│   ├── data-review.md
│   └── verticals/
│       ├── garden-house.md
│       ├── dehumidifier.md
│       └── irrigation.md
│
├── .env.example
├── .gitignore
├── .nvmrc
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── IMPLEMENTATION.md
```

Do not create a monorepo in V1.

---

# 5. Package and build configuration

## 5.1 `package.json`

Minimum scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "validate:data": "tsx scripts/validate-data.ts",
    "sync:products": "tsx scripts/awin/sync-products.ts",
    "verify": "npm run validate:data && npm run test && npm run typecheck && npm run build"
  }
}
```

Generate and commit `package-lock.json` immediately, then use `npm ci` in CI rather than `npm install`.

## 5.2 Node version

`.nvmrc`:

```text
24
```

CI must use the same major.

## 5.3 TypeScript

Use strict TypeScript. Do not bypass schema errors with `any` except at the raw feed boundary. Convert raw external data into validated internal types immediately.

---

# 6. Static catalog architecture

## 6.1 Separate product identity from merchant offer

This is non-negotiable.

A **product** describes what the item is. An **offer** describes where/how it is sold.

The same product may have multiple offers from multiple merchants.

### Generic catalog envelope

```ts
export interface StaticCatalog<TProduct, TOffer> {
  schemaVersion: number;
  vertical: string;
  generatedAt: string;
  sourceUpdatedAt?: string;
  products: TProduct[];
  offers: TOffer[];
}
```

### Generic product base

```ts
export type DataQuality = "feed" | "mixed" | "curated";

export interface ProductBase {
  id: string;
  name: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
  reviewed: boolean;
  dataQuality: DataQuality;
  sourceUpdatedAt?: string;
}
```

### Generic offer base

```ts
export type DeliveryCostStatus = "known" | "free" | "unknown";

export interface OfferBase {
  id: string;
  productId: string;
  merchantId: string;
  merchantName: string;
  merchantProductId: string;
  priceEur: number;
  deliveryCostEur?: number;
  deliveryCostStatus: DeliveryCostStatus;
  available: boolean;
  affiliateUrl: string;
  imageUrl?: string;
  updatedAt: string;
}
```

### Why delivery cost needs an explicit state

Do not silently treat missing shipping cost as `0`.

The UI must distinguish:

```text
known:   2.999 € + 49 € Versand = 3.048 €
free:    2.999 € inkl. Versand
unknown: 2.999 € + Versandkosten beim Händler prüfen
```

For a hard user budget, an offer with unknown delivery cost has budget status `unknown`, not confidently `yes`.

## 6.2 Public manifest

Create:

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-08-09T10:00:00Z",
  "verticals": {
    "garden-house": {
      "catalog": "/data/garden-house/catalog.json",
      "generatedAt": "2026-08-09T10:00:00Z"
    }
  }
}
```

Purpose:

- simple client discovery;
- future catalog sharding;
- debugging stale deploys;
- common schema version.

## 6.3 Catalog size policy

V1 goal:

- 30–50 reviewed products for first real garden-house launch;
- hundreds of unreviewed candidates are fine in review data, but do not unnecessarily ship them to users;
- only publish fields needed by the browser.

Guidelines:

- target each loaded vertical catalog at **well under ~2 MB uncompressed** initially;
- do not include full raw descriptions/specifications in public runtime JSON;
- no base64 images;
- no raw feed rows;
- no secret feed URLs;
- if a vertical catalog starts approaching several MB, shard it before considering a database.

### Sharding before Supabase

If needed later:

```text
/data/garden-house/manifest.json
/data/garden-house/products-000.json
/data/garden-house/products-001.json
/data/garden-house/offers-000.json
```

Static sharding is the first scaling step. A large JSON file alone is not a reason to add Supabase.

---

# 7. Product identity and deduplication

Use stable IDs in this order:

1. valid GTIN/EAN when trustworthy;
2. normalized `brand + MPN` when both exist;
3. fallback `merchantId + merchantProductId`.

Recommended ID format:

```text
gtin:04012345678901
mpn:bosch:abc-123
merchant:9326:123456
```

Then slug/hash for URLs or click refs if needed.

Do not merge two products only because names look similar.

GTIN may identify variants; preserve variant distinctions when materially different.

---

# 8. Review gate and curated overrides

## 8.1 Principle

External feeds are allowed to discover products and offers. They are not trusted enough to make final compatibility recommendations without review.

Default imported product:

```json
{
  "reviewed": false,
  "dataQuality": "feed"
}
```

Only products with:

```json
{
  "reviewed": true
}
```

can be recommended.

## 8.2 Overrides structure

Example:

```json
{
  "schemaVersion": 1,
  "overrides": [
    {
      "id": "gtin:04012345678901",
      "reviewed": true,
      "widthCm": 300,
      "depthCm": 350,
      "heightCm": 235,
      "material": "wood",
      "roofType": "gable",
      "floorIncluded": true,
      "doorWidthCm": 142,
      "dataQuality": "curated",
      "reviewNote": "Dimensions and floor checked against merchant product page"
    }
  ]
}
```

`reviewNote` is internal only and should not be published in `public/data` unless intentionally required.

## 8.3 Review queue

Generate `data/review/<vertical>.json` containing prioritized candidates:

```json
{
  "generatedAt": "...",
  "products": [
    {
      "id": "...",
      "name": "...",
      "brand": "...",
      "gtin": "...",
      "candidateAttributes": {},
      "offerCount": 2,
      "minBasePriceEur": 2199,
      "merchants": ["Merchant A", "Merchant B"],
      "imageUrl": "...",
      "merchantProductUrl": "...",
      "issues": ["missing-door-width", "ambiguous-dimensions"]
    }
  ]
}
```

Prioritize products with:

1. multiple offers;
2. strong price competitiveness;
3. complete identifiers;
4. high-demand sizes/use-cases;
5. few unresolved data issues.

---

# 9. Awin ingestion

## 9.1 V1 credential strategy

Use a GitHub Actions repository secret:

```text
AWIN_FEED_URLS_JSON
```

Value is a JSON array of complete Awin Create-a-Feed/product-feed download URLs:

```json
[
  "https://...feed1...",
  "https://...feed2..."
]
```

These URLs may contain feed credentials. Therefore:

- never commit them;
- never print them;
- never write them to generated reports;
- never expose them to Vercel/client code.

### V1.1 improvement

Once stable, replace/augment direct URL configuration with Awin's Product Feed List mechanism and its last-update metadata, using a dedicated feed API key. This allows feeds to be downloaded only when updated.

Keep this as a later optimization; do not block first feed validation on it.

## 9.2 Awin fields to request/use

Prefer feeds containing at least:

```text
aw_deep_link
product_name
aw_product_id
merchant_product_id
merchant_image_url
description
merchant_category
search_price
merchant_name
merchant_id
category_name
currency
delivery_cost
last_updated
brand_name
specifications
product_model
model_number
dimensions
product_type
merchant_product_category_path
rrp_price
in_stock
stock_quantity
stock_status
large_image
alternate_image
ean
mpn
product_GTIN
```

Do not assume every advertiser populates them consistently.

## 9.3 Streaming ingestion

Never load a very large feed into memory as one string.

Pipeline:

```text
fetch(url)
→ Readable stream
→ gunzipMaybe()
→ csv-parse streaming
→ inspect row
→ vertical candidate filter
→ normalize candidate
→ map product/offer
```

## 9.4 Feed category candidate detection

Keep candidate detection intentionally broad, but final recommendation intentionally strict.

Garden-house initial pattern examples:

```text
gartenhaus
gerätehaus
geraetehaus
gartenschuppen
geräteschuppen
holzhaus
blockbohlenhaus
```

Search across:

- product name;
- merchant category;
- category name;
- product type;
- merchant category path.

Store candidate false-positive metrics in the quality report.

## 9.5 Parsing dimensions

Dimension parsing must be conservative.

Accept common forms:

```text
300 x 350 cm
3.0 x 3.5 m
300cm × 350cm
3000 x 3500 mm
```

Reject/flag:

- values below plausible minimum;
- values above plausible maximum;
- strings with 3+ dimensions when width/depth ordering cannot be inferred;
- package dimensions instead of assembled dimensions;
- descriptions that mix internal/external dimensions ambiguously.

Do not auto-review parsed dimensions.

## 9.6 Currency

Germany-first V1 recommends only EUR offers.

If feed currency is not EUR:

- do not perform live FX conversion;
- exclude the offer from DE recommendations;
- record the issue.

## 9.7 Availability

Normalize stock conservatively:

```ts
available: boolean
```

If stock status is absent/ambiguous, use a separate internal issue flag and do not pretend to know exact stock.

The user UI should state that price/availability is based on the latest feed snapshot and should be confirmed at the merchant.

## 9.8 Awin affiliate tracking

Use the existing Awin tracking URL (`aw_deep_link`) and add only non-sensitive click references.

Recommended convention:

```text
clickref  = gardenhouse
clickref2 = planner-result
clickref3 = <short-stable-product-id>
```

For later SEO attribution, optionally:

```text
clickref4 = <landing-page-slug>
```

Rules:

- never put emails, user IDs, exact addresses or other personal data in click refs;
- use stable short slugs;
- affiliate commission is not a scoring input;
- preserve existing query parameters in the Awin URL.

Implement tracking in one shared helper rather than in each vertical.

```ts
export function addAwinClickRefs(
  url: string,
  refs: { clickref: string; clickref2?: string; clickref3?: string; clickref4?: string }
): string
```

## 9.9 Sync jitter

At the beginning of scheduled ingestion, wait a small randomized period (e.g. 15–90 seconds) before hitting feed endpoints. This reduces synchronized traffic spikes and follows Awin's feed-download best-practice direction.

Do not sleep during manually triggered workflow runs if fast debugging is preferred; make jitter conditional on `github.event_name == 'schedule'` or inside the script via an environment flag.

---

# 10. Feed safety and failure policy

A feed failure must **never replace a good catalog with an empty or obviously broken one**.

## 10.1 Atomic generation

Build output into temporary files/directories:

```text
.tmp/catalog-next.json
.tmp/feed-report-next.json
.tmp/review-next.json
```

Validate everything.

Only after all checks pass, atomically replace final files.

## 10.2 Required safeguards

Before accepting a new catalog:

- schema validation passes;
- no duplicate offer IDs;
- every offer references an existing product;
- affiliate URLs use `https:` and are non-empty;
- prices are finite and positive;
- product dimensions in plausible vertical ranges;
- no secret-looking feed URL appears in generated data;
- every `reviewed:true` product remains structurally valid;
- generated public JSON is valid UTF-8/JSON;
- output size stays below configured hard limit.

## 10.3 Regression guards

Compare against previous successful catalog.

Initial recommended guards (configuration, not immutable business truth):

```text
if previous reviewedProducts >= 10:
  fail if reviewedProducts drops > 20%

if previous offers >= 20:
  fail if offers drops > 40%

fail if total candidates == 0 for every configured source
fail if all configured feeds fail
```

A single merchant feed may legitimately disappear; the whole job should not necessarily fail if other sources succeed and the aggregate stays healthy.

## 10.4 Partial source failures

Record per-source success/failure without printing secret URL.

Use a non-secret source label in configuration, e.g.:

```json
[
  { "id": "merchant-a-default", "secretIndex": 0 },
  { "id": "merchant-b-default", "secretIndex": 1 }
]
```

For V1 with only `AWIN_FEED_URLS_JSON`, reports may label sources `feed-1`, `feed-2`.

## 10.5 No-change behavior

If normalized public/review outputs are identical except timestamps, avoid committing meaningless churn where practical.

Prefer deterministic generation:

- stable sort products by ID;
- stable sort offers by ID;
- stable sort object/report keys when convenient;
- avoid updating `generatedAt` if no substantive product/offer change, or compare content excluding timestamps before committing.

This prevents daily commits when merchant data has not changed.

---

# 11. Feed quality report

Each vertical should emit `public/data/<vertical>/feed-report.json` or a private equivalent. Public is acceptable only if it contains no sensitive data.

Example:

```json
{
  "schemaVersion": 1,
  "generatedAt": "...",
  "sourceFeeds": 3,
  "rows": 500000,
  "candidateRows": 621,
  "normalizedProducts": 387,
  "offers": 512,
  "reviewedProducts": 42,
  "reviewQueue": 345,
  "candidateToProductRate": 62.3,
  "issues": {
    "missing-or-ambiguous-dimensions": 102,
    "missing-material": 63
  },
  "merchants": {
    "Merchant A": {
      "rows": 100000,
      "candidates": 300,
      "offers": 250,
      "normalizedProducts": 210
    }
  }
}
```

Add useful metrics over time:

- GTIN coverage %;
- dimensions coverage %;
- image coverage %;
- known delivery cost %;
- known availability %;
- reviewed product %;
- orphan offer count;
- rejected invalid-price count.

This report determines whether a vertical can scale using feed data or needs too much manual curation.

---

# 12. Garden-house vertical – V1 production spec

## 12.1 Scope

A deterministic finder for storage/garden houses.

It answers:

1. What approximate usable floor area is sensible for the user's storage use?
2. Which reviewed products physically fit the user's stated usable footprint?
3. Which offers match budget and preferences?

It is **not**:

- a building-permission checker;
- a setback/neighbor-law checker;
- a structural calculator;
- a snow/wind load calculator;
- a foundation engineering calculator.

The UI must tell the user that the entered available width/depth must already represent the area they are allowed and able to use.

## 12.2 Inputs

```ts
export type ToolStorage = "none" | "small" | "medium" | "large";
export type FloorPreference = "irrelevant" | "preferred" | "required";
export type MaterialPreference = "any" | "wood" | "metal" | "plastic";
export type RoofPreference = "any" | "flat" | "pent" | "gable";

export interface GardenHouseInput {
  availableWidthCm: number;
  availableDepthCm: number;
  allowRotation: boolean;
  budgetMaxEur: number;
  bikes: number;
  toolStorage: ToolStorage;
  lawnMower: boolean;
  workbench: boolean;
  shelving: boolean;
  floorPreference: FloorPreference;
  materialPreference: MaterialPreference;
  roofPreference: RoofPreference;
}
```

Validation ranges:

```text
availableWidthCm: 150–2000
availableDepthCm: 150–2000
budgetMaxEur:     100–100000
bikes:            0–12
```

Use accessible number inputs and clearly display units.

## 12.3 Configurable heuristic

Store in `data/manual/garden-house-rules.json`:

```json
{
  "version": 1,
  "status": "planning-heuristic",
  "note": "Storage planning heuristic, not a building standard.",
  "areaM2": {
    "baseCirculation": 0.8,
    "perBike": 0.65,
    "toolStorage": {
      "none": 0,
      "small": 0.7,
      "medium": 1.4,
      "large": 2.5
    },
    "lawnMower": 0.8,
    "workbench": 2.0,
    "shelving": 0.6
  },
  "circulationReserveFactor": 1.15,
  "minDoorWidthCm": {
    "normal": 70,
    "bulky": 80
  }
}
```

Calculation:

```text
raw area = base circulation
         + bikes * perBike
         + tool storage area
         + optional mower
         + optional workbench
         + optional shelving

recommended area = raw area * circulationReserveFactor
round up to nearest 0.5 m²
```

Door heuristic:

- bicycles or mower => 80 cm minimum suggested known door width;
- otherwise => 70 cm;
- if product door width is unknown, do not automatically reject solely for that reason, but lower confidence/data quality and warn.

## 12.4 Garden-house product model

```ts
export interface GardenHouseProduct extends ProductBase {
  widthCm: number;
  depthCm: number;
  heightCm?: number;
  footprintM2: number;
  material: "wood" | "metal" | "plastic";
  roofType?: "flat" | "pent" | "gable";
  wallThicknessMm?: number;
  doorWidthCm?: number;
  floorIncluded?: boolean;
  floorKitAvailable?: boolean;
}
```

## 12.5 Hard filters

A product can enter recommendations only when:

1. `reviewed === true`;
2. it fits the available width/depth normally or at 90° if rotation allowed;
3. `footprintM2 >= recommendedAreaM2`;
4. known door width is not below the heuristic minimum;
5. selected material matches unless `any`;
6. selected roof matches unless `any`;
7. floor requirement is satisfiable;
8. at least one available offer exists;
9. price/budget status is not definitively over budget.

### Floor semantics

- `irrelevant`: no filter.
- `preferred`: products with floor/floor kit get scoring bonus.
- `required`: require `floorIncluded === true` or `floorKitAvailable === true`; UI must distinguish included floor from additional floor kit.

## 12.6 Offer selection

Do not simply pick cheapest base price if delivery differs.

For each product:

1. filter available offers;
2. calculate known landed total when shipping is known;
3. if multiple offers have known landed totals, lowest landed total wins;
4. if all delivery costs are unknown, lowest base price may be shown as `ab`, with explicit shipping-unknown label;
5. retain up to 2–3 merchant offers in future UI; V1 may show best offer + "weitere Angebote" if implemented.

## 12.7 Ranking

Ranking after hard filters:

- floor-area efficiency: 32 points;
- budget fit: 24 points;
- material preference: 12 points;
- roof preference: 6 points;
- floor preference: 8–10 points;
- known adequate door width: up to 5 points;
- data quality: 2–8 points.

Never score affiliate commission.

The exact formula can evolve, but keep it deterministic and unit-tested.

## 12.8 Result UI

Show:

### Requirement summary

```text
Empfohlene Mindestfläche: 8,5 m²
Empfohlene Türbreite: mindestens 80 cm
Verfügbare Stellfläche: 4,0 × 3,5 m
```

### Top 3 reviewed matches

Each card:

- image;
- product name;
- dimensions;
- footprint;
- material;
- floor information;
- merchant;
- price and shipping status;
- 2–4 "Warum passt das?" reasons;
- data freshness date;
- CTA `Beim Händler ansehen`;
- affiliate disclosure near CTA or globally clearly visible.

If no match:

- do not loosen hidden constraints silently;
- explain which constraints caused zero results;
- offer explicit suggestions, e.g. increase budget, allow rotation, remove roof preference, increase footprint;
- never fabricate a product.

## 12.9 Initial garden-house SEO pages

Build static pages, but only with useful distinct content:

```text
/garten/gartenhaus-planer/
/garten/gartenhaus-groesse/
/garten/gartenhaus-fundament/
/garten/gartenhaus-kosten/
/garten/gartenhaus-fuer-fahrraeder/
/garten/gartenhaus-boden/
/garten/gartenhaus-zubehoer/
```

Each informational page should:

- answer its intent directly;
- internally link to the planner;
- explain calculator limitations;
- not be thin programmatic duplication.

---

# 13. Dehumidifier vertical – V1.1 spec

## 13.1 Scope

A product-sizing/finder tool for domestic room dehumidifiers.

Do not diagnose causes of dampness, mold, structural defects or health conditions.

The tool's promise is:

> Based on your room/use-case, filter reviewed models whose manufacturer/merchant specifications are appropriate, then rank by fit, noise, drainage, energy data and price.

## 13.2 Inputs

```ts
export type RoomType = "basement" | "living" | "bedroom" | "bathroom" | "laundry" | "garage" | "other";
export type HumiditySeverity = "mild" | "moderate" | "high";
export type NoisePriority = "low" | "medium" | "high";

export interface DehumidifierInput {
  roomType: RoomType;
  areaM2: number;
  ceilingHeightM: number;
  approximateTemperatureC?: number;
  humiditySeverity: HumiditySeverity;
  laundryDrying: boolean;
  continuousDrainPossible: boolean;
  noisePriority: NoisePriority;
  budgetMaxEur: number;
}
```

Do not require a humidity sensor reading; optional RH can be added later.

## 13.3 Product attributes

```ts
export interface DehumidifierProduct extends ProductBase {
  maxRecommendedAreaM2?: number;
  maxRecommendedVolumeM3?: number;
  extractionLPerDay?: number;
  extractionTestCondition?: string;
  minOperatingTempC?: number;
  maxOperatingTempC?: number;
  continuousDrain: boolean;
  laundryMode?: boolean;
  noiseDb?: number;
  tankLiters?: number;
  powerW?: number;
  refrigerantType?: string;
}
```

Extraction values are only comparable when test conditions are known. Never display two `L/day` ratings as if perfectly comparable when source conditions differ.

## 13.4 Matching approach

V1 should primarily use **reviewed manufacturer/merchant recommended room area or room volume**, not invent a precise psychrometric calculation.

If only area is available:

```text
required compatibility area = user area × configurable margin
```

Margin is a transparent product-selection heuristic, not a physical law.

Possible config buckets, marked experimental until manually reviewed:

```json
{
  "version": 1,
  "status": "experimental-selection-margin",
  "areaMargin": {
    "living_mild": 1.0,
    "living_moderate": 1.15,
    "high_humidity": 1.3,
    "cool_basement": 1.25,
    "laundry": 1.3
  }
}
```

Do not present these multipliers to users as engineering formulas.

Hard filters/preferences:

- reviewed product;
- max recommended area/volume sufficient after heuristic margin;
- operating temperature covers known room temperature if available;
- continuous drain required if user indicates this as mandatory;
- budget;
- availability.

Scoring:

- room-size margin fit;
- correct low-temperature capability for basement;
- continuous drain;
- laundry mode;
- noise if bedroom/high priority;
- power consumption when known;
- tank size;
- price fit;
- data quality.

Again: commission never affects score.

## 13.5 SEO starter pages

```text
/haus/raumklima/luftentfeuchter-rechner/
/haus/raumklima/luftentfeuchter-keller/
/haus/raumklima/luftentfeuchter-stromverbrauch/
/haus/raumklima/luftentfeuchter-waesche/
```

Do not mass-generate `/20-qm`, `/21-qm`, `/22-qm` pages. Only create size pages when a genuinely distinct search intent and useful content exists.

---

# 14. Irrigation vertical – V1.2 spec

## 14.1 Scope

Start as a **system/component planner**, not a hydraulic engineering tool and not a visual CAD irrigation layout.

The user should receive:

- recommended system style;
- compatible component categories;
- estimated component quantities where simple and safe;
- products from one compatible ecosystem when appropriate.

Do not claim exact sprinkler coverage or pressure loss without a proper hydraulic/layout model.

## 14.2 Inputs

```ts
export interface IrrigationInput {
  lawnAreaM2: number;
  bedAreaM2: number;
  hedgeLengthM: number;
  waterFlowLMin?: number;
  waterPressureBar?: number;
  automaticControl: boolean;
  smartControl: boolean;
  rainSensorWanted: boolean;
  budgetMaxEur: number;
}
```

## 14.3 Product compatibility model

Products need an ecosystem/system identifier:

```ts
export interface IrrigationProduct extends ProductBase {
  kind:
    | "controller"
    | "valve"
    | "sprinkler"
    | "dripline"
    | "pipe"
    | "connector"
    | "filter"
    | "pressure-reducer"
    | "sensor";
  systemId?: string;
  maxZones?: number;
  pipeDiameterMm?: number;
  driplineLengthM?: number;
  smartCompatible?: boolean;
  requiredAccessories?: string[];
}
```

The most important rule is **compatibility**. Do not produce a cheap basket made of incompatible components from different ecosystems.

## 14.4 Initial logic

V1 can estimate:

- dripline length from hedge length + configurable reserve;
- drip irrigation need for bed area;
- whether automatic controller is needed;
- controller zone count based on requested/estimated categories;
- base connector/filter/pressure-reducer categories.

For lawn sprinkler quantity/layout, either:

- ask the user to enter desired number of lawn zones and use curated kit coverage ranges; or
- clearly label count as an initial estimate and require verification.

Do not implement a fake precise hydraulic plan.

---

# 15. Shared recommendation behavior

## 15.1 Hard filters before scoring

Every vertical follows:

```text
raw catalog
→ reviewed only
→ availability
→ physical/technical compatibility
→ hard user preferences
→ budget status
→ scoring
```

Never score and then allow a high-scoring incompatible product to remain.

## 15.2 Explainability

Every result must produce reasons from deterministic rule outcomes.

Example:

```ts
interface MatchReason {
  code: string;
  label: string;
  strength: "required" | "positive" | "warning";
}
```

Use structured reasons internally, then render user-facing German text.

## 15.3 Confidence/data quality

Expose subtle confidence messaging:

- `curated` → "Produktdaten geprüft"
- `mixed` → "Produktdaten teilweise geprüft"
- do not recommend `feed`-only products in V1.

Do not pretend an unknown attribute is false.

Use `boolean | undefined` where unknown is valid.

---

# 16. Client-side catalog loading

Do not import a large catalog directly into the JS application bundle.

Fetch the vertical only when needed:

```ts
export async function loadGardenHouseCatalog() {
  const res = await fetch("/data/garden-house/catalog.json");
  if (!res.ok) throw new Error("Katalog konnte nicht geladen werden");
  return GardenHouseCatalogSchema.parse(await res.json());
}
```

UX:

- load catalog when planner is opened or before final results step;
- show a clear loading/error state;
- do not block informational SEO content on catalog loading;
- if catalog fails, planner form can remain visible but product result step should explain temporary unavailability.

---

# 17. Static SEO architecture

## 17.1 Site hierarchy

```text
/
├── /garten/
│   ├── /gartenhaus-planer/
│   ├── /gartenhaus-groesse/
│   ├── /gartenhaus-fundament/
│   ├── /gartenhaus-kosten/
│   └── /bewaesserungs-planer/
│
└── /haus/
    └── /raumklima/
        ├── /luftentfeuchter-rechner/
        ├── /luftentfeuchter-keller/
        └── /luftentfeuchter-stromverbrauch/
```

## 17.2 Page requirements

Every indexable page should have:

- unique title;
- unique meta description;
- one clear H1;
- useful content visible without JavaScript interaction;
- strong internal links;
- breadcrumb navigation;
- link to relevant planner;
- affiliate disclosure where product recommendations are present;
- clear last-reviewed/updated copy when appropriate.

## 17.3 Sitemap and robots

Implement static metadata routes:

- `app/sitemap.ts`
- `app/robots.ts`

Do not index internal JSON files intentionally through links. They can remain accessible but are not SEO landing pages.

## 17.4 Structured data

Only add valid structured data that accurately describes visible content.

Potential:

- `BreadcrumbList`;
- `WebApplication` or `SoftwareApplication` for the planner if appropriate;
- `ItemList` only when the products are actually visible and data is accurate.

Do not add fake ratings/reviews or fabricated Product schema.

## 17.5 Content quality rule

Do not create hundreds of template pages just by swapping numbers/locations.

A route should exist because it solves a distinct intent.

---

# 18. Affiliate UX and trust

## 18.1 Disclosure

Clearly disclose that outbound merchant links can be affiliate links and that MachPlan may earn a commission without changing the user's price, where accurate under the relevant program.

Place disclosure:

- near the first product recommendation section;
- optionally in site footer/imprint/affiliate information.

## 18.2 Ranking neutrality

Do not display "best" when the algorithm means "highest commission". Commission is never an input.

If a product is unavailable from monetized merchants but is objectively the best reviewed match, decide product policy explicitly:

- V1 recommendation requires an available offer because the site is a shopping planner;
- later it may show a non-affiliate product as a reference, clearly marked.

## 18.3 Freshness

On result area:

```text
Preise und Verfügbarkeit: Stand <date>. Bitte beim Händler prüfen.
```

Use feed timestamps when trustworthy; otherwise use catalog generation time.

---

# 19. Analytics and attribution – static-first

## 19.1 V1 minimum

Use:

1. Google Search Console for query/page impressions, clicks, CTR and rankings.
2. Awin click references for affiliate attribution.
3. Awin dashboard/transaction reporting for sales and commissions.

This is enough to validate whether SEO visitors turn into affiliate revenue without introducing a database.

## 19.2 Do not collect unnecessary personal data

Do not put session IDs, emails, IP-derived identifiers or addresses into Awin click refs.

## 19.3 Optional browser analytics

A client analytics provider may be added later if needed to measure:

```text
tool_start
tool_complete
no_match
affiliate_click
```

Keep it behind an adapter:

```ts
export interface Analytics {
  track(name: string, props?: Record<string, string | number | boolean>): void;
}
```

Default implementation can be no-op until the chosen privacy/consent setup is decided.

Do not add a server event endpoint merely for V1 analytics.

## 19.4 Future affiliate revenue aggregation without Supabase

If automated reporting is desired later, a scheduled GitHub Action may call the Awin Publisher Transactions API with a separate API token.

Rules:

- keep token in GitHub Secrets;
- do not commit raw order references/transaction details;
- aggregate immediately by date/vertical/clickRef;
- store only aggregate metrics if persisted in Git;
- repository remains private;
- user-facing site does not need access to this data.

Example aggregate:

```json
{
  "date": "2026-08-09",
  "vertical": "garden-house",
  "clicksAttributed": 120,
  "transactions": 4,
  "saleValueEur": 6900,
  "commissionEur": 410
}
```

---

# 20. GitHub repository setup

## 20.1 Repository

Create:

```text
<owner>/machplan
```

Recommended launch visibility: **Private**.

Default branch:

```text
main
```

## 20.2 Branch workflow

Normal development:

```text
feature branch
→ pull request
→ CI
→ Vercel Preview
→ merge main
→ Vercel Production
```

Data ingestion is different:

```text
scheduled GitHub Action
→ validated generated JSON
→ bot commit to main
→ Vercel Production rebuild
```

Since newly discovered products remain `reviewed:false`, automated offer/price refreshes can deploy without automatically introducing unreviewed recommendations.

## 20.3 Branch protection caveat

If branch/ruleset protection prevents GitHub Actions from pushing to `main`, choose one of:

**Preferred V1 option:** allow the repository `GITHUB_TOKEN`/GitHub Actions workflow to update generated data on `main` with tightly scoped `contents: write` permissions.

**Alternative:** sync workflow pushes `data-sync/<date>` and opens a PR. This is safer but requires merges for every price refresh.

Do not use a personal long-lived PAT unless necessary.

---

# 21. GitHub Actions CI

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - run: npm ci
      - run: npm run validate:data
      - run: npm run test
      - run: npm run typecheck
      - run: npm run build
```

### CI acceptance

A PR cannot be considered implementation-complete unless:

```text
validate:data PASS
test          PASS
typecheck     PASS
build         PASS
```

Optional later:

- lint;
- accessibility smoke tests;
- Playwright static-site smoke test.

---

# 22. GitHub Actions product ingestion

Create `.github/workflows/sync-products.yml`:

```yaml
name: Sync affiliate product feeds

on:
  schedule:
    - cron: "17 4 * * *"
      timezone: "Europe/Berlin"
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: product-feed-sync
  cancel-in-progress: false

jobs:
  sync:
    runs-on: ubuntu-latest
    env:
      AWIN_FEED_URLS_JSON: ${{ secrets.AWIN_FEED_URLS_JSON }}
      FEED_SYNC_SCHEDULED: ${{ github.event_name == 'schedule' && 'true' || 'false' }}

    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0

      - name: Check feed configuration
        id: feed
        shell: bash
        run: |
          if [ -z "$AWIN_FEED_URLS_JSON" ]; then
            echo "enabled=false" >> "$GITHUB_OUTPUT"
            echo "Affiliate feed secret is not configured; skipping sync."
          else
            echo "enabled=true" >> "$GITHUB_OUTPUT"
          fi

      - uses: actions/setup-node@v6
        if: steps.feed.outputs.enabled == 'true'
        with:
          node-version: 24
          cache: npm

      - run: npm ci
        if: steps.feed.outputs.enabled == 'true'

      - name: Download and normalize feeds
        if: steps.feed.outputs.enabled == 'true'
        run: npm run sync:products

      - name: Validate generated data
        if: steps.feed.outputs.enabled == 'true'
        run: npm run validate:data

      - name: Run tests
        if: steps.feed.outputs.enabled == 'true'
        run: npm run test

      - name: Typecheck ingestion changes
        if: steps.feed.outputs.enabled == 'true'
        run: npm run typecheck

      - name: Commit catalog changes
        if: steps.feed.outputs.enabled == 'true'
        shell: bash
        run: |
          if git diff --quiet -- public/data data/review; then
            echo "No catalog changes."
            exit 0
          fi

          git config user.name "machplan-data-bot"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

          git add public/data data/review
          git commit -m "chore(data): refresh affiliate catalogs"
          git push
```

### Important GitHub behavior

A commit pushed using the repository `GITHUB_TOKEN` generally does not recursively trigger another GitHub Actions `push` workflow. Do not depend on the normal `push` CI to validate generated data; the sync workflow itself must run data validation/tests before committing.

Vercel Git integration is separate from this recursive Actions behavior and should deploy the new repository commit after it appears on the production branch.

## 22.1 Secret setup

GitHub:

```text
Settings
→ Secrets and variables
→ Actions
→ New repository secret
```

Add:

```text
AWIN_FEED_URLS_JSON
```

Do not add it to Vercel because Vercel does not ingest feeds in V1.

---

# 23. Vercel deployment

## 23.1 Preferred deployment model

Use **Vercel Git integration**, not a custom GitHub Action for Vercel deployment.

One-time:

1. Add New Project in Vercel.
2. Import GitHub repository `machplan`.
3. Framework: Next.js.
4. Production branch: `main`.
5. No Awin feed secret in Vercel.
6. Build command: default `next build` / `npm run build`.
7. Static export produces `out/`.

Expected behavior:

```text
PR / feature push → Preview deployment
merge/push main   → Production deployment
```

## 23.2 Why no Vercel deploy Action

Git integration already provides:

- automatic previews;
- production deploy on production branch;
- deployment status linked to GitHub.

Do not create a second deployment pipeline unless there is a concrete need for custom prebuilt deployment/promotion logic.

## 23.3 Vercel runtime environment

V1 should have **no secret runtime environment variables**.

Public compile-time constants are okay, but do not ship secret keys through `NEXT_PUBLIC_*`.

## 23.4 Preview testing

Before merging meaningful UI changes, verify the Vercel Preview manually:

- home page;
- garden-house planner;
- form keyboard navigation;
- result state;
- no-match state;
- affiliate links preserve Awin URL + clickrefs;
- product images;
- mobile rendering;
- static informational pages.

---

# 24. Data validation with Zod

Every public catalog must have a Zod schema.

Example approach:

```ts
import { z } from "zod";

export const OfferBaseSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  merchantId: z.string().min(1),
  merchantName: z.string().min(1),
  merchantProductId: z.string().min(1),
  priceEur: z.number().positive(),
  deliveryCostEur: z.number().nonnegative().optional(),
  deliveryCostStatus: z.enum(["known", "free", "unknown"]),
  available: z.boolean(),
  affiliateUrl: z.string().url(),
  imageUrl: z.string().url().optional(),
  updatedAt: z.string().min(1)
});
```

`npm run validate:data` should validate:

- all manual rules;
- all overrides;
- all public catalogs;
- product/offer foreign-key integrity;
- uniqueness;
- schema versions;
- sensible numeric ranges.

---

# 25. Schema versioning

Every generated JSON file that may evolve must include:

```json
{
  "schemaVersion": 1
}
```

Rules:

- additive optional fields can normally remain same version;
- rename/removal/semantic change increments version;
- client loader rejects unknown future major schema versions rather than silently misreading data;
- if necessary, implement static migration scripts under `scripts/catalog/migrations/`.

Do not add a database merely to handle schema evolution.

---

# 26. Testing strategy

## 26.1 Unit tests – recommendation rules

Garden house minimum cases:

1. normal fit;
2. rotated fit only;
3. does not fit plot;
4. product area too small;
5. required floor unavailable;
6. material mismatch;
7. roof mismatch;
8. known narrow door rejected;
9. unknown door not hard rejected;
10. unavailable offer ignored;
11. over-budget offer excluded/marked correctly;
12. shipping-unknown behavior;
13. unreviewed product never recommended;
14. curated data gets confidence bonus;
15. affiliate commission absent from score.

## 26.2 Normalizer tests

Fixture rows:

- `3 x 4 m`;
- `300 x 400 cm`;
- `3000 x 4000 mm`;
- comma decimals;
- ambiguous 3D dimension;
- missing material;
- GTIN dedup;
- non-EUR currency;
- missing affiliate link;
- out of stock.

## 26.3 Integration test for feed pipeline

Using a local CSV fixture:

```text
fixture feed
→ parse
→ normalize
→ apply overrides
→ validate
→ public catalog
→ review queue
→ quality report
```

No external Awin network call required in CI tests.

## 26.4 Static build smoke test

After `npm run build`:

assert at minimum:

```text
out/index.html exists
out/garten/gartenhaus-planer/index.html exists
out/data/garden-house/catalog.json exists
```

Optionally serve `out/` locally and perform a browser smoke test.

---

# 27. UI/UX implementation requirements

## 27.1 Calculator flow

Prefer a compact multi-step form on mobile, with a summary before results.

Avoid unnecessary account creation.

Required properties:

- state survives previous/next within the current page;
- input validation inline;
- units visible;
- no layout jump when results load;
- browser back should not accidentally lose the whole project where easy to avoid;
- results share no secret state.

Persisting calculator input in URL query params may be considered later for shareability, but never include sensitive address/personal data.

## 27.2 Accessibility

- semantic labels for inputs;
- keyboard reachable controls;
- focus moved appropriately after step changes/results;
- error text connected with `aria-describedby` where appropriate;
- buttons at least clear/action-oriented German copy;
- image `alt` text from product name where appropriate;
- do not use color as the only signal.

## 27.3 Performance

- no site-wide loading of all catalogs;
- no giant JS dependency for form state;
- use React state/context only as needed;
- product images lazy-load;
- static content renders without waiting for product catalog;
- defer catalog fetch until calculator interaction/results where practical.

---

# 28. Image strategy

V1:

- use feed-provided merchant/Awin image URL;
- `next/image` may run unoptimized or use a simple `<img>` wrapper because static export cannot use the default Next.js runtime image optimizer;
- do not download/store all merchant images in Git;
- add safe fallback placeholder;
- never let a broken image prevent result rendering.

If hotlink reliability becomes poor, investigate Awin's image resize/cache capability or another terms-compatible static image strategy before building custom image infrastructure.

---

# 29. Merchant/source configuration

Add a non-secret configuration file:

```json
{
  "schemaVersion": 1,
  "merchants": [
    {
      "merchantId": "12345",
      "name": "Example Merchant",
      "enabled": true,
      "verticals": ["garden-house"],
      "country": "DE"
    }
  ]
}
```

Do not store commission in product recommendation config.

Commission data may be stored separately for internal revenue analytics, but never consumed by recommendation functions.

---

# 30. Error handling and observability

## 30.1 Browser errors

User-friendly states:

```text
catalog fetch failed
→ "Produktdaten konnten gerade nicht geladen werden. Bitte später erneut versuchen."

zero compatible products
→ explain constraints + editable suggestions

image failed
→ placeholder
```

Do not show stack traces.

## 30.2 Feed sync errors

GitHub Action should fail when:

- all source downloads fail;
- schema validation fails;
- regression safety guard fails;
- output cannot be written;
- tests fail.

Action logs must show:

- non-secret source labels;
- counts;
- issue summary;
- safety guard reason.

Never print secret URLs.

## 30.3 Vercel

Because V1 has no runtime server, most production failure modes are build/static asset problems. Use Vercel Preview before merge and monitor deployment status.

---

# 31. Data freshness policy

Suggested initial sync:

```text
once daily
```

This is enough for MVP validation.

Do not increase frequency unless affiliate performance makes freshness material.

For each offer:

```text
updatedAt
```

For each catalog:

```text
generatedAt
```

If an offer has not appeared in the latest successful feed:

- do not immediately delete it in a way that causes instability without understanding merchant behavior;
- initial implementation may mark/remove missing offers after one successful full sync;
- later add a `missCount`/stale policy if feeds are unreliable.

Because pure static JSON has no persistent ingestion state besides the previous committed catalog, use the previous catalog as the state source when implementing staleness rules.

---

# 32. Security

## 32.1 Secrets

GitHub Secrets only:

```text
AWIN_FEED_URLS_JSON
```

Later, if transaction API used:

```text
AWIN_PUBLISHER_API_TOKEN
AWIN_PUBLISHER_ID
```

Do not use Vercel secrets for ingestion.

## 32.2 Principle of least privilege

CI workflow:

```yaml
permissions:
  contents: read
```

Feed sync workflow only:

```yaml
permissions:
  contents: write
```

No other write permissions unless required.

## 32.3 Dependency security

- commit lockfile;
- optional Dependabot weekly updates;
- use official GitHub Actions where possible;
- do not add random third-party Actions for trivial shell logic;
- avoid arbitrary code execution from feed values.

Feed strings are data, never code/templates executed as HTML.

Sanitize any merchant description before rendering; preferably do not render raw feed HTML in V1.

---

# 33. GitHub Actions and generated commits – important detail

The feed job itself must run all validation because commits pushed with `GITHUB_TOKEN` normally do not cause another recursive `push` Action workflow.

Therefore the order is mandatory:

```text
sync
→ validate
→ tests
→ typecheck relevant code
→ safety guards
→ commit
```

Do **not**:

```text
sync
→ commit broken JSON
→ hope CI catches it later
```

---

# 34. Vercel deployment flow – exact target

```text
Developer branch
     │
     ├── push
     ▼
GitHub PR
     │
     ├── GitHub CI
     └── Vercel Preview
             │
             ▼
          review
             │
             ▼
        merge main
             │
             ▼
      Vercel Production
```

Data:

```text
04:17 scheduled GitHub Action
     │
     ▼
feed sync + validation
     │
     ▼
bot commit on main
     │
     ▼
Vercel Production build
```

No Vercel CLI is necessary for normal V1 operations.

---

# 35. When Supabase becomes justified

Supabase is **not forbidden forever**. It is deliberately deferred until it solves an observed problem.

## 35.1 Do not add Supabase merely because

- there are 5,000 products;
- JSON feels unsophisticated;
- SQL would be convenient for development;
- a database is considered standard SaaS architecture;
- one catalog becomes a few MB.

Try normalization, pruning and sharding first.

## 35.2 Supabase trigger conditions

Introduce Supabase as a **back-office/source-of-truth database** when one or more of these become real:

### Product/catalog scale

- many tens of thousands of reviewed products/offers need cross-vertical querying;
- static shards become operationally difficult;
- multiple merchants create complex many-to-many reconciliation;
- dedup/history queries become difficult in Git-based JSON.

### Freshness

- prices/stock must update much more frequently than daily;
- stale catalog deployments materially hurt conversion;
- rebuilding/deploying the whole static site for data updates becomes wasteful.

### Stateful product features

- user accounts;
- saved projects;
- favorites;
- alerts;
- personalized recommendations across sessions;
- project history.

### Internal analytics

- raw affiliate transaction ingestion;
- revenue attribution requiring relational joins;
- historical price/availability data;
- operational dashboard too complex for aggregate JSON.

### Admin/review operations

- multiple people review products concurrently;
- a real internal review/admin UI is needed;
- merge conflicts in override JSON become common.

## 35.3 Preferred Supabase migration architecture

Even after Supabase is introduced, keep the **public site static if possible**.

Preferred first migration:

```text
Awin feeds
   ↓
GitHub Action / ingestion job
   ↓
Supabase Postgres (back-office source of truth)
   ↓
nightly/triggered catalog exporter
   ↓
static JSON snapshots
   ↓
Vercel static frontend
```

This provides database benefits without introducing runtime DB dependency into every page request.

Only query Supabase from the browser/server at runtime if a feature genuinely requires runtime data.

## 35.4 Supabase tables if/when needed

Potential schema later:

```text
products
offers
merchants
product_attributes
product_reviews_internal
feed_runs
feed_issues
price_history
availability_history
tools
projects (only if user saving exists)
affiliate_daily_metrics
```

Do not implement these tables now.

---

# 36. Recommended implementation phases for Codex

## Phase 0 – normalize existing scaffold

- [ ] copy this `IMPLEMENTATION.md` into repo root;
- [ ] generate and commit `package-lock.json`;
- [ ] switch Actions from `npm install` to `npm ci`;
- [ ] verify Node 24 locally/CI;
- [ ] ensure `npm run verify` passes;
- [ ] keep static export working;
- [ ] no Supabase/runtime APIs.

**Definition of done:** clean static build into `out/`.

## Phase 1 – harden shared catalog primitives

- [ ] create shared base product/offer types;
- [ ] add `schemaVersion`;
- [ ] add `deliveryCostStatus`;
- [ ] centralize Awin clickref helper;
- [ ] create `public/data/manifest.json`;
- [ ] add Zod schemas;
- [ ] add stable sort/deterministic JSON output;
- [ ] implement atomic writes;
- [ ] implement regression safety guards.

**Definition of done:** malformed generated data cannot replace valid catalog.

## Phase 2 – garden-house production readiness

- [ ] preserve current planner functionality;
- [ ] improve offer/budget shipping semantics;
- [ ] add structured reason objects;
- [ ] improve no-match explanations;
- [ ] create 30–50 product review workflow;
- [ ] create feed fixture tests;
- [ ] polish result cards;
- [ ] add data freshness text;
- [ ] add affiliate disclosure;
- [ ] add initial garden-house SEO pages.

**Definition of done:** can be launched with real reviewed Awin products.

## Phase 3 – production GitHub ingestion

- [ ] configure `AWIN_FEED_URLS_JSON`;
- [ ] run manual sync;
- [ ] inspect quality report;
- [ ] review first 30–50 products;
- [ ] rerun sync;
- [ ] verify only `reviewed:true` products appear;
- [ ] enable nightly schedule;
- [ ] verify bot commit does not contain secrets/raw feed.

**Definition of done:** daily catalog refresh is unattended and fail-safe.

## Phase 4 – Vercel production

- [ ] connect private GitHub repo to Vercel;
- [ ] production branch `main`;
- [ ] verify PR preview;
- [ ] verify production static export;
- [ ] verify `/data/...` files served;
- [ ] verify affiliate URLs;
- [ ] configure real domain later;
- [ ] submit sitemap/Search Console after domain is ready.

**Definition of done:** static production site live with no runtime DB/functions.

## Phase 5 – dehumidifier vertical

- [ ] add typed product model;
- [ ] add experimental reviewed sizing rule config;
- [ ] build normalizer;
- [ ] curate first models;
- [ ] add planner;
- [ ] add SEO cluster;
- [ ] compare revenue per organic visitor with garden house.

## Phase 6 – irrigation vertical

- [ ] implement compatible-system data model;
- [ ] component planner, not fake hydraulic CAD;
- [ ] build normalizer/overrides;
- [ ] add static calculator and SEO pages.

## Phase 7 – only then evaluate Supabase

Use the trigger conditions in section 35. Do not add it preemptively.

---

# 37. Acceptance criteria for initial public launch

## Architecture

- [ ] `output: "export"` enabled;
- [ ] no API routes;
- [ ] no Server Actions;
- [ ] no Supabase/database dependency;
- [ ] no LLM/AI dependency;
- [ ] `out/` contains all user-facing routes.

## Data

- [ ] every public catalog validates with Zod;
- [ ] schema version present;
- [ ] no feed credentials in repository/public build;
- [ ] no raw feeds committed;
- [ ] at least 30 reviewed garden-house products OR explicit decision to launch with fewer after quality review;
- [ ] unreviewed products cannot be recommended;
- [ ] offers have freshness timestamp;
- [ ] unknown shipping never shown as free.

## Ingestion

- [ ] scheduled workflow can be triggered manually;
- [ ] missing secret produces graceful skip;
- [ ] complete feed failure leaves old catalog intact;
- [ ] safety regression checks work;
- [ ] no-change run does not create unnecessary commit where feasible;
- [ ] generated commit contains only intended data files.

## Recommendation

- [ ] all hard constraints tested;
- [ ] score has no commission input;
- [ ] reasons shown;
- [ ] no-match state useful;
- [ ] product links contain valid affiliate tracking refs;
- [ ] no personal information in click refs.

## UX/SEO

- [ ] mobile usable;
- [ ] keyboard usable;
- [ ] static content appears without catalog load;
- [ ] unique metadata;
- [ ] sitemap/robots generated;
- [ ] affiliate disclosure visible;
- [ ] limitations visible;
- [ ] prices/availability freshness visible.

## Deployment

- [ ] GitHub CI green;
- [ ] Vercel Preview green;
- [ ] production deployment from `main` works;
- [ ] no Vercel runtime secrets needed for Awin;
- [ ] no runtime functions generated intentionally.

---

# 38. Suggested first real feed-validation exercise

Do this before spending significant time on SEO content.

1. Join/enable 2–3 relevant garden-house affiliate programs with product feeds.
2. Generate feed download URLs containing only useful columns.
3. Put URLs in GitHub secret.
4. Manually trigger `Sync affiliate product feeds`.
5. Inspect:

```text
candidate rows
normalized product rate
GTIN coverage
dimensions coverage
material coverage
delivery cost coverage
stock coverage
image coverage
```

6. Open `data/review/garden-house.json`.
7. Manually check the first 30–50 high-priority products.
8. Add corrections to override JSON.
9. Mark verified items `reviewed:true`.
10. Run sync again.
11. Test realistic planner inputs against those products.
12. Only then decide whether feed quality is good enough to scale the vertical.

Key business question:

> How many minutes of human review are needed per usable affiliate product?

If every product needs extensive manual reconstruction, feed-driven scaling is weak. If most products need only quick validation, the model scales well.

---

# 39. Business metrics to calculate after launch

Primary:

```text
Affiliate commission / organic visitor
```

Also:

```text
Affiliate commission / 1,000 Google impressions
Awin transactions / affiliate click
Sale value / affiliate click
Clicks / organic visitor
```

Once optional tool analytics exists:

```text
planner starts / organic visitor
planner completion rate
affiliate clicks / planner complete
no-match rate
```

Use these to determine which vertical to expand.

Do not optimize based only on pageviews.

---

# 40. Non-goals / things Codex should refuse to overbuild

Do not spend V1 time on:

- authentication;
- admin dashboard;
- visual drag-and-drop garden planner;
- AI chat;
- semantic/vector search;
- recommendation ML;
- custom CMS;
- microservices;
- Kubernetes;
- server event pipeline;
- live price alerts;
- mobile app;
- marketplace checkout;
- on-site payments;
- automatic building-permission decisions;
- scraping retailers where proper feeds are available;
- generic 100,000-product search UI.

The MVP objective is to validate:

```text
Google traffic → useful deterministic planner → affiliate click → affiliate sale
```

---

# 41. Expected operational cost profile

The architecture is designed for negligible runtime compute:

```text
Visitor calculator compute: browser
Product matching:           browser
Page rendering:             static/CDN
Product ingestion:          scheduled GitHub Actions
Build/deploy:               Git/Vercel build pipeline
Runtime database:           none
AI inference:               none
```

This does **not** mean every third-party platform is guaranteed to be free forever; plan limits can change. It means the application architecture does not require paid per-request compute or database queries for normal user traffic.

---

# 42. Primary documentation references

These were checked while preparing this implementation plan. Re-check when making platform-specific changes because SaaS/tool behavior evolves.

## Next.js static export

`https://nextjs.org/docs/app/guides/static-exports`

Key implementation assumption:

- `output: 'export'` generates static HTML/CSS/JS into `out/`;
- runtime server features such as Server Actions and ISR are not part of this architecture;
- default runtime image optimization is not available in pure static export, therefore images are unoptimized/remote in V1.

## Vercel Git deployments

`https://vercel.com/docs/git`

`https://vercel.com/docs/git/vercel-for-github`

Key implementation assumption:

- GitHub repository can be connected to Vercel;
- branch/PR work produces Preview Deployments;
- the production branch (typically `main`) produces Production Deployments.

## GitHub Actions schedule

`https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows`

Key implementation assumption:

- scheduled workflows use POSIX cron;
- timezone can be specified;
- scheduled workflows may be delayed under high Actions load, so ingestion must not assume exact-to-the-minute execution.

## GitHub Actions authentication / secrets

`https://docs.github.com/en/actions/tutorials/authenticate-with-github_token`

`https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets`

Key implementation assumption:

- workflow `GITHUB_TOKEN` permissions can be scoped;
- repository secrets are explicitly passed via the `secrets` context;
- pushes performed using `GITHUB_TOKEN` are designed not to recursively start new workflow runs from those push events.

## Official GitHub Actions

`https://github.com/actions/checkout`

`https://github.com/actions/setup-node`

Current implementation target uses:

```yaml
actions/checkout@v6
actions/setup-node@v6
```

## Awin product feeds

`https://help.awin.com/developers/docs/product-feed-publisher-guide-intro`

`https://help.awin.com/developers/docs/product-feed-list-download`

`https://help.awin.com/developers/docs/downloading-feeds-using-create-a-feed`

Key implementation assumptions:

- publishers can access downloadable product feeds;
- Product Feed List includes last update information so repeat downloads can later be optimized;
- feeds may expose mapped fields such as deep links, price, image, brand, dimensions/specifications, stock, delivery cost, EAN/GTIN/MPN, depending on merchant quality.

## Awin tracking links / click references

`https://help.awin.com/apidocs/generatelink`

`https://help.awin.com/developers/docs/click-appends-dyn-params`

`https://help.awin.com/apidocs/returns-a-list-of-transactions-for-a-given-publisher`

Key implementation assumptions:

- Awin supports `clickref` and additional click reference fields;
- those refs can be used for publisher-side transaction attribution;
- do not put personal/sensitive data into them.

---

# 43. Final implementation principle

When choosing between two architectures, prefer the one that preserves this property:

> **A user can load the page, complete the planner and get product recommendations even if MachPlan has zero application servers and zero database connections running.**

That is the defining constraint of V1.

Only relax it when real product usage proves that state, freshness, scale or internal operations require a database/runtime service.
