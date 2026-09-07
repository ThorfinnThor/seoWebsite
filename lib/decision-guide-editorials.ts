import type { SeoGuide } from "@/lib/seo-guides";

type EditorialDecisionGuide = SeoGuide & {
  scoreA: number;
  scoreB: number;
  indexable?: boolean;
};

const FEATURED_MOWER_GUIDE = "maehroboter-begrenzungskabel-oder-rtk-500-qm";

function deScore(value: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function applyEditorialDecisionGuide<T extends EditorialDecisionGuide>(guide: T): T {
  if (guide.slug !== FEATURED_MOWER_GUIDE) return guide;

  return {
    ...guide,
    indexable: true,
    title: "Mähroboter für 500 m² mit Kabel oder RTK",
    heading: "Mähroboter für 500 m² mit Kabel oder RTK",
    description: "Welche Navigation passt zu 500 m² Rasen. Begrenzungskabel und RTK nach Bäumen, Engstellen, Zonen, Aufwand und Folgekosten vergleichen.",
    intro: "Bei 500 m² entscheidet nicht die Fläche allein. RTK kann in einem offenen Garten sehr gut funktionieren. Unter großen Bäumen, nah an Hauswänden oder in schmalen Durchgängen kann ein Begrenzungskabel die verlässlichere Lösung sein. Hier geht es deshalb um deinen Garten und nicht um einen pauschalen Techniksieger.",
    takeaway: `Für eine überwiegend offene Fläche spricht die Gewichtung mit ${deScore(guide.scoreB)} von 5 für RTK. Das Begrenzungskabel erreicht ${deScore(guide.scoreA)} von 5 und bleibt sinnvoll, wenn der Satellitenempfang an wichtigen Stellen unsicher ist oder die Grenzen über Jahre unverändert bleiben.`,
    sections: [
      {
        title: "Was 500 m² für die Auswahl bedeuten",
        paragraphs: [
          "Eine Nennfläche von 500 m² sagt nur, dass die Flächenleistung grundsätzlich in die richtige Richtung geht. Zwei Gärten mit derselben Größe können technisch völlig verschieden sein. Eine offene rechteckige Rasenfläche stellt andere Anforderungen als mehrere Teilflächen zwischen Haus, Bäumen und Beeten.",
          "Miss deshalb die reine Rasenfläche und zeichne den Weg zur Ladestation, jede schmale Verbindung sowie dauerhaft ausgeschlossene Bereiche ein. Für die Navigation ist diese Skizze aussagekräftiger als das Grundstücksmaß.",
        ],
      },
      {
        title: "Wann RTK auf 500 m² überzeugt",
        paragraphs: [
          "RTK ermöglicht virtuelle Grenzen und Bereiche, die sich in der zugehörigen App verändern lassen. Das ist praktisch, wenn ein Trampolin wandert, ein Beet neu angelegt wird oder einzelne Rasenstücke unterschiedliche Mähzeiten erhalten sollen.",
          "Der Vorteil gilt nur bei passenden Empfangsbedingungen. Hohe Gebäude, dichte Baumkronen und überdachte Passagen gehören vor dem Kauf in die Standortprüfung. Auch die vorgesehene Position einer möglichen Referenzstation muss erreichbar sein und die Herstellervorgaben erfüllen.",
        ],
      },
      {
        title: "Wann ein Begrenzungskabel ruhiger planbar ist",
        paragraphs: [
          "Ein Begrenzungskabel legt die Arbeitsfläche physisch fest und ist nicht auf Satellitensicht angewiesen. Das kann in einem eingewachsenen Garten mit klaren, dauerhaft bestehenden Kanten ein wichtiger Vorteil sein.",
          "Dafür entstehen Arbeiten im Boden. Kabelwege, Leitkabel und Inseln müssen sauber geplant und dokumentiert werden. Bei einer späteren Gartenänderung kann eine neue Verlegung nötig werden. Ein möglicher Kabelbruch gehört ebenfalls zum Wartungsbild.",
        ],
      },
      {
        title: "Engstellen und getrennte Rasenstücke",
        paragraphs: [
          "Die schmalste Passage ist oft wichtiger als die gesamte Fläche. Miss ihre nutzbare Breite an mehreren Stellen und prüfe beim konkreten Modell, ob sie als Mähbereich, Transportweg oder gar nicht autonom befahren werden kann.",
          "Ein getrenntes Rasenstück ohne befahrbare Verbindung wird durch eine virtuelle Karte nicht automatisch erreichbar. Beim Kabelsystem kann ebenfalls manuelles Umsetzen nötig sein. Diese Alltagssituation sollte vor der Produktauswahl geklärt sein.",
        ],
      },
      {
        title: "Installation und spätere Änderungen",
        paragraphs: [
          "Bei RTK liegt ein großer Teil der Einrichtung in Karte, Empfang und Software. Beim Kabel liegt er in der physischen Verlegung. Beides braucht eine geplante Ladestation und klar definierte Grenzen zu Wasser, Straßen, Stufen und empfindlichen Flächen.",
          "Überlege auch, wie der Garten in drei Jahren aussehen soll. Häufige Änderungen sprechen eher für virtuelle Bereiche. Ein dauerhaft angelegter Garten kann den einmaligen Kabelaufwand besser rechtfertigen.",
        ],
      },
      {
        title: "Welche Kosten wirklich zusammengehören",
        paragraphs: [
          "Vergleiche nicht nur den Mähroboter. Zum Kabelsystem können Draht, Verbinder, Befestigung, Verlegearbeit und spätere Reparaturen gehören. Bei RTK können ein Zusatzmodul, eine Referenzstation, ein Datendienst oder weitere Systemteile nötig sein.",
          "Ein fairer Vergleich verwendet zwei vollständige Warenkörbe. Fehlende Bestandteile bleiben offen, bis der Lieferumfang des konkreten Angebots geklärt ist.",
        ],
      },
      {
        title: "Eine klare Entscheidung für deinen Garten",
        paragraphs: [
          "RTK ist für 500 m² besonders interessant, wenn große Teile des Rasens freie Sicht zum Himmel haben und du Grenzen flexibel anpassen möchtest. Ein Begrenzungskabel verdient den Vorzug, wenn Empfangsrisiken genau an unverzichtbaren Fahrwegen liegen und die Fläche dauerhaft feststeht.",
          "Bleibt der Empfang unklar, ist ein Test oder eine Standortprüfung sinnvoller als eine Entscheidung nach Produktwerbung. Die Navigation muss am schwierigsten Punkt funktionieren und nicht nur auf der offenen Hauptfläche.",
        ],
      },
      {
        title: "Was vor der Bestellung belegt sein sollte",
        paragraphs: [
          "Zum Schluss müssen Nennfläche, zulässige Steigung, Mindestpassage, Zonenlogik, Position der Ladestation und alle benötigten Systemteile zum gewählten Modell passen. Bei RTK kommen die konkreten Empfangsvoraussetzungen hinzu. Beim Kabelsystem brauchst du einen nachvollziehbaren Verlegeplan.",
          "Eine erfüllte Flächenangabe kann keinen dieser Punkte ersetzen. Sie ist nur die erste von mehreren Bedingungen für einen passenden Mähroboter.",
        ],
      },
    ],
    comparison: {
      caption: "Kabel und RTK auf einer Rasenfläche mit 500 m²",
      columns: ["Prüfpunkt", "Begrenzungskabel", "RTK"],
      rows: [
        ["Offene Hauptfläche", "Unabhängig von Satellitensicht", "Virtuelle Grenzen lassen sich flexibel anlegen"],
        ["Bäume und Hauswände", "Kein RTK Empfang nötig", "Empfang an den betroffenen Stellen prüfen"],
        ["Schmale Verbindung", "Kabelweg und Modellbreite müssen passen", "Transportweg und Modellbreite müssen passen"],
        ["Spätere Gartenänderung", "Kabel kann neu verlegt werden müssen", "Bereiche lassen sich je nach System in der App anpassen"],
        ["Vollständiger Aufwand", "Kabel, Zubehör, Verlegung und Reparatur", "Modul, mögliche Referenzstation, Einrichtung und Dienst"],
      ],
    },
    checklist: [
      "Reine Rasenfläche ohne Terrasse, Beete und Gebäude messen.",
      "Engste nutzbare Passage an mehreren Punkten erfassen.",
      "Bäume, Hauswände, Überdachungen und hohe Hecken einzeichnen.",
      "Position und Stromversorgung der Ladestation festlegen.",
      "Getrennte Rasenstücke und den realen Verbindungsweg prüfen.",
      "Empfangsvoraussetzungen der konkreten RTK Lösung abgleichen.",
      "Kabelweg mit Inseln und möglichem Leitkabel skizzieren.",
      "Vollständigen Lieferumfang beider Varianten vergleichen.",
      "Sicherheitsabstände und Herstellerangaben des Modells kontrollieren.",
    ],
    faqs: [
      {
        question: "Ist RTK für 500 m² grundsätzlich besser?",
        answer: "Nein. Auf einer offenen Fläche kann RTK sehr gut passen und spätere Änderungen erleichtern. Liegen wichtige Fahrwege unter dichten Baumkronen oder nah an hohen Gebäuden, muss der Empfang dort belegt sein. Ein Begrenzungskabel kann unter solchen Bedingungen ruhiger planbar sein.",
      },
      {
        question: "Reicht ein Mähroboter mit 500 m² Nennfläche?",
        answer: "Nicht automatisch. Die reine Rasenfläche, Komplexität, erlaubte Mähzeit, Steigung, Passagen und Zonen beeinflussen die notwendige Reserve. Der Rechner ordnet diese Punkte mit deinen Eingaben ein.",
      },
      {
        question: "Braucht RTK immer eine eigene Referenzstation?",
        answer: "Das hängt vom System ab. Manche Lösungen verwenden eine lokale Referenzstation, andere beziehen Korrekturdaten über einen Dienst. Prüfe beim konkreten Modell, welche Bestandteile, Verbindungen und laufenden Voraussetzungen gelten.",
      },
      {
        question: "Was passiert mit einem getrennten Rasenstück?",
        answer: "Ohne befahrbare Verbindung kann der Roboter die zweite Fläche möglicherweise nicht selbst erreichen. Je nach System wird ein Transportweg eingerichtet oder das Gerät muss manuell umgesetzt werden. Eine Zone in der App ersetzt keinen realen Fahrweg.",
      },
      {
        question: "Wie entscheide ich bei unsicherem Empfang?",
        answer: "Prüfe genau die schattigen und engen Bereiche, die der Roboter zwingend passieren muss. Eine Standortprüfung oder ein Test ist belastbarer als die Annahme, dass guter Empfang auf der Hauptfläche für den gesamten Garten reicht.",
      },
    ],
    example: {
      title: "Beispiel für einen Garten mit 500 m² Rasen",
      intro: "Die Fläche besteht aus einer offenen Hauptzone und einem schmaleren Bereich neben dem Haus.",
      steps: [
        { label: "Reine Rasenfläche", value: "500 m²" },
        { label: "Offene Hauptzone", value: "etwa 380 m²" },
        { label: "Bereich an der Hauswand", value: "etwa 120 m²" },
        { label: "Engste Verbindung", value: "vor Ort und am Modell zu prüfen" },
        { label: "Wert Begrenzungskabel", value: `${deScore(guide.scoreA)} von 5` },
        { label: "Wert RTK", value: `${deScore(guide.scoreB)} von 5` },
        { label: "Entscheidende Gegenprobe", value: "RTK Empfang an Hauswand und Passage" },
      ],
      result: "RTK bleibt die bevorzugte Richtung, wenn der Empfang im Seitenbereich stabil ist. Ohne diesen Nachweis bleibt das Begrenzungskabel die belastbare Gegenoption.",
      note: "Die Werte sind eine transparente Gewichtung und keine technische Freigabe für ein bestimmtes Modell.",
    },
    limitation: "Diese Einordnung ersetzt weder einen Empfangstest noch die Prüfung von Steigung, Passagen, Randabständen, Sicherheitsfunktionen und Installationsvorgaben des konkreten Mähroboters.",
    relatedLinks: [
      { label: "Mähroboter Rechner", href: "/garten/maehroboter-rechner/", description: "Rasenfläche, Steigung, Passagen und gewünschte Navigation mit eigenen Werten prüfen." },
      { label: "Rasenfläche richtig berechnen", href: "/garten/maehroboter-flaeche-berechnen/", description: "Teilflächen und feste Abzüge zu einer realistischen Mähfläche verbinden." },
      { label: "Steigung und Engstellen", href: "/garten/maehroboter-steigung-engstellen/", description: "Die schwierigsten Stellen des Gartens messen und mit den Modellgrenzen vergleichen." },
      { label: "Kabel oder kabellose Navigation", href: "/garten/maehroboter-begrenzungskabel-kabellos/", description: "Die Installationsprinzipien ohne Bindung an eine bestimmte Fläche verstehen." },
      { label: "Alle Mähroboter Vergleiche", href: "/ratgeber/vergleiche/maehroboter/", description: "Weitere Paarungen nach Gartenform, Bäumen, Zonen und Änderungen öffnen." },
    ],
  } as T;
}
