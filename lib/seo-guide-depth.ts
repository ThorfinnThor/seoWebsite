import type { GuideComparison, GuideFaq, GuideRelatedLink } from "@/components/seo/GuidePage";
import { SEO_GUIDE_DEPTH_WAVE2 } from "@/lib/seo-guide-depth-wave2";

export type SeoGuideDepth = {
  comparison: GuideComparison;
  checklist: string[];
  faqs: GuideFaq[];
  relatedLinks: GuideRelatedLink[];
};

const SEO_GUIDE_DEPTH_INITIAL: Record<string, SeoGuideDepth> = {
  "gartenhaus-holz-oder-metall": {
    comparison: {
      caption: "Holz- und Metallgartenhaus nach Projektanforderung",
      columns: ["Kriterium", "Holz", "Metall"],
      rows: [
        ["Pflege", "Oberfläche regelmäßig kontrollieren; je nach System reinigen, lasieren oder streichen.", "Beschichtung und Schnittkanten kontrollieren; meist weniger regelmäßige Oberflächenpflege."],
        ["Innenklima", "Material wirkt wohnlicher, benötigt aber Abstand zu Feuchte und eine gute Unterlüftung.", "Temperaturwechsel und Kondensat können deutlicher ausfallen; Lüftung und Bodenanschluss prüfen."],
        ["Anpassungen", "Regale, Haken und kleine Umbauten sind häufig einfacher umzusetzen.", "Bohrungen und Umbauten können Korrosionsschutz und Statik des Systems beeinflussen."],
        ["Montage", "Bauteile sind oft schwerer; Ausrichtung und Schutz vor Bodenfeuchte sind entscheidend.", "Viele Einzelteile und Verschraubungen; ein exakt ebenes Fundament erleichtert die Montage."],
        ["Typische Nutzung", "Werkstatt, Aufenthaltsnähe, sichtbarer Teil der Gartengestaltung.", "Geräte, Mülltonnen, Fahrräder oder sachliches Lager mit geringem Pflegewunsch."],
        ["Wichtigster Datenpunkt", "Wandaufbau, Holzschutz, Sockelmaß und Bodenpaket.", "Blechstärke, Beschichtung, Belüftung, Verankerung und Schneelastfreigabe."],
      ],
    },
    checklist: [
      "Alle Gegenstände mit realer Stellfläche, Griffen und benötigtem Bewegungsraum notieren.",
      "Innenmaß, Sockelmaß, Außenmaß und Dachüberstand getrennt aus dem Datenblatt übernehmen.",
      "Klären, ob Fahrräder oder Rasenmäher ohne Umräumen durch die Tür passen.",
      "Untergrund, Entwässerung, Fundament und konstruktiven Abstand zur Bodenfeuchte festlegen.",
      "Prüfen, wie das Haus gegen Wind verankert wird und welche Lastfreigaben der Hersteller nennt.",
      "Pflegeaufwand, Ersatzteile, Garantiebedingungen und spätere Reparierbarkeit vergleichen.",
    ],
    faqs: [
      { question: "Ist ein Metallgartenhaus grundsätzlich haltbarer als ein Holzhaus?", answer: "Nein. Haltbarkeit entsteht aus Materialqualität, Beschichtung oder Holzschutz, konstruktivem Feuchteschutz, Fundament, Verankerung und Wartung. Ein hochwertiges Holzhaus kann sehr lange funktionieren, während beschädigte Beschichtungen bei Metall Korrosion ermöglichen. Umgekehrt leidet Holz bei dauerhaftem Wasserkontakt. Vergleiche deshalb den kompletten Aufbau statt nur die Materialbezeichnung." },
      { question: "Welches Material eignet sich besser für Fahrräder?", answer: "Für Fahrräder zählen vor allem Türbreite, Schwellenhöhe, Innenmaß, Lüftung und Diebstahlschutz. Holz erlaubt häufig eine einfache Montage von Halterungen. Metall kann pflegearm sein, benötigt aber einen kontrollierten Umgang mit Kondensat. Beide Varianten sind geeignet, wenn Zugang, trockener Boden und Befestigungspunkte zum konkreten Fahrradbestand passen." },
      { question: "Wird ein Metallhaus im Sommer zu heiß?", answer: "Dünne Metallflächen können sich in direkter Sonne deutlich erwärmen. Wie stark das Innere aufheizt, hängt von Farbe, Dach, Lüftungsöffnungen, Schatten und Standort ab. Empfindliche Akkus, Farben oder Pflanzenschutzmittel gehören nicht ungeprüft in einen stark aufgeheizten Lagerraum. Prüfe die geplante Nutzung und sorge für sichere Lagerbedingungen." },
      { question: "Brauchen Holz- und Metallhäuser unterschiedliche Fundamente?", answer: "Das Fundament richtet sich nach System, Größe, Untergrund, Lasten und Herstellerfreigabe. Beide Materialien benötigen eine ebene, tragfähige und entwässerte Basis sowie eine geeignete Verankerung. Unterschiede entstehen eher beim Sockelanschluss, Feuchteschutz und Befestigungssystem als durch eine pauschale Regel Holz gegen Metall." },
    ],
    relatedLinks: [
      { label: "Gartenhaus-Größe bestimmen", href: "/garten/gartenhaus-groesse/", description: "Lagergut, Bewegungsfläche und Türbreite in eine Mindestfläche übersetzen." },
      { label: "Gartenhaus-Boden planen", href: "/garten/gartenhaus-boden/", description: "Bodenoption, Unterlüftung und Feuchteschutz vor der Auswahl klären." },
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Dein konkretes Projekt in nachvollziehbare Auswahlkriterien überführen." },
    ],
  },
  "gartenhaus-mit-boden-worauf-achten": {
    comparison: {
      caption: "Bodenvarianten für ein Gartenhaus",
      columns: ["Ausführung", "Stärken", "Prüfpunkte"],
      rows: [
        ["Mitgelieferter Holzboden", "Systemteile passen häufig gut zusammen und der Aufbau ist planbarer.", "Traglast, Feuchteschutz, Unterlüftung, Schwelle und tatsächlicher Lieferumfang."],
        ["Bodenrahmen plus Platten", "Aufbau kann an Nutzung und Lasten angepasst werden.", "Freigegebene Plattenart, Balkenabstand, Kantenversiegelung und Befestigung."],
        ["Betonplatte als Nutzboden", "Robuste, ebene Fläche für schwere Geräte und rollende Lasten.", "Feuchte, Oberfläche, Gefälle, Schwellenanschluss und Verankerung des Hauses."],
        ["Pflasterfläche", "Reparierbar und bei guter Ausführung entwässerungsfähig.", "Ebenheit, Setzungen, Randstabilität und zulässiger Anschluss des Haussystems."],
        ["Ohne geschlossenen Boden", "Direkter Zugang für robuste Geräte möglich.", "Spritzwasser, Staub, Schädlinge, Lagergut und sichere Befestigung."],
      ],
    },
    checklist: [
      "Im Lieferumfang prüfen, ob Bodenrahmen, Dielen oder Platten tatsächlich enthalten sind.",
      "Gewicht von Regalen, Werkbank, Fahrrädern und Maschinen einschließlich Punktlasten abschätzen.",
      "Schwellenhöhe und Türanschlag mit Rasenmäher, Schubkarre oder Fahrrad testen.",
      "Fundamentmaß und Bodenmaß anhand der Montageanleitung miteinander abgleichen.",
      "Unterlüftung, Spritzwasserschutz und Ableitung von Niederschlag sichtbar planen.",
      "Vor Montage klären, wo später schwere Regale oder Wandhalter befestigt werden dürfen.",
    ],
    faqs: [
      { question: "Ersetzt ein mitgelieferter Boden das Fundament?", answer: "In der Regel nicht. Der Boden bildet die begehbare Ebene im Haus, während das Fundament Lasten in den Untergrund überträgt, Setzungen begrenzt und die Verankerung ermöglicht. Welche Basis zulässig ist, steht in der Montage- und Fundamentanleitung des konkreten Modells. Ein Bodenpaket allein sagt nichts über den erforderlichen Unterbau aus." },
      { question: "Welche Bodenlösung ist für einen Rasenmäher sinnvoll?", answer: "Eine ebene, tragfähige und möglichst schwellenarme Lösung erleichtert das Ein- und Ausfahren. Bei schweren Aufsitzmähern sind zulässige Flächen- und Punktlasten besonders wichtig. Zusätzlich müssen Kraftstoff, Akkus und Wartungsmittel sicher gelagert werden. Produktgewicht und Radlast sollten vor der Bodenwahl dokumentiert werden." },
      { question: "Wie verhindere ich Feuchtigkeit unter einem Holzboden?", answer: "Hilfreich sind ein entwässerter Untergrund, Abstand zu Erdreich und Spritzwasser, eine funktionsfähige Unterlüftung sowie korrekt ausgeführte Anschlüsse. Eine wahllos eingelegte Folie kann Feuchte auch einschließen. Entscheidend ist der vollständige, vom System vorgesehene Aufbau und nicht ein einzelnes Zusatzmaterial." },
      { question: "Kann ich den Gartenhausboden später nachrüsten?", answer: "Das kann möglich sein, ist aber oft aufwendiger als eine Planung vor der Montage. Türhöhe, Sockel, Innenmaß und Befestigung ändern sich durch zusätzliche Schichten. Prüfe, ob der Hersteller eine Nachrüstung vorsieht und ob die Konstruktion ausreichend Tragfähigkeit und Feuchteschutz für den neuen Aufbau bietet." },
    ],
    relatedLinks: [
      { label: "Fundament auswählen", href: "/garten/gartenhaus-fundament/", description: "Untergrund und Hausgröße in einen belastbaren Fundamentrahmen übersetzen." },
      { label: "Gartenhaus für Fahrräder", href: "/garten/gartenhaus-fuer-fahrraeder/", description: "Tür, Schwelle und Bewegungsraum für die tägliche Nutzung prüfen." },
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Bodenoption zusammen mit Fläche, Zugang und Budget planen." },
    ],
  },
  "gartenhaus-kosten-vergleich": {
    comparison: {
      caption: "Kostenblöcke, die Angebote vergleichbar machen",
      columns: ["Kostenblock", "Im Angebot häufig enthalten", "Häufig zusätzlich"],
      rows: [
        ["Bausatz", "Wände, Dachbauteile, Tür und Verbindungsmittel in unterschiedlichem Umfang.", "Boden, Dachdeckung, Rinne, Farbschutz und Sonderbeschläge."],
        ["Fundament", "Selten Bestandteil des Hauspreises.", "Aushub, Frostschutzschicht, Beton, Pflaster, Träger und Entsorgung."],
        ["Lieferung", "Teilweise Bordsteinkante oder definierte Lieferzone.", "Kran, schwierige Zufahrt, Zwischenlagerung und Insel- oder Randgebietszuschlag."],
        ["Montage", "Nur bei ausdrücklich gebuchtem Montageservice.", "Vorbereitung, Anpassungen, Schutzanstrich, Elektroarbeiten und Abnahme."],
        ["Betrieb", "Keine laufenden Kosten im Kaufpreis.", "Pflege, Reparaturen, Versicherung, Strom und spätere Dacharbeiten."],
      ],
    },
    checklist: [
      "Für jedes Angebot dieselbe Zielgröße und denselben Nutzungsumfang zugrunde legen.",
      "Lieferumfang Zeile für Zeile mit Boden, Dachdeckung, Beschlägen und Befestigern prüfen.",
      "Fundament, Baustellenvorbereitung und Entsorgung separat mit realistischen Annahmen kalkulieren.",
      "Lieferart, Abladepunkt, Zufahrtsbreite und notwendige Helfer schriftlich klären.",
      "Montageleistung von Eigenleistung trennen und benötigte Werkzeuge oder Gerüste berücksichtigen.",
      "Eine Reserve für Anpassungen einplanen, ohne sie als versteckte Präzision auszugeben.",
    ],
    faqs: [
      { question: "Warum unterscheiden sich Gartenhauspreise bei gleicher Fläche so stark?", answer: "Wandaufbau, Holzart oder Beschichtung, Tür und Fenster, Dachsystem, Boden, Beschläge, Lastfreigaben, Lieferumfang und Service können sehr unterschiedlich sein. Auch Außenfläche und tatsächlich nutzbarer Innenraum sind nicht identisch. Ein belastbarer Vergleich normalisiert Ausstattung und Leistung, bevor der Gesamtpreis bewertet wird." },
      { question: "Wie viel Budgetreserve sollte ich einplanen?", answer: "Eine pauschale Prozentzahl wäre ohne Projektkenntnis irreführend. Lege stattdessen offene Kostenblöcke an: Fundament, Lieferung, Aufbau, Oberflächenschutz, Entwässerung, Genehmigungsprüfung und Gelände. Je mehr Positionen bereits als belastbares Angebot vorliegen, desto kleiner muss die Unsicherheitsreserve für genau diese Positionen sein." },
      { question: "Ist Selbstaufbau immer günstiger?", answer: "Nur wenn Zeit, Werkzeug, Helfer und fachliche Anforderungen realistisch berücksichtigt werden. Fehler bei Fundament, Ausrichtung, Dach oder Schutzanstrich können spätere Kosten verursachen. Vergleiche daher nicht nur Montagepreis gegen null Euro, sondern Montagepreis gegen den vollständigen Aufwand und das Risiko der Eigenleistung." },
      { question: "Kann ich Gartenhäuser über den Quadratmeterpreis vergleichen?", answer: "Der Quadratmeterpreis kann eine erste Orientierung liefern, ist aber allein ungeeignet. Kleine Häuser haben relativ hohe Kosten für Tür, Dachanschlüsse und Beschläge. Außerdem unterscheiden sich Innenfläche, Wandqualität, Boden und Lieferumfang. Nutze den Wert nur innerhalb einer Gruppe technisch und funktional vergleichbarer Modelle." },
    ],
    relatedLinks: [
      { label: "Gartenhaus-Kosten planen", href: "/garten/gartenhaus-kosten/", description: "Die Kostenblöcke eines konkreten Projekts vollständig erfassen." },
      { label: "Gartenhaus-Größe", href: "/garten/gartenhaus-groesse/", description: "Überdimensionierung vermeiden und aus der Nutzung eine Mindestfläche ableiten." },
      { label: "Fundament verstehen", href: "/garten/gartenhaus-fundament/", description: "Unterbau und Standort als eigenen Kostenblock früh klären." },
    ],
  },
  "maehroboter-ohne-begrenzungskabel": {
    comparison: {
      caption: "Navigationsprinzipien im Standortvergleich",
      columns: ["System", "Kann gut passen, wenn …", "Besonders prüfen"],
      rows: [
        ["Begrenzungskabel", "Grenzen dauerhaft feststehen und eine physische Installation akzeptabel ist.", "Kabelwege, Reparaturen, Passagen, Leitkabel und spätere Gartenänderungen."],
        ["RTK/GNSS", "Himmelssicht und Funkverbindung am Grundstück stabil planbar sind.", "Bäume, Gebäude, Abschattung, Referenzstation und Verhalten bei Signalverlust."],
        ["Kamera/Vision", "Grenzen visuell erkennbar sind und das Modell mit der konkreten Struktur umgehen kann.", "Lichtwechsel, flache Kanten, Laub, Tiere, Spielzeug und Datenschutzfunktionen."],
        ["LiDAR", "Umgebungsgeometrie eine robuste Kartierung ermöglicht.", "Sehr offene Bereiche, Veränderungen, Sensorhöhe, Verschmutzung und Modellgrenzen."],
        ["Hybridsystem", "Mehrere Sensorprinzipien sich am Standort sinnvoll ergänzen.", "Welche Funktion bei Störung übernimmt und welche Infrastruktur dennoch benötigt wird."],
      ],
    },
    checklist: [
      "Netto-Rasenfläche und alle getrennten Teilflächen auf einer Skizze markieren.",
      "Engste Passage an mehreren Punkten messen und Randabstände berücksichtigen.",
      "Bäume, hohe Hecken, Gebäude und überdachte Bereiche als mögliche Signalschatten dokumentieren.",
      "Steilste tatsächlich zu mähende Stelle einschließlich Übergang und Bodenart messen.",
      "Ladeplatz auf Strom, Zufahrt, Signal, Diebstahlschutz und Wasserablauf prüfen.",
      "Für jedes Modell nachlesen, was bei Signalverlust oder Kamerastörung geschieht.",
    ],
    faqs: [
      { question: "Ist ein Mähroboter ohne Kabel einfacher zu installieren?", answer: "Die körperliche Kabelverlegung entfällt, dafür entstehen digitale Kartierung, Signalprüfung, Zonenaufteilung und gegebenenfalls die Montage einer Referenzstation. Auf einer offenen, gut erreichbaren Fläche kann das einfacher sein. Bei Abschattung, komplexen Grenzen oder vielen Teilflächen kann die Einrichtung weiterhin anspruchsvoll werden." },
      { question: "Funktioniert RTK unter Bäumen?", answer: "Das hängt von Baumdichte, Kronen, Gebäuden, Antennenposition, Korrekturdaten und dem konkreten Gerät ab. Eine pauschale Zusage ist nicht seriös. Prüfe Herstellerbedingungen, Rückgabemöglichkeit und den realen Empfang an allen kritischen Stellen, besonders an Grenzen, zwischen Gebäuden und unter dichtem Blätterdach." },
      { question: "Erkennt eine Kamera Teiche und Beete sicher?", answer: "Eine Kamera kann sichtbare Strukturen erkennen, garantiert aber nicht unter allen Licht-, Wetter- und Vegetationsbedingungen eine sichere Grenze. Kritische Absturzstellen, öffentliche Wege und Wasserflächen benötigen die ausdrücklich vorgeschriebene Sicherung des jeweiligen Systems. Verlasse dich dort nicht ausschließlich auf eine allgemeine Werbeaussage zur Hinderniserkennung." },
      { question: "Kann ein kabelloser Mähroboter mehrere Rasenflächen mähen?", answer: "Viele Systeme unterstützen Zonen, aber die Verbindung zwischen den Flächen entscheidet. Der Roboter muss den Weg selbstständig und sicher befahren können, oder er wird manuell umgesetzt. Prüfe Passagen, Tore, öffentliche Wege, Stufen und die Frage, ob jede Zone eine erreichbare Ladeverbindung besitzt." },
    ],
    relatedLinks: [
      { label: "Kabel oder kabellos", href: "/garten/maehroboter-begrenzungskabel-kabellos/", description: "Installation, Änderungen und Standortbedingungen detailliert vergleichen." },
      { label: "Steigung und Engstellen", href: "/garten/maehroboter-steigung-engstellen/", description: "Die härtesten Stellen des Gartens korrekt messen und dokumentieren." },
      { label: "Mähroboter-Flächencheck", href: "/garten/maehroboter-rechner/", description: "Fläche, Gelände und Navigation in eine passende Geräteklasse übersetzen." },
    ],
  },
  "maehroboter-kleiner-garten": {
    comparison: {
      caption: "Kleine Rasenfläche nach Gartentyp bewerten",
      columns: ["Situation", "Wichtigstes Kriterium", "Typischer Fehler"],
      rows: [
        ["Offener Reihenhausrasen", "Leiser Betrieb, saubere Kanten und kompakter Ladeplatz.", "Nur nach maximaler Fläche kaufen und Nachbarschaft oder Kanten vergessen."],
        ["Viele Beete und Spielgeräte", "Hinderniserkennung, flexible Zonen und einfache temporäre Sperrflächen.", "Dauerhaft freie Testfläche annehmen, obwohl der Alltag ständig neue Hindernisse erzeugt."],
        ["Schmaler langer Garten", "Passagen, Wenden, systematische Navigation und Rückweg zur Station.", "Quadratmeter mit einer kompakten rechteckigen Fläche gleichsetzen."],
        ["Getrennte Miniflächen", "Transportweg, Nebenflächenfunktion oder manuelles Umsetzen.", "Nur die Gesamtfläche addieren und Verbindungen ignorieren."],
        ["Kleine Hangfläche", "Traktion, maximale Steigung und sichere Kanten am Gefälle.", "Durchschnittliche Neigung statt des steilsten Abschnitts messen."],
      ],
    },
    checklist: [
      "Nur echte Grasflächen addieren und Beete, Terrasse, Wege und feste Einbauten abziehen.",
      "Engstellen, Tore und Übergänge mit nutzbarer Fahrbreite statt lichter Öffnung dokumentieren.",
      "Kantenarten unterscheiden: ebener Übergang, Beet, Mauer, Stufe, Teich oder öffentlicher Weg.",
      "Lautstärke und geplante Mähzeiten zur Wohnsituation und Nachbarschaft passend auswählen.",
      "Einen erreichbaren, trockenen und diebstahlgeschützten Platz für die Ladestation vorsehen.",
      "Folgekosten für Messer, Reinigung, App, Winterlagerung und möglichen Service vergleichen.",
    ],
    faqs: [
      { question: "Lohnt sich ein Mähroboter bei weniger als 100 Quadratmetern?", answer: "Das ist keine reine Flächenfrage. Häufiges Mähen, körperliche Entlastung und ein geeigneter, klar begrenzter Rasen können dafür sprechen. Anschaffung, Ladeplatz, Wartung und Kanten-Nacharbeit bleiben aber fast unabhängig von der Fläche bestehen. Vergleiche den tatsächlichen Zeitgewinn mit Kosten und Komplexität deines kleinen Gartens." },
      { question: "Welche Flächenklasse sollte ich bei einem kleinen Garten wählen?", answer: "Nutze die Netto-Rasenfläche und ergänze eine nachvollziehbare Reserve für Hindernisse, Zonen und gewünschte Mähzeiten. Die Hersteller-Nennfläche ist unter bestimmten Bedingungen ermittelt und nicht automatisch die täglich komfortabel bearbeitete Fläche. Ein exakt auf die Quadratmeterzahl begrenztes Modell kann bei komplexem Aufbau unnötig lange laufen." },
      { question: "Braucht ein kleiner Garten Begrenzungskabel?", answer: "Nicht zwingend. Kabel, RTK, Kamera oder LiDAR können je nach Rand, Empfang und Gartenstruktur passen. Auf sehr kleinen Flächen können Installationsaufwand und Preis eines kabellosen Systems relativ hoch sein. Entscheidend sind sichere Grenzen, verlässliche Navigation und ein sinnvoller Ladeplatz, nicht die Größe allein." },
      { question: "Wie viel Rand bleibt bei einem Mähroboter stehen?", answer: "Das hängt von Gehäuse, Messerteller, Fahrstrategie und Kantenform des konkreten Modells ab. An einer ebenen, überfahrbaren Kante kann weniger Nacharbeit entstehen als an Mauer oder Hochbeet. Vergleiche deshalb das Datenblatt und reale Tests für genau die Randtypen deines Gartens." },
    ],
    relatedLinks: [
      { label: "Rasenfläche berechnen", href: "/garten/maehroboter-flaeche-berechnen/", description: "Nettofläche und sinnvolle Kapazitätsreserve nachvollziehbar bestimmen." },
      { label: "Mähroboter vergleichen", href: "/ratgeber/maehroboter-vergleich-kaufkriterien/", description: "Modelle nach Standortanforderungen statt pauschalem Testsieg bewerten." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Deinen kleinen Garten als vollständiges Anforderungsprofil prüfen." },
    ],
  },
  "maehroboter-vergleich-kaufkriterien": {
    comparison: {
      caption: "Kaufkriterien in sinnvoller Prüf-Reihenfolge",
      columns: ["Kriterium", "Was du erhebst", "Was du am Modell prüfst"],
      rows: [
        ["Fläche", "Netto-Rasen plus Komplexität und gewünschtes Zeitfenster.", "Nennfläche, Mähdauer, Ladezyklen und Mehrzonenfähigkeit."],
        ["Gelände", "Steilste Stelle, Übergänge, Boden und Feuchte.", "Zulässige Steigung unter den passenden Bedingungen und Traktionskonzept."],
        ["Passagen", "Nutzbare Breite, Länge, Kurven und Randabstände.", "Mindestbreite, Leit- oder Kartenfunktion und Wendebedarf."],
        ["Navigation", "Empfang, Bäume, Gebäude, klare Sichtgrenzen.", "Kabel, RTK, Kamera, LiDAR oder Hybrid einschließlich Störverhalten."],
        ["Sicherheit", "Teich, Stufe, Straße, Kinder, Tiere und Diebstahlrisiko.", "Grenzsicherung, Sensorik, Messerstopp, PIN, Ortung und Alarm."],
        ["Betrieb", "Erlaubte Mähzeiten, WLAN, Wartung und Winterlager.", "Geräusch, App-Abhängigkeit, Ersatzteile, Service und Folgekosten."],
      ],
    },
    checklist: [
      "Garten vermessen und nicht ungeprüft die Grundstücksfläche verwenden.",
      "Alle harten Ausschlusskriterien vor Preis und Komfortfunktionen markieren.",
      "Herstellerangaben mit Einheit, Messbedingung und konkreter Modellvariante dokumentieren.",
      "Mindestens zwei passende Modelle anhand derselben Kriterien und Datenstände vergleichen.",
      "Installation, Zubehör, Mobilfunk oder Referenzstation in den Gesamtpreis aufnehmen.",
      "Rückgabe, Ersatzteilversorgung, Software-Support und lokale Servicemöglichkeiten prüfen.",
    ],
    faqs: [
      { question: "Welcher Mähroboter ist der beste?", answer: "Einen universell besten Mähroboter gibt es nicht. Ein Modell kann auf offener Fläche überzeugen und an Hang, Engstelle oder unter Bäumen ungeeignet sein. Der beste Kandidat erfüllt alle harten Standortbedingungen und bietet zusätzlich ein gutes Verhältnis aus Komfort, Wartung, Preis und verfügbarer Unterstützung." },
      { question: "Wie viel Reserve zur Rasenfläche ist sinnvoll?", answer: "Die Reserve sollte aus Komplexität, mehreren Zonen, Hindernissen, Wachstum und dem gewünschten Mähzeitfenster entstehen. Eine pauschale Zahl kann nur Orientierung sein. PassendPlanen macht den verwendeten Aufschlag sichtbar, damit du ihn mit Gartenstruktur und Herstellerangaben des konkreten Modells abgleichen kannst." },
      { question: "Sind Kundenbewertungen für den Vergleich ausreichend?", answer: "Sie können wiederkehrende Alltagsthemen zeigen, ersetzen aber keine überprüfbaren technischen Daten. Bewertungen beziehen sich oft auf unterschiedliche Gartensituationen, Softwarestände und Installationsqualität. Nutze sie ergänzend zu Herstellerunterlagen, unabhängigen Tests, Rückgabebedingungen und deinem dokumentierten Standortprofil." },
      { question: "Was gehört in die Gesamtkosten?", answer: "Neben dem Roboter zählen Installationsmaterial, Kabel oder Referenzstation, Garage, Ersatzmesser, mögliche Mobilfunkdienste, Strom, Winterlagerung und Service. Auch eigener Installationsaufwand oder beauftragte Einrichtung ist ein Kostenblock. Vergleiche Angebote mit identischem Funktions- und Zubehörumfang." },
    ],
    relatedLinks: [
      { label: "Ohne Begrenzungskabel", href: "/ratgeber/maehroboter-ohne-begrenzungskabel/", description: "RTK, Kamera, LiDAR und Kabel am konkreten Standort vergleichen." },
      { label: "Steigung und Engstellen", href: "/garten/maehroboter-steigung-engstellen/", description: "Harte Ausschlusskriterien korrekt messen und bewerten." },
      { label: "Mähroboter-Flächencheck", href: "/garten/maehroboter-rechner/", description: "Aus Gartenfläche und Komplexität eine belastbare Auswahlklasse ableiten." },
    ],
  },
  "terrassendielen-wpc-oder-holz": {
    comparison: {
      caption: "WPC und Holz im direkten Projektvergleich",
      columns: ["Kriterium", "Holz", "WPC"],
      rows: [
        ["Optik und Alterung", "Natürliche Maserung; kann ohne pigmentierte Pflege sichtbar vergrauen.", "Gleichmäßiger; Farbe und Oberfläche verändern sich produktabhängig ebenfalls."],
        ["Pflege", "Reinigung und je nach gewünschter Optik regelmäßige Pflege einplanen.", "Meist Reinigung ohne Ölen; Herstellerhinweise zu Flecken und Mitteln beachten."],
        ["Barfußnutzung", "Holzart, Oberfläche und Pflege bestimmen Splitter- und Rutschverhalten.", "Oft splitterarm, kann sich besonders in dunklen Farben stärker erwärmen."],
        ["Unterkonstruktion", "Materialverträglichkeit, Dauerhaftigkeit, Abstände und Hinterlüftung prüfen.", "Systemfreigabe, Längenausdehnung, Clips und Auflagerabstände genau einhalten."],
        ["Reparatur", "Einzelne Dielen lassen sich häufig bearbeiten oder ersetzen; Farbunterschiede möglich.", "Ersatzprofil und Farbcharge müssen langfristig verfügbar und kompatibel sein."],
        ["Kosten", "Große Spanne nach Holzart und Qualität; Pflegeaufwand langfristig berücksichtigen.", "Häufig höherer Einstieg; Befestigung und passende Unterkonstruktion mitrechnen."],
      ],
    },
    checklist: [
      "Nutzung durch Kinder, Haustiere, Pool und Barfußlaufen ausdrücklich festhalten.",
      "Sonnenstunden und mögliche Oberflächentemperatur am Standort berücksichtigen.",
      "Dielenbreite, Fuge, Lieferlänge und Verlegerichtung für den Verschnitt berechnen.",
      "Freigegebene Unterkonstruktion, Auflagerabstände und Befestiger aus dem Systemdatenblatt übernehmen.",
      "Entwässerung, Hinterlüftung, Randabstände und Revisionsmöglichkeiten planen.",
      "Anschaffung, Pflege, Ersatzdielen und Rückbau über den Nutzungszeitraum vergleichen.",
    ],
    faqs: [
      { question: "Ist WPC grundsätzlich langlebiger als Holz?", answer: "Nein, die Lebensdauer hängt bei beiden von Produktqualität, Aufbau, Feuchte, Belüftung, Nutzung und Pflege ab. Dauerhafte Holzarten können sehr lange funktionieren; ungeeignete Details verkürzen die Nutzungsdauer. Bei WPC sind Profilqualität, Temperaturausdehnung, Unterkonstruktion und Herstellerfreigaben entscheidend. Eine pauschale Materialrangfolge ist deshalb nicht belastbar." },
      { question: "Welche Dielen werden in der Sonne heißer?", answer: "Dunkle Oberflächen erwärmen sich meist stärker, unabhängig vom Material. WPC kann Wärme anders speichern als Holz, doch Farbe, Profil, Luftbewegung und Sonneneinstrahlung verändern das Ergebnis. Bei barfuß genutzten Südterrassen sollten Muster unter realer Sonne geprüft und helle Farben sowie Beschattung mitgedacht werden." },
      { question: "Braucht WPC weniger Unterkonstruktion?", answer: "Nicht automatisch. Der zulässige Auflagerabstand folgt dem konkreten Profil und Hersteller. Hohlkammer- und Vollprofile können unterschiedliche Anforderungen haben; Stöße, Randbereiche und Lasten benötigen zusätzliche Details. Übernimm keine Abstände aus einem anderen Produkt und rechne die passende Unterkonstruktion vollständig mit." },
      { question: "Was ist für eine Poolterrasse besser?", answer: "Wichtig sind Rutschverhalten im nassen Zustand, Oberflächentemperatur, Splitterrisiko, Chlor- oder Salzwasserverträglichkeit, Entwässerung und sichere Befestigung. Sowohl Holz als auch WPC können geeignet sein, wenn das konkrete Produkt für diesen Einsatz freigegeben ist und der Aufbau Wasser zuverlässig ableitet." },
    ],
    relatedLinks: [
      { label: "Terrassendielen berechnen", href: "/garten/terrassen-dielen-rechner/", description: "Reihen, Laufmeter, Lieferdielen und Unterkonstruktion ermitteln." },
      { label: "Verschnitt und Fugen", href: "/garten/terrassendielen-verschnitt-fugen/", description: "Materialreserve aus Format, Lieferlänge und Verlegeplan ableiten." },
      { label: "Unterkonstruktion planen", href: "/garten/terrasse-unterkonstruktion/", description: "Auflager, Stöße, Randbereiche und Aufbauhöhe vor der Bestellung klären." },
    ],
  },
  "terrasse-kosten-materialvergleich": {
    comparison: {
      caption: "Kostenblöcke einer Dielenterrasse",
      columns: ["Bauteil", "Mengentreiber", "Häufig übersehen"],
      rows: [
        ["Dielen", "Fläche, Verlegerichtung, Breite, Fuge, Lieferlänge und Reserve.", "Verschnitt durch kurze Reststücke, Farbchargen und spätere Ersatzdielen."],
        ["Unterkonstruktion", "Auflagerabstand, Verlegerichtung, Stöße und Randdetails.", "Doppelte Träger an Stößen, Querverbände und materialgerechte Trennlagen."],
        ["Fundamente/Auflager", "Untergrund, Aufbauhöhe, Raster und zulässige Lasten.", "Aushub, Entwässerung, Höhenausgleich und Randstabilisierung."],
        ["Befestigung", "Offenes Schraubenbild oder Systemclips je Diele und Auflager.", "Start-/Endclips, Bohrer, Ersatzteile und systemspezifische Schrauben."],
        ["Ausführung", "Eigenleistung, Zuschnitt, Zugang und Komplexität.", "Werkzeuge, Transport, Entsorgung, Treppen, Blenden und Anschlüsse."],
        ["Pflege", "Material, Oberfläche, Nutzung und gewünschte Optik.", "Reinigungsmittel, Öl, Austausch und Zeitaufwand über mehrere Jahre."],
      ],
    },
    checklist: [
      "Terrassenmaß an mehreren Stellen messen und die endgültige Verlegerichtung festlegen.",
      "Dielenprofil, echte Breite, Fuge und verfügbare Lieferlängen dokumentieren.",
      "Herstellerabstand der Unterkonstruktion und zusätzliche Auflager an Stößen übernehmen.",
      "Fundament, Entwässerung, Aufbauhöhe und Anschlüsse an Haus oder Garten prüfen.",
      "Befestiger, Blenden, Treppen, Lieferung, Werkzeuge und Entsorgung ergänzen.",
      "Angebote auf denselben Material- und Leistungsumfang normalisieren.",
    ],
    faqs: [
      { question: "Wie berechne ich den Preis pro Quadratmeter richtig?", answer: "Addiere alle projektrelevanten Kosten und teile die Summe durch die tatsächlich nutzbare Terrassenfläche. Dielen allein ergeben keinen vollständigen Quadratmeterpreis. Unterkonstruktion, Fundamente, Befestiger, Randabschlüsse, Lieferung, Werkzeug oder Montage und Pflege gehören je nach Vergleichsziel dazu. Halte Eigenleistung und Fremdleistung getrennt sichtbar." },
      { question: "Warum ist der Verschnitt bei gleicher Fläche unterschiedlich?", answer: "Verlegerichtung, Dielenlänge, Terrassenform, Stöße und optische Regeln bestimmen, welche Reststücke weiterverwendet werden können. Eine rechteckige Fläche mit passenden Lieferlängen kann wenig Verschnitt erzeugen, während Ecken, Ausschnitte oder ungünstige Formate mehr Reserve benötigen. Deshalb rechnet PassendPlanen mit echten Profil- und Liefermaßen." },
      { question: "Ist WPC langfristig günstiger als Holz?", answer: "Das lässt sich nicht pauschal beantworten. WPC kann weniger Oberflächenpflege benötigen, startet aber je nach Qualität und System teurer. Holzpreise und Pflege variieren stark nach Holzart und gewünschter Optik. Vergleiche dieselbe Nutzungsdauer, vollständigen Aufbau, Pflege, Ersatzmöglichkeiten und Rückbau statt nur den aktuellen Dielenpreis." },
      { question: "Welche Kosten entstehen bei Eigenleistung trotzdem?", answer: "Materialtransport, Zuschnitt, Bohrer, Sägeblätter, Nivellierwerkzeug, Befestiger, Verschnitt, Entsorgung und die eigene Zeit bleiben bestehen. Bei Fehlern können Ersatzmaterial oder Nacharbeit hinzukommen. Eine Eigenleistungskalkulation sollte diese Positionen sichtbar führen, auch wenn keine Handwerkerstunden bezahlt werden." },
    ],
    relatedLinks: [
      { label: "Terrassendielen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Bestellmenge und Unterkonstruktion aus konkreten Produktmaßen berechnen." },
      { label: "WPC oder Holz", href: "/ratgeber/terrassendielen-wpc-oder-holz/", description: "Pflege, Wärme, Optik und Systemkosten direkt gegenüberstellen." },
      { label: "Terrassenkosten", href: "/garten/terrasse-kosten/", description: "Materialrahmen und offene Kostenpositionen strukturiert erfassen." },
    ],
  },
  "bewaesserung-tropfschlauch-oder-regner": {
    comparison: {
      caption: "Tropfrohr und Regner nach Einsatzbereich",
      columns: ["Kriterium", "Tropfrohr/Tropfschlauch", "Regner"],
      rows: [
        ["Geeignete Flächen", "Hecken, Reihen, Beete und gezielte Wurzelbereiche.", "Zusammenhängende Rasenflächen mit planbarer Überlappung."],
        ["Wasserabgabe", "Entlang einer Leitung nahe am Boden und relativ lokal.", "Über Düsen als Wurf über eine definierte Fläche."],
        ["Planungsdaten", "Länge, Tropferabstand, Abgabe, Druck und maximale Stranglänge.", "Fließdruck, Durchfluss, Wurfweite, Sektor, Überlappung und Wind."],
        ["Störanfälligkeit", "Filterung, Verstopfung, Druckunterschiede und Beschädigung im Beet.", "Falsche Ausrichtung, Windabdrift, versunkene Köpfe und ungleichmäßige Überdeckung."],
        ["Steuerung", "Lange, oft getrennte Laufzeiten mit niedrigem Durchfluss.", "Höherer momentaner Durchfluss; Zonen nach Anschlussleistung aufteilen."],
      ],
    },
    checklist: [
      "Rasen, Beete, Hecken und Kübel als getrennte Bewässerungsaufgaben erfassen.",
      "Durchfluss und Fließdruck direkt am vorgesehenen Anschluss messen.",
      "Längen, Höhenunterschiede und Leitungstrassen in einer Skizze dokumentieren.",
      "Pflanzenbedarf, Bodenart, Sonne und lokale Bewässerungsregeln berücksichtigen.",
      "Filter, Druckminderer, Rückflussschutz und Entleerung nach Systemvorgaben planen.",
      "Zonen so bilden, dass Komponenten mit unterschiedlichen Laufzeiten nicht gleichzeitig arbeiten müssen.",
    ],
    faqs: [
      { question: "Kann ich Tropfschlauch und Regner in derselben Zone betreiben?", answer: "Technisch ist eine Verbindung nicht immer ausgeschlossen, fachlich sind getrennte Zonen meist klarer. Beide Systeme arbeiten häufig mit unterschiedlichen Drücken, Durchflüssen und Laufzeiten. Eine gemeinsame Zone kann dazu führen, dass Rasen oder Beete falsch versorgt werden. Prüfe die Komponentenkennlinien und steuere unterschiedliche Abgabesysteme getrennt." },
      { question: "Was verbraucht weniger Wasser?", answer: "Das hängt von Auslegung, Laufzeit, Pflanzenbedarf, Boden und Wetter ab. Tropfbewässerung kann Wasser gezielt abgeben und Verdunstungsverluste reduzieren. Ein gut geplanter Regner kann Rasen gleichmäßig versorgen. Ein schlecht eingestelltes System verschwendet unabhängig vom Prinzip Wasser. Entscheidend sind Messung, Steuerung und bedarfsgerechter Betrieb." },
      { question: "Warum muss ich Druck und Durchfluss messen?", answer: "Durchfluss zeigt, welche Wassermenge unter den Messbedingungen verfügbar ist; Fließdruck zeigt, welcher Druck während der Entnahme bestehen bleibt. Regner und Tropfsysteme benötigen beides innerhalb ihrer Spezifikation. Nur ein statischer Druckwert oder die Eimerzeit allein reicht für eine belastbare hydraulische Auslegung nicht aus." },
      { question: "Welche Bewässerung ist für eine Hecke besser?", answer: "Ein Tropfrohr entlang der Pflanzreihe ist häufig gut steuerbar, weil Wasser bodennah und gleichmäßig über die Länge abgegeben werden kann. Tropferabstand, maximale Stranglänge, Filterung und Laufzeit müssen jedoch zum Produkt und Boden passen. Bei langen oder stark ansteigenden Hecken können mehrere Zonen nötig werden." },
    ],
    relatedLinks: [
      { label: "Durchfluss messen", href: "/garten/bewaesserung-durchfluss-messen/", description: "Den Anschluss mit Eimertest und Fließdruck für die Planung vorbereiten." },
      { label: "Tropfbewässerung für Hecken", href: "/garten/tropfbewaesserung-hecke/", description: "Länge, Reserve und Systemgrenzen einer Heckenleitung verstehen." },
      { label: "Bewässerungsplaner", href: "/garten/bewaesserungs-planer/", description: "Flächen und Komponenten in sinnvolle Steuerungszonen übersetzen." },
    ],
  },
  "gewaechshaus-glas-oder-polycarbonat": {
    comparison: {
      caption: "Verglasungsmaterial für ein Kleingewächshaus",
      columns: ["Kriterium", "Glas", "Polycarbonat-Mehrwandplatte"],
      rows: [
        ["Licht und Sicht", "Klare Durchsicht und hohe Lichtwirkung je nach Glasart und Sauberkeit.", "Streut Licht stärker; Durchsicht und Lichtdurchgang hängen von Platte und Alter ab."],
        ["Gewicht", "Höheres Gewicht beeinflusst Montage, Rahmen und Fundament.", "Leichter und dadurch bei Handhabung oft einfacher; Befestigung gegen Wind beachten."],
        ["Stoß und Bruch", "Glasart und Sicherheitsausführung bestimmen das Bruchverhalten.", "Schlagzäher, aber Oberfläche und Kammern müssen vor Beschädigung geschützt werden."],
        ["Wärme", "Einfachglas dämmt begrenzt; Fugen und Rahmen beeinflussen Verluste.", "Mehrwandaufbau kann Wärmeverluste reduzieren; Plattenstärke und Kammern vergleichen."],
        ["Pflege", "Glatte Flächen sind gut zu reinigen; Bruchstellen erfordern sicheren Ersatz.", "Schonend reinigen; Kammerabschlüsse, UV-Seite und Kratzempfindlichkeit beachten."],
      ],
    },
    checklist: [
      "Standort nach Sonne, Schatten, Wind, herabfallenden Ästen und Zugang beurteilen.",
      "Beetbreiten, Wege, Tür und Arbeitsfläche vor den Außenmaßen planen.",
      "Schnee- und Windlastfreigabe des vollständigen Systems für den Standort prüfen.",
      "Dachfenster, automatische Öffner, Türlüftung und mögliche Beschattung festlegen.",
      "Fundament, Verankerung, Sockelmaß und Entwässerung aus der Montageanleitung übernehmen.",
      "Ersatzscheiben oder Ersatzplatten, Dichtungen und langfristige Verfügbarkeit vergleichen.",
    ],
    faqs: [
      { question: "Welches Material lässt mehr Licht ins Gewächshaus?", answer: "Klares Glas bietet häufig eine hohe Lichtdurchlässigkeit, während Mehrwandplatten Licht stärker streuen. Der konkrete Wert hängt von Glasart, Plattenaufbau, Alter, Verschmutzung und Rahmenanteil ab. Mehr Licht ist nicht automatisch besser: Im Sommer können Beschattung und Lüftung entscheidender für pflanzenverträgliche Temperaturen sein." },
      { question: "Ist Polycarbonat hagelfest?", answer: "Polycarbonat ist im Vergleich zu einfachem Glas häufig schlagzäher, aber nicht pauschal unbeschädigbar. Plattenstärke, Qualität, Alterung, Befestigung und Herstellergarantie bestimmen die tatsächliche Widerstandsfähigkeit. Prüfe die konkrete Produktfreigabe und sichere Kanten sowie Kammerabschlüsse nach Montageanleitung." },
      { question: "Welches Gewächshaus ist im Winter besser?", answer: "Für Winterkultur zählen Wärmeverluste des gesamten Systems, Dichtheit, Boden, Volumen, Lüftung und gegebenenfalls Heizung. Mehrwandplatten können bessere Dämmwerte bieten, doch ein ungeeignetes Gesamtgebäude wird dadurch nicht automatisch wintertauglich. Pflanzenziel und zulässige Mindesttemperatur geben die Richtung vor." },
      { question: "Kann ich Glas später gegen Polycarbonat austauschen?", answer: "Nur wenn Rahmen, Aufnahmen, Plattenstärke, Befestigung und Lastannahmen dafür geeignet sind. Gewicht, Wärmeausdehnung und Abdichtung unterscheiden sich. Eine improvisierte Umrüstung kann Wind- oder Dichtheitsprobleme erzeugen. Prüfe, ob der Hersteller ein kompatibles Umrüstsystem ausdrücklich anbietet." },
    ],
    relatedLinks: [
      { label: "Gewächshaus-Größe", href: "/garten/gewaechshaus-groesse/", description: "Beete, Wege und Arbeitsfläche in eine sinnvolle Grundfläche übersetzen." },
      { label: "Lüftung planen", href: "/garten/gewaechshaus-belueftung/", description: "Dachfenster, Tür und automatische Öffner als Gesamtsystem betrachten." },
      { label: "Gewächshaus-Planer", href: "/garten/gewaechshaus-planer/", description: "Innenaufteilung, Basisprofile und Regenwasserrahmen berechnen." },
    ],
  },
  "carport-holz-oder-aluminium": {
    comparison: {
      caption: "Holz- und Aluminiumcarport nach Projektanforderung",
      columns: ["Kriterium", "Holz", "Aluminium"],
      rows: [
        ["Gestaltung", "Natürliche Wirkung und häufig gut anpassbar.", "Schlanke, technische Optik mit werkseitig definiertem System."],
        ["Pflege", "Oberfläche, Anschlüsse und Feuchtezonen regelmäßig kontrollieren.", "Beschichtung und Verbindungspunkte kontrollieren; meist wenig Oberflächenpflege."],
        ["Montage", "Bauteile können schwer sein; Holzfeuchte und Ausrichtung beachten.", "Leichte Profile, aber systemgenaue Montage und Beschädigungsschutz nötig."],
        ["Anpassungen", "Änderungen sind handwerklich oft möglich, benötigen aber statische Prüfung.", "Änderungen außerhalb des Systems können Verbindung und Freigabe beeinflussen."],
        ["Dach und Wasser", "Dachsystem, Gefälle und Rinne werden passend zum Tragwerk geplant.", "Häufig integrierte Systemdetails; Ablaufquerschnitt und Überlauf trotzdem prüfen."],
      ],
    },
    checklist: [
      "Fahrzeugmaße einschließlich Türen, Dachaufbau, Träger und zukünftiger Nutzung erfassen.",
      "Lichte Breite, Länge und Höhe statt beworbener Außenmaße vergleichen.",
      "Zufahrt, Tor, Schleppkurve und Rangierraum auf dem Grundstück prüfen.",
      "Standortbezogene Wind-, Schnee- und Fundamentanforderungen fachlich klären.",
      "Dachgefälle, Rinne, Fallrohr, Speicher, Überlauf und zulässige Ableitung planen.",
      "Pflege, Beschichtung, Ersatzteile, Garantie und Montageservice vergleichen.",
    ],
    faqs: [
      { question: "Ist ein Aluminiumcarport wartungsfrei?", answer: "Nein. Aluminium benötigt meist weniger Oberflächenpflege als gestrichenes Holz, doch Beschichtung, Dichtungen, Schraubverbindungen, Entwässerung und Dach müssen kontrolliert werden. Auch Verschmutzung und beschädigte Oberflächen können relevant sein. Wartungsintervalle und zulässige Reinigungsmittel stehen in den Unterlagen des konkreten Systems." },
      { question: "Welcher Carport ist günstiger?", answer: "Das hängt von Größe, Spannweite, Dach, Beschichtung, Fundament, Lieferung und Montage ab. Ein einfacher Holzbausatz kann günstig starten, während hochwertige Holz- und Aluminiumsysteme in anderen Preisbereichen liegen. Vergleiche vollständige Angebote mit identischen lichten Maßen, Lastfreigaben und Leistungsumfang." },
      { question: "Kann ich an einem Holzcarport leichter einen Abstellraum ergänzen?", answer: "Holz wirkt handwerklich leichter anpassbar, doch ein Abstellraum verändert Windangriffsfläche, Lasten, Belüftung, Fundament und möglicherweise Genehmigungsfragen. Die Ergänzung sollte im Tragwerk und in den Systemunterlagen vorgesehen oder fachlich neu bemessen werden. Eine einfache Verkleidung ist nicht nur eine optische Änderung." },
      { question: "Welches Material eignet sich an der Küste oder in feuchter Lage?", answer: "Salz, Feuchte und Wind belasten beide Systeme unterschiedlich. Bei Metall zählen geeignete Legierung, Beschichtung und Verbindungsmittel; bei Holz Materialwahl, konstruktiver Schutz und Oberflächenpflege. Standortfreigaben und Wartungsangaben des Herstellers sind wichtiger als eine pauschale Materialempfehlung." },
    ],
    relatedLinks: [
      { label: "Carport-Größe", href: "/garten/carport-groesse/", description: "Fahrzeug, Türen und Bewegungsraum in lichte Zielmaße übersetzen." },
      { label: "Carport-Fundament", href: "/garten/carport-fundament/", description: "Pfostenraster, Boden und Lasten als offene Planungsaufgabe erfassen." },
      { label: "Carport-Planer", href: "/garten/carport-planer/", description: "Stellraum, Zufahrt, Stauraum und Dachwasser zusammenführen." },
    ],
  },
  "bodenbelag-laminat-oder-vinyl": {
    comparison: {
      caption: "Laminat und Vinyl nach Raumanforderung",
      columns: ["Kriterium", "Laminat", "Vinyl / Designboden"],
      rows: [
        ["Aufbau", "Holzfaserbasierter Träger mit Dekor- und Nutzschicht, produktabhängig.", "Mehrere Produktarten: Vollvinyl, Rigid, mehrschichtige oder klebende Systeme."],
        ["Feuchte", "Kanten und Träger reagieren je nach Produkt empfindlich auf länger stehende Feuchte.", "Material kann feuchteunempfindlicher sein; Fugen, Untergrund und Freigabe bleiben entscheidend."],
        ["Untergrund", "Ebenheit, Restfeuchte, Dampfbremse und passende Unterlage prüfen.", "Dünne Beläge bilden Unebenheiten ab; Klebe- und Klicksysteme haben unterschiedliche Anforderungen."],
        ["Akustik", "Trittschallunterlage und schwimmender Aufbau beeinflussen Geh- und Raumschall.", "Material und Aufbau können leiser wirken; integrierte Unterlagen nicht ungeprüft doppeln."],
        ["Fußbodenheizung", "Gesamt-Wärmewiderstand und Herstellerfreigabe von Belag plus Unterlage prüfen.", "System- und temperaturabhängige Freigaben sowie Klebstoff oder Unterlage beachten."],
      ],
    },
    checklist: [
      "Raumnutzung, Feuchterisiko, direkte Sonne, Haustiere und Stuhlrollen dokumentieren.",
      "Untergrund auf Ebenheit, Festigkeit und zulässige Restfeuchte prüfen lassen.",
      "Bei Fußbodenheizung Freigabe und Wärmewiderstand des gesamten Aufbaus vergleichen.",
      "Paketinhalt, Raumaufteilung, Verlegerichtung und Verschnitt berechnen.",
      "Unterlage, Dampfbremse, Übergangsprofile und Sockelleisten in den Materialumfang aufnehmen.",
      "Emissionen, Reinigung, Reparaturmöglichkeit und Ersatzdekore berücksichtigen.",
    ],
    faqs: [
      { question: "Ist Vinyl immer wasserfest?", answer: "Nein. Der Begriff Vinyl umfasst unterschiedliche Aufbauten. Das Material einzelner Schichten kann wasserunempfindlich sein, während Fugen, Trägerplatte, Klebstoff oder Untergrund besondere Grenzen haben. Eine Freigabe für Küche, Bad oder andere Feuchträume muss sich ausdrücklich auf das vollständige Produkt und die vorgesehene Verlegeart beziehen." },
      { question: "Was ist besser bei Fußbodenheizung?", answer: "Entscheidend ist der Wärmedurchlasswiderstand des gesamten Aufbaus aus Belag, Unterlage und weiteren Schichten sowie die Herstellerfreigabe. Dünnere Aufbauten können Wärme besser übertragen, aber Material, Verklebung und zulässige Oberflächentemperatur unterscheiden sich. Vergleiche technische Daten statt nur die Produktkategorie." },
      { question: "Welcher Boden ist leiser?", answer: "Raum- und Trittschall hängen von Belag, Träger, Unterlage, Untergrund, Verlegung und Möblierung ab. Vinyl kann beim Begehen weicher wirken, während ein geeignet aufgebautes Laminatsystem ebenfalls gute Werte erreichen kann. Nutze geprüfte Systemwerte und vermeide eine zusätzliche Unterlage, wenn das Produkt diese nicht erlaubt." },
      { question: "Warum muss ich trotz Flächenangabe volle Pakete berechnen?", answer: "Bodenbeläge werden paketweise verkauft. Nach Nettofläche und Verschnitt wird die Bestellfläche durch den Paketinhalt geteilt und auf ganze Pakete aufgerundet. Raumform, Verlegerichtung und Dekor können die Reserve beeinflussen. Ungeöffnete Ersatzpakete oder einzelne Dielen sind außerdem für spätere Reparaturen wertvoll." },
    ],
    relatedLinks: [
      { label: "Bodenbelag-Rechner", href: "/haus/boden/bodenbelag-rechner/", description: "Fläche, Pakete, Unterlage und Sockelleisten gemeinsam berechnen." },
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Ebenheit, Feuchte und Unterlage vor der Materialwahl prüfen." },
      { label: "Laminat-Verschnitt", href: "/haus/boden/laminat-verschnitt-berechnen/", description: "Raumform und Verlegerichtung in eine nachvollziehbare Reserve übersetzen." },
    ],
  },
  "luftentfeuchter-kompressor-oder-adsorption": {
    comparison: {
      caption: "Entfeuchtungstechnik nach Betriebsbedingung",
      columns: ["Kriterium", "Kompressor/Kondensation", "Adsorption"],
      rows: [
        ["Temperatur", "Leistung ist häufig in wärmeren Räumen günstiger; Datenkurven des Modells prüfen.", "Kann bei niedrigeren Temperaturen leistungsfähiger bleiben, abhängig vom Gerät."],
        ["Energie", "Effizienz hängt stark von Temperatur, Feuchte und Laufzeit ab.", "Kann mehr elektrische Energie aufnehmen und zusätzliche Wärme abgeben."],
        ["Geräusch", "Kompressor und Ventilator erzeugen hörbaren Betrieb.", "Ventilator und Prozessluft können ebenfalls deutlich hörbar sein."],
        ["Wasser", "Tank oder Dauerablauf; Frost und Schlauchführung beachten.", "Tank oder Ablauf je nach Bauart; Betriebs- und Aufstellhinweise prüfen."],
        ["Typischer Einsatz", "Beheizte Keller, Wohnräume oder Wäschetrocknung bei passenden Temperaturen.", "Kühlere Räume, Garagen oder besondere Trocknungsaufgaben nach Gerätefreigabe."],
      ],
    },
    checklist: [
      "Raumfläche und -höhe zum tatsächlichen Raumvolumen multiplizieren.",
      "Temperatur und relative Feuchte über mehrere Tage und Nutzungsphasen messen.",
      "Feuchtequelle wie Leckage, Sommerkondensation, Wäsche oder Baufeuchte getrennt klären.",
      "Leistungsdaten des Geräts bei deiner realen Temperatur statt nur beim Nennpunkt vergleichen.",
      "Geräusch, Luftführung, Tank, Dauerablauf, Hygrostat und Wiederanlauf berücksichtigen.",
      "Stromkosten mit realer Aufnahmeleistung und realistischer Laufzeit als Spanne berechnen.",
    ],
    faqs: [
      { question: "Welche Technik ist für einen kalten Keller besser?", answer: "Bei niedrigen Temperaturen kann ein Adsorptionsgerät leistungsfähiger sein, während die Entfeuchtungsleistung vieler Kompressorgeräte sinkt. Das bedeutet nicht automatisch geringere Betriebskosten. Vergleiche Daten bei der tatsächlichen Kellertemperatur, elektrische Aufnahme, gewünschte Zielfeuchte, Geräusch und die Möglichkeit eines sicheren Dauerablaufs." },
      { question: "Warum erreicht mein Gerät die beworbenen Liter pro Tag nicht?", answer: "Nennwerte werden unter definierten Temperatur- und Feuchtebedingungen ermittelt, die im Alltag oft nicht vorliegen. Mit sinkender Feuchte und anderer Temperatur verändert sich die Leistung. Raumvolumen, Luftwechsel, Feuchtenachschub, Aufstellung und Messgerät beeinflussen das Ergebnis zusätzlich. Vergleiche passende Kennlinien statt nur den Maximalwert." },
      { question: "Kann ein Luftentfeuchter Schimmel verhindern?", answer: "Er kann die relative Luftfeuchte reduzieren und damit eine Randbedingung beeinflussen. Er beseitigt aber keine Leckage, Wärmebrücke, aufsteigende Feuchte oder andere bauliche Ursache. Sichtbarer Schimmel, Wasserschäden und dauerhaft feuchte Bauteile benötigen eine fachliche Ursachenklärung und gegebenenfalls Sanierung." },
      { question: "Was ist beim Dauerablauf wichtig?", answer: "Der Schlauch benötigt je nach Gerät ein durchgängiges Gefälle oder eine geeignete Pumpe, darf nicht geknickt sein und muss sicher enden. Rückstau, Frost, Gerüche und unbeabsichtigter Wasseraustritt sind zu verhindern. Prüfe außerdem, ob das Gerät nach Stromunterbrechung kontrolliert wieder anläuft." },
    ],
    relatedLinks: [
      { label: "Luftentfeuchter-Rechner", href: "/haus/raumklima/luftentfeuchter-rechner/", description: "Raumvolumen, Temperatur und Feuchtelast in eine Leistungsklasse übersetzen." },
      { label: "Luftentfeuchter im Keller", href: "/haus/raumklima/luftentfeuchter-keller/", description: "Sommerkondensation, kalte Wände und Dauerablauf richtig einordnen." },
      { label: "Stromverbrauch berechnen", href: "/haus/raumklima/luftentfeuchter-stromverbrauch/", description: "Aufnahmeleistung und Laufzeit zu nachvollziehbaren Kosten verbinden." },
    ],
  },
  "trockenbauwand-einfach-oder-doppelt-beplankt": {
    comparison: {
      caption: "Eine oder zwei Plattenlagen im Systemvergleich",
      columns: ["Kriterium", "Einfach beplankt", "Doppelt beplankt"],
      rows: [
        ["Material und Gewicht", "Weniger Platten, Schrauben und Spachtelfugen; geringeres Flächengewicht.", "Mehr Material, Gewicht, Transport und Befestigung je Wandseite."],
        ["Steifigkeit", "Für freigegebene einfache Systeme und geringe Anforderungen möglich.", "Kann Systemsteifigkeit verbessern, wenn Profil, Befestigung und Fugenversatz passen."],
        ["Schallschutz", "Systemwert hängt vom vollständigen Wandaufbau ab.", "Kann bessere Werte ermöglichen; nur geprüfte Konstruktionen vergleichen."],
        ["Brandschutz", "Nur mit ausdrücklich klassifiziertem Gesamtsystem bewerten.", "Zusätzliche Lage allein ist keine frei übertragbare Brandschutzfreigabe."],
        ["Lasten", "Befestigung nach Plattentyp, Last und vorgesehenem Befestiger.", "Mehr Lagen können helfen, ersetzen aber keine Verstärkung für schwere Lasten."],
        ["Ausführung", "Weniger Arbeitsschritte, Fugen liegen direkt in der sichtbaren Lage.", "Fugenversatz, Schraubenlängen und Verarbeitung jeder Lage genau einhalten."],
      ],
    },
    checklist: [
      "Wandhöhe, -länge, Seiten und alle Tür- oder Installationsöffnungen erfassen.",
      "Anforderungen an Schall, Feuer, Feuchte, Lasten und Oberfläche vor der Mengenrechnung klären.",
      "Ein geprüftes Gesamtsystem aus Profil, Dämmung, Plattentyp, Lagen und Befestigung auswählen.",
      "Zusatzprofile, Türständer, Anschlüsse und Verstärkungen getrennt vom Grundraster planen.",
      "Plattenformat, Transportroute, Fugenversatz und realistische Verschnittreserve bestimmen.",
      "Spachtelqualität, Grundierung, Oberfläche und Trocknungszeiten in Ablauf und Budget aufnehmen.",
    ],
    faqs: [
      { question: "Ist doppelte Beplankung immer stabiler?", answer: "Sie kann die Steifigkeit eines dafür vorgesehenen Systems erhöhen, aber Profilabstand, Plattentyp, Befestigung, Fugenversatz und Anschlüsse bestimmen das Ergebnis mit. Eine zusätzliche Lage auf einem ungeeigneten Grundaufbau ist keine pauschale Lösung. Nutze eine dokumentierte Systemkonstruktion für die tatsächliche Wandhöhe und Belastung." },
      { question: "Brauche ich doppelte Beplankung für Hängeschränke?", answer: "Schwere oder auskragende Lasten benötigen eine geplante Befestigung. Je nach Last können geeignete Dübel, zusätzliche Plattenlagen, Traversen oder eine Verstärkung im Ständerwerk erforderlich sein. Die Zahl der Lagen allein bestätigt keine Tragfähigkeit. Last, Befestigungspunkte und Systemunterlagen müssen zusammen geprüft werden." },
      { question: "Verbessert eine zweite Lage automatisch den Schallschutz?", answer: "Mehr Masse kann den Schallschutz beeinflussen, doch Fugen, Anschlüsse, Dämmung, Profil, Flankenübertragung und Ausführungsqualität sind ebenso wichtig. Verlasse dich bei definierten Anforderungen auf geprüfte Wandaufbauten mit angegebenem Schalldämmmaß und übertrage keine Einzelwerte aus einem anderen System." },
      { question: "Wie berechne ich die Plattenmenge bei zwei Lagen?", answer: "Ziehe Öffnungen von der Wandfläche ab, multipliziere mit den bekleideten Seiten und anschließend mit der Lagenzahl. Teile die resultierende Bekleidungsfläche durch die Fläche einer Platte, berücksichtige Verlegeplan und Verschnitt und runde auf ganze Platten auf. Zuschnitte der ersten Lage sind nicht automatisch in der zweiten wiederverwendbar." },
    ],
    relatedLinks: [
      { label: "Trockenbau-Rechner", href: "/haus/innenausbau/trockenbau-rechner/", description: "Platten, Lagen, Profile und Dämmfläche als Mengenrahmen berechnen." },
      { label: "Trockenbauplatten berechnen", href: "/haus/innenausbau/trockenbau-platten-berechnen/", description: "Öffnungen, Plattenformat und Verschnitt nachvollziehbar berücksichtigen." },
      { label: "Profile und Ständerwerk", href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", description: "Grundraster, Randprofile und zusätzliche Ständer getrennt planen." },
    ],
  },
};

export const SEO_GUIDE_DEPTH: Record<string, SeoGuideDepth> = { ...SEO_GUIDE_DEPTH_INITIAL, ...SEO_GUIDE_DEPTH_WAVE2 };
