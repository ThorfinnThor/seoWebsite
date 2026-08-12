# MachPlan Audit Implementation Report – 12. August 2026

## Executive Summary

Der Audit enthielt 24 priorisierte Findings (6 × P1, 10 × P2, 8 × P3). Jedes Finding wurde vor der Implementierung gegen den aktuellen Code geprüft und erhielt genau ein Urteil. 10 sichere Findings wurden vollständig umgesetzt, 6 bestätigte Findings wurden in bewusst begrenzter Form umgesetzt, 5 Findings wurden nicht umgesetzt und 3 Änderungen wurden wegen fehlender menschlicher Entscheidung oder externer Daten ausdrücklich blockiert.

Der technische Rechner-Preview ist nach Build, statischem Audit und responsiver Browser-QA startklar. Ein beworbener öffentlicher Launch ist noch durch die bewusst offene Kontakt-E-Mail blockiert. Der Affiliate-Launch ist zusätzlich durch die leeren, noch nicht mit Awin verbundenen Produktkataloge blockiert.

## Urteilssummen

| Urteil | Anzahl |
|---|---:|
| ✅ YES | 10 |
| ⚠️ YES BUT MODIFY | 10 |
| ❌ NO | 1 |
| 🛑 DANGEROUS | 3 |
| **Gesamt** | **24** |

Die vollständige Vorabbegründung für jedes Finding steht in `docs/audit-review-2026-08-12.md`.

## Implementiert wie vorgeschlagen

1. **P1-01 – Bewässerungsvalidierung:** Ungültige und nicht endliche Zahlen werden nicht mehr berechnet. Fehler erscheinen am Feld; der Fokus springt zur ersten ungültigen Eingabe.
2. **P1-02 – Fokus für eigene Controls:** Radio-, Checkbox- und Toggle-Proxys haben einen sichtbaren, zweifarbigen Tastaturfokus.
3. **P1-03 – Gartenhaus-Ergebnisgrenze:** Die finale Aktion validiert vollständig, verhindert paralleles Laden und rendert keine Resultate aus ungültigem Zustand.
4. **P2-01 – Luftentfeuchter-Fehlerführung:** Zwischen- und Endschritte validieren sichtbar; Katalogfehler bieten „Erneut versuchen“.
5. **P2-04 – Fokuskontrast:** Der einzelne hellblaue Ring wurde durch einen hell/dunkel kontrastierenden Fokusindikator mit Forced-Colors-Fallback ersetzt.
6. **P2-09 – Katalogcache:** Statische Kataloge nutzen Browser-Caching und teilen parallele In-Flight-Requests; ein Fehler leert den Cache für einen echten Retry.
7. **P3-01 – Fortschrittssemantik:** Rechnerfortschritt besitzt `role="progressbar"` sowie Min-/Max-/Ist-Werte.
8. **P3-02 – Dekorative Glyphen:** Die bestätigten Legacy-Symbole sind für assistive Technik ausgeblendet.
9. **P3-03 – Gartenhaus-Fokus:** Der unnötige äußere Fokuscontainer wurde entfernt; die gemeinsame Schrittüberschrift ist wieder die Fokusgrenze.
10. **P3-05 – Überschriftenhierarchie:** Rechnerkarten im Verzeichnis verwenden `h3` unter der Abschnittsüberschrift.

## Implementiert mit Anpassung

1. **P1-04 – Launch-Readiness:** Neue strikte Modi `readiness:public` und `readiness:affiliate` liefern einen echten Fehlercode, wenn verbindliche Blocker bestehen. Der normale Preview-Modus bleibt informativ, damit die bewusst unfertige Vorschau weiter deploybar ist.
2. **P2-02 – Issue-Zuordnung:** Eine kleine gemeinsame Zod-Issue-zu-Feld-Zuordnung wurde für die drei bestätigten Problemflüsse eingeführt. Keine riskante Komplettumstellung aller stabilen Rechner.
3. **P2-03 – Duplikation:** Gemeinsame Fehler- und Fokuslogik wurde extrahiert. Ein universeller Wizard-Refactor wurde vermieden.
4. **P2-05 – Testabdeckung:** Drei neue Regressionstestbereiche decken Validierungszuordnung, Katalog-Deduplizierung/Retry und Feed-Zeilenlimits ab. Zusätzlich wurden reale Browser- und Accessibility-Grenzen geprüft. Eine neue E2E-Abhängigkeit wurde nicht eingeführt.
5. **P2-06 – Feed-Workflow:** Feed-Änderungen durchlaufen jetzt die vollständige vorhandene `verify`-Kette. Fehlende Feed-Konfiguration erscheint prominent in der GitHub-Job-Zusammenfassung. Direkte `main`-Commits bleiben bis zur Branch-/PR-Entscheidung unverändert.
6. **P2-07 – Feed-Limits:** Download-Timeout, tatsächliches Byte-Limit, `Content-Length`-Vorprüfung und Zeilenlimit wurden ergänzt. Alle Werte sind per Umgebung konfigurierbar. Eine Redirect-Host-Allowlist wurde nicht ohne echten Awin-CDN-Pfad geraten.

## Nicht implementiert

1. **P2-08 – Persistenz-/Verlaufs-UX:** Der vorhandene Fallback verhindert bereits einen Crash. Eine produktweite Warnung, Schritt-Wiederaufnahme und Verlauf benötigen eine gemeinsame UX-Spezifikation für alle Rechner.
2. **P3-04 – Mobile Direktnavigation:** „Alle Planer“ bleibt mobil verfügbar; das Verstecken einzelner Direktlinks ist kein nachgewiesener Defekt. Eine zusätzliche Navigation würde ohne Entscheidung Platz und Informationshierarchie verändern.
3. **P3-06 – Seitenindividuelle Änderungsdaten:** Keine erfundenen Datumswerte. Benötigt einen redaktionellen Aktualisierungsprozess.
4. **P3-07 – Action-SHA-Pinning:** Keine unbestätigten Commit-SHAs. Sollte separat mit verifizierten Hersteller-SHAs und Update-Prozess erfolgen.
5. **P3-08 – Lint/Format-Stack:** Kein zusätzlicher Tooling-Stack im Fix-Sprint. TypeScript, Tests, Datenschemas, Produktions-Build und statischer Site-Audit bleiben verbindlich.

## Blockiert / gefährliche automatische Änderungen vermieden

1. **P1-05 – Rechtskontakt:** Die E-Mail soll ausdrücklich offen bleiben. Es wurde keine Adresse erfunden und kein unfertiger Rechtstext als final dargestellt.
2. **P1-06 – Affiliate-Kataloge:** Es wurden keine Fake-Produkte, fremden Trackinglinks oder provisorischen Awin-IDs eingefügt.
3. **P2-10 – Remote-Bilder:** Ohne echte Feed- und Bildhosts wurde keine Datenschutz-Allowlist oder Proxy-Architektur geraten.

## Geänderte Bereiche

- Rechnerlogik: Bewässerung, Gartenhaus, Luftentfeuchter
- Gemeinsame Validierung: Issue-Zuordnung und Fokusführung
- Accessibility/CSS: Fokusindikatoren, Progressbar, Semantik, dekorative Glyphen
- Katalogladen: Caching, In-Flight-Deduplizierung und Retry-Grenze
- Awin-Import: Timeout, Byte- und Zeilenlimits
- GitHub Workflow: vollständige Verify-Kette und sichtbare Skip-Zusammenfassung
- Launch-Prüfung: Preview-, Public- und Affiliate-Modus
- Dokumentation: Vorabentscheidung und dieser Ergebnisbericht

## Verifikation

### Automatisiert

- 22 Testdateien bestanden
- 150 Tests bestanden
- TypeScript ohne Fehler
- Daten-Schemas bestanden; weiterhin ehrlich 0 Produkte in den drei Affiliate-Katalogen
- Next.js Produktions-Build erfolgreich
- 62 statische Routen erzeugt
- 31 erforderliche Launch-Artefakte bestätigt
- Statischer Site-Audit: 58 Seiten, 54 indexierbar, 34 belegte Ratgeber, 13 Rechenbeispiele, interne Links gültig

### Browser-QA

- Startseite, Rechnerverzeichnis und alle 10 Rechner bei 390 × 844 px geprüft
- dieselben 12 Kernrouten bei 1440 × 1000 px geprüft
- kein horizontaler Seitenüberlauf und keine abgeschnittenen Hauptelemente
- Bewässerung: ungültiger Flächenwert bleibt auf Schritt 1, markiert und fokussiert das Feld
- Gartenhaus: Dezimalzahl bei Fahrrädern und zu kleines Budget werden abgefangen; kein `NaN`
- Luftentfeuchter: ungültige Raumfläche bleibt auf Schritt 1 und fokussiert das Feld
- Radio-Fokus visuell per Tastatur geprüft: 3 px heller Innenring plus 5 px dunkelgrüner Außenring
- keine Browser-Console-Warnungen oder -Fehler in der Abschlussprüfung

## Launch-Status

| Modus | Status | Verbleibende Blocker |
|---|---|---|
| Technischer Preview | Bereit | Keine technischen Blocker |
| Öffentlicher Marken-Launch | Blockiert | Echte Kontakt-E-Mail; finale Name/Domain-Entscheidung bleibt manuell |
| Affiliate-Launch | Blockiert | Öffentlicher Rechtskontakt, Awin-Freigabe, echte Produkte/Angebote, Bild-/Tracking-Entscheidung |

## Empfohlene nächste Entwicklungsschritte

1. Echte Kontakt-E-Mail festlegen und Rechtsseiten menschlich freigeben; danach `npm run readiness:public` verbindlich in den Release-Prozess aufnehmen.
2. Awin-Konto/Advertiser freischalten, einen realen Feed in einer sicheren Testumgebung prüfen und erst dann Redirect-Hosts sowie Bildstrategie festlegen.
3. Feed-Updates auf Bot-Branch plus Pull Request umstellen und Branch-Protection aktivieren.
4. Eine kleine echte Browser-E2E-Suite für die zehn Rechner und automatisierte Accessibility-Checks einführen.
5. Rechnerübergreifende Session-Wiederaufnahme und Speicherwarnung als eigenes UX-Paket spezifizieren.
6. Verifizierte GitHub-Action-SHAs und einen schlanken ESLint/Formatter-Workflow in einem separaten Tooling-Sprint ergänzen.
