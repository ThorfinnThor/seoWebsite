import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyTrockenbauEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "trockenbau-osb-gips-oder-zementbauplatte-badezimmer") return bathroomWall(guide);
  if (guide.slug === "trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke") return kitchenCabinets(guide);
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
