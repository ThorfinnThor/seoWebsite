# MachPlan Audit Review – 12. August 2026

Diese Entscheidungsmatrix wurde vor der Implementierung erstellt. Sie bewertet jeden priorisierten Befund aus `MachPlan-Full-QA-UX-GitHub-Audit.md` gegen den aktuellen Stand des Repositorys. Ein Befund wird nur umgesetzt, wenn Ursache, Wirkung und Änderung im vorhandenen Aufbau nachvollziehbar sind.

## Legende

- ✅ **YES** – bestätigt; die vorgeschlagene Richtung ist sicher und wird umgesetzt.
- ⚠️ **YES BUT MODIFY** – bestätigt, aber die vorgeschlagene Maßnahme ist zu breit oder braucht eine sicherere Variante.
- ❌ **NO** – nicht ausreichend belegt, subjektiv oder im aktuellen Zustand nicht sinnvoll.
- 🛑 **DANGEROUS** – würde ohne menschliche Entscheidung, echte Daten oder externe Freigabe ein relevantes Risiko erzeugen.

## Vollständige Checkliste

| ID | Priorität | Befund | Urteil | Risiko | Begründung und Entscheidung | Erwartete Wirkung |
|---|---|---|---|---|---|---|
| P1-01 | P1 | Bewässerungsplaner akzeptiert ungültige Zahlen/`NaN` und kann widersprüchliche Ergebnisse zeigen | ✅ **YES** | Mittel | Reproduzierbar: `valueAsNumber` kann `NaN` liefern, während der Plan ungeprüft berechnet wird. Schemafehler werden nicht den Feldern zugeordnet. Sichere Korrektur: nur aus erfolgreich geparsten Daten rechnen, Feldfehler anzeigen und erstes ungültiges Feld fokussieren. | Keine `NaN`-Ergebnisse; verständliche Fehler und stabile Ergebnisgrenze. |
| P1-02 | P1 | Eigene Radio-, Checkbox- und Toggle-Controls haben keinen klar sichtbaren Tastaturfokus | ✅ **YES** | Niedrig | Im CSS sind die nativen Inputs unsichtbar, ohne Fokusdarstellung auf dem sichtbaren Proxy. Sichere CSS-Korrektur mit `:has(input:focus-visible)` und zweifarbigem Fokusindikator. | Tastaturbedienung wird sichtbar und WCAG-näher. |
| P1-03 | P1 | Gartenhaus-Endaktion umgeht Schema-Validierung und kann `NaN €` zeigen | ✅ **YES** | Mittel | Bestätigt: der Ergebnis-Handler validiert nicht, während Anforderungen und Budget aus Rohzustand berechnet werden. Endaktion wird validiert, gegen Doppelklick geschützt und Ergebnisse werden nur aus validierten Daten erzeugt. | Kein ungültiger Ergebniszustand oder paralleles Laden. |
| P1-04 | P1 | Launch-Readiness ist informativ, aber nicht erzwingbar | ⚠️ **YES BUT MODIFY** | Mittel | Bestätigt. Ein sofortiger harter Produktionsabbruch wäre aktuell falsch, weil E-Mail, finale Domain und Affiliate-Kataloge bewusst offen sind. Sichere Variante: explizite strikte Modi für `public` und `affiliate`, ohne den bestehenden Preview-Deploy zu blockieren. | Prüfungen können später verbindlich geschaltet werden, ohne die aktuelle Vorschau zu zerstören. |
| P1-05 | P1 | Öffentliche Rechts-/Kontaktangaben sind unvollständig | 🛑 **DANGEROUS** | Hoch | Bestätigt, aber die E-Mail soll laut Auftrag offen bleiben. Eine erfundene Adresse oder automatische rechtliche Formulierung wäre falsch. Keine inhaltliche Änderung ohne echte Kontaktadresse und menschliche Freigabe. | Verhindert falsche Rechtsangaben; bleibt Launch-Blocker für eine öffentliche Vermarktung. |
| P1-06 | P1 | Produktkataloge sind leer; Produkt-/Affiliate-Reise ist nicht verfügbar | 🛑 **DANGEROUS** | Hoch | Bestätigt und aktuell bewusst so. Fake-Produkte, fremde Links oder provisorische Affiliate-IDs wären irreführend. Keine Befüllung vor Awin-Freigabe und echten Feed-Daten. | Ehrlicher leerer Zustand bleibt erhalten; Affiliate-Launch bleibt blockiert. |
| P2-01 | P2 | Luftentfeuchter-Rechner validiert still und bietet bei Ladefehler keinen Retry | ✅ **YES** | Mittel | Bestätigt: der finale `safeParse` beendet die Aktion ohne Erklärung; der Fehlerzustand hat keinen Wiederholungsweg. Feldfehler, Fokusführung, verständliche Sammelmeldung und Retry werden ergänzt. | Nutzer können Fehler beheben und vorübergehende Katalogfehler selbst erneut laden. |
| P2-02 | P2 | Integer-/Cross-Field-Schemafehler werden nicht zuverlässig an Felder gehängt | ⚠️ **YES BUT MODIFY** | Mittel | Teilweise bestätigt. Eine Komplettumstellung aller Rechner in einem Refactor wäre unnötig riskant. Es wird eine kleine gemeinsame Issue-Zuordnung eingeführt und zunächst in den drei nachweislich betroffenen Hauptflüssen genutzt; fachliche Cross-Field-Regeln werden mit konkretem Pfad versehen. | Konsistente Fehlerbasis ohne Umbau der gesamten Rechnerarchitektur. |
| P2-03 | P2 | Planner-UI und Validierungslogik sind dupliziert | ⚠️ **YES BUT MODIFY** | Mittel | Bestätigt, aber ein universeller Wizard/Field-Renderer würde viele stabile Rechner gleichzeitig verändern. Nur die sichere, reine Fehlerzuordnung und Fokuslogik wird geteilt; kein großflächiger Komponentenumbau. | Weniger Fehlerduplikation bei geringem Regressionsrisiko. |
| P2-04 | P2 | Fokusfarbe `#83baf5` erreicht auf hellen Flächen nicht überall 3:1 | ✅ **YES** | Niedrig | Der einzelne hellblaue Ring ist tatsächlich kontextabhängig zu schwach. Ein zweifarbiger heller/dunkelgrüner Fokusindikator wird global und für Input-Wrapper verwendet. | Fokus bleibt auf hellen und dunklen Flächen gut erkennbar. |
| P2-05 | P2 | Keine automatisierten Komponenten-, E2E- oder A11y-Tests | ⚠️ **YES BUT MODIFY** | Mittel | Bestätigt. Eine neue Browser-Test-Abhängigkeit nur für diesen Sprint widerspricht dem Änderungsrahmen. Stattdessen werden reine Regressionstests für neue Validierungs-/Cachegrenzen, bestehende Tests, statischer Audit, Build und manuelle responsive Browser-QA genutzt. Eine echte E2E-Suite bleibt eigener Entwicklungsschritt. | Sofortige Regressionserkennung ohne neuen Tooling-Stack; E2E-Lücke bleibt transparent. |
| P2-06 | P2 | Geplanter Feed-Sync schreibt direkt nach `main`, prüft unvollständig und kann bei fehlendem Secret grün wirken | ⚠️ **YES BUT MODIFY** | Mittel | Bestätigt. Der Workflow bekommt die vollständige vorhandene Verify-Kette und eine klare Job-Zusammenfassung bei deaktiviertem Feed. Ein Wechsel auf PRs/Branch-Protection braucht eine Repository-Entscheidung und wird nicht automatisch erzwungen. | Weniger ungeprüfte Feed-Commits; deaktivierter Sync ist sichtbar. |
| P2-07 | P2 | Feed-Download hat keine Zeit-, Redirect-Host- oder Mengenlimits | ⚠️ **YES BUT MODIFY** | Mittel | Timeout und tatsächliche Byte-/Zeilenlimits sind sicher ergänzbar. Eine starre Redirect-Host-Allowlist könnte legitime Awin-CDNs blockieren und wird erst mit einem echten Feed festgelegt. Grenzen werden konfigurierbar und defensiv gewählt. | Hängende oder extrem große Downloads werden begrenzt; CDN-Entscheidung bleibt offen. |
| P2-08 | P2 | Fehler bei Session-Persistenz sowie gespeicherter Schritt/Verlauf bleiben unsichtbar | ⚠️ **YES BUT MODIFY** | Niedrig | Schreibfehler werden intern bereits abgefangen; eine neue globale Warnungs- und Verlaufs-UX ist eine Produktentscheidung und müsste alle Rechner betreffen. In diesem Sprint keine halbe UI-Lösung. Separat mit gewünschter Wiederaufnahme-Logik spezifizieren. | Kein unnötiger UI-Umbau; bekannte Komfortlücke bleibt dokumentiert. |
| P2-09 | P2 | Katalog-Requests nutzen `no-store` und haben keine In-Flight-Deduplizierung | ✅ **YES** | Niedrig | Bestätigt. Die statischen JSON-Kataloge können gecacht werden; parallele gleiche Aufrufe teilen künftig ein Promise, das bei Fehler zurückgesetzt wird. | Weniger doppelte Requests und stabileres Laden. |
| P2-10 | P2 | Zukünftige Remote-Produktbilder können Datenschutz-/Tracking-Risiken erzeugen | 🛑 **DANGEROUS** | Hoch | Der aktuelle Katalog ist leer; es gibt noch keine konkrete Bildquelle. Eine Remote-Allowlist oder Proxy-Architektur ohne Awin-Daten wäre geraten. Vor Aktivierung Entscheidung für Self-Hosting/Proxy und zulässige Hosts treffen. | Verhindert vorschnelle Drittanbieter-Requests; bleibt Affiliate-Launch-Aufgabe. |
| P3-01 | P3 | Fortschrittsanzeige hat keine `progressbar`-Semantik | ✅ **YES** | Niedrig | Bestätigt und ohne Layoutwirkung korrigierbar: Rolle plus `aria-valuemin`, `aria-valuemax` und `aria-valuenow`. | Screenreader erhalten den tatsächlichen Fortschritt. |
| P3-02 | P3 | Dekorative Legacy-Glyphen werden teilweise vorgelesen | ✅ **YES** | Niedrig | Bestätigt in den älteren Rechnern. Rein dekorative Zeichen erhalten `aria-hidden="true"`. | Weniger störende Screenreader-Ausgaben. |
| P3-03 | P3 | Gartenhaus fokussiert einen äußeren Container statt der gemeinsamen Überschrift | ✅ **YES** | Niedrig | Bestätigt. Der zusätzliche Fokus-Container wird entfernt; die vorhandene fokussierbare Überschrift des `CalculatorShell` bleibt die einzige Schritt-Fokusgrenze. | Klarere Fokusreihenfolge und weniger unnötige Stopps. |
| P3-04 | P3 | Mobile Navigation versteckt Garten/Gartenhaus | ❌ **NO** | Niedrig | Die mobile Navigation bietet weiterhin den zentralen Einstieg „Alle Planer“. Ob zusätzliche Direktlinks wichtiger sind als Platz und Übersicht ist subjektiv und kein bestätigter Funktionsfehler. Keine Änderung ohne Navigationsentscheidung. | Verhindert überfüllte mobile Navigation. |
| P3-05 | P3 | Planner-Verzeichnis nutzt Karten-`h2` unter einer Abschnitts-`h2` | ✅ **YES** | Niedrig | Bestätigt. Kartentitel werden semantisch zu `h3`, Styling bleibt unverändert. | Sauberere Überschriftenhierarchie für Screenreader und Suchmaschinen. |
| P3-06 | P3 | Metadaten-Daten sind zentral und nicht seitenindividuell | ⚠️ **YES BUT MODIFY** | Niedrig | Technisch bestätigt, aber zentrale Aktualisierung ist aktuell konsistent und nicht fehlerhaft. Seitenindividuelle Änderungsdaten brauchen einen redaktionellen Prozess; keine erfundenen Datumswerte. | Vermeidet falsche Aktualitätsangaben; Content-Workflow bleibt nächste SEO-Aufgabe. |
| P3-07 | P3 | GitHub Actions sind auf Major-Tags statt Commit-SHAs gepinnt | ⚠️ **YES BUT MODIFY** | Mittel | Supply-Chain-Härtung ist sinnvoll, aber unbekannte SHAs dürfen nicht geraten werden. Dependabot ist vorhanden. SHA-Pinning wird separat mit verifizierten Hersteller-SHAs und Update-Prozess durchgeführt. | Keine kaputten Actions durch unbestätigte Hashes; Härtung bleibt offen. |
| P3-08 | P3 | Kein eigener Lint-/Format-Workflow | ⚠️ **YES BUT MODIFY** | Niedrig | Es gibt Typecheck, Tests, statischen Audit und Build; Next.js 16 bringt keinen eingebauten `next lint`-Pfad mehr mit. Neue ESLint-/Formatter-Abhängigkeiten würden für diesen Fix-Sprint unverhältnismäßig viel Konfiguration erzeugen. Separat einführen. | Vermeidet Tooling-Churn; Stilprüfung bleibt klar benannte Lücke. |

## Umsetzungskategorien

### Sicher in diesem Sprint umsetzen

- P1-01, P1-02, P1-03
- P2-01, P2-04, P2-09
- P3-01, P3-02, P3-03, P3-05

### In begrenzter, angepasster Form umsetzen

- P1-04: strikte Readiness-Modi ergänzen, aber Preview nicht blockieren
- P2-02/P2-03: kleine gemeinsame Validierungs-/Fokushilfe statt Wizard-Refactor
- P2-05: gezielte Regressionstests plus vollständige Verify- und Browser-QA statt neuer E2E-Abhängigkeit
- P2-06: vollständige Verify-Kette und sichtbarer Skip; PR-Zwang bleibt offen
- P2-07: Timeout und Mengenlimits; Redirect-Allowlist erst mit echtem Awin-Feed

### Nicht in diesem Sprint umsetzen

- P2-08: Persistenz-/Verlaufs-UX braucht eine produktweite Spezifikation
- P3-04: kein bestätigter Navigationsfehler
- P3-06: keine erfundenen seitenindividuellen Änderungsdaten
- P3-07: keine unbestätigten Action-SHAs
- P3-08: kein neuer Lint-/Formatter-Stack im Fix-Sprint

### Menschliche Entscheidung oder externe Daten erforderlich

- P1-05: echte öffentliche Kontakt-E-Mail und rechtliche Freigabe
- P1-06: Awin-Zulassung, Advertiser und echte Produktfeeds
- P2-10: Produktbild-Hosting/Proxy und Datenschutzentscheidung
- P2-06 (Rest): Branch-Protection und Feed-Updates per Pull Request
- P2-07 (Rest): zulässige Redirect-/CDN-Hosts anhand eines echten Awin-Feeds

## Nicht verhandelbare Release-Grenzen

Die aktuelle Website kann als technische Vorschau betrieben werden. Für einen beworbenen öffentlichen Launch müssen mindestens Kontakt-/Rechtsangaben final freigegeben sein. Für einen Affiliate-Launch müssen zusätzlich echte Kataloge, funktionierende Links, Feed-Monitoring sowie die Bild-/Tracking-Entscheidung abgeschlossen sein.
