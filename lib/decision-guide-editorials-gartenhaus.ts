import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyGartenhausEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "gartenhaus-metall-oder-wpc-kleines-budget") return limitedBudget(guide);
  if (guide.slug === "gartenhaus-kunststoff-oder-wpc-kleiner-garten") return smallGarden(guide);
  if (guide.slug === "gartenhaus-metall-oder-wpc-langfristige-nutzung") return longTermUse(guide);
  if (guide.slug === "gartenhaus-metall-oder-kunststoff-wenig-pflege") return lowMaintenance(guide);
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

function longTermUse<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/gartenhaus/gartenhaus-metall-oder-wpc-langfristige-nutzung/",
      primaryIntent: "Metall- und WPC-Gartenhäuser für eine Nutzung über viele Jahre anhand von Alterung, Reparierbarkeit, Ersatzteilen und Garantiebedingungen vergleichen.",
      distinctValue: "Die Seite zerlegt beide Bauweisen in ihre alternden Bauteile, liest Garantiebedingungen als Hinweis auf Schwachstellen und rechnet einen fiktiven Kontrollplan über 20 Jahre durch, statt Kaufpreis oder Stellfläche zu vergleichen.",
      overlapReview: [
        "/ratgeber/gartenhaus-holz-oder-metall/",
        "/ratgeber/vergleiche/gartenhaus/gartenhaus-metall-oder-wpc-kleines-budget/",
        "/garten/gartenhaus-fundament/",
      ],
    },
    title: "Gartenhaus aus Metall oder WPC für viele Jahre Nutzung",
    heading: "Gartenhaus aus Metall oder WPC für viele Jahre Nutzung",
    description: "Metall oder WPC für ein Gartenhaus, das lange halten soll? Alternde Bauteile, Garantiebedingungen, Ersatzteile und Reparierbarkeit vor dem Kauf prüfen.",
    intro: "Ob ein Gartenhaus nach zwanzig Jahren noch dicht schließt, hängt selten am Wandmaterial allein. Bei Metall und WPC altern Beschichtung, Profile, Befestiger, Tür und Dach unterschiedlich. Wer lange plant, vergleicht deshalb die Bauteile, die irgendwann Aufmerksamkeit brauchen.",
    takeaway: "Für eine lange Nutzung zählt, welche Teile altern, ob du sie kontrollieren und ersetzen kannst und was die Garantiebedingungen ausschließen. Das konkrete System mit Ersatzteilversorgung schlägt das bessere Materialetikett.",
    sections: [
      { title: "Lange Nutzung heißt Instandhaltung planen", paragraphs: [
        "Ein Gartenhaus, das viele Jahre genutzt wird, erlebt Frost, Hitze, Starkregen, Schnee und unzählige Türöffnungen. Kein Material steckt das ohne Folgen weg. Die sinnvolle Frage lautet daher, wo Alterung sichtbar wird, wie früh du sie bemerkst und ob sich der betroffene Teil ohne Abriss reparieren lässt.",
        "Lege für die Entscheidung einen Zeitraum fest, etwa die Jahre bis zum geplanten Umbau des Gartens. Für diesen Zeitraum prüfst du beide Angebote. Ein Modell, das nach acht Jahren eine nicht mehr lieferbare Tür hat, ist für eine lange Nutzung schwächer als eines mit einfacher Wand und gut erhältlichen Ersatzteilen.",
      ] },
      { title: "Wie Metall altert", paragraphs: [
        "Bei Metallhäusern sitzt der Schutz meist in einer Verzinkung und einer zusätzlichen Beschichtung. Biohort beschreibt für seine Häuser feuerverzinktes Stahlblech mit Einbrennlackierung. Der Zinkschutz wirkt an kleinen Kratzern weiter, die Dauer hängt aber von Schichtdicke und Umgebung ab. Angaben für massive, stückverzinkte Bauteile lassen sich nicht auf dünnes Wandblech übertragen.",
        "Schwachstellen liegen typischerweise an Schnittkanten, Bohrungen, Schrauben, der Bodenschiene und dort, wo Wasser stehen bleibt. Notiere, welche Teile das Angebot als verzinkt, beschichtet oder aus Kunststoff beschreibt. Frage nach, ob Schrauben und Beschläge aus einem anderen Werkstoff bestehen, denn dort beginnen Schäden oft früher als an der Wandfläche.",
      ] },
      { title: "Wie WPC altert", paragraphs: [
        "WPC verbindet Holzfasern mit Kunststoff. Ein klassischer Holzschutzanstrich entfällt, doch die Profile bewegen sich bei Temperaturwechseln und können sich verfärben. Wie stark das ausfällt, hängt von Rezeptur, Profilform und Farbe ab. Daraus folgt keine pauschale Lebensdauer, sondern eine Liste von Prüfpunkten für das konkrete System.",
        "Achte auf Ausdehnungsfugen, die Art der Profilverbindung und die tragende Unterkonstruktion. Bei manchen Häusern trägt ein Rahmen aus Metall oder Holz, bei anderen tragen die Profile selbst. Wenn ein Profil beschädigt wird, muss es sich einzeln tauschen lassen, ohne die halbe Wand zu öffnen. Lass dir das anhand der Montageanleitung zeigen.",
      ] },
      { title: "Garantiebedingungen als Prüfliste lesen", paragraphs: [
        "Eine lange Garantiezeit wirkt beruhigend, sagt aber nur zusammen mit ihren Bedingungen etwas aus. Biohort nennt für Metallhäuser 20 Jahre Garantie gegen Durchrostung und schließt unter anderem nicht ausgebesserte Lackschäden, vernachlässigte Wartung von Schloss und Scharnieren, ungeeignete Standorte, fehlende Verankerung und Standorte bis 5 Kilometer vom Meer aus.",
        "Solche Ausschlüsse sind nützlich, weil sie zeigen, wo der Hersteller selbst Risiken sieht. Lies die Bedingungen beider Angebote vollständig und übertrage jede Pflicht in deinen Wartungsplan. Prüfe außerdem, ob die Garantie beim Abbau und Wiederaufbau erlischt. Bei Biohort ist das der Fall, was bei einem späteren Umzug wichtig sein kann.",
      ] },
      { title: "Ersatzteile und Reparierbarkeit", paragraphs: [
        "Über viele Jahre gehen Türen, Scharniere, Schlösser, Dachdichtungen und einzelne Wandteile häufiger kaputt als das ganze Haus. Frage vor dem Kauf, ob Einzelteile nachbestellt werden können und wie sie bezeichnet werden. Bewahre Stückliste, Rechnung und Montageanleitung so auf, dass du sie in zehn Jahren noch findest.",
        "Bei Metall lassen sich Lackschäden lokal ausbessern, wenn der passende Lack verfügbar ist. Bei WPC hängt die Reparatur davon ab, ob das Profil im gleichen Maß und Farbton noch geliefert wird. In beiden Fällen ist ein System mit Standardschrauben und zugänglichen Verbindungen langfristig leichter zu pflegen als eines mit verdeckten Spezialteilen.",
      ] },
      { title: "Standort und Fundament entscheiden mit", paragraphs: [
        "Ein Haus, das dauerhaft in Spritzwasser oder auf durchfeuchtetem Untergrund steht, altert schneller, egal aus welchem Material. Plane das Fundament so, dass Wasser abläuft und die Bodenschiene nicht im Nassen liegt. Der Untergrund muss nach den Vorgaben des Herstellers eben sein, sonst verziehen sich Türen und Fugen.",
        "Für eine lange Nutzung gehört auch die Verankerung dazu. Ein Haus, das sich bei Sturm bewegt, lockert Verbindungen und Dichtungen. Prüfe zusätzlich Laubfall, Schneelast und die Nähe zu Streusalz oder Dünger. Diese Einflüsse wirken auf Metall und WPC unterschiedlich, gehören aber bei beiden in die Standortprüfung.",
      ] },
      { title: "Wenn sich die Nutzung ändert", paragraphs: [
        "Aus dem Geräteschuppen wird später eine kleine Werkstatt, ein Fahrradlager oder ein Platz für Gartenmöbel. Prüfe, ob du an den Wänden Regale befestigen darfst und welche Lasten die Anleitung erlaubt. Bei Metallhäusern bieten Hersteller dafür oft eigenes Zubehör an, bei WPC kann die Unterkonstruktion über die Belastbarkeit entscheiden.",
        "Plane auch Strom, Licht und Lüftung mit, wenn sie in einigen Jahren dazukommen könnten. Eine Kabeldurchführung, die sich in einem Profil nachträglich nicht sauber abdichten lässt, wird zur Feuchtestelle. Was du heute schon vorsiehst, musst du später nicht mit Bohrungen in eine geschützte Oberfläche lösen.",
      ] },
      { title: "So fällt die Entscheidung", paragraphs: [
        "Metall hat Vorteile, wenn du ein System mit dokumentiertem Korrosionsschutz, klaren Garantiebedingungen und nachbestellbaren Teilen findest und regelmäßige Kontrollen von Kanten und Beschlägen übernimmst. WPC kann passen, wenn dir eine holzähnliche Optik ohne Anstrich wichtig ist und Profile, Fugen und Ersatzteile des Herstellers nachvollziehbar beschrieben sind.",
        "Fehlen bei einem Angebot Angaben zu Ersatzteilen, Wartung oder Garantiebedingungen, ist das für eine lange Nutzung ein echter Nachteil. Frag schriftlich nach und vergleiche die Antworten. Eine Variante ohne belastbare Auskunft sollte nicht deshalb gewinnen, weil ihr Material im Prospekt langlebiger klingt.",
      ] },
    ],
    comparison: { caption: "Woran beide Bauweisen über viele Jahre gemessen werden", columns: ["Prüfpunkt", "Metallhaus", "WPC-Haus"], rows: [
      ["Typische Alterung", "Beschichtung, Schnittkanten, Schrauben, Bodenschiene", "Verfärbung, Profilbewegung, Fugen, Unterkonstruktion"],
      ["Garantie", "Laufzeit und Ausschlüsse zu Korrosion lesen", "Laufzeit und Ausschlüsse zu Profilen und Verfärbung lesen"],
      ["Reparatur", "Lackausbesserung und Einzelbleche anfragen", "Einzelprofile in Maß und Farbe anfragen"],
      ["Verschleißteile", "Schloss, Scharniere, Dichtungen nach Anleitung warten", "Schloss, Scharniere, Dichtungen nach Anleitung warten"],
      ["Spätere Nutzung", "Zulässige Regallasten und Zubehör prüfen", "Tragende Unterkonstruktion und Befestigung prüfen"],
    ] },
    checklist: [
      "Den geplanten Nutzungszeitraum festlegen.",
      "Für beide Modelle Garantiebedingungen vollständig lesen.",
      "Jede Wartungspflicht aus den Bedingungen in einen Plan übertragen.",
      "Schriftlich fragen, welche Einzelteile nachbestellt werden können.",
      "Werkstoff von Schrauben, Beschlägen und Bodenschiene notieren.",
      "Fundament mit Wasserablauf und Verankerung nach Anleitung planen.",
      "Zulässige Wandlasten für spätere Regale prüfen.",
      "Rechnung, Stückliste und Anleitung dauerhaft aufbewahren.",
    ],
    faqs: [
      { question: "Hält ein Metallgartenhaus länger als ein WPC-Haus?", answer: "Das lässt sich nicht pauschal sagen. Die Dauer hängt vom konkreten Korrosionsschutz, der WPC-Rezeptur, dem Standort und der Wartung ab. Vergleiche die dokumentierten Angaben beider Systeme und die Ersatzteilversorgung." },
      { question: "Ist eine lange Garantie ein sicheres Zeichen für Langlebigkeit?", answer: "Sie ist ein Hinweis, mehr nicht. Entscheidend sind die Bedingungen. Ausschlüsse für Standort, Wartung oder Abbau können dazu führen, dass ein Schaden trotz langer Laufzeit nicht abgedeckt ist." },
      { question: "Was sollte ich nach dem Aufbau aufbewahren?", answer: "Rechnung, Stückliste mit Teilenummern, Montageanleitung und die Garantiebedingungen. Ohne diese Unterlagen wird die Nachbestellung einzelner Teile nach Jahren deutlich schwieriger." },
    ],
    example: { title: "Ein fiktiver Kontrollplan über 20 Jahre", intro: "Alle Werte sind frei gewählte Annahmen und zeigen nur, wie sich ein Wartungsplan zusammensetzt.", steps: [
      { label: "Geplanter Nutzungszeitraum", value: "20 Jahre" },
      { label: "Kontrollrunden pro Jahr", value: "2 × 45 Minuten = 1,5 Stunden" },
      { label: "Kontrollzeit gesamt", value: "20 × 1,5 Stunden = 30 Stunden" },
      { label: "Angenommener Tausch von Verschleißteilen", value: "alle 8 Jahre, also in Jahr 8 und 16" },
      { label: "Angenommene Garantielaufzeit im Angebot", value: "10 Jahre" },
      { label: "Jahre ohne Herstellergarantie", value: "20 − 10 = 10 Jahre" },
    ], result: "Im Beispiel liegt die Hälfte des Nutzungszeitraums außerhalb der Garantie. Dann tragen Ersatzteile und Reparierbarkeit die Nutzung.", note: "Garantielaufzeit, Wartungsintervalle und Kontrollzeit müssen aus den Unterlagen des konkreten Modells übernommen werden." },
    limitation: "Die Seite nennt keine Lebensdauer für Metall- oder WPC-Gartenhäuser, weil diese vom konkreten Produkt, Standort und Wartung abhängt. Herstellerangaben und Garantiebedingungen gelten nur für das jeweilige Modell.",
    sources: [
      { label: "Garantiebedingungen für Metall-Gerätehäuser", href: "https://www.biohort.com/de-de/garantiebedingungen", publisher: "Biohort", note: "Herstellerbeispiel für Garantielaufzeit, Wartungspflichten und Ausschlüsse bei Standort, Montage und Abbau." },
      { label: "Qualitätsangaben zu Stahlblech und Beschichtung", href: "https://www.biohort.com/de-de/qualitaet", publisher: "Biohort", note: "Herstellerangaben zu feuerverzinktem Stahlblech und Einbrennlackierung." },
      { label: "Korrosionsschutz für Stahl", href: "https://www.feuerverzinken.com/das-verfahren/korrosionsschutz-fuer-stahl", publisher: "Institut Feuerverzinken", note: "Grundlagen zum Zinkschutz von Stahl. Angaben zu stückverzinkten Bauteilen gelten nicht direkt für dünnes Wandblech." },
    ],
    relatedLinks: [
      { label: "Gartenhaus-Fundament planen", href: "/garten/gartenhaus-fundament/", description: "Einen Untergrund mit Wasserablauf und Verankerung vorbereiten." },
      { label: "Gartenhaus aus Holz oder Metall", href: "/ratgeber/gartenhaus-holz-oder-metall/", description: "Metall mit einer weiteren Bauweise vergleichen." },
      { label: "Gartenhaus-Zubehör", href: "/garten/gartenhaus-zubehoer/", description: "Regale und Ausstattung für eine spätere Nutzung einordnen." },
    ],
  } as T;
}

function lowMaintenance<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/gartenhaus/gartenhaus-metall-oder-kunststoff-wenig-pflege/",
      primaryIntent: "Herausfinden, ob ein Gartenhaus aus Metall oder aus Kunststoff im Alltag weniger Pflege braucht und welche Arbeiten bei beiden bleiben.",
      distinctValue: "Die Seite listet die verbleibenden Pflegearbeiten beider Bauweisen einzeln auf, verknüpft sie mit Herstellerangaben und Garantiepflichten und rechnet einen fiktiven Jahresaufwand in Minuten durch.",
      overlapReview: [
        "/ratgeber/gartenhaus-holz-oder-metall/",
        "/ratgeber/vergleiche/gartenhaus/gartenhaus-kunststoff-oder-wpc-kleiner-garten/",
        "/garten/gartenhaus-boden/",
      ],
    },
    title: "Welches Gartenhaus ist pflegeleichter, Metall oder Kunststoff?",
    heading: "Welches Gartenhaus ist pflegeleichter, Metall oder Kunststoff?",
    description: "Pflegeleichtes Gartenhaus gesucht? Metall und Kunststoff im Vergleich. Welche Arbeiten bleiben, was nie gestrichen wird und wo Pflege versteckt ist.",
    intro: "Weder ein Metall- noch ein Kunststoffhaus muss regelmäßig gestrichen werden. Pflegefrei sind beide trotzdem nicht. Der Unterschied liegt in den Arbeiten, die übrig bleiben, und darin, was passiert, wenn du sie auslässt.",
    takeaway: "Beide Bauweisen sparen den Anstrich. Bei Metall bleiben Lackschäden, Beschläge und Kondenswasser im Blick, bei Kunststoff Verankerung, Dach und Verbindungen. Wähle das System, dessen Restarbeiten du sicher erledigst.",
    sections: [
      { title: "Was pflegeleicht konkret bedeutet", paragraphs: [
        "Pflegeleicht heißt bei Gartenhäusern vor allem, dass kein jährlicher Holzschutzanstrich nötig ist. Keter schreibt für seine Kunststoffprodukte, dass sie nicht jährlich behandelt oder gestrichen werden müssen. Biohort nennt für seine Metallhäuser ausdrücklich, dass sie nicht gestrichen werden sollen. Dieser große Posten fällt bei beiden weg.",
        "Übrig bleiben Reinigung, Kontrolle und gelegentliche Kleinreparaturen. Ihr Umfang ist kleiner als beim Holzhaus, aber nicht null. Für die Entscheidung zählt, welche dieser Restarbeiten zu deinem Alltag passen und welche Folgen ein vergessener Handgriff beim jeweiligen Material hat.",
      ] },
      { title: "Reinigung bei beiden Bauweisen", paragraphs: [
        "Laut Keter reicht bei Kunststoff gelegentliches Abwaschen oder eine sanfte Hochdruckreinigung. Bei Metall gilt Ähnliches, wobei scharfe Reiniger und harte Bürsten die Beschichtung angreifen können. Prüfe in der Anleitung des konkreten Modells, welche Reinigungsmittel und welcher Wasserdruck erlaubt sind.",
        "Wichtiger als die Wandfläche ist das Dach. Laub, Nadeln und Moos halten Feuchtigkeit fest und verstopfen Rinnen. Wenn du das Dach nicht gefahrlos erreichst, wird jede Reinigung aufwendig. Plane den Standort daher so, dass du Dach und Rinne von einer sicheren Leiterposition aus säubern kannst.",
      ] },
      { title: "Die versteckte Pflege beim Metallhaus", paragraphs: [
        "Bei Metall ist die Beschichtung der wichtigste Schutz. Kratzer und Dellen sollten zeitnah ausgebessert werden. Biohort schließt in seinen Garantiebedingungen Lackschäden aus, die nicht rechtzeitig repariert wurden. Halte deshalb den passenden Ausbesserungslack bereit und kontrolliere besonders untere Kanten, Türbereich und Bodenschiene.",
        "Dazu kommen Beschläge. Biohort nennt das Ölen oder Fetten von Schließzylinder und Scharnieren als übliche Wartung, deren Fehlen die Garantie berührt. Ein weiterer Punkt ist Kondenswasser. Bei Temperaturwechseln kann sich an der Innenseite dünner Bleche Feuchte bilden. Lüftung und ein trockener Boden helfen, empfindliches Lagergut zu schützen.",
      ] },
      { title: "Die versteckte Pflege beim Kunststoffhaus", paragraphs: [
        "Kunststoff rostet nicht, und Kratzer müssen nicht lackiert werden. Dafür bestehen viele Kunststoffhäuser aus Paneelen, die über Steckverbindungen und Schrauben zusammengehalten werden. Kontrolliere nach Stürmen und Frostperioden, ob Verbindungen fest sitzen und die Tür noch sauber schließt.",
        "Bei größeren Häusern empfiehlt Keter einen Sockel aus Holz oder Beton als Fundament. Ein leichtes Haus braucht eine sichere Verankerung, sonst arbeitet es bei Wind. Prüfe auch, was die Anleitung zu Schneelast und Dachlast sagt, und räume schweren Schnee rechtzeitig ab, wenn das Modell dafür nicht ausgelegt ist.",
      ] },
      { title: "Was passiert, wenn du Pflege auslässt", paragraphs: [
        "Beim Metallhaus kann aus einem vergessenen Kratzer an einer feuchten Stelle mit der Zeit eine Korrosionsstelle werden. Das betrifft zunächst das Aussehen, später unter Umständen die Bauteile selbst und den Garantieanspruch. Je näher der Standort an Streusalz, Dünger oder salzhaltiger Luft liegt, desto wichtiger ist die regelmäßige Kontrolle.",
        "Beim Kunststoffhaus zeigen sich ausgelassene Kontrollen eher an gelockerten Verbindungen, verzogenen Türen oder einem Dach, das bei Last nachgibt. Der Schaden entsteht seltener schleichend am Material als plötzlich an der Konstruktion. Beides lässt sich mit wenigen Kontrollterminen im Jahr gut abfangen.",
      ] },
      { title: "Untergrund und Standort sparen Arbeit", paragraphs: [
        "Viele Pflegearbeiten entstehen am Boden. Steht ein Gartenhaus in einer Senke oder im Spritzwasserbereich, wird es schneller schmutzig und bleibt länger feucht. Ein ebener, entwässerter Untergrund und ein kleiner Abstand zu Beeten reduzieren Reinigungsaufwand bei beiden Materialien.",
        "Auch Bäume beeinflussen die Pflege stark. Unter einem Laubbaum fällt Dachreinigung deutlich häufiger an als auf einer freien Fläche. Bei Kunststoff kann volle Sonne die Oberfläche stärker beanspruchen, bei Metall den Innenraum aufheizen. Prüfe, was der Hersteller zum Standort angibt, bevor du dich festlegst.",
      ] },
      { title: "So triffst du die Wahl", paragraphs: [
        "Metall passt, wenn du bereit bist, Kratzer zeitnah auszubessern, Beschläge gelegentlich zu schmieren und für Lüftung zu sorgen. Dafür bekommst du eine stabile Hülle, bei der einige Hersteller lange Korrosionsgarantien nennen. Kunststoff passt, wenn du Lackarbeiten ganz vermeiden möchtest und Verankerung, Dach und Verbindungen regelmäßig kontrollierst.",
        "Vergleiche zwei konkrete Modelle und schreibe die Pflegehinweise aus beiden Anleitungen nebeneinander. Die Version mit den Aufgaben, die du realistisch erledigst, ist für dich die pflegeleichtere. Ein Material, das theoretisch weniger Arbeit macht, hilft nicht, wenn gerade seine eine Pflicht regelmäßig liegen bleibt.",
      ] },
    ],
    comparison: { caption: "Welche Pflegearbeiten bei Metall und Kunststoff bleiben", columns: ["Arbeit", "Metallhaus", "Kunststoffhaus"], rows: [
      ["Anstrich", "Entfällt, Herstellerhinweis zum Streichen beachten", "Entfällt laut Herstellerangabe"],
      ["Reinigung", "Wände und Dach mit erlaubten Mitteln", "Abwaschen oder sanfte Hochdruckreinigung"],
      ["Oberflächenschäden", "Kratzer zeitnah mit passendem Lack ausbessern", "Kein Lack nötig, Risse und Brüche prüfen"],
      ["Beschläge", "Schloss und Scharniere ölen oder fetten", "Schloss, Scharniere und Türlauf prüfen"],
      ["Konstruktion", "Kondenswasser und Lüftung im Blick behalten", "Verankerung, Verbindungen und Dachlast prüfen"],
    ] },
    checklist: [
      "Pflegehinweise beider Modelle aus der Anleitung nebeneinander schreiben.",
      "Garantiebedingungen auf Wartungspflichten prüfen.",
      "Erlaubte Reinigungsmittel und Wasserdruck notieren.",
      "Bei Metall passenden Ausbesserungslack mitbestellen.",
      "Bei Kunststoff Verankerung und zulässige Dachlast klären.",
      "Sicheren Zugang zu Dach und Rinne einplanen.",
      "Standort mit Blick auf Laubfall, Spritzwasser und Sonne wählen.",
      "Zwei feste Kontrolltermine pro Jahr im Kalender eintragen.",
    ],
    faqs: [
      { question: "Ist ein Kunststoffgartenhaus pflegeleichter als eines aus Metall?", answer: "Bei der Oberfläche oft ja, weil keine Lackschäden ausgebessert werden müssen. Dafür brauchen Verankerung, Verbindungen und Dach Aufmerksamkeit. Der Gesamtaufwand hängt vom konkreten Modell und Standort ab." },
      { question: "Muss ich ein Metallgartenhaus streichen?", answer: "In der Regel nicht. Biohort rät für seine Häuser ausdrücklich davon ab. Kratzer und Schäden an der Beschichtung sollten aber zeitnah mit passendem Lack ausgebessert werden." },
      { question: "Darf ich ein Kunststoffhaus mit dem Hochdruckreiniger säubern?", answer: "Keter nennt eine sanfte Hochdruckreinigung als möglich. Ob das für dein Modell gilt und welcher Abstand und Druck sinnvoll sind, steht in der Anleitung des Herstellers." },
    ],
    example: { title: "Ein fiktiver Pflegeaufwand pro Jahr", intro: "Die Minuten sind frei gewählte Annahmen und zeigen nur, wie du beide Pflegepläne vergleichbar machst.", steps: [
      { label: "Metall, Reinigung von Wand und Dach", value: "2 × 30 Minuten = 60 Minuten" },
      { label: "Metall, Beschläge schmieren und Lack ausbessern", value: "15 Minuten + 30 Minuten" },
      { label: "Metall gesamt", value: "60 + 15 + 30 = 105 Minuten" },
      { label: "Kunststoff, Reinigung von Wand und Dach", value: "2 × 30 Minuten = 60 Minuten" },
      { label: "Kunststoff, Verbindungen und Dachlast prüfen", value: "20 Minuten + 15 Minuten" },
      { label: "Kunststoff gesamt", value: "60 + 20 + 15 = 95 Minuten" },
    ], result: "Im Beispiel liegen beide Pläne nur 10 Minuten pro Jahr auseinander. Den Ausschlag geben die Folgen einer ausgelassenen Aufgabe.", note: "Setze die Pflegehinweise und Intervalle aus den Anleitungen deiner konkreten Modelle ein." },
    limitation: "Die Seite bewertet keine einzelnen Produkte. Pflegehinweise, zulässige Reinigungsmittel, Schneelasten und Garantiepflichten gelten nur für das jeweilige Modell und müssen dort nachgelesen werden.",
    sources: [
      { label: "Häufige Fragen zu Pflege und Garantie", href: "https://www.keter.com/de-de/faq/faqde.html", publisher: "Keter", note: "Herstellerangaben zu Reinigung, entfallendem Anstrich und Fundament bei Kunststoffprodukten." },
      { label: "Garantiebedingungen für Metall-Gerätehäuser", href: "https://www.biohort.com/de-de/garantiebedingungen", publisher: "Biohort", note: "Herstellerbeispiel für Wartungspflichten an Schloss, Scharnieren und Lackschäden." },
      { label: "Qualitätsangaben zu Stahlblech und Beschichtung", href: "https://www.biohort.com/de-de/qualitaet", publisher: "Biohort", note: "Herstellerangaben zu verzinktem Stahlblech, Einbrennlackierung und dem Hinweis, nicht zu streichen." },
    ],
    relatedLinks: [
      { label: "Gartenhaus aus Holz oder Metall", href: "/ratgeber/gartenhaus-holz-oder-metall/", description: "Den Pflegeaufwand von Holz zum Vergleich einordnen." },
      { label: "Gartenhaus-Boden", href: "/garten/gartenhaus-boden/", description: "Einen trockenen Boden gegen Feuchte und Kondenswasser planen." },
      { label: "Gartenhaus-Fundament", href: "/garten/gartenhaus-fundament/", description: "Ebenen Untergrund und Verankerung vorbereiten." },
    ],
  } as T;
}
