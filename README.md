# PassendPlanen

Germany-first static decision engine for house and garden projects. The current build contains planners for garden houses, greenhouses, carport space, robot-mower suitability, drywall quantities, dehumidifiers, irrigation, terrace materials, straight privacy-screen runs and floating floor-covering quantities plus supporting guides and transparency pages.

## Local development

Requirements: Node.js 24 and npm.

```bash
npm ci
npm run dev
```

Run the complete launch verification:

```bash
npm run verify
```

Show the remaining launch-specific checks for legal contact, domain and affiliate data:

```bash
npm run readiness
```

The production build is a pure static export in `out/`. There are no API routes, Server Actions, runtime databases or AI dependencies.

## Product data

All public product catalogs start empty by design. Real Awin candidates are imported offline with `npm run sync:products` and become public only after validation and manual review.

Never place `AWIN_FEED_URLS_JSON` in a local committed file or in Vercel. Configure it as a GitHub Actions repository secret.

The exact signup, advertiser application and secure feed setup sequence is documented in [`docs/awin-onboarding.md`](docs/awin-onboarding.md).

## Deployment

Connect the GitHub repository to Vercel, use `main` as the production branch and set `NEXT_PUBLIC_SITE_URL` to the canonical production origin. No Awin secret is required in Vercel.

Before public launch, set `NEXT_PUBLIC_LEGAL_EMAIL` to the reachable email address used in the imprint and privacy notice. Without it those two pages render a visible draft warning and `noindex` metadata.

Current Vercel values:

```text
NEXT_PUBLIC_SITE_URL=https://www.passendplanen.de
NEXT_PUBLIC_LEGAL_EMAIL=
```
