# Exploratory Functional QA – MachPlan

Datum: 13. August 2026  
Prüfziel: lokale Arbeitsversion unter `http://127.0.0.1:4230/`  
Browser: Codex In-App Browser, Desktop-Viewport und 390 × 844 px  
Methode: freie Exploration, danach unabhängige Reproduktion verdächtiger Zustände

## Ergebnis

- 7 bestätigte funktionale Issues
- 2 × hoch, 3 × mittel, 2 × niedrig
- Alle zehn Rechner lassen sich mit gültigen Standardwerten bis zum Ergebnis durchlaufen.
- Keine Runtime-Overlays, kaputten Bilder oder funktionalen Console-Fehler festgestellt.
- Session-Persistenz, Zurücksetzen, Bereichsfilter, abhängige Checkboxen und leere Produktkataloge funktionieren im Normalfall.

## Retest nach der Behebung

Status: **Alle sieben bestätigten Issues behoben.**

| Issue | Retest-Ergebnis |
| --- | --- |
| MP-QA-001 | Ungültige Felder auf späteren Schritten öffnen jetzt automatisch den betroffenen Schritt und erhalten den Fokus. |
| MP-QA-002 | Zu kleine Gartenhaus-Stellflächen werden in Schritt 4 gewarnt und im Ergebnis als blockierender Konflikt statt als fertiger Plan dargestellt. |
| MP-QA-003 | Ein gemeinsamer Übergangsschutz verhindert das Überspringen von Schritten bei Doppelklicks in allen zehn Rechnern; repräsentativ im Trockenbau- und Terrassenrechner erneut im Browser bestätigt. |
| MP-QA-004 | Querfeldfehler werden nach jeder relevanten Eingabe neu ausgewertet und verschwinden einschließlich `aria-invalid`, sobald der Konflikt behoben ist. |
| MP-QA-005 | Bei drei Nullwerten erklärt der Bewässerungsplaner jetzt konkret, dass mindestens eine Rasen-, Beet- oder Heckenfläche erforderlich ist. |
| MP-QA-006 | Neue Bereiche verwenden die höchste vorhandene Nummer plus eins; nach dem Entfernen von „Raum 2“ entstehen beispielsweise „Raum 1“, „Raum 3“ und „Raum 4“. |
| MP-QA-007 | Der Filter steht im Query-Parameter `bereich` und bleibt nach Öffnen eines Rechners und Browser-Zurück erhalten. |

Beim Retest wurde außerdem ein Randfall gefunden und direkt behoben: Eine extrem frühe Eingabe direkt nach dem Laden konnte zuvor noch vom verzögert gelesenen Session-Stand überschrieben werden. Benutzeränderungen vor Abschluss der Hydration haben nun Vorrang.

Abschlussprüfung: `npm run verify` erfolgreich; 159 Tests, TypeScript, Produktionsbuild mit 62 statischen Routen, Prüfung der Launch-Artefakte und statischer Site-Audit mit 58 Seiten bestanden.

## MP-QA-001 – Unsichtbare ungültige Folgeschritte blockieren den Wizard

Schweregrad: **Hoch**  
URLs:

- `/garten/bewaesserungs-planer/`
- `/garten/gartenhaus-planer/`
- `/haus/raumklima/luftentfeuchter-rechner/`

Vorbedingung: Rechner auf Standardwerte zurücksetzen.

Reproduktion am Bewässerungsplaner:

1. Auf Schritt 2 wechseln.
2. Bei „Gemessener Durchfluss“ `0` eingeben.
3. „Weiter“ klicken; die sichtbare Feldmeldung erscheint korrekt.
4. Mit „Zurück“ auf Schritt 1 wechseln.
5. Auf Schritt 1 erneut „Weiter“ klicken.

Erwartet: Der Rechner wechselt zu Schritt 2 und fokussiert den ungültigen Durchfluss oder validiert nur die Felder des aktuellen Schritts.

Tatsächlich: Schritt 1 bleibt sichtbar. Es erscheint nur „Bitte prüfe die markierten Eingaben“, obwohl auf diesem Schritt kein Feld markiert ist. Fokus kann nicht auf das unsichtbare Feld gesetzt werden. Der Nutzer kann nur zurücksetzen oder den unsichtbaren Fehler erraten.

Unabhängig reproduziert: zweimal im Bewässerungsplaner sowie mit ungültiger Fahrradanzahl im Gartenhaus-Planer und ungültigem Budget im Luftentfeuchter-Rechner.

Screenshot: [issue-07-hidden-invalid-field-traps-wizard.png](./issue-07-hidden-invalid-field-traps-wizard.png)  
Console: keine Fehler  
Netzwerk: keine Fehlschläge beobachtet

## MP-QA-002 – Gartenhaus-Planer meldet unmögliche Stellfläche als fertigen Planungsrahmen

Schweregrad: **Hoch**  
URL: `/garten/gartenhaus-planer/`

Vorbedingung: Rechner zurücksetzen.

Reproduktion:

1. Breite `150 cm` und Tiefe `150 cm` eingeben.
2. Alle weiteren Schritte mit den gültigen Standardwerten abschließen.
3. Ergebnis betrachten.

Erwartet: Ein klarer Hinweis, dass die verfügbare Stellfläche von 2,25 m² kleiner als der berechnete Mindestbedarf von 6 m² ist und kein passender Plan möglich ist.

Tatsächlich: Der Ergebnisbildschirm nennt gleichzeitig „Mindestfläche 6 m²“ und „Stellfläche 1,5 × 1,5 m“, erklärt den Planungsrahmen aber als fertig. Es gibt keine Inkompatibilitätswarnung. Bei leerem Produktkatalog wird das Problem auch nicht später sichtbar.

Unabhängig reproduziert mit `150 × 150 cm` und `160 × 150 cm`.

Screenshot: [issue-06-gardenhouse-insufficient-space-unreported.png](./issue-06-gardenhouse-insufficient-space-unreported.png)  
Console: keine Fehler  
Netzwerk: Produktkatalog wurde ohne sichtbaren Ladefehler als absichtlich leer dargestellt

## MP-QA-003 – Doppelklick auf „Weiter“ überspringt einen kompletten Schritt

Schweregrad: **Mittel**  
Betroffene URLs: repräsentativ bestätigt in fünf Rechnern, darunter Gartenhaus, Luftentfeuchter, Bewässerung, Terrasse und Carport.

Vorbedingung: Rechner auf Schritt 1 mit gültigen Standardwerten.

Reproduktion:

1. „Weiter“ schnell doppelklicken.

Erwartet: Eine Benutzeraktion führt höchstens zu Schritt 2.

Tatsächlich: Zwei React-State-Aktualisierungen werden ausgeführt und der Rechner landet direkt auf Schritt 3. Schritt 2 wird ohne Ansicht oder bewusste Bestätigung übersprungen.

Screenshot: [issue-04-double-click-skips-step.png](./issue-04-double-click-skips-step.png)  
Console: keine Fehler  
Netzwerk: nicht relevant

## MP-QA-004 – Behobene Querfeldfehler bleiben sichtbar und als ungültig markiert

Schweregrad: **Mittel**  
URLs:

- `/haus/innenausbau/trockenbau-rechner/`
- `/garten/gewaechshaus-planer/`

Reproduktion am Trockenbau-Rechner:

1. Wandlänge `1 m`, Wandhöhe `1,8 m` und Öffnungsfläche `2 m²` verwenden.
2. „Weiter“ klicken. Die Öffnungsfläche wird korrekt als zu groß markiert.
3. Wandlänge auf `3 m` erhöhen.

Erwartet: Da die Öffnungsfläche nun kleiner als die Wandfläche ist, verschwindet der Fehler sofort.

Tatsächlich: Die Live-Berechnung zeigt korrekt 3,4 m² Nettofläche, aber die alte Fehlermeldung bleibt sichtbar und `aria-invalid` bleibt gesetzt. Erst eine weitere Validierungsaktion bereinigt den Zustand.

Unabhängig bestätigt, indem im Gewächshaus nach einem Breitenkonflikt auf „Töpfe und Tische“ gewechselt wurde; die nicht mehr zutreffende Beet-/Wegmeldung blieb bestehen.

Screenshot: [issue-03-stale-cross-field-error.png](./issue-03-stale-cross-field-error.png)  
Console: keine Fehler  
Netzwerk: nicht relevant

## MP-QA-005 – Bewässerungsplaner erklärt einen erlaubten Wert als ungültig

Schweregrad: **Mittel**  
URL: `/garten/bewaesserungs-planer/`

Reproduktion:

1. Rasenfläche, Beetfläche und Heckenlänge jeweils auf `0` setzen.
2. „Weiter“ klicken.

Erwartet: Die Meldung erklärt, dass mindestens eine der drei Angaben größer als 0 sein muss.

Tatsächlich: Am Feld Rasenfläche erscheint „Bitte einen Wert zwischen 0 und 10.000 eingeben“, obwohl dort bereits der laut Meldung erlaubte Wert `0` steht. Die eigentliche Kombinationsregel bleibt unsichtbar.

Screenshot: [issue-05-irrigation-zero-error-copy.png](./issue-05-irrigation-zero-error-copy.png)  
Console: keine Fehler  
Netzwerk: nicht relevant

## MP-QA-006 – Entfernen und erneutes Hinzufügen erzeugt doppelte Flächennamen

Schweregrad: **Niedrig**  
URLs:

- `/haus/boden/bodenbelag-rechner/`
- `/garten/maehroboter-rechner/`

Reproduktion am Bodenbelag-Rechner:

1. Mehrere Teilflächen hinzufügen.
2. Eine mittlere Teilfläche entfernen.
3. Erneut eine Teilfläche hinzufügen.

Erwartet: Ein eindeutiger neuer Standardname oder eine Neuindizierung.

Tatsächlich: Die neue Teilfläche erhält den Namen anhand der aktuellen Array-Länge. Dadurch entstehen beispielsweise zwei „Raum 8“ inklusive identischer zugänglicher Entfernen-Beschriftung.

Unabhängig im Mähroboter-Rechner bestätigt: zwei „Rasenfläche 4“.

Screenshots:

- [issue-01-flooring-duplicate-room-names.png](./issue-01-flooring-duplicate-room-names.png)
- [issue-01-mower-duplicate-area-names.png](./issue-01-mower-duplicate-area-names.png)

Console: keine Fehler  
Netzwerk: nicht relevant

## MP-QA-007 – Bereichsfilter geht bei Browser-Zurück verloren

Schweregrad: **Niedrig**  
URL: `/rechner/`

Reproduktion:

1. „Garten 7“ oder „Haus 3“ auswählen.
2. Einen sichtbaren Rechner öffnen.
3. Browser-Zurück verwenden.

Erwartet: Die vorherige Auswahl und Ergebnisliste werden wiederhergestellt.

Tatsächlich: Die Seite kehrt immer auf „Alle 10“ zurück. Der Navigationskontext des Nutzers geht verloren.

Unabhängig mit den Filtern „Haus“ und „Garten“ bestätigt.

Screenshot: [issue-02-filter-state-lost-after-back.png](./issue-02-filter-state-lost-after-back.png)  
Console: keine Fehler  
Netzwerk: nicht relevant

## Weitere Beobachtungen

- Der lokale Next.js-Entwicklungsmodus meldet wiederholt eine Warnung zu `scroll-behavior: smooth` und dem fehlenden `data-scroll-behavior="smooth"` am HTML-Element. Es wurde kein daraus resultierender Funktionsausfall bestätigt.
- Der native Druckdialog wurde angestoßen; die Anwendung blieb danach ansprechbar. Inhalt und Layout des Betriebssystem-Dialogs benötigen eine manuelle Endkontrolle.
- Auf 390 px traten in Rechnerübersicht, dynamischen Teilflächen und repräsentativen Wizards keine horizontalen Überläufe auf.
- Die absichtlich leeren Produktkataloge zeigen verständliche Leerzustände und keine erfundenen Empfehlungen.

## Empfohlene Behebungsreihenfolge

1. MP-QA-001 – Schrittübergreifende Validierung der drei älteren Rechner vereinheitlichen.
2. MP-QA-002 – Stellflächenbedarf gegen verfügbare Fläche prüfen und Ergebnisstatus anpassen.
3. MP-QA-003 – Weiter-/Ergebnisaktionen während der Zustandsänderung gegen Mehrfachauslösung sperren.
4. MP-QA-004 und MP-QA-005 – Querabhängige Fehler neu berechnen und Schema-Meldungen unverändert am Feld anzeigen.
5. MP-QA-006 – stabile fortlaufende Namen oder UUID-basierte Anzeigenamen verwenden.
6. MP-QA-007 – Filter im URL-Query oder in der History speichern.
