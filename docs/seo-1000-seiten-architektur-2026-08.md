# PassendPlanen: 1.000-Seiten-Architektur

Stand: 16. August 2026

## Ergebnis

Die statische Website umfasst nach diesem Sprint 1.000 indexierbare URLs:

- 140 bestehende Seiten aus Rechnern, Ratgebern, Themen-Hubs und Vertrauensseiten
- 10 neue Projektverzeichnisse
- 850 neue Projektprofile, jeweils 85 für zehn Rechner-Themen

Die 850 Profile bilden je Themenbereich eine Matrix aus 17 echten Größen- oder Flächenprofilen und fünf Nutzungsvarianten. Eine URL entsteht nur, wenn sich Recheneingabe, Ergebnis und Prüfkontext eindeutig unterscheiden.

## Warum keine Orts- oder Worttausch-Seiten

PassendPlanen erzeugt keine Seiten wie „Rechner Berlin“, „Rechner Hamburg“ oder nahezu identische „Top 10“-Listen ohne lokale beziehungsweise aktuelle Datengrundlage. Solche Seiten hätten keinen eigenständigen Nutzwert und könnten als Doorway- oder skalierter Suchmaschineninhalt eingeordnet werden.

Die Projektprofile beantworten stattdessen konkrete Fragen, zum Beispiel:

- Welche freie Innenfläche bleibt bei einem Gartenhaus-Maß und einer bestimmten Nutzung?
- Welcher Nennflächen-Rahmen entsteht für einen Mähroboter bei Fläche und Gartenkomplexität?
- Wie verändern Material, Verlegerichtung und Geometrie die Terrassen-Bestellmenge?
- Wie viele Sichtschutzfelder und Pfosten entstehen aus Strecke und realer Montagebreite?
- Wie wird Raumfläche bei einem Luftentfeuchter in einen transparenten Volumenrahmen übersetzt?

## Pflichtbestandteile jeder Profilseite

Jede Seite enthält:

1. eine eindeutig benannte Eingabe mit deutschen Maßeinheiten,
2. einen sichtbaren und nachrechenbaren Rechenweg,
3. ein Ergebnis und eine alternative Annahme als Gegenprobe,
4. mindestens vier inhaltliche Abschnitte,
5. eine Vergleichstabelle,
6. eine siebenstufige Projekt-Checkliste,
7. vier konkrete FAQ,
8. mindestens eine sichtbare Primär- oder Fachquelle,
9. die Grenzen der Rechnung,
10. interne Links zu Projektverzeichnis, Themen-Hub, Rechner und Methodik.

Der automatisierte Qualitätscheck verlangt mindestens 900 Wörter je Profil. Der aktuelle kleinste Wert liegt oberhalb dieser Grenze. Titel, Meta-Descriptions, Slugs und Rechen-Signaturen müssen über alle 850 Profile eindeutig sein.

## Technische Veröffentlichungssicherung

Vor einer Veröffentlichung müssen folgende Befehle erfolgreich sein:

```bash
npm run audit:projects
npm run verify
```

Der vollständige Verify-Lauf prüft Daten, Tests, TypeScript, Projektprofile, statischen Build, Exportdateien, Canonicals, strukturierte Daten, interne Links, Sitemap, Robots und `llms.txt`.

## Nach dem Launch beobachten

1. Sitemap in Google Search Console neu einreichen.
2. Indexierung, Crawling und Canonical-Auswahl pro Verzeichnis beobachten.
3. Seiten mit Impressionen, aber schwacher Klickrate anhand realer Suchanfragen verbessern.
4. Seiten ohne Impressionen nicht blind vermehren, sondern Suchintention, interne Links und Eigenständigkeit prüfen.
5. Produktvergleiche erst mit aktuellen, belegbaren Händler- und Produktdaten veröffentlichen.

## Ausbau vom 20. August 2026

Die erste Architektur wurde um 1.000 indexierbare Direktvergleiche erweitert. Sie vergleichen keine ungeprüften Einzelprodukte, sondern fünf reale Lösungswege je Themenbereich in zehn konkreten Nutzungskontexten. Aus zehn Zweierpaaren und zehn Kontexten entstehen 100 Seiten je Themenwelt.

Jede neue Seite enthält mindestens 1.000 Wörter, acht Langform-Abschnitte, eine gewichtete Fünf-Kriterien-Matrix, Gegenprobe, neun Prüfschritte, fünf FAQ, Quellen und fünf interne Weiterführungen. Die vollständige Keyword- und Intent-Struktur steht in `docs/seo-vergleichscluster-2026-08.md`.

Nach dem Ausbau umfasst der statische Build 2.011 indexierbare Seiten. Die neue Bibliothek liegt unter `/ratgeber/vergleiche/` und wird vollständig über Themen-Hubs, Ratgeber-Hub und Sitemap erschlossen.
