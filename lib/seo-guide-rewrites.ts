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
};
