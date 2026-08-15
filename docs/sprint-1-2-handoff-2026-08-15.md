# Sprint 1 und 2: Abschluss und Übergabe

Stand: 15. August 2026

## Abgeschlossen

- 60 bereits vorhandene Rechner- und Ratgeberseiten wurden um strukturierte Entscheidungshilfen ergänzt.
- Alle Ratgeber unterstützen jetzt Vergleichstabellen, Checklisten, FAQ, interne Weiterführungen und eine sichtbare methodische Grenze.
- FAQPage- und Article-Daten enthalten die passenden strukturierten Angaben einschließlich berechneter Wortzahl.
- 47 zusätzliche Szenario-Ratgeber wurden veröffentlicht. Sie decken konkrete Flächen, Größen, Nutzungen und Materialentscheidungen in zehn Themenclustern ab.
- Der statische Export enthält 133 Seiten, davon 130 indexierbar.
- 107 von 107 Ratgeberseiten bestehen den Content-Qualitätscheck: mindestens 800 sichtbare Wörter oder mindestens 550 Wörter plus vier sinnvolle Inhaltsmodule, FAQ und interne Weiterführung.
- Sitemap, kanonische URLs, interne Links, statischer Export, TypeScript und automatisierte Tests sind fehlerfrei.
- Mobile Stichproben bei 375 und 320 Pixel Breite zeigen keinen Seitenüberlauf. Vergleichstabellen scrollen innerhalb ihres Containers; Überschriften, Buttons, FAQ und Linkkarten bleiben nutzbar.

## Qualitätsnachweis

```bash
npm run verify
npm run audit:content:strict
npm run readiness:public
```

Aktueller Nachweis:

- 25 Testdateien und 159 Tests erfolgreich
- 137 statisch generierte Next.js-Routen
- 133 HTML-Seiten im Site-Audit
- 130 indexierbare Seiten
- 107 hochwertige Ratgeberseiten
- keine ungültigen internen Links

## Sprint 3: Daten, E-E-A-T und Indexierung

1. Die 47 neuen Szenarioseiten redaktionell priorisieren und bei den wichtigsten Suchintentionen externe Primärquellen ergänzen.
2. Rechenbeispiele als eigene, visuell hervorgehobene Module ausbauen und Annahmen je Cluster weiter individualisieren.
3. Cluster-Hubs für Gartenhaus, Mähroboter, Terrasse, Bewässerung, Gewächshaus, Sichtschutz, Carport, Boden, Trockenbau und Luftentfeuchter ausbauen.
4. Vercel Web Analytics prüfen, Google Search Console verifizieren und `https://www.passendplanen.de/sitemap.xml` einreichen.
5. Indexierungsstatus, Canonicals und strukturierte Daten nach dem Produktionsdeployment kontrollieren.

## Sprint 4: Affiliate-Daten und echte Produktvergleiche

1. Awin-Programme freischalten lassen und Feed-Zugänge sammeln.
2. `AWIN_FEED_URLS_JSON` als GitHub-Secret hinterlegen und den Feed-Import ausführen.
3. Produkte manuell auf Datenqualität, Verfügbarkeit, Preis, Bilder, technische Kriterien und Trackinglinks prüfen.
4. Erst mit geprüften Produktdaten indexierbare Marken-, Produkt- und Top-Auswahlseiten erstellen.
5. Affiliate-Klicks, fehlerhafte Links, Feed-Aktualität und redaktionelle Kennzeichnung überwachen.

## Noch externer Blocker

Der öffentliche Rechner- und Content-Launch ist technisch möglich. Für produktbasierte Affiliate-Seiten fehlen weiterhin freigegebene Programme und geprüfte Produkte; der aktuelle Katalog enthält deshalb bewusst keine öffentlichen Angebote.
