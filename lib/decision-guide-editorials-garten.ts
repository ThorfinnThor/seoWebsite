import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyGartenEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "terrasse-laerche-oder-wpc-hohlkammer-20-qm") return terrace20(guide);
  if (guide.slug === "gewaechshaus-blankglas-oder-sicherheitsglas-kleiner-garten") return greenhouseSmallGarden(guide);
  return guide;
}

function terrace20<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/terrasse/terrasse-laerche-oder-wpc-hohlkammer-20-qm/",
      primaryIntent: "Für eine Terrasse mit 20 m² zwischen Lärchendielen und WPC-Hohlkammerdielen entscheiden und Material, Unterkonstruktion und Lieferlängen konkret planen.",
      distinctValue: "Die Seite rechnet eine 5 × 4 Meter große Fläche mit Reihen, Laufmetern, Stoßstücken und Lagerhölzern durch und zeigt, an welchen Systemdetails sich Lärche und WPC-Hohlkammer auf genau dieser Größe unterscheiden.",
      overlapReview: [
        "/ratgeber/terrassendielen-wpc-oder-holz/",
        "/ratgeber/wpc-vollprofil-oder-hohlkammer/",
        "/garten/terrassen-dielen-rechner/",
      ],
    },
    title: "Terrasse mit 20 m²: Lärche oder WPC-Hohlkammer",
    heading: "Terrasse mit 20 m²: Lärche oder WPC-Hohlkammerdielen",
    description: "Lärche oder WPC-Hohlkammer für 20 m² Terrasse: Rechenbeispiel 5 × 4 m mit Dielen, Laufmetern, Unterkonstruktion, Pflege und Systemgrenzen.",
    intro: "Auf 20 m² fällt jeder Randzuschnitt und jede unpassende Lieferlänge sofort ins Gewicht. Lärche und WPC-Hohlkammerdielen verhalten sich bei Feuchte, Wärme, Befestigung und Reparatur unterschiedlich. Die Seite zeigt, welche Fragen du für deine Fläche beantworten solltest, und rechnet ein Beispiel mit 5 × 4 Metern nachvollziehbar durch.",
    takeaway: "Lärche passt, wenn du eine natürliche Holzoberfläche willst, Vergrauung akzeptierst und Dielen einzeln mit üblichem Werkzeug ersetzen möchtest. WPC-Hohlkammer passt, wenn dir eine gleichmäßige, splitterarme Oberfläche wichtig ist und du dich konsequent an ein Herstellersystem mit Clips, Fugen, Endkappen und Unterkonstruktion hältst.",
    sections: [
      { title: "Was 20 m² für die Planung bedeuten", paragraphs: [
        "Zwanzig Quadratmeter klingen nach einer einfachen Bestellmenge, doch die Form entscheidet über Zuschnitt und Stoßbild. Eine Fläche mit 5 × 4 Metern verhält sich anders als 6,7 × 3 Meter oder eine L-Form um eine Hausecke. Miss deshalb beide Seitenlängen an mehreren Stellen und notiere Türschwellen, Fallrohre, Stufen und Lichtschächte.",
        "Lege früh fest, in welche Richtung die Dielen laufen. Davon hängt ab, wie viele Reihen entstehen, ob eine Lieferlänge ohne Stoß reicht und in welche Richtung die Lagerhölzer liegen. Auf einer kleinen Fläche kann eine passende Laufrichtung mehr Verschnitt sparen als ein günstigerer Quadratmeterpreis.",
      ] },
      { title: "Lärche als heimisches Nadelholz", paragraphs: [
        "Lärche ist harzreich und wird für Terrassen häufig eingesetzt. Widerstandsfähig ist vor allem das Kernholz. Splintholz ist deutlich anfälliger. Frag deshalb beim Händler nach Sortierung und Splintanteil, statt allein auf die Holzart im Produktnamen zu vertrauen. Ohne Anstrich vergraut die Oberfläche mit der Zeit, das ist ein optischer Prozess und kein Mangel.",
        "Holz arbeitet bei wechselnder Feuchte. Risse, Verformung und einzelne Splitter gehören zum Material und lassen sich durch gute Belüftung, Abstand zum Boden und geschützte Hirnholzenden begrenzen. Wegen der Inhaltsstoffe der Lärche sind Edelstahlschrauben üblich, weil andere Metalle dunkle Verfärbungen verursachen können. Vorbohren und Schraubenbild richten sich nach der Anleitung des Händlers.",
      ] },
      { title: "WPC-Hohlkammer als Systemlösung", paragraphs: [
        "WPC besteht aus Holzfasern und Kunststoff. Hohlkammerprofile sind leichter als Vollprofile, weil im Querschnitt Luftkammern liegen. Das erleichtert Transport und Verlegung, macht die Diele aber empfindlicher für Punktlasten und für Wasser, das in offene Kammern gelangt. Endkappen oder Abschlussprofile gehören deshalb zum System und nicht zum optionalen Zubehör.",
        "WPC dehnt sich bei Wärme in der Länge aus. Fugenbreite, Abstand zu Wänden und die Art der Clips legt der Hersteller fest. Dunkle Oberflächen können sich in praller Sonne stark erwärmen. Prüfe vor dem Kauf die Hinweise zu Temperatur, Barfußnutzung und Reinigung beim konkreten Produkt, statt allgemeine Aussagen über WPC zu übernehmen.",
      ] },
      { title: "Die Unterkonstruktion entscheidet mit", paragraphs: [
        "Bei beiden Materialien trägt die Unterkonstruktion den Belag und sorgt für Belüftung und Wasserablauf. Der zulässige Abstand der Lagerhölzer hängt von Dielenquerschnitt, Material und System ab und ist laut Herstellervorgabe zu prüfen. Ein Hohlkammerset im Handel nennt zum Beispiel einen maximalen Unterkonstruktionsabstand von 45 cm. Andere Produkte können engere Abstände verlangen.",
        "Lärche wird häufig auf Holz- oder Aluminiumunterkonstruktion verlegt. WPC-Hohlkammer sollte auf der Unterkonstruktion liegen, die das System vorsieht, weil Clips, Auflagebreite und Ausdehnung darauf abgestimmt sind. Stoßstellen brauchen meist eine doppelte Auflage. Ein Gefälle vom Haus weg und ein durchlässiger Untergrund gehören zu jeder Variante.",
      ] },
      { title: "Lieferlängen und Stoßbild auf 5 × 4 Metern", paragraphs: [
        "Laufen die Dielen parallel zur 5-Meter-Seite, ist eine Lieferlänge von 5 Metern ideal, falls dein System sie anbietet. Dann entfallen Stöße in der Fläche. Mit 4 Meter langen Dielen braucht jede Reihe ein Ergänzungsstück von 1 Meter. Diese Stücke sollten versetzt liegen, damit keine durchgehende Stoßlinie entsteht.",
        "Aus einer 4-Meter-Diele lassen sich rechnerisch vier Stücke von 1 Meter schneiden. Weil Kappschnitte, gerade Enden und bei Lärche das Kürzen beschädigter Hirnholzenden Material kosten, rechnet das Beispiel unten vorsichtig mit drei Stücken je Diele. Bei WPC bestimmen außerdem die Längsfugen an den Stößen, wie viel du kürzen musst.",
      ] },
      { title: "Pflege über die Jahre", paragraphs: [
        "Lärche kann unbehandelt vergrauen oder regelmäßig geölt werden, wenn du den ursprünglichen Farbton erhalten willst. Beides ist möglich, nur der Aufwand unterscheidet sich. Kontrolliere Schrauben, aufstehende Fasern und Stellen, an denen Laub liegen bleibt. Einzelne beschädigte Dielen lassen sich mit üblichem Holzwerkzeug ersetzen.",
        "WPC braucht keinen Holzschutzanstrich, ist aber nicht pflegefrei. Reinigung nach Herstellerangabe, Kontrolle der Endkappen und freie Fugen bleiben Aufgaben. Ersatzdielen sollten aus derselben Serie stammen, weil Profil und Farbe sonst nicht passen. Frag vor dem Kauf, wie lange das System voraussichtlich erhältlich bleibt.",
      ] },
      { title: "Kosten vollständig vergleichen", paragraphs: [
        "Ein Quadratmeterpreis für Dielen sagt wenig über die fertige Terrasse. Zu einem vollständigen Vergleich gehören Dielen, Unterkonstruktion, Clips oder Schrauben, Endkappen, Abschlussprofile, Unterbau mit Kies oder Stellfüßen, Lieferung und gegebenenfalls Montage. Bei WPC sind Systemteile oft nur vom selben Anbieter erhältlich.",
        "Rechne beide Varianten mit derselben Fläche, derselben Laufrichtung und derselben Lieferlänge, sofern verfügbar. Aktuelle Preise musst du aus echten Angeboten übernehmen. Diese Seite nennt bewusst keine Marktpreise, weil Sortierung, Profil und Lieferumfang die Summe stark verändern.",
      ] },
      { title: "So triffst du die Entscheidung", paragraphs: [
        "Wähle Lärche, wenn dir Holzoptik, Reparierbarkeit einzelner Dielen und die Freiheit bei der Unterkonstruktion wichtig sind und du mit Vergrauung, Rissen und gelegentlicher Kontrolle leben kannst. Wähle WPC-Hohlkammer, wenn eine gleichmäßige, splitterarme Oberfläche Vorrang hat und du bereit bist, das gesamte System nach Anleitung zu kaufen und zu verlegen.",
        "Unsicher bist du bei schweren Pflanzkübeln, starker Sonne auf dunklen Dielen oder einem feuchten Standort ohne gute Belüftung. Kläre diese Punkte mit den Herstellerunterlagen, bevor du bestellst. Die Materialwahl allein ersetzt weder einen sauberen Unterbau noch eine passende Entwässerung.",
      ] },
    ],
    comparison: { caption: "Lärche und WPC-Hohlkammer auf einer Terrasse mit 20 m²", columns: ["Prüfpunkt", "Lärche", "WPC-Hohlkammer"], rows: [
      ["Oberfläche", "Natürliche Holzoptik, vergraut ohne Anstrich", "Gleichmäßige Optik, Farbveränderung je Produkt"],
      ["Splitter und Risse", "Möglich, Kontrolle und Nacharbeit einplanen", "Splitterarm, Kanten und Endkappen prüfen"],
      ["Unterkonstruktion", "Holz oder Aluminium, Abstand laut Vorgabe", "System-Unterkonstruktion, Abstand laut Herstellervorgabe"],
      ["Befestigung", "Edelstahlschrauben, Vorbohren nach Anleitung", "Systemclips mit vorgegebener Fuge"],
      ["Wärme und Ausdehnung", "Quellen und Schwinden durch Feuchte", "Längenausdehnung durch Temperatur, Wandabstand halten"],
      ["Reparatur", "Einzelne Dielen mit Holzwerkzeug ersetzbar", "Ersatz nur aus derselben Serie sinnvoll"],
    ] },
    checklist: [
      "Beide Seitenlängen an mehreren Stellen messen und Hindernisse einzeichnen.",
      "Laufrichtung der Dielen festlegen und Reihenzahl berechnen.",
      "Verfügbare Lieferlängen beider Varianten erfragen.",
      "Maximalen Abstand der Unterkonstruktion laut Herstellervorgabe übernehmen.",
      "Stoßstellen mit doppelter Auflage und versetztem Stoßbild planen.",
      "Bei Lärche Sortierung, Splintanteil und Edelstahlschrauben klären.",
      "Bei WPC Endkappen, Clips, Fugenmaß und Wandabstand im System prüfen.",
      "Gefälle, Entwässerung und Belüftung unter der Terrasse sicherstellen.",
      "Vollständige Angebote mit Datum und Lieferumfang vergleichen.",
    ],
    faqs: [
      { question: "Wie viele Laufmeter Dielen brauche ich für 20 m²?", answer: "Das hängt von Dielenbreite, Fuge, Laufrichtung und Lieferlänge ab. Im Beispiel mit 5 × 4 Metern, 145 mm breiten Dielen und 5 mm Fuge entstehen 27 Reihen und 135 Laufmeter reine Belagsfläche. Mit 4-Meter-Dielen und Stoßstücken werden daraus 144 Laufmeter. Der Terrassendielen-Rechner prüft deine eigenen Werte." },
      { question: "Darf ich WPC-Hohlkammer auf eine normale Holzunterkonstruktion legen?", answer: "Nur wenn der Hersteller das ausdrücklich erlaubt. Auflagebreite, Clips und Ausdehnung sind bei WPC-Systemen aufeinander abgestimmt. Abweichungen können die Gewährleistung und die Haltbarkeit der Terrasse betreffen." },
      { question: "Ist Lärche ohne Anstrich haltbar genug?", answer: "Das Kernholz der Lärche wird oft unbehandelt verlegt. Entscheidend sind konstruktiver Holzschutz, Belüftung, Abstand zum Boden und ein geringer Splintanteil. Ein Anstrich verändert vor allem die Farbe und muss regelmäßig erneuert werden." },
      { question: "Wie groß darf der Abstand der Unterkonstruktion sein?", answer: "Das legt der Hersteller für den konkreten Dielenquerschnitt fest. Ein Handelsbeispiel für Hohlkammerdielen nennt höchstens 45 cm, andere Systeme können weniger verlangen. Das Rechenbeispiel auf dieser Seite nutzt einen frei gewählten Wert und ist keine Freigabe." },
    ],
    example: { title: "Rechenbeispiel für eine Terrasse mit 5 × 4 Metern", intro: "Beispiel mit 145 mm breiten Dielen, 5 mm Fuge und Dielen parallel zur 5-Meter-Seite. Der Abstand der Lagerhölzer ist ein frei gewählter Rechenwert.", steps: [
      { label: "Fläche", value: "5,00 m × 4,00 m = 20 m²" },
      { label: "Breitenraster", value: "145 mm + 5 mm Fuge = 150 mm" },
      { label: "Reihen über 4,00 m", value: "4.000 mm ÷ 150 mm = 26,7, also 27 Reihen" },
      { label: "Reine Belagslänge", value: "27 Reihen × 5,00 m = 135 lfm" },
      { label: "Mit 5,00-m-Dielen", value: "27 Dielen ohne Stoß, sofern lieferbar" },
      { label: "Mit 4,00-m-Dielen", value: "27 ganze Dielen + 27 Stücke à 1,00 m aus 9 Dielen = 36 Dielen = 144 lfm" },
      { label: "Lagerhölzer bei angenommen höchstens 40 cm", value: "5.000 mm ÷ 400 mm = 12,5, also 13 Felder und 14 Lagerhölzer à 4,00 m = 56 lfm" },
      { label: "Tatsächlicher Achsabstand", value: "5.000 mm ÷ 13 = rund 38,5 cm" },
    ], result: "Die 27. Reihe bleibt mit rund 10 cm Restbreite schmal. Besser verschiebst du das Raster so, dass beide Randreihen ähnlich breit zugeschnitten werden. Doppelte Auflagen an den Stoßstellen kommen zu den 56 Laufmetern Unterkonstruktion hinzu.", note: "Dielenbreite, Fuge und Lagerholzabstand musst du durch die Werte deines Systems ersetzen. Den Abstand der Unterkonstruktion laut Herstellervorgabe prüfen." },
    limitation: "Die Rechnung ist ein Mengenbeispiel und keine Verlegeanleitung. Unterkonstruktion, Befestigung, Fugen, Gefälle und Untergrund müssen nach den Unterlagen des konkreten Herstellers und den Gegebenheiten vor Ort geplant werden.",
    sources: [
      { label: "Special Terrassendielen – regelkonformer Aufbau von Terrassen", href: "https://gdholz.de/wp-content/uploads/2024/08/Artikel_ParkettMagazin_03-24_kurz.pdf", publisher: "Gesamtverband Deutscher Holzhandel", note: "Fachverbandsbeitrag zu Unterkonstruktion, Materialeigenschaften und typischen Schadensursachen bei Terrassen." },
      { label: "Kovalex WPC-Terrassendielen Komplett-Set", href: "https://www.globus-baumarkt.de/p/kovalex-wpc-terrassendielen-kompett-set-anthrazit-mattiert-0780800534/", publisher: "Globus Baumarkt", note: "Handelsbeispiel für ein Hohlkammerprofil mit Angabe eines maximalen Unterkonstruktionsabstands von 45 cm." },
    ],
    relatedLinks: [
      { label: "Terrassendielen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Reihen, Laufmeter und Reserve mit deinen eigenen Maßen berechnen." },
      { label: "Terrassen-Unterkonstruktion", href: "/garten/terrasse-unterkonstruktion/", description: "Auflagerabstand, Stoßstellen und Wasserführung einordnen." },
      { label: "Verschnitt und Fugen", href: "/garten/terrassendielen-verschnitt-fugen/", description: "Verlegebreite, Lieferlängen und Stoßbild zusammenbringen." },
      { label: "WPC-Vollprofil oder Hohlkammer", href: "/ratgeber/wpc-vollprofil-oder-hohlkammer/", description: "Die beiden WPC-Querschnitte unabhängig von der Flächengröße vergleichen." },
      { label: "Terrassen-Kosten", href: "/garten/terrasse-kosten/", description: "Belag, Unterbau, Befestigung und Lieferung budgetieren." },
    ],
  } as T;
}

function greenhouseSmallGarden<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/gewaechshaus/gewaechshaus-blankglas-oder-sicherheitsglas-kleiner-garten/",
      primaryIntent: "Für ein Gewächshaus in einem kleinen Garten zwischen Blankglas und Einscheibensicherheitsglas entscheiden, wenn Wege, Spielfläche und Terrasse nah am Haus liegen.",
      distinctValue: "Die Seite verbindet Bruchverhalten, Kinder und Haustiere, Hagel, Lichtdurchlässigkeit und Kosten mit einer nachvollziehbaren Gewichtsrechnung für die Verglasung und zeigt, warum der geringe Abstand im kleinen Garten die Sicherheitsfrage verschärft.",
      overlapReview: [
        "/ratgeber/gewaechshaus-glas-oder-polycarbonat/",
        "/garten/gewaechshaus-groesse/",
        "/garten/gewaechshaus-fundament/",
      ],
    },
    title: "Gewächshaus im kleinen Garten: Blankglas oder ESG",
    heading: "Gewächshaus im kleinen Garten: Blankglas oder Sicherheitsglas",
    description: "Blankglas oder ESG fürs Gewächshaus im kleinen Garten: Bruchverhalten, Kinder, Hagel, Gewicht, Fundament, Licht und Kosten sachlich abwägen.",
    intro: "In einem kleinen Garten steht das Gewächshaus selten weit weg vom Alltag. Der Weg zur Mülltonne, die Terrasse oder der Rasen zum Spielen liegen oft nur ein bis zwei Meter entfernt. Ob Blankglas oder Einscheibensicherheitsglas (ESG) besser passt, hängt deshalb stark davon ab, was bei einem Glasbruch passiert und wer sich in der Nähe aufhält.",
    takeaway: "Spielen Kinder in der Nähe, laufen Haustiere am Gewächshaus entlang oder liegt es direkt an einem Weg, spricht viel für ESG. Blankglas kann passen, wenn das Haus abseits steht, niemand dagegen stoßen kann und du die klare Sicht bei einem geringeren Preis bevorzugst. Glasstärke und Rahmenfreigabe musst du beim konkreten Modell prüfen.",
    sections: [
      { title: "Warum der kleine Garten die Frage verschärft", paragraphs: [
        "In einem großen Garten kann ein Gewächshaus in einer ruhigen Ecke stehen, die selten jemand betritt. Im kleinen Garten fehlt dieser Abstand oft. Das Haus grenzt an Rasen, Terrasse, Sitzplatz oder den einzigen Weg zum Schuppen. Damit steigt die Wahrscheinlichkeit, dass ein Ball, ein Fahrrad oder ein Mensch gegen eine Scheibe kommt.",
        "Zeichne deshalb den Standort mit allen Wegen und Spielbereichen maßstäblich auf. Notiere, welche Seiten des Gewächshauses erreichbar sind und wie weit Beete, Sitzplätze und Sandkasten entfernt liegen. Diese Skizze ist für die Glasfrage wichtiger als die Grundfläche des Gewächshauses.",
      ] },
      { title: "Bruchverhalten im Vergleich", paragraphs: [
        "Blankglas ist normales, durchsichtiges Flachglas mit zwei glatten Oberflächen. Bricht es, entstehen größere Scherben mit scharfen Kanten. Sie können ins Beet, auf den Weg oder in den Innenraum fallen. Das Aufsammeln ist mühsam, und kleine Splitter bleiben leicht im Boden zurück.",
        "ESG wird durch eine Wärmebehandlung vorgespannt. Es ist dadurch widerstandsfähiger gegen Stoß und Biegung und zerfällt bei einem Bruch in viele kleine, eher stumpfe Krümel. Das verringert das Verletzungsrisiko, schließt es aber nicht aus. Auch ESG-Krümel müssen vollständig entfernt werden, bevor Kinder oder Tiere wieder in die Nähe kommen.",
      ] },
      { title: "Kinder und Haustiere", paragraphs: [
        "Kinder halten sich nicht an gedachte Abstände. Ballspiel, Fangenspielen und Fahrräder auf dem Rasen führen dazu, dass die unteren Seitenscheiben am ehesten getroffen werden. Hunde können gegen die Wand springen oder sich daran entlangdrücken, Katzen klettern auf das Dach. Genau die Flächen, die am häufigsten belastet werden, sind auch die, an denen Menschen und Tiere bei einem Bruch stehen.",
        "Wenn du Blankglas wählst, plane einen Abstand oder eine Barriere, etwa ein Beet oder einen niedrigen Zaun vor den gefährdeten Seiten. Bei ESG bleibt eine Kontrolle der Türen, Kanten und automatischen Fensteröffner wichtig, weil dort ebenfalls Verletzungen entstehen können. Glas allein macht ein Gewächshaus nicht kindersicher.",
      ] },
      { title: "Hagel und Sturm", paragraphs: [
        "ESG hält Schlägen besser stand als Blankglas gleicher Stärke. Trotzdem ist kein Gewächshausglas pauschal hagelsicher. Große Hagelkörner, herabfallende Äste oder ein umstürzender Gegenstand können auch Sicherheitsglas zerstören. Liegt dein Garten in einer Region mit häufigem Hagel, lohnt ein Blick in die Versicherungsbedingungen und auf die Ersatzteilversorgung.",
        "Bei Sturm entscheidet vor allem der Rahmen mit seiner Verankerung. Klammern, Dichtungen und Profile müssen die Scheiben sicher halten. Prüfe beim Modell, ob die Verglasung kittlos mit Federklammern oder in Profilen befestigt wird und ob der Hersteller Angaben zur Windlast macht. Eine stärkere Scheibe nützt wenig, wenn sie sich aus dem Rahmen löst.",
      ] },
      { title: "Gewicht und Fundament", paragraphs: [
        "Glas wiegt rund 2,5 kg je Quadratmeter und Millimeter Stärke. Eine 3 mm starke Scheibe bringt also etwa 7,5 kg/m² auf die Waage, eine 4 mm starke etwa 10 kg/m². Ob die Scheibe vorgespannt ist, ändert daran nichts. Das Gewicht hängt von Stärke und Glasfläche ab, nicht davon, ob du Blankglas oder ESG wählst.",
        "Das Fundament muss zu Größe, Konstruktion und Nutzung passen. Die Bayerische Landesanstalt für Weinbau und Gartenbau nennt für ungeheizte Gewächshäuser in der Regel Punktfundamente als ausreichend, beheizte brauchen gemauerte Fundamente. Viele Hersteller empfehlen zusätzlich einen Fundamentrahmen, damit der Aufbau eben und rechtwinklig gelingt. Maßgeblich ist die Montageanleitung des konkreten Modells.",
      ] },
      { title: "Lichtdurchlässigkeit und Hitze", paragraphs: [
        "Klares Blankglas und klares ESG gleicher Stärke lassen ähnlich viel Licht durch, weil die Vorspannung die Durchsicht nicht nennenswert verändert. Beide sind vollkommen durchsichtig. Das ist gut für Anzucht und Beobachtung, kann bei fehlender Schattierung und Lüftung aber zu Verbrennungen an Pflanzen führen.",
        "Wenn du diffuseres Licht möchtest, ist Klarglas mit einer genörpelten Seite oder eine Stegplatte im Dach eine Alternative. Manche Modelle kombinieren ESG-Seitenwände mit Hohlkammerplatten im Dachfenster. Prüfe beim Modell, welche Flächen mit welchem Material verglast sind, bevor du Lichtwerte vergleichst.",
      ] },
      { title: "Glasstärken und Ersatz", paragraphs: [
        "Für Blankglas im Gewächshaus werden häufig Scheiben um 4 mm genannt, ESG-Modelle im Handel gibt es zum Beispiel mit 3 mm. Welche Stärke dein Modell nutzt und welche der Rahmen zulässt, steht in den Herstellerunterlagen. Glasstärken bitte beim Modell prüfen und nicht aus einem anderen Angebot übertragen.",
        "Beim Ersatz unterscheiden sich die Varianten deutlich. Blankglas lässt sich vom Glaser zuschneiden. ESG kann nach der Vorspannung nicht mehr geschnitten oder gebohrt werden und muss im exakten Maß neu gefertigt oder als Originalteil bestellt werden. Notiere dir deshalb gleich nach dem Kauf Scheibenmaße, Stärke und Artikelnummern.",
      ] },
      { title: "Kosten ehrlich vergleichen", paragraphs: [
        "ESG kostet in der Herstellung mehr als Blankglas. Bei Gewächshäusern zeigt sich das meist als Aufpreis für dieselbe Größe. Ob dieser Unterschied für dich ins Gewicht fällt, hängt vom Gesamtprojekt ab. Fundament, Lieferung, Montage, Lüftungsfenster und Schattierung kommen bei beiden Varianten hinzu.",
        "Vergleiche zwei vollständige Angebote mit gleicher Grundfläche, gleicher Glasstärke und gleichem Rahmen. Konkrete Preise nennt diese Seite nicht, weil Modell, Händler und Lieferumfang die Summe stark verändern. Rechne eine Ersatzscheibe gedanklich mit ein, denn bei ESG ist sie meist teurer und schwieriger zu beschaffen.",
      ] },
    ],
    comparison: { caption: "Blankglas und ESG für ein Gewächshaus im kleinen Garten", columns: ["Prüfpunkt", "Blankglas", "Einscheibensicherheitsglas (ESG)"], rows: [
      ["Bruchbild", "Größere, scharfkantige Scherben", "Viele kleine, eher stumpfe Krümel"],
      ["Kinder und Haustiere", "Abstand oder Barriere vor erreichbaren Seiten planen", "Verringertes Verletzungsrisiko, Türen und Kanten trotzdem prüfen"],
      ["Hagel und Schläge", "Geringere Stoßfestigkeit", "Stoßfester, aber nicht pauschal hagelsicher"],
      ["Gewicht", "Etwa 2,5 kg je m² und mm Stärke", "Gleiches Gewicht bei gleicher Stärke"],
      ["Lichtdurchlässigkeit", "Klar und vollkommen durchsichtig", "Bei gleicher Stärke ähnlich klar"],
      ["Ersatz", "Vom Glaser zuschneidbar", "Nur im exakten Maß neu fertigen oder Originalteil"],
      ["Kosten", "In der Regel günstiger", "Meist Aufpreis, Angebot konkret vergleichen"],
    ] },
    checklist: [
      "Standort mit Wegen, Terrasse und Spielbereichen maßstäblich skizzieren.",
      "Erreichbare Seiten des Gewächshauses markieren.",
      "Glasstärke und Glasart beim Modell prüfen.",
      "Glasgewicht aus Fläche und Stärke grob überschlagen.",
      "Fundamentart und Fundamentrahmen laut Montageanleitung festlegen.",
      "Befestigung der Scheiben und Angaben zur Windlast kontrollieren.",
      "Schattierung und Dachlüftung für klare Verglasung einplanen.",
      "Scheibenmaße und Artikelnummern für den Ersatz notieren.",
    ],
    faqs: [
      { question: "Ist ESG im Gewächshaus Pflicht, wenn Kinder im Garten sind?", answer: "Eine allgemeine Pflicht für private Gewächshäuser lässt sich daraus nicht ableiten. ESG verringert aber das Verletzungsrisiko bei einem Bruch deutlich. Wenn Kinder in der Nähe spielen, ist es die vorsichtigere Wahl." },
      { question: "Ist ESG schwerer als Blankglas?", answer: "Nein. Bei gleicher Stärke wiegen beide gleich viel, etwa 2,5 kg je Quadratmeter und Millimeter. Ein Unterschied entsteht nur, wenn die Modelle unterschiedlich starke Scheiben verwenden." },
      { question: "Hält ESG Hagel aus?", answer: "ESG ist stoßfester als Blankglas, aber nicht hagelsicher. Große Hagelkörner oder Äste können auch Sicherheitsglas zerstören. Für Regionen mit häufigem Hagel kann Polycarbonat eine Alternative sein, die du im Vergleich Glas oder Polycarbonat findest." },
      { question: "Kann ich eine zerbrochene ESG-Scheibe selbst zuschneiden lassen?", answer: "Nein. ESG lässt sich nach dem Vorspannen nicht mehr schneiden. Du brauchst eine Scheibe im exakten Maß, entweder vom Hersteller oder als Anfertigung. Blankglas dagegen kann ein Glaser zuschneiden." },
    ],
    example: { title: "Glasgewicht für ein kleines Gewächshaus überschlagen", intro: "Frei gewählte Maße für ein kompaktes Haus. Die Glasfläche ist eine Annahme und muss durch die Herstellerangabe ersetzt werden.", steps: [
      { label: "Sockelmaß", value: "1,92 m × 1,92 m = rund 3,7 m²" },
      { label: "Angenommene Glasfläche", value: "14 m² für Wände, Giebel und Dach" },
      { label: "Rechenwert für Glas", value: "2,5 kg je m² und mm Stärke" },
      { label: "Bei 3 mm Stärke", value: "14 m² × 7,5 kg/m² = 105 kg" },
      { label: "Bei 4 mm Stärke", value: "14 m² × 10 kg/m² = 140 kg" },
      { label: "Abstand zum Spielbereich", value: "vor Ort messen und einzeichnen" },
    ], result: "Ob Blankglas oder ESG: Bei gleicher Stärke bleibt das Gewicht gleich. Für Fundament und Rahmen zählt die Glasstärke, für die Sicherheit im kleinen Garten das Bruchverhalten.", note: "Das Rahmengewicht kommt hinzu. Fundament und Verankerung richten sich nach der Montageanleitung des konkreten Modells." },
    limitation: "Die Einordnung ersetzt keine Sicherheitsberatung, keine statische Prüfung und keine Herstellerfreigabe. Glasart, Glasstärke, Befestigung und Fundament müssen für das konkrete Modell und den Standort geprüft werden.",
    sources: [
      { label: "Kleingewächshäuser – Größe, Fundament, Lüftung und Ausstattung", href: "https://www.lwg.bayern.de/gartenakademie/gartendokumente/infoschriften/091216/index.php", publisher: "Bayerische Landesanstalt für Weinbau und Gartenbau", note: "Behördliche Hinweise zu Blank- und Klarglas, Glasstärken, Schattierung und Fundamentarten kleiner Gewächshäuser." },
      { label: "Vitavia Gewächshaus Venus 3800 mit 3 mm ESG", href: "https://www.globus-baumarkt.de/p/vitavia-gewaechshaus-venus-3800-192-x-192-cm-3-mm-esg-0692600482/", publisher: "Globus Baumarkt", note: "Handelsbeispiel für ein kleines Gewächshaus mit 3 mm Sicherheitsglas, Hohlkammerplatte im Dachfenster und empfohlenem Fundamentrahmen." },
    ],
    relatedLinks: [
      { label: "Gewächshaus-Planer", href: "/garten/gewaechshaus-planer/", description: "Größe, Beete und Ausstattung mit deinen eigenen Werten planen." },
      { label: "Gewächshaus-Fundament", href: "/garten/gewaechshaus-fundament/", description: "Basisprofil, Gründung, Entwässerung und Verankerung." },
      { label: "Gewächshaus-Größe", href: "/garten/gewaechshaus-groesse/", description: "Beete, Wege, Tür und Nutzung in ein Innenraster übersetzen." },
      { label: "Glas oder Polycarbonat", href: "/ratgeber/gewaechshaus-glas-oder-polycarbonat/", description: "Glas mit Stegplatten nach Licht, Wärme und Bruchfestigkeit vergleichen." },
      { label: "Gewächshaus-Belüftung", href: "/garten/gewaechshaus-belueftung/", description: "Dachfenster, Querlüftung, Öffner und Schatten." },
    ],
  } as T;
}
