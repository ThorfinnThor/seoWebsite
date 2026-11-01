import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialGuide = SeoGuide & { indexingApproval?: ProgrammaticIndexApproval };

export function applyBodenbelagEditorial<T extends EditorialGuide>(guide: T): T {
  if (guide.slug === "bodenbelag-laminat-oder-klickvinyl-kinderzimmer") return childrensRoom(guide);
  if (guide.slug === "bodenbelag-fertigparkett-oder-linoleum-langfristige-nutzung") return longTermFloor(guide);
  if (guide.slug === "bodenbelag-laminat-oder-klickvinyl-fussbodenheizung") return floorHeating(guide);
  if (guide.slug === "bodenbelag-laminat-oder-klickvinyl-kueche") return kitchenFloor(guide);
  return guide;
}

function childrensRoom<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/vergleiche/bodenbelag/bodenbelag-laminat-oder-klickvinyl-kinderzimmer/",
      primaryIntent: "Laminat und Klickvinyl für ein Kinderzimmer anhand von Emissionen, Reinigung, Untergrund und Reparaturmöglichkeiten vergleichen.",
      distinctValue: "Die Seite prüft den gesamten Bodenaufbau statt nur die sichtbare Diele, erklärt die Rolle produktspezifischer Emissionsnachweise und rechnet ein transparentes Beispiel für Paketbedarf ohne Material-Ranking.",
      overlapReview: ["/ratgeber/bodenbelag-laminat-oder-vinyl/", "/haus/boden/untergrund-trittschall/"],
    },
    title: "Laminat oder Klickvinyl im Kinderzimmer",
    heading: "Laminat oder Klickvinyl im Kinderzimmer",
    description: "Laminat und Klickvinyl für Kinderzimmer vergleichen. Emissionsnachweis, Reinigung, Untergrund, Trittschall, Reparatur und Paketbedarf konkret prüfen.",
    intro: "Im Kinderzimmer liegt der Boden nah am Alltag. Spielen, verschüttete Getränke und Möbelrücken belasten ihn unterschiedlich. Eine Materialbezeichnung allein sagt wenig über Emissionen oder die Eignung des vollständigen Bodenaufbaus.",
    takeaway: "Für konkrete Produkte sollten Emissions- und Verlegeangaben nachvollziehbar sein. Reinigung, Untergrund, Trittschall und Austausch einzelner Elemente gehören ebenfalls in den Vergleich. Weder Laminat noch Klickvinyl ist allein wegen des Materials automatisch die bessere Wahl.",
    sections: [
      { title: "Das gesamte Zimmer berücksichtigen", paragraphs: [
        "Wo wird gespielt, wo steht ein schweres Möbelstück und wo kann Flüssigkeit länger unbemerkt bleiben? Eine Zimmerecke unter dem Schreibtisch wird anders belastet als der Bereich vor dem Bett. Diese Nutzung sollte vor der Produktauswahl feststehen.",
        "Der Boden besteht außerdem aus Belag, möglicher Unterlage, Übergängen und gegebenenfalls Klebstoffen oder Ausgleichsmaterial. Für die Innenraumluft zählt die Kombination der tatsächlich eingesetzten Produkte. Das Umweltbundesamt weist auf emissionsarme Alternativen und auf die Prüfung einzelner Bauprodukte hin.",
      ] },
      { title: "Emissionsangaben am konkreten Produkt prüfen", paragraphs: [
        "Ein pauschales Urteil, dass Vinyl immer stärker oder Laminat immer weniger emittiert, wäre nicht belastbar. Frage nach einer aktuellen, produktspezifischen Prüfung oder einem anerkannten Umweltzeichen. Prüfe zugleich Unterlage und weitere Verlegewerkstoffe.",
        "Das Umweltbundesamt beschreibt den Blauen Engel als Orientierung für emissionsarme Innenraumprodukte. Ein Zeichen ersetzt nicht die Montageanleitung oder die Frage, ob genau die angebotene Ausführung zertifiziert ist.",
      ] },
      { title: "Verschüttetes Wasser ist ein Nutzungsfall", paragraphs: [
        "Ein Getränk auf dem Boden lässt sich meist schnell aufnehmen. Kritischer sind Flüssigkeiten, die längere Zeit in Fugen oder an einer Kante stehen. Wie ein konkretes Laminat- oder Klickvinylsystem damit umgeht, steht in seinen Herstellerangaben.",
        "Klickverbindungen, Randfugen und Untergrund bleiben auch bei einem feuchteunempfindlichen Obermaterial wichtig. Eine als pflegeleicht beworbene Diele macht einen unebenen oder feuchten Untergrund nicht geeignet.",
      ] },
      { title: "Hören und Fühlen im Raum", paragraphs: [
        "Schritte, rollende Spielsachen und Stühle können auf harten Böden deutlich hörbar sein. Die Unterlage beeinflusst den Trittschall, muss aber mit Belag und Untergrund freigegeben sein. Eine besonders weiche Unterlage ist nicht automatisch besser.",
        "Für ein Kind, das häufig auf dem Boden sitzt, kann ein Teppich oder eine Spielmatte den unmittelbaren Komfort stärker verändern als ein kleiner Unterschied zwischen zwei harten Belägen. Solche Ergänzungen sollten bei Reinigung und Stolperstellen mitgedacht werden.",
      ] },
      { title: "Reparatur und Austausch im Alltag", paragraphs: [
        "Frage vor dem Kauf, ob einzelne Dielen ersetzt werden können und ob Ersatzpakete später verfügbar sind. Eine beschädigte Diele mitten im Raum kann bei Klicksystemen aufwendiger auszutauschen sein als eine an der Wand.",
        "Oberflächenhärte, Kratzempfindlichkeit und zulässige Reinigungsmittel unterscheiden sich innerhalb beider Materialgruppen. Ein Musterstück und die Pflegeanleitung liefern dafür mehr Anhaltspunkte als die pauschale Bezeichnung Laminat oder Vinyl.",
      ] },
      { title: "Pakete mit demselben Rechenweg vergleichen", paragraphs: [
        "Miss die Bodenfläche und notiere Nischen getrennt. Beim Kauf kommen Verschnitt und die tatsächliche Paketgröße hinzu. Ein Preis pro Quadratmeter ist nur mit der nötigen Zahl ganzer Pakete aussagekräftig.",
        "Ein Beispielzimmer von 3,60 mal 3,20 Meter hat 11,52 Quadratmeter. Mit beispielhaft acht Prozent Verschnitt werden 12,44 Quadratmeter angesetzt. Enthält ein Paket 2,22 Quadratmeter, sind sechs Pakete nötig. Diese Zahlen gelten nur als Rechenbeispiel.",
      ] },
      { title: "Die Entscheidung am Datenblatt festmachen", paragraphs: [
        "Lege zwei konkrete Produkte nebeneinander. Für beide gehören Emissionsnachweis, Verlegefreigabe, Untergrundanforderung, Unterlage, Pflege und Ersatzteilverfügbarkeit in dieselbe Liste.",
        "Wenn eine dieser Angaben fehlt, ist die Auswahl offen. Ein dekorativer Vorteil oder eine kleine Preisdifferenz sollte die fehlende Eignung für den Raum nicht überdecken.",
      ] },
    ],
    comparison: { caption: "Was im Kinderzimmer für beide Beläge belegt sein sollte", columns: ["Prüffrage", "Laminat", "Klickvinyl"], rows: [
      ["Innenraumluft", "Produktspezifischen Nachweis prüfen", "Produktspezifischen Nachweis prüfen"],
      ["Flüssigkeit an Fugen", "Herstellerangaben zur Feuchte beachten", "Klickverbindung und Untergrund beachten"],
      ["Trittschall", "Freigegebene Unterlage prüfen", "Freigegebene Unterlage prüfen"],
      ["Reparatur", "Ersatzdiele und Ausbauweg klären", "Ersatzdiele und Ausbauweg klären"],
      ["Bestellmenge", "Pakete und Verschnitt rechnen", "Pakete und Verschnitt rechnen"],
    ] },
    checklist: [
      "Spielfläche, Möbel und Stellen mit möglicher Feuchte im Raum notieren.",
      "Emissionsnachweis für das genaue Produkt und seine Ausführung prüfen.",
      "Unterlage und weitere Verlegewerkstoffe gesondert erfassen.",
      "Ebenheit und Feuchte des Untergrunds vor der Verlegung prüfen lassen.",
      "Pflegeanleitung und Austauschmöglichkeit einzelner Dielen lesen.",
      "Raumfläche, Verschnitt und ganze Pakete berechnen.",
      "Einen realen Musterabschnitt im Licht des Zimmers betrachten.",
    ],
    faqs: [
      { question: "Ist Klickvinyl grundsätzlich besser für Kinderzimmer?", answer: "Nein. Die Eignung hängt vom konkreten Produkt, seinem Emissionsnachweis, dem Untergrund und der Nutzung ab. Auch Laminat kann passen, wenn der vollständige Aufbau geeignet ist." },
      { question: "Reicht ein Umweltzeichen auf der Diele aus?", answer: "Es ist ein nützlicher Hinweis für das ausgezeichnete Produkt. Unterlage, Ausgleichsmaterial und andere Bestandteile des Bodenaufbaus müssen trotzdem separat geprüft werden." },
      { question: "Warum soll ich ganze Pakete statt Quadratmeterpreise vergleichen?", answer: "Pakete können unterschiedliche Flächen enthalten. Verschnitt und Aufrundung auf ganze Pakete verändern die tatsächliche Kaufmenge." },
    ],
    example: { title: "Paketbedarf für ein Beispielzimmer", intro: "Die Rechnung gilt für beide Materialien. Paketinhalt und Verschnitt müssen später durch echte Produktwerte ersetzt werden.", steps: [
      { label: "Zimmer", value: "3,60 m × 3,20 m = 11,52 m²" },
      { label: "Beispielhafter Verschnitt", value: "11,52 m² × 1,08 = 12,44 m²" },
      { label: "Beispielpaket", value: "2,22 m² pro Paket" },
      { label: "Ganze Pakete", value: "12,44 ÷ 2,22, aufgerundet 6" },
    ], result: "Sechs Beispielpakete decken rechnerisch 13,32 m² ab.", note: "Der Wert bewertet weder Emissionen noch Eignung des Produkts." },
    limitation: "Die Seite ersetzt keine Prüfung des konkreten Bodenaufbaus und keine Bewertung individueller gesundheitlicher Anforderungen.",
    sources: [
      { label: "Blauer Engel für Bauprodukte und Einrichtungsgegenstände", href: "https://www.umweltbundesamt.de/themen/wirtschaft-konsum/produkte/bauprodukte/blauer-engel-fuer-bauprodukte", publisher: "Umweltbundesamt", note: "Behördliche Einordnung emissionsarmer Produkte für Innenräume." },
      { label: "Informationen zu Laminat und Verlegung", href: "https://eplf.com/de/infomaterial-zu-laminat", publisher: "Verband der Europäischen Laminatbodenhersteller", note: "Technische Merkblätter zu Untergrund, Unterlagen und Verlegung." },
      { label: "Standards für modulare Bodenbeläge", href: "https://mmfa.eu/en/products/installation/standards/", publisher: "MMFA", note: "Fachverbandsübersicht zu Verlegeanforderungen mehrschichtiger Bodenbeläge." },
    ],
    relatedLinks: [
      { label: "Bodenbelag berechnen", href: "/haus/boden/bodenbelag-rechner/", description: "Raumfläche und Paketbedarf mit eigenen Werten berechnen." },
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Aufbau unter dem Belag prüfen." },
      { label: "Laminat oder Vinyl im Überblick", href: "/ratgeber/bodenbelag-laminat-oder-vinyl/", description: "Die Materialgruppen unabhängig vom Kinderzimmer einordnen." },
    ],
  } as T;
}

function longTermFloor<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/vergleiche/bodenbelag/bodenbelag-fertigparkett-oder-linoleum-langfristige-nutzung/",
      primaryIntent: "Fertigparkett und Linoleum für lange Nutzung anhand von Pflege, Renovierbarkeit, Aufbau und Lebenszykluskosten vergleichen.",
      distinctValue: "Die Seite ersetzt eine pauschale Haltbarkeitspunktzahl durch einen dokumentierbaren Nutzungsplan mit Produktausführung, Pflegeintervallen, möglicher Renovierung und offenen Kostenpositionen.",
      overlapReview: ["/haus/boden/bodenbelag-rechner/", "/ratgeber/vinyl-klick-oder-kleben/"],
    },
    title: "Fertigparkett oder Linoleum für lange Nutzung",
    heading: "Fertigparkett oder Linoleum für lange Nutzung",
    description: "Fertigparkett und Linoleum für lange Nutzung vergleichen. Nutzschicht, Verlegung, Pflege, mögliche Renovierung und Gesamtkosten transparent prüfen.",
    intro: "Wie lange ein Boden sinnvoll bleibt, hängt vom gewählten Produkt, seiner Oberfläche, der Verlegung und der Nutzung ab. Zwischen Fertigparkett und Linoleum entscheidet deshalb kein allgemeiner Haltbarkeitswert.",
    takeaway: "Vergleiche zwei konkrete Systeme über denselben Nutzungszeitraum. Bei Parkett gehören Nutzschicht und mögliche Renovierung dazu, bei Linoleum Oberflächenvergütung, Reinigung und gegebenenfalls Instandsetzung. Ohne Produktdaten bleibt ein Lebensdauervergleich offen.",
    sections: [
      { title: "Einen Zeitraum und eine Nutzung beschreiben", paragraphs: [
        "Ein Wohnraum mit Straßenschuhen und rollendem Bürostuhl nutzt sich anders ab als ein Schlafzimmer. Notiere vor dem Vergleich die tatsächliche Belastung und einen Betrachtungszeitraum, etwa 15 Jahre, als persönliche Rechenannahme.",
        "Dieser Zeitraum ist keine Lebensdauergarantie. Er hilft, Anschaffung, Pflege und mögliche Eingriffe mit denselben Fragen zu betrachten, statt die Varianten allein nach Kaufpreis zu sortieren.",
      ] },
      { title: "Fertigparkett ist nicht gleich renovierbares Parkett", paragraphs: [
        "Fertigparkett besteht aus mehreren Schichten. Wie oft eine Oberfläche bearbeitet werden kann, hängt insbesondere von der konkreten Nutzschicht, Verlegung und Herstellerfreigabe ab. Eine dünne Decklage darf nicht wie massives Parkett behandelt werden.",
        "Lass dir den Aufbau und die empfohlene Renovierung des ausgewählten Produkts schriftlich zeigen. Bauwerk nennt bei einem eigenen Zweischichtparkett eine Nutzschichtstärke und beschreibt an anderer Stelle die Möglichkeit einer Renovierung. Daraus folgt keine allgemeine Zahl möglicher Schleifgänge für beliebiges Fertigparkett.",
      ] },
      { title: "Linoleum nach Ausführung und Oberfläche bewerten", paragraphs: [
        "Linoleum gibt es als Bahnen, modulare Elemente und weitere Systeme. Die Verlegeart beeinflusst Nähte, Austausch und Aufwand einer späteren Reparatur. Der Produktname Linoleum sagt darüber allein wenig aus.",
        "Forbo beschreibt für bestimmte Marmoleum-Produkte eine werkseitige Oberflächenvergütung und eine Pflege ohne zusätzliche Einpflege. Diese Herstellerangaben gelten für die betreffenden Produkte und sollten nicht ungeprüft auf andere Systeme übertragen werden.",
      ] },
      { title: "Untergrund und Verlegung bleiben im Kostenbild", paragraphs: [
        "Ein ebener, geeigneter Untergrund ist für beide Varianten wichtig. Erforderliche Ausgleichsarbeiten, Unterlage oder Klebstoff gehören zur vollständigen Rechnung. Unterschiedliche Verlegearten lassen sich preislich nicht fair vergleichen, wenn diese Arbeiten fehlen.",
        "Prüfe auch, was ein späterer Austausch bedeuten würde. Vollflächig geklebte und schwimmend verlegte Systeme können sich bei Rückbau und Teilreparatur deutlich unterscheiden. Maßgeblich sind die Unterlagen der gewählten Produkte.",
      ] },
      { title: "Pflege als wiederkehrende Aufgabe", paragraphs: [
        "Lies die Pflegeanleitung beider konkreter Beläge. Für Parkett können Oberfläche und Behandlung den zulässigen Reinigungsweg bestimmen. Für Linoleum hängen Mittel und Eingriffe ebenfalls von der Oberflächenvergütung ab.",
        "Ein Reinigungsmittel, das bei einem Produkt geeignet ist, muss beim anderen nicht passen. Der langfristige Aufwand ergibt sich aus dem tatsächlich vorgesehenen Pflegeplan und der Alltagsnutzung, nicht aus einer pauschalen Kategorie pflegeleicht.",
      ] },
      { title: "Kosten über Jahre ohne erfundene Lebensdauer", paragraphs: [
        "Notiere für beide Angebote Material, Verlegung und Untergrundarbeiten. Ergänze nur Pflege und Renovierung, die für dein Szenario plausibel und anhand des Produkts beschreibbar sind. Unbekannte Ereignisse bleiben als offen markiert.",
        "Die Vergleichsformel lautet Gesamtkosten gleich Erstkosten plus dokumentierte Pflege plus tatsächlich angesetzte Renovierung oder Reparatur. Teile die Summe nur dann durch Jahre, wenn für beide Varianten derselbe Betrachtungszeitraum und vergleichbare Leistungen verwendet werden.",
      ] },
      { title: "Eine Entscheidung mit nachvollziehbarer Reserve", paragraphs: [
        "Parkett kann interessant sein, wenn die Holzoberfläche gewünscht ist und der gewählte Aufbau eine nachgewiesene Renovierung erlaubt. Linoleum kann überzeugen, wenn die angebotene Ausführung und ihr Pflegekonzept besser zur Nutzung passen.",
        "Ist die künftige Beanspruchung unklar, lass beide Optionen offen und fordere Produktmuster sowie technische Unterlagen an. Eine Punktwertung mit zwei Dezimalstellen würde diese Unsicherheit nur verdecken.",
      ] },
      { title: "Was bei einem einzelnen Schaden passiert", paragraphs: [
        "Ein Kratzer an der Oberfläche ist eine andere Aufgabe als ein durch Feuchte geschädigter Abschnitt. Frage bei beiden Angeboten, ob eine örtliche Reparatur vorgesehen ist oder ob Elemente ausgetauscht werden müssen.",
        "Bewahre Produktbezeichnung, Farbnummer und ein kleines Ersatzstück auf. Bei einer späteren Reparatur können Optik und Verfügbarkeit entscheidend sein. Diese praktische Reserve gehört in den Langzeitvergleich, auch wenn sie in keiner Lebensdauerangabe steht.",
      ] },
    ],
    comparison: { caption: "Langfristig relevante Angaben in zwei Produktunterlagen", columns: ["Frage", "Fertigparkett", "Linoleum"], rows: [
      ["Aufbau", "Nutzschicht und Oberflächenart", "Produkttyp und Oberflächenvergütung"],
      ["Verlegung", "Freigegebener Aufbau und Untergrund", "Freigegebener Aufbau und Untergrund"],
      ["Pflege", "Anleitung für die konkrete Holzoberfläche", "Anleitung für die konkrete Vergütung"],
      ["Instandsetzung", "Renovierbarkeit schriftlich bestätigen lassen", "Teilreparatur und Oberflächenpflege klären"],
      ["Kosten", "Erstkosten und belegte spätere Eingriffe", "Erstkosten und belegte spätere Eingriffe"],
    ] },
    checklist: [
      "Für beide Böden denselben Raum und Zeitraum festlegen.",
      "Die vollständige Produktbezeichnung und Verlegeart notieren.",
      "Bei Parkett Nutzschicht und Renovierfreigabe erfragen.",
      "Bei Linoleum Oberflächenvergütung und Pflegeanleitung prüfen.",
      "Untergrundarbeiten, Zubehör und Verlegung in beide Angebote aufnehmen.",
      "Nur belegte Pflege- und Renovierungskosten in den Vergleich setzen.",
      "Ersatzmaterial und Möglichkeiten einer Teilreparatur klären.",
    ],
    faqs: [
      { question: "Kann jedes Fertigparkett mehrfach abgeschliffen werden?", answer: "Nein. Das hängt von Nutzschicht, Oberfläche, Verlegung und Herstellerfreigabe ab. Die Aussage muss zum konkreten Produkt passen." },
      { question: "Muss Linoleum regelmäßig neu beschichtet werden?", answer: "Nicht pauschal. Für bestimmte werkseitig vergütete Produkte beschreibt der Hersteller eine Nutzung ohne zusätzliche Einpflege. Maßgeblich ist die Pflegeanleitung des ausgewählten Belags." },
      { question: "Welcher Boden hält grundsätzlich länger?", answer: "Ohne konkrete Produkte, Verlegung und Nutzungsbedingungen gibt es keine belastbare Antwort. Vergleiche Renovierbarkeit und Instandsetzungsmöglichkeiten für denselben Zeitraum." },
    ],
    example: { title: "Ein Kostenblatt für denselben Zeitraum", intro: "Statt erfundener Haltbarkeitswerte werden gleiche Rechenpositionen angelegt.", steps: [
      { label: "Raum", value: "20 m², für beide Angebote identisch" },
      { label: "Betrachtung", value: "15 Jahre als eigene Annahme" },
      { label: "Erstkosten", value: "Material, Untergrund und Verlegung je Angebot" },
      { label: "Laufende Pflege", value: "nur belegte Mittel und Arbeiten" },
      { label: "Spätere Eingriffe", value: "nur mit passender Produktfreigabe ansetzen" },
    ], result: "Für zwei vergleichbare Gesamtsummen brauchst du echte Angebote und einen dokumentierten Pflegeplan.", note: "15 Jahre sind hier ein Rechenhorizont, keine zugesagte Lebensdauer." },
    limitation: "Die Seite gibt keine Lebensdauer oder Renovierung für ein bestimmtes Produkt frei. Produktdaten, Untergrund und tatsächliche Nutzung sind entscheidend.",
    sources: [
      { label: "Parkett bei einer Renovation", href: "https://www.bauwerk-parkett.com/de/de/ratgeber/renovation", publisher: "Bauwerk Parkett", note: "Herstellerhinweise zu Aufarbeitung und Reparatur eigener Parkettprodukte." },
      { label: "Beispiel für eine dokumentierte Nutzschicht", href: "https://www.bauwerk-parkett.com/de/de/parkett/10153188", publisher: "Bauwerk Parkett", note: "Produktseite eines Zweischichtparketts mit ausgewiesener Nutzschichtstärke." },
      { label: "Fragen zur Reinigung von Linoleum", href: "https://www.forbo.com/flooring/de-ch/services/verlegeanleitungen/linoleum/faq-linoleum-reinigung/pcfiu0", publisher: "Forbo", note: "Herstellerangaben zur Pflege konkret benannter Marmoleum-Oberflächen." },
      { label: "Blauer Engel für Bauprodukte", href: "https://www.umweltbundesamt.de/themen/wirtschaft-konsum/produkte/bauprodukte/blauer-engel-fuer-bauprodukte", publisher: "Umweltbundesamt", note: "Einordnung emissionsarmer Bodenprodukte als zusätzlicher Auswahlpunkt." },
    ],
    relatedLinks: [
      { label: "Bodenbelag berechnen", href: "/haus/boden/bodenbelag-rechner/", description: "Fläche und Materialbedarf mit eigenen Maßen bestimmen." },
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Den Aufbau unter beiden Belägen prüfen." },
      { label: "Bodenbelag für Wohnräume", href: "/ratgeber/bodenbelag-laminat-oder-vinyl/", description: "Weitere Materialfragen für die Raumnutzung einordnen." },
    ],
  } as T;
}

function floorHeating<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-10-23",
      canonicalPath: "/ratgeber/vergleiche/bodenbelag/bodenbelag-laminat-oder-klickvinyl-fussbodenheizung/",
      primaryIntent: "Laminat und Klickvinyl auf einer Fußbodenheizung anhand von Wärmedurchlasswiderstand, Heizsystemfreigabe, Oberflächentemperatur, Unterlage und Estrichvorbereitung vergleichen.",
      distinctValue: "Die Seite stellt beide Beläge mit derselben Prüfreihenfolge gegenüber, rechnet den Wärmedurchlasswiderstand aus Belag und Unterlage mit gekennzeichneten Beispielwerten nach und trennt Freigaben für Warmwasser- und elektrische Heizung, statt nur ein einzelnes Material zu beschreiben.",
      overlapReview: ["/ratgeber/laminat-auf-fussbodenheizung/", "/ratgeber/daten/bodenbelaege-fussbodenheizung-feuchtraum/", "/ratgeber/bodenbelag-laminat-oder-vinyl/"],
    },
    title: "Laminat oder Vinyl auf Fußbodenheizung? Eignung prüfen",
    heading: "Laminat oder Klickvinyl auf Fußbodenheizung",
    description: "Ist Laminat oder Klickvinyl für Fußbodenheizung geeignet? Wärmewiderstand von Belag und Unterlage addieren, Freigabe, Oberflächentemperatur und Estrich prüfen.",
    intro: "Auf einer Fußbodenheizung muss der Boden Wärme nach oben durchlassen und zugleich Temperaturwechsel vertragen. Ob Laminat oder Klickvinyl besser passt, entscheidet deshalb nicht die Materialgruppe, sondern der freigegebene Aufbau aus Belag, Unterlage und Estrich.",
    takeaway: "Addiere die Wärmedurchlasswiderstände von Belag und Unterlage aus den Datenblättern und gleiche die Summe mit der Heizungsplanung ab. Prüfe außerdem, ob das Produkt für dein Heizsystem freigegeben ist, welche Oberflächentemperatur gilt und ob der Estrich belegreif ist. Erst dann lohnt sich der Vergleich von Optik und Preis.",
    sections: [
      { title: "Den Aufbau statt der Diele vergleichen", paragraphs: [
        "Zwischen Heizrohr und Raumluft liegen Estrich, gegebenenfalls eine Folie, die Trittschallunterlage und der Belag. Jede Schicht bremst den Wärmestrom ein wenig. Eine Diele, die allein gut abschneidet, kann mit einer ungeeigneten Unterlage trotzdem einen zu trägen Aufbau ergeben.",
        "Lege deshalb für Laminat und Klickvinyl je einen vollständigen Aufbau fest: genaue Produktbezeichnung, Unterlage, Folie und Verlegeart. Nur diese Kombinationen lassen sich sinnvoll vergleichen. Eine Aussage wie für Fußbodenheizung geeignet auf der Verpackung reicht als Grundlage nicht aus.",
      ] },
      { title: "Wärmedurchlasswiderstand: Belag und Unterlage addieren", paragraphs: [
        "Der Wärmedurchlasswiderstand R wird in m²K/W angegeben. Je kleiner der Wert, desto leichter kommt die Wärme durch. Für den Bodenaufbau werden die R-Werte der übereinanderliegenden Schichten addiert, also mindestens Belag und Trittschallunterlage, bei Bedarf auch eine separate Dampfbremse.",
        "Häufig wird für Bodenbelag einschließlich Unterlage eine Obergrenze von 0,15 m²K/W genannt. Dieser Wert geht auf die Auslegung von Warmwasser-Fußbodenheizungen nach DIN EN 1264 zurück. Welcher Wert für deine Anlage gilt, hängt von der Heizungsplanung ab. Maßgeblich sind die Herstellerdaten von Belag und Unterlage und die Auslegung deines Heizungsplaners.",
      ] },
      { title: "Was Laminat und Klickvinyl dabei unterscheidet", paragraphs: [
        "Laminat hat einen Träger aus Holzwerkstoff und ist meist dicker als viele Klickvinylprodukte. Das führt oft zu einem etwas höheren R-Wert der Diele, ist aber keine feste Regel. Entscheidend sind die Werte im Datenblatt des konkreten Produkts, nicht die Materialbezeichnung.",
        "Klickvinyl ist thermoplastisch und kann auf Wärme mit Längenänderung reagieren. Ausführungen mit mineralischem oder starrem Kern verhalten sich anders als flexible Varianten. Für beide Materialgruppen beschreiben die Hersteller, welche Temperaturen, Flächengrößen und Unterlagen zulässig sind.",
      ] },
      { title: "Warmwasser oder elektrisch: Die Freigabe unterscheidet", paragraphs: [
        "Viele Verlegeanleitungen beziehen sich ausdrücklich auf Warmwasser-Fußbodenheizungen im Estrich. Für elektrische Heizsysteme, etwa dünne Heizmatten oder Heizfolien direkt unter dem Belag, gelten oft gesonderte Bedingungen oder es fehlt eine Freigabe. Elektrische Systeme können lokal höhere Temperaturen erzeugen.",
        "Frage beim Hersteller nach, ob der Belag für dein konkretes Heizsystem freigegeben ist, und lass dir das schriftlich bestätigen. Das gilt auch für die Unterlage. Prüfe außerdem, ob die Anlage kühlen kann. Für Kühlung über den Boden machen manche Hersteller zusätzliche Vorgaben oder schließen sie aus.",
      ] },
      { title: "Maximale Oberflächentemperatur einhalten", paragraphs: [
        "Hersteller nennen für ihre Beläge eine höchstzulässige Oberflächentemperatur. Häufig liegt der genannte Wert um 27 °C, er kann aber abweichen. Diese Temperatur gilt an der Oberseite des Bodens, nicht als Vorlauftemperatur der Heizung, und sollte auch unter Teppichen oder Möbeln nicht überschritten werden.",
        "Wenn Laminat und Klickvinyl unterschiedliche Grenzwerte haben, gilt für deine Entscheidung der jeweils niedrigere als Planungsrahmen. Kläre mit dem Heizungsbauer, ob Vorlauftemperatur und Regelung diese Grenze sicher einhalten. Schnelle, große Temperatursprünge können bei beiden Belägen Fugen und Spannungen begünstigen.",
      ] },
      { title: "Die passende Unterlage wählen", paragraphs: [
        "Die Unterlage soll Trittschall dämpfen und kleine Unebenheiten aufnehmen, darf die Wärme aber nicht stark bremsen. Dicke, weiche Dämmunterlagen haben oft einen höheren R-Wert. Für Fußbodenheizung bieten Hersteller eigene Unterlagen mit niedrigem Wärmedurchlasswiderstand an.",
        "Bei Klickvinyl ist die Unterlage oft bereits auf der Diele kaschiert. Eine zusätzliche Schicht kann dann den Widerstand erhöhen und die Klickverbindung überlasten. Auf mineralischem Estrich verlangen viele Anleitungen eine Dampfbremse. Ob sie separat verlegt wird oder in der Unterlage enthalten ist, steht in der Herstellerangabe.",
      ] },
      { title: "Estrich: Aufheizprotokoll und CM-Messung", paragraphs: [
        "Ein neuer Heizestrich muss vor dem Verlegen nach Plan aufgeheizt und wieder abgekühlt werden. Dieser Ablauf wird in einem Aufheizprotokoll festgehalten. Das Protokoll ersetzt keine Feuchtemessung, es dokumentiert nur, dass die Heizung den Estrich kontrolliert getrocknet hat.",
        "Die Restfeuchte wird üblicherweise mit der CM-Methode an vorbereiteten Messstellen bestimmt, damit die Heizrohre nicht beschädigt werden. Für beheizten Zementestrich wird häufig 1,8 CM-% genannt, für Calciumsulfatestrich 0,3 CM-%. Welche Werte für dein Produkt gelten, regeln Hersteller und Fachleute für den konkreten Estrich.",
      ] },
      { title: "Dehnfugen, Randfugen und Heizkreise", paragraphs: [
        "Beide Beläge brauchen eine Randfuge zu Wänden, Rohren und Türzargen, damit sie sich bei Temperaturwechsel bewegen können. Die nötige Breite und die maximale Fläche ohne Bewegungsfuge stehen in der Verlegeanleitung. Bei Klickvinyl können die Grenzen wegen der Wärmeausdehnung anders ausfallen als bei Laminat.",
        "Bewegungsfugen im Estrich, etwa zwischen getrennten Heizkreisen oder an Türdurchgängen, sollten im Belag übernommen werden. Ein schwimmend verlegter Boden darf außerdem nicht durch schwere Einbauten wie eine Küchenzeile festgeklemmt werden. Plane Übergangsprofile deshalb schon bei der Materialbestellung mit.",
      ] },
      { title: "Die Entscheidung am Datenblatt festmachen", paragraphs: [
        "Lege die Datenblätter beider Kandidaten nebeneinander und trage für jede Variante dieselben Punkte ein: R-Wert von Belag und Unterlage, Summe, Freigabe für dein Heizsystem, maximale Oberflächentemperatur, zulässige Feldgröße und Anforderungen an den Estrich.",
        "Fehlt eine dieser Angaben, ist die Variante noch nicht entscheidungsreif. Erst wenn beide Aufbauten die technischen Bedingungen erfüllen, sind Optik, Oberfläche, Geräusch beim Begehen und Preis die passenden Unterscheidungsmerkmale.",
      ] },
    ],
    comparison: { caption: "Was auf Fußbodenheizung für beide Beläge belegt sein sollte", columns: ["Prüffrage", "Laminat", "Klickvinyl"], rows: [
      ["Wärmedurchlasswiderstand", "R-Wert von Diele und Unterlage addieren", "R-Wert von Diele und gegebenenfalls kaschierter Unterlage addieren"],
      ["Heizsystem", "Freigabe für Warmwasser oder elektrisch prüfen", "Freigabe für Warmwasser oder elektrisch prüfen"],
      ["Oberflächentemperatur", "Höchstwert laut Hersteller einhalten", "Höchstwert laut Hersteller einhalten, Wärmeausdehnung beachten"],
      ["Unterlage", "Für Fußbodenheizung freigegebene Unterlage und Dampfbremse", "Zusätzliche Unterlage nur, wenn ausdrücklich erlaubt"],
      ["Estrich", "Aufheizprotokoll und CM-Messung vorlegen lassen", "Aufheizprotokoll und CM-Messung vorlegen lassen"],
      ["Fugen", "Randfuge und Feldgrößen nach Anleitung", "Randfuge und Feldgrößen nach Anleitung, oft temperaturabhängig"],
    ] },
    checklist: [
      "Heizsystem bestimmen: Warmwasser im Estrich oder elektrische Heizung, mit oder ohne Kühlfunktion.",
      "Für beide Kandidaten die R-Werte von Belag und Unterlage aus dem Datenblatt notieren und addieren.",
      "Die Summe mit der Heizungsplanung und dem häufig genannten Rahmen von 0,15 m²K/W abgleichen.",
      "Schriftliche Freigabe des Herstellers für das konkrete Heizsystem einholen.",
      "Maximale Oberflächentemperatur mit Vorlauftemperatur und Regelung abstimmen.",
      "Aufheizprotokoll und CM-Messung des Estrichs vor der Verlegung prüfen.",
      "Bewegungsfugen des Estrichs, Randfugen und maximale Feldgrößen in den Verlegeplan übernehmen.",
    ],
    faqs: [
      { question: "Ist Klickvinyl auf Fußbodenheizung immer besser als Laminat?", answer: "Nein. Klickvinyl ist oft dünner und hat dann einen niedrigeren R-Wert, reagiert aber stärker auf Temperatur. Laminat kann ebenso passen, wenn der gesamte Aufbau freigegeben ist und die Summe der Widerstände zur Heizungsplanung passt." },
      { question: "Gilt der Grenzwert von 0,15 m²K/W nur für den Belag?", answer: "Der Wert wird üblicherweise für Bodenbelag einschließlich Unterlage genannt. Rechne deshalb beide Schichten zusammen und frage bei deiner Heizungsplanung nach, welcher Wert für deine Anlage angesetzt wurde." },
      { question: "Darf ich Laminat oder Klickvinyl auf eine elektrische Fußbodenheizung legen?", answer: "Nur, wenn Hersteller von Belag und Heizsystem diese Kombination ausdrücklich freigeben. Viele Freigaben beziehen sich auf Warmwasser-Fußbodenheizungen im Estrich." },
      { question: "Reicht das Aufheizprotokoll als Nachweis der Belegreife?", answer: "Nein. Es dokumentiert den Heizvorgang. Die Restfeuchte sollte zusätzlich gemessen werden, üblicherweise mit der CM-Methode an vorgesehenen Messstellen." },
    ],
    example: { title: "Wärmedurchlasswiderstand zweier Aufbauten addieren", intro: "Alle Zahlen sind Beispielwerte, Datenblatt prüfen. Sie zeigen nur den Rechenweg und gehören keinem bestimmten Produkt.", steps: [
      { label: "Laminat, Beispielwert", value: "Diele 0,055 m²K/W + Unterlage 0,045 m²K/W = 0,100 m²K/W" },
      { label: "Klickvinyl, Beispielwert", value: "Diele mit kaschierter Unterlage 0,035 m²K/W + Dampfbremse 0,005 m²K/W = 0,040 m²K/W" },
      { label: "Abgleich mit häufig genanntem Rahmen", value: "0,100 und 0,040 liegen unter 0,15 m²K/W" },
      { label: "Gegenprobe: zweite Unterlage beim Laminat", value: "0,100 m²K/W + 0,045 m²K/W = 0,145 m²K/W, kaum noch Reserve" },
      { label: "Gegenprobe: dicke Dämmunterlage", value: "0,055 m²K/W + 0,100 m²K/W = 0,155 m²K/W, über 0,15 m²K/W" },
    ], result: "Mit diesen Beispielwerten liegen beide Grundaufbauten im Rahmen, die Wahl der Unterlage kann den Laminataufbau aber über die Grenze schieben.", note: "Beispielwerte, Datenblatt prüfen. Der für deine Anlage zulässige Wert ergibt sich aus Heizungsplanung und Herstellerangaben." },
    limitation: "Die Seite ersetzt keine Heizungsplanung, keine Freigabe durch den Hersteller und keine Prüfung des Estrichs durch Fachleute. Grenzwerte und Messverfahren für den konkreten Aufbau legen Hersteller und Fachbetrieb fest.",
    sources: [
      { label: "Informationen zu Laminat und Verlegung", href: "https://eplf.com/de/infomaterial-zu-laminat", publisher: "Verband der Europäischen Laminatbodenhersteller", note: "Technische Merkblätter zu Unterlagen, Untergrund und Laminat auf Fußbodenheizung." },
      { label: "Standards für modulare Bodenbeläge", href: "https://mmfa.eu/en/products/installation/standards/", publisher: "MMFA", note: "Normen- und Merkblattübersicht für mehrschichtige modulare Bodenbeläge und Fußbodenheizung." },
    ],
    relatedLinks: [
      { label: "Laminat auf Fußbodenheizung", href: "/ratgeber/laminat-auf-fussbodenheizung/", description: "Aufbau und Materialbedarf speziell für Laminat planen." },
      { label: "Freigaben in Produktdaten", href: "/ratgeber/daten/bodenbelaege-fussbodenheizung-feuchtraum/", description: "Wie oft Bodenbeläge für Fußbodenheizung dokumentiert sind." },
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Estrich, Feuchte und Unterlage vor der Verlegung prüfen." },
      { label: "Bodenbelag berechnen", href: "/haus/boden/bodenbelag-rechner/", description: "Fläche, Verschnitt und Paketbedarf mit eigenen Werten bestimmen." },
    ],
  } as T;
}

function kitchenFloor<T extends EditorialGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-11-01",
      canonicalPath: "/ratgeber/vergleiche/bodenbelag/bodenbelag-laminat-oder-klickvinyl-kueche/",
      primaryIntent: "Laminat und Klickvinyl für die Küche anhand von Wasser an Fugen und Kanten, Herstellerangaben zu Feuchte und Nutzungsklasse, Küchenzeile, Belastung, Reinigung und Übergängen vergleichen.",
      distinctValue: "Die Seite legt beide Beläge an dieselben Küchenstellen wie Spüle, Spülmaschine und Sockelblende, trennt Datenblattangaben von Werbeaussagen und rechnet die Bestellmenge mit und ohne Fläche unter der Küchenzeile mit gekennzeichneten Beispielwerten nach.",
      overlapReview: ["/ratgeber/bodenbelag-fuer-kueche/", "/ratgeber/bodenbelag-laminat-oder-vinyl/", "/ratgeber/vinyl-klick-oder-kleben/"],
    },
    title: "Laminat oder Vinyl in der Küche?",
    heading: "Laminat oder Klickvinyl in der Küche",
    description: "Laminat oder Vinyl in der Küche? Wasser an Fugen, Datenblatt, Küchenzeile, Stuhlrollen, Reinigung und Übergänge prüfen und Pakete richtig berechnen.",
    intro: "In der Küche wird der Boden nass gewischt, bekommt Spritzer an der Spüle ab und muss fallende Töpfe, Stühle und eine schwere Küchenzeile aushalten. Ob Laminat oder Klickvinyl besser passt, hängt deshalb weniger von der Materialgruppe ab als vom konkreten Produkt und davon, wie es verlegt wird.",
    takeaway: "Vergleiche zwei konkrete Produkte mit ihren Datenblättern. Entscheidend sind die Angaben zu Feuchte an Fugen und Kanten, die Nutzungsklasse, die Freigabe für die Küche und die Frage, ob die Küchenzeile auf oder vor dem Boden steht. Optik und Preis sind sinnvolle Unterscheidungsmerkmale, sobald beide Aufbauten diese Punkte erfüllen.",
    sections: [
      { title: "Wo in der Küche Wasser tatsächlich hinkommt", paragraphs: [
        "Kritisch ist selten der kurze Spritzer, der sofort aufgewischt wird. Problematischer sind Stellen, an denen Wasser länger steht oder unbemerkt bleibt, etwa vor der Spüle, unter dem Geschirrspüler, am Kühlschrank mit Wasseranschluss oder hinter der Sockelblende. Notiere diese Zonen in einer einfachen Skizze, bevor du Produkte vergleichst.",
        "Bei beiden Belägen sind Fugen, Schnittkanten und Randbereiche die empfindlichen Stellen. Wasser, das durch eine Klickverbindung nach unten läuft, erreicht Unterlage und Untergrund und kann dort länger bleiben als auf der Oberfläche. Ein Leck am Spülmaschinenanschluss ist deshalb ein eigener Planungsfall und kein normaler Reinigungsfall.",
      ] },
      { title: "Herstellerangaben zu Feuchte laut Datenblatt prüfen", paragraphs: [
        "Laminat besteht meist aus einer Trägerplatte aus Holzwerkstoff, die auf Feuchte empfindlich reagieren kann. Es gibt Produkte, für die Hersteller eine erhöhte Feuchtebeständigkeit oder eine Eignung für Küchen angeben. Klickvinyl ist an der Oberfläche meist wasserunempfindlicher, doch auch hier unterscheiden sich Kernmaterial und Klickverbindung zwischen den Produkten.",
        "Manche Hersteller werben mit einer Wasserresistenz oder einer zeitlich begrenzten Garantie gegen stehendes Wasser. Lies laut Datenblatt und Garantiebedingungen nach, was genau abgedeckt ist, wie lange Wasser stehen darf und ob die Zusage nur bei einer bestimmten Verlegung oder Fugenabdichtung gilt. Eine Aussage auf der Verpackung ersetzt diese Bedingungen nicht.",
      ] },
      { title: "Nutzungsklasse und Oberfläche für den Küchenalltag", paragraphs: [
        "Die Nutzungsklasse beschreibt, für welche Beanspruchung ein Belag laut Hersteller vorgesehen ist. Eine Küche im Wohnbereich wird oft stärker begangen als ein Schlafzimmer, weil viele Wege an Herd, Spüle und Kühlschrank vorbeiführen. Vergleiche deshalb die angegebene Klasse beider Produkte für denselben Raum und nicht nur den Preis pro Quadratmeter.",
        "Fallende Gegenstände wie ein Topf oder ein Messer belasten die Oberfläche punktuell. Wie empfindlich ein Produkt auf Stöße, Kratzer oder Druckstellen reagiert, steht nur teilweise im Datenblatt. Ein Musterstück, das du in der Küche ausprobierst, zeigt Glanzgrad, Rutschgefühl und Kratzbild deutlich besser als ein Foto.",
      ] },
      { title: "Küchenzeile auf oder vor dem Boden verlegen", paragraphs: [
        "Laminat und viele Klickvinylprodukte werden schwimmend verlegt. Ein schwimmender Boden muss sich bewegen können und darf deshalb nicht durch schwere Einbauten festgeklemmt werden. Eine Küchenzeile mit Arbeitsplatte, Geräten und gefüllten Schränken wirkt wie eine Last, die genau diese Bewegung verhindern kann.",
        "Viele Verlegeanleitungen sehen deshalb vor, die Küchenzeile auf den Rohboden zu stellen und den Belag bis vor die Schränke zu verlegen. Die Sockelblende deckt den Übergang ab, während dahinter eine Dehnfuge bleibt. Ob eine Verlegung unter der Küche erlaubt ist, hängt vom konkreten Produkt ab und sollte vor der Küchenmontage geklärt sein.",
      ] },
      { title: "Dehnfugen, Sockelblenden und spätere Reparatur", paragraphs: [
        "Die Randfuge zu Wänden, Rohren und Küchensockel ist für beide Beläge nötig. Wie breit sie sein muss und ob sie an der Küche mit einer Profilleiste oder einer elastischen Fuge geschlossen wird, steht in der Verlegeanleitung. Eine starr verfüllte Fuge kann den Boden genauso einspannen wie ein aufgesetzter Schrank.",
        "Denk auch an den Schadensfall. Steht die Küche auf dem Belag, muss sie für den Austausch einzelner Dielen oft teilweise abgebaut werden. Liegt der Boden nur bis vor die Sockelblende, bleibt der Austausch meist einfacher. Bewahre deshalb einige Ersatzdielen mit Produktbezeichnung und Chargennummer auf.",
      ] },
      { title: "Stuhlrollen, Barhocker und schwere Geräte", paragraphs: [
        "Am Esstisch und an einer Kücheninsel werden Stühle und Barhocker täglich bewegt. Filzgleiter oder für harte Böden geeignete Rollen schützen beide Beläge. Bei Klickvinyl können punktuelle Lasten Eindrücke hinterlassen, bei Laminat eher Kratzer an der Oberfläche. Wie stark das ausfällt, hängt vom Produkt und nicht allein vom Material ab.",
        "Kühlschrank, freistehender Herd oder ein Vorratsschrank stellen eine hohe Punktlast dar. Prüfe in den Herstellerangaben, ob es Hinweise zu Lasten auf schwimmend verlegten Böden gibt. Unterlegscheiben oder Möbelgleiter mit größerer Auflagefläche verteilen das Gewicht, ersetzen aber nicht die Freigabe für die geplante Nutzung.",
      ] },
      { title: "Reinigung ohne stehendes Wischwasser", paragraphs: [
        "Für die Küche ist die tägliche Reinigung ein wichtiger Teil des Vergleichs. Beide Beläge werden meist nebelfeucht gewischt. Ein sehr nasser Wischmopp kann Wasser in die Fugen drücken, auch wenn die Oberfläche selbst unempfindlich ist. Lies in der Pflegeanleitung nach, welche Reinigungsmittel und welche Wassermenge zulässig sind.",
        "Fett, Rotwein oder Kurkuma sollten schnell entfernt werden. Wie gut ein Fleck wieder herausgeht, hängt von der Oberflächenbeschichtung ab. Dampfreiniger sind bei vielen Produkten ausgeschlossen. Eine einfache Reinigung mit dem Musterstück, etwa mit einem typischen Küchenfleck, gibt dir einen ersten Eindruck vor dem Kauf.",
      ] },
      { title: "Übergänge zu Flur, Wohnraum und Fliesen", paragraphs: [
        "In offenen Grundrissen geht die Küche oft ohne Tür in den Wohnraum über. Für beide Beläge gibt es eine maximale Feldgröße, ab der eine Bewegungsfuge nötig wird. Diese Fuge sollte an einer sinnvollen Stelle liegen, etwa im Türdurchgang oder an der Grenze zwischen Küche und Essbereich, und nicht mitten im Laufweg.",
        "Grenzt die Küche an einen Fliesenboden, unterscheiden sich häufig die Aufbauhöhen. Ein Übergangsprofil gleicht Höhe und Bewegung aus. Miss deshalb die Gesamthöhe aus Unterlage und Belag beider Produkte und plane das passende Profil mit. Liegt in der Küche eine Fußbodenheizung, gelten zusätzliche Bedingungen, die ein eigener Vergleich ausführlicher behandelt.",
      ] },
      { title: "Fläche mit und ohne Küchenzeile rechnen", paragraphs: [
        "Ob die Küchenzeile auf dem Boden steht, verändert die Bestellmenge. Steht sie auf dem Rohboden, wird ihre Grundfläche von der Raumfläche abgezogen. Wird unter der Küche verlegt, gilt die volle Fläche. Rechne beide Varianten mit demselben Verschnitt und denselben Paketgrößen, damit die Angebote vergleichbar bleiben.",
        "Runde am Ende immer auf ganze Pakete auf. Der Verschnitt hängt von Raumform, Verlegerichtung und Dielenformat ab. Der Wert im Beispiel unten ist nur eine Annahme. Für eine Küche mit vielen Ecken, Rohren und Inseln kann mehr Verschnitt nötig sein als für einen rechteckigen Raum.",
      ] },
    ],
    comparison: { caption: "Was in der Küche für beide Beläge belegt sein sollte", columns: ["Prüffrage", "Laminat", "Klickvinyl"], rows: [
      ["Wasser an Fugen", "Feuchteangaben und Garantiebedingungen laut Datenblatt prüfen", "Wasserresistenz und Klickverbindung laut Datenblatt prüfen"],
      ["Freigabe Küche", "Eignung für Küchen schriftlich bestätigen lassen", "Eignung für Küchen schriftlich bestätigen lassen"],
      ["Küchenzeile", "Meist vor der Küche verlegen, Anleitung prüfen", "Meist vor der Küche verlegen, Anleitung prüfen"],
      ["Belastung", "Kratzer und Stöße am Musterstück prüfen", "Eindrücke durch Punktlasten am Musterstück prüfen"],
      ["Reinigung", "Nebelfeucht wischen, Pflegeanleitung beachten", "Nebelfeucht wischen, Pflegeanleitung beachten"],
      ["Übergänge", "Feldgröße, Bewegungsfuge und Profilhöhe planen", "Feldgröße, Bewegungsfuge und Profilhöhe planen"],
    ] },
    checklist: [
      "Spüle, Spülmaschine, Kühlschrank und andere Wasserzonen in einer Skizze markieren.",
      "Für beide Produkte Feuchteangaben, Nutzungsklasse und Küchenfreigabe laut Datenblatt notieren.",
      "Garantiebedingungen zu stehendem Wasser vollständig lesen.",
      "Mit der Küchenplanung klären, ob die Küchenzeile auf dem Rohboden oder auf dem Belag steht.",
      "Randfugen, Sockelblende und Bewegungsfugen in den Verlegeplan aufnehmen.",
      "Übergangsprofile zu Fliesen und Nachbarräumen nach Aufbauhöhe auswählen.",
      "Musterstück auf Kratzer, Flecken und Rutschgefühl in der Küche testen.",
      "Fläche, Verschnitt und ganze Pakete für beide Verlegevarianten berechnen.",
    ],
    faqs: [
      { question: "Ist Vinyl in der Küche immer besser als Laminat?", answer: "Nein. Klickvinyl ist an der Oberfläche oft wasserunempfindlicher, doch Fugen, Untergrund und Verlegung bleiben wichtig. Auch Laminat kann passen, wenn das konkrete Produkt laut Hersteller für Küchen geeignet ist." },
      { question: "Darf ich die Küchenzeile auf Laminat oder Klickvinyl stellen?", answer: "Das hängt von der Verlegeanleitung des Produkts ab. Viele Hersteller empfehlen bei schwimmender Verlegung, die Küche auf den Rohboden zu stellen und den Belag bis vor die Sockelblende zu verlegen." },
      { question: "Was bedeutet eine Garantie gegen stehendes Wasser?", answer: "Sie gilt nur unter den Bedingungen, die der Hersteller nennt, etwa für eine bestimmte Dauer und eine fachgerechte Verlegung. Lies die Garantiebedingungen vollständig, bevor du dich darauf verlässt." },
      { question: "Brauche ich für die Küche eine andere Unterlage?", answer: "Die Unterlage muss für Belag und Untergrund freigegeben sein. Auf mineralischem Estrich verlangen viele Anleitungen eine Dampfbremse. Bei Klickvinyl mit kaschierter Unterlage ist eine zusätzliche Schicht oft nicht erlaubt." },
    ],
    example: { title: "Bestellmenge für eine Beispielküche", intro: "Alle Zahlen sind Beispielwerte. Raummaß, Küchenzeile, Verschnitt und Paketinhalt müssen durch eigene Maße und echte Produktdaten ersetzt werden.", steps: [
      { label: "Küche, Beispielmaß", value: "4,20 m × 3,10 m = 13,02 m²" },
      { label: "Küchenzeile auf Rohboden, Beispielmaß", value: "3,00 m × 0,60 m = 1,80 m²" },
      { label: "Verlegefläche vor der Küche", value: "13,02 m² − 1,80 m² = 11,22 m²" },
      { label: "Beispielhafter Verschnitt 10 Prozent", value: "11,22 m² × 1,10 = 12,34 m²" },
      { label: "Beispielpaket 2,13 m²", value: "12,34 ÷ 2,13 = 5,79, aufgerundet 6 Pakete mit 12,78 m²" },
      { label: "Gegenprobe mit Verlegung unter der Küche", value: "13,02 m² × 1,10 = 14,32 m², 14,32 ÷ 2,13 = 6,72, aufgerundet 7 Pakete mit 14,91 m²" },
    ], result: "Mit diesen Beispielwerten spart die Verlegung vor der Küchenzeile ein Paket. Die Rechnung gilt für Laminat und Klickvinyl gleichermaßen.", note: "Ob unter der Küche verlegt werden darf, entscheidet die Verlegeanleitung des Produkts, nicht die Bestellmenge." },
    limitation: "Die Seite ersetzt keine Prüfung des konkreten Produkts, keine Verlegeanleitung und keine Begutachtung des Untergrunds. Feuchtebeständigkeit, Garantien und Freigaben gelten nur so, wie sie der Hersteller für sein Produkt angibt.",
    sources: [
      { label: "Informationen zu Laminat und Verlegung", href: "https://eplf.com/de/infomaterial-zu-laminat", publisher: "Verband der Europäischen Laminatbodenhersteller", note: "Technische Merkblätter zu Untergrund, Unterlagen, Verlegung und Pflege von Laminat." },
      { label: "Standards für modulare Bodenbeläge", href: "https://mmfa.eu/en/products/installation/standards/", publisher: "MMFA", note: "Normen- und Merkblattübersicht zu Verlegung und Anforderungen mehrschichtiger modularer Bodenbeläge." },
    ],
    relatedLinks: [
      { label: "Bodenbelag berechnen", href: "/haus/boden/bodenbelag-rechner/", description: "Küchenfläche, Verschnitt und Paketbedarf mit eigenen Werten bestimmen." },
      { label: "Bodenbelag für die Küche", href: "/ratgeber/bodenbelag-fuer-kueche/", description: "Weitere Belagsarten und den Küchenboden im Überblick planen." },
      { label: "Laminat oder Klickvinyl auf Fußbodenheizung", href: "/ratgeber/vergleiche/bodenbelag/bodenbelag-laminat-oder-klickvinyl-fussbodenheizung/", description: "Wärmedurchlasswiderstand und Freigaben für beheizte Küchenböden prüfen." },
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Estrich, Feuchte, Dampfbremse und Unterlage vor der Verlegung prüfen." },
      { label: "Sockelleisten berechnen", href: "/haus/boden/sockelleisten-berechnen/", description: "Leisten und Abschlüsse für Wände und Küchensockel planen." },
    ],
  } as T;
}
