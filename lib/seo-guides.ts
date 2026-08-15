import type { GuideSection } from "@/components/seo/GuidePage";

export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  takeaway: string;
  plannerHref: string;
  plannerLabel: string;
  sections: GuideSection[];
};

export const SEO_GUIDES: readonly SeoGuide[] = [
  {
    slug: "gartenhaus-holz-oder-metall",
    title: "Gartenhaus aus Holz oder Metall: Was passt besser?",
    description: "Gartenhaus aus Holz oder Metall vergleichen: Pflege, Haltbarkeit, Klima, Fundament, Aufbau und passende Nutzung verständlich abwägen.",
    heading: "Gartenhaus aus Holz oder Metall: Der Nutzung folgt das Material",
    intro: "Holz und Metall sind keine pauschalen Gewinner. Entscheidend sind Feuchte, gewünschte Optik, Pflegebereitschaft, Lagergut und die konkrete Stellfläche.",
    takeaway: "Wähle Holz, wenn Atmosphäre, Anpassbarkeit und ein warmes Innenklima zählen. Metall ist interessant, wenn geringer Pflegeaufwand und eine robuste, sachliche Hülle wichtiger sind.",
    plannerHref: "/garten/gartenhaus-planer/",
    plannerLabel: "Gartenhaus planen",
    sections: [
      { title: "Holz: anpassbar und wohnlicher", paragraphs: ["Holz lässt sich leichter reparieren, streichen und an vorhandene Gartenarchitektur anpassen. Dafür braucht die Außenhaut einen passenden konstruktiven und regelmäßigen Schutz vor dauerhafter Feuchte.", "Für Fahrräder, Werkbank oder Regale ist nicht nur das Material entscheidend. Türbreite, Innenmaß, Bodenaufbau und eine trockene Aufstellung bestimmen die Alltagstauglichkeit stärker als das Etikett Holzhaus."] },
      { title: "Metall: pflegearm, aber nicht automatisch wartungsfrei", paragraphs: ["Ein Metallhaus kann bei guter Beschichtung wenig Pflege benötigen. Kondensat, scharfe Kanten, Belüftung und Korrosionsschutz an Schnitt- oder Befestigungsstellen bleiben trotzdem zu prüfen.", "Im Sommer kann sich ein dünnwandiges Haus stark aufheizen. Für empfindliches Lagergut zählen deshalb Lüftung, Beschattung und ein geeigneter Bodenaufbau."] },
      { title: "Die Entscheidung in vier Fragen", paragraphs: ["Prüfe zuerst, was gelagert wird, wie oft du zugreifst, ob du nachstreichen möchtest und welches Außenmaß am Standort zulässig und praktisch ist. Vergleiche anschließend reale Innen- und Außenmaße, nicht nur Katalogbegriffe."] , bullets: ["Werkstatt und sichtbarer Gartenbau: häufig Vorteile für Holz.", "Schnelles, pflegearmes Geräte-Lager: Metall kann sinnvoll sein.", "Feuchte und Kondensat: Boden, Lüftung und Standort zuerst planen."] },
    ],
  },
  {
    slug: "gartenhaus-mit-boden-worauf-achten",
    title: "Gartenhaus mit Boden: Was du vor dem Kauf prüfen solltest",
    description: "Gartenhaus mit Boden vergleichen: Bodenplatte, Traglast, Feuchte, Türschwelle und Fundament vor dem Kauf richtig einordnen.",
    heading: "Gartenhaus mit Boden: Komfort beginnt unter dem Regal",
    intro: "Ein mitgelieferter Boden kann den Aufbau vereinfachen, ersetzt aber nicht automatisch ein geeignetes Fundament oder den Schutz vor aufsteigender Feuchte.",
    takeaway: "Vergleiche Bodenmaß, Tragfähigkeit, Unterlüftung, Feuchteschutz und Türanschluss mit deinem Lagergut und dem vorgesehenen Fundament.",
    plannerHref: "/garten/gartenhaus-boden/",
    plannerLabel: "Boden fürs Gartenhaus prüfen",
    sections: [
      { title: "Bodenmaß ist nicht Stellmaß", paragraphs: ["Hersteller unterscheiden zwischen Außenmaß, Sockelmaß und Bodenmaß. Für die Stellfläche und das Fundament müssen die Angaben des konkreten Systems zusammenpassen.", "Ein Boden, der innen ausreichend wirkt, kann außen durch Dachüberstand, Wandaufbau oder Türposition deutlich mehr Fläche benötigen."] },
      { title: "Feuchte und Unterlüftung", paragraphs: ["Holzbauteile sollten nicht dauerhaft auf feuchtem Untergrund stehen. Eine konstruktive Trennung, Gefälle und kontrollierte Entwässerung sind wichtiger als eine zusätzliche Folie ohne klare Anschlussdetails.", "Bei Metallhäusern muss außerdem geprüft werden, wie Kondensat abgeführt wird und ob das gelagerte Material empfindlich auf Temperaturwechsel reagiert."] },
      { title: "Traglast und Nutzung", paragraphs: ["Regale, Werkbank, Rasenmäher und Brennholz erzeugen unterschiedliche Lasten. Frage nach zulässiger Bodenlast und Befestigung, bevor schwere Einrichtung oder Punktlasten eingebaut werden."] },
    ],
  },
  {
    slug: "gartenhaus-kosten-vergleich",
    title: "Gartenhaus-Kosten vergleichen: Welche Posten oft fehlen",
    description: "Gartenhaus-Kosten realistisch planen: Haus, Fundament, Boden, Lieferung, Aufbau, Dachentwässerung und Genehmigungsprüfung als Checkliste.",
    heading: "Gartenhaus-Kosten: Der Kaufpreis ist nur der erste Posten",
    intro: "Ein fairer Kostenvergleich braucht dieselbe Größe, Ausstattung und Lieferbedingung. Sonst wirkt ein günstiges Angebot nur deshalb billig, weil wichtige Arbeiten fehlen.",
    takeaway: "Vergleiche immer die Summe aus Haus, Fundament, Boden, Lieferung, Aufbau, Entwässerung und nötiger Standortprüfung.",
    plannerHref: "/garten/gartenhaus-kosten/",
    plannerLabel: "Gartenhaus-Kosten einordnen",
    sections: [
      { title: "Direkte und indirekte Kosten trennen", paragraphs: ["Zum Produkt gehören je nach Angebot Wände, Dach, Tür, Fenster und Boden. Fundament, Unterbau, Schutzanstrich, Dachrinne, Lieferung und Montage stehen häufig separat daneben.", "Auch der Standort kann Zusatzaufwand verursachen: Gefälle, schwieriger Zugang, Entsorgung oder eine notwendige Anpassung der Stellfläche."] },
      { title: "Angebote vergleichbar machen", paragraphs: ["Notiere Außenmaß, Innenfläche, Wandstärke, Boden, Dachform, Tür, Fenster und Lieferumfang in einer gemeinsamen Tabelle. Erst danach ist der Preis pro nutzbarer Fläche sinnvoll interpretierbar."] , bullets: ["Nicht nur den Preis pro Quadratmeter vergleichen.", "Lieferung und Aufbau mit derselben Annahme rechnen.", "Reserve für Entwässerung, Befestigung und kleine Anpassungen lassen."] },
      { title: "Budgetgrenze vor der Produktsuche", paragraphs: ["Setze zuerst eine Budgetspanne und prüfe, welche Nutzung wirklich geschützt untergebracht werden muss. Eine kleinere, zugängliche Lösung kann besser funktionieren als ein größeres Haus, dessen Zusatzkosten das Budget sprengen."] },
    ],
  },
  {
    slug: "maehroboter-ohne-begrenzungskabel",
    title: "Mähroboter ohne Begrenzungskabel oder mit Kabel?",
    description: "Mähroboter ohne Begrenzungskabel vergleichen: RTK, Kamera, LiDAR und Begrenzungsdraht nach Gartenform, Empfang und Installationsaufwand bewerten.",
    heading: "Mähroboter ohne Begrenzungskabel: Technik folgt dem Garten",
    intro: "Kabellose Navigation kann die Installation vereinfachen, ist aber nicht für jede Grundstücksform automatisch die bessere Wahl.",
    takeaway: "Vergleiche Kabel, RTK, Kamera und LiDAR anhand von Gartenform, Empfang, Bäumen, Passagen, Zonen und späteren Änderungen – nicht nur anhand der Werbeaussage kabellos.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Mähbereich prüfen",
    sections: [
      { title: "Begrenzungskabel: planbar und sichtbar dokumentierbar", paragraphs: ["Ein Kabel legt die Grenze physisch fest und kann bei verwinkelten Flächen, Bäumen oder schwierigen Empfangsbedingungen Vorteile haben. Verlegung, Reparatur und spätere Änderungen gehören aber zur Installationsplanung.", "Passagen brauchen ausreichend nutzbare Breite und eine passende Führung. Die Herstellerangaben gelten immer für das konkrete Modell und System."] },
      { title: "RTK, Kamera und LiDAR", paragraphs: ["RTK benötigt stabile Satellitenbedingungen und korrekt platzierte Referenzen. Kameras und LiDAR beurteilen Umgebung und Hindernisse anders und können unter Bäumen, an Kanten oder bei wechselndem Licht unterschiedlich reagieren.", "Eine Technologiebezeichnung ersetzt deshalb keinen Standortcheck. Prüfe Empfang, Schatten, Hindernisse, Randabstände und getrennte Rasenflächen vor dem Kauf."] },
      { title: "Wann kabellos besonders interessant ist", paragraphs: ["Kabellose Systeme sind spannend, wenn du eine bestehende Fläche ohne Grabearbeiten erschließen oder Grenzen häufiger verändern möchtest. Für einen komplexen Garten ist die Installationsqualität trotzdem wichtiger als das Fehlen des Kabels."] },
    ],
  },
  {
    slug: "maehroboter-kleiner-garten",
    title: "Mähroboter für kleine Gärten: Worauf es wirklich ankommt",
    description: "Mähroboter für kleine Gärten auswählen: Flächenreserve, Lautstärke, Kanten, Passagen, Ladefläche und Installation verständlich prüfen.",
    heading: "Mähroboter für kleine Gärten: Nicht nur die Quadratmeter zählen",
    intro: "Bei kleinen Rasenflächen entscheiden oft Kanten, Durchgänge, Geräusch und Einrichtung stärker als die maximale Herstellerfläche.",
    takeaway: "Miss die echte Rasenfläche, die engste Passage und die kritischen Kanten. Plane außerdem Ladeposition, tägliche Laufzeit und eine Reserve für Hindernisse ein.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Kleinen Mähbereich berechnen",
    sections: [
      { title: "Nettofläche statt Grundstücksgröße", paragraphs: ["Terrasse, Beete, Spielgeräte, Teich und Wege gehören nicht zur Mähfläche. Getrennte Bereiche und schmale Verbindungen beeinflussen die Auswahl zusätzlich.", "Die Nennfläche des Herstellers ist ein Orientierungswert unter bestimmten Bedingungen. Ein kleiner Garten kann wegen vieler Hindernisse technisch anspruchsvoller sein als eine offene Rasenfläche."] },
      { title: "Leise und wendig", paragraphs: ["In Reihenhausgärten oder dicht bebauten Wohnlagen sind Geräusch, Kantenverhalten und ein unauffälliger Betrieb oft wichtiger als maximale Akkukapazität. Prüfe, wann der Roboter laufen darf und wie nah er an Grenzen arbeitet."] },
      { title: "Ladestation und Wartung", paragraphs: ["Die Ladestation braucht einen trockenen, zugänglichen und signaltechnisch passenden Platz. Messerwechsel, Reinigung, App-Verbindung und Winterlagerung gehören in den Vergleich, auch wenn sie selten in einer Flächenangabe auftauchen."] },
    ],
  },
  {
    slug: "maehroboter-vergleich-kaufkriterien",
    title: "Mähroboter vergleichen: Diese Kriterien sind wichtiger als Top-10-Listen",
    description: "Mähroboter-Vergleich nach Gartenfläche, Steigung, Engstellen, Navigation, Kanten und Wartung – ohne pauschalen Testsieger.",
    heading: "Mähroboter vergleichen: Ein Testsieger passt nicht automatisch zu deinem Garten",
    intro: "Eine belastbare Auswahl beginnt mit dem Geländeprofil. Erst danach lassen sich Modelle und Navigation sinnvoll gegenüberstellen.",
    takeaway: "Bewerte Geräte in dieser Reihenfolge: Nettofläche, Steigung, Engstellen, Hindernisse, Randlösung, Navigation, Geräusch, Wartung und erst dann Preis.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Gartenprofil prüfen",
    sections: [
      { title: "Warum pauschale Top-10-Rankings begrenzt sind", paragraphs: ["Ein Modell kann auf einer offenen Testfläche sehr gut abschneiden und im Garten mit Hang, Bäumen oder mehreren Zonen trotzdem ungeeignet sein. Rankings ändern sich außerdem mit Firmware, Lieferumfang und Preis.", "PassendPlanen veröffentlicht daher keinen erfundenen Testsieger. Die Auswahl sollte aus dokumentierten Anforderungen und überprüfbaren Herstellerdaten entstehen."] },
      { title: "Der Vergleich in acht Schritten", paragraphs: ["Erfasse zuerst Fläche, Steigung, engste Passage, Randabstände, Hindernisse und getrennte Zonen. Danach vergleichst du Navigation, zulässige Bedingungen, Laufzeit, Diebstahlschutz, Geräusch und Service."] , bullets: ["Fläche inklusive realistischer Reserve", "Steigung und Boden bei feuchten Bedingungen", "Kabel, RTK, Kamera oder LiDAR", "Kanten, Passagen und Nebenflächen", "Wartung, Ersatzmesser und Winterlagerung"] },
      { title: "Produktdaten erst nach dem Standortcheck", paragraphs: ["Wenn geprüfte Produktfeeds verfügbar sind, kann ein Katalog diese Kriterien filtern. Bis dahin bleibt eine transparente Anforderungsliste ehrlicher als eine Top-10-Tabelle ohne belastbare, aktuelle Daten."] },
    ],
  },
  {
    slug: "terrassendielen-wpc-oder-holz",
    title: "WPC oder Holz für die Terrasse: Der praktische Vergleich",
    description: "WPC oder Holz für Terrassendielen vergleichen: Pflege, Hitze, Optik, Splitter, Kosten, Haltbarkeit und Unterkonstruktion abwägen.",
    heading: "WPC oder Holz: Welche Terrassendielen passen zu deinem Alltag?",
    intro: "WPC ist pflegeleicht, Holz wirkt natürlich und kann günstiger starten. Die bessere Wahl hängt von Nutzung, Sonne, Pflege und gewünschter Optik ab.",
    takeaway: "WPC passt häufig zu wenig Pflege und splitterarmer Nutzung; Holz punktet bei natürlicher Haptik und Reparierbarkeit. Vergleiche immer Profil, Unterkonstruktion und Pflegeplan gemeinsam.",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Terrassenbedarf berechnen",
    sections: [
      { title: "Pflege und Alterung", paragraphs: ["Holz kann vergrauen und benötigt je nach Holzart und gewünschter Optik Reinigung oder Pflege. WPC ist meist einfacher zu reinigen, kann sich bei direkter Sonne aber stärker aufheizen.", "Beide Materialien brauchen konstruktiven Schutz vor stehender Nässe und einen passenden Aufbau. Das Material allein verhindert keine Verformung oder Feuchteschäden."] },
      { title: "Barfuß, Kinder und Haustiere", paragraphs: ["Splitterrisiko, Oberflächenprofil, Wärme und Rutschverhalten müssen zur Nutzung passen. Bei jedem Produkt sind Profil, Montageabstand und Pflegehinweise des Herstellers maßgeblich."] },
      { title: "Kosten fair vergleichen", paragraphs: ["Rechne Dielen, Verschnitt, Clips, Schrauben, Unterkonstruktion, Fundamente und Pflege zusammen. Ein günstiger Quadratmeterpreis kann durch kurze Lieferlängen oder höheren Verschnitt relativiert werden."] },
    ],
  },
  {
    slug: "terrasse-kosten-materialvergleich",
    title: "Terrasse planen: Kosten von Holz, WPC und Unterkonstruktion vergleichen",
    description: "Terrassenkosten vergleichen: Dielen, Verschnitt, Unterkonstruktion, Befestigung, Fundamente und Pflege als vollständigen Materialrahmen planen.",
    heading: "Terrassenkosten: Materialpreis und Aufbau getrennt sichtbar machen",
    intro: "Die Dielen sind nur ein Teil der Terrasse. Ein transparenter Vergleich zeigt, welche Kosten von Fläche, Aufbau und gewünschter Lebensdauer abhängen.",
    takeaway: "Ermittle zuerst Reihen, Laufmeter und Unterkonstruktion. Ergänze anschließend Befestiger, Randdetails, Fundamente, Lieferung und Pflege.",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Terrassenmaterial berechnen",
    sections: [
      { title: "Dielenfläche ist nicht Bestellmenge", paragraphs: ["Verlegerichtung, Dielenbreite, Fuge und Lieferlänge bestimmen Reihen und Verschnitt. Die rechnerische Fläche wird deshalb erst nach einer konkreten Aufteilung zur Bestellmenge.", "Kurze Lieferlängen können mehr Stöße und zusätzliche Unterkonstruktion erfordern. Vergleiche nicht nur Euro pro Quadratmeter."] },
      { title: "Unterkonstruktion und Befestigung", paragraphs: ["Auflagerabstände, Randabstände, Clips, Schrauben, Verbinder und doppelte Auflager an Stößen gehören in den Materialrahmen. Herstellerangaben und der konkrete Untergrund haben Vorrang vor pauschalen Rasterwerten."] },
      { title: "Langfristige Kosten", paragraphs: ["Holz kann Pflegekosten und Farbveränderung mitbringen, WPC einen höheren Einstieg und stärkere Erwärmung. Entscheide nach Nutzung und Pflegebereitschaft, nicht nach dem ersten Angebotspreis."] },
    ],
  },
  {
    slug: "bewaesserung-tropfschlauch-oder-regner",
    title: "Tropfschlauch oder Regner: Welche Gartenbewässerung passt?",
    description: "Tropfschlauch oder Regner vergleichen: Rasen, Beete und Hecken nach Fläche, Druck, Durchfluss, Pflege und Zonen planen.",
    heading: "Tropfschlauch oder Regner: Bewässerung nach Pflanzenfläche planen",
    intro: "Tropfrohr und Regner lösen unterschiedliche Aufgaben. Die richtige Entscheidung hängt von Pflanzen, Geometrie, Anschlusswerten und Wartung ab.",
    takeaway: "Tropfrohr passt meist zu Hecken und Beeten mit gezielter Abgabe; Regner sind für größere Rasenflächen interessant. Durchfluss und Druck müssen vorher gemessen werden.",
    plannerHref: "/garten/bewaesserungs-planer/",
    plannerLabel: "Bewässerung planen",
    sections: [
      { title: "Gezielt an der Wurzel oder großflächig", paragraphs: ["Tropfrohr gibt Wasser entlang einer Strecke ab und lässt sich gut an Reihen, Hecken und Beete anpassen. Regner verteilen Wasser über eine Fläche und brauchen eine passende Überlappung.", "Eine Mischung kann sinnvoll sein, sollte aber in getrennten Zonen geplant und steuerbar gemacht werden."] },
      { title: "Anschlusswerte entscheiden", paragraphs: ["Eimer-Test und Druckmessung am späteren Anschluss sind wichtiger als eine pauschale Empfehlung. Lange Leitungen, Höhenunterschiede, Filter und mehrere Abgänge verändern die verfügbare Leistung."] },
      { title: "Zonen statt Überforderung", paragraphs: ["Teile Rasen, Beete und Hecken nach Bedarf und Anschlusswerten. So bleiben Laufzeiten, Wartung und Fehlersuche beherrschbar."] },
    ],
  },
  {
    slug: "gewaechshaus-glas-oder-polycarbonat",
    title: "Gewächshaus aus Glas oder Polycarbonat: Vor- und Nachteile",
    description: "Glas oder Polycarbonat im Gewächshaus vergleichen: Licht, Bruchsicherheit, Wärmedämmung, Gewicht, Reinigung und Lüftung abwägen.",
    heading: "Glas oder Polycarbonat: Das Gewächshausmaterial folgt dem Standort",
    intro: "Glas bietet klare Optik und hohe Lichtdurchlässigkeit; Polycarbonat ist leichter und schlagzäher. Entscheidend sind Klima, Standort, Pflege und Konstruktion.",
    takeaway: "Wähle nicht nur nach Licht: Prüfe Sicherheit, Gewicht, Dämmung, Beschattung, Lüftung, Reinigung und die Freigaben des konkreten Systems.",
    plannerHref: "/garten/gewaechshaus-planer/",
    plannerLabel: "Gewächshaus planen",
    sections: [
      { title: "Glas: klar und klassisch", paragraphs: ["Glas wirkt optisch offen und lässt sich gut reinigen. Es ist schwerer und empfindlicher gegen Schlag oder Montagefehler; Konstruktion, Fundament und Sicherheitsglas-Variante müssen zum System passen."] },
      { title: "Polycarbonat: leicht und robuster bei Stößen", paragraphs: ["Mehrwandige Platten können Gewicht und Wärmeverlust reduzieren und sind im Alltag weniger bruchempfindlich. Lichtstreuung, Alterung, UV-Schutz und Reinigung hängen von der konkreten Platte ab."] },
      { title: "Lüftung bleibt bei beiden entscheidend", paragraphs: ["Kein Wandmaterial ersetzt Dachlüftung, Türlüftung und Beschattung. Plane die erreichbare Beetfläche und Wege zuerst, danach Material, Profile und Öffnungen."] },
    ],
  },
  {
    slug: "carport-holz-oder-aluminium",
    title: "Carport aus Holz oder Aluminium: Was passt zum Stellplatz?",
    description: "Carport aus Holz oder Aluminium vergleichen: Pflege, Optik, Spannweiten, Entwässerung, Montage und Standortanforderungen prüfen.",
    heading: "Holz oder Aluminium beim Carport: Nicht nur eine Stilfrage",
    intro: "Holz und Aluminium unterscheiden sich bei Pflege, Optik, Gewicht und Systemaufbau. Für die Auswahl zählen zuerst Fahrzeug, Zufahrt und Standort.",
    takeaway: "Plane lichte Breite, Länge, Höhe und Rangierraum zuerst. Vergleiche dann Materialpflege, Tragwerk, Entwässerung und die Montagebedingungen des konkreten Systems.",
    plannerHref: "/garten/carport-planer/",
    plannerLabel: "Carport-Raum planen",
    sections: [
      { title: "Holz: natürlich und anpassbar", paragraphs: ["Holz lässt sich optisch gut in Gärten integrieren und bei vielen Systemen anpassen. Schutzanstrich, Feuchteabstand, Verbindungsmittel und regelmäßige Kontrolle bleiben Teil der Nutzung."] },
      { title: "Aluminium: leicht und pflegearm", paragraphs: ["Aluminiumprofile können schlank und wartungsarm sein. Die konkrete Tragfähigkeit, Verbindung und Dachausführung sind Systemthemen und lassen sich nicht aus dem Materialnamen ableiten."] },
      { title: "Dachwasser und Zufahrt", paragraphs: ["Ein Carport muss nicht nur das Auto überdecken. Gefälle, Dachkante, Rinne, Fallrohr, Rangierraum und Sicht auf die Zufahrt sollten vor dem Kauf auf dem Grundstück geprüft werden."] },
    ],
  },
  {
    slug: "bodenbelag-laminat-oder-vinyl",
    title: "Laminat oder Vinyl: Welcher Bodenbelag passt zum Raum?",
    description: "Laminat oder Vinyl vergleichen: Feuchte, Trittschall, Pflege, Nutzung, Fußbodenheizung, Untergrund und Paketbedarf einordnen.",
    heading: "Laminat oder Vinyl: Die Raumnutzung entscheidet",
    intro: "Laminat und Vinyl sehen sich oft ähnlich, reagieren aber unterschiedlich auf Feuchte, Untergrund, Wärme und Belastung.",
    takeaway: "Prüfe zuerst Raumfeuchte, Untergrund, Nutzung, Trittschall und Herstellerfreigaben für Fußbodenheizung. Erst danach vergleichst du Dekor und Paketpreis.",
    plannerHref: "/haus/boden/bodenbelag-rechner/",
    plannerLabel: "Bodenmaterial berechnen",
    sections: [
      { title: "Feuchte und Raumklima", paragraphs: ["Vinyl kann je nach System feuchteunempfindlicher wirken, ist aber nicht automatisch für jeden Untergrund oder Nassraum freigegeben. Laminat braucht einen passenden Feuchteschutz und darf nicht auf unklarem Untergrund verlegt werden."] },
      { title: "Untergrund und Wärme", paragraphs: ["Ebenheit, Restfeuchte, Unterlage und Wärmedurchlasswiderstand sind vor der Verlegung zu prüfen. Bei Fußbodenheizung zählt die Systemfreigabe aus Boden und Unterlage zusammen."] },
      { title: "Kosten nicht nur pro Quadratmeter", paragraphs: ["Rechne Pakete, Verschnitt, Übergangsprofile, Sockelleisten, Unterlage und mögliche Untergrundarbeiten zusammen. Die günstigere Diele kann durch Zusatzmaterial am Ende teurer werden."] },
    ],
  },
  {
    slug: "luftentfeuchter-kompressor-oder-adsorption",
    title: "Kompressor- oder Adsorptionstrockner: Welcher Luftentfeuchter passt?",
    description: "Kompressor oder Adsorption beim Luftentfeuchter vergleichen: Temperatur, Energie, Geräusch, Wäsche, Keller und Raumvolumen richtig einordnen.",
    heading: "Kompressor oder Adsorption: Raumtemperatur ist ein hartes Auswahlkriterium",
    intro: "Die Liter-pro-Tag-Angabe allein sagt wenig. Temperatur, Feuchtelast, Laufzeit, Geräusch und Ablauf entscheiden, welche Technik sinnvoll ist.",
    takeaway: "Kompressorgeräte sind oft bei wärmeren Räumen effizient; Adsorption kann bei niedrigeren Temperaturen interessanter sein. Prüfe immer reale Bedingungen und die Ursache der Feuchte.",
    plannerHref: "/haus/raumklima/luftentfeuchter-rechner/",
    plannerLabel: "Raumklima berechnen",
    sections: [
      { title: "Kompressorgeräte", paragraphs: ["Kompressorgeräte nutzen einen Kältekreislauf und werden häufig für wärmere Wohn- oder Kellerräume eingesetzt. Leistung, Lautstärke und Entfeuchtung sinken beziehungsweise verändern sich bei anderen Temperaturen."] },
      { title: "Adsorption", paragraphs: ["Adsorptionsgeräte arbeiten ohne klassischen Kompressor und können bei niedrigen Temperaturen Vorteile haben. Dafür können Stromverbrauch, Abwärme und Geräusch im konkreten Betrieb höher ausfallen."] },
      { title: "Feuchteursache zuerst klären", paragraphs: ["Ein Gerät senkt Luftfeuchte, repariert aber keine Leckage, Wärmebrücke oder falsche Lüftung. Messe Raumvolumen, Temperatur und Feuchteverlauf und prüfe die bauliche Ursache."] },
    ],
  },
  {
    slug: "trockenbauwand-einfach-oder-doppelt-beplankt",
    title: "Trockenbau einfach oder doppelt beplanken?",
    description: "Trockenbauwand einfach oder doppelt beplanken: Stabilität, Schallschutz, Brandschutz, Gewicht, Öffnungen und Systemfreigaben vergleichen.",
    heading: "Einfach oder doppelt beplankt: Die Wandaufgabe entscheidet",
    intro: "Mehr Plattenlagen können Eigenschaften verbessern, ersetzen aber kein abgestimmtes Trockenbausystem und keine fachgerechte Ausführung.",
    takeaway: "Wähle die Beplankung nicht nach Quadratmeterpreis, sondern nach Wandhöhe, Lasten, Schall- und Brandschutzanforderung sowie dem freigegebenen System.",
    plannerHref: "/haus/innenausbau/trockenbau-rechner/",
    plannerLabel: "Trockenbau berechnen",
    sections: [
      { title: "Was eine zweite Lage verändern kann", paragraphs: ["Eine zusätzliche Lage kann je nach System Steifigkeit, Schallschutz oder Feuerwiderstand beeinflussen. Der Effekt hängt von Plattentyp, Profil, Befestigung, Fugenversatz und Anschluss ab."] },
      { title: "Öffnungen und Lasten", paragraphs: ["Türen, Installationen, Hängeschränke und Sanitärobjekte verändern das Profilraster. Plane Verstärkungen und Anschlüsse nach dem konkreten System, nicht erst nach dem Beplanken."] },
      { title: "Mengen richtig kalkulieren", paragraphs: ["Für die Bestellung zählen Wandseiten, Lagen, Plattenformat, Öffnungen, Verschnitt, Profile, Dämmung und Befestigung. Der Rechner liefert einen Mengenrahmen und ersetzt keine Systemfreigabe."] },
    ],
  },
] as const;

export function getSeoGuide(slug: string) {
  return SEO_GUIDES.find((guide) => guide.slug === slug);
}
