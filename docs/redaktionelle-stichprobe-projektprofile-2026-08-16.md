# Redaktionelle Stichprobe der Projektprofile

Stand: 16. August 2026

## Umfang und Prüfkriterien

Geprüft wurden 30 Profile: je drei Profile aus allen zehn Themenbereichen. Die Auswahl deckt jeweils einen kleinen, mittleren und großen Ausgangswert sowie drei unterschiedliche Nutzungsszenarien ab.

Kontrolliert wurden:

- sprachlich eindeutiger Titel und eindeutige Suchintention,
- korrekte deutsche Einheiten und Zahlenformatierung,
- rechnerische Konsistenz zwischen Eingabe, Rechenweg, Tabelle und Ergebnis,
- klare Trennung von Rechenannahme, Herstellerangabe und fachlicher Prüfung,
- passender Szenariokontext statt bloßem Keyword-Tausch,
- sichtbare Quelle, Checkliste, FAQ, Gegenprobe und interne Weiterführung,
- keine unbelegten Produkt-, Preis- oder Testsiegerbehauptungen.

## Geprüfte Profile

| Themenbereich | Kleines Profil | Mittleres Profil | Großes Profil | Ergebnis |
|---|---|---|---|---|
| Gartenhaus | 1,5 × 2 m · Geräte | 3 × 3,5 m · Werkstatt | 5 × 6 m · gemischte Lagerung | bestanden |
| Mähroboter | 100 m² · offene Fläche | 750 m² · enge Passagen | 5.000 m² · getrennte Zonen | bestanden |
| Terrasse | 10 m² · Holz gerade | 60 m² · Holz diagonal | 200 m² · WPC verwinkelt | bestanden |
| Bewässerung | 50 m² · Rasen | 400 m² · Hecke | 2.000 m² · Gefälle | bestanden nach Korrektur |
| Gewächshaus | 1,5 × 2 m · Tomaten | 3 × 3,5 m · Paprika und Chili | 5 × 6 m · Anzucht und Regale | bestanden nach Korrektur |
| Sichtschutz | 3 m · 1,80-m-Elemente | 15 m · 90-cm-Elemente | 50 m · WPC-System | bestanden nach Korrektur |
| Carport | Fahrzeug 1,7 × 4 m · kompakt | Fahrzeug 1,95 × 5 m · Wandseite | Fahrzeug 2,2 × 6 m · Familie | bestanden nach Korrektur |
| Bodenbelag | 10 m² · Laminat gerade | 60 m² · Vinyl gerade | 200 m² · verwinkelt | bestanden |
| Trockenbau | 2 × 2,5 m · einlagig | 6 × 2,5 m · doppellagig mit Tür | 6 × 3 m · Installationen | bestanden |
| Luftentfeuchter | 10 m² · Wohnraum | 60 m² · Wäschetrocknung | 200 m² · Lagerraum | bestanden |

## Gefundene und behobene Punkte

1. **Gewächshaus:** Eine interne Begrenzung der Wegfläche konnte vom sichtbar ausgeschriebenen Rechenweg abweichen. Die Begrenzung wurde entfernt; Wegbreite × Gewächshauslänge und Ergebnis stimmen jetzt exakt überein.
2. **Sichtschutz:** Eine Montagebreite von 1,75 m wurde sichtbar auf 1,8 m gerundet. Montagebreite und Restmaß werden nun mit bis zu zwei Dezimalstellen ausgegeben.
3. **Carport:** Fahrzeugbreiten und seitliche Bedienräume wurden zu grob auf eine Dezimalstelle gerundet. Außerdem konnte der Titel wie ein Carport-Außenmaß gelesen werden. Die exakten Fahrzeugmaße bleiben nun sichtbar und der Titel benennt ausdrücklich das Fahrzeug.
4. **Bewässerung:** Aus der Gesamtdauer abgeleitete Zeitabschnitte wurden als Zonen bezeichnet. Da echte Zonen hydraulisch dimensioniert werden müssen, heißen diese Werte nun korrekt „Zeitblöcke“.

Für alle vier Korrekturen existieren Regressionstests in `lib/project-examples.test.ts`.

## Freigabeergebnis

Nach den Korrekturen bestehen alle 30 Stichproben die redaktionellen Kriterien. Der automatisierte Gesamtaudit bestätigt weiterhin 850 eindeutige Profile mit mindestens 978 Wörtern, sichtbarer Rechenkette, Quellen, Gegenprobe, Checkliste und FAQ.

Die Stichprobe ist eine redaktionelle Qualitätssicherung, aber keine statische, rechtliche, bauphysikalische oder produktspezifische Fachfreigabe. Diese Grenzen bleiben auf den jeweiligen Seiten sichtbar.

