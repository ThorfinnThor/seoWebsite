# Deployment

1. Keep the GitHub repository private and protect `main` according to the team's workflow.
2. Add `AWIN_FEED_URLS_JSON` only under GitHub **Settings → Secrets and variables → Actions**.
3. Trigger **Sync affiliate product feeds** manually and inspect the generated report and review queue before enabling daily use.
4. Connect the repository through Vercel Git integration. Production branch is `main`; build command is `npm run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to `https://www.passendplanen.de` for Production, Preview and Development. Vercel currently redirects the apex domain to this canonical host. Do not add Awin secrets to Vercel.
6. The public legal contact defaults to `info@passendplanen.de`. Set `NEXT_PUBLIC_LEGAL_EMAIL` to that value in Vercel as an explicit deployment record, or use it later to override the address.
7. Optional: after creating the Google Search Console property for `https://www.passendplanen.de/`, set the HTML-tag token as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel for Production and redeploy. The app will emit the verification meta tag automatically.
8. Verify `/`, `/rechner/`, `/garten/gartenhaus-planer/`, `/garten/gewaechshaus-planer/`, `/garten/maehroboter-rechner/`, `/garten/carport-planer/`, `/garten/terrassen-dielen-rechner/`, `/garten/sichtschutz-planer/`, `/haus/boden/bodenbelag-rechner/`, `/haus/innenausbau/trockenbau-rechner/`, `/data/garden-house/catalog.json`, `/sitemap.xml`, `/robots.txt` and `/llms.txt` in Preview before merging. Canonical, sitemap and `llms.txt` URLs must all start with `https://www.passendplanen.de`.

## Analytics and Google Search Console

The repository already includes `@vercel/analytics`. After the production deployment:

1. In Vercel open the `passendplanen` project → **Analytics** → **Web Analytics** → **Enable**.
2. Keep the deployment on the `www.passendplanen.de` production domain. Analytics starts collecting after real page visits; local builds do not show production data.
3. Open [Google Search Console](https://search.google.com/search-console) and create a **URL-prefix property** for `https://www.passendplanen.de/` (or use a Domain property if you can add the DNS record).
4. For URL-prefix verification choose **HTML tag**, copy the token from the `content="..."` value, and add it in Vercel as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for **Production**.
5. Redeploy from GitHub Desktop/Vercel, then click **Verify** in Search Console.
6. In Search Console open **Sitemaps**, submit `sitemap.xml` and `sitemaps/index.xml`. The second file groups project profiles and comparisons by topic so crawl and indexing problems can be diagnosed per content cluster.

Do not paste the complete `<meta>` element into Vercel; only paste the token value. The variable is optional and the site remains valid before verification.

Follow the project-specific [Awin onboarding checklist](./awin-onboarding.md) after the legal contact and public site identity are ready.

Every generated-data workflow validates data, runs tests and typechecks before committing because a `GITHUB_TOKEN` push does not reliably start recursive Actions workflows.
