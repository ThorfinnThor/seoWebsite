# MachPlan

Germany-first static decision engine for house and garden projects. V1 contains the production foundation and the garden-house planner described in [IMPLEMENTATION.md](./IMPLEMENTATION.md).

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

The production build is a pure static export in `out/`. There are no API routes, Server Actions, runtime databases or AI dependencies.

## Product data

The public garden-house catalog starts empty by design. Real Awin candidates are imported offline with `npm run sync:products`, written to `data/review/garden-house.json`, and become public only after an override marks them `reviewed: true` with `dataQuality: "mixed"` or `"curated"`.

Never place `AWIN_FEED_URLS_JSON` in a local committed file or in Vercel. Configure it as a GitHub Actions repository secret.

## Deployment

Connect the private GitHub repository to Vercel, use `main` as the production branch and set `NEXT_PUBLIC_SITE_URL` at build time once the actual domain is known. No Awin secret is required in Vercel.
