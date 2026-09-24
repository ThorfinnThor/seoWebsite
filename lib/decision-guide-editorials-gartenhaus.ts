import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyGartenhausEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "gartenhaus-metall-oder-wpc-kleines-budget") return limitedBudget(guide);
  if (guide.slug === "gartenhaus-kunststoff-oder-wpc-kleiner-garten") return smallGarden(guide);
  return guide;
}

function limitedBudget<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/vergleiche/gartenhaus/gartenhaus-metall-oder-wpc-kleines-budget/",
      primaryIntent: "Metall- und WPC-Gartenhäuser für ein begrenztes Budget anhand vollständiger Angebote und notwendiger Zusatzarbeiten vergleichen.",
      distinctValue: "Die Seite liefert ein ausfüllbares Kostenraster, trennt Pflichtposten von Wunschzubehör und zeigt an einer ausdrücklich fiktiven Rechnung, wann der günstigere Bausatz nicht das günstigere Projekt ist.",
      overlapReview: ["/ratgeber/gartenhaus-kosten-vergleich/", "/garten/gartenhaus-kosten/"],
    },
    title: "Metall oder WPC beim Gartenhaus mit kleinem Budget",
    heading: "Metall oder WPC beim Gartenhaus mit kleinem Budget",
    description: "Metall- und WPC-Gartenhäuser mit begrenztem Budget vergleichen. Bausatz, Boden, Fundament, Lieferung, Aufbau und spätere Kosten vollständig erfassen.",
    intro: "Ein günstiger Bausatz kann das Budget sprengen, wenn Boden, Fundament oder Lieferung fehlen. Für Metall und WPC lohnt deshalb ein Vergleich auf derselben nutzbaren Innenfläche und mit vollständigem Leistungsumfang.",
    takeaway: "Lass beide Angebote bis zum nutzbaren Gartenhaus durchrechnen. Die Summe aus Bausatz, Standortvorbereitung, Boden, Lieferung und Montage zeigt, welche Variante in dein Budget passt.",
    sections: [
      { title: "Die gleiche Aufgabe festlegen", paragraphs: [
        "Schreibe auf, was hinein soll und wie oft du zugreifst. Ein Gerätehaus ohne Arbeitsfläche ist mit einem kleinen Werkstatthaus nicht vergleichbar. Reale Innenmaße und Türlichte geben einen besseren Maßstab als die Modellbezeichnung.",
        "Vergleiche deshalb nur Angebote, die dieselbe Nutzung erfüllen. Wenn eine Variante ein größeres Fundament oder Zubehör benötigt, muss dieser Unterschied im Kostenblatt stehen statt in einer Fußnote verschwinden.",
      ] },
      { title: "Was im Bausatz enthalten ist", paragraphs: [
        "Bei Metallhäusern und WPC-Systemen unterscheiden sich Boden, Dachentwässerung, Verankerung und Oberflächenzubehör von Modell zu Modell. Der Materialname sagt nicht, was der Händler liefert. Fordere die Stückliste oder Montageanleitung beider Angebote an.",
        "Eine fehlende Bodenplatte kann das zunächst günstige Angebot verändern. Bei beiden Systemen sind Untergrund und Befestigung zu prüfen. Ein Haus ohne geeignete Aufstellung wird durch einen niedrigen Kaufpreis nicht funktionstüchtig.",
      ] },
      { title: "Fundament und Standort kosten mit", paragraphs: [
        "Miss die vorgesehene Fläche und prüfe Gefälle, Zufahrt, Entwässerung und Zugang zur Montage. Diese Bedingungen bestimmen Arbeit und Material für den Unterbau stärker als die spätere Wandoberfläche.",
        "Verwende für beide Varianten dieselbe Standortannahme. Falls Hersteller unterschiedliche Sockel oder Verankerungen verlangen, werden diese Positionen getrennt eingetragen. Baurecht und örtliche Vorgaben sind ebenfalls vor der Bestellung zu klären.",
      ] },
      { title: "Lieferung und Eigenleistung ehrlich bewerten", paragraphs: [
        "Prüfe Paketmaße, Anlieferstelle und Weg in den Garten. Eine Lieferung bis Bordsteinkante ist etwas anderes als Material am Aufstellort. Fehlen Helfer oder Werkzeug, entstehen weitere Kosten oder Zeitaufwand.",
        "Schreibe Eigenleistung nicht mit null Euro schön. Notiere zumindest benötigte Personen, geschätzte Arbeitszeit und offene Arbeiten. Bei einem Montageangebot sollte ausdrücklich stehen, ob Fundament, Boden und Entsorgung dazugehören.",
      ] },
      { title: "Betrieb über die ersten Jahre", paragraphs: [
        "Metall braucht je nach System Kontrolle von Beschichtung, Kanten, Befestigern und Kondensat. WPC benötigt keinen klassischen Holzschutzanstrich, doch Profile, Ausdehnungsfugen, Befestigung und Ersatzteile bleiben relevant. Keines der Materialien ist pauschal wartungsfrei.",
        "Für das Budget zählt, ob Verschleißteile und Ersatzprofile erhältlich sind. Ein zunächst günstiges Modell kann teuer werden, wenn eine beschädigte Tür oder Dachkomponente nicht ersetzt werden kann.",
      ] },
      { title: "Eine Beispielrechnung ohne Marktpreisbehauptung", paragraphs: [
        "Die Beispielbeträge unten sind frei gewählte Rechenwerte, keine aktuellen Angebote. Sie zeigen die Methode. Für Metall stehen 1.500 Euro Bausatz, 600 Euro Unterbau, 200 Euro Lieferung und 500 Euro Aufbau. Das ergibt 2.800 Euro.",
        "Für WPC stehen im selben Rechenblatt 1.800 Euro Bausatz, 600 Euro Unterbau, 200 Euro Lieferung und 500 Euro Aufbau. Das ergibt 3.100 Euro. Ändert sich nur ein fehlender Boden oder die Montage, kann der Abstand sofort anders ausfallen. Trage deshalb echte Angebote mit Datum ein.",
      ] },
      { title: "Wann die Auswahl entschieden ist", paragraphs: [
        "Eine Variante scheidet aus, wenn sie die nötige Innenfläche, Türbreite oder Standortfreigabe nicht erfüllt. Der günstigere Gesamtpreis allein repariert diese Lücke nicht. Ist die Nutzbarkeit gleich, entscheidet die vollständige Projektsumme innerhalb deines Budgets.",
        "Halte nach der Auswahl die offenen Kosten fest. Unbekannte Fundamentarbeiten, Transportbedingungen oder fehlende Ersatzteile sollten nicht als erledigt gelten, nur weil ein Bausatzpreis bekannt ist.",
      ] },
      { title: "Woran du bei knappem Budget nicht sparen solltest", paragraphs: [
        "Zubehör wie ein zusätzliches Regal kann warten. Ein geeigneter Untergrund, die erforderliche Verankerung und ein funktionierender Wasserablauf gehören dagegen zur Aufstellung. Sie aus dem Budget zu streichen würde die tatsächlichen Projektkosten nur verstecken.",
        "Wenn die vollständige Lösung zu teuer ist, kann ein kleineres Haus oder ein späterer Kauf vernünftiger sein. Vergleiche diese Alternative mit der wirklich benötigten Innenfläche und Türbreite. Eine zu kleine Tür lässt sich mit gespartem Geld nicht ausgleichen.",
      ] },
    ],
    comparison: { caption: "Das Kostenblatt für zwei vollständige Angebote", columns: ["Position", "Metallhaus", "WPC-Haus"], rows: [
      ["Nutzbare Innenfläche", "Innenmaß aus der Maßzeichnung", "Innenmaß aus der Maßzeichnung"],
      ["Bausatz und Boden", "Lieferumfang und Boden getrennt notieren", "Lieferumfang und Boden getrennt notieren"],
      ["Standort und Fundament", "Untergrund und Verankerung nach Anleitung", "Untergrund und Verankerung nach Anleitung"],
      ["Lieferung und Aufbau", "Anlieferpunkt, Helfer und Werkzeug erfassen", "Anlieferpunkt, Helfer und Werkzeug erfassen"],
      ["Spätere Kosten", "Korrosionsstellen und Ersatzteile prüfen", "Profile, Fugen und Ersatzteile prüfen"],
    ] },
    checklist: [
      "Nutzung, Innenmaß und lichte Türbreite festlegen.",
      "Für beide Modelle die vollständige Lieferliste anfordern.",
      "Boden, Fundament und Verankerung separat kalkulieren.",
      "Anlieferstelle und Transport in den Garten klären.",
      "Montagekosten und eigene Arbeitszeit sichtbar notieren.",
      "Ersatzteile und Pflegehinweise des konkreten Systems prüfen.",
      "Standortrecht vor dem Kauf klären.",
      "Gesamtsumme mit Quelle und Angebotsdatum dokumentieren.",
    ],
    faqs: [
      { question: "Ist ein Metallgartenhaus immer günstiger als WPC?", answer: "Nein. Ohne gleiche Größe, Ausstattung, Fundament und Montage ist ein Materialpreisvergleich wenig aussagekräftig. Entscheidend ist das vollständige Angebot für dieselbe Nutzung." },
      { question: "Darf ich Eigenleistung mit null Euro rechnen?", answer: "Für die reine Geldausgabe kannst du das tun, solltest Arbeitszeit, Helfer und Werkzeug aber separat ausweisen. Sonst verschwindet ein wichtiger Unterschied zwischen den Angeboten." },
      { question: "Warum sind die Zahlen im Beispiel keine Preisempfehlung?", answer: "Die Beträge sind frei gewählte Rechenwerte. Aktuelle Händlerpreise, Lieferumfänge und örtliche Arbeiten müssen aus echten Angeboten übernommen werden." },
    ],
    example: { title: "Zwei fiktive Kostenblätter", intro: "Die Zahlen illustrieren nur die Addition identischer Kostenpositionen.", steps: [
      { label: "Metall Bausatz", value: "1.500 €" }, { label: "Metall Unterbau, Lieferung, Aufbau", value: "600 € + 200 € + 500 €" },
      { label: "Metall gesamt", value: "2.800 €" }, { label: "WPC Bausatz", value: "1.800 €" },
      { label: "WPC Unterbau, Lieferung, Aufbau", value: "600 € + 200 € + 500 €" }, { label: "WPC gesamt", value: "3.100 €" },
    ], result: "Im frei gewählten Beispiel beträgt der Abstand 300 Euro.", note: "Keine der Zahlen ist ein aktueller Marktpreis. Fehlende Systemteile können das Ergebnis ändern." },
    limitation: "Die Beispielpreise sind keine Marktbeobachtung. Rechtliche Zulässigkeit, Fundamenteignung und Systemfreigaben müssen für den konkreten Standort geprüft werden.",
    sources: [
      { label: "Musterbauordnung und Auslegungshilfen", href: "https://www.bauministerkonferenz.de/verzeichnis.aspx?id=991&o=991", publisher: "Bauministerkonferenz", note: "Musterrecht als Ausgangspunkt, örtliches Recht bleibt verbindlich." },
      { label: "Gerätehausmaße und Montageunterlagen", href: "https://www.keter.com/de-de/faq/faqde.html", publisher: "Keter", note: "Herstellerbeispiel für getrennte Außen-, Innen- und Bodenmaße sowie Montageangaben." },
    ],
    relatedLinks: [
      { label: "Gartenhauskosten planen", href: "/garten/gartenhaus-kosten/", description: "Die vollständigen Projektkosten mit eigenen Beträgen ordnen." },
      { label: "Kostenvergleich für Gartenhäuser", href: "/ratgeber/gartenhaus-kosten-vergleich/", description: "Fehlende Posten in Angeboten erkennen." },
      { label: "Gartenhaus mit Boden", href: "/ratgeber/gartenhaus-mit-boden-worauf-achten/", description: "Boden und Unterbau vor der Bestellung prüfen." },
    ],
  } as T;
}

function smallGarden<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/vergleiche/gartenhaus/gartenhaus-kunststoff-oder-wpc-kleiner-garten/",
      primaryIntent: "Kunststoff- und WPC-Gartenhäuser für knappe Stellflächen anhand von Dachmaß, Fundament, Tür und tatsächlicher Innenfläche prüfen.",
      distinctValue: "Die Seite rechnet eine enge beispielhafte Stellfläche mit Dachüberstand durch und zeigt, weshalb dieselbe Grundfläche bei unterschiedlichem Systemaufbau keine gleich nutzbare Lösung ergibt.",
      overlapReview: ["/garten/gartenhaus-groesse/", "/ratgeber/gartenhaus-2x2-meter/"],
    },
    title: "Kunststoff oder WPC für ein Gartenhaus auf kleiner Fläche",
    heading: "Kunststoff oder WPC für ein Gartenhaus auf kleiner Fläche",
    description: "Kunststoff- und WPC-Gartenhäuser für kleine Gärten vergleichen. Dachüberstand, Innenmaß, Fundament, Türöffnung und Zugang konkret nachmessen.",
    intro: "Auf einer kleinen Stellfläche kann ein Dachüberstand den letzten freien Streifen aufbrauchen. Ob Kunststoff oder WPC besser passt, lässt sich nur am vollständigen System einschließlich Tür und Montagezugang beurteilen.",
    takeaway: "Vergleiche das größte Außenmaß, das Fundamentmaß und die lichte Innenfläche getrennt. Bei gleicher Grundfläche kann die nutzbare Breite deutlich anders ausfallen. Entscheidend sind die Maßzeichnungen der konkreten Modelle.",
    sections: [
      { title: "Die verfügbare Fläche ist kein Produktmaß", paragraphs: [
        "Miss den Abstand zwischen festen Grenzen an mehreren Stellen. Hecken, Fallrohre, Mauervorsprünge und Gefälle können die Breite entlang der geplanten Hauswand verändern. Notiere den kleinsten Wert.",
        "Zeichne zusätzlich den Weg zur Tür und den Raum zum Montieren oder Warten ein. Eine Außenkontur, die gerade in die Lücke passt, kann den einzigen nutzbaren Zugang blockieren.",
      ] },
      { title: "Dach, Wand und Boden haben eigene Maße", paragraphs: [
        "Hersteller unterscheiden Außenmaß, Innenmaß und Bodenmaß. Keter weist ausdrücklich darauf hin, dass der Dachüberhang das maximale Außenmaß gegenüber der Grundfläche vergrößert. Bei einem anderen System können die Unterschiede anders ausfallen.",
        "Für den Garten brauchst du das größte Maß über alles. Für das Fundament gilt die Montageanleitung. Für Fahrräder, Regale oder Geräte zählt die lichte Innenfläche. Ein einzelnes Quadratmeteretikett ersetzt keine dieser Angaben.",
      ] },
      { title: "Ein knappes Maßbeispiel", paragraphs: [
        "Angenommen, die freie Stelle misst 2,50 mal 2,00 Meter. Ein Hauskörper mit 2,00 mal 1,50 Meter scheint darin zunächst Platz zu finden. Ragt ein Dach an jeder Seite beispielhaft 15 Zentimeter über, wächst die maximale Kontur auf 2,30 mal 1,80 Meter.",
        "Übrig bleiben über beide Achsen nur je 20 Zentimeter. Wo diese Streifen liegen, hängt von der Positionierung ab. Als Montage- oder Wartungsweg lässt sich daraus nichts pauschal freigeben. Das Beispiel zeigt, weshalb ein Grundflächenvergleich allein zu optimistisch sein kann.",
      ] },
      { title: "Kunststoffsysteme konkret lesen", paragraphs: [
        "Bei Kunststoffhäusern können Wandprofile, Boden, Lüftung und Befestigungen Teil eines abgestimmten Bausatzes sein. Prüfe, ob Regale an den Wänden befestigt werden dürfen und welche Lasten die Anleitung nennt.",
        "Ein geringes Gewicht erleichtert die Handhabung einzelner Teile nicht automatisch die Verankerung. Gerade auf engem Raum muss die Montagefolge ausführbar sein, ohne ständig über die Grundstücksgrenze oder gegen eine Wand arbeiten zu müssen.",
      ] },
      { title: "WPC braucht ebenfalls ein passendes System", paragraphs: [
        "WPC-Profile sind nicht untereinander austauschbar. Wandstärke, Profilraster, Ausdehnungsfugen und Ersatzteile unterscheiden sich je nach Hersteller. Auf knapper Fläche können diese Details das lichte Innenmaß beeinflussen.",
        "Vergleiche die Türposition mit dem Transportweg für das größte Lagergut. Ein WPC-Haus mit günstiger Innenfläche nutzt wenig, wenn ein Fahrrad nicht durch die Tür oder um eine enge Ecke passt.",
      ] },
      { title: "Tür und Lagergut als Belastungsprobe", paragraphs: [
        "Miss das größte einzulagernde Stück mit Griffen und Anbauten. Die Türlichte ist kleiner als das Türblattmaß. Schwenkbereich und Schwelle gehören ebenfalls zum realen Weg.",
        "Zeichne im Innenraum die Position von Regalen und Geräten ein. Bei wenig Platz entscheidet oft der verbleibende Gang, nicht die gesamte Innenfläche. Regale, die nur bei offener Tür erreichbar sind, können die Nutzung stark einschränken.",
      ] },
      { title: "Standortentscheidung vor Materialpräferenz", paragraphs: [
        "Beide Materialien können für einen kleinen Garten infrage kommen, wenn das konkrete System zu Maß, Fundament und Nutzung passt. Aus Kunststoff oder WPC allein folgt kein Gewinner für kleine Flächen.",
        "Prüfe baurechtliche und nachbarrechtliche Fragen für den Standort gesondert. Ein rechnerisch passendes Maß ist keine Aussage über Grenzabstände, Genehmigung oder zulässige Höhe.",
      ] },
    ],
    comparison: { caption: "Die fünf Maße, die vor der Materialwahl fehlen können", columns: ["Maß oder Prüfung", "Kunststoffhaus", "WPC-Haus"], rows: [
      ["Größtes Außenmaß", "Dach und alle Überstände aus Datenblatt", "Dach und alle Überstände aus Datenblatt"],
      ["Boden- und Fundamentmaß", "Montageanleitung des Modells", "Montageanleitung des Modells"],
      ["Lichtes Innenmaß", "Innenbreite nach Wandprofilen", "Innenbreite nach Profilen und Fugen"],
      ["Türweg", "Lichte Öffnung und Schwenkbereich", "Lichte Öffnung und Schwenkbereich"],
      ["Montagezugang", "Reale Reihenfolge und benötigten Platz prüfen", "Reale Reihenfolge und benötigten Platz prüfen"],
    ] },
    checklist: [
      "Den kleinsten Abstand zwischen festen Grenzen messen.",
      "Dachmaß, Bodenmaß und Innenmaß des Modells getrennt notieren.",
      "Türlichte und Türschwenkbereich mit Lagergut abgleichen.",
      "Montagezugang und spätere Wartung an jeder Seite prüfen.",
      "Fundamentmaß und Verankerung aus der Anleitung übernehmen.",
      "Regale und größten Gegenstand in einer maßstäblichen Skizze einzeichnen.",
      "Örtliche Bau- und Grenzregeln vor der Bestellung klären.",
    ],
    faqs: [
      { question: "Reicht die angegebene Grundfläche als Stellmaß?", answer: "Nicht immer. Dachüberstand und andere Bauteile können das Außenmaß vergrößern. Für das Fundament kann wiederum ein anderes Maß gelten. Nutze die drei Angaben der konkreten Montageunterlagen." },
      { question: "Ist Kunststoff grundsätzlich platzsparender als WPC?", answer: "Nein. Die nutzbare Innenbreite hängt von Wandaufbau und Systemmaßen ab. Zwei konkrete Modelle müssen nach ihren Maßzeichnungen verglichen werden." },
      { question: "Kann ein Gartenhaus direkt an die Grenze gestellt werden?", answer: "Das lässt sich aus dem Material oder der Hausgröße nicht pauschal beantworten. Landesrecht, örtliche Vorgaben und der konkrete Standort sind gesondert zu prüfen." },
    ],
    example: { title: "Warum ein Dachüberstand eine kleine Fläche verändert", intro: "Frei gewählte Maße veranschaulichen die geometrische Prüfung.", steps: [
      { label: "Freier Standort", value: "2,50 m × 2,00 m" },
      { label: "Beispielhafter Hauskörper", value: "2,00 m × 1,50 m" },
      { label: "Angenommener Dachüberstand", value: "15 cm an jeder Seite" },
      { label: "Maximale Dachkontur", value: "2,30 m × 1,80 m" },
      { label: "Differenz zum Standort", value: "je Achse insgesamt 20 cm" },
    ], result: "Der Hauskörper passt rechnerisch, doch die verbleibenden Streifen erlauben keine pauschale Aussage zum Zugang.", note: "Produktmaße und örtliche Vorgaben müssen anstelle dieser Beispielwerte eingesetzt werden." },
    limitation: "Die Geometrie ersetzt weder die Maße der konkreten Montageanleitung noch eine rechtliche Standortprüfung.",
    sources: [
      { label: "Häufige Fragen zu Gerätehausmaßen", href: "https://www.keter.com/de-de/faq/faqde.html", publisher: "Keter", note: "Herstellererklärung zu Außenmaß, Innenmaß, Bodenmaß und Dachüberstand." },
      { label: "Musterbauordnung und Auslegungshilfen", href: "https://www.bauministerkonferenz.de/verzeichnis.aspx?id=991&o=991", publisher: "Bauministerkonferenz", note: "Musterrecht als Einstieg in die örtlich zu klärende Standortfrage." },
    ],
    relatedLinks: [
      { label: "Gartenhausgröße planen", href: "/garten/gartenhaus-groesse/", description: "Nutzung und Innenflächen mit eigenen Maßen prüfen." },
      { label: "Gartenhaus mit Boden", href: "/ratgeber/gartenhaus-mit-boden-worauf-achten/", description: "Boden und Fundamentmaß auseinanderhalten." },
      { label: "Gartenhaus für Fahrräder", href: "/garten/gartenhaus-fuer-fahrraeder/", description: "Tür und Rangierweg an einem konkreten Lagergut prüfen." },
    ],
  } as T;
}
