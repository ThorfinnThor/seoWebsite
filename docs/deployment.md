# Deployment auf Cloudflare Pages

## Projekt und Build

1. Das GitHub-Repository `ThorfinnThor/seoWebsite` mit Cloudflare Pages verbinden.
2. Als Produktionsbranch `main` verwenden.
3. Framework-Voreinstellung `Next.js (Static HTML Export)` wählen.
4. Build-Befehl `npm run build` und Ausgabeverzeichnis `out` eintragen. Das Stammverzeichnis bleibt leer.
5. `NODE_VERSION=24.19.0`, `NEXT_PUBLIC_SITE_URL=https://www.passendplanen.de` und `NEXT_PUBLIC_LEGAL_EMAIL=info@passendplanen.de` als Build-Variablen setzen.
6. Den vorhandenen Wert von `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` übernehmen. Awin-Zugangsdaten gehören ausschließlich in GitHub Actions Secrets und nicht zu Cloudflare.

Vor dem Domainwechsel müssen `/`, `/rechner/`, alle Planer, `/sitemap.xml`, `/robots.txt`, `/llms.txt` und mindestens ein Produktkatalog auf der `pages.dev`-Vorschau geprüft werden. Der statische Build kopiert `public/_redirects` in das Ausgabeverzeichnis.

## Domain und DNS

Vor einem Nameserver-Wechsel alle bestehenden DNS-Einträge exportieren und insbesondere MX, SPF, DKIM, DMARC, Verifizierungs-TXT und weitere Subdomains kontrollieren. `www.passendplanen.de` ist der kanonische Host. Die Apex-Domain `passendplanen.de` leitet dauerhaft und unter Erhalt von Pfad und Query-String auf `www` weiter. Auch die öffentliche `pages.dev`-Adresse soll nach erfolgreichem Domainwechsel dauerhaft auf die kanonische Domain weiterleiten.

SSL/TLS wird auf `Full (strict)` gestellt und `Always Use HTTPS` aktiviert. Ein Nameserver-Wechsel erfolgt erst, wenn Cloudflare alle vorhandenen DNS-Einträge korrekt übernommen hat.

## Analytics und Google Search Console

Cloudflare Web Analytics wird für datensparsame Seiten- und Performance-Auswertungen aktiviert. Die Anwendung sendet die Ereignisse `planner_started`, `planner_completed`, `planner_reset`, `products_shown`, `products_unavailable` und `affiliate_click` an die Zaraz Web API, sobald Zaraz für die Domain aktiv ist. Die Ereignisse enthalten keine konkreten Planereingaben.

Die bestehende Google-Search-Console-Property bleibt gültig. Nach dem Domainwechsel werden `https://www.passendplanen.de/sitemap.xml` und `https://www.passendplanen.de/sitemaps/index.xml` erneut abgerufen und stichprobenartig mit der URL-Prüfung kontrolliert. Ein Umzug in der Search Console ist nicht nötig, weil sich die öffentliche Domain nicht ändert.

## Abschlussprüfung

Nach der DNS-Aktivierung werden Statuscodes, Weiterleitungen, Canonicals, Sitemap, robots.txt, strukturierte Daten, Partnerlinks, Mobilansicht und die wichtigsten Rechnerpfade auf der Live-Domain geprüft. Erst danach kann das alte Vercel-Projekt dauerhaft entfernt werden.
