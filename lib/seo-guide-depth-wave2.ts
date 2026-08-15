import type { SeoGuideDepth } from "@/lib/seo-guide-depth";

export const SEO_GUIDE_DEPTH_WAVE2: Record<string, SeoGuideDepth> = {
  "gartenhaus-blockbohlen-oder-elementbauweise": {
    comparison: { caption: "Bauweisen im Projektvergleich", columns: ["Kriterium", "Blockbohlen", "Elementbau"], rows: [
      ["Montageprinzip", "Profilierte Bohlen werden Lage für Lage verbunden.", "Vormontierte oder gerahmte Wandfelder werden ausgerichtet und verbunden."],
      ["Holzbewegung", "Setzungs- und Quellverhalten muss bei Einbauten berücksichtigt werden.", "Rahmen und Bekleidung folgen dem vorgegebenen Elementaufbau."],
      ["Befestigungen", "Oft flexibel, aber nicht ungeprüft über bewegliche Bohlen hinweg.", "Tragfähige Rahmenpositionen müssen bekannt sein."],
      ["Aufbau", "Viele lange Einzelteile, Sortierung und Wetterschutz wichtig.", "Große Elemente benötigen Platz, Helfer und einen besonders ebenen Sockel."],
      ["Entscheidender Nachweis", "Profil, Verbindung, Holzschutz und Lastfreigaben.", "Rahmen, Aussteifung, Bekleidung und zulässige Befestigungen."],
    ]},
    checklist: ["Montageanleitung vor Bestellung vollständig lesen.", "Paketlängen, Gewicht und Zufahrt prüfen.", "Sockel- und Fundamentmaß abgleichen.", "Arbeitsraum um das Haus einplanen.", "Befestigungspunkte für Regale vorab klären.", "Holzschutz und Wartung dokumentieren."],
    faqs: [
      { question: "Welche Bauweise ist einfacher aufzubauen?", answer: "Das hängt von Größe, Vorfertigung, Bauteilgewicht, Helfern und Anleitung ab. Blockbohlen erfordern sauberes Sortieren und lagenweises Fügen. Elemente reduzieren einzelne Arbeitsschritte, sind aber sperrig und verlangen eine sehr genaue Ausrichtung. Vergleiche den kompletten Montageablauf statt nur die beworbene Aufbauzeit." },
      { question: "Ist eine dickere Blockbohle automatisch stabiler?", answer: "Die Wandstärke ist nur ein Merkmal. Eckverbindung, Dach, Aussteifung, Öffnungen, Fundament und Verankerung bestimmen das System mit. Für Wind- und Schneelasten gelten die dokumentierten Freigaben des vollständigen Modells, nicht eine aus der Bohlenstärke abgeleitete Vermutung." },
      { question: "Kann ich beide Bauweisen dämmen?", answer: "Eine nachträgliche Dämmung verändert Feuchteverhalten, Wandaufbau, Innenmaß und Anschlüsse. Sie ist nur sinnvoll, wenn ein bauphysikalisch stimmiger Aufbau geplant wird. Ein Gartenhaus wird durch Dämmplatten allein weder automatisch wohnlich noch genehmigungsrechtlich zu einem Aufenthaltsraum." },
    ],
    relatedLinks: [
      { label: "Holz oder Metall", href: "/ratgeber/gartenhaus-holz-oder-metall/", description: "Materialwahl vor der Bauweise einordnen." },
      { label: "Gartenhaus-Fundament", href: "/garten/gartenhaus-fundament/", description: "Eine ebene und verankerte Basis vorbereiten." },
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Fläche, Zugang und Nutzung zusammenführen." },
    ],
  },
  "gartenhaus-pultdach-oder-satteldach": {
    comparison: { caption: "Dachformen im direkten Vergleich", columns: ["Kriterium", "Pultdach", "Satteldach"], rows: [
      ["Wasserführung", "Eine definierte tiefe Traufseite.", "Zwei Traufseiten, häufig zwei Rinnenstrecken."],
      ["Innenhöhe", "Mehr Höhe entlang der hohen Wand.", "Maximale Höhe mittig am First."],
      ["Außenwirkung", "Modern und gerichtet.", "Klassisch und symmetrisch."],
      ["Regale", "Hohe Wand kann für vertikale Lagerung nützlich sein.", "Seitenhöhe kann die Regalposition begrenzen."],
      ["Planungsfokus", "Ablaufseite und hohe Außenwand.", "Firsthöhe, zwei Traufen und Dachflächen."],
    ]},
    checklist: ["Zulässige Gesamt- und Firsthöhe prüfen.", "Tür- und Regalposition im Schnitt einzeichnen.", "Dachdeckung mit Mindestgefälle abgleichen.", "Rinnen- und Fallrohrseite festlegen.", "Regenwasserziel und Überlauf planen.", "Wind- und Schneelastfreigabe kontrollieren."],
    faqs: [
      { question: "Welche Dachform ist bei Schnee besser?", answer: "Das lässt sich nicht pauschal aus der Form ableiten. Gefälle, Konstruktion, Spannweite, Dachdeckung und standortbezogene Schneelast bestimmen die Freigabe. Vergleiche die dokumentierte Last des vollständigen Hauses und verändere Dachdeckung oder Aufbau nicht ohne Bestätigung." },
      { question: "Ist ein Pultdach einfacher zu entwässern?", answer: "Es bündelt Wasser an einer Traufseite und kann dadurch übersichtlich wirken. Rinne, Fallrohr, Überlauf und zulässige Ableitung müssen trotzdem dimensioniert und angeordnet werden. Viel Wasser an einer Seite kann dort besonders viel Platz und einen sicheren Ablauf erfordern." },
      { question: "Welche Dachform bietet mehr Stauraum?", answer: "Das hängt von Wand- und Firsthöhe sowie der Zugänglichkeit ab. Ein Pultdach bietet eine hohe Wand, ein Satteldach Höhe in der Mitte. Für Regale zählt die Höhe an ihrer tatsächlichen Position; für lange Gegenstände außerdem Tür und Bewegungsraum." },
    ],
    relatedLinks: [
      { label: "Gartenhaus-Größe", href: "/garten/gartenhaus-groesse/", description: "Nutzfläche und Außenmaß abstimmen." },
      { label: "Gartenhaus-Zubehör", href: "/garten/gartenhaus-zubehoer/", description: "Rinne, Fallrohr und weitere Ausstattung planen." },
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Dachaufgaben im Gesamtprojekt berücksichtigen." },
    ],
  },
  "gartenhaus-fuer-vier-fahrraeder": {
    comparison: { caption: "Stellkonzepte für vier Fahrräder", columns: ["Konzept", "Vorteil", "Grenze"], rows: [
      ["Nebeneinander", "Jedes Rad ist direkt erreichbar.", "Benötigt viel Wandbreite und eine breite Zugangszone."],
      ["Versetzt", "Lenker überlappen weniger und Fläche wird besser genutzt.", "Abstände und Reihenfolge müssen zu den Rädern passen."],
      ["Vertikal", "Spart Bodenfläche.", "Heben, Wandtragfähigkeit und Raumhöhe werden kritisch."],
      ["Zwei Reihen", "Kann in tieferen Häusern funktionieren.", "Hintere Räder sind ohne freie Mittelgasse schwer erreichbar."],
      ["Mischsystem", "Schwere Räder am Boden, leichte vertikal.", "Benötigt einen vorab gezeichneten Stell- und Bewegungsplan."],
    ]},
    checklist: ["Alle vier Fahrräder mit Anbauten messen.", "Das schwerste E-Bike separat berücksichtigen.", "Lichte Türbreite und Schwelle prüfen.", "Schwenk- und Rangierfläche einzeichnen.", "Halterungen nur an freigegebenen Punkten planen.", "Akkulagerung und Diebstahlschutz klären."],
    faqs: [
      { question: "Wie groß muss ein Gartenhaus für vier Fahrräder sein?", answer: "Eine pauschale Fläche ist nicht zuverlässig, weil Radtypen, Halterung, Tür und gewünschter Einzelzugriff variieren. Der PassendPlanen-Rechner addiert eine nachvollziehbare Fahrradfläche und Bewegungsreserve. Anschließend muss ein realer Stellplan zeigen, ob jedes Rad praktisch erreichbar bleibt." },
      { question: "Ist eine Doppeltür notwendig?", answer: "Nicht zwingend, aber sie kann den Zugang deutlich erleichtern. Entscheidend ist die lichte Öffnung einschließlich feststehendem Flügel, Schwelle und Außenraum. Eine breite Tür hilft wenig, wenn innen direkt ein Regal oder ein quer abgestelltes Fahrrad die Fahrgasse blockiert." },
      { question: "Darf ich E-Bike-Akkus im Gartenhaus laden?", answer: "Das hängt von Temperatur, Feuchte, Elektroinstallation und Herstellervorgaben ab. Ein unbeheiztes oder stark aufgeheiztes Haus kann ungeeignet sein. Verwende nur fachgerecht installierte Anschlüsse und beachte die Lade- und Lagerhinweise des Akkuherstellers sowie den Brandschutz." },
    ],
    relatedLinks: [
      { label: "Gartenhaus für Fahrräder", href: "/garten/gartenhaus-fuer-fahrraeder/", description: "Tür, Halterung und Zugang detailliert planen." },
      { label: "Gartenhaus-Boden", href: "/garten/gartenhaus-boden/", description: "Schwelle, Last und trockene Aufstellung prüfen." },
      { label: "Gartenhaus-Planer", href: "/garten/gartenhaus-planer/", description: "Vier Räder und weitere Lagergüter berechnen." },
    ],
  },
  "maehroboter-rtk-oder-lidar": {
    comparison: { caption: "RTK und LiDAR nach Gartenbedingung", columns: ["Kriterium", "RTK", "LiDAR"], rows: [
      ["Positionsbasis", "Satelliten plus Korrekturdaten.", "Relative Umgebungsmessung per Lasersensor."],
      ["Typische Stärke", "Offene Flächen und digitale Grenzen.", "Strukturierte Umgebung auch unter begrenzter Himmelssicht."],
      ["Typische Prüfung", "Bäume, Gebäude, Funk und Referenzposition.", "Offene Bereiche, Veränderungen und Sensorverschmutzung."],
      ["Infrastruktur", "Je nach System Referenzstation oder Korrekturdienst.", "Kartierung und ausreichend erkennbare Umgebungsmerkmale."],
      ["Bei Störung", "Fallback-Sensorik und Verhalten bei Signalverlust prüfen.", "Verhalten bei unklarer Karte oder verdecktem Sensor prüfen."],
    ]},
    checklist: ["Kritische Empfangsbereiche markieren.", "Baumkronen und Gebäudegassen dokumentieren.", "Öffentliche Wege und Absturzkanten separat sichern.", "Mehrzonen und Passagen testen.", "Software- und Kartenfunktionen vergleichen.", "Rückgabe oder Vor-Ort-Test klären."],
    faqs: [
      { question: "Ist LiDAR genauer als RTK?", answer: "Genauigkeit ist nicht als einfache Rangfolge übertragbar. Beide Systeme messen unterschiedlich und werden durch Sensorfusion und Software ergänzt. Entscheidend ist, ob das komplette Modell die Grenzen und Hindernisse deines Gartens unter realen Bedingungen zuverlässig verarbeitet." },
      { question: "Braucht RTK immer eine Antenne im Garten?", answer: "Nicht jedes System arbeitet gleich. Manche Geräte verwenden eine lokale Referenzstation, andere netzbasierte Korrekturdienste oder zusätzliche Infrastruktur. Prüfe Lieferumfang, Abonnement, Mobilfunk, Montageort und die Reichweite für genau das Modell." },
      { question: "Kann LiDAR bei Regen mähen?", answer: "Die zulässigen Wetterbedingungen stehen in der Anleitung. Regen kann Sensorik, Traktion und Schnittbild beeinflussen, unabhängig davon, ob LiDAR grundsätzlich arbeitet. Prüfe Regensensor, Schutzart, Reinigung und die Frage, ob nasser Boden am Standort befahren werden sollte." },
    ],
    relatedLinks: [
      { label: "Ohne Begrenzungskabel", href: "/ratgeber/maehroboter-ohne-begrenzungskabel/", description: "Alle Navigationsprinzipien gegenüberstellen." },
      { label: "Steigung und Engstellen", href: "/garten/maehroboter-steigung-engstellen/", description: "Schwierige Gartenbereiche vermessen." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Navigation mit Fläche und Gelände verbinden." },
    ],
  },
  "maehroboter-fuer-500-qm": {
    comparison: { caption: "500-m²-Szenarien im Vergleich", columns: ["Gartentyp", "Planungsreserve", "Hauptprüfung"], rows: [
      ["Offen und rechteckig", "Geringere Komplexität möglich.", "Randlösung und gewünschtes Zeitfenster."],
      ["Viele Bäume", "Mehr Zeit und Navigationsprüfung.", "Empfang, Wurzeln und Hindernisse."],
      ["Mehrere Zonen", "Zusatzreserve für Wege und Teilflächen.", "Verbindungen und Rückkehr zur Station."],
      ["Hang", "Kapazität löst Traktion nicht.", "Steilste Stelle, Übergang und Kante."],
      ["Enge Passagen", "Mehr Fahr- und Suchaufwand möglich.", "Nutzbare Breite und Systemfreigabe."],
    ]},
    checklist: ["Netto-Rasen statt Grundstück messen.", "Komplexitätsfaktoren einzeln markieren.", "Steigung und Engstellen dokumentieren.", "Ladeplatz und Stromzugang festlegen.", "Installationszubehör mitrechnen.", "Nennfläche nur unter passenden Bedingungen vergleichen."],
    faqs: [
      { question: "Soll ich für 500 m² ein 500-m²-Modell kaufen?", answer: "Nicht automatisch. Bei einfacher offener Fläche kann die Klasse passen; bei Hindernissen, Zonen oder kurzen Mähfenstern kann mehr Kapazität sinnvoll sein. Harte Grenzen wie Steigung und Passage werden durch eine größere Flächenklasse nicht automatisch gelöst." },
      { question: "Wie viel größer sollte die Nennfläche sein?", answer: "Eine feste Universalreserve wäre irreführend. Begründe sie aus Gartenkomplexität, Wachstum, Zonen und gewünschter Laufzeit. Der Rechner macht diesen Aufschlag sichtbar, sodass du ihn mit realen Bedingungen und den Herstellerangaben abgleichen kannst." },
      { question: "Reicht ein Akku für 500 m²?", answer: "Mähroboter arbeiten meist in wiederholten Mäh- und Ladezyklen. Entscheidend ist nicht eine einzelne Akkuladung, sondern ob das Gerät die Fläche im verfügbaren Zeitfenster zuverlässig pflegt. Systematische Navigation, Wachstum und Hindernisse beeinflussen den Aufwand." },
    ],
    relatedLinks: [
      { label: "Rasenfläche berechnen", href: "/garten/maehroboter-flaeche-berechnen/", description: "Nettofläche und Reserve ermitteln." },
      { label: "Mähroboter vergleichen", href: "/ratgeber/maehroboter-vergleich-kaufkriterien/", description: "Technische Kriterien priorisieren." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "500-m²-Projekt vollständig prüfen." },
    ],
  },
  "maehroboter-fuer-hanglage": {
    comparison: { caption: "Hangfaktoren getrennt bewerten", columns: ["Faktor", "Messung", "Auswirkung"], rows: [
      ["Längssteigung", "Höhe zu waagerechter Strecke.", "Antrieb und Bremsverhalten bergauf und bergab."],
      ["Seitenhang", "Querneigung an kritischer Spur.", "Seitliches Abrutschen und Randabstand."],
      ["Übergang", "Kurze Rampe, Kuppe oder Mulde.", "Aufsetzen, Traktionsverlust oder Fahrfehler."],
      ["Boden", "Trocken, nass, locker, moosig oder lehmig.", "Realer Grip und Schutz der Grasnarbe."],
      ["Kante", "Mauer, Stufe, Teich oder Straße.", "Sicherheitsabstand und zusätzliche Begrenzung."],
    ]},
    checklist: ["Steilste Stelle in korrekter Einheit messen.", "Übergänge separat dokumentieren.", "Boden bei Nässe beurteilen.", "Seitenhang und Absturzkanten markieren.", "Ladestation auf ebener Fläche planen.", "Herstellerbedingungen zum Maximalwert lesen."],
    faqs: [
      { question: "Was bedeuten 45 Prozent Steigung?", answer: "45 Prozent bedeuten 45 Zentimeter Höhenunterschied auf 100 Zentimeter waagerechter Strecke. Das sind nicht 45 Grad. Vergleiche immer dieselbe Einheit und prüfe, unter welchen Bedingungen der Hersteller seinen Maximalwert angibt." },
      { question: "Ist Allrad am Hang immer nötig?", answer: "Allrad kann bei starken oder wechselnden Steigungen Vorteile bieten, ist aber keine pauschale Pflicht. Boden, Gewicht, Profil, Fahrstrategie und Kanten entscheiden mit. Ein Allradmodell darf eine unsichere Absturzkante ebenfalls nicht ungeprüft befahren." },
      { question: "Kann der Roboter bei Regen am Hang arbeiten?", answer: "Nasser Boden reduziert häufig die Traktion und kann die Grasnarbe beschädigen. Ob das Modell bei Regen betrieben werden darf und sinnvoll arbeitet, steht in der Anleitung. Plane Mähzeiten und Sensorfunktionen so, dass kritische Hangbereiche nicht unter ungeeigneten Bedingungen befahren werden." },
    ],
    relatedLinks: [
      { label: "Steigung messen", href: "/garten/maehroboter-steigung-engstellen/", description: "Einheit, Übergang und Passage korrekt aufnehmen." },
      { label: "Mähroboter-Vergleich", href: "/ratgeber/maehroboter-vergleich-kaufkriterien/", description: "Hang als hartes Auswahlkriterium verwenden." },
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Fläche und Hang gemeinsam bewerten." },
    ],
  },
  "wpc-vollprofil-oder-hohlkammer": {
    comparison: { caption: "WPC-Profile im Systemvergleich", columns: ["Kriterium", "Vollprofil", "Hohlkammer"], rows: [
      ["Querschnitt", "Durchgehend materialgefüllt.", "Innenliegende Kammern reduzieren Material."],
      ["Gewicht", "Höher und beim Transport relevant.", "Leichter zu handhaben."],
      ["Schnittkante", "Je nach System flexibler ausführbar.", "Abschluss und Wasserführung besonders beachten."],
      ["Preis", "Häufig höherer Materialpreis.", "Kann günstiger starten; Zubehör mitrechnen."],
      ["Montage", "Abstände und Ausdehnung bleiben verbindlich.", "Profilrichtung, Kammern und Endteile exakt beachten."],
    ]},
    checklist: ["Einsatzfreigabe des Profils prüfen.", "Auflagerabstand aus Datenblatt übernehmen.", "Längenausdehnung und Randfugen planen.", "Schnitt- und Abschlussprofile kalkulieren.", "Unterkonstruktion systemgerecht wählen.", "Muster bei Sonne und Nässe prüfen."],
    faqs: [
      { question: "Ist Vollprofil immer stabiler?", answer: "Der massive Querschnitt kann andere Eigenschaften ermöglichen, doch Stabilität und zulässige Spannweite folgen der Produktprüfung. Wandaufbau, Materialrezeptur, Profilgeometrie und Unterkonstruktion zählen mit. Verwende ausschließlich den freigegebenen Auflagerabstand des konkreten Profils." },
      { question: "Darf Wasser in Hohlkammern gelangen?", answer: "Der Hersteller legt fest, wie Kammern orientiert und abgeschlossen werden und wie Wasser ablaufen kann. Improvisiert verschlossene oder offene Enden können Probleme verursachen. Schnittkanten, Gefälle und Endprofile müssen deshalb bereits im Verlegeplan berücksichtigt werden." },
      { question: "Welches Profil ist für Poolumrandungen geeignet?", answer: "Entscheidend sind ausdrückliche Einsatzfreigabe, Rutschverhalten, Oberflächentemperatur, Wasser- und Chemikalienverträglichkeit sowie Randdetails. Nicht jedes Voll- oder Hohlkammerprofil ist automatisch für Poolnähe geeignet. Prüfe das vollständige System." },
      { question: "Kann ich Hohlkammer- und Vollprofile auf derselben Terrasse mischen?", answer: "Nur wenn der Hersteller einen kompatiblen gemeinsamen Aufbau bestätigt. Profilhöhe, Clips, Ausdehnung, Auflagerabstand und Farbe können abweichen. Ein optisch ähnliches Profil ist nicht automatisch systemkompatibel. Übergänge und Ersatzdielen sollten bereits im Verlegeplan eindeutig dokumentiert werden." },
    ],
    relatedLinks: [
      { label: "WPC oder Holz", href: "/ratgeber/terrassendielen-wpc-oder-holz/", description: "Grundmaterialien vergleichen." },
      { label: "Verschnitt und Fugen", href: "/garten/terrassendielen-verschnitt-fugen/", description: "Lieferlängen und Ausdehnung berücksichtigen." },
      { label: "Terrassen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Dielen und Unterkonstruktion berechnen." },
    ],
  },
  "terrassen-unterkonstruktion-holz-oder-aluminium": {
    comparison: { caption: "Unterkonstruktionsmaterial im Vergleich", columns: ["Kriterium", "Holz", "Aluminium"], rows: [
      ["Bearbeitung", "Einfach zu sägen und zu verschrauben.", "Systemprofile und passende Verbinder erforderlich."],
      ["Feuchte", "Konstruktiver Holzschutz ist zentral.", "Korrosion und Materialkontakt prüfen."],
      ["Maßhaltigkeit", "Holz arbeitet abhängig von Feuchte.", "Hohe Formstabilität bei korrekter Lagerung und Montage."],
      ["Aufbauhöhe", "Querschnitt nach Spannweite und Dauerhaftigkeit.", "Flache Systemprofile können Vorteile bieten."],
      ["Kosten", "Oft günstigerer Einstieg.", "Höherer Materialpreis, potenziell weniger Pflege."],
    ]},
    checklist: ["Deckdielen-Freigabe zur UK prüfen.", "Auflagerabstand exakt übernehmen.", "Stöße und doppelte Träger zeichnen.", "Wasserablauf und Hinterlüftung erhalten.", "Materialverträgliche Befestiger wählen.", "Punktlasten und Treppen separat planen."],
    faqs: [
      { question: "Kann ich WPC auf Holz-Unterkonstruktion verlegen?", answer: "Nur wenn der Dielenhersteller diese Kombination freigibt und Dauerhaftigkeit, Abstände und Befestigung passen. Die Unterkonstruktion sollte nicht deutlich früher versagen als der Deckbelag. Feuchteschutz und Hinterlüftung sind besonders wichtig." },
      { question: "Ist Aluminium bei niedriger Aufbauhöhe besser?", answer: "Flache Systemprofile können hilfreich sein, benötigen aber trotzdem ausreichende Tragfähigkeit, Auflager und Wasserablauf. Eine geringe Höhe rechtfertigt keine ungeeignete Spannweite. Prüfe das vollständige Profil- und Befestigungssystem." },
      { question: "Warum brauche ich an Dielenstößen zusätzliche Träger?", answer: "Beide Dielenenden benötigen eine sichere Befestigungs- und Auflagerzone mit den vorgeschriebenen Randabständen. Ein einzelner schmaler Träger reicht dafür je nach System nicht. Der Verlegeplan muss Stöße vor der Mengenermittlung festlegen." },
      { question: "Darf eine Aluminium-Unterkonstruktion direkt auf Beton liegen?", answer: "Nur entsprechend dem freigegebenen Systemaufbau. Wasser muss ablaufen können, Kontaktflächen benötigen gegebenenfalls geeignete Pads oder Trennlagen und das Profil muss sicher aufgelagert sein. Eine durchgehend aufliegende Konstruktion kann Entwässerung und Belüftung behindern. Plane Gefälle und Revisionszugang mit." },
    ],
    relatedLinks: [
      { label: "Unterkonstruktion planen", href: "/garten/terrasse-unterkonstruktion/", description: "Raster und Stoßdetails verstehen." },
      { label: "Terrassenkosten", href: "/ratgeber/terrasse-kosten-materialvergleich/", description: "Unterbau vollständig kalkulieren." },
      { label: "Terrassen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Laufmeter und Auflagerreihen berechnen." },
    ],
  },
  "bewaesserung-fuer-rasen-und-beete": {
    comparison: { caption: "Bewässerungszonen nach Fläche", columns: ["Fläche", "Typisches System", "Planungsdaten"], rows: [
      ["Rasen", "Versenk- oder Flächenregner.", "Wurfweite, Sektor, Überlappung, Druck und Wind."],
      ["Beet", "Tropfrohr oder gezielte Tropfer.", "Länge, Abstand, Abgabe, Filter und Druck."],
      ["Hecke", "Tropfrohr entlang der Reihe.", "Stranglänge, Höhenunterschied und Laufzeit."],
      ["Kübel", "Einzeltropfer mit regelbarer Abgabe.", "Pflanzenbedarf, Gefäß und sichere Leitung."],
      ["Gemischte Zone", "Meist besser auftrennen.", "Unterschiedliche Laufzeit und Komponentenkennlinie."],
    ]},
    checklist: ["Alle Flächen separat vermessen.", "Durchfluss und Fließdruck messen.", "Komponentendaten zusammentragen.", "Zonen nach Bedarf und Leistung bilden.", "Trinkwasserschutz fachgerecht planen.", "Wartung und Winterentleerung vorsehen."],
    faqs: [
      { question: "Wie viele Zonen brauche ich?", answer: "Mindestens so viele, dass unterschiedliche Abgabesysteme und Pflanzenbedarfe sinnvoll getrennt sind und jede Zone innerhalb der verfügbaren Anschlussleistung bleibt. Die genaue Zahl entsteht aus Durchfluss, Druck, Komponenten und Flächen, nicht nur aus der Gartengröße." },
      { question: "Kann ich alles gleichzeitig bewässern?", answer: "Nur wenn Anschluss, Leitungen und Komponenten den gesamten Durchfluss bei ausreichendem Fließdruck bereitstellen. In privaten Gärten ist eine zeitliche Aufteilung oft praktikabler. Zu viele gleichzeitige Verbraucher führen zu geringer Wurfweite oder ungleichmäßiger Tropfabgabe." },
      { question: "Brauche ich einen Regensensor?", answer: "Er kann unnötige Bewässerung reduzieren, ersetzt aber keine angepassten Saisonprogramme und Kontrolle. Bodenfeuchte, Niederschlagsmenge und Pflanzenbedarf können lokal abweichen. Wichtig ist, dass jede Zone manuell pausiert und nachvollziehbar eingestellt werden kann." },
      { question: "Welche Rohrgröße brauche ich für mehrere Zonen?", answer: "Die Rohrdimension entsteht aus Durchfluss, Länge, Höhenunterschieden, zulässigem Druckverlust und den angeschlossenen Komponenten. Eine pauschale Größe anhand der Gartengröße ist nicht belastbar. Für die hydraulische Auslegung sollten Herstellerunterlagen verwendet und bei komplexen Anlagen Fachleute einbezogen werden." },
    ],
    relatedLinks: [
      { label: "Durchfluss messen", href: "/garten/bewaesserung-durchfluss-messen/", description: "Anschlussleistung ermitteln." },
      { label: "Tropfschlauch oder Regner", href: "/ratgeber/bewaesserung-tropfschlauch-oder-regner/", description: "Systeme nach Fläche auswählen." },
      { label: "Bewässerungsplaner", href: "/garten/bewaesserungs-planer/", description: "Material und Zonen zusammenführen." },
    ],
  },
  "gewaechshaus-fuer-tomaten-groesse": {
    comparison: { caption: "Gewächshausgröße nach Nutzung", columns: ["Planungsgröße", "Kleine Lösung", "Größere Lösung"], rows: [
      ["Pflanzen", "Wenige ausgewählte Tomaten.", "Mehr Sorten und längere Reihen."],
      ["Weg", "Ein zentraler schmaler Arbeitsweg.", "Breiterer Weg und bessere Erreichbarkeit."],
      ["Arbeitsfläche", "Werkzeug außerhalb lagern.", "Ablage oder kleiner Arbeitstisch möglich."],
      ["Lüftung", "Tür plus passende Dachöffnung.", "Mehrere Öffnungen und bessere Querlüftung planbar."],
      ["Reserve", "Wenig Raum für Kulturwechsel.", "Platz für Begleitkulturen und Erntekisten."],
    ]},
    checklist: ["Pflanzenzahl und Sorten festlegen.", "Beet- und Wegbreite zeichnen.", "Nutzbare Höhe an Pflanzenposition prüfen.", "Dach- und Türlüftung festlegen.", "Bewässerungsweg und Wasserquelle planen.", "Fundament und Verankerung klären."],
    faqs: [
      { question: "Wie viele Tomaten passen in ein Gewächshaus?", answer: "Das hängt von Sorte, Pflanzabstand, Reihen, Weg und Kulturführung ab. Beginne mit den empfohlenen Abständen deiner Sorten und prüfe, ob jede Pflanze erreichbar und belüftet bleibt. Eine maximale Packung ist selten das beste Nutzungskonzept." },
      { question: "Wie hoch sollte ein Tomatengewächshaus sein?", answer: "Stabtomaten benötigen nutzbare Höhe für Pflanze und Rankhilfe. Entscheidend ist die Höhe über dem Beet, nicht nur der First. Prüfe Seitenwand, Dachneigung und vorgesehene Befestigung der Rankhilfe am konkreten Modell." },
      { question: "Reicht die Tür zum Lüften?", answer: "Eine Tür unterstützt den Luftaustausch, warme Luft sammelt sich jedoch oben. Dachfenster und geeignete Zuluft verbessern die natürliche Lüftung. Anzahl und Fläche müssen zum Gewächshaus passen; automatische Öffner können Temperaturspitzen begrenzen." },
    ],
    relatedLinks: [
      { label: "Gewächshaus-Größe", href: "/garten/gewaechshaus-groesse/", description: "Beete und Wege systematisch planen." },
      { label: "Gewächshaus-Lüftung", href: "/garten/gewaechshaus-belueftung/", description: "Öffnungen und Automatik einordnen." },
      { label: "Gewächshaus-Planer", href: "/garten/gewaechshaus-planer/", description: "Innenfläche und Basisprofile berechnen." },
    ],
  },
  "luftentfeuchter-fuer-unbeheizten-keller": {
    comparison: { caption: "Gerätewahl im kalten Keller", columns: ["Kriterium", "Kompressor", "Adsorption"], rows: [
      ["Niedrige Temperatur", "Leistung kann deutlich sinken.", "Kann leistungsfähiger bleiben."],
      ["Strom", "Unter passenden Bedingungen effizient.", "Häufig höhere Aufnahme und mehr Abwärme."],
      ["Geräusch", "Kompressor plus Ventilator.", "Ventilator und Prozessluft."],
      ["Abtauung", "Verhalten bei Kälte ausdrücklich prüfen.", "Kein klassischer Verdampferfrost, aber Gerätegrenzen beachten."],
      ["Auswahl", "Kennlinie bei Kellertemperatur vergleichen.", "Verbrauch und Laufzeit gegen Leistung abwägen."],
    ]},
    checklist: ["Temperaturverlauf messen.", "Feuchte innen und außen vergleichen.", "Bauliche Ursache prüfen.", "Leistung bei Realtemperatur vergleichen.", "Dauerablauf sicher planen.", "Strom und Laufzeit dokumentieren."],
    faqs: [
      { question: "Soll ich im Sommer den Keller lüften?", answer: "Warme feuchte Außenluft kann an kalten Kellerflächen abkühlen und zusätzliche Feuchte erzeugen. Lüfte deshalb nicht pauschal nach Uhrzeit, sondern anhand geeigneter Innen- und Außenbedingungen. Bei unklaren oder baulichen Feuchteproblemen ist eine fachliche Bewertung nötig." },
      { question: "Welche Ziel-Luftfeuchte ist richtig?", answer: "Ein pauschaler Wert passt nicht zu jedem Keller, Material und Temperaturzustand. Wähle einen kontrollierten Bereich, beobachte Oberflächen und Lagergut und vermeide unnötiges Dauertrocknen. Hygrostat und separates Messgerät helfen bei der Überwachung." },
      { question: "Warum läuft mein Entfeuchter ständig?", answer: "Mögliche Gründe sind kontinuierlicher Feuchtenachschub, offene Türen, ungeeignete Gerätegröße, niedrige Temperatur, falsch platzierter Sensor oder ein zu niedriges Ziel. Dokumentiere Feuchte, Temperatur, Wasser und Strom, bevor du die Ursache bewertest." },
    ],
    relatedLinks: [
      { label: "Luftentfeuchter Keller", href: "/haus/raumklima/luftentfeuchter-keller/", description: "Feuchteursachen und Sommerkondensation verstehen." },
      { label: "Techniken vergleichen", href: "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/", description: "Kompressor und Adsorption abwägen." },
      { label: "Luftentfeuchter-Rechner", href: "/haus/raumklima/luftentfeuchter-rechner/", description: "Volumen und Temperatur einordnen." },
    ],
  },
  "laminat-auf-fussbodenheizung": {
    comparison: { caption: "Aufbauschichten und ihre Funktion", columns: ["Schicht", "Prüfung", "Risiko bei Fehler"], rows: [
      ["Estrich", "Belegreife, Ebenheit und Heizprotokoll.", "Feuchte- und Verformungsschäden."],
      ["Dampfbremse", "Erforderlichkeit und Anschluss nach System.", "Feuchte gelangt in den Belag."],
      ["Unterlage", "Freigabe und Wärmewiderstand.", "Zu hoher Widerstand oder instabiler Klickboden."],
      ["Laminat", "Heizfreigabe und Oberflächentemperatur.", "Fugen, Verformung oder Garantieverlust."],
      ["Rand/Übergang", "Fugen und Flächengrenzen.", "Boden kann sich nicht bewegen und wölbt sich."],
    ]},
    checklist: ["Produktfreigabe dokumentieren.", "Gesamt-Wärmewiderstand prüfen.", "Restfeuchte fachgerecht messen.", "Aufheizprotokoll kontrollieren.", "Rand- und Übergangsfugen planen.", "Pakete und Ersatzmaterial berechnen."],
    faqs: [
      { question: "Brauche ich eine spezielle Trittschalldämmung?", answer: "Du brauchst eine Unterlage, die für Laminat, Untergrund und Fußbodenheizung freigegeben ist. Sie darf den zulässigen Gesamt-Wärmewiderstand nicht überschreiten. Bei integrierter Unterlage kann eine zusätzliche Schicht unzulässig sein." },
      { question: "Kann jedes Klicklaminat auf Fußbodenheizung?", answer: "Nein. Die Freigabe muss für das konkrete Produkt und Heizsystem gelten. Beachte Verlegeart, maximale Oberflächentemperatur, Unterlage und Estrich. Eine allgemeine Eigenschaft anderer Laminatprodukte lässt sich nicht übertragen." },
      { question: "Wie lange muss Laminat akklimatisieren?", answer: "Dauer, Verpackungszustand und Raumklima gibt der Hersteller vor. Lagere Pakete entsprechend der Anleitung im vorgesehenen Raum und sorge dafür, dass Estrich und Heizung bereits den zulässigen Zustand erreicht haben. Akklimatisierung ersetzt keine Feuchtemessung." },
      { question: "Darf ich die Fußbodenheizung direkt nach der Verlegung hochdrehen?", answer: "Die Temperaturänderung muss den Vorgaben von Belag, Estrich und Heizsystem folgen. Schnelle oder zu hohe Erwärmung kann Spannungen und Fugen begünstigen. Halte die zulässige Oberflächentemperatur ein und dokumentiere das schrittweise Wiederanfahren nach der Verlegung." },
    ],
    relatedLinks: [
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Aufbau vor der Verlegung prüfen." },
      { label: "Laminat-Verschnitt", href: "/haus/boden/laminat-verschnitt-berechnen/", description: "Pakete und Reserve bestimmen." },
      { label: "Bodenbelag-Rechner", href: "/haus/boden/bodenbelag-rechner/", description: "Materialumfang vollständig berechnen." },
    ],
  },
};
