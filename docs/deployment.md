# Deployment

1. Keep the GitHub repository private and protect `main` according to the team's workflow.
2. Add `AWIN_FEED_URLS_JSON` only under GitHub **Settings → Secrets and variables → Actions**.
3. Trigger **Sync affiliate product feeds** manually and inspect the generated report and review queue before enabling daily use.
4. Connect the repository through Vercel Git integration. Production branch is `main`; build command is `npm run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to the selected production origin. Do not add Awin secrets to Vercel.
6. Set `NEXT_PUBLIC_LEGAL_EMAIL` only when the reachable public contact address is decided. Without it, imprint and privacy pages intentionally show a draft notice and remain `noindex`.
7. Verify `/`, `/rechner/`, `/garten/gartenhaus-planer/`, `/garten/terrassen-dielen-rechner/`, `/garten/sichtschutz-planer/`, `/haus/boden/bodenbelag-rechner/`, `/data/garden-house/catalog.json`, `/sitemap.xml` and `/robots.txt` in Preview before merging.

Every generated-data workflow validates data, runs tests and typechecks before committing because a `GITHUB_TOKEN` push does not reliably start recursive Actions workflows.
