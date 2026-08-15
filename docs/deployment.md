# Deployment

1. Keep the GitHub repository private and protect `main` according to the team's workflow.
2. Add `AWIN_FEED_URLS_JSON` only under GitHub **Settings → Secrets and variables → Actions**.
3. Trigger **Sync affiliate product feeds** manually and inspect the generated report and review queue before enabling daily use.
4. Connect the repository through Vercel Git integration. Production branch is `main`; build command is `npm run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to `https://www.passendplanen.de` for Production, Preview and Development. Vercel currently redirects the apex domain to this canonical host. Do not add Awin secrets to Vercel.
6. Set `NEXT_PUBLIC_LEGAL_EMAIL` only when the reachable public contact address is decided. Without it, imprint and privacy pages intentionally show a draft notice and remain `noindex`.
7. Verify `/`, `/rechner/`, `/garten/gartenhaus-planer/`, `/garten/gewaechshaus-planer/`, `/garten/maehroboter-rechner/`, `/garten/carport-planer/`, `/garten/terrassen-dielen-rechner/`, `/garten/sichtschutz-planer/`, `/haus/boden/bodenbelag-rechner/`, `/haus/innenausbau/trockenbau-rechner/`, `/data/garden-house/catalog.json`, `/sitemap.xml`, `/robots.txt` and `/llms.txt` in Preview before merging. Canonical, sitemap and `llms.txt` URLs must all start with `https://www.passendplanen.de`.

Follow the project-specific [Awin onboarding checklist](./awin-onboarding.md) after the legal contact and public site identity are ready.

Every generated-data workflow validates data, runs tests and typechecks before committing because a `GITHUB_TOKEN` push does not reliably start recursive Actions workflows.
