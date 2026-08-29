import type { GuideRelatedLink } from "@/components/seo/GuidePage";
import { GUIDE_SOURCE_LIBRARY, type GuideSource } from "@/lib/guide-enrichments";
import { editorialVariant, lowercaseInitial, sentenceEnd } from "@/lib/editorial-style";
import type { SeoGuide } from "@/lib/seo-guides";

type Cluster = {
  label: string;
  plannerHref: string;
  plannerLabel: string;
  measurementMethod: string;
  decisionMethod: string;
  boundary: string;
  relatedLinks: [GuideRelatedLink, GuideRelatedLink, GuideRelatedLink];
  sources: readonly GuideSource[];
};

type ScenarioSeed = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  takeaway: string;
  scenario: string;
  measurement: string;
  calculation: string;
  result: string;
  optionA: string;
  optionB: string;
  advice: [string, string, string];
  caution: string;
};

const SCENARIO_SECTION_HEADINGS: Record<string, readonly [string, string, string, string]> = {
  "gartenhaus-fuer-zwei-fahrraeder": ["Radmaße und Türlichte", "Vier bis fünf Quadratmeter als Größenrahmen", "Kompakte Lagerung oder zusätzliche Zone", "Befestigung und Akkus sicher planen"],
  "gartenhaus-fuer-sechs-fahrraeder": ["Zugriff für jedes Fahrrad", "Stellbreite und Fahrgasse berechnen", "Wandhalter oder Bodenständer", "Türöffnung und schwere Räder"],
  "gartenhaus-fuer-rasenmaeher": ["Den Mäher in Lagerstellung vermessen", "Gerätezone und Rollweg", "Kompakt lagern oder Wartungsraum schaffen", "Boden, Lüftung und Betriebsstoffe"],
  "gartenhaus-mit-werkstatt": ["Werkbank und Bediengang", "Flächenbedarf der Arbeitszone", "Gerade Werkbank oder Winkellösung", "Licht, Strom und Bodenlast"],
  "gartenhaus-2x2-meter": ["Vom Außenmaß zum Innenmaß", "Was von vier Quadratmetern übrig bleibt", "Gerätehaus oder gemischte Lagerung", "Tür und Bewegungsfläche"],
  "gartenhaus-3x3-meter": ["Neun Quadratmeter sinnvoll zonieren", "Regale und freie Mitte berechnen", "Lagerhaus oder kleine Werkstatt", "Fenster, Tür und Bodenlast"],
  "gartenhaus-3x4-meter": ["Die lange Wand sinnvoll nutzen", "Arbeitszone und Lagerfläche", "Großes Lager oder kombinierte Werkstatt", "Freier Zugang zu langen Geräten"],
  "maehroboter-fuer-250-qm": ["Nettofläche im kleinen Garten", "Reserve für 250 Quadratmeter", "Kompakte oder größere Flächenklasse", "Passagen bleiben ein eigenes Kriterium"],
  "maehroboter-fuer-800-qm": ["Achthundert Quadratmeter richtig erfassen", "Kapazität bei mittlerer Komplexität", "Flächenklasse und tägliche Laufzeit", "Steigung und getrennte Zonen"],
  "maehroboter-fuer-1000-qm": ["Tausend Quadratmeter als Nettofläche", "Kapazität mit sichtbarer Reserve", "Leistungsklasse und Zeitfenster", "Engstellen dürfen nicht untergehen"],
  "maehroboter-fuer-1500-qm": ["Große Rasenflächen sauber aufteilen", "Planungsleistung für 1.500 Quadratmeter", "Kapazität oder längere Betriebszeit", "Navigation und Steigung nachweisen"],
  "maehroboter-fuer-verwinkelten-garten": ["Zonen und Sackgassen kartieren", "Fahrwege erhöhen den Kapazitätsbedarf", "Korridore oder kartengestützte Navigation", "Die engste Verbindung entscheidet"],
  "maehroboter-unter-baeumen": ["Baumzonen getrennt beurteilen", "Fläche unter dichter Krone", "RTK mit Sensorik oder lokale Navigation", "Wurzeln, Laub und weicher Boden"],
  "maehroboter-fuer-mehrere-flaechen": ["Jede Rasenfläche einzeln aufnehmen", "Mehrzonenreserve berechnen", "Automatische Verbindung oder manueller Transport", "Laden und Rückkehr im Alltag"],
  "terrasse-10-qm-material": ["Die kleine Terrasse genau vermessen", "Bestellfläche und Laufmeter", "Durchgehende Dielen oder geplante Stöße", "Randdetails kosten auf kleiner Fläche viel"],
  "terrasse-20-qm-material": ["Zwanzig Quadratmeter in Verlegefelder teilen", "Dielenmenge mit Zuschnitt", "Lange Lieferlängen oder Stoßplan", "Unterkonstruktion und Befestiger"],
  "terrasse-30-qm-material": ["Große Teilflächen getrennt erfassen", "Laufmeter für dreißig Quadratmeter", "Durchgehende Reihen oder Materialmix", "Lieferung und Lagerung mitplanen"],
  "terrasse-40-qm-material": ["Vierzig Quadratmeter ohne Pauschalaufschlag", "Bestellrahmen aus Deckbreite und Fuge", "Lange Dielen oder kontrollierte Stöße", "Tragwerk und Wasserführung"],
  "terrassendielen-laengs-oder-quer": ["Blickrichtung und Wasserlauf", "Reihen, Längen und Schnittreste", "Längsverlegung oder Querverlegung", "Die Unterkonstruktion folgt der Richtung"],
  "terrasse-mit-pool-planen": ["Poolrand und Wartungszugang", "Zuschnitt entlang der Rundung", "Feste Umrandung oder demontierbare Felder", "Spritzwasser und sichere Oberflächen"],
  "bewaesserung-kleiner-garten": ["Verbraucher im kleinen Garten trennen", "Durchfluss für kurze Leitungswege", "Eine Zone oder mehrere Kreise", "Druck und Pflanzenbedarf prüfen"],
  "bewaesserung-500-qm-garten": ["Fünfhundert Quadratmeter in Zonen teilen", "Gemeinsamer Bedarf und verfügbare Zeit", "Große Kreise oder mehrere Ventilzonen", "Der Anschluss setzt die Grenze"],
  "tropfbewaesserung-fuer-beete": ["Beetlängen und Pflanzabstände", "Tropferzahl und Zonenbedarf", "Tropfrohr oder einzelne Tropfer", "Filterung und Druckausgleich"],
  "bewaesserung-fuer-hochbeete": ["Jedes Hochbeet separat erfassen", "Wasserbedarf pro Bewässerung", "Gemeinsame Leitung oder einzelne Abgänge", "Überlauf und ungleichmäßige Höhen"],
  "bewaesserung-bei-wenig-wasserdruck": ["Durchfluss unter realem Fließdruck", "Kleine Zonen aus dem Messwert", "Wenige Verbraucher oder Zwischenspeicher", "Druckangaben nicht schätzen"],
  "gewaechshaus-fuer-gurken": ["Rankhöhe und erreichbare Beetbreite", "Nutzbare Fläche zwischen den Wegen", "Bodenbeet oder geführte Kultur", "Lüftung darf nicht blockiert werden"],
  "gewaechshaus-fuer-tomaten-und-gurken": ["Hohe Kulturen sinnvoll trennen", "Beetfläche und Mittelweg", "Gemeinsame oder getrennte Kulturzonen", "Beschattung und Luftführung"],
  "gewaechshaus-klein-2x3-meter": ["Sechs Quadratmeter Innenraum aufteilen", "Weg und Beetfläche berechnen", "Zwei Seitenbeete oder flexible Stellflächen", "Türbereich und Arbeitshöhe"],
  "gewaechshaus-automatisch-lueften": ["Dachöffnung und Zuluft gemeinsam planen", "Erforderlichen Lüftungsquerschnitt einordnen", "Automatische Öffner oder manuelle Lüftung", "Wind, Temperatur und Wartung"],
  "sichtschutz-10-meter-berechnen": ["Zehn Meter zwischen festen Endpunkten", "Felder, Pfosten und Restmaß", "Standardraster oder angepasste Teilung", "Ecken und Fundamente gesondert planen"],
  "sichtschutz-wpc-oder-holz": ["Standort und Pflegebereitschaft", "Feldteilung bleibt systemabhängig", "WPC oder Holz im Alltag", "Ausdehnung, Feuchte und Reparatur"],
  "sichtschutz-bei-starkem-wind": ["Freie Anströmung und Projektionsfläche", "Windangriffsfläche sichtbar machen", "Offene Lamellen oder geschlossenes System", "Pfosten und Fundamente nachweisen"],
  "sichtschutz-mit-gartentor": ["Torlichte und Öffnungsrichtung", "Die verbleibende Zaunlänge", "Ein Flügel oder breitere Torlösung", "Torpfosten als eigenes Bauteil"],
  "carport-fuer-suv": ["SUV mit Spiegeln und Dachaufbau", "Lichte Breite statt Dachmaß", "Kompakter oder breiter Stellplatz", "Pfosten, Rinne und Rangierlinie"],
  "einzelcarport-oder-doppelcarport": ["Zwei Fahrzeuge gleichzeitig einzeichnen", "Nutzbare Gesamtbreite", "Getrennte Dächer oder gemeinsames Tragwerk", "Mittelpfosten und Entwässerung"],
  "carport-mit-abstellraum": ["Stellplatz und Lager als zwei Zonen", "Freie Fläche zwischen den Regalen", "Abstellraum am Ende oder an der Seite", "Tür, Lüftung und Brandlast"],
  "laminat-fuer-20-qm": ["Zwanzig Quadratmeter sauber zerlegen", "Verschnitt und ganze Pakete", "Gerader Raum oder komplexer Grundriss", "Sockelleisten folgen dem Umfang"],
  "laminat-fuer-50-qm": ["Fünfzig Quadratmeter ohne Doppelzählung", "Paketanzahl mit Verschnitt", "Einheitliche Verlegung oder mehrere Räume", "Restpakete und Übergänge"],
  "vinyl-klick-oder-kleben": ["Untergrund und Aufbauhöhe", "Schichtaufbau statt Quadratmeterpreis", "Klickvinyl oder Klebevinyl", "Feuchte und Fußbodenheizung"],
  "bodenbelag-fuer-kueche": ["Verlegefläche in der Küche festlegen", "Einbauten und Verschnitt", "Klicksystem oder geklebter Belag", "Feuchte, Stühle und Übergänge"],
  "trockenbauwand-3-meter": ["Wandmaß und Anschlüsse aufnehmen", "Plattenfläche für beide Seiten", "Eine oder zwei Plattenlagen", "Profile folgen dem freigegebenen Raster"],
  "trockenbauwand-mit-tuer": ["Rohbauöffnung und Türgewicht", "Nettofläche plus Zusatzprofile", "Leichte oder schwere Tür", "Sturz und Fugen nicht improvisieren"],
  "trockenbau-schallschutzwand": ["Schutzziel und flankierende Bauteile", "Plattenmenge für den Systemaufbau", "Standardwand oder geprüftes Schallschutzsystem", "Anschlüsse entscheiden über das Ergebnis"],
  "luftentfeuchter-fuer-20-qm": ["Raumvolumen statt Fläche", "Fünfzig Kubikmeter im Beispiel", "Kompaktes Gerät oder Dauerablauf", "Temperatur verändert die Leistung"],
  "luftentfeuchter-fuer-50-qm": ["Verbundene Räume vollständig messen", "Hundertfünfundzwanzig Kubikmeter", "Tankbetrieb oder fester Ablauf", "Feuchteursache vor der Gerätewahl"],
  "luftentfeuchter-fuer-100-qm": ["Große Raumvolumen getrennt bewerten", "Zweihundertfünfzig Kubikmeter", "Ein großes oder mehrere kleinere Geräte", "Luftführung und Laufzeit"],
  "luftentfeuchter-fuer-badezimmer": ["Feuchteabfall nach dem Duschen", "Raumvolumen und zeitlicher Verlauf", "Lüftungsroutine oder Zusatzgerät", "Elektrische Schutzbereiche"],
};

function phrase(text: string) {
  return text.replace(/[.!?]+$/, "");
}

function scenarioResultSentence(result: string, topic: string) {
  const value = phrase(result);
  if (/\b(?:bleibt|bleiben|verbleibt|verbleiben|ist|sind|wird|werden|liegt|liegen|umfasst|umfassen)\b/i.test(value)) {
    return sentenceEnd(value);
  }
  const lower = lowercaseInitial(value);
  if (topic === "Gartenhaus") return `Als Größenrahmen gelten ${lower}.`;
  if (topic === "Mähroboter") return `Für die Vorauswahl gilt ${lower}.`;
  if (topic === "Terrasse") {
    if (/^Weniger Stöße/i.test(value)) return `Die Verlegung zielt auf ${lower}.`;
    return `Für die Bestellplanung ergeben sich ${lower}.`;
  }
  if (topic === "Bewässerung") {
    if (/^rund [\d,]+ l\/min gemeinsamer Bedarf/i.test(value)) {
      return sentenceEnd(value.replace(/^rund ([\d,]+ l\/min) gemeinsamer Bedarf/i, "Der gemeinsame Bedarf liegt bei rund $1"));
    }
    if (/^(?:etwa )?[\d,]+ l\/min Zonenbedarf/i.test(value)) {
      return sentenceEnd(value.replace(/^((?:etwa )?[\d,]+ l\/min) Zonenbedarf/i, "Der Zonenbedarf liegt bei $1"));
    }
    return `Vorgesehen sind ${lower}.`;
  }
  if (topic === "Gewächshaus") {
    if (/^ein zu verifizierender Lüftungsquerschnitt/i.test(value)) {
      return sentenceEnd(value.replace(/^ein zu verifizierender Lüftungsquerschnitt/i, "Zu verifizieren ist ein Lüftungsquerschnitt"));
    }
    if (/^rund [\d,]+ m² nutzbare Beetfläche/i.test(value)) return `Es stehen ${lower} zur Verfügung.`;
    return `Vorgesehen sind ${lower}.`;
  }
  if (topic === "Sichtschutz") {
    if (/^ein anzupassendes Restfeld von/i.test(value)) {
      return sentenceEnd(value.replace(/^ein anzupassendes Restfeld von (.+?) statt (.+)$/i, "Ein Restfeld von $1 muss angepasst werden, statt $2 einzuplanen"));
    }
    if (/^eine projektspezifische Feldteilung/i.test(value)) return `Erforderlich ist ${lower}.`;
    if (/^[\d,]+ m² zu bewertende Projektionsfläche/i.test(value)) {
      return sentenceEnd(value.replace(/^([\d,]+ m²) zu bewertende Projektionsfläche/i, "Zu bewerten ist eine Projektionsfläche von $1"));
    }
    if (/^[\d,]+ m separat aufzuteilende Reststrecke/i.test(value)) {
      return sentenceEnd(value.replace(/^([\d,]+ m) separat aufzuteilende Reststrecke nach der Torzone$/i, "Nach der Torzone bleibt eine Reststrecke von $1, die separat aufgeteilt wird"));
    }
    return sentenceEnd(value);
  }
  if (topic === "Carport") {
    const width = value.match(/^(Mindestens rund|Etwa) ([\d,]+) m (nutzbare|lichte) Breite(.*)$/i);
    if (width) return `Vorgesehen ist eine ${width[3].toLocaleLowerCase("de-DE")} Breite von ${width[1].toLocaleLowerCase("de-DE")} ${width[2]} m${width[4]}.`;
    return `Rechnerisch bleiben ${lower}.`;
  }
  if (topic === "Bodenbelag") {
    if (/\bPakete?\b/i.test(value)) return `Die Bestellmenge umfasst ${lower}.`;
    return `Das Ergebnis ist ${lower}.`;
  }
  if (topic === "Trockenbau") return `Die Materialplanung ergibt ${lower}.`;
  if (topic === "Luftentfeuchter") {
    if (/^(.+) plus ein zeitlicher Feuchteverlauf als Auswahlgrundlage$/i.test(value)) {
      return sentenceEnd(value.replace(/^(.+) plus ein zeitlicher Feuchteverlauf als Auswahlgrundlage$/i, "Die Auswahl stützt sich auf $1 und den zeitlichen Feuchteverlauf"));
    }
    return `Als Auswahlgrundlage gelten ${lower}.`;
  }
  return sentenceEnd(value);
}

const clusters = {
  gartenhaus: {
    label: "Gartenhaus",
    plannerHref: "/garten/gartenhaus-planer/",
    plannerLabel: "Gartenhaus dimensionieren",
    measurementMethod: "Miss jedes Lagergut an seiner breitesten und längsten Stelle einschließlich Lenker, Griffe, Körbe oder Anbauteile. Zeichne anschließend Türöffnung, Bewegungsfläche, Regaltiefe und nicht zustellbare Wandbereiche maßstäblich ein. Außenmaß, Sockelmaß und nutzbares Innenmaß sind dabei getrennte Werte.",
    decisionMethod: "Eine belastbare Größenentscheidung entsteht aus dem Stellplan: häufig genutzte Dinge liegen am Zugang, schwere Geräte bleiben am Boden und lange Gegenstände erhalten eine eigene Wandzone. Auf dieser Grundlage lassen sich Bauart, Material und konkrete Modelle sinnvoll vergleichen.",
    boundary: "Fundament, Bodenlast, Wind- und Schneelast, Grenzabstände sowie eine mögliche Genehmigung sind standort- und systemabhängig. Die Flächenrechnung ersetzt diese Prüfung nicht.",
    relatedLinks: [
      { label: "Gartenhaus-Größe berechnen", href: "/garten/gartenhaus-groesse/", description: "Lagergut und Bewegungsfläche strukturiert erfassen." },
      { label: "Fundament auswählen", href: "/garten/gartenhaus-fundament/", description: "Untergrund, Last und Wasserführung vor dem Aufbau prüfen." },
      { label: "Gartenhaus-Kosten planen", href: "/garten/gartenhaus-kosten/", description: "Haus, Unterbau, Lieferung und Zubehör gemeinsam kalkulieren." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.berlinBuildingCode],
  },
  mower: {
    label: "Mähroboter",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Mähbereich berechnen",
    measurementMethod: "Ermittle die reine Rasenfläche ohne Haus, Terrasse, Wege, Beete und Wasserflächen. Miss zusätzlich die steilste Stelle, die engste nutzbare Passage und jede getrennte Zone. Diese harten Randbedingungen können ein Gerät ausschließen, auch wenn seine Nennfläche ausreichend klingt.",
    decisionMethod: "Die Kapazität sollte zur Nettofläche, zur Komplexität und zum erlaubten Mähzeitfenster passen. Navigation, Ladestation, Kanten und Service werden anschließend mit identischen Standortannahmen verglichen. Eine größere Flächenklasse ist Reserve, aber kein Ersatz für passende Traktion oder sichere Grenzen.",
    boundary: "Flächen- und Steigungsangaben gelten unter den Bedingungen des jeweiligen Herstellers. Empfang, Bodenfeuchte, Software und reale Hindernisse müssen am Standort geprüft werden.",
    relatedLinks: [
      { label: "Mähroboter-Rechner", href: "/garten/maehroboter-rechner/", description: "Nettofläche, Komplexität und Reserve zusammenführen." },
      { label: "Fläche richtig messen", href: "/garten/maehroboter-flaeche-berechnen/", description: "Teilflächen und Abzüge nachvollziehbar dokumentieren." },
      { label: "Steigung und Engstellen", href: "/garten/maehroboter-steigung-engstellen/", description: "Die schwierigsten Gartenstellen vor dem Kauf prüfen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.mowerSlope, GUIDE_SOURCE_LIBRARY.mowerPassages, GUIDE_SOURCE_LIBRARY.mowerSecondaryArea],
  },
  terrace: {
    label: "Terrasse",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Terrassenmaterial berechnen",
    measurementMethod: "Miss Länge und Breite an mehreren Stellen und lege die Verlegerichtung fest. Dielenbreite, Fuge und lieferbare Länge bestimmen Reihen, Stöße und Verschnitt. Ausschnitte werden nicht pauschal abgezogen, solange ihre Einfassung zusätzlichen Materialbedarf erzeugt.",
    decisionMethod: "Berechne Dielen, Unterkonstruktion, Befestiger und Randdetails getrennt. Vergleiche Varianten anschließend mit derselben Fläche, demselben Verschnitt und einem vollständigen Systemaufbau. So wird aus einem Quadratmeterpreis eine nachvollziehbare Projektmenge.",
    boundary: "Auflagerabstände, Befestigung, Hinterlüftung und Ausdehnungsfugen richten sich nach Material, Produkt und Untergrund. Die Beispielrechnung ist keine statische oder handwerkliche Freigabe.",
    relatedLinks: [
      { label: "Terrassendielen-Rechner", href: "/garten/terrassen-dielen-rechner/", description: "Reihen, Laufmeter und Verschnitt berechnen." },
      { label: "Unterkonstruktion planen", href: "/garten/terrasse-unterkonstruktion/", description: "Auflager, Stöße und Randzonen berücksichtigen." },
      { label: "Terrassenkosten einordnen", href: "/garten/terrasse-kosten/", description: "Materialgruppen und Zusatzposten vollständig erfassen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.terraceConstruction],
  },
  irrigation: {
    label: "Bewässerung",
    plannerHref: "/garten/bewaesserungs-planer/",
    plannerLabel: "Bewässerungszonen planen",
    measurementMethod: "Teile Rasen, Beete, Hecken und Hochbeete nach Pflanzenbedarf und Bewässerungsart. Miss am späteren Anschluss den realen Durchfluss mit einem Eimer-Test und prüfe den Fließdruck. Höhenunterschiede, Filter, Schlauchlängen und parallele Verbraucher werden separat notiert.",
    decisionMethod: "Addiere nicht einfach alle Verbraucher. Bilde Zonen, deren gemeinsamer Bedarf unter dem zuverlässig verfügbaren Durchfluss liegt, und plane eine Reserve. Tropfrohr und Regner erhalten wegen unterschiedlicher Laufzeiten in der Regel getrennte Kreise.",
    boundary: "Die tatsächliche Auslegung hängt von Herstellerkennlinien, Druckverlust, Wasserqualität und lokalen Regeln zur Wassernutzung ab. Vor der Installation sind die realen Anschlusswerte maßgeblich.",
    relatedLinks: [
      { label: "Bewässerungsplaner", href: "/garten/bewaesserungs-planer/", description: "Flächen, Verbraucher und Zonen strukturiert erfassen." },
      { label: "Durchfluss messen", href: "/garten/bewaesserung-durchfluss-messen/", description: "Den Eimer-Test am vorgesehenen Anschluss durchführen." },
      { label: "Bewässerungscomputer und Zonen", href: "/garten/bewaesserungscomputer-zonen/", description: "Steuerung passend zur hydraulischen Aufteilung wählen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.dvgwGarden, GUIDE_SOURCE_LIBRARY.rainwater],
  },
  greenhouse: {
    label: "Gewächshaus",
    plannerHref: "/garten/gewaechshaus-planer/",
    plannerLabel: "Gewächshaus planen",
    measurementMethod: "Nutzbare Beetbreiten, Wege, Tür und Arbeitshöhe geben die Planung vor. Pflanzenabstände werden nicht bis an Wand und Tür gerechnet; hohe Kulturen brauchen zusätzlich Luftvolumen, Rankhilfe und Abstand zu Lüftungsöffnungen. Außenmaß und reale Anbaufläche bleiben getrennt.",
    decisionMethod: "Die Größe folgt Kulturplan und Arbeitsweg, die Ausstattung folgt dem Temperatur- und Feuchteprofil. Lüftungsfläche, Beschattung, Bewässerung und Fundament werden deshalb vor einem Produktvergleich als eigene Anforderungen dokumentiert.",
    boundary: "Wind- und Schneelast, Verankerung, Sicherheitsabstände sowie bau- oder nachbarrechtliche Fragen sind standortabhängig. Kulturhinweise müssen an Sorte, Klima und Saison angepasst werden.",
    relatedLinks: [
      { label: "Gewächshaus-Planer", href: "/garten/gewaechshaus-planer/", description: "Beete, Wege und Ausstattung dimensionieren." },
      { label: "Gewächshaus-Größe", href: "/garten/gewaechshaus-groesse/", description: "Nutzfläche aus Kulturplan und Bewegungsraum ableiten." },
      { label: "Belüftung planen", href: "/garten/gewaechshaus-belueftung/", description: "Dachfenster, Tür und Automatik zusammen betrachten." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.greenhouseSmall, GUIDE_SOURCE_LIBRARY.modelBuildingCode],
  },
  screen: {
    label: "Sichtschutz",
    plannerHref: "/garten/sichtschutz-planer/",
    plannerLabel: "Sichtschutz berechnen",
    measurementMethod: "Miss die Strecke entlang der tatsächlichen Flucht und markiere Ecken, Gefälle, Tor, Enden und Anschlüsse. Elementbreite, Pfostenbreite und notwendige Fugen werden separat gerechnet. Bei Gefälle ist zusätzlich festzulegen, ob die Oberkante waagerecht oder gestuft verlaufen soll.",
    decisionMethod: "Die Teilung der Strecke bestimmt Element- und Pfostenzahl. Material, Höhe, Winddurchlässigkeit, Fundament und Befestigung werden als zusammengehöriges System bewertet. Ein passendes Restfeld ist meist besser als ein erzwungenes Standardraster.",
    boundary: "Windlast, Pfosten, Fundamente, Grenzverlauf und zulässige Höhe müssen für Standort und System geprüft werden. Die Mengenplanung ersetzt weder Statik noch lokales Baurecht.",
    relatedLinks: [
      { label: "Sichtschutz-Planer", href: "/garten/sichtschutz-planer/", description: "Strecke, Teilung und Pfosten nachvollziehbar berechnen." },
      { label: "Elemente berechnen", href: "/garten/sichtschutz-elemente-berechnen/", description: "Standardbreiten und Restfelder vergleichen." },
      { label: "Pfosten und Fundament", href: "/garten/sichtschutz-pfosten-fundament/", description: "Wind, Untergrund und Befestigung gemeinsam prüfen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.berlinBuildingCode],
  },
  carport: {
    label: "Carport",
    plannerHref: "/garten/carport-planer/",
    plannerLabel: "Carport dimensionieren",
    measurementMethod: "Miss Fahrzeug einschließlich Spiegeln, Dachaufbauten und geöffneter Türen. Ergänze Rangierweg, Pfostenpositionen, Dachüberstand und lichte Durchfahrtshöhe. Nicht die Dachfläche, sondern der kleinste nutzbare Querschnitt entscheidet über die Alltagstauglichkeit.",
    decisionMethod: "Die Abmessungen werden aus Fahrzeug, Ein- und Ausstieg, Zufahrt und Zusatznutzung abgeleitet. Tragwerk, Dachwasser, Fundament und Material müssen zu diesem Platzrahmen passen. Ein größeres Dach hilft wenig, wenn Pfosten oder Rinne den Fahrweg einschränken.",
    boundary: "Statik, Wind- und Schneelast, Fundamente, Entwässerung, Brandschutz und Genehmigung sind standortabhängig und müssen fachlich beziehungsweise behördlich geprüft werden.",
    relatedLinks: [
      { label: "Carport-Planer", href: "/garten/carport-planer/", description: "Fahrzeug, Bewegungsraum und Zusatzfläche erfassen." },
      { label: "Carport-Größe", href: "/garten/carport-groesse/", description: "Lichte Maße von Dach- und Außenmaß unterscheiden." },
      { label: "Dachentwässerung", href: "/garten/carport-dachentwaesserung/", description: "Rinne, Ablauf und Wasserweg frühzeitig festlegen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.berlinBuildingCode, GUIDE_SOURCE_LIBRARY.rainwaterManagement],
  },
  floor: {
    label: "Bodenbelag",
    plannerHref: "/haus/boden/bodenbelag-rechner/",
    plannerLabel: "Bodenmenge berechnen",
    measurementMethod: "Zerlege den Raum in Rechtecke, addiere deren Flächen und behandle Nischen sowie Türlaibungen bewusst. Verlegerichtung, Paketinhalt, Dielenformat und ein begründeter Verschnitt schließen an diese Flächenrechnung an. Bestellt wird in ganzen Paketen, nicht in rechnerischen Quadratmeterbruchteilen.",
    decisionMethod: "Untergrund, Feuchte, Nutzung und Herstellerfreigabe entscheiden über das geeignete System. Die Materialmenge wird aus dieser Entscheidung abgeleitet. Für einen fairen Preisvergleich zählen Boden, Unterlage, Profile, Sockelleisten und mögliche Untergrundarbeiten zusammen.",
    boundary: "Restfeuchte, Ebenheit, Fußbodenheizung, Feuchteschutz und Verlegung richten sich nach Untergrund und freigegebenem Produktsystem. Die Mengenrechnung ersetzt keine technische Prüfung.",
    relatedLinks: [
      { label: "Bodenbelag-Rechner", href: "/haus/boden/bodenbelag-rechner/", description: "Raumfläche, Verschnitt und Pakete berechnen." },
      { label: "Laminat-Verschnitt", href: "/haus/boden/laminat-verschnitt-berechnen/", description: "Raumform und Verlegerichtung berücksichtigen." },
      { label: "Untergrund und Trittschall", href: "/haus/boden/untergrund-trittschall/", description: "Ebenheit, Feuchte und Systemaufbau prüfen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.eplfFlooring, GUIDE_SOURCE_LIBRARY.mmfaFlooring],
  },
  drywall: {
    label: "Trockenbau",
    plannerHref: "/haus/innenausbau/trockenbau-rechner/",
    plannerLabel: "Trockenbau berechnen",
    measurementMethod: "Miss Wandlänge und -höhe an mehreren Stellen und erfasse jede Öffnung mit Position und Abmessung. Platten werden je Wandseite und Lage gerechnet; Profile folgen dem freigegebenen Raster. Türständer, Randanschlüsse und zusätzliche Tragprofile werden separat ergänzt.",
    decisionMethod: "Wandfunktion, Höhe, Lasten, Schall- und Brandschutz bestimmen das System. Aus dem freigegebenen Aufbau lassen sich Platten, Profile, Dämmung und Befestiger sinnvoll ermitteln. Eine reine Quadratmeterrechnung bleibt ein erster Mengenrahmen.",
    boundary: "Profilabstände, Plattenlagen, Befestigung, Anschlüsse sowie Schall- und Brandschutz müssen dem freigegebenen System entsprechen. Tragende oder sicherheitsrelevante Details brauchen Fachplanung.",
    relatedLinks: [
      { label: "Trockenbau-Rechner", href: "/haus/innenausbau/trockenbau-rechner/", description: "Wandflächen, Lagen und Materialrahmen erfassen." },
      { label: "Platten berechnen", href: "/haus/innenausbau/trockenbau-platten-berechnen/", description: "Formate, Öffnungen und Verschnitt einordnen." },
      { label: "Profile und Ständerwerk", href: "/haus/innenausbau/trockenbau-profile-staenderwerk/", description: "Raster, Randprofile und Verstärkungen planen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.knaufWalls, GUIDE_SOURCE_LIBRARY.gypsumOpenings, GUIDE_SOURCE_LIBRARY.rigipsCatalogs],
  },
  dehumidifier: {
    label: "Luftentfeuchter",
    plannerHref: "/haus/raumklima/luftentfeuchter-rechner/",
    plannerLabel: "Entfeuchterbedarf berechnen",
    measurementMethod: "Berechne das Raumvolumen aus Länge, Breite und mittlerer Höhe. Dokumentiere Temperatur und relative Feuchte über mehrere Tage sowie Nutzung, Lüftung und erkennbare Feuchtequellen. Quadratmeter allein reichen nicht, weil Geräteleistung stark von Temperatur und Feuchtelast abhängt.",
    decisionMethod: "Die Ursache und der betriebliche Bedarf gehören in dieselbe Prüfung. Verglichen werden Entfeuchtungsleistung unter passenden Testbedingungen, Hygrostat, Geräusch, Ablauf, Leistungsaufnahme und erwartete Laufzeit. Ein größeres Gerät ist nicht automatisch leiser oder sparsamer.",
    boundary: "Ein Entfeuchter behandelt Raumluft, aber keine Leckage, Wärmebrücke oder andere bauliche Ursache. Bei anhaltender Feuchte, Schimmel oder unklarer Ursache ist eine fachliche Prüfung erforderlich.",
    relatedLinks: [
      { label: "Luftentfeuchter-Rechner", href: "/haus/raumklima/luftentfeuchter-rechner/", description: "Raumvolumen, Feuchtelast und Nutzung einordnen." },
      { label: "Luftentfeuchter im Keller", href: "/haus/raumklima/luftentfeuchter-keller/", description: "Temperatur und saisonale Lüftung berücksichtigen." },
      { label: "Stromverbrauch berechnen", href: "/haus/raumklima/luftentfeuchter-stromverbrauch/", description: "Leistung, Laufzeit und Arbeitspreis transparent rechnen." },
    ],
    sources: [GUIDE_SOURCE_LIBRARY.mold, GUIDE_SOURCE_LIBRARY.ventilation],
  },
} satisfies Record<string, Cluster>;

function makeGuide(cluster: Cluster, seed: ScenarioSeed): SeoGuide {
  const resultSentence = scenarioResultSentence(seed.result, cluster.label);
  const headings = SCENARIO_SECTION_HEADINGS[seed.slug];
  if (!headings) throw new Error(`Fehlende redaktionelle Überschriften für ${seed.slug}`);

  const layout = editorialVariant(`${cluster.label}/${seed.slug}`, 4);
  const optionLeads = [
    [
      `Die Variante „${seed.optionA}“ wird an den gemessenen Anforderungen beurteilt.`,
      `Für „${seed.optionB}“ zählt, ob der zusätzliche Spielraum tatsächlich gebraucht wird.`,
    ],
    [
      `Bei der Option „${seed.optionA}“ stehen die Bedingungen am Einsatzort im Mittelpunkt.`,
      `Die Option „${seed.optionB}“ wird mit denselben Anforderungen gegengeprüft.`,
    ],
    [
      `Für „${seed.optionA}“ ist die praktische Nutzung entscheidend.`,
      `Die Eignung von „${seed.optionB}“ hängt von den dokumentierten Rahmenbedingungen ab.`,
    ],
    [
      `Die Option „${seed.optionA}“ gehört nur in die Auswahl, wenn die Voraussetzungen erfüllt sind.`,
      `Auch die Option „${seed.optionB}“ muss sich am konkreten Projekt messen lassen.`,
    ],
  ][layout];
  const optionAStatement = `${optionLeads[0]} ${seed.advice[0]}`;
  const optionBStatement = `${optionLeads[1]} ${seed.advice[1]}`;
  const sectionParagraphs = [
    [
      seed.intro,
      `${seed.measurement} ${seed.takeaway}`,
    ],
    [
      sentenceEnd(seed.calculation),
      `${resultSentence} ${cluster.measurementMethod}`,
    ],
    [
      `${optionAStatement} ${resultSentence}`,
      `${optionBStatement} ${seed.takeaway}`,
    ],
    [
      `${seed.advice[2]} ${seed.caution}`,
      `Für ${seed.scenario} sind auch die folgenden Punkte wichtig. ${cluster.decisionMethod} ${cluster.boundary}`,
    ],
  ];

  if (layout === 0) sectionParagraphs[0] = [sectionParagraphs[0].join(" ")];
  if (layout === 1) sectionParagraphs[1] = [sectionParagraphs[1].join(" ")];
  if (layout === 2) sectionParagraphs[2] = [sectionParagraphs[2].join(" ")];
  sectionParagraphs[3] = [sectionParagraphs[3].join(" ")];

  const faqVariants = [
    [
      `Welche Maße brauche ich für ${seed.scenario}?`,
      `Was lässt sich aus der Rechnung für ${seed.scenario} ableiten?`,
      `Wann ist die Option „${seed.optionB}“ passender als „${seed.optionA}“?`,
      `Wo liegt die fachliche Grenze für ${seed.scenario}?`,
    ],
    [
      `Wie messe ich ${seed.scenario} sinnvoll aus?`,
      `Welcher Planungswert ergibt sich für ${seed.scenario}?`,
      `Worin unterscheiden sich die Optionen „${seed.optionA}“ und „${seed.optionB}“?`,
      `Was muss vor der Auswahl für ${seed.scenario} geklärt sein?`,
    ],
    [
      `Welche Ausgangsdaten sind für ${seed.scenario} wichtig?`,
      `Wie belastbar ist die Beispielrechnung für ${seed.scenario}?`,
      `Welche Variante passt zur beschriebenen Nutzung?`,
      `Was kann die Rechnung für ${seed.scenario} nicht prüfen?`,
    ],
    [
      `Was sollte ich für ${seed.scenario} vor Ort aufnehmen?`,
      `Wie kommt der Rechenwert für ${seed.scenario} zustande?`,
      `Was spricht für die Option „${seed.optionA}“ und was für „${seed.optionB}“?`,
      `Welche Kontrolle ist für ${seed.scenario} notwendig?`,
    ],
  ][layout];

  return {
    slug: seed.slug,
    title: seed.title,
    description: seed.description,
    heading: seed.heading,
    intro: seed.intro,
    takeaway: seed.takeaway,
    plannerHref: cluster.plannerHref,
    plannerLabel: cluster.plannerLabel,
    sections: headings.map((title, index) => ({ title, paragraphs: sectionParagraphs[index] })),
    comparison: {
      caption: `${headings[1]} und passende Varianten`,
      columns: ["Prüfpunkt", "Wert oder Bedingung", "Einordnung"],
      rows: [
        ["Projekt", seed.measurement, cluster.measurementMethod],
        ["Rechnung", seed.calculation, resultSentence],
        ["Variante A", seed.optionA, seed.advice[0]],
        ["Variante B", seed.optionB, seed.advice[1]],
        ["Grenze", seed.caution, cluster.boundary],
      ],
    },
    checklist: [
      seed.measurement,
      sentenceEnd(seed.calculation),
      resultSentence,
      optionAStatement,
      optionBStatement,
      seed.advice[2],
      seed.caution,
    ],
    faqs: [
      { question: faqVariants[0], answer: `${seed.measurement} ${cluster.measurementMethod}` },
      { question: faqVariants[1], answer: `${sentenceEnd(seed.calculation)} ${resultSentence}` },
      { question: faqVariants[2], answer: `${optionAStatement} ${optionBStatement}` },
      { question: faqVariants[3], answer: `${seed.caution} ${cluster.boundary}` },
    ],
    relatedLinks: cluster.relatedLinks,
    sources: [...cluster.sources],
    example: {
      title: headings[1],
      intro: `${seed.measurement} ${sentenceEnd(seed.calculation)}`,
      steps: [
        { label: "Ausgangslage", value: seed.measurement },
        { label: "Rechnung", value: seed.calculation },
        { label: "Planungswert", value: seed.result },
      ],
      result: seed.result,
      note: seed.caution,
    },
    limitation: cluster.boundary,
  };
}
function guides(cluster: Cluster, seeds: ScenarioSeed[]) {
  return seeds.map((seed) => makeGuide(cluster, seed));
}

const gardenHouseGuides = guides(clusters.gartenhaus, [
  {
    slug: "gartenhaus-fuer-zwei-fahrraeder", title: "Gartenhaus für zwei Fahrräder: Maße und Stellplan", description: "Gartenhaus für zwei Fahrräder planen: Radmaße, Tür, Bewegungsfläche, Halterung, Boden und sichere Lagerung nachvollziehbar bestimmen.", heading: "Zwei Fahrräder im Gartenhaus: klein planen, bequem nutzen", intro: "Zwei Fahrräder benötigen wenig reine Stellfläche, aber ausreichend Tür- und Bewegungsraum für einen Zugriff ohne tägliches Umräumen.", takeaway: "Miss beide Räder vollständig und plane eine freie Fahrgasse. Eine kompakte Lösung ist passend, wenn Lenker, Tür und Zugriff im maßstäblichen Stellplan kollisionsfrei bleiben.", scenario: "zwei Fahrräder", measurement: "Erfasse Fahrradlänge, maximale Lenkerbreite, Türlichte und den Platz zum Drehen oder Einhängen.", calculation: "Zwei Räder mit je 1,85 m Länge werden versetzt auf einer etwa 2,0 m tiefen Stellzone angeordnet; eine 0,80 m breite Zugangsgasse bleibt frei.", result: "rund 4 bis 5 m² gut nutzbare Innenfläche, abhängig von Halterung und zusätzlichem Lagergut.", optionA: "Kompaktes Haus", optionB: "Haus mit zusätzlicher Lagerzone", advice: ["Eine niedrige Schwelle erleichtert schwere E-Bikes.", "Versetzte Lenker reduzieren die notwendige Breite.", "Akkus nur unter geeigneten Temperatur- und Ladebedingungen lagern."], caution: "Wandhalter benötigen eine freigegebene Befestigung und dürfen die Türbewegung nicht blockieren.",
  },
  {
    slug: "gartenhaus-fuer-sechs-fahrraeder", title: "Gartenhaus für sechs Fahrräder: Größe und Zugang planen", description: "Gartenhaus für sechs Fahrräder dimensionieren: Stellordnung, Doppeltür, Fahrgasse, E-Bikes, Halterungen und Reserve verständlich planen.", heading: "Sechs Fahrräder lagern: Zugriff statt dichtem Stapeln", intro: "Bei sechs Rädern entscheidet die Reihenfolge des Zugriffs stärker als die rechnerische Summe der Fahrradflächen.", takeaway: "Ordne Räder nach Nutzung und Gewicht, plane mindestens eine klare Fahrgasse und prüfe eine breite Tür. Selten genutzte Räder dürfen nicht den täglichen Zugriff versperren.", scenario: "sechs Fahrräder", measurement: "Miss jedes Rad einzeln und markiere Lastenrad, E-Bikes, Kindersitze sowie regelmäßig genutzte Modelle im Stellplan.", calculation: "Drei versetzte Räder je Seite benötigen bei 0,65 m mittlerer Stellbreite zwei Zonen von ungefähr 1,95 m plus eine mittige Fahrgasse.", result: "häufig 8 bis 10 m² Innenfläche; Lastenräder oder Bodenständer erhöhen den Bedarf.", optionA: "Versetzte Wandhalter", optionB: "Bodenständer mit breiter Fahrgasse", advice: ["Schwere E-Bikes bleiben möglichst bodennah.", "Eine Doppeltür verteilt den Zugriff auf mehrere Stellplätze.", "Ein freier Reparatur- und Ladebereich darf nicht als Dauerlager enden."], caution: "Die lichte Türöffnung und nicht das Nennmaß der Tür ist mit dem breitesten Fahrrad zu vergleichen.",
  },
  {
    slug: "gartenhaus-fuer-rasenmaeher", title: "Gartenhaus für Rasenmäher: Stellfläche, Tür und Boden", description: "Gartenhaus für Rasenmäher planen: Gerätemaße, Griff, Türschwelle, Kraftstoff, Akku, Bodenlast und Wartungszugang richtig berücksichtigen.", heading: "Rasenmäher im Gartenhaus: Das Gerät muss auch hineinrollen", intro: "Rasenmäher brauchen neben ihrer Parkfläche einen sicheren Weg durch die Tür und Platz für Griff, Fangkorb, Reinigung und Zubehör.", takeaway: "Miss den Mäher in Lagerstellung einschließlich Griff und Fangkorb. Plane eine rollbare Türschwelle, trockenen Boden und getrennte Plätze für Zubehör und Betriebsstoffe.", scenario: "einen Rasenmäher mit Zubehör", measurement: "Miss Gerätebreite an Rädern und Gehäuse, Gesamtlänge, Höhe mit geklapptem Griff sowie die lichte Türöffnung.", calculation: "Ein 0,60 × 1,50 m großer Mäher belegt 0,90 m²; mit 0,70 m Bedien- und Rollzone entsteht eine etwa 1,60 m tiefe Funktionsfläche.", result: "mindestens rund 2 m² freie Gerätezone zuzüglich Regal und anderer Gartengeräte.", optionA: "Kompakte Gerätezone", optionB: "Werkstattzone mit Wartungsfläche", advice: ["Die Schwelle muss mit Gerätegewicht sicher überrollbar sein.", "Fangkorb und Ladegerät erhalten feste, trockene Plätze.", "Kraftstoff und Akkus werden nach Hersteller- und Sicherheitsangaben gelagert."], caution: "Abwärme, Lüftung und Brandlasten dürfen bei motorisierten Geräten nicht ignoriert werden.",
  },
  {
    slug: "gartenhaus-mit-werkstatt", title: "Gartenhaus mit Werkstatt: Größe, Licht und Arbeitsfläche", description: "Gartenhaus mit Werkstatt planen: Werkbank, Bewegungsfläche, Strom, Licht, Lagerung, Bodenlast, Lüftung und Sicherheit sinnvoll dimensionieren.", heading: "Gartenhaus mit Werkstatt: Arbeitsraum vor Lagerraum planen", intro: "Eine Werkstatt funktioniert nur, wenn Werkbank, Material und Bewegungsraum gleichzeitig nutzbar bleiben und nicht bei jedem Projekt ausgeräumt werden müssen.", takeaway: "Plane zuerst Werkbanktiefe, Bediengang und Werkzeugzugriff. Lagerung kommt an die verbleibenden Wände; Strom, Licht, Lüftung und Boden werden als feste Anforderungen behandelt.", scenario: "eine kleine Gartenwerkstatt", measurement: "Zeichne Werkbank, geöffneten Schraubstock, Maschinen, Bediengang, Tür und Fluchtweg mit realen Maßen ein.", calculation: "Eine 0,70 m tiefe und 2,00 m lange Werkbank plus 1,20 m Bedienzone beansprucht bereits etwa 3,8 m² Funktionsfläche.", result: "für eine dauerhaft nutzbare Einpersonen-Werkstatt meist mindestens 8 bis 10 m² Innenfläche.", optionA: "Werkbank an einer Wand", optionB: "L-Form mit zusätzlicher Maschinenzone", advice: ["Arbeitslicht muss schattenarm auf die Werkbank fallen.", "Schwere Maschinen brauchen ausreichende Bodenlast und sicheren Stand.", "Staub, Dämpfe und elektrische Installation erfordern passende Schutzmaßnahmen."], caution: "Elektrik im Gartenhaus gehört fachgerecht geplant und gegen Feuchte sowie mechanische Beschädigung geschützt.",
  },
  {
    slug: "gartenhaus-2x2-meter", title: "Gartenhaus 2 × 2 m: Was passt auf vier Quadratmeter?", description: "Gartenhaus mit 2 × 2 Metern sinnvoll planen: reale Innenfläche, Tür, Regale, Fahrräder, Geräte und Bewegungsraum vor dem Kauf prüfen.", heading: "Gartenhaus 2 × 2 Meter: vier Quadratmeter gezielt nutzen", intro: "Ein Außenmaß von 2 × 2 Metern klingt nach vier Quadratmetern, doch Wandaufbau, Tür und Bewegungsraum reduzieren die nutzbare Lagerfläche.", takeaway: "Vergleiche Sockel-, Außen- und Innenmaß. Ein 2 × 2-m-Haus eignet sich für klar priorisierte Geräte, nicht automatisch für mehrere große Nutzungen zugleich.", scenario: "ein Gartenhaus mit etwa 2 × 2 Metern", measurement: "Übernimm das reale Innenmaß aus dem Datenblatt und zeichne Türschwenkbereich sowie 40 bis 60 cm tiefe Regale ein.", calculation: "Aus 2,00 × 2,00 m Außenmaß werden bei beispielhaft 8 cm Wandabzug je Richtung etwa 1,84 × 1,84 m Innenmaß.", result: "rund 3,4 m² rohe Innenfläche vor Regalen und Bewegungszone.", optionA: "Reines Gerätehaus", optionB: "Kompakter Fahrrad- und Geräte-Mix", advice: ["Nutze Wandhöhe für leichte, selten benötigte Dinge.", "Halte die Mitte als Zugang statt als Abstellfläche frei.", "Vergleiche Dachüberstand und Stellfläche mit dem verfügbaren Grundstück."], caution: "Der beispielhafte Wandabzug ist keine Produktangabe; maßgeblich ist das konkrete Sockel- und Innenmaß.",
  },
  {
    slug: "gartenhaus-3x3-meter", title: "Gartenhaus 3 × 3 m: Stellplan für neun Quadratmeter", description: "Gartenhaus mit 3 × 3 Metern planen: Innenmaß, Regale, Fahrräder, Werkbank, Tür und Bewegungsfläche sinnvoll aufteilen.", heading: "Gartenhaus 3 × 3 Meter: neun Quadratmeter ohne Platzverlust planen", intro: "Neun Quadratmeter erlauben mehrere Nutzungszonen, wenn Tür, Laufweg und tiefe Lagerflächen vor dem Kauf festgelegt werden.", takeaway: "Teile den Raum in Zugang, Bodenlager und Wandlager. Prüfe, ob Werkbank oder Fahrräder wirklich gleichzeitig nutzbar bleiben.", scenario: "ein Gartenhaus mit etwa 3 × 3 Metern", measurement: "Zeichne das reale Innenmaß mit Tür, Fenster, 0,50 m tiefen Regalen und mindestens einer durchgehenden Laufzone.", calculation: "Bei 2,84 × 2,84 m beispielhaftem Innenmaß stehen etwa 8,1 m² zur Verfügung; zwei 0,5 m tiefe Regalwände belegen rund 2,8 m² Grundfläche.", result: "etwa 5,3 m² verbleiben für Geräte, Fahrräder und Bewegung.", optionA: "Lagerhaus mit umlaufenden Regalen", optionB: "Geteilte Lager- und Werkstattnutzung", advice: ["Tür und Fenster dürfen Regale nicht unbrauchbar machen.", "Schwere Dinge werden nah am Zugang und bodennah gelagert.", "Eine feste freie Zone verhindert, dass der Raum langsam unzugänglich wird."], caution: "Eine Werkstatt benötigt zusätzlich Licht, Strom, Lüftung und sichere Abstände; Fläche allein genügt nicht.",
  },
  {
    slug: "gartenhaus-3x4-meter", title: "Gartenhaus 3 × 4 m: Zwölf Quadratmeter richtig aufteilen", description: "Gartenhaus mit 3 × 4 Metern dimensionieren: Lager, Werkstatt, Fahrräder, Regale, Türposition und nutzbare Innenfläche strukturiert planen.", heading: "Gartenhaus 3 × 4 Meter: Zonen statt ungeordneter Fläche", intro: "Zwölf Quadratmeter können Lager und Werkstatt verbinden, sofern lange und häufig genutzte Dinge eigene Zonen erhalten.", takeaway: "Nutze die längere Wand für Werkbank oder Fahrräder und halte einen durchgehenden Weg frei. Prüfe die Aufteilung mit geöffneten Türen und Geräten.", scenario: "ein Gartenhaus mit etwa 3 × 4 Metern", measurement: "Markiere im Innenmaß eine mindestens 0,9 m breite Hauptachse, Regale, Werkbank und die Entnahmerichtung großer Geräte.", calculation: "Bei beispielhaft 2,84 × 3,84 m Innenmaß entstehen 10,9 m²; eine 0,7 × 2,4 m Werkbankzone benötigt mit Bediengang rund 4,6 m².", result: "etwa 6,3 m² bleiben für Lagerzonen und den durchgehenden Zugang.", optionA: "Großes Lagerhaus", optionB: "Kombinierte Werkstatt mit Lager", advice: ["Trenne saubere Werkzeuge von feuchten Gartengeräten.", "Plane lange Gegenstände entlang einer durchgehend freien Wand.", "Prüfe Bodenlast und Befestigung für Werkbank und hohe Regale."], caution: "Zwölf Quadratmeter Außenfläche können rechtlich anders eingeordnet werden als kleinere Nebenanlagen; Standortprüfung bleibt erforderlich.",
  },
]);

const mowerGuides = guides(clusters.mower, [
  ...[250, 800, 1000, 1500].map((area): ScenarioSeed => ({
    slug: `maehroboter-fuer-${area}-qm`, title: `Mähroboter für ${area} m²: Fläche und Reserve bestimmen`, description: `Mähroboter für ${area} Quadratmeter auswählen: Nettofläche, Reserve, Laufzeit, Steigung, Engstellen und Navigation nachvollziehbar prüfen.`, heading: `Mähroboter für ${area} m²: Nennfläche richtig einordnen`, intro: `Bei einer Rasenfläche um ${area} m² entscheidet nicht nur die Herstellerklasse. Form, Hindernisse, Zonen und verfügbare Mähzeit verändern die notwendige Kapazität.`, takeaway: `Miss die Nettofläche und dokumentiere Komplexität separat. Eine Geräteklasse oberhalb von ${area} m² ist nur dann sinnvoll, wenn die zusätzliche Reserve einen konkreten Grund hat.`, scenario: `eine Rasenfläche von ungefähr ${area} m²`, measurement: `Teile die Fläche in Rechtecke, ziehe Nicht-Rasen ab und erfasse Bäume, Inseln, Passagen sowie maximale Steigung.`, calculation: `${area} m² Nettofläche × 1,${area >= 1000 ? "25" : "20"} Komplexitätsfaktor ergeben rechnerisch ${Math.round(area * (area >= 1000 ? 1.25 : 1.2))} m² Planungsleistung.`, result: `eine sinnvolle Vergleichsklasse ab etwa ${Math.round(area * (area >= 1000 ? 1.25 : 1.2))} m² unter den dokumentierten Bedingungen.`, optionA: `${area}-m²-Klasse`, optionB: `${Math.round(area * (area >= 1000 ? 1.5 : 1.4))}-m²-Klasse`, advice: ["Ein offener, ebener Garten braucht weniger Reserve als viele kleine Zonen.", "Kurze erlaubte Mähzeiten erhöhen die nötige Tagesleistung.", "Steigung und Mindestpassage bleiben unabhängig von der Fläche Ausschlusskriterien."], caution: "Die Nennfläche verschiedener Hersteller ist nur vergleichbar, wenn Betriebszeit und Testbedingungen mitgelesen werden.",
  })),
  {
    slug: "maehroboter-fuer-verwinkelten-garten", title: "Mähroboter für verwinkelte Gärten: Passagen und Zonen", description: "Mähroboter für verwinkelte Gärten auswählen: Engstellen, Nebenflächen, Korridore, Navigation, Kanten und Ladestation systematisch prüfen.", heading: "Verwinkelter Garten: Die schwierigste Passage entscheidet", intro: "Viele Ecken und Teilflächen erhöhen Navigationsaufwand und Fahrwege, auch wenn die gesamte Rasenfläche klein bleibt.", takeaway: "Kartiere jede Zone und miss die engste befahrbare Stelle. Wähle Navigation und Kapazität nach der komplexesten Verbindung, nicht allein nach Quadratmetern.", scenario: "einen verwinkelten Garten", measurement: "Skizziere Hauptfläche, Nebenflächen, Korridore, Sackgassen, Bäume und Kanten mit ihren nutzbaren Breiten.", calculation: "Vier Zonen mit zusammen 500 m² und drei langen Korridoren werden nicht wie ein offenes 500-m²-Rechteck bewertet; ein beispielhafter Faktor 1,3 ergibt 650 m² Planungsleistung.", result: "eine Vergleichsklasse um 650 m² plus nachgewiesene Eignung für jede Passage.", optionA: "Begrenzungskabel mit definierten Korridoren", optionB: "Kartengestützte Navigation mit Mehrzonen", advice: ["Die Station liegt möglichst zentral und erreichbar.", "Sackgassen brauchen ausreichend Wendefläche.", "Temporäre Sperrzonen sollten ohne komplette Neukartierung möglich sein."], caution: "Eine nominell ausreichende Navigation kann an genau einer Engstelle oder unter dichter Bebauung scheitern.",
  },
  {
    slug: "maehroboter-unter-baeumen", title: "Mähroboter unter Bäumen: Navigation und Boden prüfen", description: "Mähroboter unter Bäumen planen: Satellitenempfang, Kamera, LiDAR, Wurzeln, Laub, Bodenfeuchte und sichere Bauminseln vergleichen.", heading: "Mähroboter unter Bäumen: Empfang ist nur ein Teil des Problems", intro: "Baumkronen beeinflussen Satellitensicht; Wurzeln, Laub, Früchte und weicher Boden verändern zusätzlich die Befahrbarkeit.", takeaway: "Prüfe jede Baumzone auf Empfang, Hindernisse und Boden. Wähle das Navigationsprinzip erst nach einem realistischen Standorttest.", scenario: "Rasenflächen unter Bäumen", measurement: "Markiere Kronenbereiche, sichtbare Wurzeln, weiche Stellen, Fallobst, Bauminseln und den Empfang entlang der geplanten Grenze.", calculation: "Bei 600 m² Gesamtfläche und 180 m² unter dichter Krone werden 30 Prozent der Fläche als besondere Prüfzone separat bewertet.", result: "eine Flächenklasse für 600 m² plus belastbarer Nachweis für die 180-m²-Schattenzone.", optionA: "RTK mit Zusatzsensorik", optionB: "LiDAR- oder kameragestützte Navigation", advice: ["Wurzeln dürfen nicht durch wiederholte Fahrspuren beschädigt werden.", "Fallobst und Äste gehören in die regelmäßige Flächenkontrolle.", "Bauminseln brauchen eine sichere, klar erkennbare Grenze."], caution: "Kurze Demonstrationen bei freier Krone sagen wenig über belaubte, nasse oder saisonal veränderte Bedingungen aus.",
  },
  {
    slug: "maehroboter-fuer-mehrere-flaechen", title: "Mähroboter für mehrere Rasenflächen und Zonen", description: "Mähroboter für mehrere Rasenflächen auswählen: Verbindungen, Nebenflächen, Mehrzonen-Karten, Transport, Ladestation und Kapazität planen.", heading: "Mehrere Rasenflächen: Verbindung und Bedienung mitplanen", intro: "Getrennte Flächen können automatisch verbunden, manuell bedient oder mit mehreren Karten verwaltet werden. Jede Variante verändert den Alltag.", takeaway: "Prüfe, ob alle Flächen sicher befahrbar verbunden sind. Ohne Verbindung müssen Transport, Start, Rückkehr und Laden als wiederkehrende Schritte eingeplant werden.", scenario: "mehrere getrennte Rasenflächen", measurement: "Miss jede Teilfläche einzeln und dokumentiere Verbindung, Belag, Breite, Gefälle, Tor und Zugang zur Ladestation.", calculation: "Drei Zonen mit 350, 120 und 80 m² ergeben 550 m² Nettofläche; mit 25 Prozent Mehrzonenreserve entstehen rund 690 m² Planungsleistung.", result: "eine Geräteklasse ab ungefähr 700 m² mit passender Mehrzonen-Funktion.", optionA: "Ein Gerät mit automatischen Korridoren", optionB: "Manueller Transport oder getrennte Geräte", advice: ["Korridore dürfen keine öffentliche oder gefährliche Fläche queren.", "Mehrere Karten müssen dauerhaft speicherbar und einfach aktualisierbar sein.", "Transportgewicht und Griff werden relevant, wenn keine automatische Verbindung existiert."], caution: "Hersteller unterscheiden zwischen echten getrennten Karten, Nebenflächen und lediglich festgelegten Startpunkten.",
  },
]);

const terraceGuides = guides(clusters.terrace, [
  ...[10, 20, 30, 40].map((area): ScenarioSeed => ({
    slug: `terrasse-${area}-qm-material`, title: `Terrasse mit ${area} m²: Material und Dielen berechnen`, description: `Material für eine ${area}-m²-Terrasse berechnen: Dielenreihen, Laufmeter, Verschnitt, Unterkonstruktion und Befestigung transparent planen.`, heading: `${area} m² Terrasse: vom Flächenmaß zur Bestellmenge`, intro: `Für eine Terrasse mit ${area} m² reicht die Multiplikation aus Länge und Breite nicht. Dielenbreite, Fuge, Richtung und Lieferlänge bestimmen die tatsächliche Bestellung.`, takeaway: `Berechne zuerst Reihen und Laufmeter, dann Zuschnitt und Verschnitt. Unterkonstruktion, Stöße und Randdetails bleiben separate Materialgruppen.`, scenario: `eine Terrasse mit ${area} m²`, measurement: "Lege eine plausible Rechteckgeometrie fest und prüfe sie gegen reale Kanten, Türen, Fallrohre und Ausschnitte.", calculation: `${area} m² ÷ 0,15 m Deckbreite ergeben rund ${Math.ceil(area / 0.15)} Dielen-Laufmeter; mit 10 Prozent Verschnitt etwa ${Math.ceil(area / 0.15 * 1.1)} Laufmeter.`, result: `rund ${Math.ceil(area / 0.15 * 1.1)} laufende Meter Dielen im Beispiel, auf ganze Lieferlängen aufzurunden.`, optionA: "Dielen in Terrassenlänge", optionB: "Kürzere Lieferlängen mit geplanten Stößen", advice: ["Stöße benötigen meist doppelte oder zusätzliche Auflager.", "Rand- und Abschlussprofile werden nicht aus der Fläche abgeleitet.", "Verschnitt hängt von Geometrie und Lieferlänge ab, nicht nur von der Quadratmeterzahl."], caution: "Die angenommene Deckbreite von 15 cm ist ein Rechenbeispiel und muss durch das reale Produktmaß ersetzt werden.",
  })),
  {
    slug: "terrassendielen-laengs-oder-quer", title: "Terrassendielen längs oder quer verlegen?", description: "Verlegerichtung von Terrassendielen planen: Blickrichtung, Wasser, Lieferlängen, Stöße, Unterkonstruktion, Verschnitt und Übergänge vergleichen.", heading: "Terrassendielen längs oder quer: Richtung mit Folgen", intro: "Die Verlegerichtung verändert Optik, Reihenanzahl, Unterkonstruktion, Stoßbedarf und Verschnitt. Sie wird deshalb vor der Materialrechnung festgelegt.", takeaway: "Vergleiche beide Richtungen mit denselben Produktmaßen. Bevorzuge die Variante mit klarer Wasserführung, beherrschbaren Stößen und sinnvoller Unterkonstruktion.", scenario: "die Verlegerichtung einer Terrasse", measurement: "Miss Länge und Breite, notiere verfügbare Dielenlängen und markiere Hausanschluss, Sichtachse, Gefälle sowie notwendige Revisionsstellen.", calculation: "Bei 6 × 4 m Fläche und 4-m-Dielen vermeidet eine 4-m-Spannrichtung Längsstöße; die gedrehte Richtung benötigt bei 6 m Lauf mindestens einen geplanten Stoß je Reihe.", result: "weniger Stöße in der 4-m-Richtung, sofern Gefälle und Unterkonstruktion dazu passen.", optionA: "Dielen parallel zur Hauswand", optionB: "Dielen vom Haus weg", advice: ["Wasserführung und Profilvorgaben haben Vorrang vor der Blickrichtung.", "Unterkonstruktion verläuft quer zu den Dielen.", "Türschwellen und Abschlusskanten müssen in beiden Varianten detailliert werden."], caution: "Nicht jede Diele darf über beliebige Längen oder mit frei positionierten Stößen verlegt werden.",
  },
  {
    slug: "terrasse-mit-pool-planen", title: "Terrasse mit Pool planen: Material, Rand und Wartung", description: "Terrasse rund um einen Pool planen: rutschhemmende Oberfläche, Wasser, Unterkonstruktion, Randzuschnitt, Revision und Materialbedarf einordnen.", heading: "Terrasse am Pool: Wasser und Wartung bestimmen den Aufbau", intro: "Am Pool treffen dauerhaft Spritzwasser, barfüßige Nutzung, viele Randzuschnitte und notwendige Technikzugänge zusammen.", takeaway: "Plane Poolrand, Gefälle, rutschgeeignete Oberfläche und Revisionszugänge vor der Mengenrechnung. Ausschnitte senken den Aufwand nicht automatisch.", scenario: "eine Terrasse rund um einen Pool", measurement: "Miss Außenfläche und Poolausschnitt getrennt, markiere Rundungen, Technikdeckel, Einbauteile, Gefälle und alle zugänglichen Wartungszonen.", calculation: "Eine 40-m²-Außenfläche mit 18-m²-Poolausschnitt ergibt 22 m² Deckfläche; bei vielen Randzuschnitten werden beispielhaft 15 Prozent statt 10 Prozent Verschnitt angesetzt.", result: "25,3 m² rechnerische Bestellfläche zuzüglich systemabhängiger Rand- und Unterkonstruktionsbauteile.", optionA: "Durchgehende Dielen mit Randzuschnitt", optionB: "Gerahmter Poolrand mit separater Feldaufteilung", advice: ["Oberfläche und Befestigung müssen für häufige Nässe geeignet sein.", "Technik und Anschlüsse bleiben revisionsfähig.", "Randstücke dürfen keine scharfen oder instabilen Kanten bilden."], caution: "Poolchemie, Abstände, elektrische Sicherheit und Tragwerk benötigen produktspezifische beziehungsweise fachliche Planung.",
  },
]);

const irrigationGuides = guides(clusters.irrigation, [
  {
    slug: "bewaesserung-kleiner-garten", title: "Bewässerung für einen kleinen Garten planen", description: "Bewässerung im kleinen Garten planen: Rasen, Beete, Hecke, Durchfluss, Tropfrohr, Regner und Zonen ohne unnötige Überdimensionierung.", heading: "Kleiner Garten: wenige, klar getrennte Bewässerungszonen", intro: "Auch kleine Gärten profitieren von getrennten Zonen, weil Rasen, Beete und Hecken unterschiedliche Laufzeiten und Abgabemengen benötigen.", takeaway: "Miss Flächen und Anschlusswert. Nutze möglichst wenige, hydraulisch passende Zonen und vermeide die gemeinsame Schaltung sehr unterschiedlicher Verbraucher.", scenario: "einen kleinen gemischten Garten", measurement: "Erfasse Quadratmeter Rasen, Meter Hecke, Beetfläche und den Durchfluss am späteren Anschluss zu einer realistischen Tageszeit.", calculation: "Ein gemessener Durchfluss von 18 l/min wird mit 20 Prozent Reserve als höchstens 14,4 l/min planbarer Zonenbedarf angesetzt.", result: "jede gleichzeitig laufende Zone bleibt im Beispiel unter 14 l/min.", optionA: "Zwei manuell geschaltete Zonen", optionB: "Kompakter Bewässerungscomputer mit drei Zonen", advice: ["Tropfrohr und Regner laufen getrennt.", "Kurze Leitungswege reduzieren unnötige Druckverluste.", "Eine einfache Absperrung erleichtert Wartung und Winterentleerung."], caution: "Der Eimer-Test misst Durchfluss, ersetzt aber bei druckabhängigen Regnern keine Prüfung des Fließdrucks.",
  },
  {
    slug: "bewaesserung-500-qm-garten", title: "Bewässerung für 500 m² Garten dimensionieren", description: "Bewässerung für 500 Quadratmeter planen: Flächenaufteilung, Wasserbedarf, Durchfluss, Regner, Tropfzonen und Laufzeiten nachvollziehbar berechnen.", heading: "500 m² Garten bewässern: in hydraulische Zonen teilen", intro: "Auf 500 m² ist nicht die Gesamtfläche gleichzeitig zu bewässern. Vegetation, Geometrie und Anschlussleistung bestimmen mehrere zeitlich getrennte Kreise.", takeaway: "Teile Rasen, Beete und Hecken nach Bedarf. Dimensioniere jede Zone unter dem gemessenen Durchfluss und prüfe Druckverlust sowie Laufzeit separat.", scenario: "einen Garten mit ungefähr 500 m²", measurement: "Zerlege die 500 m² in Rasen-, Beet-, Hecken- und nicht zu bewässernde Flächen und miss Durchfluss sowie Fließdruck.", calculation: "Bei 320 m² Rasen, 100 m² Beeten und 80 m² Wegen werden nur 420 m² bewässert; ein 20-l/min-Anschluss wird mit Reserve auf 16 l/min je Zone begrenzt.", result: "mehrere Regner- und Tropfzonen mit jeweils höchstens etwa 16 l/min im Beispiel.", optionA: "Mehrere zeitgesteuerte Zonen", optionB: "Größere zentrale Versorgung mit Fachauslegung", advice: ["Regner werden nach realer Wurfweite und Überlappung positioniert.", "Lange Hecken erhalten druckkompensierende oder passend zonierte Tropfleitungen.", "Laufzeiten werden saisonal angepasst statt nur einmal programmiert."], caution: "Eine Flächenzahl ohne Anschlussmessung erlaubt keine verlässliche Zahl gleichzeitig betriebener Regner.",
  },
  {
    slug: "tropfbewaesserung-fuer-beete", title: "Tropfbewässerung für Beete planen und berechnen", description: "Tropfbewässerung für Gemüse- und Staudenbeete planen: Reihen, Tropferabstand, Leitungslänge, Durchfluss, Filter, Druck und Zonen berechnen.", heading: "Tropfbewässerung im Beet: Pflanzenreihen statt Quadratmeter", intro: "Im Beet folgt die Tropfleitung den Pflanzreihen. Leitungslänge und Tropferzahl sind deshalb belastbarer als eine pauschale Menge pro Quadratmeter.", takeaway: "Skizziere Reihen und Abstände, ermittle den Durchfluss jeder Leitung und bilde Zonen unter dem verfügbaren Anschlusswert.", scenario: "Tropfbewässerung in mehreren Beeten", measurement: "Miss jede Pflanzreihe, den Abstand zwischen parallelen Leitungen und die Entfernung zum Verteiler; notiere Tropferabstand und Abgabe des Produkts.", calculation: "Vier Leitungen à 12 m mit Tropfern alle 0,30 m ergeben rund 160 Tropfstellen; bei 2 l/h je Tropfer entstehen 320 l/h beziehungsweise 5,3 l/min.", result: "etwa 5,3 l/min Zonenbedarf plus Zuleitung und systemabhängige Reserve.", optionA: "Tropfrohr mit integrierten Tropfern", optionB: "Einzeltropfer an Verteilerleitungen", advice: ["Filter und Druckminderung müssen zum System passen.", "Leitungsenden bleiben für Spülung zugänglich.", "Pflanzen mit stark unterschiedlichem Bedarf erhalten getrennte Zonen."], caution: "Die nominelle Tropferabgabe gilt nur im freigegebenen Druckbereich und kann über lange Strecken variieren.",
  },
  {
    slug: "bewaesserung-fuer-hochbeete", title: "Bewässerung für Hochbeete richtig planen", description: "Hochbeet-Bewässerung planen: Tropfrohr, Perlschlauch, Topfbewässerung, Wasserbedarf, Druck, Zonen und sichere Leitungsführung vergleichen.", heading: "Hochbeete bewässern: kurze Zonen, gleichmäßige Abgabe", intro: "Hochbeete trocknen je nach Aufbau und Standort schneller aus. Gleichzeitig sollten kleine Flächen nicht mit zu hoher Abgabe überflutet werden.", takeaway: "Plane jedes Hochbeet nach Länge, Pflanzung und Sonneneinstrahlung. Kurze, regelbare Tropfzonen sind meist transparenter als eine gemeinsame lange Leitung.", scenario: "mehrere Hochbeete", measurement: "Miss Beetinnenmaß, Höhenunterschied zum Anschluss, Sonnenlage und geplante Leitungsreihen; ordne Pflanzen nach ähnlichem Wasserbedarf.", calculation: "Drei Hochbeete mit je zwei 3-m-Tropfleitungen ergeben 18 m Leitung; bei 6 Tropfern pro Meter und 2 l/h entstehen 216 l/h beziehungsweise 3,6 l/min.", result: "rund 3,6 l/min gemeinsamer Bedarf, wenn alle drei Beete gleichzeitig laufen.", optionA: "Eine regelbare Zone für alle Hochbeete", optionB: "Einzelventile je Hochbeet", advice: ["Jedes Beet erhält eine absperr- oder regelbare Zuleitung.", "Mulch und Bodenaufbau beeinflussen die notwendige Laufzeit.", "Leitungen werden so befestigt, dass sie bei Pflegearbeiten sichtbar bleiben."], caution: "Unterschiedliche Sonnenlagen oder Kulturen können trotz gleicher Beetgröße getrennte Laufzeiten erfordern.",
  },
  {
    slug: "bewaesserung-bei-wenig-wasserdruck", title: "Gartenbewässerung bei wenig Wasserdruck planen", description: "Bewässerung bei niedrigem Wasserdruck planen: Durchfluss und Fließdruck messen, Zonen verkleinern, Tropfsysteme und Pumpenbedarf korrekt prüfen.", heading: "Wenig Wasserdruck: erst messen, dann Zonen verkleinern", intro: "Ein schwacher Wasserstrahl kann an geringem Druck, kleinem Leitungsquerschnitt, langem Schlauch oder parallelen Verbrauchern liegen.", takeaway: "Miss Durchfluss und Fließdruck am Einsatzort. Reduziere den gleichzeitigen Zonenbedarf, bevor du eine Pumpe oder neue Verbraucher auswählst.", scenario: "Bewässerung mit begrenztem Anschluss", measurement: "Führe Eimer-Test und Druckmessung mit dem später verwendeten Schlauch und bei typischer gleichzeitiger Hausnutzung durch.", calculation: "Füllt ein 10-l-Eimer in 50 Sekunden, stehen 12 l/min zur Verfügung; mit 25 Prozent Reserve werden höchstens 9 l/min je Zone geplant.", result: "kleine Zonen unter 9 l/min und ein separater Nachweis des erforderlichen Fließdrucks.", optionA: "Mehr kleine, nacheinander laufende Zonen", optionB: "Technisch geprüfte Druckerhöhung", advice: ["Schlauchquerschnitt und Länge werden vor einer Pumpenentscheidung geprüft.", "Tropfsysteme können bei passendem Druckbereich sparsamer zoniert werden.", "Filter und Ventile verursachen zusätzliche Druckverluste."], caution: "Eine Pumpe darf nicht ungeprüft an jede Versorgung angeschlossen werden; Quelle, Zulauf und zulässiger Druck müssen passen.",
  },
]);

const greenhouseGuides = guides(clusters.greenhouse, [
  {
    slug: "gewaechshaus-fuer-gurken", title: "Gewächshaus für Gurken: Größe und Lüftung planen", description: "Gewächshaus für Gurken planen: Beetbreite, Rankhöhe, Pflanzenabstand, Weg, Lüftung, Feuchte und Bewässerung sinnvoll dimensionieren.", heading: "Gurken im Gewächshaus: Höhe, Luft und Zugang einplanen", intro: "Gurken nutzen Höhe und bilden viel Blattmasse. Zu enge Pflanzung erschwert Luftbewegung, Pflege und Ernte.", takeaway: "Plane Rankhöhe, erreichbare Pflanzenreihen und großzügige Lüftung. Die Zahl der Pflanzen folgt der nutzbaren Beetlänge, nicht der gesamten Grundfläche.", scenario: "Gurken im Gewächshaus", measurement: "Lege Rankrichtung, Beetlänge, Pflanzenabstand, Wegbreite und erreichbare Höhe fest; markiere Dachfenster und Tür.", calculation: "Zwei 3-m-Beetreihen mit beispielhaft 0,60 m Pflanzenabstand bieten rechnerisch je fünf Plätze, insgesamt zehn Gurkenpflanzen.", result: "zehn Pflanzplätze vor Anpassung an Sorte, Kulturführung und lokales Klima.", optionA: "Eine breite Gurkenreihe", optionB: "Zwei schmale Reihen mit Mittelweg", advice: ["Rankhilfen müssen sicher an der Konstruktion befestigt werden dürfen.", "Blätter dürfen Dachfenster nicht blockieren.", "Bewässerung erfolgt bodennah und ohne dauerhaft nasse Blätter."], caution: "Pflanzenabstände und Temperaturführung hängen von Sorte und Kulturmethode ab und sind keine festen Bauwerte.",
  },
  {
    slug: "gewaechshaus-fuer-tomaten-und-gurken", title: "Gewächshaus für Tomaten und Gurken gemeinsam planen", description: "Gewächshaus für Tomaten und Gurken aufteilen: Beetfläche, Pflanzenabstände, Wege, Höhe, Lüftung und getrennte Bewässerung planen.", heading: "Tomaten und Gurken: gemeinsames Haus, getrennte Pflegezonen", intro: "Tomaten und Gurken können ein Gewächshaus teilen, stellen aber unterschiedliche Ansprüche an Luft, Feuchte und Pflege.", takeaway: "Ordne Kulturen in getrennten Beetbereichen an, halte den Weg frei und plane Lüftung sowie Bewässerung regelbar. Vermeide eine maximale Belegung ohne Luftreserve.", scenario: "Tomaten und Gurken in einem Gewächshaus", measurement: "Teile Beetlängen nach Kultur, notiere Pflanzenabstände, Rankhöhe, Lüftungsöffnungen und einen erreichbaren Mittelweg.", calculation: "In zwei 3-m-Reihen passen bei 0,60 m Abstand beispielhaft fünf Tomaten und fünf Gurken, wenn jede Kultur eine eigene Reihe erhält.", result: "zehn Pflanzen als Ausgangsplan mit getrennten Bewässerungs- und Pflegebereichen.", optionA: "Je eine Kultur pro Beetseite", optionB: "Getrennte Gewächshausbereiche", advice: ["Tomatenblätter bleiben von dauerhaft hoher Feuchte geschützt.", "Gurken erhalten stabile Rankhilfen und bodennahe Bewässerung.", "Dachfenster und Tür erzeugen einen nutzbaren Luftweg über beide Bereiche."], caution: "Ein enger Mischbestand erhöht nicht automatisch den Ertrag und kann Krankheiten sowie Pflegeprobleme begünstigen.",
  },
  {
    slug: "gewaechshaus-klein-2x3-meter", title: "Kleines Gewächshaus 2 × 3 m sinnvoll einrichten", description: "Gewächshaus mit 2 × 3 Metern planen: Beetbreiten, Mittelweg, Pflanzenzahl, Tür, Lüftung, Regale und nutzbare Anbaufläche berechnen.", heading: "Gewächshaus 2 × 3 Meter: sechs Quadratmeter klar aufteilen", intro: "Auf sechs Quadratmetern entscheidet eine saubere Wege- und Beetaufteilung, ob Pflanzen erreichbar bleiben und die Tür frei öffnet.", takeaway: "Plane zwei schmale Beete und einen ausreichend breiten Mittelweg. Nutze Regale nur dort, wo sie Licht und Lüftung nicht verschlechtern.", scenario: "ein Gewächshaus mit 2 × 3 Metern", measurement: "Übertrage reale Innenbreite, Türlichte, Fundamentprofil und Wandneigung; zeichne Beete und Weg maßstäblich ein.", calculation: "Bei 2,0 m Innenbreite ergeben zwei 0,65-m-Beete und ein 0,70-m-Mittelweg genau 2,0 m; über 3 m Länge entstehen 3,9 m² Beetfläche.", result: "rund 3,9 m² nutzbare Beetfläche plus 2,1 m² Weg im vereinfachten Beispiel.", optionA: "Zwei Bodenbeete", optionB: "Ein Beet plus flexible Topf- und Regalzone", advice: ["Der Weg bleibt auch mit ausgewachsenen Pflanzen begehbar.", "Regale an der Sonnenseite können darunterliegende Kulturen verschatten.", "Automatische Fensteröffner brauchen freien Bewegungsraum."], caution: "Außenmaß, Profilbreite und schräge Wände können die angenommenen Innenmaße deutlich verändern.",
  },
  {
    slug: "gewaechshaus-automatisch-lueften", title: "Gewächshaus automatisch lüften: Fenster und Öffner planen", description: "Automatische Gewächshauslüftung planen: Dachfenster, Tür, temperaturgesteuerte Öffner, Beschattung, Luftweg und Ausfallsicherheit richtig kombinieren.", heading: "Gewächshaus automatisch lüften: Öffnungsfläche vor Technik", intro: "Automatische Fensteröffner reagieren ohne tägliches Eingreifen, können aber zu kleine oder schlecht platzierte Lüftungsflächen nicht ausgleichen.", takeaway: "Plane zuerst ausreichend Dach- und Zuluftöffnungen, dann passende Öffner. Kontrolliere Temperaturverhalten, Windschutz und manuelle Bedienbarkeit.", scenario: "eine automatische Gewächshauslüftung", measurement: "Erfasse Grundfläche, vorhandene Dachfenster, Tür- und Zuluftquerschnitt, Sonnenlage sowie freie Öffnungswege.", calculation: "Bei einem 12-m²-Gewächshaus und beispielhaft 20 Prozent geplanter Lüftungsfläche werden rund 2,4 m² wirksame Öffnung als Prüfwert angesetzt.", result: "ein zu verifizierender Lüftungsquerschnitt um 2,4 m², verteilt auf Ab- und Zuluft.", optionA: "Temperaturgesteuerte Dachfensteröffner", optionB: "Kombination aus Öffnern, Türlüftung und Beschattung", advice: ["Jeder Öffner muss zu Fenstergewicht und Hub passen.", "Hohe Abluft und tiefe Zuluft erzeugen einen nachvollziehbaren Luftweg.", "Beschattung reduziert Spitzenlast, ersetzt aber keine Lüftung."], caution: "Der Prozentwert ist eine Planungsannahme; Herstellerkonstruktion, Kultur und lokales Klima bestimmen die reale Auslegung.",
  },
]);

const screenGuides = guides(clusters.screen, [
  {
    slug: "sichtschutz-10-meter-berechnen", title: "Sichtschutz für 10 Meter berechnen: Elemente und Pfosten", description: "Sichtschutz für eine 10 Meter lange Strecke berechnen: Elementbreite, Pfosten, Fugen, Restfeld, Ecken, Tor und Fundamente nachvollziehbar planen.", heading: "10 Meter Sichtschutz: Raster und Restfeld sauber aufteilen", intro: "Zehn Meter Strecke ergeben nur selten eine ganze Zahl aus Standardelementen, Pfosten und Fugen. Das Restmaß muss bewusst verteilt werden.", takeaway: "Rechne Element und Pfosten als gemeinsames Raster. Plane Enden, Ecken und Tor separat und verteile das Restmaß symmetrisch oder in einem angepassten Feld.", scenario: "eine 10 Meter lange Sichtschutzstrecke", measurement: "Miss die tatsächliche Flucht zwischen festen Endpunkten und markiere Ecken, Gefälle, Tor sowie gewünschte Pfostenpositionen.", calculation: "Fünf 1,80-m-Elemente plus sechs 0,09-m-Pfosten ergeben 9,54 m; zu 10,00 m fehlen 0,46 m einschließlich notwendiger Fugen.", result: "ein anzupassendes Restfeld von ungefähr 46 cm statt eines sechsten vollen Elements.", optionA: "Fünf Standardelemente mit Ausgleichsfeld", optionB: "Gleichmäßig gekürzte Felder", advice: ["Das Restmaß wird vor dem Fundamentieren festgelegt.", "Pfosten an Ecken und Toren werden nicht doppelt oder versehentlich ausgelassen.", "Gefälle verändert die vertikale, nicht automatisch die horizontale Teilung."], caution: "Nennbreiten können ohne Pfosten, Halter oder Montagefuge angegeben sein; das Systemmaß ist entscheidend.",
  },
  {
    slug: "sichtschutz-wpc-oder-holz", title: "Sichtschutz aus WPC oder Holz: direkter Vergleich", description: "WPC- und Holz-Sichtschutz vergleichen: Pflege, Wind, Gewicht, Ausdehnung, Reparatur, Pfosten, Fundament und vollständige Systemkosten prüfen.", heading: "WPC oder Holz beim Sichtschutz: Material und Tragwerk zusammen wählen", intro: "WPC ist oft pflegearm, Holz gut bearbeitbar und natürlich. Gewicht, Windangriffsfläche und systemspezifische Montage sind jedoch ebenso wichtig.", takeaway: "Vergleiche vollständige Systeme aus Füllung, Pfosten, Haltern und Fundament. Entscheide nach Pflegebereitschaft, Standort, Reparierbarkeit und Freigaben.", scenario: "einen Sichtschutz aus WPC oder Holz", measurement: "Erfasse Streckenlänge, Höhe, Windlage, Boden, Verschattung und die zugelassenen Feldbreiten der verglichenen Systeme.", calculation: "Bei 12 m Strecke und 1,80-m-Systemraster entstehen rechnerisch 6,67 Felder; die Teilung benötigt also sechs volle plus ein angepasstes Feld oder sieben angeglichene Felder.", result: "eine projektspezifische Feldteilung unabhängig vom gewählten Füllmaterial.", optionA: "Holz-Sichtschutz", optionB: "WPC-System", advice: ["Holz benötigt konstruktiven und je nach Optik regelmäßigen Oberflächenschutz.", "WPC braucht freigegebene Abstände für Wärmeausdehnung.", "Dichte Elemente erzeugen bei beiden Materialien erhebliche Windlasten."], caution: "Pfosten und Fundamente dürfen nicht nur nach dem Gewicht, sondern müssen nach kompletter Windbeanspruchung dimensioniert werden.",
  },
  {
    slug: "sichtschutz-bei-starkem-wind", title: "Sichtschutz bei starkem Wind sicher planen", description: "Sichtschutz in windiger Lage planen: offene und geschlossene Elemente, Höhe, Pfostenabstand, Fundamente, Tor und Herstellerfreigaben richtig prüfen.", heading: "Sichtschutz bei starkem Wind: Windfläche ist ein hartes Kriterium", intro: "Hohe, geschlossene Elemente wirken wie eine Segelfläche. Materialstärke allein sagt wenig über Pfosten, Verbindung und Fundament aus.", takeaway: "Erfasse Windlage, Höhe und Durchlässigkeit. Wähle nur ein vollständig freigegebenes System und lasse Pfosten sowie Fundamente passend zum Standort bemessen.", scenario: "einen Sichtschutz in windiger Lage", measurement: "Dokumentiere freie Anströmung, Gebäudecken, Hanglage, gewünschte Höhe, Elementdurchlässigkeit, Boden und Streckenenden.", calculation: "Eine 10 m lange und 1,8 m hohe geschlossene Wand bietet 18 m² Windangriffsfläche; offene Lamellen reduzieren sie nicht pauschal um einen festen Prozentsatz.", result: "18 m² zu bewertende Projektionsfläche im geschlossenen Ausgangsfall.", optionA: "Teiloffene Lamellenelemente", optionB: "Geschlossene Elemente mit nachgewiesenem Tragsystem", advice: ["Ecken und freie Endpfosten können besonders beansprucht sein.", "Tore erzeugen dynamische Lasten und benötigen eigene Beschläge.", "Fundamenttiefe und -form folgen Boden, Frost und Systemnachweis."], caution: "Eine Prozentannahme zur Winddurchlässigkeit ersetzt keine statische Bemessung oder Herstellerfreigabe.",
  },
  {
    slug: "sichtschutz-mit-gartentor", title: "Sichtschutz mit Gartentor: Teilung und Pfosten planen", description: "Sichtschutz mit Gartentor berechnen: lichte Torbreite, Pfosten, Beschläge, Restfelder, Gefälle, Schwenkraum und Fundamente richtig planen.", heading: "Gartentor im Sichtschutz: Öffnung zuerst festlegen", intro: "Ein Tor verändert das Raster und belastet seine Pfosten anders als ein festes Feld. Lichte Durchgangsbreite und Schwenkraum werden zuerst festgelegt.", takeaway: "Positioniere das Tor nach Laufweg und Gefälle. Rechne Torpfosten als eigenes Bauteil und verteile verbleibende Sichtschutzfelder erst danach.", scenario: "einen Sichtschutz mit Gartentor", measurement: "Miss benötigte lichte Breite, Öffnungsrichtung, Bodengefälle, Beschlagraum und die verbleibenden Strecken links und rechts.", calculation: "Bei 8,0 m Gesamtstrecke, 1,10 m lichter Toröffnung und zwei 0,10-m-Torpfosten bleiben 6,70 m für Sichtschutzfelder und deren Pfosten.", result: "6,70 m separat aufzuteilende Reststrecke nach der Torzone.", optionA: "Einflügeliges Tor", optionB: "Breiteres oder zweiflügeliges Tor", advice: ["Der Flügel darf nicht gegen Gefälle, Stufe oder Pflanze laufen.", "Torpfosten und Beschläge müssen Gewicht sowie Wind aufnehmen.", "Die lichte Breite wird nach eingebauten Beschlägen kontrolliert."], caution: "Ein Standardfeld darf nicht ohne Systemfreigabe allein durch Scharniere zum Tor umgebaut werden.",
  },
]);

const carportGuides = guides(clusters.carport, [
  {
    slug: "carport-fuer-suv", title: "Carport für SUV: Breite, Höhe und Rangierraum", description: "Carport für einen SUV dimensionieren: Fahrzeugmaße, Spiegel, Türen, Dachbox, lichte Höhe, Pfosten und Zufahrt realistisch planen.", heading: "SUV unter dem Carport: lichte Maße statt Dachmaß", intro: "SUV unterscheiden sich stark bei Breite, Höhe, Wendekreis und Dachaufbauten. Das beworbene Carport-Außenmaß ist nicht die nutzbare Durchfahrt.", takeaway: "Miss das konkrete Fahrzeug mit Spiegeln und geöffneter Tür. Ergänze Rangierreserve, Pfosten, Rinne und mögliche Dachbox zur lichten Planung.", scenario: "einen SUV-Stellplatz", measurement: "Erfasse Fahrzeuglänge, Spiegelbreite, Höhe mit Dachaufbau, Türöffnungsraum und den Anfahrwinkel zwischen festen Hindernissen.", calculation: "Ein 2,05 m breiter SUV plus je 0,75 m Ausstiegsraum benötigt rechnerisch 3,55 m freie Breite, bevor Pfosten oder Seitenwand berücksichtigt werden.", result: "mindestens rund 3,55 m nutzbare Breite im Komfortbeispiel.", optionA: "Kompakter Einzelcarport", optionB: "Breiter Komfortcarport", advice: ["Die engste Pfostenweite ist entscheidend.", "Eine Dachbox wird in die lichte Höhe eingerechnet.", "Rinne und Fallrohr dürfen weder Tür noch Rangierlinie blockieren."], caution: "Fahrzeugmaße aus Prospekten können ohne Spiegel oder Dachaufbau angegeben sein und müssen am realen Fahrzeug geprüft werden.",
  },
  {
    slug: "einzelcarport-oder-doppelcarport", title: "Einzelcarport oder Doppelcarport: Maße vergleichen", description: "Einzel- und Doppelcarport vergleichen: Fahrzeugbreite, Türen, Mittelpfosten, Rangieren, Zusatzfläche, Dachwasser, Fundament und Kosten prüfen.", heading: "Einzel- oder Doppelcarport: Fahrzeuge und Bewegungsraum entscheiden", intro: "Zwei Einzelcarports können klare Trennung bieten; ein Doppelcarport vermeidet je nach System störende Mittelpfosten und schafft flexible Fläche.", takeaway: "Zeichne beide Fahrzeuge mit geöffneten Türen und Fahrwegen. Vergleiche lichte Breiten, Pfosten, Dachentwässerung und spätere Nutzbarkeit mit identischen Annahmen.", scenario: "einen Einzel- oder Doppelcarport", measurement: "Miss beide Fahrzeuge, Türöffnungen, gleichzeitigen Ein- und Ausstieg, Zufahrtsbreite und mögliche Pfostenlinien.", calculation: "Zwei je 2,0 m breite Fahrzeuge plus außen je 0,7 m und mittig 1,0 m Bewegungsraum ergeben rund 6,4 m nutzbare Gesamtbreite.", result: "etwa 6,4 m lichte Breite für komfortable parallele Nutzung im Beispiel.", optionA: "Zwei Einzelcarports", optionB: "Ein gemeinsamer Doppelcarport", advice: ["Ein Mittelpfosten kann Türen und Rangieren einschränken.", "Eine große Dachfläche braucht einen klaren Entwässerungsweg.", "Spätere Fahrzeuggrößen und Fahrradzugang werden als Reserve benannt."], caution: "Größere Spannweiten und Dachflächen verändern Tragwerk, Fundamente und Genehmigungsprüfung wesentlich.",
  },
  {
    slug: "carport-mit-abstellraum", title: "Carport mit Abstellraum: Größe und Zugang planen", description: "Carport mit Abstellraum dimensionieren: Fahrzeug, Tür, Fahrräder, Mülltonnen, Geräte, Boden, Lüftung und getrennte Zugänge sinnvoll planen.", heading: "Carport mit Abstellraum: Stellplatz und Lager getrennt prüfen", intro: "Ein integrierter Abstellraum spart ein zusätzliches Gebäude, reduziert aber Stell- oder Rangierfläche und braucht einen sicheren Zugang.", takeaway: "Plane Fahrzeug und Lagerraum als zwei Funktionszonen. Die Tür des Abstellraums darf weder Auto noch Fahrweg blockieren.", scenario: "einen Carport mit Abstellraum", measurement: "Zeichne Fahrzeug, geöffnete Türen, Lagergut, Regale, Abstellraumtür und Zugang von Garten oder Zufahrt im selben Plan.", calculation: "Ein 2,0 × 3,0 m Abstellraum bietet 6 m² Bruttofläche; zwei 0,5 m tiefe Regalwände reduzieren die freie Bodenfläche um bis zu 3 m².", result: "etwa 3 m² freie Lager- und Bewegungsfläche bei beidseitigen Regalen im Beispiel.", optionA: "Abstellraum am Carportende", optionB: "Seitlicher Abstellraum mit separatem Gartenzugang", advice: ["Fahrräder brauchen eine ausreichend breite, schwellenarme Tür.", "Feuchte Geräte benötigen Lüftung und einen geeigneten Boden.", "Brandlasten und elektrische Installationen werden bewusst eingeordnet."], caution: "Der geschlossene Raum kann rechtliche, brandschutztechnische und statische Anforderungen des offenen Carports verändern.",
  },
]);

const floorGuides = guides(clusters.floor, [
  ...[20, 50].map((area): ScenarioSeed => ({
    slug: `laminat-fuer-${area}-qm`, title: `Laminat für ${area} m² berechnen: Pakete und Verschnitt`, description: `Laminat für ${area} Quadratmeter berechnen: Raumfläche, Verschnitt, Paketinhalt, Verlegerichtung, Sockelleisten und Unterlage nachvollziehbar planen.`, heading: `Laminat für ${area} m²: von der Fläche zur Paketanzahl`, intro: `Bei ${area} m² Raumfläche entscheidet der passende Verschnitt und die Rundung auf ganze Pakete über die Bestellmenge.`, takeaway: `Ermittle die Nettofläche aus realen Teilmaßen. Ergänze begründeten Verschnitt und teile erst danach durch den Paketinhalt; aufgerundet wird am Ende.`, scenario: `${area} m² Laminatfläche`, measurement: "Zerlege den Grundriss in Rechtecke und ergänze Nischen sowie Türlaibungen; feste Einbauten werden nur nach klarem Verlegeplan abgezogen.", calculation: `${area} m² × 1,08 Verschnitt = ${(area * 1.08).toFixed(1).replace(".", ",")} m²; geteilt durch 2,22 m² pro Beispielpaket ergibt ${(area * 1.08 / 2.22).toFixed(2).replace(".", ",")} Pakete.`, result: `${Math.ceil(area * 1.08 / 2.22)} ganze Pakete beziehungsweise ${(Math.ceil(area * 1.08 / 2.22) * 2.22).toFixed(2).replace(".", ",")} m² bestellte Fläche im Beispiel.`, optionA: "Gerader Raum mit 8 Prozent Verschnitt", optionB: "Komplexer Grundriss mit höherer Reserve", advice: ["Paketinhalt wird vom ausgewählten Produkt übernommen.", "Restpakete können für spätere Reparaturen sinnvoll sein.", "Sockelleisten werden nach Umfang und nicht nach Bodenfläche gerechnet."], caution: "Der Beispiel-Verschnitt von acht Prozent muss an Raumform, Dielenformat und Verlegerichtung angepasst werden.",
  })),
  {
    slug: "vinyl-klick-oder-kleben", title: "Vinyl klicken oder kleben: Aufbau und Nutzung vergleichen", description: "Klickvinyl und Klebevinyl vergleichen: Untergrund, Aufbauhöhe, Feuchte, Fußbodenheizung, Reparatur, Trittschall und Verlegeaufwand prüfen.", heading: "Klick- oder Klebevinyl: Der Untergrund entscheidet mit", intro: "Klickvinyl wird schwimmend verlegt, Klebevinyl vollflächig verbunden. Aufbauhöhe und Untergrundvorbereitung unterscheiden sich deutlich.", takeaway: "Prüfe Ebenheit, Feuchte, Heizung und erlaubten Systemaufbau. Vergleiche danach Verlegung, Reparatur und Gesamtkosten einschließlich Untergrundarbeiten.", scenario: "Klick- oder Klebevinyl", measurement: "Erfasse Raumfläche, Ebenheitsabweichungen, Restfeuchte, vorhandene Aufbauhöhe, Türanschlüsse und Fußbodenheizung.", calculation: "Auf 30 m² können 2 mm zusätzliche Aufbauhöhe bereits Tür- und Übergangsdetails beeinflussen; beide Varianten werden deshalb als vollständiger Schichtaufbau verglichen.", result: "eine Systementscheidung nach Untergrund und Anschlussdetails statt nur nach Dekor oder Quadratmeterpreis.", optionA: "Klickvinyl", optionB: "Klebevinyl", advice: ["Schwimmende Systeme benötigen Bewegungsfugen und passende Unterlage.", "Klebesysteme verlangen einen besonders vorbereiteten Untergrund.", "Wärmedurchlasswiderstand wird für den gesamten Aufbau geprüft."], caution: "Nicht jedes Vinyl ist für Nassräume, Fußbodenheizung oder vorhandene Altbeläge freigegeben.",
  },
  {
    slug: "bodenbelag-fuer-kueche", title: "Bodenbelag für die Küche: Auswahl und Menge planen", description: "Bodenbelag für die Küche auswählen: Feuchte, Flecken, Stühle, Fußbodenheizung, Untergrund, Einbauküche, Übergänge und Materialmenge prüfen.", heading: "Küchenboden planen: Nutzung und Aufbau vor Optik", intro: "In der Küche treffen Feuchte, Flecken, Stuhlrollen, schwere Möbel und viele Randdetails aufeinander. Nicht jeder schöne Boden passt zum freigegebenen Aufbau.", takeaway: "Wähle den Boden nach Feuchtebeständigkeit, Reinigung, Untergrund und Herstellerfreigabe. Lege danach fest, ob unter der Einbauküche verlegt wird, und berechne die Fläche konsistent.", scenario: "einen Bodenbelag für die Küche", measurement: "Miss die Raumfläche, Sockelverlauf, Türbereiche, feste Inseln, Heizflächen und Übergänge; dokumentiere den geplanten Verlegebereich.", calculation: "Eine 16-m²-Küche mit 3-m² fester Insel bleibt je nach System entweder bei 16 m² Verlegefläche oder wird begründet auf 13 m² reduziert; beide Varianten erhalten separaten Verschnitt.", result: "eine eindeutig dokumentierte Bestellfläche statt eines unklaren pauschalen Abzugs.", optionA: "Feuchteresistentes Klicksystem", optionB: "Vollflächig geklebter Belag", advice: ["Fugen und Schnittkanten müssen zur Küchennutzung freigegeben sein.", "Stuhl- und Rollenbelastung wird in der Nutzungsklasse berücksichtigt.", "Übergänge und Sockelleisten werden vor Küchenmontage abgestimmt."], caution: "Schwimmende Böden dürfen nicht ungeprüft unter fest eingebauten Küchen oder Inseln eingeklemmt werden.",
  },
]);

const drywallGuides = guides(clusters.drywall, [
  {
    slug: "trockenbauwand-3-meter", title: "Trockenbauwand mit 3 Metern Länge berechnen", description: "Material für eine 3 Meter lange Trockenbauwand berechnen: Fläche, Plattenlagen, Profile, Ständer, Dämmung, Schrauben und Verschnitt planen.", heading: "Drei Meter Trockenbauwand: Materialrahmen transparent rechnen", intro: "Eine kurze Wand ist rechnerisch einfach, doch Raumhöhe, Plattenlagen, Profilraster und Randanschlüsse bestimmen die tatsächlichen Mengen.", takeaway: "Rechne beide Wandseiten und jede Plattenlage separat. Profile folgen dem freigegebenen Raster; Öffnungen und Verstärkungen kommen als eigene Positionen hinzu.", scenario: "eine 3 Meter lange Trockenbauwand", measurement: "Miss Länge und Höhe an mehreren Punkten, prüfe Boden und Decke und markiere Anschlüsse, Installationen sowie spätere Lasten.", calculation: "3,0 m Länge × 2,5 m Höhe × zwei Seiten × eine Lage ergeben 15 m² Plattenfläche; mit 10 Prozent Verschnitt 16,5 m².", result: "16,5 m² Plattenbedarf im einlagigen Beispiel, auf ganze Plattenformate aufzurunden.", optionA: "Einlagige Beplankung", optionB: "Doppelte Beplankung", advice: ["UW-Randprofile werden nach Boden und Decke gerechnet.", "CW-Ständerzahl folgt Raster und Endanschlüssen.", "Schall- oder Brandschutz kann ein geprüftes abweichendes System verlangen."], caution: "Ein pauschales 62,5-cm-Raster darf nicht ohne Prüfung von Plattenformat, Höhe und Systemfreigabe übernommen werden.",
  },
  {
    slug: "trockenbauwand-mit-tuer", title: "Trockenbauwand mit Tür berechnen und planen", description: "Trockenbauwand mit Tür berechnen: Öffnungsmaß, Türständer, Sturzprofil, Plattenzuschnitt, Verstärkung, Anschlüsse und Materialbedarf planen.", heading: "Trockenbauwand mit Tür: Öffnung als eigenes Tragdetail", intro: "Eine Tür wird nicht nur von der Plattenfläche abgezogen. Sie benötigt abgestimmte Ständer, Sturz, Befestigung und Anschlüsse.", takeaway: "Lege Türsystem und Öffnungsmaß zuerst fest. Ergänze verstärkte Profile und Sturz, bevor Plattenfläche und Zuschnitt optimiert werden.", scenario: "eine Trockenbauwand mit Tür", measurement: "Erfasse Wandmaß, Rohbauöffnung, Türblattgewicht, Zarge, Anschlagrichtung, Installationen und Abstand zu Wandenden.", calculation: "Bei 4 × 2,5 m Wand entstehen beidseitig 20 m²; eine 1 × 2,1 m Öffnung reduziert rechnerisch 4,2 m², benötigt aber zusätzliche Zuschnitte und Profile.", result: "15,8 m² Netto-Plattenfläche vor Verschnitt plus separates Türprofil- und Sturzpaket.", optionA: "Leichte Innentür mit Systemprofilen", optionB: "Schwere Tür mit verstärkter Unterkonstruktion", advice: ["Türblattgewicht und Zarge bestimmen die Verstärkung.", "Plattenfugen enden nicht ungeprüft direkt an Öffnungsecken.", "Schalter und Leitungen werden mit Türständern koordiniert."], caution: "Die Öffnung darf nicht pauschal abgezogen werden, ohne Zusatzmaterial und ungünstigere Zuschnitte einzurechnen.",
  },
  {
    slug: "trockenbau-schallschutzwand", title: "Trockenbau-Schallschutzwand richtig planen", description: "Trockenbauwand für Schallschutz planen: Profile, Dämmung, Plattenlagen, Anschlüsse, Installationen, Türen und geprüfte Systemwerte einordnen.", heading: "Schallschutz im Trockenbau: Das komplette System zählt", intro: "Mehr Platten oder dickere Dämmung allein garantieren keinen bestimmten Schallschutz. Flanken, Fugen, Tür und Installationen beeinflussen das Ergebnis.", takeaway: "Wähle einen geprüften Wandaufbau für das Schutzziel. Übernimm Profile, Dämmung, Lagen, Schrauben und Anschlüsse als vollständiges System.", scenario: "eine Trockenbau-Schallschutzwand", measurement: "Dokumentiere Wandlänge, Höhe, angrenzende Bauteile, Türen, Steckdosen, Leitungen und das gewünschte akustische Schutzziel.", calculation: "Eine 5 × 2,6 m Wand hat je Seite 13 m²; bei zwei Lagen auf beiden Seiten entstehen 52 m² Beplankung vor Verschnitt.", result: "52 m² Plattenfläche plus systemgebundene Dämmung, Profile, Dichtungen und Befestigung.", optionA: "Einfaches Standardständerwerk", optionB: "Geprüftes Schallschutzsystem", advice: ["Randanschlüsse werden nach System elastisch und luftdicht ausgeführt.", "Gegenüberliegende Steckdosen können die Leistung schwächen.", "Tür und flankierende Bauteile müssen zum Schutzziel passen."], caution: "Ein bewertetes Schalldämmmaß aus dem Datenblatt gilt nur für den beschriebenen Prüfaufbau und nicht automatisch für die Baustelle.",
  },
]);

const dehumidifierGuides = guides(clusters.dehumidifier, [
  ...[20, 50, 100].map((area): ScenarioSeed => ({
    slug: `luftentfeuchter-fuer-${area}-qm`, title: `Luftentfeuchter für ${area} m²: Leistung richtig wählen`, description: `Luftentfeuchter für ${area} Quadratmeter auswählen: Raumvolumen, Temperatur, Feuchtelast, Liter pro Tag, Geräusch und Stromverbrauch einordnen.`, heading: `Luftentfeuchter für ${area} m²: Volumen und Feuchtelast statt Fläche`, intro: `Eine Raumgröße von ${area} m² ist nur zusammen mit Höhe, Temperatur und Feuchteursache aussagekräftig. Herstellerwerte werden unter bestimmten Prüfbedingungen gemessen.`, takeaway: `Berechne das Raumvolumen und protokolliere Temperatur sowie Feuchte. Vergleiche Geräte anhand realistischer Leistungsdaten, Hygrostat, Geräusch, Ablauf und Laufzeit.`, scenario: `einen Raum mit ${area} m²`, measurement: "Miss Länge, Breite und mittlere Höhe und protokolliere relative Feuchte sowie Temperatur morgens und abends über mehrere Tage.", calculation: `${area} m² × 2,5 m Raumhöhe ergeben ${area * 2.5} m³ Raumvolumen; dieser Wert wird mit Temperatur und Feuchtelast bewertet.`, result: `${area * 2.5} m³ zu behandelndes Raumvolumen im Beispiel, nicht automatisch eine feste Liter-pro-Tag-Klasse.`, optionA: "Kompaktes Kompressorgerät", optionB: "Leistungsstärkeres Gerät mit Ablauf", advice: ["Liter-pro-Tag-Werte werden nur bei vergleichbaren Temperatur- und Feuchtebedingungen bewertet.", "Ein Hygrostat verhindert unnötigen Dauerbetrieb.", "Dauerablauf und Tankgröße müssen zur unbeaufsichtigten Nutzung passen."], caution: "Bei niedriger Temperatur kann die reale Leistung deutlich von einem bei warmen Testbedingungen beworbenen Maximalwert abweichen.",
  })),
  {
    slug: "luftentfeuchter-fuer-badezimmer", title: "Luftentfeuchter fürs Badezimmer: Bedarf und Sicherheit", description: "Luftentfeuchter im Badezimmer planen: Raumvolumen, Duschfeuchte, Lüftung, elektrische Sicherheit, Geräusch, Hygrostat und Aufstellung prüfen.", heading: "Luftentfeuchter im Bad: Feuchtespitze und sichere Aufstellung", intro: "Im Badezimmer entsteht kurzzeitig viel Wasserdampf. Entscheidend ist, ob Lüftung und Heizung die Feuchte ausreichend abführen können.", takeaway: "Protokolliere den Feuchteabfall nach dem Duschen und kläre die Ursache. Nutze nur Geräte und Aufstellorte, die für die elektrische Umgebung ausdrücklich geeignet sind.", scenario: "ein Badezimmer mit hoher Feuchtespitze", measurement: "Berechne Raumvolumen und miss Feuchte direkt nach Nutzung sowie nach 30, 60 und 120 Minuten bei dokumentierter Lüftung.", calculation: "Ein 8-m²-Bad mit 2,5 m Höhe besitzt 20 m³ Volumen; fällt die Feuchte trotz korrekter Lüftung über zwei Stunden kaum, besteht weiterer Prüfbedarf.", result: "20 m³ Raumvolumen plus ein zeitlicher Feuchteverlauf als Auswahlgrundlage.", optionA: "Lüftungsroutine ohne Zusatzgerät", optionB: "Geeigneter Entfeuchter außerhalb kritischer Nassbereiche", advice: ["Das Gerät darf Fluchtweg und Luftzirkulation nicht blockieren.", "Tank und Filter müssen leicht und hygienisch erreichbar sein.", "Geräusch ist bei Nutzung nahe Wohn- oder Schlafräumen relevant."], caution: "Schutzbereiche, Steckdosen und Geräteeignung im Bad müssen fachgerecht geprüft werden; ein normales Haushaltsgerät ist nicht automatisch überall zulässig.",
  },
]);

export const SEO_GUIDES_SCENARIOS: readonly SeoGuide[] = [
  ...gardenHouseGuides,
  ...mowerGuides,
  ...terraceGuides,
  ...irrigationGuides,
  ...greenhouseGuides,
  ...screenGuides,
  ...carportGuides,
  ...floorGuides,
  ...drywallGuides,
  ...dehumidifierGuides,
];
