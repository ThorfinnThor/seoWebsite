# Sprint 3 und 4: Abschluss und externe Freigaben

Stand: 16. August 2026

## Technisch abgeschlossen

### SEO, GEO und Themenarchitektur

- Zehn eigenständige, indexierbare Themen-Hubs bündeln Rechner, Ratgeber und klare methodische Grenzen:
  - Gartenhaus
  - Mähroboter
  - Terrasse
  - Bewässerung
  - Gewächshaus
  - Sichtschutz
  - Carport
  - Bodenbelag
  - Trockenbau
  - Luftentfeuchter
- Die zentrale Ratgeberseite führt zuerst über diese Themenwelten und zeigt darunter priorisierte Inhalte je Cluster.
- Breadcrumbs führen von jedem dynamischen Ratgeber zurück zum passenden Themen-Hub.
- Die Hubs besitzen eindeutige Metadaten, Canonicals sowie `CollectionPage`- und `ItemList`-JSON-LD.
- Sitemap und `llms.txt` enthalten alle zehn Themen-Hubs.
- Alle 47 Szenario-Ratgeber besitzen jetzt:
  - ein eigenständiges sichtbares Rechenbeispiel;
  - fachliche beziehungsweise amtliche Ausgangsquellen;
  - maschinenlesbare `citation`-Angaben;
  - Vergleich, Checkliste, FAQ und interne Weiterführung.

### Affiliate- und Awin-Technik

- Der Awin-Import verarbeitet nicht mehr nur Gartenhäuser, sondern drei sichere Kataloge:
  - `garden-house`
  - `dehumidifier`
  - `irrigation`
- Alte Feed-Konfigurationen als URL-Array bleiben kompatibel.
- Getrennte Feed-URLs pro Produkttyp werden unterstützt.
- Neue Normalisierer erkennen technische Kerndaten, markieren unklare Pflichtangaben und erzeugen eine Review-Warteschlange.
- Feed-Daten bleiben ausnahmslos unsichtbar, bis ein manueller Override `reviewed: true` und `dataQuality: "mixed"` oder `"curated"` setzt.
- Kataloggrößen, Datenrückgänge, doppelte Identitäten, unbekannte Angebote und versehentlich veröffentlichte Feed-Geheimnisse werden automatisch geprüft.
- `npm run review:products` zeigt Kandidaten, Parser-Hinweise, öffentliche Produkte und Awin-Programmstatus kompakt an.
- Der geplante GitHub-Workflow bleibt bis zu einem erfolgreichen manuellen Feed-Test bewusst deaktiviert.

## Verifizierter Stand

```text
143 statische HTML-Seiten
140 indexierbare Seiten
107/107 Ratgeber bestehen das Content-Gate
81 Ratgeber mit sichtbaren Quellen
60 Ratgeber mit eigenständigem Rechenbeispiel
27 Testdateien bestanden
167 Tests bestanden
10/10 Rechner registriert
keine ungültigen internen Links
keine Mobile-Überläufe bei 320 px und 375 px
keine Browser-Konsolenfehler in den geprüften Hubs und Ratgebern
```

Verwendete Abschlussprüfungen:

```bash
npm run verify
npm run audit:content:strict
npm run review:products
npm run readiness:public
```

## Externe Schritte nach dem GitHub-Push

Diese Schritte verändern externe Konten und können nicht allein durch Repository-Code abgeschlossen werden.

### 1. Vercel Web Analytics

1. Vercel-Projekt `passendplanen` öffnen.
2. **Analytics → Web Analytics → Enable** wählen.
3. Prüfen, dass das Production Deployment auf `www.passendplanen.de` läuft.
4. Nach echten Besuchen kontrollieren, ob Seitenaufrufe eingehen.

Die React-Integration über `@vercel/analytics` ist bereits produktionsfertig eingebaut.

### 2. Google Search Console

1. Property `https://www.passendplanen.de/` anlegen.
2. Bei HTML-Tag-Verifizierung nur den `content`-Token kopieren.
3. In Vercel `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` für Production setzen und neu deployen.
4. Search Console-Verifizierung abschließen.
5. Unter **Sitemaps** den Wert `sitemap.xml` absenden.
6. Danach Stichproben über URL-Prüfung für Startseite, Rechner, Themen-Hub und neuen Ratgeber durchführen.

### 3. Awin-Programme und Feeds

Der aktuelle lokale Status lautet: elf Programme sind als Kandidaten registriert, aber kein Programm ist als aktiv bestätigt; deshalb gibt es weiterhin null geprüfte Produkte und null öffentliche Angebote.

Nach der ersten Programmfreigabe:

1. `data/manual/merchants.json` beim betreffenden Programm auf `applicationStatus: "active"` und `enabled: true` stellen.
2. In Awin unter **Toolbox → Create-a-Feed** die benötigten Produktspalten auswählen.
3. Feed-URLs nur als GitHub Actions Secret `AWIN_FEED_URLS_JSON` speichern.
4. **Actions → Sync affiliate product feeds → Run workflow** einmal manuell starten.
5. `npm run review:products` ausführen und Kandidaten in `data/review/` kontrollieren.
6. Bestätigte Werte als Override in `data/overrides/` eintragen.
7. Build und echte Trackinglinks testen.
8. Erst danach die GitHub-Variable `AWIN_FEED_SCHEDULE_ENABLED=true` setzen.

## Launchstatus

Der öffentliche Rechner-, Ratgeber- und SEO-Launch ist technisch bereit. Produktbasierte Affiliate-Vergleiche bleiben korrekt blockiert, bis Awin Programme, Feed-Zugänge und manuell geprüfte Produkte vorliegen. Es werden weiterhin keine erfundenen Rankings oder ungeprüften Angebote veröffentlicht.
