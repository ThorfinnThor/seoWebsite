import type { SeoGuideDepth } from "@/lib/seo-guide-depth";
import { GUIDE_DEPTH_EXISTING_FINAL } from "@/lib/guide-depth-existing-final";

const GUIDE_DEPTH_EXISTING_INITIAL: Record<string, SeoGuideDepth> = {
  "/garten/gartenhaus-groesse/": {
    comparison: { caption: "Größenklassen nach typischer Nutzung", columns: ["Nutzung", "Flächentreiber", "Zusätzlich prüfen"], rows: [
      ["Kleine Gerätelagerung", "Handgeräte, Kisten und schmales Regal.", "Türanschlag, Regaltiefe und Zugriff auf hintere Gegenstände."],
      ["Fahrräder und Rasenmäher", "Fahrradlänge, Lenker, Mäher und freie Fahrgasse.", "Lichte Tür, Schwelle, Rangieren und Diebstahlschutz."],
      ["Werkstatt", "Werkbanktiefe plus Stand- und Arbeitsraum.", "Licht, Strom, Belüftung, Lasten und sichere Werkzeuglagerung."],
      ["Gemischtes Lager", "Summe aller Stellflächen plus Zugriff.", "Saisonale Umordnung und unabhängiger Zugang zu häufig genutzten Dingen."],
      ["Mit Aufenthaltswunsch", "Möbel, Bewegungsraum und deutlich höhere Anforderungen.", "Baurecht, Dämmung, Feuchte, Sicherheit und zulässige Nutzung fachlich klären."],
    ]},
    checklist: ["Alle Lagergüter mit realen Außenmaßen erfassen.", "Häufigkeit der Nutzung und nötigen Einzelzugriff markieren.", "Türbreite, Schwelle und Schwenkraum festlegen.", "Innen-, Sockel- und Außenmaß getrennt vergleichen.", "Dachüberstand und Montagefläche zum Stellmaß addieren.", "Standortregeln und Herstellerfundament vor Bestellung prüfen."],
    faqs: [
      { question: "Wie viel Bewegungsreserve braucht ein Gartenhaus?", answer: "Das hängt von Nutzung und Stellplan ab. Fahrräder, Rasenmäher und Werkbank benötigen mehr Bedienfläche als selten bewegte Kisten. PassendPlanen verwendet eine sichtbare Heuristik. Zeichne einen maßstäblichen Stellplan, damit die Reserve praktisch nachvollziehbar bleibt." },
      { question: "Sollte ich das Gartenhaus lieber eine Größe größer kaufen?", answer: "Nur wenn zusätzliche Fläche am Standort zulässig, bezahlbar und wirklich zugänglich ist. Ein größerer, schlecht organisierter Raum kann weniger praktisch sein als ein passender Grundriss mit guter Tür. Mehr Außenmaß verändert außerdem Fundament, Dachwasser, Montagefläche und möglicherweise rechtliche Prüfungen." },
      { question: "Zählt der Dachüberstand zur Gartenhausgröße?", answer: "Für Stellfläche, Abstände, Entwässerung und Montage ist der Dachüberstand relevant. Händler nennen jedoch unterschiedliche Maßarten. Übernimm Sockelmaß, Wandaußenmaß und Gesamtmaß inklusive Dach separat aus der technischen Zeichnung und prüfe, welches Maß für Fundament und örtliche Regeln zählt." },
    ],
    relatedLinks: [
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Lagerbedarf und Bewegungsreserve berechnen." },
      { label: "Vier Fahrräder lagern", href: "/ratgeber/gartenhaus-fuer-vier-fahrraeder/", description: "Einen konkreten Stell- und Zugangsplan entwickeln." },
      { label: "Gartenhaus-Kosten", href: "/garten/gartenhaus-kosten/", description: "Größe in vollständige Kostenblöcke übersetzen." },
    ],
  },
  "/garten/gartenhaus-fundament/": {
    comparison: { caption: "Fundamentprinzipien als Vorplanung", columns: ["Variante", "Kann passen, wenn …", "Offene Prüfung"], rows: [
      ["Platten-/Pflasterfläche", "Untergrund tragfähig und Entwässerung kontrolliert aufgebaut wird.", "Setzung, Ebenheit, Randstabilität und Verankerung."],
      ["Betonplatte", "Eine durchgehende robuste Basis erforderlich und zulässig ist.", "Aufbau, Bewehrung, Frost, Feuchteanschluss und Gefälle durch Fachplanung."],
      ["Punktfundamente", "Lasten an klaren Punkten in den Boden geleitet werden können.", "Raster, Boden, Tiefe, Träger und Aussteifung."],
      ["Schraubfundamente", "System und Baugrund dafür nachweislich geeignet sind.", "Tragfähigkeit, Korrosion, Einbau, Raster und Herstellerfreigabe."],
      ["Holz-/Trägerrahmen", "Er auf geeigneten Auflagern trocken, steif und verankert bleibt.", "Querschnitt, Abstand, Unterlüftung und Feuchteschutz."],
    ]},
    checklist: ["Montageanleitung und vorgeschriebenes Sockelmaß beschaffen.", "Bodenart, Gefälle und Wasserweg am Standort dokumentieren.", "Haus-, Boden- und Nutzungslasten zusammenstellen.", "Verankerung gegen Wind als Teil des Systems planen.", "Oberkante und Türschwelle mit Zugang und Gelände abstimmen.", "Fundamentwahl bei unklarem Baugrund fachlich bestätigen lassen."],
    faqs: [
      { question: "Welches Fundament ist das beste für ein Gartenhaus?", answer: "Es gibt keine universelle Variante. Größe, Gewicht, Boden, Gefälle, Frost, Entwässerung, Verankerung und Herstelleranforderung bestimmen die Lösung. Eine kleine Gerätebox stellt andere Anforderungen als ein großes Blockbohlenhaus. Beginne mit der Montageanleitung und prüfe anschließend den realen Baugrund." },
      { question: "Kann ein Gartenhaus direkt auf Pflaster stehen?", answer: "Nur wenn Pflasteraufbau, Ebenheit, Tragfähigkeit, Entwässerung und Verankerung zum konkreten System passen. Lose oder bereits gesetzte Fläche kann Probleme verursachen. Zwischen Holz und mineralischem Untergrund ist außerdem der vorgesehene Feuchteschutz einzuhalten. Eine vorhandene Terrasse ist nicht automatisch ein freigegebenes Fundament." },
      { question: "Warum muss das Fundament exakt eben sein?", answer: "Abweichungen können Wandmontage, Türfunktion, Dachanschlüsse und Lastverteilung beeinträchtigen. Besonders bei Element- und Metallhäusern summieren sich kleine Fehler über viele Bauteile. Prüfe Fläche, Diagonalen und Höhe mit geeigneten Messmitteln, bevor der Bausatz geöffnet und montiert wird." },
    ],
    relatedLinks: [
      { label: "Gartenhaus-Boden", href: "/garten/gartenhaus-boden/", description: "Fundament und begehbaren Boden sauber trennen." },
      { label: "Mit Boden kaufen", href: "/ratgeber/gartenhaus-mit-boden-worauf-achten/", description: "Lieferumfang, Last und Feuchte prüfen." },
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Standort und Nutzung vor der Fundamentwahl erfassen." },
    ],
  },
  "/garten/gartenhaus-fuer-fahrraeder/": {
    comparison: { caption: "Fahrradaufbewahrung nach Halterung", columns: ["Halterung", "Platzwirkung", "Alltag"], rows: [
      ["Bodenständer", "Benötigt Länge und Fahrgasse.", "Einfach, auch für schwere Räder gut zugänglich."],
      ["Wand horizontal", "Nutzt Wandfläche, ragt aber weit in den Raum.", "Rahmenkontakt, Hebehöhe und Tragpunkt prüfen."],
      ["Wand vertikal", "Reduziert Bodenbedarf bei versetzten Lenkern.", "Schwere E-Bikes sind schwieriger anzuheben."],
      ["Deckenhalter", "Boden bleibt weitgehend frei.", "Raumhöhe, Tragfähigkeit und Bedienung kritisch."],
      ["Gemischt", "Häufig genutzte Räder am Boden, leichte an der Wand.", "Benötigt einen individuellen Stellplan."],
    ]},
    checklist: ["Fahrräder samt Körben und Kindersitzen messen.", "Schwerstes und häufigstes Rad priorisieren.", "Lichte Türöffnung und Schwelle messen.", "Fahrgasse bis zum Stellplatz freihalten.", "Wandhalter nur an tragfähigen Punkten befestigen.", "Akkus, Feuchte, Licht und Diebstahlschutz planen."],
    faqs: [
      { question: "Welche Türbreite braucht ein Fahrrad-Gartenhaus?", answer: "Miss die breiteste feste Stelle des Fahrrads und berücksichtige, dass das Rad nicht immer exakt gerade durch die Tür geführt wird. Lenker, Körbe und Kindersitze vergrößern den Bedarf. Eine breitere Öffnung erleichtert den Alltag, muss aber mit Türschwenkraum und Sicherheit zusammenpassen." },
      { question: "Kann ich Fahrräder im Gartenhaus übereinander lagern?", answer: "Mit geeigneten, tragfähig montierten Halterungen kann das funktionieren. Gewicht, Hebekraft, Raumhöhe und unabhängiger Zugriff sind entscheidend. Schwere E-Bikes sollten nicht in eine Position gezwungen werden, die nur mit hohem Verletzungs- oder Beschädigungsrisiko bedient werden kann." },
      { question: "Wie schütze ich Fahrräder vor Rost und Feuchte?", answer: "Ein trockener Boden, funktionsfähige Lüftung und Abstand zu nassen Wänden sind die Grundlage. Stelle keine tropfnassen Räder dauerhaft ohne Luftaustausch ab. Kontrolliere Kondensat, Dach und Sockel und lagere Pflege- oder Ladeprodukte nach ihren Sicherheitsvorgaben." },
    ],
    relatedLinks: [
      { label: "Vier Fahrräder planen", href: "/ratgeber/gartenhaus-fuer-vier-fahrraeder/", description: "Konkrete Stellvarianten vergleichen." },
      { label: "Gartenhaus-Größe", href: "/garten/gartenhaus-groesse/", description: "Fahrräder mit weiterer Lagerung kombinieren." },
      { label: "Gartenhaus-Boden", href: "/garten/gartenhaus-boden/", description: "Schwelle und Tragfähigkeit berücksichtigen." },
    ],
  },
  "/garten/maehroboter-flaeche-berechnen/": {
    comparison: { caption: "Flächenbestandteile korrekt einordnen", columns: ["Bereich", "In Nettofläche?", "Zusatzprüfung"], rows: [
      ["Zusammenhängender Rasen", "Ja, vollständig vermessen.", "Form, Hindernisse und Randtypen."],
      ["Haus, Terrasse, Teich", "Nein, als feste Abzüge.", "Kanten und Sicherheitsabstände."],
      ["Beete und Bäume", "Beetfläche abziehen.", "Baumscheiben, Wurzeln und Umfahrung."],
      ["Schmale Verbindung", "Nur wenn tatsächlich mäh- oder befahrbar.", "Nutzbare Breite, Länge und Navigation."],
      ["Getrennte Nebenfläche", "Zur Gesamtarbeit zählen.", "Selbstständige Erreichbarkeit oder manuelles Umsetzen."],
    ]},
    checklist: ["Rasen in einfache Teilflächen zerlegen.", "Feste Abzüge getrennt messen.", "Passagen und Nebenflächen markieren.", "Steigungen und Hindernisse ergänzen.", "Komplexitätsreserve sichtbar begründen.", "Ergebnis mit Herstellerbedingungen abgleichen."],
    faqs: [
      { question: "Zählt die Grundstücksfläche für den Mähroboter?", answer: "Nein. Entscheidend ist die tatsächlich erreichbare Netto-Rasenfläche. Haus, Terrasse, Wege, Beete, Teich und andere nicht gemähte Bereiche werden abgezogen. Getrennte Rasenstücke werden zwar zur Arbeit addiert, benötigen aber zusätzlich eine Lösung für den Weg zwischen den Flächen." },
      { question: "Wie messe ich einen unregelmäßigen Rasen?", answer: "Zerlege ihn in Rechtecke, Dreiecke oder andere nachvollziehbare Teilflächen, berechne diese einzeln und addiere sie. Dokumentiere die Skizze und behandle große feste Aussparungen separat. Eine grobe Luftbildmessung kann kontrollieren, ersetzt aber nicht unbedingt die Maße vor Ort." },
      { question: "Warum wird eine Kapazitätsreserve empfohlen?", answer: "Hindernisse, Zonen, Wachstum und eingeschränkte Mähzeiten erhöhen den Aufwand gegenüber einer offenen Testfläche. Eine sichtbare Reserve verhindert, dass die Nennfläche als exakte Alltagkapazität missverstanden wird. Sie darf harte Grenzen wie Steigung oder Mindestpassage jedoch nicht überdecken." },
    ],
    relatedLinks: [
      { label: "Mähroboter für 500 m²", href: "/ratgeber/maehroboter-fuer-500-qm/", description: "Eine konkrete Flächenklasse einordnen." },
      { label: "Steigung und Engstellen", href: "/garten/maehroboter-steigung-engstellen/", description: "Geometrie um harte Standortgrenzen ergänzen." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Das vollständige Gartenprofil berechnen." },
    ],
  },
  "/garten/maehroboter-steigung-engstellen/": {
    comparison: { caption: "Schwierige Gartenbereiche getrennt messen", columns: ["Bereich", "Messung", "Modellprüfung"], rows: [
      ["Steigung", "Steilster Abschnitt in Prozent oder Grad.", "Einheit und Bedingungen des Maximalwerts."],
      ["Übergang", "Kuppe, Mulde und kurze Rampe.", "Bodenfreiheit und Traktion."],
      ["Passage", "Nutzbare Fahrbreite entlang der gesamten Länge.", "Mindestbreite, Wenden und Leitfunktion."],
      ["Seitenhang", "Querneigung an der Fahrspur.", "Abrutschen und Randabstand."],
      ["Kritische Kante", "Abstand zu Teich, Stufe oder Straße.", "Vorgeschriebene Sicherung des Systems."],
    ]},
    checklist: ["Prozent und Grad korrekt unterscheiden.", "Mehrere Punkte jeder Passage messen.", "Pflanzenüberhang und Randabstände abziehen.", "Boden auch bei Feuchte beurteilen.", "Absturzkanten separat dokumentieren.", "Herstellerbedingungen zur konkreten Modellvariante lesen."],
    faqs: [
      { question: "Wie rechne ich Grad in Prozent um?", answer: "Die Größen sind mathematisch verknüpft, aber nicht identisch. Für eine Kaufentscheidung ist es sicherer, in der vom Hersteller verwendeten Einheit zu messen oder korrekt umzurechnen. Schätze Werte nicht aus dem Gefühl, besonders wenn der Maximalwert knapp erreicht wird." },
      { question: "Welche Passage ist für einen Mähroboter zu schmal?", answer: "Das hängt von Gerät, Navigationssystem, Randabständen und der Frage ab, ob dort gemäht oder nur gefahren wird. Miss die nutzbare Breite über die gesamte Länge. Herstellerangaben zur Mindestpassage und Installation haben Vorrang vor pauschalen Tabellen." },
      { question: "Hilft eine größere Flächenklasse bei Steigung?", answer: "Nicht automatisch. Ein größeres Modell kann mehr Kapazität besitzen, aber seine zulässige Steigung, Traktion und Abmessungen müssen separat passen. Eine hohe Nennfläche ist kein Ersatz für ein geeignetes Fahrwerk oder sichere Randführung am Hang." },
    ],
    relatedLinks: [
      { label: "Mähroboter für Hanglage", href: "/ratgeber/maehroboter-fuer-hanglage/", description: "Boden, Seitenhang und Übergänge vertiefen." },
      { label: "RTK oder LiDAR", href: "/ratgeber/maehroboter-rtk-oder-lidar/", description: "Navigation für schwierige Bereiche vergleichen." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Alle Ausschlusskriterien zusammenführen." },
    ],
  },
  "/garten/maehroboter-begrenzungskabel-kabellos/": {
    comparison: { caption: "Installationsprinzipien gegenübergestellt", columns: ["Kriterium", "Begrenzungskabel", "Kabellos"], rows: [
      ["Grenze", "Physische Leitung im Boden oder an der Oberfläche.", "Digitale Karte und Sensorik."],
      ["Änderung", "Kabel muss angepasst oder neu verlegt werden.", "Karte kann bearbeitet werden, wenn das System es unterstützt."],
      ["Störung", "Kabelbruch und Signalfeld prüfen.", "Empfang, Karte, Kamera oder Sensor prüfen."],
      ["Bäume/Gebäude", "Navigation kann unabhängiger von Satellitensicht sein.", "Technologie und Fallback am Standort testen."],
      ["Kosten", "Kabel, Verbinder und Verlegearbeit.", "Höherer Gerätepreis, Referenz oder Dienste möglich."],
    ]},
    checklist: ["Gartengrenzen und kritische Kanten skizzieren.", "Kabelwege oder Empfangsbereiche testen.", "Passagen und Nebenflächen prüfen.", "Spätere Gartenänderungen berücksichtigen.", "Störverhalten und manuelle Wiederaufnahme verstehen.", "Vollständiges Installationszubehör kalkulieren."],
    faqs: [
      { question: "Ist kabellos automatisch moderner und besser?", answer: "Kabellose Systeme bieten flexible Karten und vermeiden Kabelverlegung, benötigen aber geeignete Sensor- oder Empfangsbedingungen. Ein Kabelsystem kann in schwieriger Satellitenumgebung sehr zuverlässig sein. Die bessere Lösung erfüllt die konkreten Gartenbedingungen und bietet ein verständliches Verhalten bei Störungen." },
      { question: "Wie tief muss Begrenzungskabel verlegt werden?", answer: "Verlegetiefe, Abstand und Befestigung gibt der Gerätehersteller vor. Zu tiefe oder abweichende Installation kann das Signal beeinflussen; oberirdische Verlegung benötigt sichere Fixierung. Beachte Vertikutieren, Spatenarbeiten und dokumentiere den Verlauf für spätere Reparaturen." },
      { question: "Kann ich später von Kabel auf kabellos wechseln?", answer: "Grundsätzlich kann ein anderes System installiert werden, doch Ladestation, Strom, Zonen und Grenzen müssen neu geplant werden. Ein vorhandenes Kabel kann je nach Garten im Boden verbleiben oder gezielt entfernt werden. Prüfe, ob gewünschte kabellose Modelle am Standort zuverlässig funktionieren." },
    ],
    relatedLinks: [
      { label: "Mähroboter ohne Kabel", href: "/ratgeber/maehroboter-ohne-begrenzungskabel/", description: "RTK, Kamera und LiDAR genauer betrachten." },
      { label: "RTK oder LiDAR", href: "/ratgeber/maehroboter-rtk-oder-lidar/", description: "Kabellose Navigation direkt vergleichen." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Standortanforderungen erfassen." },
    ],
  },
  "/garten/terrasse-unterkonstruktion/": {
    comparison: { caption: "Unterkonstruktion nach Planungsaufgabe", columns: ["Detail", "Grundraster", "Zusätzlicher Bedarf"], rows: [
      ["Durchgehende Diele", "Auflager im freigegebenen Abstand.", "Rand- und Befestigungsabstände."],
      ["Dielenstoß", "Nicht nur im normalen Raster behandeln.", "Häufig doppelte oder definierte Auflager."],
      ["Rand/Blende", "Äußerer Träger nach System.", "Zusatzprofil für Blende und Belüftung."],
      ["Treppe", "Eigener tragender Aufbau.", "Stufenmaß, Kante und Befestigung fachlich planen."],
      ["Schwere Last", "Standardraster reicht nicht automatisch.", "Punktlast und Auflager separat bemessen."],
    ]},
    checklist: ["Dielenrichtung endgültig festlegen.", "Hersteller-Auflagerabstand für das konkrete Profil und die erwartete Belastung übernehmen.", "Alle Stöße im Verlegeplan markieren.", "Rand, Blenden und Treppen ergänzen.", "Gefälle und Wasserablauf erhalten.", "Materialverträglichkeit und Befestiger prüfen."],
    faqs: [
      { question: "In welche Richtung läuft die Unterkonstruktion?", answer: "Üblicherweise quer zur Spannrichtung der Dielen, damit jede Diele in den vorgeschriebenen Abständen aufliegt. Sondermuster, diagonale Verlegung oder Rahmen können zusätzliche Querverbände erfordern. Der konkrete Systemplan und Herstellerabstand sind maßgeblich." },
      { question: "Warum werden Stöße doppelt unterstützt?", answer: "Beide Dielenenden benötigen eine sichere Befestigungsfläche und definierte Randabstände. Ein einzelner Träger kann dafür je nach System zu schmal sein. Plane die Lieferlängen und Stoßpositionen vor der Mengenermittlung, damit zusätzliche Träger nicht erst beim Aufbau auffallen." },
      { question: "Kann die Unterkonstruktion direkt auf Erde liegen?", answer: "Eine dauerhafte, tragfähige und entwässerte Terrasse benötigt einen geeigneten Untergrund und definierte Auflager. Direkter Erdkontakt fördert Feuchte, Setzung und mangelnde Belüftung. Der vollständige Aufbau richtet sich nach Boden, Höhe, Material und Lasten." },
      { question: "Wie berücksichtige ich Gefälle bei der Unterkonstruktion?", answer: "Das vorgesehene Gefälle muss Wasser vom Gebäude und aus dem Aufbau führen, ohne Auflager unsicher zu stapeln. Höhenverstellung, Pads oder Stelzlager benötigen eine freigegebene Lastaufnahme. Deckdiele und Unterkonstruktion können unterschiedliche Anforderungen an Richtung und Mindestgefälle haben." },
    ],
    relatedLinks: [
      { label: "Holz oder Aluminium", href: "/ratgeber/terrassen-unterkonstruktion-holz-oder-aluminium/", description: "Materialien der Unterkonstruktion vergleichen." },
      { label: "Verschnitt und Fugen", href: "/garten/terrassendielen-verschnitt-fugen/", description: "Stoßpositionen und Lieferlängen planen." },
      { label: "Terrassen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Auflagerreihen und Laufmeter berechnen." },
    ],
  },
  "/garten/terrassendielen-verschnitt-fugen/": {
    comparison: { caption: "Einflussfaktoren auf die Bestellmenge", columns: ["Faktor", "Wirkung", "Planungsreaktion"], rows: [
      ["Verlegerichtung", "Bestimmt Reihenlänge und mögliche Stöße.", "Vor Mengenermittlung festlegen."],
      ["Lieferlänge", "Passt gut oder erzeugt schwer nutzbare Reste.", "Zuschnittplan mit echten Längen erstellen."],
      ["Terrassenform", "Ecken und Ausschnitte erhöhen Zuschnitt.", "Teilflächen und Randdetails zeichnen."],
      ["Fuge", "Verändert Reihenanzahl und Gesamtbreite.", "Herstellerwert mit echter Dielenbreite rechnen."],
      ["Sortierung", "Optische oder qualitative Auswahl erzeugt Reserve.", "Anforderungen vor Bestellung definieren."],
    ]},
    checklist: ["Echte Dielenbreite statt Nennmaß verwenden.", "Fugenmaß aus Systemdaten übernehmen.", "Verlegerichtung und Startkante festlegen.", "Lieferlängen und Stöße zeichnen.", "Ausschnitte und Randbretter berücksichtigen.", "Reserve begründen und auf ganze Dielen runden."],
    faqs: [
      { question: "Wie viel Verschnitt brauche ich?", answer: "Das hängt von Form, Verlegerichtung, Lieferlänge, Muster, Stößen und Qualitätsauswahl ab. Eine pauschale Reserve kann nur eine Vorannahme sein. Ein Zuschnittplan zeigt besser, welche Reststücke tatsächlich wiederverwendbar sind und wo volle Ersatzdielen benötigt werden." },
      { question: "Zählt die Fuge zur Terrassenbreite?", answer: "Ja. Jede Reihe besteht aus Dielenbreite plus Fuge zur nächsten Diele. Über viele Reihen verändert das die Gesamtzahl deutlich. Verwende die echte Profilbreite und das freigegebene Fugenmaß bei erwarteter Montagetemperatur, nicht einen frei gewählten optischen Abstand." },
      { question: "Kann ich Reststücke an anderer Stelle verwenden?", answer: "Nur wenn Mindestlänge, Auflager, Stoßbild und Befestigung eingehalten werden. Sehr kurze Stücke oder ungeplante Stöße können zusätzliche Unterkonstruktion benötigen. Dokumentiere Restlängen im Zuschnittplan, statt ihre vollständige Verwendung pauschal anzunehmen." },
    ],
    relatedLinks: [
      { label: "Terrassen-Unterkonstruktion", href: "/garten/terrasse-unterkonstruktion/", description: "Auflager an geplanten Stößen ergänzen." },
      { label: "WPC-Profilvergleich", href: "/ratgeber/wpc-vollprofil-oder-hohlkammer/", description: "Profil- und Abschlussdetails einordnen." },
      { label: "Terrassen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Volle Lieferdielen und Reserve berechnen." },
    ],
  },
  "/garten/bewaesserung-durchfluss-messen/": {
    comparison: { caption: "Messwerte am Wasseranschluss", columns: ["Wert", "Aussage", "Grenze"], rows: [
      ["Statischer Druck", "Druck ohne relevante Entnahme.", "Sagt nicht, was während Bewässerung bleibt."],
      ["Fließdruck", "Druck bei definierter laufender Entnahme.", "Muss mit passendem Durchfluss dokumentiert werden."],
      ["Eimertest", "Volumen pro Zeit am Messpunkt.", "Enthält keine vollständige Rohrnetzberechnung."],
      ["Leitungslänge", "Beeinflusst Druckverlust.", "Durchmesser, Bögen und Höhe zählen mit."],
      ["Gleichzeitige Verbraucher", "Reduzieren verfügbare Anschlussleistung.", "Messung unter realistischen Bedingungen wiederholen."],
    ]},
    checklist: ["Späteren Anschluss als Messpunkt verwenden.", "Bekanntes Behältervolumen wählen.", "Füllzeit mehrfach messen.", "Fließdruck bei definierter Entnahme erfassen.", "Andere Verbraucher und Tageszeit notieren.", "Messwerte mit Komponentenkennlinien abgleichen."],
    faqs: [
      { question: "Wie rechne ich den Eimertest in Liter pro Minute um?", answer: "Multipliziere das Behältervolumen in Litern mit 60 und teile durch die gemessenen Sekunden. Zehn Liter in 30 Sekunden entsprechen 20 Litern pro Minute. Wiederhole die Messung, weil Schwankungen und Ablesefehler das Ergebnis beeinflussen können." },
      { question: "Warum reicht der Eimertest nicht allein?", answer: "Er zeigt den Durchfluss am Messpunkt unter genau diesen Bedingungen. Regner benötigen zusätzlich ausreichenden Fließdruck, und lange Leitungen erzeugen Verluste. Für eine belastbare Auslegung müssen Durchfluss, Druck, Rohr, Länge, Höhe und Komponenten gemeinsam betrachtet werden." },
      { question: "Wann sollte ich messen?", answer: "Messe unter realistischen Betriebsbedingungen und wiederhole zu unterschiedlichen Zeiten, wenn die Versorgung schwankt. Andere Verbraucher im Haus können das Ergebnis verändern. Dokumentiere Ventilstellung, Schlauch, Adapter und Messpunkt, damit spätere Werte vergleichbar bleiben." },
    ],
    relatedLinks: [
      { label: "Rasen und Beete", href: "/ratgeber/bewaesserung-fuer-rasen-und-beete/", description: "Messwerte in getrennte Zonen übersetzen." },
      { label: "Tropfschlauch oder Regner", href: "/ratgeber/bewaesserung-tropfschlauch-oder-regner/", description: "Abgabesysteme passend auswählen." },
      { label: "Bewässerungsplaner", href: "/garten/bewaesserungs-planer/", description: "Materialrahmen und offene Hydraulikwerte erfassen." },
    ],
  },
  "/haus/raumklima/luftentfeuchter-keller/": {
    comparison: { caption: "Kellerfeuchte nach möglicher Ursache", columns: ["Beobachtung", "Mögliche Richtung", "Nächster Schritt"], rows: [
      ["Im Sommer schlimmer", "Warme Außenluft kühlt an kalten Flächen ab.", "Innen-/Außentemperatur und Feuchteverlauf vergleichen."],
      ["Nach Regen lokal nass", "Undichtigkeit oder Wasserweg möglich.", "Bauteil und Außenbereich fachlich prüfen."],
      ["Vom Boden aufsteigend", "Boden-/Wandanschluss oder Abdichtung unklar.", "Keine reine Gerätefrage; Ursache untersuchen lassen."],
      ["Beim Wäschetrocknen", "Nutzungsbedingter Feuchtenachschub.", "Lüftung, Gerät, Raumvolumen und Laufzeit planen."],
      ["Nur hinter Möbeln", "Kalte Oberfläche und geringe Luftbewegung.", "Abstand schaffen und Oberfläche beobachten."],
    ]},
    checklist: ["Temperatur und Feuchte mehrere Tage messen.", "Jahreszeit und Wetter notieren.", "Wände, Boden und Leitungen auf Wasser prüfen.", "Möbelabstände und Luftzirkulation verbessern.", "Geräteleistung bei realer Temperatur vergleichen.", "Sicheren Dauerablauf und Stromkosten planen."],
    faqs: [
      { question: "Wann ist Lüften im Keller ungünstig?", answer: "Wenn warme feuchte Außenluft in einen deutlich kälteren Keller gelangt, kann ihre relative Feuchte beim Abkühlen stark steigen und Wasser an Oberflächen kondensieren. Vergleiche deshalb geeignete Innen- und Außenbedingungen statt im Sommer pauschal lange zu lüften." },
      { question: "Welcher Luftentfeuchter funktioniert bei niedriger Temperatur?", answer: "Vergleiche die Leistungsdaten bei der tatsächlichen Kellertemperatur. Kompressorgeräte können bei Kälte deutlich weniger Wasser entziehen; Adsorptionsgeräte können leistungsfähiger bleiben, aber mehr Energie nutzen. Die Feuchteursache und ein sicherer Ablauf bleiben unabhängig von der Technik wichtig." },
      { question: "Reicht ein Entfeuchter gegen Schimmel?", answer: "Er kann Luftfeuchte senken, beseitigt aber keine Leckage, Wärmebrücke oder aufsteigende Feuchte. Sichtbarer Schimmel und dauerhaft nasse Bauteile benötigen fachliche Ursachenklärung. Ein Gerät kann eine Maßnahme innerhalb eines Gesamtkonzepts sein, nicht automatisch die Sanierung." },
      { question: "Wo sollte der Luftentfeuchter im Keller stehen?", answer: "Stelle ihn standsicher mit den vorgeschriebenen Abständen auf, sodass Zu- und Abluft frei bleiben. In verwinkelten oder getrennten Räumen kann ein einzelner Standort die Luft nicht ausreichend erfassen. Türen, Luftführung, Geräusch und ein sicherer Schlauchweg zum Ablauf gehören in die Aufstellplanung." },
    ],
    relatedLinks: [
      { label: "Unbeheizter Keller", href: "/ratgeber/luftentfeuchter-fuer-unbeheizten-keller/", description: "Technik und Betrieb bei Kälte vertiefen." },
      { label: "Kompressor oder Adsorption", href: "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/", description: "Geräteprinzipien vergleichen." },
      { label: "Luftentfeuchter-Rechner", href: "/haus/raumklima/luftentfeuchter-rechner/", description: "Raumvolumen und Feuchtelast einordnen." },
    ],
  },
  "/haus/raumklima/luftentfeuchter-stromverbrauch/": {
    comparison: { caption: "Stromkosten realistisch einordnen", columns: ["Eingabe", "Rechnung", "Unsicherheit"], rows: [
      ["Aufnahmeleistung", "Watt durch 1.000 ergibt Kilowatt.", "Gerät kann je nach Betriebsphase unterschiedlich aufnehmen."],
      ["Laufzeit", "Kilowatt mal Betriebsstunden.", "Hygrostat, Temperatur und Feuchtenachschub verändern sie."],
      ["Strompreis", "Kilowattstunden mal Arbeitspreis.", "Tarif, Grundpreis und künftige Preise unterscheiden sich."],
      ["Zeitraum", "Tageswert auf Woche oder Monat hochrechnen.", "Nicht jeder Tag besitzt dieselben Bedingungen."],
      ["Vergleich", "Kosten je erreichter Feuchtereduktion betrachten.", "Nennleistung in Litern gilt nur bei definierten Prüfbedingungen."],
    ]},
    checklist: ["Typenschild oder Messgerät für reale Leistung nutzen.", "Laufzeit über mehrere typische Tage erfassen.", "Temperatur und Zielfeuchte mitprotokollieren.", "Arbeitspreis aus aktuellem Tarif verwenden.", "Kosten als Spanne statt Garantiewert darstellen.", "Feuchteursache parallel prüfen und nicht nur länger trocknen."],
    faqs: [
      { question: "Wie berechne ich die Tageskosten eines Luftentfeuchters?", answer: "Teile die Leistung in Watt durch 1.000, multipliziere mit den Betriebsstunden und anschließend mit dem Strompreis je Kilowattstunde. 300 Watt, acht Stunden und 0,35 Euro ergeben rechnerisch 0,84 Euro. Die reale Laufzeit hängt vom Hygrostat und Raumzustand ab." },
      { question: "Verbraucht ein größeres Gerät immer mehr Strom?", answer: "Eine höhere Aufnahmeleistung bedeutet mehr Energie pro Betriebsstunde, kann aber mit kürzerer Laufzeit verbunden sein. Entscheidend sind reale Entfeuchtungsleistung bei Raumtemperatur, Regelung und Feuchtenachschub. Vergleiche deshalb nicht nur Watt, sondern Wirkung und Laufzeit unter ähnlichen Bedingungen." },
      { question: "Wie kann ich den tatsächlichen Verbrauch messen?", answer: "Ein geeignetes Energiemessgerät zwischen Steckdose und Gerät kann Kilowattstunden über einen definierten Zeitraum erfassen. Beachte zulässige Last und sichere Anwendung. Notiere gleichzeitig Temperatur, Feuchte, Zielwert und entnommenes Wasser, damit der Verbrauch interpretierbar wird." },
    ],
    relatedLinks: [
      { label: "Luftentfeuchter-Rechner", href: "/haus/raumklima/luftentfeuchter-rechner/", description: "Passende Leistungsklasse vor der Kostenrechnung bestimmen." },
      { label: "Kompressor oder Adsorption", href: "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/", description: "Technik und Effizienzbedingungen vergleichen." },
      { label: "Unbeheizter Keller", href: "/ratgeber/luftentfeuchter-fuer-unbeheizten-keller/", description: "Laufzeit bei niedriger Temperatur einordnen." },
    ],
  },
  "/haus/boden/laminat-verschnitt-berechnen/": {
    comparison: { caption: "Verschnitt nach Raumsituation", columns: ["Situation", "Auswirkung", "Planung"], rows: [
      ["Rechteckiger Raum", "Gut planbare Reihen und Reststücke.", "Verlegerichtung und Startbreite vorab festlegen."],
      ["Viele Nischen", "Mehr Zuschnitt und kurze Reste.", "Teilflächen und Anschlüsse zeichnen."],
      ["Diagonale Verlegung", "Mehr Anschnitte an fast allen Rändern.", "Deutlich detaillierteren Verlegeplan erstellen."],
      ["Mehrere Räume", "Reste sind nicht automatisch überall nutzbar.", "Übergänge und Laufrichtung je Raum bestimmen."],
      ["Dekor mit Rapport", "Optische Sortierung kann Reserve erhöhen.", "Herstellerhinweise und Chargen berücksichtigen."],
    ]},
    checklist: ["Alle Teilflächen einzeln messen.", "Feste Aussparungen separat dokumentieren.", "Verlegerichtung und erste Reihe planen.", "Paketinhalt des konkreten Dekors übernehmen.", "Verschnitt sichtbar begründen.", "Auf ganze Pakete aufrunden und Ersatzmaterial vorsehen."],
    faqs: [
      { question: "Wie viel Laminatverschnitt ist normal?", answer: "Eine pauschale Prozentzahl kann nur eine Vorannahme sein. Rechteckige Räume mit gerader Verlegung benötigen oft weniger Reserve als Nischen, diagonale Muster oder viele Übergänge. Zeichne den Verlegeplan und passe die Reserve an tatsächliche Zuschnitte und Paketgröße an." },
      { question: "Kann ich Reste aus einem Raum im nächsten verwenden?", answer: "Wenn Dekor, Charge, Verriegelung, Mindeststücklänge und Verlegerichtung passen, können geeignete Reste weiterverwendet werden. Sehr kurze Stücke oder beschädigte Klickkanten sind ungeeignet. Plane nicht pauschal mit vollständiger Resteverwertung, sondern dokumentiere real nutzbare Längen." },
      { question: "Warum wird auf ganze Pakete aufgerundet?", answer: "Laminat wird paketweise verkauft. Die Bestellfläche wird durch den Paketinhalt geteilt und das Ergebnis auf die nächste ganze Einheit erhöht. Dadurch kann die tatsächlich gekaufte Fläche über Nettofläche plus Verschnitt liegen; das ist ein transparentes Ergebnis der Verpackungseinheit." },
    ],
    relatedLinks: [
      { label: "Bodenbelag-Rechner", href: "/haus/boden/bodenbelag-rechner/", description: "Pakete, Unterlage und Sockelleisten gemeinsam berechnen." },
      { label: "Laminat oder Vinyl", href: "/ratgeber/bodenbelag-laminat-oder-vinyl/", description: "Material vor der Mengenermittlung wählen." },
      { label: "Laminat auf Fußbodenheizung", href: "/ratgeber/laminat-auf-fussbodenheizung/", description: "Unterlage und Systemfreigabe zusätzlich prüfen." },
    ],
  },
  "/haus/innenausbau/trockenbau-platten-berechnen/": {
    comparison: { caption: "Flächen in der Plattenrechnung", columns: ["Bestandteil", "Berechnung", "Zusatzbedarf"], rows: [
      ["Bruttowand", "Länge mal Höhe je Wandseite.", "Zweite Seite und weitere Lagen separat berücksichtigen."],
      ["Tür/Fenster", "Öffnungsfläche rechnerisch abziehen.", "Zuschnitte und Zusatzprofile bleiben bestehen."],
      ["Mehrlagig", "Nettofläche mit Lagenzahl multiplizieren.", "Fugenversatz verändert Nutzbarkeit der Reststücke."],
      ["Plattenformat", "Stückfläche aus Länge mal Breite.", "Transport, Raumhöhe und Stoßanordnung prüfen."],
      ["Verschnitt", "Aus Verlegeplan und Öffnungen ableiten.", "Beschädigungen und kleine unbrauchbare Reste einplanen."],
    ]},
    checklist: ["Wandseiten und Lagen eindeutig festlegen.", "Alle Öffnungen mit Maß erfassen.", "Plattentyp und Format aus dem System wählen.", "Fugenversatz und Stoßpositionen zeichnen.", "Verschnitt und ganze Platten berechnen.", "Profile, Schrauben, Spachtel und Dämmung separat ergänzen."],
    faqs: [
      { question: "Werden Türen vollständig von der Plattenfläche abgezogen?", answer: "Ihre Fläche wird rechnerisch abgezogen, doch rund um die Öffnung entstehen Zuschnitte und häufig zusätzliche Profile. Nicht jedes Reststück kann weiterverwendet werden. Eine reine Nettoflächenrechnung muss deshalb um Verlegeplan und angemessene Reserve ergänzt werden." },
      { question: "Wie rechne ich doppelte Beplankung?", answer: "Multipliziere die bekleidete Nettofläche jeder Wandseite mit zwei Lagen. Plane die Plattenstöße der Lagen versetzt nach Systemvorgabe. Reststücke der ersten Lage sind wegen anderer Stoßpositionen nicht automatisch für die zweite Lage vollständig nutzbar." },
      { question: "Welches Plattenformat verursacht am wenigsten Verschnitt?", answer: "Das hängt von Wandhöhe, Länge, Öffnungen, Transportroute und zulässiger Verlegerichtung ab. Große Platten reduzieren Stöße, sind aber schwerer zu transportieren und zu montieren. Wähle das Format innerhalb des freigegebenen Systems anhand eines konkreten Verlegeplans." },
    ],
    relatedLinks: [
      { label: "Trockenbau-Rechner", href: "/haus/innenausbau/trockenbau-rechner/", description: "Platten und Profile gemeinsam berechnen." },
      { label: "Einfach oder doppelt", href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", description: "Lagenzahl aus Anforderungen ableiten." },
      { label: "Türen und Öffnungen", href: "/haus/innenausbau/trockenbau-tuer-oeffnungen/", description: "Zusatzprofile um Aussparungen planen." },
    ],
  },
  "/garten/gewaechshaus-groesse/": {
    comparison: { caption: "Flächen im Gewächshaus", columns: ["Bereich", "Funktion", "Planungsfehler"], rows: [
      ["Beet", "Pflanzenfläche mit erreichbarer Tiefe.", "Zu tief planen und Boden bei Pflege betreten."],
      ["Weg", "Zugang, Gießen und Ernte.", "Nur minimale Breite ohne Werkzeug oder Kisten ansetzen."],
      ["Arbeitsplatz", "Topfen, Ablage und Vorbereitung.", "Erst nachträglich den Hauptweg blockieren."],
      ["Türzone", "Einbringen von Erde und Geräten.", "Türbreite und Schwenkraum ignorieren."],
      ["Höhe", "Rankpflanzen und Luftvolumen.", "Nur Firsthöhe statt Höhe über dem Beet vergleichen."],
    ]},
    checklist: ["Pflanzenarten und Anzahl festlegen.", "Erreichbare Beetbreiten zeichnen.", "Weg und Tür für Arbeitsgeräte prüfen.", "Nutzbare Höhe an Pflanzenposition messen.", "Lüftungsöffnungen und Beschattung planen.", "Fundament, Verankerung und Außenmaß ergänzen."],
    faqs: [
      { question: "Welche Gewächshausgröße eignet sich für Anfänger?", answer: "Sie sollte zum konkreten Kulturplan und verfügbaren Standort passen. Ein sehr kleines Haus ist günstig, kann aber Wege, Lüftung und Fruchtfolge begrenzen. Pflanzenzahl, Beetbreite und Arbeitsweg ergeben gemeinsam eine nachvollziehbare Mindestfläche statt einer pauschalen Anfängergröße." },
      { question: "Wie breit sollte der Weg sein?", answer: "Der Weg muss zu Körper, Gießkanne, Kisten und eventuell Schubkarre passen. Eine universelle Breite gibt es nicht. Teste die geplante Breite praktisch und beachte, dass Pflanzen in den Weg wachsen können. Erreichbarkeit ist wichtiger als maximal gefüllte Beetfläche." },
      { question: "Warum ist ein größeres Gewächshaus nicht immer besser?", answer: "Mehr Volumen kann Klima und Nutzung erleichtern, erhöht aber Kosten, Fundament, Verankerung, Reinigungsfläche und möglichen Heizbedarf. Das Haus muss zum Standort und zur regelmäßig gepflegten Pflanzenmenge passen. Ungenutzte Fläche liefert keinen automatischen Vorteil." },
    ],
    relatedLinks: [
      { label: "Tomaten-Gewächshaus", href: "/ratgeber/gewaechshaus-fuer-tomaten-groesse/", description: "Größe für eine konkrete Kultur planen." },
      { label: "Glas oder Polycarbonat", href: "/ratgeber/gewaechshaus-glas-oder-polycarbonat/", description: "Verglasung nach Standort wählen." },
      { label: "Gewächshaus-Planer", href: "/garten/gewaechshaus-planer/", description: "Beet- und Wegefläche berechnen." },
    ],
  },
  "/garten/carport-groesse/": {
    comparison: { caption: "Maße eines Carports unterscheiden", columns: ["Maß", "Bedeutung", "Prüfung"], rows: [
      ["Lichte Breite", "Freier Raum zwischen Pfosten oder Wänden.", "Fahrzeug plus Türöffnung und Bewegungsreserve."],
      ["Lichte Länge", "Nutzbarer Stellraum.", "Fahrzeug, Zugang, Heckklappe und optionaler Stauraum."],
      ["Lichte Höhe", "Freie Durchfahrt unter Dachbauteilen.", "Fahrzeughöhe, Dachträger, Antenne und Reserve."],
      ["Außenmaß", "Gesamter Baukörper inklusive Tragwerk.", "Standort, Grenzen, Fundament und Dachüberstand."],
      ["Zufahrt", "Raum vor dem Stellplatz.", "Tor, Kurve, Schleppweg und Sicht."],
    ]},
    checklist: ["Aktuelles Fahrzeug mit Türen und Klappen messen.", "Dachträger oder zukünftiges Fahrzeug berücksichtigen.", "Pfostenposition und lichte Maße trennen.", "Zufahrt und Rangieren praktisch prüfen.", "Dachüberstand und Entwässerung zum Außenmaß addieren.", "Standortregeln und Lastnachweise fachlich klären."],
    faqs: [
      { question: "Wie breit sollte ein Einzelcarport sein?", answer: "Die lichte Breite entsteht aus Fahrzeugbreite, Türöffnung und gewünschtem Bewegungsraum. Breite Fahrzeuge, Kindersitze oder eingeschränkte Beweglichkeit erhöhen den Bedarf. Nutze keine pauschale Außenbreite, weil Pfosten und Tragwerk den tatsächlich freien Raum verkleinern." },
      { question: "Zählt die First- oder Dachhöhe als Durchfahrtshöhe?", answer: "Nein. Entscheidend ist der niedrigste relevante Dach- oder Trägerpunkt in der Fahrspur. Vergleiche lichte Durchfahrtshöhe mit Fahrzeug einschließlich Dachträger, Antenne oder geöffneter Heckklappe. Dachgefälle kann die Höhe entlang des Stellplatzes verändern." },
      { question: "Wie plane ich für ein später größeres Auto?", answer: "Definiere eine realistische Zielklasse und prüfe typische Breite, Länge und Höhe dieser Fahrzeuge, ohne ein einzelnes Modell als Garantie zu verwenden. Zusätzliche lichte Reserve kann sinnvoll sein, verändert aber Außenmaß, Fundament, Kosten und Standortprüfung." },
    ],
    relatedLinks: [
      { label: "Carport-Planer", href: "/garten/carport-planer/", description: "Lichte Maße aus deinem Fahrzeug berechnen." },
      { label: "Holz oder Aluminium", href: "/ratgeber/carport-holz-oder-aluminium/", description: "Material nach festgelegtem Raum vergleichen." },
      { label: "Carport-Fundament", href: "/garten/carport-fundament/", description: "Pfostenraster und Baugrund vorbereiten." },
    ],
  },
  "/garten/sichtschutz-elemente-berechnen/": {
    comparison: { caption: "Maße eines Sichtschutzsystems", columns: ["Maß", "Verwendung", "Fehlerquelle"], rows: [
      ["Sichtbare Feldbreite", "Optisch geschlossene Fläche.", "Pfosten und Fugen fehlen."],
      ["Montage-/Achsmaß", "Tatsächliches Raster des Systems.", "Mit Produktbreite verwechselt."],
      ["Pfostenbreite", "Teil des Gesamtabschlusses.", "Anzahl und Endpfosten falsch gezählt."],
      ["Tor-Modulmaß", "Kompletter Platzbedarf des Tores.", "Nur Türblatt statt Beschläge und Pfosten gerechnet."],
      ["Restfeld", "Abweichung am Streckenende.", "Unzulässiger oder optisch ungünstiger Zuschnitt."],
    ]},
    checklist: ["Gesamtstrecke an mehreren Punkten messen.", "Echtes Montage- oder Achsmaß verwenden.", "Das Tor als eigenes Modul berücksichtigen.", "Start-, Zwischen- und Endpfosten zählen.", "Restfeld und zulässigen Zuschnitt prüfen.", "Fundament und Windlast separat planen."],
    faqs: [
      { question: "Wie viele Sichtschutzelemente brauche ich?", answer: "Teile die nach Toren verbleibende Strecke durch das echte Montageraster des Systems und runde entsprechend der geplanten Randlösung. Die sichtbare Elementbreite allein reicht nicht, weil Pfosten, Halter und Fugen das Gesamtmaß verändern." },
      { question: "Braucht jedes Feld zwei eigene Pfosten?", answer: "Benachbarte Felder teilen sich üblicherweise einen Zwischenpfosten, während Anfang und Ende eigene Pfosten benötigen. Tore und Richtungswechsel können zusätzliche Pfosten erfordern. Zähle anhand einer gezeichneten Modulfolge statt mit einer pauschalen Multiplikation." },
      { question: "Kann das letzte Feld einfach gekürzt werden?", answer: "Nur wenn das konkrete System einen Zuschnitt zulässt und Rahmen, Füllung, Stabilität und Optik erhalten bleiben. Manche Elemente sind nicht frei kürzbar. Alternativ können Feldbreiten, Pfostenposition oder ein vorgesehenes Ausgleichsmodul angepasst werden." },
    ],
    relatedLinks: [
      { label: "Sichtschutz-Planer", href: "/garten/sichtschutz-planer/", description: "Felder, Tore und Pfosten berechnen." },
      { label: "Tor planen", href: "/garten/sichtschutz-gartentor-planen/", description: "Modulmaß und Zugang berücksichtigen." },
      { label: "Pfosten und Fundament", href: "/garten/sichtschutz-pfosten-fundament/", description: "Wind und Untergrund separat prüfen." },
    ],
  },
};

export const GUIDE_DEPTH_EXISTING: Record<string, SeoGuideDepth> = { ...GUIDE_DEPTH_EXISTING_INITIAL, ...GUIDE_DEPTH_EXISTING_FINAL };
