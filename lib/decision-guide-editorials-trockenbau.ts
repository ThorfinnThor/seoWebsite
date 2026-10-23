import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyTrockenbauEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "trockenbau-osb-gips-oder-zementbauplatte-badezimmer") return bathroomWall(guide);
  if (guide.slug === "trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke") return kitchenCabinets(guide);
  if (guide.slug === "trockenbau-gipskarton-standard-oder-osb-gips-installationen") return installationWall(guide);
  if (guide.slug === "trockenbau-gipsfaser-oder-zementbauplatte-schallschutz") return soundInsulationWall(guide);
  return guide;
}

function bathroomWall<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-osb-gips-oder-zementbauplatte-badezimmer/",
      primaryIntent: "Eine Badezimmerwand mit Holzwerkstoff und Gips gegen einen zementgebundenen Aufbau nach Wassereinwirkung und Systemnachweis einordnen.",
      distinctValue: "Die Seite trennt trockene Wandfelder von Spritzwasserzonen, zeigt die Mengenrechnung für eine Wand und macht Abdichtung, Durchdringungen sowie Systemfreigaben zur eigentlichen Entscheidung.",
      overlapReview: ["/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", "/haus/innenausbau/trockenbau-rechner/"],
    },
    title: "OSB mit Gips oder Zementbauplatte im Badezimmer",
    heading: "OSB mit Gips oder Zementbauplatte im Badezimmer",
    description: "Badezimmerwand planen und OSB mit Gips sowie Zementbauplatten nach Wassereinwirkung, Abdichtung, Befestigung und vollständigem Wandaufbau vergleichen.",
    intro: "Eine Badezimmerwand neben dem Waschbecken hat eine andere Aufgabe als die Wand in einer Dusche. Ob OSB mit Gips oder eine Zementbauplatte infrage kommt, lässt sich deshalb nicht aus dem Materialnamen allein beantworten.",
    takeaway: "Die tatsächlichen Wasserzonen der Wand bestimmen den Aufbau. Für jede Zone brauchst du eine passende Freigabe einschließlich Abdichtung, Fugen und Durchdringungen. Eine feuchtebeständige Platte allein dichtet die Wand nicht ab.",
    sections: [
      { title: "Wasser trifft nicht jede Wand gleich", paragraphs: [
        "Zeichne Waschbecken, Badewanne und Dusche in den Wandplan ein. Markiere Stellen mit regelmäßigem Spritzwasser und Bereiche ohne direkte Wasserbelastung getrennt. Genau diese Unterscheidung bestimmt, welche Untergründe und Abdichtungen zulässig sind.",
        "Knauf ordnet häusliche Badbereiche nach Wassereinwirkungsklassen ein und beschreibt unterschiedliche Platten für unterschiedliche Klassen. Die konkrete Einstufung muss zur Nutzung und zur aktuellen Systemdokumentation passen. Ein Bad erhält daher nicht pauschal einen einzigen Plattentyp.",
      ] },
      { title: "Was die Holzwerkstofflage leisten soll", paragraphs: [
        "OSB hinter einer Gipsplatte wird häufig wegen der Befestigungsmöglichkeiten erwogen. Im Bad kommt damit jedoch ein feuchteempfindlicher Baustoff in den Gesamtaufbau. Entscheidend sind Lage, Anschlüsse und der Nachweis der vollständigen Kombination, nicht ein allgemeiner Hinweis auf die Festigkeit der OSB-Platte.",
        "Lass für die betroffene Wasserzone schriftlich klären, ob Holzwerkstoff, Beplankung, Abdichtung und geplante Lasten gemeinsam freigegeben sind. Fehlt dieser Nachweis, ist eine gute Schraubhaltung kein Ersatz für Feuchteschutz.",
      ] },
      { title: "Die Zementbauplatte ist ebenfalls ein Systemteil", paragraphs: [
        "Zementgebundene Platten werden für stärker beanspruchte Nassbereiche angeboten. Daraus folgt keine automatische Freigabe jeder Platte für jede Dusche. Profilraster, Zahl der Plattenlagen, Schrauben, Fugenmaterial und Oberfläche gehören zur Systembeschreibung.",
        "Prüfe Gewicht und Bearbeitung zusammen mit dem vorgesehenen Wandaufbau. Eine robustere Trägerplatte kann mehr Montageaufwand verursachen. Für die Entscheidung zählt die dokumentierte Eignung an dieser Stelle der Wand, nicht eine pauschale Punktzahl für das Material.",
      ] },
      { title: "Die Abdichtung liegt in den Details", paragraphs: [
        "Plattenstöße, Ecken, Bodenanschluss und Rohrdurchführungen sind besonders empfindliche Stellen. Die Abdichtung muss dort mit dem ausgewählten Träger und den übrigen Systemteilen zusammenpassen. Fliesen und Fugen allein ersetzen diese Planung nicht.",
        "Bei einer Vorwand mit Wasseranschlüssen sollten Lage und Zahl der Durchdringungen vor der Beplankung feststehen. Später improvisierte Öffnungen verändern den geprüften Aufbau. Herstellerunterlagen und fachliche Planung müssen diese Stellen ausdrücklich erfassen.",
      ] },
      { title: "Fläche rechnen, Aufbau getrennt nachweisen", paragraphs: [
        "Für den Materialrahmen lässt sich die Wandfläche aus Breite mal Höhe bestimmen. Tür und andere Öffnungen werden separat erfasst. Plattenformate, Verschnitt, Zahl der Lagen und Öffnungsanschlüsse verändern die Bestellmenge. Der Trockenbaurechner hilft bei Mengen, bewertet aber keine Nassraumfreigabe.",
        "Bei einer 2,40 Meter breiten und 2,50 Meter hohen Wand entstehen 6,00 Quadratmeter Bruttofläche. Eine Öffnung von 0,90 mal 2,10 Meter reduziert die geometrische Fläche auf 4,11 Quadratmeter. Das ist keine Bestellmenge und sagt noch nichts über die zulässige Beplankung.",
      ] },
      { title: "Angebote ohne Scheingenauigkeit vergleichen", paragraphs: [
        "Fordere für beide Varianten einen vollständigen Wandaufbau an. Die Liste umfasst Profile, Befestigung, alle Plattenlagen, Fugen, Abdichtung, Oberbelag und die Ausführung an Installationen. Nur gleich weit ausgearbeitete Angebote lassen sich finanziell vergleichen.",
        "Eine reine Quadratmeterzahl oder ein Plattenpreis kann die notwendigen Systemteile verdecken. Bleiben Wassereinwirkungsklasse, Lastbefestigung oder Abdichtungsdetails offen, sollte auch der Preisvergleich als unvollständig gekennzeichnet bleiben.",
      ] },
      { title: "Welche Unterlagen die Entscheidung tragen", paragraphs: [
        "Lege zum Wandplan die aktuellen technischen Unterlagen des gewählten Systems. Darin sollten die zulässige Wasserzone, der konkrete Plattentyp, Fugen und Befestigung sowie die vorgesehene Abdichtung nachvollziehbar sein.",
        "Für eine Dusche oder einen anderen stark belasteten Bereich gehört die Ausführung in fachkundige Hände. Diese Seite ordnet die Fragen, sie gibt weder einen Wandaufbau noch eine Abdichtung frei.",
      ] },
      { title: "Bei einer vorhandenen Badwand", paragraphs: [
        "Im Bestand sind Plattenlagen und Abdichtung oft nicht sichtbar. Aus der Oberfläche lässt sich nicht zuverlässig ableiten, welche Materialien dahinter liegen oder ob eine frühere Durchdringung fachgerecht angeschlossen wurde.",
        "Steht ein Umbau an, sollte der vorhandene Aufbau dokumentiert und an kritischen Stellen fachkundig geprüft werden. Eine neue Zementbauplatte auf einer unbekannten Konstruktion beseitigt mögliche Feuchteprobleme dahinter nicht automatisch.",
      ] },
    ],
    comparison: { caption: "Welche Frage beide Wandaufbauten beantworten müssen", columns: ["Prüfpunkt", "OSB mit Gips", "Zementbauplatte"], rows: [
      ["Wasserzone", "Eignung der gesamten Kombination nachweisen", "Freigabe des konkreten Plattensystems prüfen"],
      ["Lasten", "Befestigung und Lage der Holzwerkstofflage dokumentieren", "Geeignete Befestigung im gewählten System nachweisen"],
      ["Abdichtung", "Verträglichkeit mit Träger, Fugen und Anschlüssen prüfen", "Abdichtung trotz feuchtebeständiger Platte einplanen"],
      ["Montage", "Zusätzliche Lage und deren Anschlüsse berücksichtigen", "Gewicht, Zuschnitt und Systemzubehör berücksichtigen"],
      ["Kosten", "Alle Lagen und Abdichtung gemeinsam kalkulieren", "Platte, Fugenmaterial und Abdichtung gemeinsam kalkulieren"],
    ] },
    checklist: [
      "Jede Wandfläche der passenden Wassereinwirkung zuordnen.",
      "Dusche, Wanne, Waschbecken und alle Durchdringungen in einer Skizze markieren.",
      "Für beide Varianten den vollständigen Wandaufbau anfordern.",
      "Abdichtung an Ecken, Fugen und Rohrdurchführungen planen lassen.",
      "Geplante Lasten und die dazugehörige Befestigung dokumentieren.",
      "Bruttofläche, Öffnungen und Plattenlagen getrennt rechnen.",
      "Nur Angebote mit gleichem Leistungsumfang gegenüberstellen.",
    ],
    faqs: [
      { question: "Ist eine Zementbauplatte allein wasserdicht genug?", answer: "Nein. Die Eignung der Platte ersetzt nicht die erforderliche Planung von Abdichtung, Fugen und Anschlüssen. Maßgeblich ist das vollständige System für die konkrete Wasserzone." },
      { question: "Kann OSB hinter Gips im Badezimmer verwendet werden?", answer: "Das hängt von der Wasserzone und vom nachgewiesenen Gesamtaufbau ab. Eine pauschale Freigabe für alle Badwände oder Duschen lässt sich aus der Schraubfestigkeit von OSB nicht ableiten." },
      { question: "Hilft der Trockenbaurechner bei der Materialwahl?", answer: "Er hilft bei Flächen und Mengen. Ob der Aufbau für Feuchte, Lasten und Abdichtung zulässig ist, muss anhand der aktuellen technischen Unterlagen gesondert geprüft werden." },
    ],
    example: { title: "Eine Badwand mit Türöffnung", intro: "Die Maße zeigen nur den geometrischen Ausgangspunkt der Mengenplanung.", steps: [
      { label: "Wand", value: "2,40 m × 2,50 m = 6,00 m²" },
      { label: "Türöffnung", value: "0,90 m × 2,10 m = 1,89 m²" },
      { label: "Geometrische Restfläche", value: "6,00 m² − 1,89 m² = 4,11 m²" },
      { label: "Noch offen", value: "Wasserzone, Lagen, Formate, Verschnitt und Abdichtung" },
    ], result: "4,11 m² geometrische Restfläche vor System- und Zuschnittplanung.", note: "Aus der Fläche entsteht keine Freigabe für eine bestimmte Platte oder Abdichtung." },
    limitation: "Die Seite ersetzt keine Planung und Freigabe des kompletten Wand- und Abdichtungssystems nach den aktuell geltenden Anforderungen.",
    sources: [
      { label: "Trockenbau in Feucht- und Nassräumen", href: "https://knauf.com/de-DE/kompetenzen/feuchteschutz/feucht-und-nassraeume", publisher: "Knauf", note: "Herstellerübersicht zu Wassereinwirkung, Plattensystemen und aktuellen Planungsunterlagen." },
      { label: "AQUAPANEL Cement Board Indoor", href: "https://knauf.com/de-DE/p/produkt/aquapanel-r-cement-board-indoor-12-5-lef-14749_0010", publisher: "Knauf", note: "Originalangaben zur zementgebundenen Platte und ihrer Verarbeitung im System." },
      { label: "Metallständerwände und Systemdaten", href: "https://knauf.com/de-DE/systeme/trockenbausysteme/w11-de-metallstaenderwaende", publisher: "Knauf", note: "Technische Unterlagen für vollständige Wandaufbauten statt isolierter Plattenwerte." },
    ],
    relatedLinks: [
      { label: "Trockenbaumaterial berechnen", href: "/haus/innenausbau/trockenbau-rechner/", description: "Wandfläche, Öffnungen und Materialrahmen mit eigenen Maßen bestimmen." },
      { label: "Trockenbauwand mit Tür", href: "/ratgeber/trockenbauwand-mit-tuer/", description: "Türöffnung und Anschlüsse bei einer leichten Trennwand planen." },
      { label: "Einfach oder doppelt beplankt", href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", description: "Die Zahl der Plattenlagen als Teil des kompletten Systems einordnen." },
    ],
  } as T;
}

function kitchenCabinets<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke/",
      primaryIntent: "Eine Trockenbauwand für hängende Küchenschränke anhand von Lastweg und Befestigung statt allein nach dem Plattennamen auswählen.",
      distinctValue: "Die Seite trennt Feuchteeignung von Tragfähigkeit und führt Schrankgewicht, Befestigungspunkte, Traverse und freigegebenes Wandsystem in einer überprüfbaren Lastliste zusammen.",
      overlapReview: ["/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", "/haus/innenausbau/trockenbau-profile-staenderwerk/"],
    },
    title: "Gipsfaser oder imprägnierte Gipsplatte für Küchenschränke",
    heading: "Gipsfaser oder imprägnierte Gipsplatte für Küchenschränke",
    description: "Hängende Küchenschränke an Trockenbauwänden planen. Gipsfaser und imprägnierte Gipsplatte nach Lastweg, Traverse und Feuchteanforderung einordnen.",
    intro: "Ein grüner Farbton auf der Platte beantwortet keine Frage zur Tragfähigkeit. Wer Küchenschränke an einer leichten Wand aufhängen will, braucht den Lastweg vom Schrank bis in die Unterkonstruktion.",
    takeaway: "Ermittle Gewicht und Lage der Schränke und lass die Befestigung für das konkrete Wandsystem nachweisen. Die Imprägnierung einer Gipsplatte betrifft Feuchte, nicht automatisch die zulässige Schranklast.",
    sections: [
      { title: "Die Schrankzeile auf der Wand einzeichnen", paragraphs: [
        "Notiere Breite, Höhe und Tiefe jedes Hängeschranks. Die Tiefe verändert den Hebelarm an der Wand. Schrankkörper, Türen und späterer Inhalt müssen bei der Planung gemeinsam berücksichtigt werden.",
        "Markiere im Grundriss und an der Wand die Befestigungsschiene und ihre Höhe. Ohne diese Angaben lässt sich weder eine Traverse passend setzen noch der Lastweg beurteilen. Eine Angabe wie vier Küchenschränke reicht dafür nicht.",
      ] },
      { title: "Was eine imprägnierte Gipsplatte aussagt", paragraphs: [
        "Imprägnierte Gipsplatten werden für bestimmte feuchtebeanspruchte Innenräume angeboten. Das kann in einer Küche relevant sein, sagt aber für sich genommen nichts über die zulässige Last einer Schrankbefestigung aus.",
        "Bei der Auswahl zählen Anzahl der Lagen, Befestiger, Profilabstände und die Herstellerangaben des gesamten Wandsystems. Eine bereits vorhandene Wand muss vor der Montage so weit dokumentiert sein, dass die geplanten Lasten ihr tatsächlich zugeordnet werden können.",
      ] },
      { title: "Gipsfaser kann andere Befestigungen erlauben", paragraphs: [
        "Für bestimmte Gipsfasersysteme veröffentlichen Hersteller eigene Lasttabellen und Befestigungsdetails. Das ist eine nützliche Grundlage, aber kein Freibrief für beliebige Schränke oder Schrauben. Plattendicke und Zahl der Lagen verändern die Angaben.",
        "Prüfe, ob die Tabelle eine einzelne Befestigung, eine Befestigungsgruppe oder eine Konsollast beschreibt. Übertrage keinen Wert auf eine andere Platte oder eine abweichende Unterkonstruktion.",
      ] },
      { title: "Die Traverse vor dem Schließen der Wand planen", paragraphs: [
        "Eine im Wandhohlraum eingeplante Traverse kann Lasten gezielt aufnehmen. Rigips nennt Küchenzeilen und Schränke ausdrücklich als Anwendungsfall für solche Verstärkungen. Ihre Position muss zur späteren Schrankaufhängung passen.",
        "Bei einer fertigen Wand ohne dokumentierte Verstärkung sollte die Befestigung nicht improvisiert werden. Kläre den vorhandenen Aufbau und lass eine geeignete Lösung für das reale Gewicht und die vorhandenen Befestigungspunkte festlegen.",
      ] },
      { title: "Wasser und Last sind zwei getrennte Prüfungen", paragraphs: [
        "An der Spüle oder einer Installationswand können Feuchte und Durchdringungen hinzukommen. Dafür ist zu prüfen, welche Platte und welche Oberflächenbehandlung für den dortigen Bereich geeignet sind. Diese Frage läuft zusätzlich zur Lastbemessung.",
        "Eine tragfähige Befestigung wird nicht automatisch feuchtegeeignet. Umgekehrt trägt eine imprägnierte Platte keinen schweren Schrank allein deshalb sicher, weil sie für eine Küchenwand geeignet ist.",
      ] },
      { title: "Eine Lastliste statt einer erfundenen Kilogrammzahl", paragraphs: [
        "Lege eine Liste mit Leergewicht, vorgesehenem Inhalt, Schranktiefe und Befestigungsart an. Hol die Angaben beim Küchenhersteller und bei den technischen Unterlagen des Wandsystems ein. Unbekannte Gewichte sollten als offen stehen bleiben.",
        "Die Trockenbaurechnung kann Wandfläche, Profile und Beplankung strukturieren. Eine zulässige Konsollast lässt sich daraus nicht ableiten. Dafür sind die Systemunterlagen und gegebenenfalls eine fachliche Bemessung nötig.",
      ] },
      { title: "Was auf der Baustelle festgehalten werden sollte", paragraphs: [
        "Vor dem Beplanken lohnt ein Foto der Unterkonstruktion mit Maßband und markierter Traverse. Später lässt sich so die Lage der Verstärkung wiederfinden, ohne in der Wand nach ihr zu suchen.",
        "Bei der Übergabe sollten System, Beplankung, Befestiger und die freigegebene Schrankaufhängung dokumentiert sein. Fehlt ein Teil dieser Kette, bleibt die Montageentscheidung offen.",
      ] },
    ],
    comparison: { caption: "Plattenwahl und Schrankbefestigung getrennt prüfen", columns: ["Frage", "Imprägnierte Gipsplatte", "Gipsfaserplatte"], rows: [
      ["Feuchte im Küchenbereich", "Freigabe der konkreten Platte und Oberfläche prüfen", "Freigabe des konkreten Systems prüfen"],
      ["Schranklast", "Lasttabellen für Aufbau und Befestiger erforderlich", "Lasttabellen für Aufbau und Befestiger erforderlich"],
      ["Traverse", "Bei Bedarf vor der Beplankung einplanen", "Bei Bedarf vor der Beplankung einplanen"],
      ["Fertige Wand", "Aufbau vor einer Lastzusage feststellen", "Aufbau vor einer Lastzusage feststellen"],
    ] },
    checklist: [
      "Schrankbreite, Tiefe und Aufhängehöhe eintragen.",
      "Leergewicht und geplante Beladung beim Küchenanbieter erfragen.",
      "Befestigungsschiene und Anzahl der Aufhängepunkte dokumentieren.",
      "Plattenlagen, Profilsystem und Befestiger der Wand feststellen.",
      "Traverse oder andere Verstärkung passend zur Aufhängung planen.",
      "Feuchtebeanspruchung im Spülenbereich separat prüfen.",
      "Zulässige Last anhand der passenden Herstellerunterlagen bestätigen lassen.",
    ],
    faqs: [
      { question: "Trägt eine grüne Gipsplatte automatisch Küchenschränke?", answer: "Nein. Die Imprägnierung betrifft den Feuchteschutz der Platte. Die Schranklast hängt vom gesamten Wandsystem und der dokumentierten Befestigung ab." },
      { question: "Ist Gipsfaser immer die stärkere Lösung?", answer: "Nicht pauschal. Entscheidend sind die Lastwerte des konkreten Systems, die Plattenlagen, Befestiger und gegebenenfalls eine Traverse. Ein Vergleich nur nach Materialnamen reicht nicht." },
      { question: "Kann ich bei einer fertigen Wand nachträglich eine Traverse annehmen?", answer: "Nein. Ohne Dokumentation muss der vorhandene Wandaufbau festgestellt werden. Eine geeignete Befestigung ist für diesen Aufbau und die tatsächliche Last zu wählen." },
    ],
    example: { title: "Ein Hängeschrank mit unbekannter Beladung", intro: "Das Beispiel zeigt, welche Angaben vor einer Lastentscheidung fehlen können.", steps: [
      { label: "Schrankbreite", value: "80 cm" },
      { label: "Schranktiefe", value: "35 cm" },
      { label: "Leergewicht", value: "aus dem Datenblatt eintragen" },
      { label: "Inhalt und Befestigung", value: "noch zu bestimmen" },
      { label: "Wandaufbau", value: "Platte, Lagen, Profile und Traverse dokumentieren" },
    ], result: "Ohne Gewicht und Wandsystem gibt es keine seriöse zulässige Schranklast.", note: "Die Beispielmaße sind keine Lastfreigabe." },
    limitation: "Die Seite gibt keine Befestigung oder Tragfähigkeit frei. Schranklast und Wandsystem müssen anhand der aktuellen technischen Unterlagen fachlich geprüft werden.",
    sources: [
      { label: "Lastenbefestigung mit Rigidur H", href: "https://www.rigips.de/topthema/lastenbefestigungen-rigidur-h-gipsfaserplatten", publisher: "Rigips", note: "Herstellerangaben zur Befestigung an konkreten Gipsfasersystemen." },
      { label: "Rigips Traverse für Konsollasten", href: "https://www.rigips.de/produktneuheit/rigips-traverse", publisher: "Rigips", note: "Herstellerbeispiel für eine Verstärkung im Wandhohlraum bei Schränken." },
      { label: "Metallständerwände und Systemdaten", href: "https://knauf.com/de-DE/systeme/trockenbausysteme/w11-de-metallstaenderwaende", publisher: "Knauf", note: "Technische Unterlagen für den kompletten Wandaufbau." },
    ],
    relatedLinks: [
      { label: "Trockenbauprofile planen", href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", description: "Raster und Unterkonstruktion der Wand einordnen." },
      { label: "Trockenbaumaterial berechnen", href: "/haus/innenausbau/trockenbau-rechner/", description: "Fläche und Materialbedarf getrennt von der Lastfreigabe berechnen." },
      { label: "Einfach oder doppelt beplankt", href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", description: "Plattenlagen als Bestandteil des gesamten Systems betrachten." },
    ],
  } as T;
}

function installationWall<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-osb-gips-installationen/",
      primaryIntent: "Eine Installationswand oder Vorwand für Leitungen, Dosen und Anbauteile mit Standard-Gipskarton oder mit OSB unter einer Gipsplatte planen.",
      distinctValue: "Die Seite beginnt beim Leitungs- und Anbauplan, trennt Hohlraumtiefe, Durchdringungen und punktuelle Lasten voneinander und zeigt, wann eine durchgehende OSB-Lage gegenüber gezielten Verstärkungen im Ständerwerk überhaupt einen Vorteil bringt.",
      overlapReview: ["/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", "/haus/innenausbau/trockenbau-tuer-oeffnungen/", "/ratgeber/vergleiche/trockenbau/trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke/"],
    },
    title: "Gipskarton oder OSB mit Gips für die Installationswand",
    heading: "Gipskarton oder OSB mit Gips für die Installationswand",
    description: "Installationswand oder Vorwand planen: Standard-Gipskarton und OSB mit Gipsplatte nach Leitungen, Dosen, Anbauteilen und Wandsystem vergleichen.",
    intro: "Eine Installationswand nimmt Leitungen, Schalterdosen und oft auch Anbauteile auf. Bevor du zwischen reiner Gipskartonbeplankung und OSB unter Gips wählst, sollte feststehen, was genau in und an dieser Wand sitzen wird.",
    takeaway: "Plane vor der Plattenwahl Leitungswege, Dosen und Anbaupunkte. Erst daraus ergibt sich, ob eine Gipskartonwand mit gezielten Verstärkungen reicht oder ob eine durchgehende Holzwerkstofflage im geprüften System sinnvoll ist. Die OSB-Lage ersetzt keinen Lastnachweis.",
    sections: [
      { title: "Was in die Wand kommt, entscheidet über die Platte", paragraphs: [
        "Lege einen Plan mit allen Leitungen, Steckdosen, Schaltern, Wasser- oder Abwasseranschlüssen und geplanten Anbauteilen an. Eine Vorwand für einige Elektroleitungen stellt andere Anforderungen als eine Installationswand, hinter der Rohre verlaufen und an der später ein Waschtisch, ein Regal oder ein Fernseher hängt.",
        "Notiere zu jedem Punkt die Höhe über dem fertigen Boden und den Abstand zur nächsten Ecke. Mit diesen Angaben lässt sich später das Ständerraster so legen, dass Dosen, Rohre und Verstärkungen nicht miteinander kollidieren. Ohne diesen Plan wird die Plattenfrage zu früh gestellt.",
      ] },
      { title: "Hohlraumtiefe vor Plattenwahl", paragraphs: [
        "Die Tiefe der Unterkonstruktion bestimmt, welche Rohre, Leerrohre und Dosen im Hohlraum Platz finden. Knauf beschreibt für Installationsaufgaben eigene Wandsysteme, etwa mit verlaschtem Doppelständerwerk. Ob eine einfache Vorwandschale oder ein solches System nötig ist, hängt von Leitungsquerschnitten, Gefälle von Abwasserleitungen und Dämmung ab.",
        "Eine zusätzliche OSB-Lage verändert die Hohlraumtiefe nicht, sie macht die Wand aber dicker und schwerer. Prüfe deshalb, ob Raumbreite, Türanschlüsse und Fußleisten den zusätzlichen Aufbau aufnehmen können, bevor du dich für die zweilagige Holzwerkstoffvariante entscheidest.",
      ] },
      { title: "Was Standard-Gipskarton leisten kann", paragraphs: [
        "Eine Beplankung aus Gipsplatten auf Metallständern ist der übliche Aufbau für nichttragende Innenwände. Für Leitungen und Hohlwanddosen ist sie gut geeignet, wenn Dosen, Bohrungen und Schnitte innerhalb der Herstellerangaben bleiben. Anbauteile werden dabei in der Regel über passende Hohlraumdübel, Profile oder Verstärkungen befestigt.",
        "Die Grenze liegt nicht im Plattennamen, sondern in der Befestigung. Welche Last an welcher Stelle zulässig ist, steht in den Unterlagen des Systems. Für schwerere Anbauteile planen Hersteller Traversen oder ähnliche Verstärkungen im Hohlraum ein, die vor dem Schließen der Wand gesetzt werden.",
      ] },
      { title: "Wann OSB unter Gips erwogen wird", paragraphs: [
        "Eine durchgehende OSB-Lage unter der Gipsplatte wird oft geplant, damit später an beliebiger Stelle geschraubt werden kann. Das kann bei Werkstattwänden oder Wänden mit vielen wechselnden Anbauten praktisch sein. Für ein einzelnes schweres Bauteil an bekannter Stelle ist eine gezielte Verstärkung häufig die übersichtlichere Lösung.",
        "Die Kombination muss als Ganzes zur Unterkonstruktion passen. Plattendicke, Schraubenabstände, Fugenversatz zwischen den Lagen und Brandschutzanforderungen gehören in die Planung. Lass dir zeigen, dass dieser Aufbau dokumentiert ist, statt die Tragfähigkeit der OSB-Platte allein als Begründung zu nehmen.",
      ] },
      { title: "Dosen und Durchdringungen zählen", paragraphs: [
        "Jede Schalterdose und jede Rohrdurchführung ist eine Öffnung in der Beplankung. Bei einer zweilagigen Wand mit OSB müssen die Öffnungen durch beide Lagen sauber geschnitten werden. Hohlwanddosen müssen zur gesamten Beplankungsdicke passen, damit sie fest sitzen.",
        "Liegt die Wand an einer Grenze mit Brand- oder Schallschutzanforderung, verändern Öffnungen das geprüfte Ergebnis. Kläre in diesem Fall, welche Dosen, Abschottungen oder Abstände das System vorsieht. Gegenüberliegende Dosen auf beiden Wandseiten sind ein häufiger Schwachpunkt.",
      ] },
      { title: "Feuchte an der Installationswand", paragraphs: [
        "Verlaufen Wasserleitungen in der Wand oder hängt ein Waschtisch davor, kommt Feuchte als weitere Prüffrage hinzu. Standard-Gipskarton ist für trockene Innenräume vorgesehen. Für Spritzwasserbereiche gelten eigene Plattentypen und Abdichtungsanforderungen.",
        "OSB hinter Gips verbessert den Feuchteschutz nicht. Im Gegenteil bringt sie einen feuchteempfindlichen Holzwerkstoff in die Wand. Für Bäder ist deshalb ein eigener Vergleich sinnvoll, der Wasserzonen und Abdichtung in den Mittelpunkt stellt.",
      ] },
      { title: "Mengen getrennt nach Material rechnen", paragraphs: [
        "Bei Standard-Gipskarton werden eine oder zwei Lagen desselben Plattentyps gerechnet. Bei OSB unter Gips entstehen zwei verschiedene Materialpositionen mit eigenen Formaten, Schrauben und eigenem Verschnitt. Beide Varianten haben je Lage dieselbe geometrische Fläche, aber nicht dieselbe Stückliste.",
        "Der Trockenbaurechner hilft, Wandfläche, Profile und Plattenmengen zu strukturieren. Ob die Wand für ein bestimmtes Anbauteil geeignet ist, lässt sich daraus nicht ablesen. Diese Frage beantworten Systemunterlagen und gegebenenfalls eine fachliche Bemessung.",
      ] },
      { title: "Angebote für beide Varianten vergleichbar machen", paragraphs: [
        "Fordere für beide Wandaufbauten dieselben Angaben an: Profiltyp und Achsabstand, Zahl und Art der Plattenlagen, Verstärkungen, Dosen, Durchführungen und Spachtelstufe. Erst dann wird sichtbar, ob die OSB-Lage nur Material kostet oder auch Montagezeit und Zubehör verändert.",
        "Bleibt bei einem Angebot offen, wie Anbauteile befestigt werden, ist der Preisvergleich unvollständig. Eine scheinbar günstigere Wand kann später zusätzliche Verstärkungen oder Umbauten erfordern, wenn die Lastpunkte nicht eingeplant waren.",
      ] },
    ],
    comparison: { caption: "Installationswand: Fragen an beide Aufbauten", columns: ["Prüfpunkt", "Standard-Gipskarton", "OSB unter Gipsplatte"], rows: [
      ["Leitungen im Hohlraum", "Hohlraumtiefe der Unterkonstruktion prüfen", "Hohlraumtiefe identisch, Wand insgesamt dicker"],
      ["Anbauteile", "Verstärkung an bekannten Punkten einplanen", "Befestigung im dokumentierten Gesamtaufbau nachweisen"],
      ["Dosen", "Hohlwanddosen passend zur Beplankung wählen", "Dosen und Schnitte durch beide Lagen planen"],
      ["Feuchte", "Für trockene Bereiche vorgesehen", "Holzwerkstoff bringt zusätzliche Feuchteempfindlichkeit"],
      ["Mengen", "Eine Materialposition je Lage", "Zwei Materialpositionen mit eigenen Formaten und Schrauben"],
    ] },
    checklist: [
      "Alle Leitungen, Dosen und Anschlüsse mit Höhe und Abstand in einen Wandplan eintragen.",
      "Anbauteile mit Position, Gewicht und Befestigungsart auflisten.",
      "Hohlraumtiefe für Rohre, Leerrohre und Dämmung festlegen.",
      "Verstärkungen oder Traversen vor dem Schließen der Wand positionieren.",
      "Für die OSB-Variante den vollständigen, dokumentierten Wandaufbau anfordern.",
      "Feuchte- und Spritzwasserbereiche gesondert prüfen.",
      "Plattenmengen getrennt nach Material und Lage rechnen.",
    ],
    faqs: [
      { question: "Brauche ich für eine Installationswand immer OSB hinter dem Gips?", answer: "Nein. Für Leitungen und Dosen reicht eine passende Gipskartonbeplankung meist aus. Anbauteile werden über geeignete Befestiger oder gezielte Verstärkungen befestigt, deren Lage vor dem Beplanken feststehen sollte." },
      { question: "Darf ich an einer Wand mit OSB-Lage überall beliebig schwere Teile aufhängen?", answer: "Nicht pauschal. Die zulässige Last hängt vom gesamten Aufbau, den Befestigern und der Unterkonstruktion ab. Dafür sind die Unterlagen des Systems oder eine fachliche Bemessung maßgeblich." },
      { question: "Ist OSB unter Gips im Bad eine gute Idee?", answer: "Das lässt sich nur mit Blick auf die Wasserzone und den nachgewiesenen Gesamtaufbau beantworten. Die OSB-Lage verbessert den Feuchteschutz nicht, Abdichtung und Plattenwahl müssen gesondert geplant werden." },
    ],
    example: { title: "Eine Vorwand mit acht Durchdringungen", intro: "Die Zahlen zeigen, wie sich die Stückliste zwischen den Varianten unterscheidet, obwohl die Fläche gleich bleibt.", steps: [
      { label: "Wandfläche einseitig", value: "3,20 m × 2,60 m = 8,32 m²" },
      { label: "Gipskarton zweilagig", value: "2 × 8,32 m² = 16,64 m² Gipsplatten" },
      { label: "OSB plus Gips", value: "8,32 m² OSB + 8,32 m² Gipsplatten = 16,64 m² in zwei Positionen" },
      { label: "Durchdringungen", value: "6 Elektrodosen + 2 Wasseranschlüsse = 8 Öffnungen je Lage" },
      { label: "Noch offen", value: "Formate, Verschnitt, Verstärkungen, Befestiger und Systemnachweis" },
    ], result: "16,64 m² Plattenfläche vor Verschnitt in beiden Varianten, aber unterschiedliche Materialpositionen und Öffnungen in jeder Lage.", note: "Die Mengen sagen nichts über zulässige Lasten oder die Eignung im Feuchtebereich aus." },
    limitation: "Die Seite gibt keinen Wandaufbau und keine Befestigung frei. Lasten, Feuchtebereiche und Brand- oder Schallschutzanforderungen müssen anhand der aktuellen Systemunterlagen fachlich geprüft werden.",
    sources: [
      { label: "Metallständerwände und Installationswände", href: "https://knauf.com/de-DE/systeme/trockenbausysteme/w11-de-metallstaenderwaende", publisher: "Knauf", note: "Systemübersicht einschließlich Installationswand mit Doppelständerwerk und technischen Unterlagen." },
      { label: "Rigips Traverse für Konsollasten", href: "https://www.rigips.de/produktneuheit/rigips-traverse", publisher: "Rigips", note: "Herstellerbeispiel für eine Verstärkung im Wandhohlraum für Anbauteile." },
      { label: "Planungs- und Baukataloge", href: "https://www.rigips.de/planen-und-bauen-kataloge", publisher: "Rigips", note: "Technische Kataloge mit Wandsystemen und Ausführungsdetails." },
    ],
    relatedLinks: [
      { label: "Trockenbaumaterial berechnen", href: "/haus/innenausbau/trockenbau-rechner/", description: "Wandfläche, Lagen und Materialrahmen der Vorwand mit eigenen Maßen bestimmen." },
      { label: "Trockenbauprofile planen", href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", description: "Ständerraster und Hohlraumtiefe passend zu Leitungen festlegen." },
      { label: "Einfach oder doppelt beplankt", href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", description: "Die Zahl der Plattenlagen als Teil des Systems einordnen." },
    ],
  } as T;
}

function soundInsulationWall<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-gipsfaser-oder-zementbauplatte-schallschutz/",
      primaryIntent: "Für eine Trockenbauwand mit besserem Schallschutz einordnen, ob Gipsfaser oder Zementbauplatte überhaupt die entscheidende Stellschraube ist.",
      distinctValue: "Die Seite verschiebt die Frage vom Plattennamen zum geprüften Wandsystem, erklärt Flächenmasse, Lagen, Ständerwerk, Dämmung, Anschlüsse und Flanken als eigentliche Einflussgrößen und zeigt, warum eine Zementbauplatte vor allem für Feuchte und nicht für Schall ausgewählt wird.",
      overlapReview: ["/ratgeber/trockenbau-schallschutzwand/", "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", "/ratgeber/vergleiche/trockenbau/trockenbau-osb-gips-oder-zementbauplatte-badezimmer/"],
    },
    title: "Gipsfaser oder Zementbauplatte für mehr Schallschutz",
    heading: "Gipsfaser oder Zementbauplatte für mehr Schallschutz",
    description: "Trockenbauwand mit Schallschutz planen: Gipsfaser und Zementbauplatte nach Wandsystem, Lagen, Dämmung, Anschlüssen und geprüften Rw-Werten einordnen.",
    intro: "Wer eine leisere Trennwand möchte, sucht oft nach der besseren Platte. Beim Schallschutz entscheidet aber nicht das Plattenmaterial allein, sondern der geprüfte Aufbau der ganzen Wand und ihre Anschlüsse an den Bestand.",
    takeaway: "Lege das Schutzziel fest und suche dazu ein geprüftes Wandsystem, das es erreicht. Ob Gipsfaser oder Zementbauplatte darin vorkommt, ist eine Folge dieser Auswahl. Ein Rw-Wert gilt nur für den beschriebenen Prüfaufbau.",
    sections: [
      { title: "Das Schutzziel vor dem Material", paragraphs: [
        "Kläre vor jeder Plattenwahl, welcher Schall gestoppt werden soll. Sprache aus dem Nachbarzimmer, Musik, Haustechnik oder Geräusche zwischen Wohneinheiten stellen unterschiedliche Anforderungen. Bei Wänden zwischen Wohnungen oder in Gebäuden mit Vorgaben kann ein Mindestwert verbindlich sein, den eine fachkundige Planung bestätigen sollte.",
        "Erst mit diesem Ziel lässt sich nach einem Wandsystem suchen. Hersteller geben für ihre Systeme bewertete Schalldämmmaße an, die unter festgelegten Prüfbedingungen ermittelt wurden. Diese Werte beziehen sich auf eine vollständige Konstruktion und nicht auf eine einzelne Platte.",
      ] },
      { title: "Warum der Plattenname wenig aussagt", paragraphs: [
        "Schalldämmung einer leichten Wand entsteht aus dem Zusammenspiel von zwei Schalen, Hohlraum, Dämmung und Unterkonstruktion. Flächenmasse und Biegesteifigkeit der Beplankung spielen dabei eine Rolle, ebenso die Zahl der Lagen und wie die Schalen miteinander verbunden sind.",
        "Eine Gipsfaserplatte und eine Zementbauplatte unterscheiden sich in diesen Eigenschaften. Daraus lässt sich aber kein pauschaler Sieger ableiten. Dieselbe Platte kann in einem Einfachständerwerk und in einem getrennten Doppelständerwerk zu deutlich unterschiedlichen Ergebnissen führen.",
      ] },
      { title: "Gipsfaser im Schallschutzsystem", paragraphs: [
        "Für Gipsfaserplatten veröffentlichen Hersteller Wandsysteme mit Angaben zum Schallschutz. Fermacell nennt Schallschutz ausdrücklich als Einsatzzweck seiner Gipsfaserplatten im Trockenbau. Die Werte gelten jeweils für eine bestimmte Plattendicke, Lagenzahl, Ständerart und Dämmung.",
        "Prüfe, ob das gewählte System zu deiner Wandhöhe, deinem Ständerwerk und den Anschlüssen passt. Übertrage keine Schallschutzangabe auf einen Aufbau mit anderen Profilen, anderer Dämmung oder weniger Lagen, nur weil dieselbe Platte verwendet wird.",
      ] },
      { title: "Wofür Zementbauplatten gedacht sind", paragraphs: [
        "Zementgebundene Platten werden vor allem für Nassräume und stark beanspruchte Bereiche angeboten. Herstellerunterlagen stellen dort Feuchtebeständigkeit und Robustheit in den Vordergrund. Schallschutz ist meist nicht der Grund, eine Zementbauplatte zu wählen.",
        "Soll eine Wand in einem feuchten Raum zugleich besser dämmen, gehören beide Anforderungen in die Systemauswahl. Kläre, ob für den Aufbau mit Zementbauplatte ein geprüfter Schallschutzwert vorliegt. Fehlt er, lässt sich das Ergebnis aus Werten anderer Plattensysteme nicht ableiten.",
      ] },
      { title: "Ständerwerk und Dämmung", paragraphs: [
        "Getrennte Ständer, die die beiden Wandschalen nicht starr verbinden, können die Schallübertragung verringern. Auch Profilart, Achsabstand und Hohlraumtiefe gehen in die Prüfwerte ein. Diese Angaben stehen in den Systemunterlagen und müssen auf der Baustelle eingehalten werden.",
        "Die Hohlraumdämmung muss der im System beschriebenen Art und Dicke entsprechen. Dämmstoff zu stopfen oder wegzulassen, verändert das Verhalten der Wand. Auch hier gilt: Der Prüfwert gehört zur beschriebenen Kombination.",
      ] },
      { title: "Anschlüsse und Flankenübertragung", paragraphs: [
        "Schall läuft nicht nur durch die Wand, sondern auch über angrenzende Decken, Böden und Außenwände um sie herum. Diese Flankenübertragung kann eine sehr gute Trennwand im eingebauten Zustand deutlich schwächen. Ein durchlaufender Estrich oder eine leichte Decke sind typische Schwachstellen.",
        "Randanschlüsse werden im System meist mit Dichtungsband und dicht verspachtelten Fugen ausgeführt. Offene Fugen, Steckdosen gegenüber auf beiden Seiten oder eine undichte Tür können den Unterschied zwischen zwei Plattenarten leicht überdecken.",
      ] },
      { title: "Prüfwert und Baustelle unterscheiden", paragraphs: [
        "Ein bewertetes Schalldämmmaß aus dem Datenblatt beschreibt die Wand im Prüfstand. Im Gebäude kommen Flanken, Anschlüsse und Ausführungsqualität hinzu. Das tatsächliche Ergebnis kann deshalb vom Datenblattwert abweichen.",
        "Wo ein bestimmter Schallschutz verbindlich nachgewiesen werden muss, gehört die Planung in fachkundige Hände. Diese Seite nennt bewusst keine dB-Werte für Gipsfaser oder Zementbauplatte, weil solche Zahlen ohne den vollständigen Aufbau irreführend wären.",
      ] },
      { title: "Mengen rechnen und Angebote vergleichen", paragraphs: [
        "Bei Schallschutzwänden sind zwei Lagen je Seite häufig Teil des Systems. Damit vervielfacht sich die Plattenfläche gegenüber der Wandfläche. Dazu kommen Dämmung, Profile, Dichtungsband und Befestiger, die zum geprüften Aufbau passen müssen.",
        "Lass dir für beide Plattenarten ein Angebot mit Systembezeichnung, Lagen, Ständerwerk, Dämmung und Anschlussdetails geben. Nur wenn beide Angebote dasselbe Schutzziel nachweisen, ist ein Preisvergleich aussagekräftig.",
      ] },
    ],
    comparison: { caption: "Schallschutz hängt am System, nicht an der Platte", columns: ["Prüfpunkt", "Gipsfaserplatte", "Zementbauplatte"], rows: [
      ["Hauptzweck der Platte", "Allgemeiner Innenausbau, auch Schallschutzsysteme", "Vor allem Feucht- und Nassbereiche"],
      ["Geprüfter Schallwert", "Rw des konkreten Systems in den Unterlagen suchen", "Prüfen, ob für den Aufbau überhaupt ein Rw vorliegt"],
      ["Ständerwerk und Dämmung", "Exakt nach Systembeschreibung ausführen", "Exakt nach Systembeschreibung ausführen"],
      ["Anschlüsse und Flanken", "Randanschlüsse und angrenzende Bauteile prüfen", "Randanschlüsse und angrenzende Bauteile prüfen"],
      ["Mengen", "Lagen je Seite vollständig rechnen", "Lagen, Gewicht und Systemzubehör rechnen"],
    ] },
    checklist: [
      "Schutzziel und gegebenenfalls verbindliche Anforderung festhalten.",
      "Ein geprüftes Wandsystem mit dokumentiertem Rw für das Ziel auswählen.",
      "Ständerwerk, Lagen und Dämmung genau nach Systembeschreibung übernehmen.",
      "Angrenzende Decke, Boden und Außenwand auf Flankenübertragung prüfen.",
      "Randanschlüsse, Fugen und Dichtungsband im Angebot ausweisen lassen.",
      "Steckdosen nicht gegenüberliegend planen und Durchdringungen klären.",
      "Plattenfläche je Seite und Lage getrennt rechnen.",
    ],
    faqs: [
      { question: "Dämmt Gipsfaser besser als eine Zementbauplatte?", answer: "Das lässt sich pauschal nicht sagen. Maßgeblich ist der geprüfte Wert des vollständigen Wandsystems mit Ständerwerk, Lagen, Dämmung und Anschlüssen. Vergleiche Systemwerte, nicht Plattennamen." },
      { question: "Erreicht meine Wand den Rw-Wert aus dem Datenblatt?", answer: "Nicht automatisch. Der Wert gilt für den Prüfaufbau. Flankenübertragung, Anschlüsse, Dosen und Ausführung können das Ergebnis im Gebäude verschlechtern." },
      { question: "Reicht eine zweite Plattenlage für deutlich mehr Schallschutz?", answer: "Eine weitere Lage kann helfen, wenn sie zu einem geprüften System gehört. Ohne passende Unterkonstruktion, Dämmung und dichte Anschlüsse bleibt die Wirkung unsicher." },
    ],
    example: { title: "Eine Trennwand mit zwei Lagen je Seite", intro: "Die Rechnung zeigt den Materialrahmen, nicht den erreichbaren Schallschutz.", steps: [
      { label: "Wandfläche", value: "4,00 m × 2,60 m = 10,40 m² je Seite" },
      { label: "Plattenfläche", value: "10,40 m² × 2 Seiten × 2 Lagen = 41,60 m²" },
      { label: "Randanschluss", value: "2 × 4,00 m + 2 × 2,60 m = 13,20 m Anschlusslänge" },
      { label: "Durchdringungen", value: "3 Steckdosen, versetzt zur Gegenseite planen" },
      { label: "Noch offen", value: "System, Rw-Nachweis, Dämmung, Flanken und Verschnitt" },
    ], result: "41,60 m² Plattenfläche und 13,20 m Randanschluss vor Verschnitt, unabhängig von der Plattenart.", note: "Aus Fläche und Lagenzahl lässt sich kein Schallschutzwert ableiten." },
    limitation: "Die Seite nennt keine Schallschutzwerte und gibt keinen Wandaufbau frei. Verbindliche Anforderungen und das gewählte System müssen anhand der aktuellen Herstellerunterlagen fachlich geprüft werden.",
    sources: [
      { label: "Metallständerwände und Systemdaten", href: "https://knauf.com/de-DE/systeme/trockenbausysteme/w11-de-metallstaenderwaende", publisher: "Knauf", note: "Systemübersicht mit Schallschutzangaben für vollständige Wandaufbauten." },
      { label: "Trockenbaulösungen mit Gipsfaser", href: "https://www.fermacell.com/de-de/loesungen/trockenbau", publisher: "fermacell", note: "Herstellerübersicht zu Gipsfaserplatten im Trockenbau einschließlich Schallschutz." },
      { label: "Powerpanel H2O", href: "https://www.fermacell.com/de-de/produkte/zementplatten/powerpanel-h2o", publisher: "fermacell", note: "Produktangaben zu einer zementgebundenen Platte für Feucht- und Nassbereiche." },
    ],
    relatedLinks: [
      { label: "Schallschutzwand planen", href: "/ratgeber/trockenbau-schallschutzwand/", description: "Profile, Dämmung, Lagen und Anschlüsse einer Schallschutzwand einordnen." },
      { label: "Trockenbauplatten berechnen", href: "/haus/innenausbau/trockenbau-platten-berechnen/", description: "Plattenfläche nach Seiten, Lagen und Format mit eigenen Maßen rechnen." },
      { label: "Einfach oder doppelt beplankt", href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", description: "Die Zahl der Plattenlagen als Teil des Systems betrachten." },
    ],
  } as T;
}
