import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyTrockenbauEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "trockenbau-osb-gips-oder-zementbauplatte-badezimmer") return bathroomWall(guide);
  if (guide.slug === "trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke") return kitchenCabinets(guide);
  if (guide.slug === "trockenbau-gipskarton-standard-oder-osb-gips-installationen") return installationWall(guide);
  if (guide.slug === "trockenbau-gipsfaser-oder-zementbauplatte-schallschutz") return soundInsulationWall(guide);
  if (guide.slug === "trockenbau-gipskarton-standard-oder-gipsfaser-badezimmer") return gypsumBathroomBoard(guide);
  if (guide.slug === "trockenbau-feuchtraumplatte-oder-zementbauplatte-badezimmer") return showerBoard(guide);
  if (guide.slug === "trockenbau-gipskarton-standard-oder-osb-gips-schallschutz") return osbSoundLayer(guide);
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
    title: "Rigips oder OSB unter Rigips? Installationswand planen",
    heading: "Gipskarton oder OSB mit Gips für die Installationswand",
    description: "Rigips allein oder OSB unter Rigips? Installationswand und Vorwand nach Leitungen, Dosen, Wandverstärkung für Anbauteile und Wandsystem richtig planen.",
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

function gypsumBathroomBoard<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-11-01",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-gipsfaser-badezimmer/",
      primaryIntent: "Für Badwände entscheiden, ob normale Gipskartonplatten, imprägnierte Gipsplatten oder Gipsfaserplatten passen und wo eine Abdichtung auf der Platte nötig wird.",
      distinctValue: "Die Seite bleibt bei gipsgebundenen Platten, erklärt den Unterschied zwischen Standardplatte, GKBI beziehungsweise H2 und Gipsfaser, ordnet die Herstellerfreigabe für häusliche Bäder ein und rechnet die abzudichtende Fläche einer Duschecke statt der Plattenmenge.",
      overlapReview: [
        "/ratgeber/vergleiche/trockenbau/trockenbau-osb-gips-oder-zementbauplatte-badezimmer/",
        "/ratgeber/vergleiche/trockenbau/trockenbau-feuchtraumplatte-oder-gipsfaser-kuechenschraenke/",
        "/ratgeber/daten/trockenbauplatten-typen-dicken/",
      ],
    },
    title: "Gipskarton oder Gipsfaser im Bad?",
    heading: "Gipskarton oder Gipsfaser im Bad richtig einordnen",
    description: "Gipskarton oder Gipsfaser im Bad? Standardplatte, imprägnierte GKBI-Platte und Gipsfaser nach Wandbereich, Spritzwasser und Abdichtung einordnen.",
    intro: "Im Bad wird selten jede Wand gleich beansprucht. Neben dem Spiegel, hinter dem WC und in der Duschecke trifft Wasser ganz unterschiedlich auf die Beplankung. Ob eine normale Gipskartonplatte, eine imprägnierte Variante oder Gipsfaser passt, hängt genau an dieser Verteilung.",
    takeaway: "Eine Standard-Gipskartonplatte ohne Imprägnierung ist für trockene Innenräume gedacht. Für Badwände kommen imprägnierte Gipsplatten oder Gipsfaserplatten infrage, soweit der Hersteller sie für den jeweiligen Bereich vorsieht. Hinter Dusche und Wanne bleibt bei beiden eine Abdichtung auf der Platte Pflicht.",
    sections: [
      { title: "Was „Standard“ auf der Gipskartonplatte bedeutet", paragraphs: [
        "Mit Standard-Gipskarton ist meist die einfache Bauplatte gemeint, im Handel oft als GKB bezeichnet. Sie ist für trockene Innenräume vorgesehen und hat keine Ausrüstung gegen Wasseraufnahme. Im Wohnzimmer ist das unproblematisch, an einer Badwand ist es die Stelle, an der die Planung genauer werden muss.",
        "Imprägnierte Gipsplatten tragen häufig die Bezeichnung GKBI oder den Normtyp H2 und sind oft an grünlichem Karton erkennbar. Die Imprägnierung verringert die Wasseraufnahme der Platte, sie macht die Wand aber nicht dicht. Prüfe im Datenblatt, für welche Feuchtebeanspruchung die konkrete Platte freigegeben ist, statt dich auf die Farbe zu verlassen.",
      ] },
      { title: "Drei Badbereiche mit unterschiedlicher Wasserlast", paragraphs: [
        "Teile die Badwände gedanklich in drei Gruppen. Flächen fern von Waschtisch, Wanne und Dusche erleben vor allem erhöhte Luftfeuchte. Wände am Waschtisch oder hinter dem WC bekommen gelegentlich Spritzer ab. Wände hinter und über Wanne oder Dusche werden regelmäßig direkt mit Wasser belastet.",
        "Hersteller ordnen solche Bereiche Wassereinwirkungsklassen zu und nennen für jede Klasse geeignete Platten und Abdichtungen. Die genaue Zuordnung hängt von Nutzung und Duschart ab. Für diesen Vergleich reicht die Einsicht, dass dieselbe Platte an einer Wand ohne Weiteres passen und an der nächsten nur mit zusätzlicher Abdichtung zulässig sein kann.",
      ] },
      { title: "Gipsfaser im häuslichen Bad laut fermacell", paragraphs: [
        "fermacell beschreibt seine Gipsfaserplatten als geeignet für Wand- und Bodenflächen mit haushaltsüblicher Nutzung, die nur kurzzeitig und geringfügig bis mäßig mit Spritzwasser belastet werden. Das deckt viele Wände in einem privaten Bad ab. Eine pauschale Freigabe für jede Stelle im Raum ist das nicht.",
        "Für die direkt beanspruchten Bereiche im häuslichen Bad, also die Wände hinter und über Wanne und Dusche sowie die Bodenfläche, verlangt der Hersteller eine Abdichtung auf der Plattenoberfläche. Er nennt dafür ein abgestimmtes System aus Grundierung, Flüssigabdichtung und Fliesenkleber. Wer Gipsfaser wählt, übernimmt also auch diese Systemlogik.",
      ] },
      { title: "Imprägnierter Gipskarton als naheliegende Alternative", paragraphs: [
        "Eine imprägnierte Gipskartonplatte ist im Bad die häufigste Alternative zur Gipsfaser. Sie lässt sich ähnlich wie eine Standardplatte schneiden und montieren und wird von Herstellern für häusliche Bäder angeboten. Auch hier gilt die Freigabe nur für die im Datenblatt genannten Bereiche und zusammen mit der vorgesehenen Abdichtung.",
        "Der Unterschied zur Gipsfaser liegt weniger in einer pauschalen Wasserfestigkeit als im Plattenaufbau. Gipskarton hat einen Gipskern mit Kartonummantelung, Gipsfaser ist eine homogene Platte aus Gips und Papierfasern. Das beeinflusst Kanten, Verspachtelung und Befestigung, ersetzt aber in keinem Fall die Abdichtung in der Duschecke.",
      ] },
      { title: "Wo die unbehandelte Platte im Bad ausscheidet", paragraphs: [
        "An Wänden mit regelmäßigem Spritzwasser solltest du eine Standard-Gipskartonplatte ohne Imprägnierung nicht einplanen, solange kein Hersteller sie für genau diesen Bereich freigibt. Fliesen ändern daran wenig, denn Fliesenfugen sind auf Dauer nicht wasserdicht und lassen Feuchte bis zum Untergrund durch.",
        "In Bereichen fern von Wasserquellen kann die Lage anders aussehen. Wer dort eine andere Platte als in der Duschecke verwenden möchte, braucht klare Übergänge, saubere Plattenstöße und die Zusage, dass diese Kombination im System zulässig ist. Einfacher bleibt oft ein durchgehender, für Bäder vorgesehener Plattentyp an allen Badwänden.",
      ] },
      { title: "Die Abdichtung wiegt schwerer als die Plattenwahl", paragraphs: [
        "Ob Gipskarton oder Gipsfaser, an Wanne und Dusche schützt die Abdichtung die Platte und nicht umgekehrt. Dazu gehören Dichtbänder in Innenecken und am Bodenanschluss, Manschetten an Rohrdurchführungen und eine flächige Abdichtung in der Schichtdicke, die das gewählte Produkt vorschreibt.",
        "Wähle Grundierung, Abdichtung und Fliesenkleber aus einem System, das für den gewählten Plattentyp vorgesehen ist. Produkte verschiedener Hersteller frei zu mischen, kann Haftung und Gewährleistung infrage stellen. Lass dir die Systemzugehörigkeit im Angebot schriftlich ausweisen.",
      ] },
      { title: "Gewicht, Zuschnitt und Lasten am Waschtisch", paragraphs: [
        "Gipsfaserplatten sind schwerer als Gipskartonplatten gleicher Dicke und werden je nach System mit eigenen Schrauben und Fugentechniken verarbeitet. Gipskarton lässt sich leichter tragen und anpassen. Bei der Montage in einem engen Bad kann das ein spürbarer Unterschied sein, für die Eignung im Feuchtbereich ist es keiner.",
        "Wer einen schweren Spiegelschrank oder einen wandhängenden Waschtisch plant, prüft die Befestigung gesondert. Die Plattenart beeinflusst die zulässigen Dübellasten, die eigentliche Lastfrage gehört aber in einen eigenen Nachweis mit Traverse oder Verstärkung im Ständerwerk.",
      ] },
      { title: "Unbekannte Platte hinter alten Badfliesen", paragraphs: [
        "Bei einer vorhandenen Badwand ist oft nicht erkennbar, ob hinter den Fliesen Standard-Gipskarton, eine imprägnierte Platte oder Gipsfaser sitzt. Eine Steckdosenöffnung oder eine Revisionsöffnung erlaubt manchmal einen Blick auf Plattenkante und Kartonfarbe, über die Abdichtung sagt das aber nichts.",
        "Steht eine Badsanierung an und ist der Aufbau unklar, lohnt eine fachkundige Bestandsaufnahme an den nassen Wänden. Zeigen sich verfärbte oder weiche Stellen, gehört die Ursache geklärt, bevor neue Platten oder eine neue Abdichtung aufgebracht werden.",
      ] },
    ],
    comparison: { caption: "Gipsbasierte Platten im Bad nach Wandbereich", columns: ["Prüfpunkt", "Gipskarton", "Gipsfaser"], rows: [
      ["Wand fern von Wasser", "Imprägnierte Platte üblich, Standardplatte nur mit Freigabe", "Bei haushaltsüblicher Nutzung laut Hersteller vorgesehen"],
      ["Waschtisch und WC", "Imprägnierte Platte nach Datenblatt einsetzen", "Bei mäßigem Spritzwasser laut Hersteller vorgesehen"],
      ["Hinter Wanne und Dusche", "Imprägnierte Platte nur mit Abdichtung im System", "Abdichtung auf der Plattenoberfläche gefordert"],
      ["Plattenaufbau", "Gipskern mit Kartonummantelung", "Homogene Platte aus Gips und Papierfasern"],
      ["Verarbeitung", "Leichter, vertraute Spachteltechnik", "Schwerer, systemeigene Schrauben und Fugen"],
    ] },
    checklist: [
      "Jede Badwand als trocken, gelegentlich bespritzt oder direkt beansprucht markieren.",
      "Im Datenblatt prüfen, ob die Platte imprägniert ist und für welche Bereiche sie gilt.",
      "Für Gipsfaser die Herstellerangaben zum häuslichen Bad heranziehen.",
      "Abdichtungsflächen hinter Wanne und Dusche einschließlich Ecken festlegen.",
      "Grundierung, Abdichtung und Fliesenkleber aus einem passenden System wählen.",
      "Lasten von Waschtisch und Spiegelschrank gesondert nachweisen lassen.",
      "Bei Bestandswänden den vorhandenen Plattentyp und die Abdichtung klären.",
    ],
    faqs: [
      { question: "Darf ich normale Gipskartonplatten im Bad verwenden?", answer: "An Wänden mit Spritzwasser solltest du eine Standardplatte ohne Imprägnierung nicht einplanen. Für Badwände sind imprägnierte Gipsplatten oder Gipsfaserplatten üblich, jeweils im Rahmen der Herstellerfreigabe und mit Abdichtung an Wanne und Dusche." },
      { question: "Ist Gipsfaser im Bad besser als grüner Gipskarton?", answer: "Nicht pauschal. Beide Plattenarten werden für häusliche Bäder angeboten. Entscheidend sind die Freigabe für den jeweiligen Wandbereich, die passende Abdichtung und die Verarbeitung nach Systemangaben." },
      { question: "Brauche ich bei Gipsfaser im Bad noch eine Abdichtung?", answer: "Ja, in den direkt beanspruchten Bereichen. fermacell verlangt für Wände hinter und über Wanne und Dusche sowie für die Bodenfläche im häuslichen Bad eine Abdichtung auf der Plattenoberfläche." },
    ],
    example: { title: "Abdichtungsmenge für eine Duschecke", intro: "Die Rechnung zeigt, welche Fläche und welche Fugenlänge in der Duschecke abgedichtet werden, unabhängig von der Plattenart.", steps: [
      { label: "Duschwand lang", value: "1,20 m × 2,00 m = 2,40 m²" },
      { label: "Duschwand kurz", value: "0,90 m × 2,00 m = 1,80 m²" },
      { label: "Abdichtungsfläche", value: "2,40 m² + 1,80 m² = 4,20 m²" },
      { label: "Dichtband in der Innenecke", value: "2,00 m senkrecht" },
      { label: "Dichtband am Bodenanschluss", value: "1,20 m + 0,90 m = 2,10 m" },
      { label: "Dichtband gesamt", value: "2,00 m + 2,10 m = 4,10 m" },
    ], result: "4,20 m² Abdichtungsfläche und 4,10 m Dichtband in der Duschecke vor Überlappungen und Rohrmanschetten.", note: "Die Höhe der abzudichtenden Fläche und weitere Details legen die Systemunterlagen fest. Die Beispielwerte sind keine Vorgabe." },
    limitation: "Die Seite gibt weder eine Platte noch eine Abdichtung frei. Wandbereiche, Plattentyp und Abdichtung müssen anhand der aktuellen Herstellerunterlagen und der geltenden Anforderungen fachlich geprüft werden.",
    sources: [
      { label: "Fragen und Antworten zu Gipsfaser im Feuchtraum", href: "https://www.fermacell.com/de-de/service/fragen-antworten", publisher: "fermacell", note: "Herstellerangaben zum Einsatz von Gipsfaserplatten in häuslichen Bädern und zur geforderten Abdichtung." },
      { label: "fermacell Gipsfaserplatten", href: "https://www.fermacell.com/de-de/produkte/wand/gipsfaserplatten", publisher: "fermacell", note: "Produktangaben zu Aufbau, Eigenschaften und Verarbeitung der Gipsfaserplatte." },
      { label: "Trockenbau in Feucht- und Nassräumen", href: "https://knauf.com/de-DE/kompetenzen/feuchteschutz/feucht-und-nassraeume", publisher: "Knauf", note: "Herstellerübersicht zu Wassereinwirkungsklassen und Plattensystemen für Badbereiche." },
    ],
    relatedLinks: [
      { label: "Feuchtraumplatte oder Zementplatte in der Dusche", href: "/ratgeber/vergleiche/trockenbau/trockenbau-feuchtraumplatte-oder-zementbauplatte-badezimmer/", description: "Grüne Gipsplatte und Zementbauplatte nach Duschart und Wasserlast vergleichen." },
      { label: "Trockenbauplatten nach Typ und Dicke", href: "/ratgeber/daten/trockenbauplatten-typen-dicken/", description: "Plattentypen und übliche Dicken in einer Datenübersicht nachschlagen." },
      { label: "Trockenbauplatten berechnen", href: "/haus/innenausbau/trockenbau-platten-berechnen/", description: "Plattenfläche für die Badwände mit eigenen Maßen rechnen." },
      { label: "Trockenbaumaterial berechnen", href: "/haus/innenausbau/trockenbau-rechner/", description: "Wandfläche, Profile und Materialrahmen für das Bad mit eigenen Maßen bestimmen." },
    ],
  } as T;
}

function showerBoard<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-11-01",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-feuchtraumplatte-oder-zementbauplatte-badezimmer/",
      primaryIntent: "Klären, ob eine grüne Feuchtraumplatte in Dusche und Bad ausreicht oder ob eine Zementbauplatte für die stark belasteten Flächen die passende Grundlage ist.",
      distinctValue: "Die Seite macht die Duschart zur Grenze zwischen imprägnierter Gipsplatte und Zementbauplatte, erklärt die Abdichtung von Fugen und Befestigungspunkten bei Zementplatten und rechnet den Materialwechsel zwischen Duschecke und übrigem Bad mit Übergangsfugen durch.",
      overlapReview: [
        "/ratgeber/vergleiche/trockenbau/trockenbau-osb-gips-oder-zementbauplatte-badezimmer/",
        "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-gipsfaser-badezimmer/",
        "/ratgeber/daten/trockenbau-feuchtraum-brandschutz-datenluecken/",
      ],
    },
    title: "Grüne Feuchtraumplatte oder Zementplatte in der Dusche?",
    heading: "Feuchtraumplatte oder Zementbauplatte für Dusche und Bad",
    description: "Grüne Feuchtraumplatte oder Zementplatte in der Dusche? Duschart, Wasserlast, Plattenwechsel an der Wand und Abdichtung für dein Bad sauber einordnen.",
    intro: "Die grüne Feuchtraumplatte ist im Baumarkt die naheliegende Wahl fürs Bad. Spätestens bei der Dusche stellt sich die Frage, ob sie dort noch reicht oder ob eine zementgebundene Platte die sicherere Grundlage ist. Die Antwort hängt stärker an der Duschart als am Plattenpreis.",
    takeaway: "Eine imprägnierte Gipsplatte nimmt weniger Wasser auf als eine Standardplatte, wasserfest ist sie nicht. Über Wanne oder Duschtasse kann sie mit geprüfter Abdichtung zulässig sein. Für stark belastete Flächen wie bodengleiche Duschen werden Zementbauplatten gezielt angeboten, deren Fugen und Befestigungspunkte ebenfalls abgedichtet werden.",
    sections: [
      { title: "Was die grüne Farbe tatsächlich verspricht", paragraphs: [
        "Grün eingefärbter Karton kennzeichnet bei vielen Herstellern eine imprägnierte Gipsplatte, im Handel oft GKBI oder Typ H2 genannt. Die Imprägnierung verringert die Wasseraufnahme. Der Kern bleibt Gips, und Gips verliert bei dauerhafter Durchfeuchtung an Festigkeit.",
        "Damit ist die Platte für feuchte Raumluft und begrenzt beanspruchte Badflächen gedacht. Für Flächen, die bei jedem Duschen nass werden, ist sie nur zusammen mit einer Abdichtung vorgesehen, deren Eignung für genau diese Platte und diesen Bereich in den Systemunterlagen steht.",
      ] },
      { title: "Wanne, Duschtasse oder bodengleiche Dusche", paragraphs: [
        "Bei einer Badewanne oder einer Duschtasse trifft das Wasser vor allem die Wand oberhalb des Randes. Der Boden unter der Wanne bleibt geschützt. Bei einer bodengleichen Dusche läuft das Wasser über den Fußboden zum Ablauf und belastet zusätzlich den Wandfuß und die Anschlussfuge zum Boden.",
        "Für die Einstufung in Wassereinwirkungsklassen, wie Knauf sie für Badbereiche beschreibt, spielt die Duschart deshalb eine Rolle. Lege fest, welche Dusche kommt, bevor du Platten bestellst, denn sie verschiebt die Grenze zwischen beiden Plattentypen. Die Einstufung selbst sollte ein Fachbetrieb anhand der Systemunterlagen bestätigen.",
      ] },
      { title: "Wo die Zementbauplatte ihre Stärken hat", paragraphs: [
        "Zementgebundene Platten wie fermacell Powerpanel H2O oder Knauf Aquapanel Cement Board Indoor werden für häusliche Feuchträume einschließlich Duschen angeboten. fermacell nennt für seine Platte zusätzlich öffentliche und gewerbliche Nassbereiche. Der zementgebundene Kern ist auf Feuchte ausgelegt und nicht auf eine Imprägnierung angewiesen.",
        "Dafür ist die Platte schwerer und wird mit systemeigenen Schrauben und eigenem Fugenmaterial verarbeitet. Prüfe im Datenblatt die zulässigen Profilabstände und die Befestigungsabstände, denn sie können von einer gewohnten Gipskartonwand abweichen.",
      ] },
      { title: "Auch Zementplatten brauchen abgedichtete Fugen", paragraphs: [
        "Eine zementgebundene Platte ist kein Freibrief, auf Abdichtung zu verzichten. fermacell beschreibt für Powerpanel H2O im häuslichen Bereich, dass Fugen und Befestigungspunkte zusätzlich abzudichten sind und die flächige Abdichtung der Plattenoberfläche dort entfallen kann. Diese Aussage gilt für das beschriebene System und nicht automatisch für jede andere Zementplatte.",
        "Innenecken, Bodenanschluss, Armaturen und Ablauf bleiben kritische Stellen. Hier entscheiden Dichtband, Manschetten und eine sorgfältige Ausführung darüber, ob Wasser hinter die Fliesen gelangt. Lass dir für die gewählte Platte schriftlich bestätigen, welche Flächen und Details abgedichtet werden.",
      ] },
      { title: "Zwei Plattenarten an einer Badwand", paragraphs: [
        "Häufig wird nur die Duschecke mit Zementplatten beplankt und der Rest des Bades mit imprägnierten Gipsplatten. Das spart Gewicht und Aufwand, schafft aber einen Materialübergang, an dem zwei Plattenarten mit unterschiedlichem Verhalten aufeinandertreffen.",
        "Ob und wie ein solcher Wechsel zulässig ist, regeln die Systemunterlagen. fermacell erlaubt für seine Gipsfaser- und Zementplatten einen Materialwechsel pro Wandfläche und verweist auf eigene Planungshinweise. Für andere Kombinationen prüfst du die Angaben des jeweiligen Herstellers und lässt die Übergangsfuge möglichst außerhalb der direkt beregneten Fläche planen.",
      ] },
      { title: "Unterkonstruktion hinter der Duschwand", paragraphs: [
        "Gelangt Feuchte hinter die Beplankung, sind auch Metallprofile und Hohlraumdämmung betroffen. fermacell weist für öffentliche Bereiche auf besondere Anforderungen an Unterkonstruktion und Korrosionsschutz hin. Für ein privates Bad gelten die Angaben des gewählten Systems, die du mit dem Angebot abgleichen solltest.",
        "Liegt die Dusche an einer Außenwand oder an einer Wand zu einem unbeheizten Raum, kommt die Frage nach einer Dampfbremse oder einer anderen Feuchteschutzschicht hinzu. Sie stellt sich unabhängig davon, ob du grüne Gipsplatten oder Zementplatten verwendest.",
      ] },
      { title: "Lüftung entlastet die Wände außerhalb der Dusche", paragraphs: [
        "Wie stark die Badwände außerhalb der Dusche beansprucht werden, hängt auch davon ab, wie schnell die Feuchte nach dem Duschen abzieht. Ein Fenster oder ein Lüfter ersetzt keine Abdichtung, verkürzt aber die Zeit, in der Wände und Fugen feucht bleiben.",
        "In einem innenliegenden Bad ohne Fenster gehört die Lüftung deshalb in dieselbe Planung wie die Plattenwahl. Eine robustere Platte in der Duschecke löst kein Feuchteproblem im übrigen Raum.",
      ] },
      { title: "Duschecke und übrige Wände getrennt anbieten lassen", paragraphs: [
        "Vergleiche nicht nur den Plattenpreis. Zementplatten benötigen eigene Schrauben und eigenes Fugenmaterial, imprägnierte Gipsplatten in der Dusche eine flächige Abdichtung im System. Beide Positionen gehören vollständig ins Angebot.",
        "Lass dir Duschbereich, übrige Badwände und die Länge der Materialübergänge getrennt ausweisen. So erkennst du, ob ein Angebot die Zementplatte auf die Duschecke beschränkt oder ganze Wände damit beplankt, und kannst beide Varianten fair vergleichen.",
      ] },
    ],
    comparison: { caption: "Grüne Gipsplatte und Zementbauplatte an Dusche und Bad", columns: ["Prüfpunkt", "Imprägnierte Gipsplatte", "Zementbauplatte"], rows: [
      ["Kernmaterial", "Gips mit verringerter Wasseraufnahme", "Zementgebunden und auf Feuchte ausgelegt"],
      ["Wand über Wanne oder Duschtasse", "Mit Abdichtung im System nach Datenblatt", "Nach Systemangaben, Fugen und Befestigung abdichten"],
      ["Bodengleiche Dusche", "Eignung für die Einstufung gesondert prüfen", "Gezielt für stark belastete Flächen angeboten"],
      ["Verarbeitung", "Leicht, gewohnte Gipskartontechnik", "Schwerer, systemeigene Schrauben und Fugenmaterial"],
      ["Materialübergang", "Wechsel zur Zementplatte nach Systemangaben planen", "Übergang zur Gipsplatte nach Systemangaben planen"],
    ] },
    checklist: [
      "Duschart festlegen, also Wanne, Duschtasse oder bodengleiche Dusche.",
      "Wassereinwirkung jeder Wandfläche anhand der Systemunterlagen einstufen lassen.",
      "Für die grüne Platte die zugehörige Abdichtung im Duschbereich festlegen.",
      "Für die Zementplatte Fugen, Befestigungspunkte und Anschlüsse abdichten.",
      "Profil- und Schraubenabstände der Zementplatte im Datenblatt prüfen.",
      "Materialübergänge zwischen beiden Plattenarten auf Zulässigkeit prüfen.",
      "Duschbereich, übrige Wände und Übergänge im Angebot getrennt ausweisen.",
    ],
    faqs: [
      { question: "Reicht eine grüne Gipsplatte in der Dusche?", answer: "Nur zusammen mit einer passenden Abdichtung und in dem Bereich, für den der Hersteller die Platte vorsieht. Die Imprägnierung verringert die Wasseraufnahme, sie macht die Platte nicht wasserfest." },
      { question: "Muss eine Zementbauplatte in der Dusche abgedichtet werden?", answer: "Ja, zumindest an Fugen, Befestigungspunkten und Anschlüssen. Ob die flächige Abdichtung entfallen kann, regeln die Unterlagen des jeweiligen Systems. fermacell beschreibt das für Powerpanel H2O im häuslichen Bereich." },
      { question: "Kann ich nur die Duschecke mit Zementplatten beplanken?", answer: "Das ist üblich, setzt aber voraus, dass der Wechsel zwischen den Plattenarten im System zulässig ist. Die Übergangsfugen sollten geplant und nicht auf der Baustelle improvisiert werden." },
    ],
    example: { title: "Duschecke mit Zementplatte, übriges Bad mit grüner Platte", intro: "Die Rechnung trennt die Flächen beider Plattenarten und zeigt die Länge der Übergänge, die geplant werden müssen.", steps: [
      { label: "Badwände gesamt", value: "18,00 m² nach Abzug von Tür und Fenster" },
      { label: "Duschecke", value: "(1,00 m + 1,20 m) × 2,10 m = 4,62 m² Zementbauplatte" },
      { label: "Übrige Wände", value: "18,00 m² − 4,62 m² = 13,38 m² imprägnierte Gipsplatte" },
      { label: "Senkrechte Übergänge", value: "2 × 2,10 m = 4,20 m" },
      { label: "Waagerechter Übergang", value: "1,00 m + 1,20 m = 2,20 m" },
      { label: "Übergänge gesamt", value: "4,20 m + 2,20 m = 6,40 m" },
    ], result: "4,62 m² Zementbauplatte, 13,38 m² imprägnierte Gipsplatte und 6,40 m Materialübergang vor Verschnitt.", note: "Ob die Zementplatte bis 2,10 m Höhe genügt und wo die Übergänge liegen dürfen, legen Systemunterlagen und Fachplanung fest." },
    limitation: "Die Seite gibt keine Platte und keine Abdichtung für eine Dusche frei. Wassereinwirkung, Plattensystem, Materialwechsel und Abdichtung müssen anhand der aktuellen Herstellerunterlagen fachlich geprüft werden.",
    sources: [
      { label: "Trockenbau in Feucht- und Nassräumen", href: "https://knauf.com/de-DE/kompetenzen/feuchteschutz/feucht-und-nassraeume", publisher: "Knauf", note: "Herstellerübersicht zu Wassereinwirkungsklassen und den dafür vorgesehenen Plattensystemen." },
      { label: "AQUAPANEL Cement Board Indoor", href: "https://knauf.com/de-DE/p/produkt/aquapanel-r-cement-board-indoor-12-5-lef-14749_0010", publisher: "Knauf", note: "Originalangaben zur zementgebundenen Platte für Innenräume und ihrer Verarbeitung." },
      { label: "Powerpanel H2O", href: "https://www.fermacell.com/de-de/produkte/zementplatten/powerpanel-h2o", publisher: "fermacell", note: "Produktangaben zu einer zementgebundenen Platte für Feucht- und Nassbereiche." },
      { label: "Fragen und Antworten zu Feuchträumen", href: "https://www.fermacell.com/de-de/service/fragen-antworten", publisher: "fermacell", note: "Herstellerangaben zur Abdichtung von Fugen und Befestigungspunkten und zum Materialwechsel an der Wand." },
    ],
    relatedLinks: [
      { label: "Gipskarton oder Gipsfaser im Bad", href: "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-gipsfaser-badezimmer/", description: "Gipsgebundene Platten für die übrigen Badwände nach Wandbereich einordnen." },
      { label: "Datenlücken bei Feuchtraum und Brandschutz", href: "/ratgeber/daten/trockenbau-feuchtraum-brandschutz-datenluecken/", description: "Welche Angaben zu Feuchtraumplatten in Datenblättern häufig fehlen." },
      { label: "Trockenbaumaterial berechnen", href: "/haus/innenausbau/trockenbau-rechner/", description: "Wandflächen und Materialrahmen für das Bad mit eigenen Maßen bestimmen." },
      { label: "Trockenbauprofile planen", href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", description: "Profilabstände und Ständerwerk passend zur gewählten Duschplatte festlegen." },
    ],
  } as T;
}

function osbSoundLayer<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-11-01",
      canonicalPath: "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-osb-gips-schallschutz/",
      primaryIntent: "Prüfen, ob eine OSB-Lage unter der Gipsplatte den Schallschutz einer Trockenbauwand gegenüber einer doppelt beplankten Gipskartonwand verbessert.",
      distinctValue: "Die Seite trennt Befestigungswunsch und Schallziel, vergleicht die OSB-Lage direkt mit einer zweiten Gipsplattenlage nach Masse, Steifigkeit und Prüfwert und behandelt das Aufdoppeln einer bestehenden Wand mit Raumverlust als eigenen Fall.",
      overlapReview: [
        "/ratgeber/vergleiche/trockenbau/trockenbau-gipsfaser-oder-zementbauplatte-schallschutz/",
        "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-osb-gips-installationen/",
        "/ratgeber/trockenbau-schallschutzwand/",
        "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/",
      ],
    },
    title: "Bringt OSB unter Gipskarton mehr Schallschutz?",
    heading: "Gipskarton oder OSB mit Gips für mehr Schallschutz",
    description: "Bringt OSB unter Gipskarton mehr Schallschutz? Doppelte Gipsbeplankung und OSB mit Gips nach Masse, Steifigkeit, Prüfwert und Bestand vergleichen.",
    intro: "Eine OSB-Lage unter der Gipsplatte fühlt sich massiver an und klingt beim Klopfen satter. Daraus wird oft geschlossen, dass die Wand auch besser gegen Lärm schützt. Für die Schalldämmung zählen jedoch andere Eigenschaften als der Klopftest.",
    takeaway: "Eine OSB-Lage ist vor allem eine Befestigungslösung. Ob sie gegenüber einer zweiten Gipsplattenlage den Schallschutz verbessert, lässt sich nur mit einem geprüften Wandaufbau beantworten. Liegt für deine Kombination kein Prüfwert vor, ist eine doppelt beplankte Gipswand aus einem dokumentierten System die belastbarere Wahl.",
    sections: [
      { title: "Woher die Erwartung an die OSB-Lage kommt", paragraphs: [
        "Wer eine Wand mit OSB und Gips aufbaut, will meist an beliebigen Stellen Regale, Fernseher oder Hängeschränke befestigen. Der Schallschutz kommt als erhoffter Nebeneffekt hinzu, weil die Wand dicker und fester wirkt.",
        "Diese Seite trennt beide Ziele. Sie fragt, ob die Holzwerkstofflage gegenüber einer Wand mit zwei Gipsplattenlagen akustisch etwas bringt. Die Befestigungsfrage behandelt der Vergleich zur Installationswand, die Wahl zwischen Gipsfaser und Zementplatte für Schallschutz ein eigener Vergleich.",
      ] },
      { title: "Was eine leichte Wand akustisch ausmacht", paragraphs: [
        "Rigips nennt als Einflussgrößen für die Schalldämmung einer Montagewand die flächenbezogene Masse, den Abstand und die Biegesteifigkeit der Beplankung, die Art der Hohlraumdämmung und das eingesetzte Profil. Die Beplankung ist also nur ein Teil der Rechnung.",
        "Masse und Steifigkeit wirken dabei nicht zwingend in dieselbe Richtung. Mehr Masse hilft in der Regel, eine sehr biegesteife Beplankung kann in bestimmten Frequenzbereichen dagegen ungünstiger sein. Aus dem Eindruck, eine Wand sei besonders stabil, folgt deshalb kein besserer Schallschutz.",
      ] },
      { title: "OSB gegen eine zweite Gipsplattenlage", paragraphs: [
        "Der eigentliche Vergleich lautet meist nicht OSB oder nichts, sondern OSB unter Gips oder zwei Lagen Gipsplatten. Holzwerkstoffplatten haben meist keine höhere Rohdichte als Gipsplatten. Eine OSB-Lage bringt deshalb nicht automatisch mehr Masse in die Wand als eine zusätzliche Gipsplatte.",
        "Dazu kommt, wie die Lagen verbunden sind und wie ihre Stöße liegen. Werden OSB und Gips vollflächig verschraubt, wirken sie gemeinsam als eine Schale. Ob diese Schale akustisch günstiger ist als zwei Gipsplatten, zeigt nur eine Prüfung des kompletten Aufbaus.",
      ] },
      { title: "Prüfwerte für Gipswände und für Eigenkombinationen", paragraphs: [
        "Für doppelt beplankte Gipsplattenwände veröffentlichen Hersteller wie Knauf und Rigips Systeme mit dokumentierten Schallschutzangaben. Profile, Dämmung, Plattentyp und Lagenzahl sind darin festgelegt. Für eine Wand mit OSB unter Gips ist zu prüfen, ob ein Hersteller diesen Aufbau überhaupt mit Prüfwert führt.",
        "Fehlt ein Prüfwert, lässt sich der Schallschutz einer Eigenkombination nicht aus den Werten der Gipswand ableiten. Das gilt in beide Richtungen. Die OSB-Variante muss nicht schlechter sein, du kannst ihren Wert aber weder zusagen noch einfordern.",
      ] },
      { title: "Befestigung und Schallziel in einem System", paragraphs: [
        "Brauchst du die OSB-Lage wegen vieler Befestigungspunkte, kläre mit dem Fachbetrieb, welcher dokumentierte Aufbau deinem Wunsch am nächsten kommt. Manchmal genügt die Holzwerkstofflage auf einer Wandseite oder nur in einem Wandabschnitt, während der Rest dem geprüften System folgt.",
        "Je nach Hersteller gibt es zudem Gipsplatten mit erhöhter Dichte oder mit Eigenschaften für Lastbefestigung, die in Schallschutzsystemen geführt werden. Damit lassen sich beide Ziele oft innerhalb eines Systems verfolgen, statt eine unbewertete Kombination zu bauen.",
      ] },
      { title: "Vorhandene Wand aufdoppeln oder Vorsatzschale", paragraphs: [
        "Bei einer bestehenden Wand wird oft überlegt, OSB und Gips direkt auf die alte Beplankung zu schrauben. Die neue Schicht hängt dann starr an der alten Beplankung und an deren Ständern. Hohlraum und Dämmung bleiben unverändert, und jede Lage kostet Raumtiefe.",
        "Eine freistehende Vorsatzschale mit eigenem Ständerwerk und Dämmung verändert dagegen das System der Wand. Welche Maßnahme bei deiner Wand mehr bewirkt und ob sie den Raumverlust rechtfertigt, sollte eine fachkundige Planung anhand der Systemunterlagen klären.",
      ] },
      { title: "Schalllecks, die jede Beplankung überdecken", paragraphs: [
        "Offene Anschlussfugen an Decke und Boden, gegenüberliegende Steckdosen oder eine leichte Tür lassen Schall an der Beplankung vorbei. Bei einer Wand mit OSB kommen zusätzliche Bohrungen und Schnitte durch zwei unterschiedliche Lagen hinzu, die sauber geschlossen werden müssen.",
        "Prüfe deshalb vor der Plattenfrage, ob der Schall wirklich durch die Wandfläche kommt. Ist es an der Tür oder an einer Steckdose am lautesten, gleicht eine andere Beplankung den Unterschied kaum aus.",
      ] },
      { title: "Angebote auf den Schallnachweis festlegen", paragraphs: [
        "Lass dir für beide Varianten ein Angebot mit Systembezeichnung, Lagen, Profilen, Dämmung und Anschlussdetails geben. Bei der OSB-Variante gehört die Angabe dazu, ob für genau diesen Aufbau ein Schallschutznachweis vorliegt.",
        "Liegt nur für die Gipsvariante ein Nachweis vor, vergleichst du ungleiche Leistungen. Die Variante ohne Nachweis trägt das Risiko, das gewünschte Ergebnis nicht zu erreichen, und dieses Risiko gehört offen in die Entscheidung.",
      ] },
    ],
    comparison: { caption: "Zweite Gipslage oder OSB unter Gips beim Schallschutz", columns: ["Prüfpunkt", "Gipskarton doppelt beplankt", "OSB unter Gipsplatte"], rows: [
      ["Hauptzweck", "Schall- und Brandschutz nach Systemangaben", "Befestigung an beliebigen Stellen"],
      ["Masse der Beplankung", "Zwei Gipsplattenlagen je Seite nach System", "Holzwerkstoff meist ohne höhere Rohdichte als Gips"],
      ["Prüfwert", "Für viele Systeme in Herstellerunterlagen dokumentiert", "Für den konkreten Aufbau gesondert erfragen"],
      ["Lagen und Stöße", "Fugenversatz und Verschraubung nach System", "Lagenfolge und Fugenversatz klären"],
      ["Bestandswand", "Zusätzliche Lage nur mit Systembezug planen", "Starre Aufdopplung lässt Hohlraum unverändert"],
    ] },
    checklist: [
      "Festhalten, ob Befestigung, Schallschutz oder beides das Ziel ist.",
      "Für die Gipsvariante ein geprüftes System mit dokumentiertem Schallwert wählen.",
      "Für die OSB-Variante einen Prüfwert des genauen Aufbaus anfragen.",
      "Lagenfolge, Fugenversatz und Verschraubung beider Varianten vergleichen.",
      "Bei Bestandswänden Aufdopplung und Vorsatzschale gegenüberstellen.",
      "Raumverlust durch zusätzliche Lagen in den Grundriss eintragen.",
      "Anschlüsse, Steckdosen und Tür vor der Plattenfrage prüfen.",
    ],
    faqs: [
      { question: "Ist eine Wand mit OSB und Gips leiser als eine doppelt beplankte Gipswand?", answer: "Das lässt sich ohne Prüfung des konkreten Aufbaus nicht sagen. OSB bringt nicht automatisch mehr Masse als eine zweite Gipsplatte. Für doppelt beplankte Gipswände liegen in Herstellersystemen dagegen dokumentierte Werte vor." },
      { question: "Hilft es, OSB nachträglich auf eine Wand zu schrauben?", answer: "Die Wirkung ist unsicher, weil die neue Lage starr an der alten Wand hängt und Hohlraum sowie Dämmung gleich bleiben. Eine Vorsatzschale mit eigenem Ständerwerk verändert das System stärker, kostet aber mehr Raumtiefe." },
      { question: "Gibt es Platten, die Befestigung und Schallschutz verbinden?", answer: "Je nach Hersteller gibt es Gipsplatten mit erhöhter Dichte oder für Lastbefestigung, die in Schallschutzsystemen geführt werden. Welche Lasten und Schallwerte gelten, steht in den jeweiligen Systemunterlagen." },
    ],
    example: { title: "Eine vorhandene Wand auf der lauten Seite aufdoppeln", intro: "Die Rechnung vergleicht Material und Raumverlust beider Aufdopplungen mit angenommenen Plattendicken, nicht den Schallschutz.", steps: [
      { label: "Wandfläche", value: "3,60 m × 2,50 m = 9,00 m²" },
      { label: "Zusätzliche Gipsplatte", value: "1 Lage × 9,00 m² = 9,00 m², angenommen 12,5 mm dick" },
      { label: "OSB und Gips", value: "9,00 m² OSB + 9,00 m² Gipsplatte = 18,00 m², angenommen 15 mm + 12,5 mm = 27,5 mm" },
      { label: "Raumverlust Gipsplatte", value: "3,60 m × 0,0125 m = 0,045 m² Grundfläche" },
      { label: "Raumverlust OSB und Gips", value: "3,60 m × 0,0275 m = 0,099 m² Grundfläche" },
      { label: "Noch offen", value: "Prüfwert, Befestigung durch die Bestandsbeplankung, Anschlüsse und Verschnitt" },
    ], result: "9,00 m² gegenüber 18,00 m² Plattenfläche und rund 0,05 m² gegenüber 0,10 m² Raumverlust, ohne Aussage zum Schallschutz.", note: "Die Plattendicken sind Annahmen für die Rechnung. Ein Schallschutzwert folgt aus keiner dieser Zahlen." },
    limitation: "Die Seite nennt keine Schallschutzwerte und gibt keinen Wandaufbau frei. Schallziel, Wandsystem und Anschlüsse müssen anhand der aktuellen Herstellerunterlagen fachlich geprüft werden.",
    sources: [
      { label: "Schallschutz im Trockenbau", href: "https://www.rigips.de/schallschutz", publisher: "Rigips", note: "Herstellerübersicht zu den Einflussgrößen der Schalldämmung von Montagewänden." },
      { label: "Metallständerwände und Systemdaten", href: "https://knauf.com/de-DE/systeme/trockenbausysteme/w11-de-metallstaenderwaende", publisher: "Knauf", note: "Systemübersicht mit Schallschutzangaben für vollständige Wandaufbauten." },
      { label: "Planungs- und Baukataloge", href: "https://www.rigips.de/planen-und-bauen-kataloge", publisher: "Rigips", note: "Technische Kataloge mit geprüften Wandsystemen und Ausführungsdetails." },
    ],
    relatedLinks: [
      { label: "Gipsfaser oder Zementbauplatte für Schallschutz", href: "/ratgeber/vergleiche/trockenbau/trockenbau-gipsfaser-oder-zementbauplatte-schallschutz/", description: "Warum beim Schallschutz das geprüfte System mehr zählt als der Plattenname." },
      { label: "Schallschutzwand planen", href: "/ratgeber/trockenbau-schallschutzwand/", description: "Profile, Dämmung, Lagen und Anschlüsse einer Schallschutzwand einordnen." },
      { label: "Einfach oder doppelt beplankt", href: "/ratgeber/trockenbauwand-einfach-oder-doppelt-beplankt/", description: "Die zweite Plattenlage als Teil des Wandsystems betrachten." },
      { label: "Gipskarton oder OSB für die Installationswand", href: "/ratgeber/vergleiche/trockenbau/trockenbau-gipskarton-standard-oder-osb-gips-installationen/", description: "Die OSB-Lage als Befestigungslösung für Leitungen und Anbauteile planen." },
      { label: "Trockenbauplatten berechnen", href: "/haus/innenausbau/trockenbau-platten-berechnen/", description: "Plattenfläche nach Seiten und Lagen für beide Varianten rechnen." },
    ],
  } as T;
}
