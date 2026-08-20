# Google Search Console: „Gefunden – zurzeit nicht indexiert“

Stand: 20. August 2026

## Befund

Die Search Console meldet 562 gefundene, aber noch nicht indexierte URLs. Der Bericht wurde erstmals am 18. August 2026 erkannt. Die betroffenen Seiten sind damit erst seit ungefähr zwei Tagen in Googles Crawl-Warteschlange.

Die technische Prüfung der Live-Website ergab für Stichproben:

- HTTP-Status 200
- selbstreferenzierendes HTTPS-Canonical auf `www.passendplanen.de`
- kein `noindex`
- keine Blockierung in `robots.txt`
- vollständige, erreichbare XML-Sitemap
- schnelle statische Antworten aus dem Vercel-Cache

Der Status ist deshalb kein nachgewiesener technischer Defekt. Er bedeutet, dass Google die URLs kennt, sie aber noch nicht oder noch nicht mit ausreichender Crawl-Nachfrage verarbeitet hat. Eine Aufnahme in die Sitemap garantiert keine Indexierung.

## Umgesetzte Crawl-Verbesserungen

1. Die 2.011 indexierbaren URLs bleiben in der bestehenden `/sitemap.xml` enthalten.
2. Zusätzlich gibt es einen Sitemap-Index unter `/sitemaps/index.xml`.
3. Der Index trennt die Website in 22 beobachtbare Segmente:
   - Kernseiten und Themenverzeichnisse
   - redaktionelle Ratgeber
   - zehn Projektprofil-Sitemaps mit jeweils 85 URLs
   - zehn Vergleichs-Sitemaps mit jeweils 100 URLs
4. `robots.txt` nennt sowohl die bestehende Gesamtsitemap als auch den neuen Sitemap-Index.
5. Jedes der 850 Projektprofile verweist zusätzlich auf zwei konkrete Nachbarprofile.
6. Jeder der 1.000 Direktvergleiche verweist zusätzlich auf zwei konkrete Nachbarvergleiche.
7. Alle Sitemap-Segmente verwenden reale gruppenbezogene Änderungsdaten und keine erfundene tägliche Aktualisierung.

Die Segmentierung erzwingt keinen Crawl. Sie verbessert jedoch die Entdeckung, interne Erschließung und vor allem die Diagnose nach Seitentyp und Thema.

## Schritte nach dem Deployment

1. Live prüfen:
   - `https://www.passendplanen.de/robots.txt`
   - `https://www.passendplanen.de/sitemaps/index.xml`
   - je eine Projekt- und Vergleichs-Sitemap
2. In Google Search Console **Indexierung → Sitemaps** öffnen.
3. Zusätzlich zur bestehenden `sitemap.xml` den Wert `sitemaps/index.xml` einreichen.
4. Drei bis fünf repräsentative URLs mit **URL-Prüfung → Live-URL testen** kontrollieren:
   - eine Kernseite
   - einen redaktionellen Ratgeber
   - ein Projektprofil
   - einen Direktvergleich
5. Nur bei erfolgreichen Live-Tests für diese wenigen Prioritätsseiten **Indexierung beantragen**. Nicht hunderte URLs manuell anstoßen.
6. Den Bericht frühestens nach sieben bis vierzehn Tagen erneut nach Sitemap-Segmenten auswerten. Der normale Crawl und die Verarbeitung können länger dauern.
7. **Fehlerbehebung überprüfen** erst nach dem Deployment und den erfolgreichen Live-Tests starten. Dieser Button beschleunigt keine Indexierung, sondern bittet Google nur, die gemeldete Gruppe erneut zu bewerten.

## Redaktionelle Risikogrenze

Wenn einzelne Sitemap-Segmente nach mehreren Wochen überwiegend unter „Gefunden – zurzeit nicht indexiert“ bleiben, ist der nächste Hebel nicht eine weitere URL-Massenproduktion. Dann müssen wir anhand von Search-Console-Daten die schwächsten Seitengruppen auswählen und deren Eigenständigkeit, Suchintention, interne Priorisierung sowie tatsächlichen Nutzwert redaktionell erhöhen. Bei dauerhaft ähnlichen programmatischen Seiten kann eine gestaffelte Indexierung besser sein als alle URLs gleichzeitig im Index halten zu wollen.
