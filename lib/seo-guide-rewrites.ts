import type { SeoGuide } from "@/lib/seo-guides";

/**
 * Hand-written versions of guides that used to be assembled from a template.
 * URL, title and description stay with the base entry; the visible text comes
 * from here. Empty arrays deliberately remove template blocks (checklists,
 * FAQs) that only repeated the body copy.
 */
export type SeoGuideRewrite = Pick<SeoGuide, "intro" | "takeaway" | "sections"> &
  Partial<Pick<SeoGuide, "comparison" | "checklist" | "faqs" | "example">>;

export const SEO_GUIDE_REWRITES_UPDATED = { iso: "2026-11-23", label: "23. November 2026" } as const;

export const SEO_GUIDE_REWRITES: Record<string, SeoGuideRewrite> = {
  "gartenhaus-fuer-sechs-fahrraeder": {
    intro: "Für sechs Fahrräder brauchst du innen etwa 9 bis 11 m². Mit höhenversetzten Haltern reichen 3,15 m Wand, ohne Versatz sind es 3,90 m. Dazu kommt ein Meter Gang, damit du jedes Rad einzeln herausbekommst.",
    takeaway: "Plane mindestens 3,2 × 2,9 m Innenmaß, eine Doppeltür und feste Plätze für die Räder, die täglich gebraucht werden. Bei Lastenrad oder Anhänger rechne eine eigene Stellfläche dazu.",
    sections: [
      { title: "Drei Anordnungen, drei Größen", paragraphs: [
        "Ein Erwachsenenrad ist rund 1,85 m lang, der Lenker 60 bis 75 cm breit. Stehen die Räder auf gleicher Höhe nebeneinander, brauchst du pro Rad etwa 65 cm. Hebst du jedes zweite Vorderrad um 25 bis 30 cm an, greifen die Lenker übereinander und 50 cm genügen. Nur zu den Seitenwänden bleibt die halbe Lenkerbreite, also gut 30 cm.",
        "Die Tabelle rechnet alle drei Varianten mit einem Meter Gang. Miss deine Räder trotzdem nach: Ein breiter Mountainbike-Lenker oder ein Kindersitz kostet schnell zehn Zentimeter.",
      ] },
      { title: "Warum der Gartenhaus-Planer weniger ausgibt", paragraphs: [
        "Unser Planer rechnet mit 0,65 m² je Rad und kommt für sechs Räder auf rund 5,4 m². Das ist die Untergrenze für dicht gestellte Räder, die selten bewegt werden. Wer täglich eines davon herausholt, sollte sich an den Werten in der Tabelle orientieren.",
      ] },
      { title: "Tür und Schwelle", paragraphs: [
        "Entscheidend ist die lichte Breite bei geöffneter Tür. Unter 90 cm wird es mit Packtaschen eng. Eine Doppeltür lohnt sich ab vier Rädern, weil du von zwei Seiten an die Plätze kommst. Davor muss außen Platz zum Aufschwenken bleiben, auch im Winter.",
        "Eine hohe Schwelle stört bei jedem E-Bike, das oft über 20 kg wiegt. Frag beim Händler nach der Schwellenhöhe und plane eine kurze, rutschfeste Rampe ein.",
      ] },
      { title: "Was an die Wand darf", paragraphs: [
        "Leichte Räder und Kinderräder lassen sich aufhängen. E-Bikes bleiben besser am Boden. Wandhalter gehören in Ständer oder Bohlen und nicht in dünne Füllbretter oder Blech. Bei Metallhäusern prüfst du vorher, ob der Hersteller Befestigungen in der Wand erlaubt.",
        "Akkus nimmst du mit ins Haus. Im unbeheizten Gartenhaus schwankt die Temperatur zu stark, und eine Steckdose zum Laden muss ein Elektriker für den Außenbereich anlegen.",
      ] },
    ],
    comparison: {
      caption: "Platzbedarf für sechs Räder mit 1,0 m Gang",
      columns: ["Anordnung", "Innenmaß", "Fläche"],
      rows: [
        ["Eine Reihe, höhenversetzt (50 cm je Rad)", "3,15 × 2,85 m", "9,0 m²"],
        ["Zwei Reihen mit je drei Rädern (65 cm je Rad)", "1,95 × 4,70 m", "9,2 m²"],
        ["Eine Reihe ohne Versatz (65 cm je Rad)", "3,90 × 2,85 m", "11,1 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein Gartenhaus mit 3 × 3 Metern für sechs Fahrräder?", answer: "Nur knapp. Auf 3,00 m Wand stehen die Räder 47 cm auseinander, das klappt mit Höhenversatz und schmalen Lenkern. Viele Angebote nennen aber das Außen- oder Dachmaß. Innen fehlen dann je nach Wandstärke und Dachüberstand 10 bis 60 cm." },
      { question: "Wie breit muss die Tür sein?", answer: "Ein Rad passt durch 80 cm. Bequem wird es ab 90 cm lichter Breite, mit Anhänger oder Lastenrad ab 120 cm." },
    ],
  },

  "maehroboter-fuer-500-qm": {
    intro: "Für 500 m² echten Rasen solltest du Modelle mit 600 bis 700 m² Nennfläche vergleichen. Die Herstellerangabe gilt für eine offene Fläche und lange Laufzeiten. Beete, Bäume, schmale Durchgänge und ein Ruhetag kosten Zeit.",
    takeaway: "Offener Garten: ab 600 m² Nennfläche. Viele Hindernisse oder mehrere Zonen: ab 700 m². Vorher die Rasenfläche messen, denn das Grundstück ist fast immer deutlich größer.",
    sections: [
      { title: "500 m² Grundstück sind selten 500 m² Rasen", paragraphs: [
        "Ein Beispiel: Von 500 m² Grundstück gehen 110 m² für das Haus ab, 50 m² für Auffahrt und Stellplatz, 40 m² für die Terrasse und 60 m² für Beete. Übrig bleiben 240 m² Rasen. Dafür reicht ein deutlich kleineres und günstigeres Gerät.",
        "Miss jede Rasenfläche einzeln als Rechteck und zieh Beete und Wege ab. Auf Luftbildern deiner Gemeinde oder in einer Karten-App geht das in wenigen Minuten.",
      ] },
      { title: "So viel Reserve ist sinnvoll", paragraphs: [
        "Unser Rechner setzt auf die Nettofläche 20 Prozent auf. Bei gegliederten Gärten werden es 30, bei vielen Engstellen 40 Prozent. Starkes Wachstum, mehrere Zonen und getrennte Flächen erhöhen den Wert weiter. Das sind unsere Planungswerte und keine Norm.",
        "Mehr Reserve schadet technisch nicht, der Roboter ist einfach früher fertig. Ein größeres Modell ist aber oft auch breiter. Prüfe also die engste Passage, bevor du eine Klasse höher greifst.",
      ] },
      { title: "Was neben der Fläche entscheidet", paragraphs: [
        "Die steilste Stelle zählt. Der Durchschnitt hilft dir nicht. 35 Prozent Steigung heißen 35 cm Höhe auf einem Meter Strecke. Schafft ein Modell das nicht, fällt es heraus, egal wie groß seine Nennfläche ist.",
        "Für schmale Durchgänge nennt der Hersteller eine Mindestbreite. Bei kabellosen Modellen mit Satellitenempfang sind Hauswände und dichte Bäume kritisch. Kamera- und LiDAR-Geräte kommen dort meist besser zurecht.",
      ] },
      { title: "Station und Laufzeit", paragraphs: [
        "Die Ladestation braucht Strom, eine ebene Fläche und freie Anfahrt. Soll der Roboter nachts und sonntags ruhen, bleiben vielleicht acht Stunden an sechs Tagen. Mit dieser Zeit muss er auskommen, und genau deshalb lohnt sich die Reserve.",
      ] },
    ],
    comparison: {
      caption: "Nennfläche für 500 m² Rasen nach Gartentyp",
      columns: ["Garten", "Faktor", "Modelle ab"],
      rows: [
        ["Offen, wenige Kanten", "1,20", "600 m²"],
        ["Gegliedert, einige Beete", "1,30", "650 m²"],
        ["Gegliedert mit mehreren Zonen", "1,35", "700 m²"],
        ["Viele Engstellen und Inseln", "1,40", "700 m²"],
        ["Getrennte Flächen, gegliedert", "1,45", "750 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein Mähroboter mit 500 m² Nennfläche für 500 m² Rasen?", answer: "Nur bei einer offenen, ebenen Fläche, wenn er fast den ganzen Tag laufen darf. Mit Ruhezeiten oder Hindernissen ist die Klasse zu knapp." },
      { question: "Schadet ein zu groß gewählter Mähroboter?", answer: "Der Rasen leidet nicht. Nachteile sind ein höherer Preis, ein größeres Gehäuse und manchmal eine breitere Mindestpassage." },
    ],
  },

  "terrassendielen-laengs-oder-quer": {
    intro: "Auf einer Terrasse von 6 × 4 m entscheidet meist die Dielenlänge. Mit 4-m-Dielen kommst du in der kurzen Richtung ohne einen einzigen Stoß aus. In der langen Richtung brauchst du 27 Stöße und an jeder Stoßlinie doppelte Unterkonstruktion.",
    takeaway: "Verlege in der Richtung, in der jede Reihe aus einer ganzen Diele besteht, sofern das Wasser in Rillenrichtung vom Haus weg ablaufen kann.",
    sections: [
      { title: "Die Rechnung für 6 × 4 Meter", paragraphs: [
        "Angenommen sind Dielen mit 145 mm Breite und 5 mm Fuge, zusammen 150 mm je Reihe. Die Unterkonstruktion liegt im Abstand von 50 cm quer zu den Dielen.",
        "Der Unterschied in den Laufmetern ist klein. Bei Arbeit und Fehlerquellen ist er groß: Jeder Stoß will sauber abgelängt sein und braucht beidseitig ein eigenes Auflager.",
      ] },
      { title: "Wasser geht vor Optik", paragraphs: [
        "Bei gerillten Dielen soll das Wasser in den Rillen ablaufen. Viele Verlegeanleitungen verlangen deshalb 1 bis 2 Prozent Gefälle in Längsrichtung der Dielen, weg vom Haus. Auf vier Meter sind das 4 bis 8 cm. Liegen die Dielen parallel zur Hauswand, bleibt Wasser eher stehen, und das Gefälle muss anders gelöst werden.",
        "Lies vor der Entscheidung die Anleitung deines Profils. Für Hohlkammerdielen gelten oft strengere Vorgaben als für Massivholz.",
      ] },
      { title: "Was die Richtung optisch macht", paragraphs: [
        "Dielen vom Haus weg strecken die Terrasse in den Garten. Dielen parallel zum Haus lassen eine schmale Terrasse breiter wirken. Der Blick aus der Terrassentür entlang der Dielen wirkt ruhiger, weil die Fugen nicht quer laufen.",
      ] },
      { title: "Wenn sich ein Stoß nicht vermeiden lässt", paragraphs: [
        "Versetze die Stöße von Reihe zu Reihe und setze an jeder Stoßlinie zwei Träger nebeneinander. So hat jedes Dielenende sein eigenes Auflager und seine eigene Schraube mit Randabstand. Ein einzelner schmaler Träger für zwei Enden ist die häufigste Ursache für aufgerissene Dielenköpfe.",
        "Alternative: ein Fries, also eine quer liegende Diele in der Mitte. Dann enden beide Felder auf einer geplanten Linie.",
      ] },
    ],
    comparison: {
      caption: "6 × 4 m mit 4-m-Dielen in beiden Richtungen",
      columns: ["Merkmal", "Dielen laufen 4 m", "Dielen laufen 6 m"],
      rows: [
        ["Reihen", "40", "27"],
        ["Dielen à 4 m", "40 Stück", "41 Stück, Reste genutzt"],
        ["Stöße", "keine", "27"],
        ["Träger bei 50 cm Abstand", "9 × 6 m = 54 m", "13 × 4 m = 52 m"],
        ["Zusätzliche Träger an zwei Stoßlinien", "keine", "2 × 4 m = 8 m"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "In welche Richtung läuft die Unterkonstruktion?", answer: "Immer quer zu den Dielen. Drehst du die Dielen, drehen sich auch die Träger. Das ändert Auflager und Entwässerung, deshalb steht die Richtung vor dem Unterbau fest." },
      { question: "Kann ich Dielen diagonal verlegen?", answer: "Ja, aber der Verschnitt steigt, und die Unterkonstruktion braucht meist einen kleineren Abstand, weil die Dielen schräg über die Träger spannen." },
    ],
  },

  "terrasse-20-qm-material": {
    intro: "Für 20 m² Terrasse mit 5 × 4 m brauchst du etwa 36 Dielen à 4 m, 45 m Unterkonstruktion und gut 600 Schrauben. Die Rechnung gilt für Dielen mit 145 mm Breite und 5 mm Fuge, die ohne Stoß über vier Meter laufen.",
    takeaway: "34 Reihen decken die Fläche, mit zwei Dielen Reserve bestellst du 36. Kalkuliere Unterkonstruktion, Auflager und Randabschluss extra, denn sie stecken in keinem Quadratmeterpreis für Dielen.",
    sections: [
      { title: "Dielen: von der Fläche zur Stückzahl", paragraphs: [
        "Eine Reihe belegt 145 mm Diele plus 5 mm Fuge. 5.000 mm geteilt durch 150 mm ergeben 33,3, also 34 Reihen. Die letzte wird der Länge nach geschnitten. Ist dir ein schmaler Rest am Rand zu unruhig, verteile ihn auf beide Außenreihen.",
        "Die Faustformel Fläche geteilt durch Reihenbreite führt fast zum selben Ergebnis: 20 m² ÷ 0,15 m sind 133 Laufmeter. Sie verschweigt nur, dass du ganze Dielen kaufst.",
      ] },
      { title: "Unterkonstruktion und Auflager", paragraphs: [
        "Bei 50 cm Trägerabstand und vier Metern Dielenlänge liegen neun Träger à 5 m unter der Terrasse, zusammen 45 m. Manche WPC-Profile verlangen 40 cm oder weniger. Dann sind es elf Träger und 55 m.",
        "Wie viele Auflager darunter kommen, hängt vom Trägerquerschnitt ab. Bei 50 cm Stützweite wären es elf Punkte je Träger und damit 99 Platten oder Stelzlager.",
      ] },
      { title: "Schrauben, Clips und Rand", paragraphs: [
        "Sichtbar verschraubt brauchst du zwei Schrauben je Kreuzung: 34 Reihen × 9 Träger × 2 = 612 Stück. Mit Clips zählst du die Kreuzungen und ergänzt Start- und Endclips.",
        "Für die Kanten kommen bis zu 14 m Blende oder Abschlussprofil dazu, wenn eine lange Seite am Haus liegt: einmal 5 m und zweimal 4 m ergeben 13 m plus Zuschnitt.",
      ] },
      { title: "Holz oder WPC auf 20 m²", paragraphs: [
        "Bei gleicher Breite bleibt die Stückzahl gleich. WPC braucht oft engere Träger und vorgeschriebene Clips, Holz dafür Öl oder eine silbergraue Oberfläche, mit der du leben kannst. Vergleiche deshalb immer zwei vollständige Materiallisten.",
      ] },
    ],
    example: {
      title: "Materialliste für 5 × 4 m",
      intro: "Dielen 145 mm, Fuge 5 mm, Lieferlänge 4 m, Trägerabstand 50 cm.",
      steps: [
        { label: "Dielenreihen", value: "5.000 ÷ 150 = 33,3, aufgerundet 34" },
        { label: "Dielen mit Reserve", value: "34 + 2 = 36 Stück à 4 m" },
        { label: "Träger", value: "4.000 ÷ 500 + 1 = 9 Stück à 5 m = 45 m" },
        { label: "Schrauben", value: "34 × 9 × 2 = 612 Stück" },
      ],
      result: "36 Dielen, 45 m Unterkonstruktion und rund 620 Schrauben.",
    },
    checklist: [],
    faqs: [
      { question: "Wie viel Verschnitt soll ich rechnen?", answer: "Bei einer rechteckigen Terrasse mit passender Lieferlänge genügen rund 5 Prozent. Mit Ausschnitten, schrägen Kanten oder Stößen sind es eher 10 Prozent." },
      { question: "Wie viel wiegt das Material?", answer: "Das steht im Datenblatt je Laufmeter. Bei 144 m Dielen macht schon ein Unterschied von 0,5 kg je Meter 72 kg aus, wichtig für Transport und Dachterrassen." },
    ],
  },

  "trockenbauwand-mit-tuer": {
    intro: "Eine Tür spart in der Trockenbauwand kaum Platten, braucht aber ein eigenes Gerüst: zwei verstärkte Ständer, ein Sturzprofil und kurze Ständer darüber. Wie stark die Profile sein müssen, hängt von Türblattgewicht, Türbreite und Wandhöhe ab.",
    takeaway: "Bestelle zuerst Tür und Zarge und übernimm das Öffnungsmaß aus deren Datenblatt. Bei schweren oder breiten Türen und hohen Wänden gehören UA-Profile mit 2 mm Blechstärke an beide Seiten.",
    sections: [
      { title: "CW oder UA an der Tür", paragraphs: [
        "Für leichte Zimmertüren erlauben viele Systemunterlagen normale CW-Profile. Als Grenze nennen sie häufig 25 kg Türblatt, 88,5 cm Türbreite und 2,60 m Wandhöhe. Wird ein Wert überschritten, kommen UA-Aussteifungsprofile an beide Türseiten. Sie werden oben und unten mit Türpfostenwinkeln verschraubt.",
        "Maßgeblich ist die Unterlage deines Systems. Ein Glas- oder Schallschutztürblatt liegt schnell über 25 kg.",
      ] },
      { title: "Wo die Plattenfugen liegen", paragraphs: [
        "Auf der Linie der Türpfosten darf keine Plattenfuge nach oben laufen. Dort reißt sie, sobald die Tür ein paar Mal zugefallen ist. Die Platte wird deshalb als L-Form um die Ecke geschnitten, die Fuge liegt über dem Sturz auf einem kurzen Zwischenständer. Auf der Rückseite versetzt du sie um ein Feld.",
      ] },
      { title: "Was du von der Fläche abziehen darfst", paragraphs: [
        "Eine Wand mit 4,0 × 2,5 m hat beidseitig 20 m². Die Öffnung mit 1,0 × 2,1 m spart rechnerisch 4,2 m². In der Praxis bleibt weniger übrig, weil die L-Zuschnitte eine ganze Platte anbrechen. Rechne bei einer Tür lieber mit der vollen Fläche und behalte die Reste für Sturz und Laibung.",
        "Von der UW-Schiene am Boden ziehst du die Öffnung ab. An der Decke läuft sie durch.",
      ] },
      { title: "Leitungen und Schalter", paragraphs: [
        "Der Lichtschalter sitzt auf der Schlossseite, meist 15 cm neben der Zarge. Genau dort steht das verstärkte Profil. Führe das Kabel im Feld daneben und setze die Hohlwanddose mit etwas Abstand. Gegenüberliegende Dosen versetzt du um mindestens ein Feld, sonst hörst du durch die Wand.",
      ] },
    ],
    example: {
      title: "Zusatzmaterial für eine Zimmertür",
      intro: "Wand 4,0 × 2,5 m, Öffnung 1,0 × 2,1 m, einlagig beplankt, Raster 62,5 cm.",
      steps: [
        { label: "Beidseitige Wandfläche", value: "4,0 × 2,5 × 2 = 20 m²" },
        { label: "Öffnung beidseitig", value: "1,0 × 2,1 × 2 = 4,2 m²" },
        { label: "Türständer", value: "2 Profile, je nach Tür CW oder UA" },
        { label: "Sturz", value: "1 UW-Profil, etwa 1,4 m mit umgebogenen Enden" },
        { label: "Über dem Sturz", value: "1 bis 2 kurze CW-Stücke mit je rund 0,4 m" },
      ],
      result: "15,8 m² reine Plattenfläche, bestellt wird wegen der Zuschnitte eher für 20 m².",
    },
    checklist: [],
    faqs: [
      { question: "Welches Öffnungsmaß braucht eine Standardtür?", answer: "Das steht in der Montageanleitung der Zarge. Für ein Türblatt mit 86 cm Breite liegt das Wandöffnungsmaß häufig bei etwa 88,5 cm, dazu kommt die Höhe ab fertigem Fußboden. Prüfe beides vor dem Stellen der Ständer." },
      { question: "Kann ich die Tür später noch versetzen?", answer: "Nur mit offener Wand. Türständer, Sturz und Plattenfugen hängen zusammen, deshalb lohnt es sich, die Position vorher mit Klebeband am Boden zu testen." },
    ],
  },

  "trockenbauwand-3-meter": {
    intro: "Für eine 3 m lange und 2,5 m hohe Trockenbauwand brauchst du sechs Gipsplatten (2,5 × 1,25 m), sechs CW-Profile und sechs Meter UW-Profil. Das gilt für einlagige Beplankung auf beiden Seiten, ohne Tür und ohne besondere Anforderungen an Schall oder Brand.",
    takeaway: "Sechs Platten, sechs Ständer, 6 m UW, 7,5 m² Dämmung, rund 225 Schrauben. Bei doppelter Beplankung verdoppelt sich die Plattenzahl, die Profile bleiben.",
    sections: [
      { title: "Platten: warum sechs und nicht fünf", paragraphs: [
        "Jede Seite hat 7,5 m², beide zusammen 15 m². Eine Platte mit 2,5 × 1,25 m deckt 3,125 m². Rechnerisch genügen also 4,8 Platten. Auf jeder Seite brauchst du aber zwei ganze und einen Streifen von 50 cm. Zwei Streifen aus einer Platte passen, dann sind es fünf.",
        "Wir rechnen trotzdem mit sechs. Auf der zweiten Seite beginnst du wegen des Fugenversatzes mit einer halben Platte, und ein Fehlschnitt ist schnell passiert. Die übrige Platte kostet wenig und spart eine zweite Fahrt.",
      ] },
      { title: "Profile im Raster", paragraphs: [
        "Bei 62,5 cm Abstand stehen die Ständer bei 0, 62,5, 125, 187,5, 250 und 300 cm. Das letzte Feld ist mit 50 cm schmaler. Boden und Decke bekommen je 3 m UW-Profil. Kaufst du 4-m-Stäbe, sind es zwei, und die Reste sind Verschnitt.",
        "CW-Profile werden etwa 1 bis 1,5 cm kürzer als die Raumhöhe geschnitten, damit sie sich zwischen den UW-Schienen stellen lassen. Unter alle Randprofile gehört Dichtungsband.",
      ] },
      { title: "Dämmung, Schrauben, Spachtel", paragraphs: [
        "In den Hohlraum kommen 7,5 m² Mineralwolle. Sie kostet wenig und macht bei Geräuschen aus dem Nebenraum viel aus. Für die Platten rechnest du mit knapp 30 Schrauben je Quadratmeter Wand, also rund 225 Stück.",
        "Plane für Fugen, Schraubköpfe und Anschlüsse einen Sack Fugenfüller und 25 m Bewehrungsstreifen. Den genauen Verbrauch nennt die Verpackung.",
      ] },
      { title: "Wann die Liste nicht mehr stimmt", paragraphs: [
        "Über etwa 2,6 m Raumhöhe, mit Fliesen, Hängeschränken oder einer Tür ändert sich der Aufbau. Für Schall- oder Brandschutz übernimmst du ein komplettes System aus dem Herstellerkatalog und tauschst darin nichts aus.",
      ] },
    ],
    example: {
      title: "Einkaufsliste für 3,0 × 2,5 m",
      intro: "Einlagig je Seite, Raster 62,5 cm, keine Öffnung.",
      steps: [
        { label: "Gipsplatten 2,5 × 1,25 m", value: "6 Stück" },
        { label: "CW-Profile, 2,5 m", value: "6 Stück" },
        { label: "UW-Profile", value: "2 × 3 m = 6 m" },
        { label: "Mineralwolle", value: "7,5 m²" },
        { label: "Schnellbauschrauben", value: "rund 225 Stück" },
      ],
      result: "Alles passt in einen Kombi, nur die Platten brauchen einen Anhänger oder Lieferung.",
    },
    checklist: [],
    faqs: [
      { question: "Was ändert sich bei doppelter Beplankung?", answer: "Du brauchst zwölf statt sechs Platten und längere Schrauben für die zweite Lage. Ständer, UW-Profile und Dämmung bleiben gleich. Die Fugen der zweiten Lage werden versetzt." },
      { question: "CW 50, 75 oder 100?", answer: "Das hängt von Wandhöhe, Dämmdicke und Installationen ab. Für Abwasserrohre wird CW 50 schnell zu schmal. Die zulässige Höhe je Profil steht in der Tabelle des Systemherstellers." },
    ],
  },

  "trockenbau-schallschutzwand": {
    intro: "Eine Schallschutzwand wird selten durch eine einzelne Superplatte gut. Meistens verliert sie an den Rändern: an der durchlaufenden Estrichfläche, an gegenüberliegenden Steckdosen oder an einer Fuge zur Decke, die nur gespachtelt ist.",
    takeaway: "Wähle ein geprüftes System mit zwei Plattenlagen je Seite und Mineralwolle im Hohlraum, trenne die Profile mit Dichtungsband von Boden, Decke und Wänden und versetze alle Dosen.",
    sections: [
      { title: "Die vier Stellen, an denen Schall durchkommt", paragraphs: [
        "Boden und Decke leiten Schall an der Wand vorbei. Läuft der Estrich unter der Wand durch, kann die beste Wand den Nachbarraum nicht leise machen. Bei einem Neubau steht sie deshalb auf der Rohdecke, der Estrich wird getrennt.",
        "Fugen sind die zweite Stelle, Einbauten die dritte. Eine Hohlwanddose auf beiden Seiten am selben Platz ist ein Loch mit zwei Plastikdeckeln. Die vierte ist die Tür: Eine einfache Zimmertür ohne Bodendichtung macht jede gute Wand zunichte.",
      ] },
      { title: "Was den Aufbau besser macht", paragraphs: [
        "Masse, Abstand und Dämpfung wirken zusammen. Zwei Lagen Platten bringen Masse, ein breiteres oder getrenntes Ständerwerk schafft Abstand, Mineralwolle dämpft den Hohlraum. Schaumplatten aus Polystyrol sind dafür ungeeignet, weil sie zu steif sind.",
        "Ein doppeltes Ständerwerk mit zwei getrennten Reihen ist die Steigerung. Es kostet 10 cm mehr Wandstärke und lohnt sich zwischen Schlafzimmer und Wohnraum oder beim Musikzimmer.",
      ] },
      { title: "Materialmenge für 5 × 2,6 m", paragraphs: [
        "Eine Seite hat 13 m². Bei zwei Lagen je Seite sind es 52 m² Platten und mit 10 Prozent Verschnitt rund 57 m². Dazu 13 m² Mineralwolle, 10 m UW-Profil und neun Ständer im 62,5er-Raster. Dichtungsband brauchst du ringsum, also 15,2 m.",
        "Ein Detail, das oft vergessen wird: Auch die Ständer an den Seitenwänden liegen auf Dichtungsband, und die Plattenkante bleibt ein paar Millimeter vom Boden weg. Diese Fuge wird elastisch geschlossen.",
      ] },
      { title: "Wie du Werte vergleichst", paragraphs: [
        "Hersteller nennen ein bewertetes Schalldämmmaß in dB, gemessen im Labor ohne Nebenwege. Im Haus liegt der Wert darunter. Zehn dB Unterschied empfindet das Ohr ungefähr als Halbierung der Lautstärke, drei dB sind gerade hörbar.",
        "Zwischen Wohnungen gelten Mindestanforderungen, die du mit dem Architekten oder einem Akustiker klärst. Im eigenen Einfamilienhaus bist du frei und kannst nach Bedarf aufrüsten.",
      ] },
    ],
    comparison: {
      caption: "Drei Aufbauten im Vergleich",
      columns: ["Aufbau", "Aufwand", "Geeignet für"],
      rows: [
        ["Ein Ständerwerk, eine Lage je Seite", "gering", "Abstellraum, Flur"],
        ["Ein Ständerwerk, zwei Lagen je Seite", "mittel", "Kinderzimmer, Arbeitszimmer"],
        ["Zwei getrennte Ständerwerke, zwei Lagen", "hoch, dicker", "Schlafzimmer, Musik, Heimkino"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Kann ich eine vorhandene Wand nachträglich verbessern?", answer: "Eine zweite Plattenlage hilft ein wenig. Deutlich mehr bringt eine freistehende Vorsatzschale mit eigenem Ständerwerk und Mineralwolle, die die alte Wand nicht berührt." },
      { question: "Hilft Akustikschaum?", answer: "Nein, er verringert den Hall im eigenen Raum. Durch die Wand dringt der Schall weiterhin." },
    ],
  },

  "luftentfeuchter-fuer-50-qm": {
    intro: "Für 50 m² mit 2,5 m Raumhöhe musst du 125 m³ Luft entfeuchten. Bei leicht erhöhter Feuchte passt ein Gerät, das der Hersteller für mindestens 50 bis 60 m² angibt. Ist der Raum ein kühler Keller oder trocknet dort Wäsche, rechne mit rund 65 m².",
    takeaway: "Multipliziere deine Fläche mit 1,0 bei leichter, 1,15 bei mittlerer und 1,3 bei hoher Feuchte oder Wäsche. Für den kühlen Keller gilt 1,25. Danach vergleichst du Temperaturbereich, Ablauf und Lautstärke.",
    sections: [
      { title: "Was „20 Liter am Tag“ bedeutet", paragraphs: [
        "Die große Literzahl auf dem Karton wird meist bei 30 °C und 80 Prozent Luftfeuchte gemessen. Das ist ein tropischer Raum. Bei 20 °C und 60 Prozent schafft dasselbe Gerät oft weniger als die Hälfte. Suche im Datenblatt deshalb den zweiten Wert, meist bei 27 °C und 60 Prozent oder bei 20 °C.",
        "Fehlt er, vergleichst du Äpfel mit Birnen. Das ist der häufigste Grund, warum ein vermeintlich starkes Gerät im Keller enttäuscht.",
      ] },
      { title: "Ein Raum oder mehrere", paragraphs: [
        "50 m² in einem offenen Raum sind einfach. Verteilen sie sich auf drei Kellerräume, erreicht das Gerät nur den, in dem es steht. Offene Türen helfen etwas, geschlossene gar nicht. Zwei kleinere Geräte sind dann oft die bessere Wahl.",
      ] },
      { title: "Tank oder Schlauch", paragraphs: [
        "Bei 125 m³ können in feuchten Wochen mehrere Liter am Tag zusammenkommen. Ein Tank mit drei Litern ist dann zweimal täglich voll, und das Gerät schaltet ab. Mit Schlauch zum Bodenablauf oder einer eingebauten Pumpe läuft es durch. Der Schlauch braucht ein durchgehendes Gefälle.",
      ] },
      { title: "Was es im Monat kostet", paragraphs: [
        "Ein Gerät mit 400 W, das acht Stunden am Tag läuft, verbraucht 3,2 kWh. Bei 35 Cent je kWh sind das 1,12 Euro am Tag und rund 34 Euro im Monat. Ein Hygrostat, der bei 55 Prozent abschaltet, senkt die Laufzeit meist deutlich.",
        "Steigt die Feuchte nach dem Abschalten innerhalb weniger Stunden wieder stark an, kommt Wasser nach. Dann suche zuerst die Ursache: Leck, undichte Wand oder warme Außenluft im kalten Keller.",
      ] },
    ],
    comparison: {
      caption: "Geräteklasse für 50 m² Grundfläche",
      columns: ["Situation", "Zuschlag", "Herstellerangabe ab"],
      rows: [
        ["Wohnraum, leicht erhöhte Feuchte", "keiner", "50 m²"],
        ["Mittlere Feuchte", "15 %", "58 m²"],
        ["Keller unter 16 °C", "25 %", "63 m²"],
        ["Hohe Feuchte oder Wäsche", "30 %", "65 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Welche Luftfeuchte soll ich einstellen?", answer: "Für Wohnräume sind 50 bis 55 Prozent ein guter Zielwert. Darunter läuft das Gerät lange für wenig Nutzen, und trockene Luft wird unangenehm." },
      { question: "Kompressor oder Adsorption?", answer: "Über etwa 15 °C ist ein Kompressorgerät sparsamer. Im unbeheizten Keller oder in der Garage arbeitet ein Adsorptionsgerät zuverlässiger." },
    ],
  },

  "luftentfeuchter-fuer-badezimmer": {
    intro: "Im Bad ist Stoßlüften fast immer schneller als ein Luftentfeuchter. Sinnvoll wird das Gerät in Bädern ohne Fenster, bei schwacher Abluft oder wenn im Bad auch Wäsche trocknet.",
    takeaway: "Miss die Luftfeuchte nach dem Duschen. Liegt sie zwei Stunden später trotz Lüften noch über 65 Prozent, hilft ein kleines Gerät, das außerhalb der Schutzbereiche um Dusche und Wanne steht.",
    sections: [
      { title: "Wie viel Wasser in der Luft hängt", paragraphs: [
        "Ein Bad mit 8 m² und 2,5 m Höhe fasst 20 m³ Luft. Bei 24 °C kann jeder Kubikmeter knapp 22 g Wasserdampf aufnehmen. Steigt die Feuchte beim Duschen von 50 auf 90 Prozent, kommen ungefähr 175 g dazu. Das klingt nach wenig, reicht aber für beschlagene Fliesen und nasse Fugen.",
        "Ein Teil sitzt zusätzlich als Film auf Wänden und in Handtüchern. Deshalb steigt die Feuchte nach dem ersten Lüften oft wieder an.",
      ] },
      { title: "Warum Lüften meist gewinnt", paragraphs: [
        "Kalte Winterluft mit 0 °C enthält höchstens 5 g Wasser je Kubikmeter. Tauschst du die 20 m³ einmal vollständig aus, verschwinden rund 300 g Wasser in wenigen Minuten. Ein kleiner Entfeuchter braucht dafür eine Stunde oder länger.",
        "Im Sommer dreht sich das um. An schwülen Tagen bringt die Außenluft selbst viel Feuchte mit, dann ist das Gerät im Vorteil.",
      ] },
      { title: "Wo das Gerät stehen darf", paragraphs: [
        "Rund um Dusche und Badewanne gelten elektrische Schutzbereiche. Bis 60 cm Abstand haben normale Geräte und Steckdosen nichts verloren. Ein Luftentfeuchter mit Netzstecker gehört also deutlich weiter weg, besser vor die Tür oder in den Flur bei offener Badtür.",
        "Verlängerungskabel im Bad sind tabu. Ist keine Steckdose an der richtigen Stelle, fragst du einen Elektriker oder nimmst ein Akku- oder Granulatgerät, das allerdings wenig Wasser bindet.",
      ] },
      { title: "Worauf es beim Kauf ankommt", paragraphs: [
        "Für 20 m³ genügt die kleinste Klasse. Wichtiger sind ein leiser Betrieb, ein Hygrostat und eine Abschaltung bei vollem Tank. Filter und Tank solltest du in einer Minute reinigen können, sonst riecht das Gerät nach einigen Wochen selbst muffig.",
      ] },
    ],
    example: {
      title: "Wassermenge nach dem Duschen",
      intro: "Bad mit 20 m³, 24 °C, Anstieg von 50 auf 90 Prozent relative Feuchte.",
      steps: [
        { label: "Sättigung bei 24 °C", value: "knapp 22 g/m³" },
        { label: "Vorher", value: "20 m³ × 11 g = 220 g" },
        { label: "Nachher", value: "20 m³ × 19,6 g = 392 g" },
        { label: "Zusätzliche Feuchte", value: "rund 170 bis 175 g" },
      ],
      result: "Knapp 0,2 Liter Wasser in der Luft, dazu der Film auf Wänden und Handtüchern.",
    },
    checklist: [],
    faqs: [
      { question: "Hilft ein Luftentfeuchter gegen Schimmel im Bad?", answer: "Er senkt die Feuchte und nimmt dem Schimmel die Grundlage. Vorhandener Schimmel muss trotzdem entfernt werden, und Ursachen wie eine kalte Außenecke oder ein defekter Lüfter bleiben bestehen." },
      { question: "Reichen Granulat-Entfeuchter?", answer: "Für einen Schrank ja. Für 170 g Wasser je Dusche sind sie zu langsam und müssen ständig nachgefüllt werden." },
    ],
  },

  "luftentfeuchter-kompressor-oder-adsorption": {
    intro: "Ab etwa 15 °C ist ein Kompressorgerät die sparsamere Wahl. Darunter lässt seine Leistung stark nach, weil der Verdampfer vereist. In unbeheizten Kellern, Garagen oder Wohnwagen arbeitet ein Adsorptionsgerät zuverlässiger.",
    takeaway: "Miss die Temperatur an einem kalten Tag. Über 15 °C: Kompressor. Unter 10 °C: Adsorption. Dazwischen entscheidet, ob der Hersteller Leistungswerte für deine Temperatur nennt.",
    sections: [
      { title: "So arbeiten die beiden Geräte", paragraphs: [
        "Ein Kompressorgerät funktioniert wie ein Kühlschrank. Luft strömt über eine kalte Fläche, das Wasser kondensiert und läuft in den Tank. Ist der Raum selbst kalt, bildet sich auf dieser Fläche Eis, und das Gerät muss immer wieder abtauen.",
        "Ein Adsorptionsgerät bindet Wasser an ein Trocknungsmittel und heizt es anschließend wieder aus. Die Raumtemperatur spielt dabei kaum eine Rolle. Das Heizen kostet aber Strom und wärmt den Raum um einige Grad auf.",
      ] },
      { title: "Was das beim Strom ausmacht", paragraphs: [
        "Vergleiche die Leistungsaufnahme im Verhältnis zur entzogenen Wassermenge. Ein Beispiel mit angenommenen Werten: Zieht ein Kompressorgerät mit 250 W im warmen Raum 8 Liter am Tag, kostet jeder Liter 0,75 kWh. Ein Adsorptionsgerät mit 600 W und 8 Litern braucht 1,8 kWh je Liter.",
        "Im 8 °C kalten Keller kann sich das umkehren. Wenn der Kompressor dort nur noch einen Liter schafft, sind es 6 kWh je Liter. Frag deshalb nach dem Wert bei niedriger Temperatur.",
      ] },
      { title: "Lautstärke und Wärme", paragraphs: [
        "Kompressoren brummen und schalten hörbar, Adsorptionsgeräte rauschen gleichmäßig wie ein Lüfter. In dB sind sie oft ähnlich. Im Schlafzimmer stört vielen das Schalten mehr. Die Abwärme des Adsorptionsgeräts ist im Winterkeller angenehm und im Sommer unter dem Dach eher lästig.",
      ] },
      { title: "Was du vorher klären solltest", paragraphs: [
        "Häng ein Thermo-Hygrometer für eine Woche in den Raum und schreib morgens und abends die Werte auf. Steigt die Feuchte vor allem an warmen Sommertagen, kommt sie vermutlich durch das offene Kellerfenster. Dann hilft es, nur nachts zu lüften.",
        "Bei nassen Flecken oder abblätterndem Putz dringt Wasser von außen ein. Ein Entfeuchter überdeckt das nur.",
      ] },
    ],
    comparison: {
      caption: "Kompressor und Adsorption im direkten Vergleich",
      columns: ["Merkmal", "Kompressor", "Adsorption"],
      rows: [
        ["Temperatur", "gut ab etwa 15 °C", "auch nahe 0 °C"],
        ["Strom je Liter", "niedriger im warmen Raum", "niedriger im kalten Raum möglich"],
        ["Geräusch", "Brummen, schaltet hörbar", "gleichmäßiges Rauschen"],
        ["Abwärme", "gering", "spürbar"],
        ["Typischer Ort", "Wohnraum, Waschküche, beheizter Keller", "Garage, kalter Keller, Wohnwagen"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Gilt die Grenze von 15 Grad für jedes Gerät?", answer: "Nein, sie ist ein Richtwert. Manche Kompressorgeräte tauen automatisch mit Heißgas ab und sind bis 5 °C freigegeben. Die Literleistung sinkt trotzdem, schau deshalb auf den Wert für deine Temperatur." },
      { question: "Welche Technik eignet sich zum Wäschetrocknen?", answer: "Im warmen Raum das Kompressorgerät. Im kalten Keller trocknet das Adsorptionsgerät schneller, auch weil es den Raum erwärmt." },
    ],
  },

  "sichtschutz-10-meter-berechnen": {
    intro: "Zehn Meter Sichtschutz lassen sich mit 1,80-m-Elementen nicht glatt teilen. Fünf Elemente und sechs Pfosten ergeben 9,54 m, es fehlen 46 cm. Du hast drei Möglichkeiten, damit umzugehen.",
    takeaway: "Am saubersten sieht die Lösung mit sechs gleich gekürzten Feldern aus, wenn dein System das Kürzen erlaubt. Sonst planst du ein schmales Feld von 37 cm am Ende oder setzt dort eine Pflanze.",
    sections: [
      { title: "Die drei Aufteilungen", paragraphs: [
        "Gerechnet ist mit Elementen von 1,80 m und Pfosten von 9 cm. Zu jedem Feld gehört ein Pfosten, dazu ein zusätzlicher am Ende.",
        "Das schmale Endfeld braucht einen siebten Pfosten. Von den fehlenden 46 cm bleiben deshalb nur 37 cm für die Füllung. Viele übersehen das und bestellen zu breit.",
      ] },
      { title: "Darfst du Elemente kürzen?", paragraphs: [
        "Bei Stecksystemen mit einzelnen Profilen geht das meist: Du sägst jedes Profil auf dieselbe Länge. Fertige Holzrahmen lassen sich nur auf einer Seite kürzen und verlieren dort den Rahmen. Aluminium mit Pulverbeschichtung braucht Schutz an der Schnittkante. Glas und fertige WPC-Rahmen lässt du in Ruhe.",
      ] },
      { title: "Fundamente rechnen", paragraphs: [
        "Sieben Pfosten brauchen sieben Punktfundamente. Als Beispiel: Ein Loch mit 30 × 30 cm und 80 cm Tiefe fasst 72 Liter Beton. Für sieben sind das gut 0,5 m³ und damit rund 1.100 bis 1.200 kg. Das trägst du nicht mit dem Kombi nach Hause.",
        "Größe und Tiefe legt der Systemhersteller fest. An einer windigen Ecke oder bei 1,80 m Höhe kann deutlich mehr nötig sein.",
      ] },
      { title: "Gefälle, Tor und Nachbar", paragraphs: [
        "Im Hang staffelst du die Felder oder lässt unten einen Keil offen. Die Pfosten werden dann unterschiedlich lang. Ein Tor planst du zuerst ein und teilst nur die restliche Strecke.",
        "Höhe und Grenzabstand regelt das Landesrecht, oft auch der Bebauungsplan. Ein Anruf beim Bauamt und ein Gespräch mit dem Nachbarn sparen Ärger.",
      ] },
    ],
    comparison: {
      caption: "10,00 m aufteilen mit 9-cm-Pfosten",
      columns: ["Variante", "Felder", "Pfosten"],
      rows: [
        ["Fünf volle Elemente, 46 cm bleiben offen", "5 × 1,80 m", "6"],
        ["Fünf volle plus ein schmales Endfeld", "5 × 1,80 m + 0,37 m", "7"],
        ["Sechs gleich gekürzte Felder", "6 × 1,56 m", "7"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Wie viele Pfosten brauche ich für 10 Meter?", answer: "Bei sechs Feldern sieben Pfosten, bei fünf Feldern sechs. Es ist immer einer mehr als Felder, solange keine Wand den Endpfosten ersetzt." },
      { question: "Zählt die Elementbreite mit oder ohne Pfosten?", answer: "Das ist je nach Hersteller verschieden. Manche nennen das Achsmaß von Pfostenmitte zu Pfostenmitte. Dann rechnest du die Pfostenbreite nicht noch einmal dazu." },
    ],
  },

  "bewaesserung-bei-wenig-wasserdruck": {
    intro: "Wenig Druck heißt selten, dass nichts geht. Meistens laufen zu viele Regner gleichzeitig, oder ein langer, dünner Schlauch frisst den Druck auf. Ein Eimer und eine Stoppuhr zeigen dir in zwei Minuten, womit du planen kannst.",
    takeaway: "Füllt sich ein 10-Liter-Eimer in 50 Sekunden, hast du 12 l/min. Plane je Zone höchstens 9 l/min und lass die Zonen nacheinander laufen.",
    sections: [
      { title: "Der Eimertest", paragraphs: [
        "Stell einen 10-Liter-Eimer an das Ende des Schlauchs, den du später benutzt, und stopp die Zeit. 600 geteilt durch die Sekunden ergibt Liter pro Minute. Mach den Test zu der Uhrzeit, zu der bewässert werden soll, und lass einmal jemanden im Haus duschen.",
        "Zieh danach ein Viertel ab. Dieser Puffer fängt Schwankungen im Netz und die Verluste in Filter und Ventil auf.",
      ] },
      { title: "Was mit 9 Litern pro Minute läuft", paragraphs: [
        "9 l/min sind 540 Liter in der Stunde. Ein Tropfrohr mit 2 l/h je Tropfer und 30 cm Abstand braucht 6,7 l/h je Meter. Rechnerisch versorgst du damit 80 m, sofern der Hersteller diese Stranglänge erlaubt. Für Hecken und Beete ist das reichlich.",
        "Ein Versenkregner liegt oft zwischen 4 und 12 l/min und braucht zusätzlich Druck, damit er seine Wurfweite erreicht. Mit 9 l/min betreibst du also einen, vielleicht zwei kleine Regner je Zone.",
      ] },
      { title: "Erst die Verluste senken, dann über eine Pumpe nachdenken", paragraphs: [
        "Ein Schlauch mit ¾ Zoll statt ½ Zoll senkt den Reibungsverlust deutlich. Jeder Meter Höhenunterschied kostet 0,1 bar. Verstopfte Filtersiebe am Wasserhahn und ein halb geschlossenes Ventil sind die Klassiker.",
        "Bleibt der Druck zu niedrig, kann eine Zisterne mit Pumpe helfen. Direkt an die Trinkwasserleitung darfst du eine Druckerhöhung nicht einfach anschließen. Das klärst du mit dem Installateur oder Versorger.",
      ] },
      { title: "Zonen sinnvoll aufteilen", paragraphs: [
        "Trenne Rasen und Beete, weil Tropfer lange und Regner kurz laufen. Drei Zonen mit je 40 Minuten sind nach zwei Stunden fertig. Starte früh am Morgen, dann ist der Verbrauch im Haus gering und es verdunstet wenig.",
      ] },
    ],
    example: {
      title: "Vom Eimer zur Zone",
      intro: "Gemessen am Schlauchende, morgens um sechs.",
      steps: [
        { label: "Füllzeit", value: "10 Liter in 50 Sekunden" },
        { label: "Durchfluss", value: "600 ÷ 50 = 12 l/min" },
        { label: "Ein Viertel Reserve", value: "12 × 0,75 = 9 l/min" },
        { label: "Tropfrohr, 2 l/h alle 30 cm", value: "540 ÷ 6,7 = rund 80 m" },
      ],
      result: "Bis zu 80 m Tropfrohr oder ein kleiner Regner gleichzeitig.",
    },
    checklist: [],
    faqs: [
      { question: "Wie viel Druck braucht eine Tropfbewässerung?", answer: "Viele Systeme arbeiten mit 1 bis 1,5 bar und brauchen sogar einen Druckminderer. Bei schwachem Netz ist das ein Vorteil." },
      { question: "Warum sinkt der Druck, sobald Wasser fließt?", answer: "Im Stand zeigt das Manometer den Ruhedruck. Beim Fließen reibt das Wasser an Rohr und Schlauch. Für die Planung zählt deshalb der Fließdruck." },
    ],
  },

  "carport-fuer-suv": {
    intro: "Ein SUV mit 2,05 m Spiegelbreite braucht zwischen den Pfosten rund 3,55 m, wenn du auf beiden Seiten bequem aussteigen willst. Mit 2,8 bis 3,0 m passt das Auto hinein, aber die Türen gehen nicht mehr richtig auf.",
    takeaway: "Rechne mit 3,55 m lichter Breite, 2,40 m lichter Höhe bei Dachbox und 5,50 bis 5,80 m Länge. Außenmaße und Dachmaße aus Prospekten sind immer größer als der Platz zwischen den Pfosten.",
    sections: [
      { title: "Breite: die Tür entscheidet", paragraphs: [
        "Zur Breite mit ausgeklappten Spiegeln kommen 75 cm Ausstieg je Seite: 2,05 + 0,75 + 0,75 = 3,55 m. Steigst du nur auf der Fahrerseite aus, reichen rechts 30 cm und insgesamt 3,10 m.",
        "Die Pfosten stehen oft nicht am Rand, sondern eingerückt. Frag nach dem lichten Maß zwischen ihnen. Mit 12-cm-Pfosten ist ein Carport mit 3,55 m Innenbreite außen mindestens 3,79 m breit, das Dach noch breiter.",
      ] },
      { title: "Höhe: Dachbox und Heckklappe", paragraphs: [
        "Ein SUV ist etwa 1,65 bis 1,80 m hoch, eine Dachbox samt Träger bringt 45 bis 50 cm. Dazu 10 cm Luft, schon bist du bei 2,40 m. Die geöffnete Heckklappe kann ähnlich hoch reichen. Miss sie an deinem Auto nach.",
        "Beim Flachdach mit Gefälle zählt die niedrigste Stelle an der Einfahrt, inklusive Querbalken und Rinne.",
      ] },
      { title: "Länge und Anfahrt", paragraphs: [
        "Mit 4,70 bis 5,00 m Fahrzeuglänge bleiben bei 5,50 bis 5,80 m Platz hinten für die Klappe und vorn zum Vorbeigehen. Steht eine Wand am Ende, plane den Platz vor dem Kofferraum großzügiger.",
        "Markiere die Pfosten mit Eimern und fahre ein paar Mal ein. Eine enge Kurve direkt vor dem Carport kostet mehr Breite, als jede Tabelle verrät.",
      ] },
      { title: "Vor dem Kauf", paragraphs: [
        "Prüfe Schneelast und Windzone für deinen Ort, das steht beim Hersteller im Datenblatt. Ob du eine Genehmigung brauchst, regelt die Landesbauordnung. Einzelcarports sind häufig bis zu einer bestimmten Größe verfahrensfrei, Abstände gelten trotzdem.",
        "Für eine Wallbox lege gleich ein Leerrohr unter das Pflaster.",
      ] },
    ],
    comparison: {
      caption: "Lichte Breite für 2,05 m Spiegelbreite",
      columns: ["Nutzung", "Rechnung", "Zwischen den Pfosten"],
      rows: [
        ["Nur einparken", "2,05 + 2 × 0,40 m", "2,85 m"],
        ["Ausstieg auf einer Seite", "2,05 + 0,75 + 0,30 m", "3,10 m"],
        ["Ausstieg auf beiden Seiten", "2,05 + 2 × 0,75 m", "3,55 m"],
        ["Kindersitze auf beiden Seiten", "2,05 + 2 × 0,90 m", "3,85 m"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein Standard-Einzelcarport mit 3 m Breite?", answer: "Das hängt vom lichten Maß ab. Sind 3 m das Dachmaß, bleiben zwischen den Pfosten oft nur 2,5 bis 2,7 m. Für einen SUV ist das zu eng." },
      { question: "Wie hoch muss ein Carport für einen SUV sein?", answer: "Ohne Dachbox genügen meist 2,10 bis 2,20 m, mit Dachbox plane 2,40 m an der niedrigsten Stelle." },
    ],
  },

  "gewaechshaus-klein-2x3-meter": {
    intro: "In ein Gewächshaus mit 2 × 3 m Innenmaß passen zwei Beete mit je 65 cm und ein Weg von 70 cm. Das sind 3,9 m² Beet, genug für zwölf Tomaten oder eine Mischung aus Tomaten, Gurken und Paprika.",
    takeaway: "Zwei Seitenbeete à 65 cm, 70 cm Mittelweg, mindestens ein Dachfenster. Prüfe vor dem Kauf das Innenmaß, denn 2 × 3 m im Prospekt sind häufig das Außenmaß.",
    sections: [
      { title: "So teilst du sechs Quadratmeter auf", paragraphs: [
        "Ein 65 cm tiefes Beet erreichst du vom Weg aus bis zur Scheibe. Breiter wird es mühsam, weil du beim Ausgeizen in die Pflanzen trittst. 70 cm Weg reichen für eine Person mit Gießkanne. Für eine Schubkarre plane 80 cm und kürze ein Beet.",
        "Wer lieber mit Töpfen arbeitet, ersetzt eine Seite durch Regale. Stell sie an die Nordseite, damit sie keine Beete beschatten.",
      ] },
      { title: "Wie viele Pflanzen hineinpassen", paragraphs: [
        "Tomaten brauchen etwa 50 cm Abstand. In einer 3 m langen Reihe stehen sechs, in zwei Beeten zwölf. Gurken wollen 50 bis 60 cm und viel Luftfeuchte, Tomaten mögen es trockener. Setz die Gurken deshalb an das Ende, das weiter von der Tür weg liegt.",
        "Vorne an der Tür ist es am kühlsten. Dort stehen Salat, Kräuter und Jungpflanzen gut.",
      ] },
      { title: "Lüftung auf kleinem Raum", paragraphs: [
        "Ein kleines Gewächshaus heizt sich schneller auf als ein großes. An einem klaren Maitag sind 40 °C in einer Stunde erreicht. Ein Dachfenster ist das Minimum, zwei mit automatischen Öffnern sind besser. Die offene Tür sorgt für Zuluft, ersetzt das Dachfenster aber nicht, weil die Hitze oben sitzt.",
      ] },
      { title: "Fundament und Standort", paragraphs: [
        "Für 2 × 3 m genügt häufig ein Fundamentrahmen auf verdichtetem Schotter oder Punktfundamenten, wenn der Hersteller das vorsieht. Wichtig ist die Verankerung: Ein leichtes Haus hebt der Wind an, wenn die Tür offen steht. Such einen Platz mit mindestens sechs Stunden Sonne und Schutz vor Westwind.",
      ] },
    ],
    example: {
      title: "Aufteilung bei 2,0 × 3,0 m innen",
      intro: "Zwei gleich breite Beete mit Mittelweg.",
      steps: [
        { label: "Breite", value: "0,65 + 0,70 + 0,65 = 2,00 m" },
        { label: "Beetfläche", value: "2 × 0,65 × 3,0 = 3,9 m²" },
        { label: "Weg", value: "0,70 × 3,0 = 2,1 m²" },
        { label: "Tomaten bei 50 cm Abstand", value: "2 × 6 = 12 Pflanzen" },
      ],
      result: "Zwei Drittel der Fläche sind Beet, ein Drittel ist Weg.",
    },
    checklist: [],
    faqs: [
      { question: "Reichen 2 × 3 Meter für eine vierköpfige Familie?", answer: "Für frische Tomaten, Gurken und Kräuter im Sommer ja. Wer einkochen oder im Winter ernten will, ist mit 8 bis 10 m² besser bedient." },
      { question: "Wie hoch sollte die Seitenwand sein?", answer: "Je höher, desto besser für Tomaten und Gurken. Unter etwa 1,30 m Traufhöhe stoßen hohe Kulturen in den Seitenbeeten früh ans Dach." },
    ],
  },

  "laminat-fuer-20-qm": {
    intro: "Für 20 m² Laminat bestellst du bei einem einfachen Raum 21 m², bei vielen Ecken 22 m². Mit Paketen zu 2,4 m² sind das neun beziehungsweise zehn Pakete. Dazu kommen 20 m² Unterlage und rund 17 m Sockelleiste.",
    takeaway: "Raumfläche × 1,05 bei einem rechteckigen Raum, × 1,10 bei Nischen oder schrägen Wänden. Das Ergebnis durch den Paketinhalt teilen und aufrunden.",
    sections: [
      { title: "Pakete statt Quadratmeter", paragraphs: [
        "Laminat gibt es nur in ganzen Paketen. 21 m² durch 2,4 m² ergeben 8,75, also neun Pakete mit 21,6 m². Bei 22 m² wären es 9,17 und damit schon zehn. Der eine Quadratmeter Verschnitt mehr kostet dich ein ganzes Paket. Rechne deshalb mit dem echten Paketinhalt deines Bodens.",
      ] },
      { title: "Wann 5 Prozent reichen", paragraphs: [
        "In einem Zimmer mit 5 × 4 m verlegst du gerade und beginnst die nächste Reihe mit dem Reststück der vorigen. Bleibt es mindestens so lang, wie der Hersteller als Versatz verlangt (oft 30 bis 40 cm), entsteht wenig Abfall.",
        "Bei Nischen, Heizungsrohren, schrägen Wänden oder diagonaler Verlegung rechne mit 10 Prozent und mehr. Leg außerdem zwei, drei Dielen für spätere Reparaturen weg, dieselbe Charge bekommst du nach ein paar Jahren kaum noch.",
      ] },
      { title: "Was sonst noch auf den Zettel gehört", paragraphs: [
        "Unterlage: 20 m², bei Fußbodenheizung eine mit niedrigem Wärmedurchlasswiderstand. Auf Beton und Estrich kommt meist eine Dampfbremsfolie darunter, wenn sie nicht in die Unterlage integriert ist.",
        "Sockelleisten: Ein Raum mit 5 × 4 m hat 18 m Umfang. Minus 0,9 m Tür bleiben 17,1 m. Bei 2,4-m-Leisten sind das acht Stück. Für den Türdurchgang brauchst du eine Übergangsschiene.",
      ] },
      { title: "Dehnungsfuge", paragraphs: [
        "Laminat arbeitet. Ringsum bleiben in der Regel 8 bis 10 mm Abstand zu Wänden, Rohren und Türzargen. Klemmst du den Boden unter schwere Einbauschränke, kann er sich an einer anderen Stelle aufwölben.",
      ] },
    ],
    example: {
      title: "Bestellmenge für 5 × 4 m",
      intro: "Pakete mit 2,4 m², gerade Verlegung.",
      steps: [
        { label: "Fläche", value: "5 × 4 = 20 m²" },
        { label: "Mit 5 % Verschnitt", value: "21 m² ÷ 2,4 = 8,75, also 9 Pakete" },
        { label: "Mit 10 % Verschnitt", value: "22 m² ÷ 2,4 = 9,17, also 10 Pakete" },
        { label: "Sockelleisten", value: "18 − 0,9 = 17,1 m, also 8 × 2,4 m" },
      ],
      result: "Neun Pakete für den einfachen Raum, zehn bei vielen Zuschnitten.",
    },
    checklist: [],
    faqs: [
      { question: "Zähle ich die Fläche unter der Küche mit?", answer: "Unter fest eingebauten Küchenzeilen wird Laminat meist nicht verlegt. Zieh diese Fläche ab, aber erst, wenn der Küchenplan feststeht." },
      { question: "Kann ich übrige Pakete zurückgeben?", answer: "Viele Baumärkte nehmen ungeöffnete Pakete zurück. Frag vor dem Kauf nach der Frist und heb den Beleg auf." },
    ],
  },

  "gartenhaus-fuer-zwei-fahrraeder": {
    intro: "Für zwei Fahrräder reichen innen 3,3 bis 4 m². Stehen sie nebeneinander, brauchst du 1,15 bis 1,30 m Wand. Verteilst du sie auf beide Seitenwände, genügt ein Haus mit 2 × 2 m Innenmaß, und jedes Rad ist sofort frei.",
    takeaway: "Rechne mit 2,0 m Innenlänge und 80 cm lichter Türbreite. Sollen Werkzeug und ein Regal mit hinein, plane 4 m² statt 2,5 m².",
    sections: [
      { title: "Drei Stellpläne für zwei Räder", paragraphs: [
        "Die Tabelle rechnet mit 1,85 m Radlänge und 65 cm Lenkerbreite. Nebeneinander kommt ein Meter Platz zum Herausziehen dazu. Hängt ein Vorderrad 25 bis 30 cm höher, greifen die Lenker übereinander, und du sparst 15 cm Breite.",
        "Mit je einem Rad an jeder Längswand läuft der Gang mitten durch. Er ist zugleich der Weg zur Rückwand, an der noch ein schmales Regal Platz findet.",
      ] },
      { title: "Ab wann es für Regal und Werkzeug reicht", paragraphs: [
        "Unser Planer gibt für zwei Räder allein 2,5 m² aus. Das ist die Untergrenze für Räder, die dicht stehen. Mit wenig Werkzeug und einem Regal sind es 4 m², mit einem Rasenmäher zusätzlich 5 m².",
        "Kaufst du genau 4 m², bleibt der Gang frei, solange nichts auf dem Boden landet. Besen, Schlauch und Luftpumpe gehören deshalb an die Wand.",
      ] },
      { title: "Das E-Bike ändert die Schwelle", paragraphs: [
        "Ein E-Bike wiegt häufig 22 bis 28 kg. Über eine Schwelle von 10 cm hebst du es jedes Mal an. Eine Rampe von 60 cm Länge macht daraus eine Steigung von knapp 17 Prozent, das lässt sich schieben.",
        "Häng schwere Räder nicht auf. Der Akku überwintert im Haus, weil er bei Frost weder gern lädt noch lange hält.",
      ] },
      { title: "Anschließen statt nur abschließen", paragraphs: [
        "Die Wände eines kleinen Gartenhauses halten einen Einbrecher nicht lange auf. Ein Bodenanker in einer Betonplatte oder einem Punktfundament ist mehr wert als ein zweites Türschloss. Schrauben im Holzboden hebelt man aus.",
      ] },
    ],
    comparison: {
      caption: "Platzbedarf für zwei Räder",
      columns: ["Anordnung", "Innenmaß", "Fläche"],
      rows: [
        ["Nebeneinander, höhenversetzt", "1,15 × 2,85 m", "3,3 m²"],
        ["Nebeneinander, gleiche Höhe", "1,30 × 2,85 m", "3,7 m²"],
        ["Je ein Rad an jeder Längswand, 70 cm Gang", "2,00 × 2,00 m", "4,0 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Passt ein Lastenrad dazu?", answer: "Meist nicht. Lastenräder sind oft 2,10 bis 2,60 m lang. Plane dafür eine eigene Längswand mit mindestens 2,70 m und eine Tür ab 1,20 m." },
      { question: "Ist eine Fahrradbox die bessere Lösung?", answer: "Wenn wirklich nur zwei Räder hineinsollen, ja. Sie braucht rund 2 m² und steht näher am Haus. Ein Gartenhaus lohnt sich, sobald Werkzeug oder Möbel dazukommen." },
    ],
  },

  "gartenhaus-fuer-rasenmaeher": {
    intro: "Ein handgeführter Rasenmäher belegt mit Griff und Fangkorb rund 0,9 m². Mit Platz zum Hineinrollen und etwas Werkzeug brauchst du ein Gartenhaus ab 3,5 m². Für einen Aufsitzmäher ist das zu klein, er füllt allein 2,5 m².",
    takeaway: "Handmäher: ab 3,5 m² und 80 cm Tür. Aufsitzmäher: breite Doppeltür, ebener Boden und etwa 2,5 m² freie Stellfläche, zu der alles andere dazukommt.",
    sections: [
      { title: "Was der Planer für den Mäher ansetzt", paragraphs: [
        "Für einen Handmäher rechnen wir pauschal 0,8 m² und 80 cm Türbreite, dazu 0,8 m² Bewegungsfläche. Mit 15 Prozent Reserve sind das 2 m² nur für das Gerät. Wenig Werkzeug und ein Regal heben den Wert auf 3,5 m², mittelviel Gerät auf 4,5 m².",
        "Den Aufsitzmäher kennt der Planer nicht. Miss ihn mit Fangkorb und rechne seine Fläche selbst dazu.",
      ] },
      { title: "Lagerstellung spart einen halben Quadratmeter", paragraphs: [
        "Viele Handmäher lassen sich mit geklapptem Griff auf etwa 60 × 80 cm zusammenschieben, einige dürfen hochkant stehen und brauchen dann nur 60 × 60 cm. Ob das erlaubt ist, steht in der Anleitung. Bei Benzinmähern läuft sonst Öl in den Luftfilter.",
        "Miss die Breite an den Rädern. Dort ist ein Mäher mit 46 cm Schnittbreite oft 50 bis 55 cm breit.",
      ] },
      { title: "Benzin, Akku oder Kabel", paragraphs: [
        "Benzingeräte riechen und dünsten aus. Lass den Motor abkühlen, bevor du die Tür schließt, und sorge für Lüftungsöffnungen oben und unten. Kraftstoff lagerst du nur in kleinen Mengen und in zugelassenen Kanistern.",
        "Beim Akkumäher nimmst du den Akku im Winter mit ins Haus. Im Gartenhaus braucht er dann keinen Stromanschluss.",
      ] },
      { title: "Boden und Rampe", paragraphs: [
        "Ein Handmäher wiegt 15 bis 40 kg, das trägt jeder Gartenhausboden. Ein Aufsitzmäher bringt 180 bis 300 kg auf vier kleine Reifen. Dafür ist ein gepflasterter oder betonierter Boden die einfachere Lösung, der Holzboden kann dann entfallen.",
        "Für eine Schwelle von 10 cm reicht dem Handmäher eine Rampe von 60 cm. Der Aufsitzmäher setzt dort leicht mit dem Mähwerk auf, plane für ihn mindestens 1,5 m.",
      ] },
    ],
    comparison: {
      caption: "Mäherart und Gartenhaus",
      columns: ["Gerät", "Stellfläche", "Lichte Tür"],
      rows: [
        ["Handmäher, hochkant gelagert", "0,6 × 0,6 m", "80 cm"],
        ["Handmäher, Griff ausgeklappt", "0,6 × 1,5 m", "80 cm"],
        ["Aufsitzmäher mit Fangkorb", "1,05 × 2,40 m", "125 cm"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Kann ein Mähroboter im Gartenhaus überwintern?", answer: "Ja, trocken und mit geladenem Akku. Wird es dort kälter, als die Anleitung erlaubt, stellst du ihn besser in den Keller." },
    ],
  },

  "gartenhaus-mit-werkstatt": {
    intro: "Für eine Werkbank, ein Regal und mittelviel Werkzeug brauchst du 6 m². Mit Maschinen, die stehen bleiben sollen, werden es 8 bis 10 m². Allein die Werkbank mit 2,0 × 0,7 m belegt samt Arbeitsplatz davor 3,8 m².",
    takeaway: "Ab 6 m² kann eine Person arbeiten. Plane 1,2 m freie Tiefe vor der Werkbank und eine Tür gegenüber der Längsachse, damit lange Bretter nach draußen reichen dürfen.",
    sections: [
      { title: "So kommen die Quadratmeter zusammen", paragraphs: [
        "Die Werkbank ist 70 cm tief. Davor stehst du, bückst dich und legst ein Werkstück ab, dafür brauchst du 1,2 m. Zwei Meter Breite mal 1,9 m ergeben 3,8 m², und noch hängt kein Werkzeug an der Wand.",
        "Der Planer rechnet für Werkbank, Regal und mittelviel Gerät 6 m². Kommt ein Rasenmäher dazu, sind es 6,5 m². Viel Gerät ohne Mäher ergibt 7 m².",
      ] },
      { title: "Lange Bretter sind das eigentliche Maß", paragraphs: [
        "Ein 2,40 m langes Brett braucht an der Säge 2,40 m davor und 2,40 m dahinter, zusammen 4,80 m. So tief ist kaum ein Gartenhaus. Stell die Säge in die Flucht der Tür, dann liegt die zweite Hälfte draußen.",
        "Kapp- und Tischkreissäge auf Rollen sparen Fläche, solange du sie für den Sägetag vor das Haus schieben kannst.",
      ] },
      { title: "Licht, Strom und Wärme", paragraphs: [
        "Für feine Arbeiten gelten 500 Lux auf der Fläche als Richtwert. Auf 3,8 m² sind das rechnerisch 1.900 Lumen. Weil Wände und Dach Licht schlucken, nimm ungefähr das Doppelte und verteile es auf zwei Leuchten, sonst arbeitest du im eigenen Schatten.",
        "Den Anschluss legt ein Elektriker mit Erdkabel, Fehlerstromschutz und eigenem Stromkreis. Ein Verlängerungskabel durch den Garten ist für eine Werkstatt keine Dauerlösung.",
      ] },
      { title: "Boden und Staub", paragraphs: [
        "Standbohrmaschine und Werkbank stehen auf wenigen Punkten. Auf einem dünnen Holzboden federt das, auf einer Platte oder mit zusätzlichen Lagerhölzern nicht. Frag nach der zulässigen Last je Quadratmeter.",
        "Holzstaub und offene Heizgeräte passen nicht zusammen. Saug an der Maschine ab und lüfte quer, bevor du den Raum wieder aufheizt.",
      ] },
    ],
    comparison: {
      caption: "Planungswerte für die Werkstatt",
      columns: ["Ausstattung", "Planer", "Passendes Außenmaß"],
      rows: [
        ["Werkbank und Regal", "4,0 m²", "ab etwa 2,5 × 2 m"],
        ["Dazu mittelviel Werkzeug", "6,0 m²", "ab etwa 3 × 2,5 m"],
        ["Dazu ein Rasenmäher", "6,5 m²", "ab etwa 3 × 2,5 m"],
        ["Werkbank, Regal, viel Werkzeug", "7,0 m²", "ab etwa 3 × 3 m"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht eine Wandstärke von 19 mm?", answer: "Für eine Werkstatt im Sommer ja. Wer im Winter arbeitet oder Schränke an die Wand hängt, ist mit 28 mm oder mehr besser bedient." },
      { question: "Darf ich im Gartenhaus Krach machen?", answer: "Auch im eigenen Garten gelten Ruhezeiten, und dünne Holzwände dämmen wenig. Schau in die Satzung deiner Gemeinde, bevor du die Säge für den Sonntag einplanst." },
    ],
  },

  "gartenhaus-2x2-meter": {
    intro: "Von einem Gartenhaus mit 2 × 2 m bleiben innen 2,7 bis 3,8 m². Wie viel genau, hängt davon ab, ob der Händler Wandmaß, Außenmaß oder Dachmaß angibt. Für Mäher und Werkzeug reicht das, für zwei Räder mit Regal nicht mehr.",
    takeaway: "Frag nach dem Innenmaß, bevor du den Stellplan zeichnest. Unter 1,85 m Innenlänge passt ein Erwachsenenrad nicht mehr gerade an die Wand.",
    sections: [
      { title: "Drei Bedeutungen von „2 × 2 Meter“", paragraphs: [
        "Die Tabelle rechnet mit 28 mm starken Bohlen. Beim Wandmaß ziehst du nur die Wände ab. Beim Außenmaß von Blockbohlen stecken an jeder Ecke noch ein paar Zentimeter Überstand mit drin. Beim Dachmaß fehlt zusätzlich der Dachüberstand.",
        "Zwischen bestem und schlechtestem Fall liegen 1,1 m². Das ist mehr als ein Rasenmäher mit ausgeklapptem Griff belegt.",
      ] },
      { title: "Was auf 3,4 m² passt", paragraphs: [
        "Laut Planer: Rasenmäher und wenig Werkzeug mit 3,0 m², ein Rad und ein Mäher mit 3,0 m², mittelviel Werkzeug mit 3,0 m² oder wenig Werkzeug und ein Regal mit 2,5 m². Sobald ein Regal zu Mäher und Werkzeug dazukommt, sind es 3,5 m², und es wird knapp.",
        "Auch zwei Räder mit Regal liegen bei 3,5 m². Dazu kommt die Länge: 1,84 m Innenmaß sind einen Zentimeter kürzer als ein übliches Rad.",
      ] },
      { title: "Einrichten ohne verbauten Gang", paragraphs: [
        "Ein 40 cm tiefes Regal an der Rückwand lässt 1,44 m davor frei. Das genügt, um einen Mäher mit geklapptem Griff zu wenden. Ein Regal an der Seite, gegenüber der Tür, ist schlechter: Dann musst du für jeden Griff am Mäher vorbei.",
        "Nutz die Türinnenseite für Scheren und Schnüre. Leichtes wie Kissen oder Kübel kommt unter das Dach.",
      ] },
      { title: "Tür und Standplatz", paragraphs: [
        "Bei zwei Metern Breite nimmt eine Doppeltür fast die ganze Front ein. Das ist praktisch, kostet aber die Wandfläche neben der Tür. Außen brauchst du je Flügel 60 bis 80 cm zum Aufschwenken.",
        "Die Standfläche muss größer sein als das Dachmaß vermuten lässt: Rund um das Haus willst du streichen können. 50 cm Abstand zur Hecke reichen dafür.",
      ] },
    ],
    comparison: {
      caption: "Innenmaß bei 28-mm-Wänden",
      columns: ["Angabe 2,00 × 2,00 m meint", "Innenmaß", "Innenfläche"],
      rows: [
        ["Wandaußenmaß", "1,94 × 1,94 m", "3,8 m²"],
        ["Außenmaß mit 5 cm Bohlenüberstand je Seite", "1,84 × 1,84 m", "3,4 m²"],
        ["Dachmaß mit 15 cm Überstand je Seite", "1,64 × 1,64 m", "2,7 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Passen Gartenmöbel für vier Personen hinein?", answer: "Vier Klappstühle und ein Klapptisch ja. Stapelsessel mit Armlehnen und ein fester Tisch füllen den Raum schon allein." },
    ],
  },

  "gartenhaus-3x3-meter": {
    intro: "Ein Gartenhaus mit 3 × 3 m hat innen etwa 8,1 m². Darin haben vier Räder, ein Mäher, Werkzeug und ein Regal Platz, oder zwei Räder mit Werkbank, Mäher und Regal. Beides zusammen geht nicht.",
    takeaway: "Entscheide dich für Fahrräder oder Werkbank als Hauptnutzung. Die Planerwerte liegen bei 7,5 und 8 m², also knapp unter den 8,1 m² Innenfläche.",
    sections: [
      { title: "Aus neun werden acht Quadratmeter", paragraphs: [
        "Gerechnet ist mit 3,00 m Außenmaß, 5 cm Bohlenüberstand je Seite und 28-mm-Wänden. Das ergibt 2,84 × 2,84 m. Ist 3,00 m das Dachmaß, bleiben je nach Überstand eher 7 m².",
      ] },
      { title: "Zwei Regalwände kosten ein Drittel", paragraphs: [
        "50 cm tiefe Regale an zwei gegenüberliegenden Wänden belegen 2 × 0,5 × 2,84 = 2,8 m². Übrig bleibt ein Streifen von 1,84 × 2,84 m, das sind 5,2 m². Ein Fahrrad steht darin längs, quer fehlt ihm ein Zentimeter.",
        "Mit 35 cm Regaltiefe gewinnst du 30 cm Breite und verlierst kaum Stauraum, denn die meisten Kisten sind ohnehin nur 30 bis 40 cm tief.",
      ] },
      { title: "Wo die Tür sitzen sollte", paragraphs: [
        "Sitzt sie mittig, entstehen zwei tiefe Seitenwände für Regal und Räder. Sitzt sie an der Ecke, verlierst du eine Wand als Laufweg, bekommst dafür aber 2 m zusammenhängende Front. Für die Werkbank ist die Ecktür meist besser.",
        "Ein Fenster gehört über die Werkbank. Hinter einem Regal bringt es nichts und lockt nur Blicke an.",
      ] },
      { title: "Wenn es nicht reicht", paragraphs: [
        "Vier Räder plus Werkbank, Regal und mittelviel Werkzeug brauchen 9 m². Dafür ist ein Haus mit 3 × 4 m die nächste Stufe. Alternativ kommen die Räder unter einen kleinen Anbau, und drinnen bleibt die Werkstatt.",
      ] },
    ],
    comparison: {
      caption: "Was laut Planer in 8,1 m² passt",
      columns: ["Nutzung", "Bedarf", "Passt?"],
      rows: [
        ["4 Räder, mittelviel Werkzeug, Regal", "6,5 m²", "ja"],
        ["Dazu ein Rasenmäher", "7,5 m²", "ja"],
        ["2 Räder, Werkbank, Werkzeug, Regal", "7,5 m²", "ja"],
        ["Dazu ein Rasenmäher", "8,0 m²", "knapp"],
        ["4 Räder, Werkbank, Werkzeug, Regal", "9,0 m²", "nein"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Brauche ich für 3 × 3 Meter eine Genehmigung?", answer: "Das regelt dein Bundesland, oft zusätzlich der Bebauungsplan. Gefragt wird nach Fläche oder umbautem Raum, Grenzabstand und Nutzung. Ein Anruf beim Bauamt klärt es schneller als jede Tabelle im Netz." },
      { question: "Welches Fundament passt?", answer: "Eine Platte von 3,0 × 3,0 m und 15 cm Dicke braucht 1,35 m³ Beton. Punktfundamente kommen mit deutlich weniger aus, müssen aber unter den Lagerhölzern sitzen." },
    ],
  },

  "gartenhaus-3x4-meter": {
    intro: "Ein Gartenhaus mit 3 × 4 m bietet innen rund 10,9 m². Das reicht für vier Räder, Werkbank, Mäher, Werkzeug und Regal, der Planer rechnet dafür 9,5 m². Mit sechs Rädern und derselben Ausstattung sind es 11 m², und es passt nicht mehr.",
    takeaway: "Die vier Meter lange Wand ist der Gewinn: Dort stehen Werkbank oder Räder, ohne die Tür zu blockieren. Halte daneben eine 90 cm breite Achse frei.",
    sections: [
      { title: "Die lange Wand richtig nutzen", paragraphs: [
        "Innen misst sie etwa 3,84 m. Eine 2,4 m lange Werkbank und ein 1,4 m breites Regal füllen sie fast genau. Oder du stellst Räder nebeneinander: Mit Höhenversatz brauchen sechs Stück 3,15 m, und knapp 70 cm bleiben für den Mäher.",
        "Leitern, Latten und Dachrinnen hängst du auf Kopfhöhe an dieselbe Wand. In einem Haus mit 3 × 3 m ginge das nur bis 2,8 m Länge.",
      ] },
      { title: "Werkstatt und Lager nebeneinander", paragraphs: [
        "Werkbank mit 0,7 × 2,4 m plus 1,2 m Arbeitsplatz davor: 4,6 m². Von 10,9 m² bleiben 6,3 m² für Lager und Weg. Das entspricht einem Raum mit 2,5 × 2,5 m.",
        "Eine leichte Trennwand hält den Sägestaub von den Fahrrädern fern. Sie braucht dann aber eine eigene Tür oder einen Vorhang.",
      ] },
      { title: "Tür auf der kurzen oder der langen Seite", paragraphs: [
        "Auf der kurzen Seite läufst du vier Meter tief hinein, hinten wird gestapelt und vergessen. Auf der langen Seite erreichst du alles nach spätestens drei Metern, verlierst aber Stellwand. Zwei Türen lösen das, kosten jedoch Dichtigkeit und einen Schließpunkt mehr.",
      ] },
      { title: "Fundament und Baurecht", paragraphs: [
        "Eine 15 cm starke Platte mit 3 × 4 m braucht 1,8 m³ Beton, also rund 4,3 t. Dafür bestellt man einen Fahrmischer. Punktfundamente sind günstiger, verlangen aber ein genaues Raster unter den Lagerhölzern.",
        "Zwölf Quadratmeter überschreiten in manchen Bundesländern eine Grenze, bis zu der ein Nebengebäude ohne Verfahren gebaut werden darf. Kläre das vor der Bestellung mit dem Bauamt.",
      ] },
    ],
    comparison: {
      caption: "Planerwerte für 10,9 m² Innenfläche",
      columns: ["Nutzung", "Bedarf", "Rest"],
      rows: [
        ["2 Räder, Werkbank, Mäher, viel Werkzeug, Regal", "9,5 m²", "1,4 m²"],
        ["4 Räder, Werkbank, Mäher, Werkzeug, Regal", "9,5 m²", "1,4 m²"],
        ["6 Räder, Mäher, viel Werkzeug, Regal", "10,0 m²", "0,9 m²"],
        ["6 Räder, Werkbank, Mäher, Werkzeug, Regal", "11,0 m²", "zu klein"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Lohnt sich der Sprung von 3 × 3 auf 3 × 4 Meter?", answer: "Ja, wenn neben den Rädern eine Werkbank stehen soll. Du gewinnst 2,8 m² Innenfläche und eine Wand, die lang genug für beides ist." },
    ],
  },

  "maehroboter-fuer-250-qm": {
    intro: "Für 250 m² Rasen suchst du ein Modell mit 300 bis 400 m² Nennfläche. In dieser Größe entscheidet selten die Leistung. Wichtiger sind schmale Durchgänge, der Platz für die Station und der Streifen am Rand, den kein Roboter sauber mäht.",
    takeaway: "Offener Garten: ab 300 m². Gegliedert oder mit vielen Kanten: ab 350 m². Getrennte Flächen: ab 400 m². Miss vorher die engste Stelle und suche einen Platz für die Ladestation.",
    sections: [
      { title: "Lohnt sich ein Roboter hier überhaupt?", paragraphs: [
        "Mit einem Handmäher und 40 cm Schnittbreite läufst du auf 250 m² gut 625 m. Bei gemütlichen 3 km/h sind das rund 13 Minuten, mit Wenden und Fangkorb leeren eine halbe Stunde. Einmal pro Woche ist das überschaubar.",
        "Für den Roboter spricht das gleichmäßige Schnittbild im Sommer, auch wenn du verreist bist. Dagegen sprechen Einrichtung, Winterlager und Messerwechsel. Diese Arbeit fällt bei 250 m² genauso an wie bei 800 m².",
      ] },
      { title: "Kanten machen einen großen Anteil aus", paragraphs: [
        "Ein Rasen mit 12,5 × 20 m hat 65 m Rand. Bleibt dort ein Streifen von 15 cm stehen, sind das knapp 10 m² oder 4 Prozent der Fläche. Auf 1.000 m² wären es anteilig nur halb so viel.",
        "Eine ebenerdige Mähkante aus Pflaster löst das: Der Roboter fährt mit einem Rad darüber und schneidet bis an den Rand.",
      ] },
      { title: "Die Klassen im kleinen Garten", paragraphs: [
        "Weil die Planerwerte auf 50 m² gerundet werden, liegen fast alle Fälle zwischen 300 und 400 m². Ein 500-m²-Gerät schadet nicht. Es ist nur oft größer, und 10 cm mehr Gehäuse können in einem Reihenhausgarten den Durchgang kosten.",
      ] },
      { title: "Station, Nachbarn, Zeiten", paragraphs: [
        "Die Station braucht etwa einen halben Quadratmeter ebenen Boden, Strom und meist einen Meter gerade Anfahrt. Im Reihenhausgarten steht sie oft zwangsläufig nah am Nachbarn. Achte deshalb auf die Schallangabe im Datenblatt.",
        "Ein Mähdurchgang dauert hier ein bis zwei Stunden. Du kannst ihn also auf den Vormittag legen und den Garten danach nutzen.",
      ] },
    ],
    comparison: {
      caption: "Nennfläche für 250 m² Rasen",
      columns: ["Garten", "Faktor", "Modelle ab"],
      rows: [
        ["Offen, wenige Kanten", "1,20", "300 m²"],
        ["Gegliedert, einige Beete", "1,30", "350 m²"],
        ["Viele Engstellen und Inseln", "1,40", "350 m²"],
        ["Getrennte Flächen, gegliedert", "1,50", "400 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein Gerät für 250 m² Nennfläche?", answer: "Nur für eine offene, ebene Fläche mit langen Laufzeiten. Die nächste Klasse mit 300 m² ist meist wenig teurer und lässt Luft für Regentage." },
      { question: "Brauche ich im kleinen Garten ein Begrenzungskabel?", answer: "Nein, es gibt kabellose Modelle auch für kleine Flächen. Zwischen Hauswänden kann der Satellitenempfang aber schwach sein, dann sind Kamera, LiDAR oder eben Kabel zuverlässiger." },
    ],
  },

  "maehroboter-fuer-1000-qm": {
    intro: "Für 1.000 m² Rasen brauchst du ein Modell mit 1.200 bis 1.500 m² Nennfläche, für 800 m² eines mit 1.000 bis 1.200 m². Auf dieser Größe wird die Laufzeit zum Engpass: Ein voller Durchgang füllt rechnerisch fast einen achtstündigen Tag.",
    takeaway: "Rechne 1.000 m² mal 1,2 bei offenem Rasen, mal 1,3 bei Beeten und Bäumen, mal 1,4 bei vielen Engstellen. Danach prüfst du, ob die erlaubte Mähzeit reicht.",
    sections: [
      { title: "Wie lange ein Durchgang dauert", paragraphs: [
        "Angenommen, das Gerät schneidet 22 cm breit und fährt 0,5 m pro Sekunde. Das sind 396 m² in der Stunde. Für Wenden und Überlappung ziehen wir 30 Prozent ab, es bleiben 277 m². 1.000 m² brauchen damit 3,6 Stunden Fahrzeit.",
        "Lädt der Akku genauso lange, wie er mäht, stehen nach einem Durchgang 7,2 Stunden auf der Uhr. Setz die Werte deines Modells ein. Geräte, die chaotisch statt in Bahnen fahren, brauchen länger.",
      ] },
      { title: "800 oder 1.000 Quadratmeter", paragraphs: [
        "Zwischen beiden liegt meist nur eine Geräteklasse. Bei 800 m² offenem Rasen genügt ein Modell mit 1.000 m², bei 1.000 m² sollte es 1.200 m² schaffen. Wer zwischen den Werten liegt, misst nach: Auf großen Grundstücken verschwinden Einfahrt, Spielfläche und Beete leicht in der Schätzung.",
        "Zieh auch Flächen ab, die du ohnehin selten mähst. Eine Blumenwiese von 150 m² macht aus 1.000 wieder 850 m².",
      ] },
      { title: "Schnittbreite schlägt Akku", paragraphs: [
        "Ein größerer Akku verlängert die Fahrt, verkürzt aber den Durchgang kaum, weil er auch länger lädt. Doppelte Schnittbreite halbiert die Fahrzeit. Ab 1.000 m² lohnt deshalb ein Blick auf diesen Wert, den viele Datenblätter weiter unten verstecken.",
        "Die Kehrseite: Breite Geräte sind schwerer, hinterlassen eher Spuren und passen schlechter durch Passagen unter einem Meter.",
      ] },
      { title: "Wann der Rasen dem Roboter davonwächst", paragraphs: [
        "Im Mai wächst er schneller als im August. Für starkes Wachstum, etwa nach Düngung oder mit Bewässerung, rechnet der Planer 10 Prozent mehr. Aus 1.200 werden 1.300 m².",
        "Läuft das Gerät nur werktags von acht bis sechzehn Uhr, ist auch ein gut gewähltes Modell im Frühjahr ausgelastet. Dann hilft eine längere Zeit am Abend mehr als ein weiterer Klassensprung.",
      ] },
    ],
    comparison: {
      caption: "Nennfläche nach Gartentyp",
      columns: ["Garten", "800 m² Rasen", "1.000 m² Rasen"],
      rows: [
        ["Offen, wenige Kanten (1,20)", "1.000 m²", "1.200 m²"],
        ["Gegliedert (1,30)", "1.050 m²", "1.300 m²"],
        ["Gegliedert mit mehreren Zonen (1,35)", "1.100 m²", "1.350 m²"],
        ["Viele Engstellen (1,40)", "1.150 m²", "1.400 m²"],
        ["Getrennte Flächen, gegliedert (1,50)", "1.200 m²", "1.500 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht für 800 m² ein Mähroboter mit 800 m² Nennfläche?", answer: "Nur ohne Ruhetage und Hindernisse. Mit dem kleinsten Zuschlag von 20 Prozent landest du schon bei 960 m², also in der 1.000er-Klasse." },
      { question: "Muss er jeden Tag mähen?", answer: "Nein. Zwei bis drei volle Durchgänge pro Woche halten den Rasen kurz genug, dass der Schnitt liegen bleiben kann." },
    ],
  },

  "maehroboter-fuer-1500-qm": {
    intro: "Für 1.500 m² Rasen brauchst du 1.800 bis 2.250 m² Nennfläche. Ein Gerät mit schmalem Messerteller kommt in acht Stunden am Tag nicht mehr herum. Vergleiche deshalb breite Modelle oder zwei kleinere Geräte.",
    takeaway: "Eine zusammenhängende Fläche: ein Gerät ab 1.800 m² mit breitem Schnitt. Zwei klar getrennte Hälften: zweimal ab 900 m². Mehr Zonen oder viele Beete erhöhen den Wert auf 2.050 m² und mehr.",
    sections: [
      { title: "Was in acht Stunden zu schaffen ist", paragraphs: [
        "Mit 22 cm Schnittbreite, 0,5 m pro Sekunde und 30 Prozent Abzug schafft ein Gerät 277 m² je Stunde Fahrzeit. 1.500 m² brauchen 5,4 Stunden, mit gleich langer Ladezeit 10,8. Ein Durchgang zieht sich also über zwei Tage.",
        "Mit 40 cm Schnittbreite sind es 504 m² je Stunde, 3 Stunden Fahrt und 6 Stunden mit Laden. Das passt in einen Arbeitstag.",
      ] },
      { title: "Ein großes oder zwei kleine Geräte", paragraphs: [
        "Liegt das Haus mitten auf dem Grundstück, trennt es vorn und hinten. Für zweimal 750 m² offenen Rasen reichen zwei Modelle mit je 900 m² Nennfläche. Fällt eines aus, mäht das andere weiter, und niemand trägt ein 15-kg-Gerät ums Haus.",
        "Dagegen stehen zwei Stationen, zwei Stromanschlüsse und doppelte Wartung. Bei einer durchgehenden Fläche ist ein Gerät einfacher.",
      ] },
      { title: "Wege zur Station", paragraphs: [
        "Auf 30 × 50 m liegt die entfernteste Ecke bis zu 58 m von der Station, wenn diese in der gegenüberliegenden Ecke steht. Bei 0,5 m pro Sekunde fährt das Gerät dafür knapp zwei Minuten je Richtung, und das mehrmals am Tag.",
        "In der Mitte einer Längsseite sind es höchstens 39 m. Mit Begrenzungskabel brauchst du rund 160 m Umfang plus 10 Prozent, also 176 m, dazu Suchkabel.",
      ] },
      { title: "Uhrzeiten, die erlaubt sind", paragraphs: [
        "In Wohngebieten verbietet die Geräte- und Maschinenlärmschutzverordnung (32. BImSchV) den Betrieb von Rasenmähern im Freien an Sonn- und Feiertagen ganztägig und werktags von 20 bis 7 Uhr. Länder und Gemeinden dürfen strenger sein.",
        "Nachts zu mähen wäre auch aus einem anderen Grund falsch: In der Dämmerung und Dunkelheit sind Igel unterwegs. Plane mit höchstens 13 Stunden an sechs Tagen und nimm davon nur, was du brauchst.",
      ] },
    ],
    comparison: {
      caption: "Nennfläche für 1.500 m² Rasen",
      columns: ["Garten", "Faktor", "Modelle ab"],
      rows: [
        ["Offen, wenige Kanten", "1,20", "1.800 m²"],
        ["Gegliedert", "1,30", "1.950 m²"],
        ["Gegliedert mit mehreren Zonen", "1,35", "2.050 m²"],
        ["Viele Engstellen", "1,40", "2.100 m²"],
        ["Getrennte Flächen, gegliedert", "1,50", "2.250 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Ist ein Aufsitzmäher die bessere Wahl?", answer: "Für eine einzige offene Fläche kann er günstiger sein. Du musst dann aber selbst fahren, jede Woche, und brauchst einen Stellplatz von etwa 2,5 m²." },
      { question: "Reicht ein Stromanschluss für zwei Geräte?", answer: "Die Ladeleistung ist gering, ein Stromkreis genügt meist. Achte auf die Entfernung, denn jede Station braucht eine Außensteckdose in Reichweite ihres Netzteils." },
    ],
  },

  "maehroboter-fuer-verwinkelten-garten": {
    intro: "Für 500 m² Rasen in vier Teilstücken mit engen Durchgängen rechnest du mit 750 m² Nennfläche, 150 m² mehr als auf einer offenen Wiese. Vorher entscheidet aber die schmalste Passage, ob ein Modell überhaupt infrage kommt.",
    takeaway: "Miss zuerst jede Engstelle. Unter 60 cm scheiden viele Geräte aus, unter 1 m musst du die Anleitung lesen. Danach nimmst du den Faktor 1,45 auf die Rasenfläche.",
    sections: [
      { title: "Passagen: nutzbare und gemessene Breite", paragraphs: [
        "Zwischen zwei Mauern liegen 1,00 m. Schreibt die Anleitung für das Begrenzungskabel 30 cm Abstand zu jeder Wand vor, bleiben zwischen den Kabeln 40 cm. Verlangt dasselbe Gerät dort mehr, ist die Passage zu eng, obwohl der Roboter selbst durchpasst.",
        "Kabellose Modelle nennen meist eine Mindestbreite ohne Kabelabstand. Prüfe dann, ob die Ortung zwischen den Mauern funktioniert. Wie du richtig misst, steht in unserem Ratgeber zu Steigung und Engstellen.",
      ] },
      { title: "Vier Teilflächen, eine Rechnung", paragraphs: [
        "Im Beispiel liegen 220, 130, 90 und 60 m² hinter Beeten und Hausecken. Zusammen sind es 500 m². Der Planer nimmt 1,20 als Grundwert, 0,20 für viele Engstellen und 0,05 für mehrere Zonen. Das ergibt 725 m² und aufgerundet 750 m².",
        "Müsste das Gerät zusätzlich getrennte Flächen bedienen, kämen noch einmal 0,15 dazu.",
      ] },
      { title: "Sackgassen und Spitzen", paragraphs: [
        "Ein Roboter dreht auf der Stelle oder in einem Bogen. In einer 1,2 m breiten Sackgasse klappt das mit den meisten Geräten, in einer spitz zulaufenden Ecke bleibt Gras stehen. Solche Ecken schneidest du besser als Beet ab, statt sie jede Woche von Hand nachzuarbeiten.",
        "Dasselbe gilt für Rasenstreifen unter einem Meter Breite. Aus 4 m² Streifen wird mit Kies oder Bodendeckern eine Fläche, die du nie mehr mähen musst.",
      ] },
      { title: "Zonen einteilen und Startpunkte setzen", paragraphs: [
        "Gib jeder Teilfläche einen eigenen Startpunkt und einen Zeitanteil nach Größe: 220 m² bekommen 44 Prozent der Mähzeit, 60 m² nur 12. Ohne diese Aufteilung mäht ein zufällig fahrendes Gerät vor allem dort, wo es die Station verlässt.",
        "Die Station steht am besten in der größten Zone mit freier Anfahrt. Änderst du im Frühjahr ein Beet, ist eine Karte in der App schneller angepasst als ein eingegrabenes Kabel.",
      ] },
    ],
    example: {
      title: "Verwinkelter Garten mit 500 m² Rasen",
      intro: "Vier verbundene Zonen, mehrere Passagen zwischen 60 cm und 1 m.",
      steps: [
        { label: "Teilflächen", value: "220 + 130 + 90 + 60 = 500 m²" },
        { label: "Faktor", value: "1,20 + 0,20 + 0,05 = 1,45" },
        { label: "Auswahlwert", value: "500 × 1,45 = 725 m²" },
        { label: "Aufgerundet auf 50 m²", value: "750 m²" },
      ],
      result: "Modelle ab 750 m² Nennfläche, sofern die Mindestpassage passt.",
    },
    checklist: [],
    faqs: [
      { question: "Reicht eine Passage von 60 cm?", answer: "Für einzelne Modelle ja, für viele nicht. Unter diesem Wert stuft unser Planer den Durchgang als sehr eng ein, dann brauchst du eine ausdrückliche Angabe des Herstellers." },
    ],
  },

  "maehroboter-unter-baeumen": {
    intro: "Liegen 180 von 600 m² Rasen unter dichten Kronen, muss ein Mähroboter auf 30 Prozent der Fläche ohne zuverlässigen Satellitenempfang auskommen. Plane dann 800 bis 850 m² Nennfläche und ein Gerät mit Kamera, LiDAR oder Begrenzungskabel.",
    takeaway: "Reine RTK-Geräte nur bei freiem Himmel. Unter Bäumen zählen LiDAR, Kamera oder Kabel, dazu Schutz für flache Wurzeln und eine Runde gegen Fallobst und Äste.",
    sections: [
      { title: "Warum Satellitenempfang unter Kronen abreißt", paragraphs: [
        "RTK-Geräte bestimmen ihre Position auf wenige Zentimeter genau, brauchen dafür aber Sicht zu mehreren Satelliten. Laub, vor allem nasses, dämpft das Signal. Im April fährt der Roboter noch, im Juni bleibt er an derselben Stelle stehen.",
        "Teste deshalb nicht an einem kahlen Märztag. Manche Geräte überbrücken kurze Lücken mit Kamera oder Radsensoren. Wie lange, sagt dir das Datenblatt selten, der Händler im Zweifel schon.",
      ] },
      { title: "Welche Technik sich eignet", paragraphs: [
        "LiDAR tastet die Umgebung mit Laser ab, Stämme sind dafür gute Orientierungspunkte. Kameras kommen mit Schatten klar, mit Dämmerung schlechter. Das Begrenzungskabel funktioniert immer, nur das Verlegen zwischen Wurzeln ist Handarbeit: Nageln statt eingraben.",
      ] },
      { title: "Wurzeln, Inseln und feuchter Boden", paragraphs: [
        "Flache Wurzeln stoppen das Gerät oder werden vom Messer verletzt. Nimm sie als Insel heraus. Ein Ring von 50 cm um den Stamm kostet 0,8 m², sechs Bäume also knapp 5 m². Das fällt bei der Nennfläche nicht ins Gewicht, spart aber viele Stillstände.",
        "Wichtiger sind die Ränder: Sechs Ringe ergeben fast 19 m zusätzliche Kante. Mulch oder Bodendecker in der Insel ersparen dir das Nachschneiden. Auf dauerfeuchtem Boden drehen die Räder durch, dort hilft ein Gerät mit grobem Profil und weniger Gewicht.",
      ] },
      { title: "Was im Herbst dazukommt", paragraphs: [
        "Dünnes Laub häckselt der Roboter mit. Eine geschlossene Schicht schiebt er vor sich her, und die Sensoren halten Haufen für Hindernisse. Fallobst verklebt Messerteller und Räder und zieht Wespen an, sammle es vor der Mähzeit ein.",
        "Äste ab etwa Daumendicke blockieren die Messer. Nach Sturm gehst du die Fläche ab, bevor das Gerät wieder startet.",
      ] },
    ],
    comparison: {
      caption: "Navigation unter Bäumen",
      columns: ["System", "Unter dichter Krone", "Zu beachten"],
      rows: [
        ["RTK ohne Zusatzsensor", "unsicher", "freie Sicht zum Himmel nötig"],
        ["RTK mit Kamera", "kurze Strecken möglich", "Verhalten bei Signalverlust erfragen"],
        ["LiDAR", "gut", "braucht feste Orientierungspunkte"],
        ["Begrenzungskabel", "gut", "Wurzeln beim Verlegen schonen"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Wie viel Nennfläche brauche ich für 600 m² mit vielen Bäumen?", answer: "Mit einigen Bäumen rechnet der Planer 1,30 und kommt auf 800 m². Bei vielen Inseln und Engstellen sind es 1,40 und damit 850 m²." },
      { question: "Schadet der Roboter den Bäumen?", answer: "Das Gerät selbst nicht, die Messer schon, wenn sie Rinde oder Wurzeln treffen. Ein Mulchring um den Stamm verhindert beides." },
    ],
  },

  "maehroboter-fuer-mehrere-flaechen": {
    intro: "Drei Rasenstücke mit 350, 120 und 80 m² ergeben 550 m². Kann der Roboter sie selbst anfahren, genügen 700 m² Nennfläche. Sind sie getrennt, rechnest du mit 800 m², und jemand muss das Gerät tragen oder es braucht ein zweites.",
    takeaway: "Prüfe zuerst, ob ein befahrbarer Weg zwischen den Flächen besteht. Ohne Weg ist ein zweites, kleines Gerät oft bequemer als wöchentliches Tragen.",
    sections: [
      { title: "Verbunden oder getrennt", paragraphs: [
        "Verbunden heißt: Der Roboter kommt ohne Hilfe von Fläche zu Fläche, etwa über einen gepflasterten Weg ohne Stufe. Dafür legst du einen Korridor fest, per Kabel oder in der App. Der Planer rechnet mit 1,25.",
        "Getrennt heißt: Mauer, Treppe, Straße oder Tor liegen dazwischen. Dann gilt 1,40, weil das Gerät nie die volle Zeit auf allen Flächen nutzen kann.",
      ] },
      { title: "Was „Multizone“ bedeuten kann", paragraphs: [
        "Manche Hersteller meinen mehrere Startpunkte auf einer zusammenhängenden Fläche. Andere meinen Nebenbereiche ohne Station, in die du das Gerät trägst und in denen es fährt, bis der Akku leer ist. Nur einige speichern wirklich mehrere Karten.",
        "Frag konkret: Wie viele Karten, fährt das Gerät selbst hin, und findet es von dort zur Station zurück?",
      ] },
      { title: "Korridore über Wege", paragraphs: [
        "Ein Pflasterweg ist kein Problem, solange die Kante zum Rasen flach ist. Kies, Rindenmulch und Stufen sind es. Über einen öffentlichen Gehweg darf das Gerät nicht unbeaufsichtigt fahren, auch wenn es nur zwei Meter sind.",
        "Ein Gartentor löst man mit einer Öffnung unten in der Füllung. Miss das Gehäuse und gib auf jeder Seite ein paar Zentimeter dazu.",
      ] },
      { title: "Tragen oder zweites Gerät", paragraphs: [
        "Ein Gerät dieser Klasse wiegt 9 bis 14 kg. Bei zwei Nebenflächen und zwei Durchgängen je Woche trägst du es viermal hin und viermal zurück. Über 30 Wochen sind das 240 Wege.",
        "Alternative: Das Hauptgerät übernimmt die 350 m² und braucht dafür nur 450 m² Nennfläche. Die beiden kleinen Stücke mit zusammen 200 m² erledigt ein zweites mit 250 m², wenn sie untereinander verbunden sind.",
      ] },
    ],
    comparison: {
      caption: "Drei Flächen, zusammen 550 m²",
      columns: ["Lösung", "Rechnung", "Nennfläche"],
      rows: [
        ["Ein Gerät, Flächen verbunden", "550 × 1,25 = 688", "700 m²"],
        ["Ein Gerät, Flächen getrennt", "550 × 1,40 = 770", "800 m²"],
        ["Getrennt und gegliedert", "550 × 1,50 = 825", "850 m²"],
        ["Zwei Geräte für 350 und 200 m²", "350 × 1,20 und 200 × 1,25", "450 und 250 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Kann ein Roboter mit nur einer Station zwei Gärten mähen?", answer: "Auf der zweiten Fläche fährt er ohne Station, bis der Akku leer ist. Danach trägst du ihn zurück. Für 80 bis 120 m² reicht eine Akkuladung meist aus." },
    ],
  },

  "terrasse-10-qm-material": {
    intro: "Für 10 m² Terrasse mit 4 × 2,5 m brauchst du 18 bis 19 Dielen à 4 m, 22,5 m Unterkonstruktion und gut 300 Schrauben. Drehst du die Dielen um 90 Grad, bleibt von jeder 4-m-Diele ein Rest von 1,5 m liegen.",
    takeaway: "Lass die Dielen in der Richtung laufen, die zur Lieferlänge passt. 17 Reihen à 4 m decken die Fläche, mit einer oder zwei Reserven bestellst du 18 oder 19.",
    sections: [
      { title: "Warum die Richtung hier mehr ausmacht als der Preis", paragraphs: [
        "Mit 145 mm Diele und 5 mm Fuge laufen 17 Reihen über vier Meter. Jede Reihe ist eine ganze Diele, der Abfall besteht aus einem schmalen Längsstreifen: Die Reihen decken 2,545 m, und die letzte wird um 45 mm schmaler gesägt.",
        "Quer gelegt sind es 27 Reihen à 2,5 m. Aus einer 4-m-Diele schneidest du nur eine Reihe, die restlichen 1,5 m kannst du ohne Stoß nicht nutzen. 27 Dielen statt 17 sind die Folge. Mit 5 m Lieferlänge löst sich das: Zwei Reihen je Diele, 14 Stück.",
      ] },
      { title: "Unterkonstruktion für kleine Flächen", paragraphs: [
        "Bei 50 cm Abstand liegen neun Träger mit je 2,5 m unter der Terrasse. Aus 5-m-Profilen schneidest du je zwei, fünf Stück genügen also. Bei 50 cm Stützweite kommen 54 Auflager darunter.",
        "Der erste und der letzte Träger liegen dicht an den Dielenenden. Wie weit die Diele überstehen darf, steht in der Anleitung, meist sind es wenige Zentimeter.",
      ] },
      { title: "Was auf zehn Quadratmetern Platz hat", paragraphs: [
        "Ein Tisch mit 90 cm Tiefe und Stühle auf beiden Seiten brauchen 0,9 + 2 × 0,8 = 2,5 m. Das ist genau die Tiefe dieser Terrasse. Hinter den Stühlen kommt dann niemand mehr vorbei, also rück den Tisch an ein Ende und lass den Weg zur Tür frei.",
        "Für Tisch und Grill nebeneinander sind vier Meter Länge knapp. Wer noch planen kann, gewinnt mit 3 m Tiefe mehr als mit 4,5 m Länge.",
      ] },
      { title: "Kleinmengen und Versand", paragraphs: [
        "18 Dielen sind wenig Material, aber vier Meter lang. Der Versand läuft über eine Spedition und kostet unabhängig von der Menge ähnlich viel. Frag, ob Dielen, Träger und Schrauben in einer Lieferung kommen.",
      ] },
    ],
    comparison: {
      caption: "4 × 2,5 m mit 145-mm-Dielen und 5 mm Fuge",
      columns: ["Position", "Dielen laufen 4 m", "Dielen laufen 2,5 m"],
      rows: [
        ["Reihen", "17", "27"],
        ["Dielen mit 4 m, ohne Stoß", "17 plus Reserve", "27 plus Reserve"],
        ["Dielen mit 5 m, ohne Stoß", "17 plus Reserve", "14 plus Reserve"],
        ["Träger bei 50 cm", "9 × 2,5 m = 22,5 m", "6 × 4 m = 24 m"],
        ["Schrauben", "306", "324"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reichen 5 Prozent Verschnitt?", answer: "Bei 4-m-Dielen in Längsrichtung ja, das sind 18 Dielen. Für einen Fehlschnitt ist dann kaum Luft, 19 sind entspannter." },
    ],
  },

  "terrasse-30-qm-material": {
    intro: "Für 30 m² mit 6 × 5 m brauchst du 44 Dielen à 5 m, 66 m Unterkonstruktion und rund 900 Schrauben. Bei 40 m² mit 8 × 5 m sind es 57 Dielen, 88 m und knapp 1.200 Schrauben. Beides gilt für 5-m-Dielen ohne Stoß.",
    takeaway: "Mit 5-m-Dielen läuft jede Reihe ohne Stoß. Bekommst du nur 4 m, brauchst du je Reihe einen Stoß und an den Stoßlinien doppelte Träger.",
    sections: [
      { title: "Fünf Millimeter, die eine Reihe kosten", paragraphs: [
        "6 m geteilt durch 150 mm ergeben genau 40 Reihen. 40 Dielen mit 39 Fugen decken aber nur 5,995 m. Unser Planer rundet deshalb auf 41 und kommt mit 5 Prozent Reserve auf 44 Dielen.",
        "Auf der Baustelle verteilst du die 5 mm auf die Fugen oder baust die Terrasse 5 mm schmaler. Dann genügen 40 Reihen, und die 44 bestellten Dielen enthalten vier als Reserve. Bei 8 m sind es 54 Reihen, die letzte wird 95 mm schmaler gesägt.",
      ] },
      { title: "Wenn es nur 4-m-Dielen gibt", paragraphs: [
        "Jede Reihe besteht dann aus zwei Stücken. Versetzt du die Stöße auf zwei Linien, kommen dort je ein zusätzlicher Träger dazu: 12 m bei 30 m², 16 m bei 40 m². Mit 10 Prozent Verschnitt nennt der Planer 57 und 75 Dielen.",
        "Rechne die Arbeit mit: 41 beziehungsweise 54 Stöße sind ebenso viele Schnitte, die sichtbar bleiben.",
      ] },
      { title: "Große Flächen arbeiten mehr", paragraphs: [
        "Über fünf Meter Länge dehnen sich WPC-Dielen im Sommer um einige Millimeter. Halte Abstand zur Hauswand und lies nach, wie lang ein Feld ohne Dehnfuge sein darf. Bei acht Metern verlangen manche Hersteller auch in der Unterkonstruktion eine Unterbrechung.",
        "Das Gefälle beträgt bei 1 bis 2 Prozent auf fünf Meter schon 5 bis 10 cm. Prüf, ob die Höhe unter der Terrassentür dafür reicht, bevor du den Schotter bestellst.",
      ] },
      { title: "Lieferung und Lagerplatz", paragraphs: [
        "220 m Dielen wiegen bei 2,8 kg je Meter rund 620 kg, 285 m rund 800 kg. Die Spedition liefert bis zur Bordsteinkante. Plane zwei Helfer und einen ebenen Lagerplatz von sechs Metern Länge, auf dem die Dielen nicht durchhängen.",
        "Kaufe alles auf einmal. Zwischen zwei Chargen kann der Farbton sichtbar abweichen, auf 30 oder 40 m² fällt das stärker auf als auf einem kleinen Sitzplatz.",
      ] },
    ],
    comparison: {
      caption: "Material mit 5-m-Dielen (145 mm, Fuge 5 mm, Träger alle 50 cm)",
      columns: ["Position", "30 m² (6 × 5 m)", "40 m² (8 × 5 m)"],
      rows: [
        ["Reihen laut Planer", "41", "54"],
        ["Dielen mit 5 % Reserve", "44", "57"],
        ["Träger", "11 × 6 m = 66 m", "11 × 8 m = 88 m"],
        ["Schrauben", "902", "1.188"],
        ["Blende, Haus an der langen Seite", "16 m", "18 m"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Wie viele Pakete Schrauben sind das?", answer: "Bei 200 Stück je Paket fünf für 30 m² und sechs für 40 m². Mit Clips zählst du die Kreuzungen von Diele und Träger, also 451 und 594, und ergänzt Start- und Endclips." },
      { question: "Sind zwei kleinere Terrassen günstiger?", answer: "Nein, die zweite Fläche bringt eigene Ränder und Anschlüsse mit. Optisch kann eine Teilung mit einem Fries trotzdem sinnvoll sein." },
    ],
  },

  "terrasse-mit-pool-planen": {
    intro: "Ein Pool mit 6 × 3 m und ein Meter Rand ringsum ergeben 22 m² Terrasse. Bestellt werden rund 25 m², weil an allen vier Seiten geschnitten wird. Dazu kommen 18 m Poolkante und 26 m Außenkante, die sauber abgeschlossen sein wollen.",
    takeaway: "Außenfläche minus Becken, dann 15 Prozent Verschnitt. Leg vor der Bestellung Rutschhemmung, Wasserablauf und die Klappe über der Technik fest.",
    sections: [
      { title: "Die Fläche in vier Streifen zerlegen", paragraphs: [
        "Der Rand besteht aus zwei Streifen mit 8 × 1 m und zwei mit 3 × 1 m. Ein Meter Breite entspricht sieben Dielenreihen, 1,00 m geteilt durch 150 mm sind 6,7. Das ergibt 2 × 7 × 8 m plus 2 × 7 × 3 m, zusammen 154 Laufmeter.",
        "Mit 4-m-Dielen sind das 28 Stück für die langen Seiten und 14 für die kurzen, dort fällt je ein Meter Rest an. 42 Dielen plus drei Reserve machen 45. Die Gegenprobe über die Fläche: 25,3 m² ÷ 0,15 m sind 169 m, also 43 Dielen.",
      ] },
      { title: "Barfuß, nass und rutschig", paragraphs: [
        "Frag nach einem Prüfwert für den nassen Barfußbereich. Eine geriffelte Oberfläche allein sagt wenig, denn in Rillen sammelt sich Sonnencreme. Helle Dielen bleiben in der Sonne kühler, dunkles WPC kann im Hochsommer zu heiß zum Barfußlaufen werden.",
        "Splitter sind am Pool das stärkste Argument gegen weiche Hölzer. Wenn es Holz sein soll, plane jährliches Schleifen und Ölen ein.",
      ] },
      { title: "Wohin das Wasser läuft", paragraphs: [
        "Das Gefälle zeigt vom Becken weg, sonst spült jeder Regen Schmutz hinein. Am Beckenrand bleibt eine Fuge, damit Pool und Terrasse sich getrennt bewegen können. Liegt die Terrasse am Haus, braucht es auf der anderen Seite eine Rinne.",
        "Metallteile am Salzwasserpool sollten aus Edelstahl A4 sein. Einfache verzinkte Schrauben zeigen dort früh Rost.",
      ] },
      { title: "Klappen, Leitungen und Strom", paragraphs: [
        "Skimmer, Schacht und Pumpe müssen erreichbar bleiben. Baue über jeder Stelle ein Feld, das sich ohne Werkzeugkiste abheben lässt: ein Rahmen aus Trägern und vier Dielen, mit zwei Griffmulden. Nach drei Jahren weiß sonst niemand mehr, wo der Schacht liegt.",
        "Um das Becken gelten eigene Schutzbereiche für Steckdosen und Leuchten. Die Elektrik plant ein Fachbetrieb, bevor der Belag liegt.",
      ] },
    ],
    example: {
      title: "Rand von 1 m um einen Pool mit 6 × 3 m",
      intro: "Dielen 145 mm, Fuge 5 mm, Träger alle 50 cm quer zu den Dielen.",
      steps: [
        { label: "Außenmaß", value: "8 × 5 = 40 m²" },
        { label: "Minus Becken", value: "40 − 18 = 22 m²" },
        { label: "Mit 15 % Verschnitt", value: "25,3 m²" },
        { label: "Träger lange Seiten", value: "2 × 17 × 1 m = 34 m" },
        { label: "Träger kurze Seiten", value: "2 × 7 × 1 m = 14 m" },
      ],
      result: "45 Dielen à 4 m, 48 m Unterkonstruktion plus je einen zusätzlichen Träger an den Stößen der langen Seiten.",
    },
    checklist: [],
    faqs: [
      { question: "Wie breit sollte der Rand sein?", answer: "Ein Meter reicht zum Umgehen. Für Liegen brauchst du an einer Seite 2,2 bis 2,5 m, sonst stehen sie halb im Weg." },
      { question: "Darf die Terrasse auf der Poolwand aufliegen?", answer: "Nur wenn der Hersteller des Beckens das erlaubt. Bei Folien- und Stahlwandbecken trägt die Wand meist nichts außer sich selbst." },
    ],
  },

  "bewaesserung-kleiner-garten": {
    intro: "Für einen kleinen Garten mit 80 m² Rasen, 12 m² Beet und 10 m Hecke brauchst du drei Zonen: einen Regner, 18 m Tropfrohr im Beet und 12 m an der Hecke. Ein Bewässerungscomputer mit vier Ausgängen deckt das ab und hat einen Ausgang frei.",
    takeaway: "Rasen, Beet und Hecke getrennt schalten. Bei 18 l/min am Wasserhahn planst du höchstens 14,4 l/min je Zone, das reicht hier für alles.",
    sections: [
      { title: "Der Wasserbedarf an einem Sommertag", paragraphs: [
        "Für eine gründliche Gabe rechnest du mit etwa 10 Litern je Quadratmeter. Der Rasen bekommt also 800 Liter, das Beet 120. Bei 14,4 l/min wäre der Rasen rechnerisch nach 56 Minuten versorgt. Ein einzelner kleiner Regner gibt weniger ab und läuft entsprechend länger.",
        "Besser zweimal pro Woche viel als jeden Abend ein bisschen. So wurzelt der Rasen tiefer.",
      ] },
      { title: "Drei Zonen, drei Durchflüsse", paragraphs: [
        "Im Beet liegen 1,5 m Tropfrohr je Quadratmeter, zusammen 18 m. Mit einem Tropfer alle 30 cm und 2 l/h sind das 60 Tropfer und 2 l/min. Die Hecke braucht 10 m plus 15 Prozent Reserve, gerundet 12 m, mit 40 Tropfern und 1,3 l/min.",
        "Beide Tropfzonen könnten zusammen laufen, hydraulisch spricht nichts dagegen. Getrennt sind sie trotzdem sinnvoll: Eine eingewachsene Hecke kommt mit weniger aus als Salat.",
      ] },
      { title: "Ein Regner reicht oft", paragraphs: [
        "80 m² als Rechteck mit 8 × 10 m schafft ein Viereckregner von einem Punkt aus. Versenkregner sehen schöner aus, brauchen aber Gräben, Verteiler und eine gute Überlappung. Auf dieser Fläche stehen Aufwand und Nutzen selten im Verhältnis.",
        "Bei schmalen Rasenstreifen unter 2 m spritzt jeder Regner auf den Weg. Ein Streifen lässt sich mit unterirdischem Tropfrohr oder weniger Rasen lösen.",
      ] },
      { title: "Einkauf für den Wasserhahn", paragraphs: [
        "Du brauchst einen Verteiler oder Computer, einen Filter, einen Druckminderer für die Tropfzonen und Verbinder aus demselben System. Mischen führt zu undichten Übergängen.",
        "Für das Trinkwasser ist ein Rückflussschutz am Hahn nötig, viele Außenarmaturen haben ihn eingebaut. Vor dem ersten Frost leerst du alles und nimmst den Computer ins Haus.",
      ] },
    ],
    comparison: {
      caption: "Zonen im kleinen Garten (Anschluss 18 l/min)",
      columns: ["Zone", "Material", "Durchfluss"],
      rows: [
        ["Rasen, 80 m²", "1 Viereckregner", "laut Datenblatt, bis 14,4 l/min"],
        ["Beet, 12 m²", "18 m Tropfrohr", "2,0 l/min"],
        ["Hecke, 10 m", "12 m Tropfrohr", "1,3 l/min"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein Computer mit zwei Ausgängen?", answer: "Wenn du Beet und Hecke zusammenlegst, ja. Dann bekommt die Hecke so lange Wasser wie das Beet, was meist zu viel ist." },
      { question: "Kann ich die Regentonne anschließen?", answer: "Für Tropfrohr aus der Tonne brauchst du ein druckloses System oder eine kleine Pumpe. Ein Meter Höhe bringt nur 0,1 bar." },
    ],
  },

  "bewaesserung-500-qm-garten": {
    intro: "Von 500 m² Garten werden im Beispiel 420 m² bewässert: 320 m² Rasen und 100 m² Beet. Bei 20 l/min am Anschluss darf jede Zone höchstens 16 l/min ziehen. Das ergibt sechs Zonen und für eine volle Gabe 5 Stunden und 20 Minuten.",
    takeaway: "Zieh Wege und Terrasse ab, miss den Durchfluss und rechne mit 80 Prozent davon. Passt die Laufzeit nicht in eine Nacht, verteilst du Rasen und Beete auf zwei.",
    sections: [
      { title: "Rasen: die Wassermenge bestimmt die Zeit", paragraphs: [
        "320 m² mal 10 Liter sind 3.200 Liter. Mit 16 l/min dauert das 200 Minuten, egal ob du vier oder acht Zonen daraus machst. Mehr Zonen verkürzen die Gabe also nicht. Sie sorgen nur dafür, dass jeder Regner seinen Druck bekommt.",
        "Im Beispiel laufen zwei Regner mit je 8 l/min gemeinsam, vier Zonen nacheinander. Ob acht Regner die Fläche wirklich decken, zeigt erst ein Plan mit Wurfweiten und Überlappung.",
      ] },
      { title: "Beete: ein Strang wäre zu viel", paragraphs: [
        "Für 100 m² setzt unser Planer 150 m Tropfrohr an. Bei 30 cm Tropferabstand sind das 500 Tropfer mit je 2 l/h, zusammen 1.000 l/h oder 16,7 l/min. Das liegt über den erlaubten 16 l/min.",
        "Also zwei Zonen mit je 75 m und 8,3 l/min. Für 10 Liter je Quadratmeter läuft jede Zone eine Stunde. Prüf die zulässige Stranglänge: 75 m an einem Stück sind vielen Tropfrohren zu lang, mit zwei Abgängen sind es 37,5 m.",
      ] },
      { title: "Fahrplan für die Nacht", paragraphs: [
        "200 Minuten Rasen und 120 Minuten Beete sind 320 Minuten. Ein Start um zwei Uhr endet um 7:20 Uhr. Wer morgens duscht, während der letzte Kreis läuft, merkt es. Lege deshalb die Beete auf andere Nächte als den Rasen.",
        "Sechs Zonen brauchen einen Computer mit mindestens sechs Ausgängen. Der Bewässerungsplaner zählt Verbrauchsarten und nennt für Rasen und Beete drei Ausgänge inklusive Reserve. Die Aufteilung nach Durchfluss, wie hier, kommt danach dazu.",
      ] },
      { title: "Was eine volle Gabe an Wasser kostet", paragraphs: [
        "3.200 plus 1.000 Liter sind 4,2 m³. Bei zwei Gaben pro Woche kommen in einem trockenen Monat mit vier Wochen knapp 34 m³ zusammen. Ein geeichter Gartenwasserzähler kann die Abwassergebühr dafür sparen, frag bei deinem Versorger nach den Bedingungen.",
        "Eine Zisterne mit 5 m³ reicht für eine Gabe. Sie entlastet den Anschluss, weil du sie tagsüber langsam nachfüllst und nachts mit einer Pumpe entnimmst.",
      ] },
    ],
    example: {
      title: "Zonenplan bei 20 l/min",
      intro: "320 m² Rasen, 100 m² Beete, 80 m² Wege, 10 Liter je Quadratmeter.",
      steps: [
        { label: "Planbarer Durchfluss", value: "20 × 0,8 = 16 l/min" },
        { label: "Rasen", value: "3.200 ÷ 16 = 200 Minuten in 4 Zonen" },
        { label: "Beete", value: "150 m Tropfrohr, 16,7 l/min, daher 2 Zonen" },
        { label: "Beete Laufzeit", value: "2 × 60 = 120 Minuten" },
      ],
      result: "Sechs Zonen, 320 Minuten Laufzeit und 4,2 m³ Wasser je Gabe.",
    },
    checklist: [],
    faqs: [
      { question: "Wie viele Regner brauche ich für 320 m² Rasen?", answer: "Das lässt sich ohne Grundriss nicht sagen. Wurfweite, Form und Überlappung entscheiden. Der Durchfluss sagt dir nur, wie viele davon gleichzeitig laufen dürfen." },
    ],
  },

  "tropfbewaesserung-fuer-beete": {
    intro: "Für vier Pflanzreihen mit je 12 m brauchst du 48 m Tropfrohr. Mit einem Tropfer alle 30 cm und 2 l/h sind das 160 Tropfer und 5,3 l/min. Fast jeder Gartenanschluss schafft das in einer Zone.",
    takeaway: "Miss Reihen statt Quadratmeter, teile die Länge durch den Tropferabstand und multipliziere mit der Abgabe. Das Ergebnis geteilt durch 60 ist der Durchfluss in l/min.",
    sections: [
      { title: "Reihen zählen und mit dem Planer vergleichen", paragraphs: [
        "Liegen die vier Reihen 60 cm auseinander, ist das Beet 28,8 m² groß. Der Planer schätzt 1,5 m Rohr je Quadratmeter und kommt auf 44 m. Das passt gut als Einkaufswert. Bei 40 cm Reihenabstand liegst du deutlich darüber.",
        "Dazu kommt die Zuleitung vom Hahn bis zum ersten Beet. Sie ist aus normalem Rohr ohne Tropfer.",
      ] },
      { title: "Welcher Tropferabstand wohin gehört", paragraphs: [
        "20 cm passen zu Salat, Möhren und sandigem Boden, weil sich die nassen Stellen dort kaum verbreitern. 30 cm sind der Allrounder. 50 cm genügen für Stauden, Beerensträucher und schwere Böden, in denen Wasser weiter zur Seite zieht.",
        "Mit jedem Schritt ändert sich der Durchfluss, wie die Tabelle zeigt. Bei 20 cm kommst du auf 8 l/min und damit an die Grenze schwacher Anschlüsse.",
      ] },
      { title: "Wie lange das Wasser laufen muss", paragraphs: [
        "320 l/h auf 28,8 m² sind 11 Liter je Quadratmeter und Stunde. Für eine Gabe von 10 Litern läuft die Zone also rund 54 Minuten. Grab nach dem ersten Mal mit der Hand nach: Der Boden sollte 15 bis 20 cm tief feucht sein.",
        "Läuft Wasser an der Oberfläche weg, teilst du die Zeit in zwei Blöcke mit einer halben Stunde Pause.",
      ] },
      { title: "Filter, Druck und Spülen", paragraphs: [
        "Tropfer haben enge Kanäle. Ein Filter vor dem Druckminderer fängt Sand ab, bei Brunnen- oder Zisternenwasser ist er Pflicht. Druckkompensierte Tropfer geben am Ende des Strangs genauso viel ab wie am Anfang.",
        "Verschließe die Enden mit Klappen statt mit Kleber. Einmal im Jahr öffnest du sie und lässt die Leitung durchlaufen. Im Winter bleibt das Rohr liegen, Filter und Druckminderer kommen ins Haus.",
      ] },
    ],
    comparison: {
      caption: "48 m Tropfrohr mit 2 l/h je Tropfer",
      columns: ["Tropferabstand", "Tropfer", "Durchfluss"],
      rows: [
        ["20 cm", "240", "8,0 l/min"],
        ["30 cm", "160", "5,3 l/min"],
        ["50 cm", "96", "3,2 l/min"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Über oder unter dem Mulch verlegen?", answer: "Unter dem Mulch. Das Rohr bleibt kühler, das Wasser verdunstet weniger, und die Amsel verschiebt es nicht. Merk dir die Lage, bevor du mit der Hacke kommst." },
      { question: "Kann ich Tomaten und Salat an einen Strang legen?", answer: "Technisch ja. Salat braucht häufiger kleine Mengen, Tomaten seltener mehr. Mit einem Hahn je Reihe kannst du wenigstens nachregeln." },
    ],
  },

  "bewaesserung-fuer-hochbeete": {
    intro: "Drei Hochbeete mit 3 × 1 m brauchen 18 m Tropfrohr und zusammen 3,6 l/min. 25 Minuten Laufzeit bringen 10 Liter je Quadratmeter. Im Hochsommer teilst du das auf morgens und abends auf, weil die Erde im Hochbeet schneller trocknet.",
    takeaway: "Zwei Stränge je Beet, ein Absperrhahn an jedem Abzweig, eine gemeinsame Zone. Bei 20 l/min am Hahn ist der Durchfluss nie das Problem.",
    sections: [
      { title: "Das Material für drei Beete", paragraphs: [
        "Zwei parallele Leitungen je Beet, jede 3 m lang, ergeben 18 m. Mit sechs Tropfern je Meter und 2 l/h sind es 108 Tropfer und 216 l/h. Der Planer würde für 9 m² mit 14 m rechnen, denn er setzt normale Beete voraus. In der lockeren Hochbeeterde lohnt der engere Abstand.",
        "Für den Aufstieg brauchst du an jedem Beet rund 1 m Rohr, dazu T-Stücke, Winkel und Schellen an der Innenwand.",
      ] },
      { title: "Warum Hochbeete mehr Wasser verlieren", paragraphs: [
        "Die Wände werden von der Sonne aufgeheizt, unten läuft Wasser in die grobe Füllung ab. In den ersten Jahren sackt die Erde zusätzlich und lässt Hohlräume zurück. An einem heißen Tag verbrauchen dicht bepflanzte 9 m² rund 50 Liter.",
        "Kürzere Gaben wirken besser als eine lange. Zweimal zwölf Minuten feuchten die oberen 20 cm an, eine Stunde am Stück landet zum Teil unter dem Beet.",
      ] },
      { title: "Druck und Höhe", paragraphs: [
        "80 cm Höhenunterschied kosten 0,08 bar, das merkt kein Tropfrohr. Anders ist es bei der Regentonne: Steht der Wasserspiegel einen Meter über dem Beet, hast du nur 0,1 bar. Druckkompensierte Tropfer öffnen dann nicht. Nimm einfache Tropfer ohne Membran oder eine kleine Pumpe.",
      ] },
      { title: "Zwei Wochen Urlaub", paragraphs: [
        "14 Tage mal 50 Liter sind 700 Liter. Eine 300-Liter-Tonne reicht also nicht, ein 1.000-Liter-Container schon. Am Hausanschluss genügt ein batteriebetriebener Computer. Lass ihn eine Woche vorher laufen und kontrolliere jeden Tag, ob ein Verbinder tropft.",
        "Mulch aus Rasenschnitt oder Stroh senkt den Verbrauch deutlich und kostet nichts.",
      ] },
    ],
    example: {
      title: "Drei Hochbeete an einer Zone",
      intro: "Innenmaß je 3,0 × 1,0 m, sechs Tropfer je Meter, 2 l/h.",
      steps: [
        { label: "Tropfrohr", value: "3 × 2 × 3 m = 18 m" },
        { label: "Tropfer", value: "18 × 6 = 108 Stück" },
        { label: "Durchfluss", value: "216 l/h = 3,6 l/min" },
        { label: "Menge je Stunde", value: "216 ÷ 9 m² = 24 l/m²" },
      ],
      result: "10 Liter je Quadratmeter nach 25 Minuten.",
    },
    checklist: [],
    faqs: [
      { question: "Tropfrohr oder Perlschlauch?", answer: "Tropfrohr gibt berechenbare Mengen ab. Ein Perlschlauch ist billiger, verkalkt aber schneller und gibt am Anfang mehr ab als am Ende." },
      { question: "Brauche ich für jedes Hochbeet ein Ventil?", answer: "Ein einfacher Absperrhahn genügt. Ein eigenes Ventil lohnt sich, wenn ein Beet in der Sonne und eines im Schatten steht." },
    ],
  },

  "gewaechshaus-fuer-gurken": {
    intro: "In zwei 3-m-Beete passen bei 60 cm Abstand zehn Gurkenpflanzen. Für eine Familie reichen meist drei bis vier, den übrigen Platz nutzt du besser anders. Wichtiger als die Grundfläche sind 2 m Rankhöhe und ein Dachfenster.",
    takeaway: "Ab 2 × 3 m Innenmaß geht es. Plane 60 cm je Pflanze, 70 cm Weg, Schnüre bis unters Dach und eine Tropfleitung am Boden.",
    sections: [
      { title: "Wie viele Pflanzen in die Reihe passen", paragraphs: [
        "Die Tabelle teilt die Beetlänge durch den Pflanzabstand und rundet ab. 50 cm gehen, wenn du konsequent eintriebig am Faden ziehst. 80 cm brauchst du, wenn die Gurke sich verzweigen darf.",
        "Pflanze nur eine Reihe je Seitenbeet. In einer zweiten Reihe dahinter kommst du an Blätter und Früchte nicht heran, und die Luft steht.",
      ] },
      { title: "Höhe schlägt Fläche", paragraphs: [
        "Gurken wachsen in einer Saison leicht zwei Meter und mehr. Am First ist Platz, an der niedrigen Traufe nicht. Führ die Schnur schräg zur Mitte, dann gewinnt die Pflanze 50 cm und die Früchte hängen frei.",
        "Häng die Schnüre an Profile, die der Hersteller dafür freigibt. Zehn tragende Pflanzen wiegen zusammen schnell 30 bis 40 kg.",
      ] },
      { title: "Feuchte Luft, trockene Blätter", paragraphs: [
        "Gurken mögen es warm und feucht, Pilze auch. Gieß morgens am Boden, sodass die Blätter bis zum Abend trocken bleiben. Lüften gehört trotzdem dazu: ab etwa 25 °C Dachfenster auf, am Nachmittag bei Bedarf schattieren.",
        "Unter 12 bis 15 °C in der Nacht stockt das Wachstum. In vielen Gegenden heißt das: vor Mitte Mai nur mit Vlies oder Heizung.",
      ] },
      { title: "Wasser für den Hochsommer", paragraphs: [
        "Eine große Gurke braucht an heißen Tagen etwa 3 Liter. Zehn Pflanzen kommen auf 30 Liter, eine 200-Liter-Tonne ist nach knapp sieben Tagen leer. Von 6 m² Dachfläche kommen bei 10 mm Regen rechnerisch 60 Liter zurück.",
        "Das reicht nicht. Plane einen Wasseranschluss ein, sobald du mehr als vier Pflanzen setzt.",
      ] },
    ],
    comparison: {
      caption: "Gurkenpflanzen je Beetreihe",
      columns: ["Pflanzabstand", "3 m Beet", "4 m Beet"],
      rows: [
        ["50 cm, eintriebig", "6", "8"],
        ["60 cm", "5", "6"],
        ["80 cm, verzweigt", "3", "5"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Brauchen Gurken im Gewächshaus Bienen?", answer: "Die meisten Schlangengurken fürs Gewächshaus bilden Früchte ohne Bestäubung. Einlegegurken je nach Sorte nicht, das steht auf der Samentüte." },
      { question: "Reicht ein Folientunnel?", answer: "Für eine Saison ja. Achte auf 2 m Höhe und auf Öffnungen an beiden Enden, sonst schimmelt es im Juli." },
    ],
  },

  "gewaechshaus-fuer-tomaten-und-gurken": {
    intro: "In ein Gewächshaus mit 2,5 × 4 m Innenmaß passen acht Tomaten und sechs Gurken, jede Kultur auf ihrer Seite. Dafür genügen zwei 75 cm breite Beete und ein Weg von 80 cm. Gegossen und gelüftet wird getrennt.",
    takeaway: "Tomaten an die Seite mit der Tür und dem meisten Luftzug, Gurken an die ruhigere. Tomaten alle 50 cm, Gurken alle 60 cm.",
    sections: [
      { title: "Warum beide sich nicht ganz vertragen", paragraphs: [
        "Tomaten wollen trockene Blätter und bewegte Luft, sonst kommt die Braunfäule. Gurken mögen es feuchter und reagieren auf Zugluft mit gelben Rändern. In einem Raum stellst du einen Kompromiss ein, der beiden reicht.",
        "Das klappt, wenn du auf der Tomatenseite lüftest und auf der Gurkenseite gießt. Ein Streifen Vlies oder Folie zwischen den Beeten, vom First bis auf Brusthöhe, bremst die Luft zusätzlich.",
      ] },
      { title: "Aufteilung für 2,5 × 4 Meter", paragraphs: [
        "Zwei Beete mit 75 cm und ein Weg mit 80 cm ergeben 2,30 m. Von der Innenbreite bleiben 20 cm für Profile und Schrägen. Die Beete messen zusammen 6 m², der Weg 3,2 m².",
        "Auf vier Metern stehen acht Tomaten oder sechs Gurken. Am Türende bleibt Platz für Basilikum, am Fußende für Paprika, die mit beiden Nachbarn zurechtkommt.",
      ] },
      { title: "Zwei Tropfleitungen statt einer", paragraphs: [
        "Gurken brauchen häufiger Wasser, Tomaten seltener und tiefer. Leg auf jede Seite eine eigene Leitung mit Hahn. 4 m Rohr mit einem Tropfer alle 30 cm sind 13 Tropfer, bei 2 l/h also 26 Liter je Stunde und Seite.",
        "Für acht Tomaten mit je 1,5 Litern läuft die Leitung eine knappe halbe Stunde, für sechs Gurken mit je 3 Litern etwa 42 Minuten.",
      ] },
      { title: "Kleiner geht es auch", paragraphs: [
        "Mit 2 × 3 m und Beeten zu 65 cm bleiben sechs Tomaten und fünf Gurken. Der Abstand zwischen den Kulturen schrumpft auf den 70 cm breiten Weg. Dann lohnt sich die Überlegung, die Gurken in ein Frühbeet oder einen Tunnel auszulagern.",
      ] },
    ],
    comparison: {
      caption: "Was die beiden Kulturen brauchen",
      columns: ["Merkmal", "Tomaten", "Gurken"],
      rows: [
        ["Pflanzabstand in der Reihe", "50 cm", "60 cm"],
        ["Pflanzen auf 4 m Beet", "8", "6"],
        ["Luft", "trocken, bewegt", "feucht, ohne Zug"],
        ["Wasser an heißen Tagen", "etwa 1,5 l je Pflanze", "etwa 3 l je Pflanze"],
        ["Platz im Haus", "nahe Tür und Dachfenster", "ruhige Seite"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Kann ich beide in dasselbe Beet setzen?", answer: "Ja, aber Gießen und Schneiden werden umständlich. Wenn es nur ein Beet gibt, setz die Gurken ans hintere Ende und lass 80 cm Abstand." },
    ],
  },

  "gewaechshaus-automatisch-lueften": {
    intro: "Für ein Gewächshaus mit 12 m² planst du rund 2,4 m² Öffnungsfläche, das sind 20 Prozent der Grundfläche. Vier Dachfenster mit 60 × 75 cm bringen 1,8 m², die Tür deckt den Rest. Automatische Öffner heben die Fenster ohne Strom.",
    takeaway: "Erst die Öffnungsfläche, dann die Technik. Ein Öffner je Dachfenster, dazu eine tiefe Zuluft, die auch offen bleibt, wenn du nicht da bist.",
    sections: [
      { title: "Die Öffnungsfläche nachrechnen", paragraphs: [
        "Als Planungswert nehmen wir 20 Prozent der Grundfläche. Vier Fenster mit je 0,45 m² erreichen 15 Prozent. Mit einer offenen Tür von 0,8 × 1,9 m sind es 3,3 m² und 28 Prozent. Nur über Dachfenster bräuchtest du sechs Stück.",
        "Die Tür zählt nur, wenn sie wirklich offen steht. Wer tagsüber arbeitet, rechnet besser mit Dachfenstern und einem Lamellenfenster in der Wand.",
      ] },
      { title: "So arbeitet ein automatischer Öffner", paragraphs: [
        "In einem Zylinder dehnt sich Wachs oder Öl bei Wärme aus und drückt das Fenster auf. Je nach Einstellung beginnt das zwischen 15 und 25 °C. Strom braucht es nicht, dafür Geduld: Nach einem Wolkenloch dauert es 10 bis 20 Minuten, bis das Fenster reagiert.",
        "Leg dir einen Ersatzzylinder ins Regal. Nach einigen Jahren lässt die Kraft nach, und das merkst du oft erst an den welken Pflanzen.",
      ] },
      { title: "Gewicht und Hubkraft vergleichen", paragraphs: [
        "Ein Fenster mit 60 × 75 cm und 4 mm Glas wiegt ohne Rahmen 4,5 kg, mit Rahmen rund 6 kg. Viele Öffner heben 5 bis 7 kg. Bei 5 kg Nennkraft geht es nur halb auf. Hohlkammerplatten wiegen nur einen Bruchteil davon, dort ist eher der Wind das Problem.",
        "Für windige Lagen gibt es Öffner mit Rückholfeder. Ein Haken für Sturmnächte gehört trotzdem an jedes Fenster.",
      ] },
      { title: "Zuluft und Schatten", paragraphs: [
        "Warme Luft steigt nur, wenn unten kühle nachströmt. Ein Lamellenfenster auf Kniehöhe leistet oft mehr als ein fünftes Dachfenster. Auch dafür gibt es automatische Öffner.",
        "Ein Schattiernetz außen senkt die Spitze an klaren Tagen. Es darf die Fenster nicht daran hindern, aufzugehen.",
      ] },
    ],
    example: {
      title: "Öffnungsfläche für 12 m² Grundfläche",
      intro: "Dachfenster 60 × 75 cm, Tür 80 × 190 cm.",
      steps: [
        { label: "Planungswert", value: "12 × 0,20 = 2,4 m²" },
        { label: "Vier Dachfenster", value: "4 × 0,45 = 1,8 m²" },
        { label: "Offene Tür", value: "0,8 × 1,9 = 1,52 m²" },
        { label: "Zusammen", value: "3,32 m², also 28 %" },
      ],
      result: "Mit offener Tür genügen vier Fenster, ohne Tür bräuchtest du sechs.",
    },
    checklist: [],
    faqs: [
      { question: "Lohnt sich ein elektrischer Antrieb?", answer: "Wenn Strom liegt und du mehrere Fenster über einen Thermostat steuern willst. Für ein Hobbyhaus sind Wachszylinder billiger, und sie fallen bei Stromausfall nicht aus." },
      { question: "Muss ich im Winter die Öffner abbauen?", answer: "Viele Hersteller empfehlen es. Der Zylinder mag Frost und festgefrorene Fenster nicht, und ein gekipptes Fenster bricht unter Schnee." },
    ],
  },

  "sichtschutz-wpc-oder-holz": {
    intro: "Auf 12 m Sichtschutz mit 1,80 m Raster brauchst du mit WPC wie mit Holz sieben Felder und acht Pfosten. Der Unterschied liegt in der Pflege: Ein Holzzaun mit 1,80 m Höhe hat 43 m² Fläche, die du alle paar Jahre streichst.",
    takeaway: "WPC, wenn du nie streichen willst und die Maße passen. Holz, wenn du kürzen, reparieren und die Farbe ändern möchtest. Pfosten und Fundamente brauchen beide gleich.",
    sections: [
      { title: "Dieselbe Teilung für beide", paragraphs: [
        "12 m geteilt durch 1,80 m sind 6,67. Es werden sieben Felder, das letzte ist 1,20 m breit. Holz sägst du auf Maß. Bei WPC hängt es vom System ab: Einzelne Profile lassen sich kürzen, gerahmte Elemente meist nicht.",
        "Ein passendes Schmalfeld führt nicht jeder Hersteller. Prüf das, bevor die Pfosten stehen, sonst bleibt am Ende eine Lücke von 1,20 m.",
      ] },
      { title: "Streichen in Litern und Stunden", paragraphs: [
        "Zwei Seiten mit je 12 × 1,8 m sind 43,2 m². Bei 10 m² je Liter braucht ein Anstrich 4,3 Liter Lasur, zwei Anstriche knapp 9 Liter. Mit Leisten und Zwischenräumen wird es mehr. Rechne ein Wochenende dafür ein.",
        "Lärche oder Douglasie darfst du auch grau werden lassen. Dann entfällt das Streichen, und Regenspuren gehören zum Bild.",
      ] },
      { title: "Was WPC bei Hitze macht", paragraphs: [
        "WPC dehnt sich in der Länge. Ein 1,80 m langes Profil wächst bei 40 Grad Unterschied um rund 3 mm, wenn man 0,04 mm je Meter und Grad ansetzt. Den Wert deines Profils nennt der Hersteller. Die Nuten im Pfosten müssen dieses Spiel lassen.",
        "Dunkle Farben heizen sich stärker auf. An einer Südwand wellen sich dünne Hohlprofile eher als massive.",
      ] },
      { title: "Schaden, Reparatur, Ende", paragraphs: [
        "Ein gebrochenes Holzbrett ersetzt du mit Ware aus dem Baumarkt. Bei WPC brauchst du genau dieses Profil in dieser Farbe, auch in zehn Jahren. Leg dir ein Feld auf Vorrat.",
        "Holz fault zuerst am Boden. 5 bis 10 cm Luft unter dem untersten Brett und ein Pfostenträger aus Stahl verlängern das Leben mehr als jede Lasur.",
      ] },
    ],
    comparison: {
      caption: "12 m Sichtschutz, 1,80 m hoch",
      columns: ["Merkmal", "Holz", "WPC"],
      rows: [
        ["Felder und Pfosten", "7 und 8", "7 und 8"],
        ["Letztes Feld", "auf 1,20 m gesägt", "Schmalfeld oder kürzbares System nötig"],
        ["Pflege", "streichen oder vergrauen lassen", "abwaschen"],
        ["Wärme", "arbeitet mit Feuchte", "dehnt sich in der Länge"],
        ["Ersatzteil", "Brett aus dem Baumarkt", "nur passendes Profil"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Was hält länger?", answer: "Das hängt stärker vom Aufbau ab als vom Material. Holz mit Bodenabstand und trockenen Pfosten überlebt WPC auf schwachen Pfosten." },
      { question: "Hält so ein Zaun Straßenlärm ab?", answer: "Kaum. Dafür braucht es eine schwere, fugenlose Wand. Holz und WPC in üblicher Stärke helfen vor allem gegen Blicke." },
    ],
  },

  "sichtschutz-bei-starkem-wind": {
    intro: "Bei 90 km/h Wind drückt rechnerisch eine Kraft von rund 1,3 kN auf ein geschlossenes Feld mit 1,80 × 1,80 m, das entspricht der Last von knapp 130 kg. Diese Last tragen Pfosten und Fundament. Niedriger bauen hilft mehr als dickeres Material.",
    takeaway: "Senk die Höhe, verkürze die Pfostenabstände und nimm ein System mit Nachweis für deine Windzone. Offene Lamellen entlasten, aber um keinen festen Prozentsatz.",
    sections: [
      { title: "Was der Wind rechnerisch anrichtet", paragraphs: [
        "Der Staudruck steigt mit dem Quadrat der Geschwindigkeit: 0,25 kN/m² bei 72 km/h, 0,39 bei 90 und 0,56 bei 108 km/h. Auf 3,24 m² Feldfläche sind das 0,8, 1,3 und 1,8 kN.",
        "Diese Werte zeigen die Größenordnung. Böen, Ecken und Formbeiwerte kommen in der Norm dazu und erhöhen sie. Für die Bemessung brauchst du den Nachweis des Herstellers.",
      ] },
      { title: "Höhe verändert die Kraft im Quadrat", paragraphs: [
        "Am Pfostenfuß zählt Kraft mal Hebel. Bei 1,80 m Höhe und 90 km/h sind das 1,27 kN mal 0,9 m, also 1,14 kNm. Bei 2,00 m sind es 1,41 kNm und damit 23 Prozent mehr. Bei 1,50 m sinkt der Wert auf 0,79.",
        "30 cm weniger Höhe entlasten den Pfosten um fast ein Drittel. Unser Planer warnt deshalb ab 2,00 m Höhe ausdrücklich.",
      ] },
      { title: "Zehn Meter geschlossene Wand", paragraphs: [
        "Eine Wand mit 10 × 1,8 m bietet 18 m² Angriffsfläche. Die Enden und die Ecken bekommen mehr ab als die Mitte. Ein kurzes Feld oder ein zusätzlicher Pfosten am freien Ende ist dort besser als noch ein Element in voller Breite.",
        "Wo möglich, unterbrichst du die Fläche mit Pflanzen, einem Rankgitter oder einer versetzten zweiten Wand. Auch kleine Lücken nehmen Druck weg.",
      ] },
      { title: "Fundament: dort fällt die Entscheidung", paragraphs: [
        "Ein Zaun kippt selten in der Mitte, der Pfosten reißt aus dem Boden. Breite und Tiefe des Betons hängen von Boden, Frost und Höhe ab. Pfostenschuhe auf einer Mauerkrone sind bei Wind besonders heikel, weil Dübel am Rand ausbrechen.",
        "Ein Tor ist im Wind ein eigenes Thema: Der Flügel schlägt. Er braucht Anschlag, Riegel und stärkere Pfosten.",
      ] },
    ],
    comparison: {
      caption: "Staudruck auf ein Feld mit 1,80 × 1,80 m (ohne Formbeiwert und Böen)",
      columns: ["Wind", "Staudruck", "Kraft auf das Feld"],
      rows: [
        ["72 km/h", "0,25 kN/m²", "0,8 kN"],
        ["90 km/h", "0,39 kN/m²", "1,3 kN"],
        ["108 km/h", "0,56 kN/m²", "1,8 kN"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein halb offener Zaun?", answer: "Er verringert die Kraft, denn Luft strömt durch. Wie viel, hängt von Spaltmaß und Form ab, deshalb gibt der Hersteller eigene Werte für jedes Modell an." },
      { question: "Darf ich vorhandene Pfosten weiterverwenden?", answer: "Nur wenn du Querschnitt, Abstand und Fundament kennst. Bei einem alten Holzzaun mit Pfostenschuhen auf Dübeln lautet die Antwort meist nein." },
    ],
  },

  "sichtschutz-mit-gartentor": {
    intro: "Auf 8 m Sichtschutz mit einem Tor von 1,10 m lichter Breite bleiben neben dem Tor 6,70 m. Das ergibt mit 1,80-m-Feldern vier Felder, von denen das letzte auf 1,30 m gekürzt wird. Insgesamt brauchst du sechs Pfosten.",
    takeaway: "Leg zuerst das Tor fest, dann teile den Rest. Das Tor braucht 1,30 m Einbaubreite, zwei stärkere Pfosten und davor Platz für den Flügel.",
    sections: [
      { title: "So teilt sich die Strecke auf", paragraphs: [
        "Das Tor hat 1,10 m lichte Breite. Mit zwei Pfosten von je 10 cm sind es 1,30 m. Von 8,00 m bleiben 6,70 m für vier Felder, jedes bringt seinen eigenen Pfosten mit. Volle Felder wären 7,20 m lang, also muss 50 cm weg: Das letzte Feld schrumpft auf 1,30 m.",
        "Schöner ist es, alle vier gleich zu machen. 6,70 m geteilt durch vier ergeben 1,675 m, davon 10 cm Pfosten. Sitzt das Tor mittig, stehen zwei Felder auf jeder Seite, das Bild wird symmetrisch.",
      ] },
      { title: "Wie breit das Tor sein sollte", paragraphs: [
        "Rechne vom Gerät aus, das regelmäßig hindurch muss, und gib auf jeder Seite 10 cm dazu. Für Mülltonnen genügt ein einflügeliges Tor mit 1,00 m. Ein Aufsitzmäher braucht 1,25 m oder einen zweiten Flügel.",
        "Nenn dem Händler das lichte Maß im eingebauten Zustand. Bänder und Schloss verkleinern die Öffnung oft um 5 bis 10 cm.",
      ] },
      { title: "Schwenkraum und Gefälle", paragraphs: [
        "Ein 1,10 m breiter Flügel überstreicht knapp einen Quadratmeter. Steigt der Boden in Öffnungsrichtung um 5 Prozent, kommt der Flügel nach 1,10 m 5,5 cm höher an. Lass unten so viel Luft oder öffne zur anderen Seite.",
        "Zum Gehweg hin darf ein Tor in vielen Gemeinden nicht aufschlagen. Frag nach, wenn die Öffnung an die Straße grenzt.",
      ] },
      { title: "Torpfosten sind eigene Bauteile", paragraphs: [
        "Am Torpfosten hängt ein bewegtes Gewicht. Er wird breiter und tiefer gegründet als ein Zaunpfosten. Ein normales Feld mit Scharnieren umzubauen, klappt ein halbes Jahr und hängt dann durch.",
        "Plane Anschlag, Schloss und eine Feststellung für den offenen Flügel. Für Klingel oder elektrischen Türöffner legst du ein Leerrohr ein, bevor der Beton kommt.",
      ] },
    ],
    example: {
      title: "8 m mit Tor und 1,80-m-Feldern",
      intro: "Torbreite licht 1,10 m, Torpfosten je 10 cm.",
      steps: [
        { label: "Tor samt Pfosten", value: "1,10 + 0,20 = 1,30 m" },
        { label: "Rest für Felder", value: "8,00 − 1,30 = 6,70 m" },
        { label: "Felder", value: "6,70 ÷ 1,80 = 3,7, aufgerundet 4" },
        { label: "Letztes Feld", value: "6,70 − 3 × 1,80 = 1,30 m" },
        { label: "Pfosten", value: "4 + 2 = 6" },
      ],
      result: "Vier Felder, ein Tor und sechs Pfosten.",
    },
    checklist: [],
    faqs: [
      { question: "Einflügelig oder zweiflügelig?", answer: "Bis etwa 1,20 m reicht ein Flügel. Darüber wird er schwer, und zwei Flügel mit Bodenriegel sind die ruhigere Lösung." },
      { question: "Kann ich das Tor später noch versetzen?", answer: "Nur mit neuen Pfosten. Das Feld lässt sich umhängen, das Fundament nicht." },
    ],
  },

  "einzelcarport-oder-doppelcarport": {
    intro: "Zwei Autos mit je 2,00 m Breite brauchen in einem Doppelcarport 6,10 m lichte Breite, wenn du 70 cm Platz an jeder Seite und dazwischen lässt. Zwei Einzelcarports kommen auf zweimal 3,40 m, nebeneinander gebaut außen 7,28 m. Das sind rund 0,9 m mehr.",
    takeaway: "Doppelcarport, wenn der Platz knapp ist und niemand einen Mittelpfosten im Weg haben will. Zwei Einzelcarports, wenn ihr an verschiedenen Stellen parkt oder später nur einen baut.",
    sections: [
      { title: "Breite mit offenen Türen", paragraphs: [
        "2,00 m Auto plus 0,70 m auf beiden Seiten ergeben 3,40 m. Zwei nebeneinander, mit einem gemeinsamen Zwischenraum von 70 cm, kommen auf 2 × 2,00 + 3 × 0,70 = 6,10 m. Wollen dort zwei Personen gleichzeitig aussteigen, planst du in der Mitte 1,00 m und kommst auf 6,40 m.",
        "Miss deine Autos mit ausgeklappten Spiegeln. 2,00 m ist ein runder Wert, kleine Wagen liegen darunter und große SUV mit 2,05 m darüber.",
      ] },
      { title: "Pfosten, Außenmaß und Grundfläche", paragraphs: [
        "Pfosten mit 12 cm machen einen Doppelcarport außen 6,34 m breit, zwei Einzelcarports zusammen 7,28 m. Mit 5,70 m Länge sind das 34,8 m² gegen 38,8 m² lichte Planungsfläche. Das Dach ragt noch darüber hinaus.",
        "Ein Mittelpfosten kostet beim Einparken am meisten. Frag den Hersteller, ob das Modell ohne auskommt und wie weit die Spannweite ohne Verstärkung geht.",
      ] },
      { title: "Wer Einzelcarports nehmen sollte", paragraphs: [
        "Zwei einzelne Dächer lassen sich getrennt bauen, erweitern und abreißen. Auf einem schmalen Grundstück stehen sie hintereinander oder versetzt. Und wenn eines der Autos selten da ist, nutzt ihr den Platz als Werkbank oder Fahrradstand.",
        "Der Nachteil steht in der Mitte: Zwischen den Dächern läuft das Wasser, und die Rinnen brauchen zwei Fallrohre.",
      ] },
      { title: "Dachwasser und Fundament", paragraphs: [
        "Bei 10 mm Regen kommen auf 34,8 m² Planungsfläche 348 Liter zusammen. Die Rinne des Doppelcarports muss diese Menge an einer Stelle ableiten. Beim Einzelcarport sind es 194 Liter.",
        "Fundamente, Statik und eine mögliche Genehmigung richten sich nach der Grundfläche und dem Ort. Ein Anruf beim Bauamt vor der Bestellung klärt auch den Abstand zur Grenze.",
      ] },
    ],
    comparison: {
      caption: "Maße bei 2,00 m Autobreite und 70 cm Platz",
      columns: ["Bauform", "Lichte Breite", "Fläche bei 5,70 m"],
      rows: [
        ["Einzelcarport", "3,40 m", "19,4 m²"],
        ["Zwei Einzelcarports", "2 × 3,40 m", "38,8 m²"],
        ["Doppelcarport", "6,10 m", "34,8 m²"],
        ["Doppelcarport, 1,00 m in der Mitte", "6,40 m", "36,5 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Brauche ich einen Mittelpfosten?", answer: "Das hängt von Dachlast und Spannweite ab. Viele Bausätze kommen bis etwa 6 m ohne aus, größere stützen in der Mitte. Entscheidend ist die Statik des Modells, nicht die Faustregel." },
    ],
  },

  "carport-mit-abstellraum": {
    intro: "Ein Carport mit 3,40 m lichter Breite wird mit einem 2 m tiefen Abstellraum 7,70 m lang. Der Raum hat dann 6,8 m² und fasst drei Fahrräder samt Regal. Für vier Räder brauchst du 2,50 m Tiefe und 8,20 m Gesamtlänge.",
    takeaway: "Rechne 5,70 m für das Auto plus die Tiefe des Raums. Die Tür gehört in die Seitenwand, damit du auch bei geparktem Auto hineinkommst.",
    sections: [
      { title: "Wie die Tiefe die Gesamtlänge bestimmt", paragraphs: [
        "Das Auto braucht 4,70 m plus je 50 cm vorn und hinten, zusammen 5,70 m. Jeder Meter Abstellraum verlängert das Dach um einen Meter und bringt 3,4 m² Fläche. Das sind lichte Maße, Wände und Verkleidung kommen dazu.",
        "Passt die Länge nicht aufs Grundstück, setz den Raum neben das Auto. Dann wächst die Breite, und die Zufahrt muss trotzdem frei bleiben.",
      ] },
      { title: "Räder quer zur Fahrtrichtung stellen", paragraphs: [
        "Komm durch die Seitenwand herein und stell die Räder mit dem Vorderrad zur gegenüberliegenden Seite. Von 3,40 m Breite belegen sie 1,85 m, und 1,55 m bleiben als Gang hinter der Tür.",
        "Nebeneinander mit Höhenversatz brauchen drei Räder 1,65 m und vier 2,15 m. In beiden Fällen bleiben bei 2,00 beziehungsweise 2,50 m Tiefe noch 35 cm für ein schmales Regal. Der Gartenhaus-Planer nennt mit wenig Werkzeug und Regal 5,0 m² für drei und 5,5 m² für vier Räder.",
      ] },
      { title: "Warum die Tür nicht hinter das Auto gehört", paragraphs: [
        "Zwischen Stoßstange und Rückwand liegen 50 cm. Eine Tür lässt sich dort nicht öffnen, solange das Auto steht. In der Seitenwand oder auf der Gartenseite stört sie niemanden. Für Räder nimm mindestens 90 cm lichte Breite, für Anhänger oder Lastenrad 120 cm.",
        "Sitzt der Raum an der Grundstücksgrenze, bleibt meist nur eine Seite für die Tür. Prüf das, bevor du ein spiegelverkehrtes Modell bestellst.",
      ] },
      { title: "Was die geschlossenen Wände verändern", paragraphs: [
        "Ein offener Stellplatz und ein geschlossener Raum können baurechtlich unterschiedlich zählen, vor allem an der Grenze. Frag das Bauamt nach Abstand, Brandschutz und Grundfläche der gesamten Anlage.",
        "Nasse Reifen und Geräte bringen Feuchte mit. Je eine Öffnung unten und oben in gegenüberliegenden Wänden reicht zum Trocknen. Wände fangen außerdem Wind, deshalb gilt die Statik des offenen Carports nicht automatisch weiter.",
      ] },
    ],
    comparison: {
      caption: "Abstellraum hinter dem Auto, 3,40 m lichte Breite",
      columns: ["Tiefe", "Länge gesamt", "Fläche und Räder"],
      rows: [
        ["1,50 m", "7,20 m", "5,1 m², 2 Räder"],
        ["2,00 m", "7,70 m", "6,8 m², 3 Räder"],
        ["2,50 m", "8,20 m", "8,5 m², 4 Räder"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Kann ich den Abstellraum später ergänzen?", answer: "Bei manchen Bausätzen ja. Frag vor dem Kauf nach einem passenden Anbausatz und setz das Fundament gleich auf die volle Länge, wenn du ihn sicher willst." },
    ],
  },

  "laminat-fuer-50-qm": {
    intro: "Für 50 m² Laminat brauchst du 22 Pakete mit je 2,4 m², wenn der Verschnitt bei 5 Prozent bleibt. Mit 10 Prozent sind es 23. Verlegst du in drei Räumen unterschiedliche Dekore, werden daraus bis zu 25, weil jeder Raum für sich aufgerundet wird.",
    takeaway: "Gleiches Dekor überall: alle Räume addieren, einmal aufrunden. Verschiedene Dekore: je Raum aufrunden und die Reste getrennt lagern.",
    sections: [
      { title: "Drei Räume, einmal oder dreimal gerundet", paragraphs: [
        "25, 16 und 9 m² ergeben 50. Mit 5 Prozent Verschnitt sind das 52,5 m² und 21,9 Pakete, also 22. Rechnest du je Raum, kommen 11, 7 und 4 heraus, ebenfalls 22. Hier ist es also egal.",
        "Mit 10 Prozent kippt das: Zusammen sind es 22,9 und damit 23 Pakete, einzeln 12, 8 und 5. Zwei Pakete mehr, nur durch das Runden. Bestell deshalb nur so viele Dekore, wie du wirklich willst.",
      ] },
      { title: "Durchverlegen oder an jeder Tür trennen", paragraphs: [
        "Laminat schwimmt und dehnt sich als ganze Fläche. Viele Hersteller begrenzen eine Strecke auf 8 bis 10 m in Länge oder Breite. Verlegst du durch mehrere Räume, kommst du über einen Flur schnell darüber.",
        "Eine Übergangsschiene in jedem Türrahmen löst das und entkoppelt den Trittschall. Sie kostet 90 cm Profil je Tür und verhindert, dass die ganze Wohnung an einem Punkt klemmt.",
      ] },
      { title: "Unterlage und Leisten", paragraphs: [
        "Für die Unterlage rechnet der Planer 5 Prozent Überlappung, das sind 52,5 m². Bei 10 m² je Rolle werden es sechs Rollen.",
        "Die Leisten folgen dem Umfang der Räume. 5 × 5, 4 × 4 und 3 × 3 m haben zusammen 48 m, minus drei Türen mit 0,9 m bleiben 45,3 m. Mit 10 Prozent Reserve sind das 49,8 m oder 21 Leisten mit 2,4 m. Eine gemeinsame Wand zählt doppelt, denn sie bekommt auf beiden Seiten eine Leiste.",
      ] },
      { title: "370 Kilo in die Wohnung tragen", paragraphs: [
        "Bei 7 kg je Quadratmeter wiegen 52,8 m² rund 370 kg, verteilt auf 22 Pakete mit je knapp 17 kg. Lass sie 48 Stunden in den Räumen liegen, flach und mit Luft dazwischen, bevor du anfängst.",
        "Bestell alles aus einer Charge und schau auf die Nummer am Paket. Nachkauf in einem anderen Farbton fällt auf 50 m² stark auf.",
      ] },
    ],
    example: {
      title: "Bestellung für drei Räume mit gleichem Dekor",
      intro: "25 + 16 + 9 m², Pakete mit 2,4 m², gerade Verlegung.",
      steps: [
        { label: "Fläche mit 5 %", value: "50 × 1,05 = 52,5 m²" },
        { label: "Pakete", value: "52,5 ÷ 2,4 = 21,9, also 22" },
        { label: "Sockelleisten", value: "45,3 × 1,1 = 49,8 m, also 21 × 2,4 m" },
        { label: "Unterlage", value: "52,5 m², also 6 Rollen à 10 m²" },
      ],
      result: "22 Pakete Laminat, 21 Leisten und 6 Rollen Unterlage.",
    },
    checklist: [],
    faqs: [
      { question: "Wie viele Pakete sollte ich zurücklegen?", answer: "Ein Paket für spätere Reparaturen reicht. Wenn du schon bei 10 Prozent bestellst, ist das die Reserve, die am Ende übrig bleibt." },
    ],
  },

  "vinyl-klick-oder-kleben": {
    intro: "Auf 30 m² brauchst du 15 Pakete Klickvinyl mit 2,2 m² oder zehn Pakete Klebevinyl mit 3,3 m². Der größere Unterschied liegt darunter: Klickvinyl mit Unterlage baut rund 6,5 mm auf, Klebevinyl mit 2 mm Spachtel nur 4,5 mm.",
    takeaway: "Klickvinyl, wenn der Boden einigermaßen eben ist und du ihn wieder ausbauen willst. Klebevinyl bei glattem, trockenem Estrich und wenn du dünn bleiben musst, etwa wegen der Türen.",
    sections: [
      { title: "Zwei Millimeter an jeder Tür", paragraphs: [
        "Beispiel für Klick: 5 mm Diele plus 1,5 mm Unterlage. Beispiel für Kleben: 2,5 mm Diele, 2 mm Spachtelmasse und ein Hauch Kleber. Der Unterschied von 2 mm reicht, um eine Tür schleifen zu lassen oder eine Übergangsschiene zu verlangen.",
        "Miss den Spalt unter jeder Tür, bevor du entscheidest.",
      ] },
      { title: "Was an Material dazukommt", paragraphs: [
        "Bei 300 g Kleber je Quadratmeter brauchen 30 m² 9 kg. Muss gespachtelt werden, kommen bei 2 mm Dicke 90 kg Ausgleichsmasse dazu, wenn 1,5 kg je Quadratmeter und Millimeter verarbeitet werden. Die Mengen deines Produkts stehen auf dem Gebinde.",
        "Klickvinyl spart diese Arbeit, aber keine Sorgfalt: Unebenheiten über 2 bis 3 mm auf zwei Metern drücken sich im Lauf der Jahre durch.",
      ] },
      { title: "Fußbodenheizung und Wärme", paragraphs: [
        "Je dünner der Boden, desto besser kommt die Wärme an. Mit einer angenommenen Leitfähigkeit von 0,25 W/mK hat 5 mm Vinyl rund 0,02 m²K/W, 2,5 mm die Hälfte. Beides liegt weit unter den 0,15, die für beheizte Böden häufig als Obergrenze stehen. Eine Unterlage kommt hinzu.",
        "Boden, Unterlage und Oberflächentemperatur gibt der Hersteller gemeinsam frei. Der Wärmedurchlasswiderstand steht auf dem Datenblatt.",
      ] },
      { title: "Wer wann im Vorteil ist", paragraphs: [
        "Geklebtes Vinyl klingt leiser und knarrt nicht. Dafür ist es fest: Beim Ausbau hängt der Kleber am Estrich. Klickvinyl lässt sich wieder aufnehmen, in Mietwohnungen ist das der stärkere Punkt.",
        "Feuchte im Estrich macht beide kaputt. Bei Klebevinyl löst sich der Kleber, bei Klickvinyl kann es unter dem Belag schimmeln. Lass die Restfeuchte messen, bevor du Ware bestellst.",
      ] },
    ],
    comparison: {
      caption: "30 m² mit 5 Prozent Verschnitt",
      columns: ["Merkmal", "Klickvinyl", "Klebevinyl"],
      rows: [
        ["Pakete", "15 × 2,2 m² = 33 m²", "10 × 3,3 m² = 33 m²"],
        ["Aufbauhöhe im Beispiel", "6,5 mm", "4,5 mm mit Spachtel"],
        ["Zusatz", "Unterlage", "9 kg Kleber, bis 90 kg Spachtel"],
        ["Ausbau", "wiederverwendbar", "Kleberreste am Estrich"],
        ["Typischer Grund", "Miete, schneller Einbau", "geringe Höhe, leises Gehen"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Kann ich Klickvinyl auf alten Fliesen verlegen?", answer: "Oft ja, wenn die Fliesen fest liegen und die Fugen flach sind. Breite Fugen füllst du vorher, sonst zeichnen sie sich ab." },
      { question: "Ist Vinyl wasserdicht?", answer: "Die Diele meist, die Fuge und der Rand nicht unbedingt. Für das Bad brauchst du ein freigegebenes System und dichte Anschlüsse." },
    ],
  },

  "bodenbelag-fuer-kueche": {
    intro: "Für eine Küche mit 16 m² bestellst du acht Pakete mit 2,2 m². Ziehst du Küchenzeile und Insel mit zusammen 4,2 m² ab, genügen sechs. Ob du abziehen darfst, hängt davon ab, ob der Boden schwimmend liegt oder verklebt ist.",
    takeaway: "Schwimmende Böden liegen nicht unter festen Schränken. Verklebte schon. Entscheide das vor der Bestellung, denn 4 m² sind zwei Pakete.",
    sections: [
      { title: "Was unter die Küche gehört und was nicht", paragraphs: [
        "Ein schwimmender Boden muss sich bewegen können. Steht die Zeile mit ihrem ganzen Gewicht darauf, klemmt er. Er wird deshalb bis unter die Sockelblende verlegt, die Schränke stehen auf dem Estrich. Das gilt für Laminat und Klickvinyl.",
        "Verklebtes Vinyl, Fliesen und Linoleum liegen fest. Sie dürfen durchgehen, und eine andere Küche lässt sich später ohne Lücke im Boden aufstellen.",
      ] },
      { title: "16 oder 12 Quadratmeter", paragraphs: [
        "Raum 5,0 × 3,2 m. Zeile 4,0 × 0,6 m und Insel 2,0 × 0,9 m belegen 4,2 m². Es bleiben 11,8 m², mit 5 Prozent Verschnitt 12,4 m² und sechs Pakete. Voll verlegt sind es 16,8 m² und acht.",
        "Der Abzug ist mit 26 Prozent groß. Unser Planer weist ab 20 Prozent darauf hin, dass Schnitte an den Kanten Verschnitt kosten. Bei 10 Prozent bleibt es trotzdem bei sechs und acht Paketen.",
      ] },
      { title: "Wasser, Fett und Stühle", paragraphs: [
        "Vor der Spüle steht regelmäßig Wasser. Laminat quillt an ungeschützten Kanten auf, wenn es länger als ein paar Minuten steht. Vinyl verträgt mehr, seine Fugen auch nicht unbegrenzt. Wisch deshalb schnell auf und achte auf eine Verlegung mit geschützten Kanten.",
        "Stuhlrollen verlangen einen Boden, der dafür ausdrücklich freigegeben ist. Unter feste Stühle gehören Filzgleiter, die du ab und zu erneuerst.",
      ] },
      { title: "Reihenfolge der Handwerker", paragraphs: [
        "Boden zuerst und Küche danach, wenn er durchgeht. Bei schwimmendem Boden kommt erst die Küche, dann wird bis zur Blende verlegt. Die Höhe der Spülmaschine und der Sockel richtet sich nach der Oberkante. Kläre sie mit dem Küchenstudio, bevor gesägt wird.",
      ] },
    ],
    comparison: {
      caption: "Küche mit 16 m², Zeile und Insel mit 4,2 m², Pakete mit 2,2 m²",
      columns: ["Verlegung", "Bestellfläche", "Pakete"],
      rows: [
        ["Unter der Küche, 5 % Verschnitt", "16,8 m²", "8"],
        ["Unter der Küche, 10 %", "17,6 m²", "8"],
        ["Um die Küche, 5 %", "12,4 m²", "6"],
        ["Um die Küche, 10 %", "13,0 m²", "6"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Welcher Boden ist für die Küche am pflegeleichtesten?", answer: "Verklebtes Vinyl und Feinsteinzeug. Fett lässt sich wischen, Wasser bleibt an der Oberfläche. Parkett funktioniert auch, braucht aber Nachpflege." },
      { question: "Passt der Boden unter eine spätere Insel?", answer: "Bei verklebtem Boden ja. Bei schwimmendem Boden solltest du die Insel gleich einplanen oder die Fläche erst verlegen, wenn sie steht." },
    ],
  },

  "luftentfeuchter-fuer-20-qm": {
    intro: "Für 20 m² mit 2,5 m Höhe, also 50 m³, reicht bei leicht erhöhter Feuchte ein Gerät für 20 m². Bei mittlerer Feuchte sollten es 23 m² sein, im kühlen Keller 25 m² und bei Wäsche 26 m². Das sind kleine Geräte, der Unterschied liegt in Lautstärke und Ablauf.",
    takeaway: "Nimm die nächste Klasse, nicht die übernächste. Größere Geräte sind meist lauter, und in 50 m³ ist auch ein kleines schnell fertig.",
    sections: [
      { title: "Wie viel Wasser wirklich in der Luft ist", paragraphs: [
        "Bei 20 °C kann ein Kubikmeter Luft höchstens 17,3 g Wasserdampf aufnehmen. Sinkt die Feuchte in 50 m³ von 70 auf 55 Prozent, sind das gerade 130 g. Ein kleines Gerät schafft diese Menge in etwa einer Stunde.",
        "Dass es trotzdem länger läuft, liegt an Wänden, Möbeln und Textilien. Sie geben Feuchte nach. Erst wenn sie trocken sind, bleibt der Wert auch nach dem Abschalten.",
      ] },
      { title: "Wäsche ist ein anderes Thema", paragraphs: [
        "5 kg frisch geschleuderte Wäsche enthalten oft noch 2,5 Liter Wasser. Das ist zwanzigmal so viel wie die 130 g aus der Luft. Für einen Trockenraum ist die Literleistung wichtiger als die Quadratmeterangabe, und der Tank sollte mehr als eine Ladung fassen.",
        "Stell das Gerät so, dass die Luft an der Wäsche vorbeiströmt, und schließ Fenster und Tür. Sonst entfeuchtest du den Flur mit.",
      ] },
      { title: "Stromkosten für ein kleines Gerät", paragraphs: [
        "250 W über sechs Stunden sind 1,5 kWh am Tag. Bei 35 Cent kostet das 53 Cent, im Monat knapp 16 Euro. Ein Hygrostat, der bei 55 Prozent abschaltet, verkürzt die Laufzeit, sobald Wände und Möbel trocken sind.",
        "Läuft das Gerät im Winter täglich lange, versuch es zuerst mit Stoßlüften. Kalte Außenluft enthält wenig Wasser und trocknet den Raum beim Aufwärmen.",
      ] },
      { title: "Schlafzimmer, Hobbyraum, Keller", paragraphs: [
        "Im Schlafzimmer entscheidet die Lautstärke. Achte auf eine Nachtstufe und einen dunklen Anzeigemodus. Im Keller ist die Mindesttemperatur wichtiger, unter 15 °C schaffen viele Kompressorgeräte kaum noch etwas.",
      ] },
    ],
    comparison: {
      caption: "Geräteklasse für 20 m² Grundfläche",
      columns: ["Situation", "Zuschlag", "Herstellerangabe ab"],
      rows: [
        ["Wohnraum, leicht erhöhte Feuchte", "keiner", "20 m²"],
        ["Mittlere Feuchte", "15 %", "23 m²"],
        ["Keller unter 16 °C", "25 %", "25 m²"],
        ["Hohe Feuchte oder Wäsche", "30 %", "26 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein kleiner Peltier-Entfeuchter?", answer: "Für 50 m³ nicht. Solche Geräte ziehen nur wenig Wasser am Tag und passen zu Schränken oder kleinen Abstellkammern." },
      { question: "Reicht Lüften allein?", answer: "Im Winter oft ja. Im Sommer kann die Außenluft feuchter sein als die Raumluft, dann hilft nur das Gerät." },
    ],
  },

  "luftentfeuchter-fuer-100-qm": {
    intro: "Für 100 m² mit 2,5 m Raumhöhe musst du 250 m³ entfeuchten. Bei leicht erhöhter Feuchte reicht ein Gerät für 100 m², bei hoher Feuchte oder im kühlen Keller sind es 125 bis 130 m². In mehreren Räumen sind zwei mittlere Geräte meist besser als ein großes.",
    takeaway: "Ein Raum: ein Gerät ab 100 m². Mehrere Räume: zwei Geräte ab etwa 65 m² statt eines einzelnen. Im Keller mit 125 m² rechnen.",
    sections: [
      { title: "Ein großes oder zwei mittlere Geräte", paragraphs: [
        "Ein Gerät trocknet die Luft, die es erreicht. Stehen Türen offen, mischt sich ein Teil der Nachbarräume mit, mehr nicht. 100 m² in drei Kellerräumen bedeuten daher, dass der hinterste Raum kaum profitiert.",
        "Für 100 m² Keller mit Faktor 1,25 brauchst du 125 m² Leistung. Zwei Geräte mit je 63 m² verteilen sie auf zwei Räume, und wenn eines ausfällt, läuft das andere weiter.",
      ] },
      { title: "Woher die Feuchte kommt", paragraphs: [
        "Warme Luft von draußen trägt Wasser in den kühlen Keller. Bei 16 °C Kellerluft mit 55 Prozent sind es 7,5 g je Kubikmeter, draußen an einem Sommertag etwa 12 g. Dringt stündlich ein Fünftel der Luft ein, kommen 225 g dazu, am Tag rund 5,4 Liter.",
        "Dagegen hilft zuerst ein geschlossenes Fenster. Lüfte den Keller nur, wenn es draußen kühler und trockener ist als drinnen.",
      ] },
      { title: "Leistung, Tank, Schlauch", paragraphs: [
        "5,4 Liter am Tag füllen einen 4-Liter-Tank mehr als einmal. Ein Schlauch zum Bodenablauf, eine Pumpe oder ein Anschluss an den Siphon erspart dir das tägliche Leeren. Achte darauf, dass der Schlauch durchgehend fällt.",
        "Die Literangabe auf dem Karton gilt für 30 °C und 80 Prozent. Für einen kühlen Keller suchst du den Wert bei 15 oder 20 °C.",
      ] },
      { title: "Was der Betrieb im Monat kostet", paragraphs: [
        "Ein großes Gerät mit 700 W läuft zehn Stunden und braucht 7 kWh. Bei 35 Cent sind das 2,45 Euro am Tag und knapp 74 Euro im Monat. Ein Hygrostat auf 55 Prozent kappt die Laufzeit, sobald der Keller trocken ist.",
        "Steht die Feuchte trotz Dauerbetrieb bei 70 Prozent, dringt Wasser nach. Dann such die Ursache, bevor du ein noch größeres Gerät kaufst.",
      ] },
    ],
    comparison: {
      caption: "Geräteklasse für 100 m² Grundfläche",
      columns: ["Situation", "Zuschlag", "Herstellerangabe ab"],
      rows: [
        ["Wohnraum, leicht erhöhte Feuchte", "keiner", "100 m²"],
        ["Mittlere Feuchte", "15 %", "115 m²"],
        ["Keller unter 16 °C", "25 %", "125 m²"],
        ["Hohe Feuchte oder Wäsche", "30 %", "130 m²"],
      ],
    },
    checklist: [],
    faqs: [
      { question: "Reicht ein Bautrockner?", answer: "Für kurze Zeit nach einem Wasserschaden ja. Im Dauerbetrieb ist er laut und braucht viel Strom, für einen bewohnten Keller ist ein normales Gerät die bessere Wahl." },
    ],
  },
};
