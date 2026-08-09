# Deployment

1. Keep the GitHub repository private and protect `main` according to the team's workflow.
2. Add `AWIN_FEED_URLS_JSON` only under GitHub **Settings → Secrets and variables → Actions**.
3. Trigger **Sync affiliate product feeds** manually and inspect the generated report and review queue before enabling daily use.
4. Connect the repository through Vercel Git integration. Production branch is `main`; build command is `npm run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to the selected production origin. Do not add Awin secrets to Vercel.
6. Verify `/`, `/garten/gartenhaus-planer/`, `/data/garden-house/catalog.json`, `/sitemap.xml` and `/robots.txt` in Preview before merging.

Every generated-data workflow validates data, runs tests and typechecks before committing because a `GITHUB_TOKEN` push does not reliably start recursive Actions workflows.
