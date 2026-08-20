import type { SeoGuide } from "@/lib/seo-guides";
import { GUIDE_SOURCE_LIBRARY, type GuideSource } from "@/lib/guide-enrichments";
import { getSeoTopic, SEO_TOPICS } from "@/lib/seo-topics";

type Scores = readonly [number, number, number, number, number];

type DecisionOption = {
  slug: string;
  label: string;
  summary: string;
  strengths: string;
  limits: string;
  evidence: readonly [string, string, string, string, string];
  scores: Scores;
};

type DecisionContext = {
  slug: string;
  label: string;
  searchLabel: string;
  situation: string;
  priority: string;
  risk: string;
  weights: Scores;
};

type DecisionCluster = {
  topicSlug: string;
  noun: string;
  directoryTitle: string;
  directoryDescription: string;
  measurement: string;
  verification: string;
  limitation: string;
  criteria: readonly [string, string, string, string, string];
  options: readonly [DecisionOption, DecisionOption, DecisionOption, DecisionOption, DecisionOption];
  contexts: readonly DecisionContext[];
  sources: readonly GuideSource[];
};

export type DecisionGuide = SeoGuide & {
  topicSlug: string;
  pairSlug: string;
  pairLabel: string;
  contextSlug: string;
  contextLabel: string;
  optionA: string;
  optionB: string;
  scoreA: number;
  scoreB: number;
  qualitySignature: string;
};

export type DecisionGuideDirectory = {
  topicSlug: string;
  title: string;
  description: string;
  guides: readonly DecisionGuide[];
};

const option = (
  slug: string,
  label: string,
  summary: string,
  strengths: string,
  limits: string,
  evidence: DecisionOption["evidence"],
  scores: Scores,
): DecisionOption => ({ slug, label, summary, strengths, limits, evidence, scores });

const context = (
  slug: string,
  label: string,
  searchLabel: string,
  situation: string,
  priority: string,
  risk: string,
  weights: Scores,
): DecisionContext => ({ slug, label, searchLabel, situation, priority, risk, weights });

const clusters: readonly DecisionCluster[] = [
  {
    topicSlug: "gartenhaus",
    noun: "Gartenhaus",
    directoryTitle: "Gartenhaus-Materialien im direkten Vergleich",
    directoryDescription: "100 konkrete Gartenhaus-Vergleiche für Nutzung, Standort und Pflege – mit nachvollziehbarer Entscheidungsmatrix statt pauschalem Materialsieger.",
    measurement: "Miss Stellfläche, lichte Türbreite, benötigte Innenfläche und die größten einzulagernden Gegenstände. Dokumentiere Bodenfeuchte, Beschattung und Schlagregen am vorgesehenen Standort.",
    verification: "Vergleiche beim vollständigen Bausatz Innen- und Außenmaß, Wand- und Dachaufbau, Boden, Lüftung, Korrosions- oder Holzschutz, Verankerung, Lieferumfang und Montageanleitung.",
    limitation: "Materialvergleiche ersetzen weder Baurecht noch Fundament-, Statik- oder Standortprüfung. Maßgeblich bleiben Landesrecht, örtliche Vorgaben und die Unterlagen des konkreten Bausystems.",
    criteria: ["Nutzungspassung", "Planbarkeit am Standort", "Aufbauaufwand", "Pflege im Betrieb", "Spätere Anpassbarkeit"],
    options: [
      option("holz", "Holz", "Holz wirkt wohnlich und lässt sich häufig gut bearbeiten, reparieren und ergänzen.", "Anpassbare Innenausstattung, natürliche Haptik und gut zugängliche Befestigungspunkte sind typische Stärken.", "Holzschutz, Feuchteabstand und regelmäßige Sichtkontrolle müssen zum Standort und zur Holzart passen.", ["für Regale und Werkstatt gut anpassbar", "Feuchte- und Spritzwasserdetails sichtbar planbar", "mehr Arbeit bei Aufbau und Oberflächen", "regelmäßige Kontrolle und gegebenenfalls Pflege", "Öffnungen und Einbauten oft nachrüstbar"], [5, 4, 2, 2, 5]),
      option("metall", "Metall", "Beschichtete Metallhäuser sind sachlich, kompakt und oft mit geringer Oberflächenpflege verbunden.", "Vorgefertigte Systeme können für reines Gerätelager einen klaren, wartungsarmen Rahmen bieten.", "Kondensat, Belüftung, Korrosionsstellen und begrenzte nachträgliche Bearbeitung dürfen nicht übersehen werden.", ["stark für trockenes Gerätelager", "Systemmaß und Verankerung klar prüfen", "viele dünne Bauteile und Verschraubungen", "Oberfläche meist pflegearm, Schäden kontrollieren", "nachträgliche Öffnungen nur systemkonform"], [4, 4, 3, 4, 2]),
      option("kunststoff", "Kunststoff", "Kunststoffsysteme kombinieren geringes Gewicht mit einer meist leicht zu reinigenden Oberfläche.", "Für kompakte Lageraufgaben kann der geringe Pflegebedarf attraktiv sein.", "UV-Alterung, Tragfähigkeit, Befestigungsmöglichkeiten und Ersatzteilversorgung unterscheiden sich deutlich nach System.", ["gut für leichte, überschaubare Lagerung", "Untergrund und Verankerung besonders beachten", "leichte Elemente, aber systemspezifische Montage", "reinigungsfreundlich und ohne Anstrich", "Umbauten und schwere Lasten häufig begrenzt"], [3, 3, 4, 5, 2]),
      option("wpc", "WPC", "WPC verbindet Holzanteile und Kunststoff zu einem formstabil wirkenden Verbundsystem.", "Gleichmäßige Optik und geringer Anstrichbedarf können bei sichtbaren Gartenlagen überzeugen.", "Wärmeausdehnung, Systemprofile, Gewicht und Reparaturmöglichkeiten müssen produktbezogen geprüft werden.", ["geeignet für ordentliche Freizeit- und Lagerbereiche", "Fugen und Ausdehnung systemabhängig", "Gewicht und Stecksystem können Aufbau prägen", "kein klassischer Holzschutzanstrich", "nur innerhalb des Herstellersystems gut erweiterbar"], [4, 3, 3, 4, 3]),
      option("mauerwerk", "Mauerwerk", "Ein gemauertes Gartenhaus ist eine dauerhafte bauliche Lösung mit hoher Masse.", "Robustheit, Einbruchschutz und langfristig geplante Nutzung können für eine massive Ausführung sprechen.", "Planung, Genehmigung, Fundament, Bauzeit und spätere Änderungen sind deutlich anspruchsvoller als bei einem Bausatz.", ["stark für dauerhafte, schwere Nutzung", "hoher Bedarf an Bau- und Standortplanung", "Facharbeiten und lange Baufolge", "Oberflächen und Dach bleiben wartungsrelevant", "nachträgliche Änderungen aufwendig"], [5, 2, 1, 3, 1]),
    ],
    contexts: [
      context("fahrraeder", "Fahrräder", "für Fahrräder", "Fahrräder brauchen eine ausreichende Türlichte, Rangiergasse und trockene, gut erreichbare Stellplätze.", "Nutzungspassung und spätere Ergänzungen für Halter oder Ladepunkte zählen stärker als reine Außenoptik.", "Eine theoretisch große Fläche hilft wenig, wenn Lenker, Tür und Laufweg miteinander kollidieren.", [30, 15, 15, 15, 25]),
      context("werkstatt", "Werkstatt", "als Werkstatt", "Werkbank, Maschinen, Beleuchtung und sichere Bedienwege erzeugen höhere Anforderungen an Wände, Boden und Befestigung.", "Anpassbarkeit und belastbare Nutzung erhalten das größte Gewicht.", "Schwere Einbauten dürfen nicht an ungeprüften Wand- oder Bodenelementen befestigt werden.", [30, 15, 15, 10, 30]),
      context("kleiner-garten", "kleiner Garten", "für einen kleinen Garten", "Bei knapper Stellfläche entscheiden reales Innenmaß, Wandstärke, Türschwenkbereich und Zugang stärker als das Katalog-Außenmaß.", "Planbarkeit und kompakter Aufbau werden höher gewichtet.", "Dachüberstand und Fundament können die nutzbare Restfläche unerwartet verkleinern.", [25, 30, 20, 15, 10]),
      context("kleingarten", "Kleingarten", "für den Kleingarten", "In einer Kleingartenanlage gelten Nutzung und Laubengröße nicht automatisch wie auf einem privaten Hausgrundstück.", "Standortprüfung und nachvollziehbare Nutzung stehen vor Komfortmerkmalen.", "Satzung, Bundeskleingartengesetz und konkrete Anlage müssen vor der Materialbestellung geklärt sein.", [20, 35, 15, 15, 15]),
      context("feuchte-lage", "feuchte Lage", "bei feuchter Lage", "Spritzwasser, geringe Abtrocknung, Vegetation und ein dauerhaft feuchter Untergrund belasten jedes Material anders.", "Standortplanbarkeit und Pflegefolgen dominieren die Entscheidung.", "Ein anderes Wandmaterial behebt keinen ungeeigneten Bodenaufbau oder fehlende Entwässerung.", [20, 30, 10, 30, 10]),
      context("wenig-pflege", "wenig Pflege", "mit möglichst wenig Pflege", "Gesucht wird eine Lösung mit überschaubaren, planbaren Kontroll- und Pflegearbeiten über viele Jahre.", "Pflege bekommt das höchste Gewicht, ohne Kondensat, Dach und Befestigung auszublenden.", "Pflegearm bedeutet nicht wartungsfrei; Schäden an Beschichtung, Fugen und Dach bleiben zu kontrollieren.", [15, 15, 10, 45, 15]),
      context("kleines-budget", "kleines Budget", "bei kleinem Budget", "Nicht nur der Bausatzpreis, sondern Fundament, Lieferung, Montage, Boden, Dachentwässerung und Pflege bilden das Budget.", "Einfacher Aufbau und vorhersehbare Folgekosten werden stärker berücksichtigt.", "Ein niedriger Einstiegspreis kann durch fehlende Systemteile oder kurze Lebensdauer relativiert werden.", [20, 20, 30, 20, 10]),
      context("langfristige-nutzung", "langfristige Nutzung", "für langfristige Nutzung", "Die Lösung soll Reparaturen, geänderte Lagerung und eine nachvollziehbare Instandhaltung über viele Jahre ermöglichen.", "Nutzung, Planbarkeit und Anpassbarkeit zählen stärker als schneller Aufbau.", "Dauerhaftigkeit entsteht aus Material, konstruktivem Schutz und regelmäßiger Kontrolle gemeinsam.", [25, 20, 10, 20, 25]),
      context("saisonlager", "Saisonlager", "als Saisonlager", "Gartenmöbel, Polster und Geräte werden wenige Male im Jahr bewegt, benötigen dann aber breite Wege und trockene Lagerzonen.", "Nutzung und geringe laufende Pflege stehen im Vordergrund.", "Empfindliche Textilien dürfen nicht allein wegen einer geschlossenen Hülle als trocken gelagert gelten.", [30, 15, 15, 25, 15]),
      context("hanggrundstueck", "Hanggrundstück", "am Hanggrundstück", "Gefälle verändert Zugang, Fundament, Entwässerung und die tatsächlich nutzbare lichte Höhe an jeder Hausseite.", "Standortplanbarkeit ist wichtiger als eine einfache Materialpräferenz.", "Die Entscheidungsmatrix bemisst weder Stützung noch Fundament oder Böschungssicherheit.", [20, 40, 15, 15, 10]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.berlinBuildingCode, GUIDE_SOURCE_LIBRARY.allotmentLaw],
  },
  {
    topicSlug: "maehroboter",
    noun: "Mähroboter-Navigation",
    directoryTitle: "Mähroboter-Systeme und Navigation vergleichen",
    directoryDescription: "100 Mähroboter-Vergleiche nach Fläche, Empfang, Passagen und Zonen – Kabel, RTK, LiDAR, Kamera und Hybrid nachvollziehbar abwägen.",
    measurement: "Miss Netto-Rasenfläche, maximale Steigung und engste Passage. Zeichne hohe Bäume, Hauswände, getrennte Zonen, Kanten, Wasserflächen und den Platz der Ladestation ein.",
    verification: "Prüfe für das konkrete Modell Nennfläche, Navigation, Empfangsvoraussetzungen, Mindestpassage, Steigung, Randabstände, Zonenlogik, Sicherheitsfunktionen, Geräusch und Updateversorgung.",
    limitation: "Die Matrix ist keine Modell- oder Sicherheitsfreigabe. Empfang, Hinderniserkennung, Traktion und Firmwareverhalten müssen am konkreten Grundstück und nach Herstellerangaben geprüft werden.",
    criteria: ["Passung zur Gartenform", "Vorhersagbare Navigation", "Installationsaufwand", "Wartung und Störungssuche", "Änderbarkeit der Flächen"],
    options: [
      option("begrenzungskabel", "Begrenzungskabel", "Ein physischer Draht definiert Arbeitsfläche und Inseln unabhängig vom Satellitenempfang.", "Klare Grenzen und langjährig etablierte Installationslogik helfen bei schwieriger Sicht zum Himmel.", "Verlegung, Reparatur, Suchdraht und spätere Flächenänderungen verursachen Aufwand.", ["stabil bei klar planbaren Flächen", "Grenze physisch dokumentierbar", "einmalige Verlegung im Boden", "Kabelbruch systematisch suchen", "Änderungen verlangen Kabelarbeit"], [4, 5, 2, 3, 2]),
      option("rtk", "RTK", "RTK nutzt satellitengestützte Korrekturdaten für virtuelle Grenzen.", "Virtuelle Zonen sind flexibel und ohne eingegrabenen Begrenzungsdraht veränderbar.", "Freie Himmelsicht, Referenz- oder Korrekturdienst und Abschattung durch Gebäude oder Bäume sind kritisch.", ["stark auf offenen, gegliederten Flächen", "präzise bei stabilen Bedingungen", "Einrichtung ohne umlaufenden Draht", "Empfang und Referenz prüfen", "virtuelle Grenzen schnell anpassbar"], [5, 4, 4, 3, 5]),
      option("lidar", "LiDAR", "LiDAR erfasst Abstände und Umgebung mit Lasersensorik statt ausschließlich Satellit oder Draht.", "Umgebungsnavigation kann bei wechselnden Zonen und begrenzter Satellitensicht interessant sein.", "Vegetation, kleine Hindernisse, Verschmutzung und die konkrete Kartenlogik bleiben modellabhängig.", ["gut für strukturreiche Umgebungen", "Kartierung hängt von sichtbaren Merkmalen ab", "Einlernen und Ladestation einrichten", "Sensorflächen und Karte pflegen", "Zonen softwareseitig veränderbar"], [4, 4, 4, 3, 4]),
      option("kamera", "Kamera", "Kamerabasierte Systeme erkennen Umgebung und Grenzen anhand visueller Merkmale.", "Ohne Draht und Referenzantenne kann die Einrichtung kompakt bleiben.", "Licht, Kontrast, Witterung, kleine Objekte und wechselnde Gartensituationen beeinflussen die Erkennung.", ["gut bei visuell klaren Rasenkanten", "abhängig von Licht und Trainingslogik", "geringer baulicher Installationsaufwand", "Kamera sauber und Software aktuell halten", "Bereiche meist per App anpassbar"], [4, 3, 5, 3, 4]),
      option("hybrid", "Hybrid-Navigation", "Hybridsysteme kombinieren mehrere Sensoren oder RTK mit Kamera beziehungsweise LiDAR.", "Redundante Datenquellen können komplexe Gärten robuster abbilden.", "Mehr Technik bedeutet nicht automatisch bessere Passung; Einrichtung, Preis und Fehlerdiagnose werden komplexer.", ["breites Einsatzprofil bei Komplexität", "mehrere Signale können sich ergänzen", "umfangreiche Einrichtung möglich", "mehr Sensoren und Softwarepfade", "virtuelle Zonen meist flexibel"], [5, 5, 3, 2, 5]),
    ],
    contexts: [
      context("300-qm", "300 m²", "für 300 m²", "Eine kleine Nettofläche kann wegen Beeten, Kanten und kurzer Passagen anspruchsvoller sein als ihre Quadratmeterzahl vermuten lässt.", "Einfache Installation und zuverlässige Navigation zählen stärker als maximale Kapazität.", "Überdimensionierung ersetzt keine saubere Rand- und Ladestationsplanung.", [25, 25, 25, 15, 10]),
      context("500-qm", "500 m²", "für 500 m²", "Mittlere Rasenflächen verbinden oft mehrere Gartenteile, Bäume und typische Spiel- oder Sitzbereiche.", "Gartenpassung und vorhersehbarer Betrieb erhalten ein ausgewogenes Gewicht.", "Die Herstellerfläche muss mit Hindernissen und erlaubter Laufzeit zusammen betrachtet werden.", [30, 25, 15, 15, 15]),
      context("1000-qm", "1.000 m²", "für 1.000 m²", "Auf größeren Flächen werden Zonenabdeckung, Laufzeitreserve und zuverlässige Rückkehr zur Ladestation entscheidend.", "Navigation und Gartenpassung dominieren den Installationskomfort.", "Eine hohe Nennfläche garantiert keine Abdeckung komplexer Nebenbereiche.", [35, 30, 10, 15, 10]),
      context("viele-baeume", "viele Bäume", "bei vielen Bäumen", "Baumkronen, Stämme, Wurzeln und wechselnde Schatten erzeugen Empfangs- und Hindernisfragen.", "Robuste Navigation und nachvollziehbare Störungssuche werden höher gewichtet.", "Satellitensicht und visuelle Erkennung müssen genau an den schwierigsten Stellen getestet werden.", [30, 30, 10, 20, 10]),
      context("enge-passagen", "enge Passagen", "für enge Passagen", "Die schmalste Verbindung bestimmt, ob Zonen autonom erreichbar sind und wie Grenzen geführt werden können.", "Gartenpassung und Planbarkeit erhalten zusammen den größten Anteil.", "Hersteller unterscheiden Passage, Korridor und Abstand zu Hindernissen; Werte sind nicht austauschbar.", [35, 35, 10, 10, 10]),
      context("hang", "Hang", "für einen Hang", "Steigung, Übergang am Hangfuß, feuchter Boden und Randneigung beeinflussen Traktion und Sicherheit.", "Vorhersagbarkeit und reale Gartenpassung sind wichtiger als eine schnelle Einrichtung.", "Maximalsteigung im Feld ist nicht automatisch die zulässige Steigung an Grenze oder Ladestation.", [35, 35, 5, 15, 10]),
      context("mehrere-zonen", "mehrere Zonen", "für mehrere Zonen", "Getrennte Rasenstücke benötigen autonome Wege, definierte Übergänge oder bewusstes manuelles Umsetzen.", "Änderbarkeit, Gartenpassung und stabile Navigation werden hoch gewichtet.", "Eine App-Zone löst keinen fehlenden physischen Verbindungsweg.", [30, 25, 10, 10, 25]),
      context("kinder-haustiere", "Kinder und Haustiere", "bei Kindern und Haustieren", "Spielzeug, kleine Hindernisse und wechselnde Gartennutzung erfordern konservative Betriebszeiten und klare Sicherheitsroutinen.", "Vorhersagbarkeit und Wartungskontrolle erhalten mehr Gewicht.", "Keine Navigationstechnik macht unbeaufsichtigten Betrieb automatisch risikofrei.", [25, 30, 10, 25, 10]),
      context("ohne-wlan", "ohne stabiles WLAN", "ohne stabiles WLAN", "Am entferntesten Gartenpunkt kann die Hausverbindung schwach sein, obwohl Navigation oder Updates Netzwerkfunktionen voraussetzen.", "Eigenständiger Betrieb und verständliche Störungssuche stehen im Vordergrund.", "WLAN, Mobilfunk, Bluetooth, RTK-Korrekturdienst und Navigation sind getrennte Voraussetzungen.", [25, 30, 15, 20, 10]),
      context("haeufige-aenderungen", "häufige Änderungen", "bei häufig veränderten Flächen", "Trampolin, Beete, Spielbereiche und saisonale Sperrzonen verändern die nutzbare Rasenfläche regelmäßig.", "Änderbarkeit bekommt das höchste Gewicht.", "Virtuelle Grenzen müssen nach jeder Änderung kontrolliert werden; physische Gefahren benötigen weiterhin sichere Abgrenzung.", [20, 20, 10, 15, 35]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.mowerSlope, GUIDE_SOURCE_LIBRARY.mowerPassages, GUIDE_SOURCE_LIBRARY.mowerSecondaryArea],
  },
  {
    topicSlug: "terrasse",
    noun: "Terrassenbelag",
    directoryTitle: "Terrassenbeläge für konkrete Nutzungen vergleichen",
    directoryDescription: "100 Materialvergleiche für Terrasse, Sonne, Schatten, Familie und Pflege – Holz, Thermoholz, WPC und Stein mit klaren Prüfkriterien.",
    measurement: "Miss Nettofläche, Aufbauhöhe, Gefälle und jede Aussparung. Lege Verlegerichtung, erreichbare Lieferlängen, Entwässerung und den vollständigen Unterbau fest.",
    verification: "Prüfe Deck- beziehungsweise Formatmaß, Fugen, Auflager, Befestigung, Temperaturausdehnung, Rutschverhalten, Oberflächentemperatur, Pflege und Freigabe für den vorhandenen Untergrund.",
    limitation: "Die Entscheidungsmatrix ersetzt weder Untergrund-, Entwässerungs- noch statische Planung. Aufbau, Abstände und Befestigung müssen zum vollständigen Materialsystem passen.",
    criteria: ["Passung zur Nutzung", "Konstruktive Planbarkeit", "Verlegeaufwand", "Pflege und Alterung", "Reparatur und Austausch"],
    options: [
      option("laerche", "Lärchenholz", "Lärche bietet natürliche Haptik und eine sichtbare Holzalterung.", "Dielen lassen sich bearbeiten, einzeln ersetzen und mit klassischer Holz-Unterkonstruktion planen.", "Vergrauung, Riss- oder Splitterbildung und konstruktiver Holzschutz gehören zur Entscheidung.", ["natürliche Oberfläche für Wohnterrassen", "Holzschutz und Belüftung klar planen", "Zuschnitt mit üblichen Holzbearbeitungswerkzeugen", "regelmäßige Sicht- und Oberflächenkontrolle", "einzelne Dielen grundsätzlich austauschbar"], [4, 4, 4, 2, 5]),
      option("thermoholz", "Thermoholz", "Thermisch modifiziertes Holz verbindet natürliche Oberfläche mit veränderten Materialeigenschaften.", "Formstabilität und dunklere Optik können hochwertige Holzterrassen unterstützen.", "Sprödigkeit, Befestigung, Verfügbarkeit und Pflege sind produktspezifisch zu prüfen.", ["natürliche Haptik mit ruhiger Optik", "Systemdetails und Holzart entscheidend", "sorgfältige Vorbohrung und Befestigung", "Alterung bleibt sichtbar", "Einzeldielen bei gleicher Charge ersetzbar"], [5, 4, 3, 3, 4]),
      option("wpc-vollprofil", "WPC-Vollprofil", "Massive WPC-Profile bieten gleichmäßige Optik und splitterarme Oberflächen.", "Geringer Anstrichbedarf und definierte Systembefestigung erleichtern eine pflegeorientierte Nutzung.", "Hitze, Ausdehnung, Gewicht, Unterkonstruktion und Farbveränderung bleiben relevant.", ["splitterarm und gleichmäßig", "Temperaturfugen streng systembezogen", "schwere Profile und Clipsystem", "Reinigung statt klassischem Holzschutz", "Austausch an System und Farbe gebunden"], [4, 3, 3, 4, 3]),
      option("wpc-hohlkammer", "WPC-Hohlkammer", "Hohlkammerprofile reduzieren Materialgewicht und können preislich attraktiv sein.", "Systemprofile ermöglichen eine gleichmäßige Fläche bei planbarer Befestigung.", "Stirnseiten, Wasser, Temperatur, Unterkonstruktion und Belastbarkeit erfordern besonders genaue Systemtreue.", ["geeignet bei passender Belastung und Nutzung", "Entwässerung der Kammern kritisch", "leichter als Vollprofil, aber detailabhängig", "Oberfläche pflegearm, Kammern kontrollieren", "Ersatzprofile langfristig systemabhängig"], [3, 2, 4, 4, 2]),
      option("steinplatten", "Steinplatten", "Beton- oder Natursteinplatten bilden eine mineralische, druckfeste Terrassenoberfläche.", "Hohe Punktlasttauglichkeit und geringe Oberflächenpflege können bei robusten Nutzungen überzeugen.", "Unterbau, Frostsicherheit, Gefälle, Gewicht und spätere Höhenanpassung sind anspruchsvoll.", ["robust für Möbel und intensive Nutzung", "Unterbau und Entwässerung zentral", "hoher Transport- und Verlegeaufwand", "Reinigung und Fugenpflege", "einzelne Platten austauschbar, Höhenlage aufwendig"], [5, 3, 2, 4, 3]),
    ],
    contexts: [
      context("suedterrasse", "Südterrasse", "für eine Südterrasse", "Direkte Sonne macht Oberflächentemperatur, Ausdehnung und Barfußnutzung zu zentralen Kriterien.", "Nutzung und konstruktive Planbarkeit werden hoch gewichtet.", "Dunkle Oberflächen können sich stark erwärmen; das konkrete Produkt muss praktisch bewertet werden.", [35, 30, 10, 15, 10]),
      context("schatten", "schattige Terrasse", "für eine schattige Terrasse", "Langsame Abtrocknung erhöht die Bedeutung von Belüftung, Gefälle, Reinigung und rutschiger Verschmutzung.", "Planbarkeit und Pflegefolgen bestimmen den Vergleich.", "Schatten ist kein Ersatz für Entwässerung und ausreichenden Abstand zum Untergrund.", [20, 30, 10, 30, 10]),
      context("familie", "Familie", "für Familien mit Kindern", "Barfußnutzung, verschüttete Getränke, Möbelbewegung und gut reparierbare Schäden prägen den Alltag.", "Nutzung, Pflege und Austauschbarkeit werden stärker gewichtet.", "Eine als splitterarm beworbene Oberfläche muss trotzdem auf Hitze und Rutschverhalten geprüft werden.", [35, 15, 10, 20, 20]),
      context("pool", "Poolumgebung", "am Pool", "Nasse Füße, Spritzwasser und intensive Sonne verlangen besonderes Augenmerk auf Rutschverhalten und Entwässerung.", "Nutzungspassung und konstruktive Details dominieren.", "Kein Material ist ohne konkrete Oberflächen- und Einbaubedingung pauschal rutschfest.", [40, 30, 10, 15, 5]),
      context("20-qm", "20 m²", "für 20 m²", "Eine kompakte Fläche reagiert stark auf Randzuschnitte, Lieferlängen und die Position von Stufen oder Türen.", "Verlegeaufwand und Austauschbarkeit werden sichtbar berücksichtigt.", "Pauschaler Quadratmeterpreis verschleiert Befestigung, Ränder und Verschnitt.", [25, 20, 25, 15, 15]),
      context("40-qm", "40 m²", "für 40 m²", "Bei größeren Flächen steigen Materialmenge, Wiederholungsfehler und die Wirkung unpassender Lieferlängen.", "Planbarkeit und Pflege über die Gesamtfläche erhalten mehr Gewicht.", "Vor Bestellung ist ein Reihen-, Fugen- und Zuschnittplan erforderlich.", [25, 30, 15, 20, 10]),
      context("wenig-pflege", "wenig Pflege", "mit möglichst wenig Pflege", "Gesucht wird eine dauerhaft ordentliche Fläche mit planbaren Reinigungs- und Kontrollarbeiten.", "Pflege und Alterung bekommen das höchste Gewicht.", "Pflegearm bedeutet nicht frei von Reinigung, Fugenarbeit oder Schadenskontrolle.", [20, 15, 10, 45, 10]),
      context("kleines-budget", "kleines Budget", "bei kleinem Budget", "Dielen oder Platten, Unterbau, Befestigung, Lieferung, Werkzeug und langfristige Pflege bilden den Gesamtpreis.", "Verlegeaufwand und Reparierbarkeit fließen stärker ein.", "Ein günstiger Belag kann durch komplexe Unterkonstruktion oder hohen Verschnitt teurer werden.", [20, 15, 30, 15, 20]),
      context("nachhaltigkeit", "nachhaltige Planung", "bei Fokus auf Nachhaltigkeit", "Lebensdauer, Herkunft, Reparatur, Austausch einzelner Teile und spätere Entsorgung gehören gemeinsam in die Bewertung.", "Reparaturfähigkeit und langfristige Nutzung erhalten mehr Gewicht.", "Umweltwirkungen lassen sich nicht allein aus dem Materialnamen ableiten; Herkunft und Lebensdauer sind konkret zu belegen.", [20, 20, 10, 20, 30]),
      context("viele-aussparungen", "viele Aussparungen", "bei vielen Aussparungen", "Pfosten, Schächte, Beete und verwinkelte Ränder erhöhen Zuschnitt, Unterkonstruktion und Fehlerpotenzial.", "Planbarkeit, Verlegeaufwand und Austauschbarkeit sind entscheidend.", "Ein pauschaler Verschnittfaktor ersetzt keinen maßstäblichen Zuschnittplan.", [15, 30, 30, 10, 15]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.terraceConstruction],
  },
  {
    topicSlug: "bewaesserung",
    noun: "Bewässerungssystem",
    directoryTitle: "Bewässerungssysteme für Rasen, Beet und Hecke vergleichen",
    directoryDescription: "100 Bewässerungsvergleiche nach Pflanzenfläche, Durchfluss und Wartung – Tropfrohr, Perlschlauch, Sprüher und Regner ohne Scheingenauigkeit.",
    measurement: "Miss Durchfluss am späteren Anschluss und Fließdruck unter Entnahme. Erfasse Fläche, Leitungslänge, Höhenunterschied, Pflanzenzonen und den erlaubten Bewässerungszeitraum.",
    verification: "Prüfe zulässigen Druck, Abgabe je Verbraucher, Stranglänge, Filter, Druckminderer, Rückflussschutz, Überdeckung, Wartung und Winterentleerung für das konkrete System.",
    limitation: "Die Matrix ist keine hydraulische Auslegung und kein Pflanzen-Sollwert. Boden, Wetter, Wurzeltiefe, Trinkwasserschutz und lokale Regeln müssen gesondert berücksichtigt werden.",
    criteria: ["Passung zur Pflanzenfläche", "Hydraulische Planbarkeit", "Installationsaufwand", "Wartung und Reinigung", "Zonen und Erweiterbarkeit"],
    options: [
      option("tropfrohr", "Tropfrohr", "Tropfrohr gibt Wasser an definierten Austrittsstellen entlang einer Leitung ab.", "Reihenpflanzungen, Hecken und Beete lassen sich gezielt und mit geringer Oberflächenbenetzung versorgen.", "Druckbereich, Tropferabstand, Filter und maximale Stranglänge sind systemabhängig.", ["stark für Reihen und Wurzelzonen", "Abgabe und Stranglänge berechenbar", "Leitung entlang Pflanzen führen", "Filter und Tropfer kontrollieren", "Zonen gut ergänzbar"], [5, 5, 4, 3, 5]),
      option("perlschlauch", "Perlschlauch", "Poröse Schläuche geben Wasser über ihre Oberfläche entlang der Strecke ab.", "Einfache Beet- und Heckenstrecken können mit wenig Einzelteilen erschlossen werden.", "Abgabe verändert sich mit Druck, Länge, Alterung und Höhenunterschied und ist oft weniger exakt dokumentiert.", ["passend für einfache lineare Pflanzung", "Abgabe schwieriger exakt zu bilanzieren", "schnell auszulegen", "Poren auf Verstopfung prüfen", "Erweiterung nur innerhalb Druckgrenzen"], [4, 2, 5, 3, 3]),
      option("mikrosprueher", "Mikrosprüher", "Mikrosprüher verteilen Wasser kleinflächig oberhalb oder nahe der Pflanzen.", "Beete und Sonderkulturen lassen sich mit verschiedenen Sprühbildern abdecken.", "Wind, Verdunstung, Düsenverstopfung und Überschneidung müssen praktisch kontrolliert werden.", ["flexibel für kleine Beetflächen", "Sprühbild vor Ort messen", "viele kleine Verbraucher montieren", "Düsen regelmäßig reinigen", "einzelne Sprüher leicht versetzbar"], [4, 3, 3, 2, 5]),
      option("versenkregner", "Versenkregner", "Versenkregner bewässern Rasenflächen aus einem unterirdischen Leitungsnetz.", "Freie Rasenflächen können mit abgestimmter Kopf-zu-Kopf-Überdeckung gleichmäßig erschlossen werden.", "Planung, Erdarbeiten, Fließdruck und genaue Düsenabstimmung sind anspruchsvoll.", ["stark für zusammenhängenden Rasen", "Überdeckung und Druck exakt planbar", "hoher Einbauaufwand", "Düsen, Filter und Versenkung kontrollieren", "Zonen erweiterbar, Erdarbeiten nötig"], [5, 4, 1, 3, 3]),
      option("schwingregner", "Schwingregner", "Mobile Schwingregner verteilen Wasser rechteckig über eine wechselnde Aufstellfläche.", "Ohne feste Installation lassen sich verschiedene Rasenbereiche nacheinander bewässern.", "Aufstellung, Wind, Randverluste und manuelles Umsetzen erschweren eine gleichmäßige Bilanz.", ["praktisch für offene Rechtecke", "reale Verteilung mit Bechern prüfen", "keine feste Installation", "Düsen reinigen und Gerät umsetzen", "sehr flexibel, aber nicht automatisiert"], [3, 2, 5, 3, 4]),
    ],
    contexts: [
      context("hecke", "Hecke", "für eine Hecke", "Eine lange, schmale Wurzelzone verlangt gleichmäßige Abgabe ohne unnötige Bewässerung von Wegen.", "Pflanzenpassung und hydraulische Planbarkeit dominieren.", "Stranglänge und Höhenunterschied können das Leitungsende unterversorgen.", [35, 30, 15, 10, 10]),
      context("hochbeet", "Hochbeet", "für Hochbeete", "Kleine, erhöhte Flächen trocknen anders ab und benötigen gut zugängliche, fein regelbare Verbraucher.", "Passung und Erweiterbarkeit werden höher gewichtet.", "Ein gemeinsamer Kreis für Hochbeet und Rasen erzwingt meist unpassende Laufzeiten.", [35, 20, 15, 10, 20]),
      context("gemuesebeet", "Gemüsebeet", "für Gemüsebeete", "Kulturwechsel, Reihenabstände und empfindliche Blätter verlangen eine veränderbare Wasserverteilung.", "Pflanzenpassung und spätere Anpassbarkeit zählen stark.", "Bewässerungsdauer muss an Boden, Wetter und Kultur angepasst werden.", [35, 20, 10, 10, 25]),
      context("rasen-200-qm", "200 m² Rasen", "für 200 m² Rasen", "Die reale Rasenform und verfügbare Wassermenge entscheiden, ob eine Zone gleichmäßig versorgt werden kann.", "Hydraulik und Flächenpassung erhalten das meiste Gewicht.", "Quadratmeter allein bestimmen weder Regnerzahl noch Laufzeit.", [35, 35, 10, 10, 10]),
      context("rasen-500-qm", "500 m² Rasen", "für 500 m² Rasen", "Größere Rasenflächen benötigen häufig mehrere hydraulisch passende Zonen und dokumentierte Überdeckung.", "Planbarkeit und Erweiterbarkeit werden stärker gewichtet.", "Zu viele gleichzeitig aktive Verbraucher senken Druck und Reichweite.", [30, 35, 10, 10, 15]),
      context("hang", "Hanglage", "am Hang", "Gefälle erhöht Oberflächenabfluss und verändert Druck entlang langer Leitungen.", "Hydraulische Planbarkeit und kontrollierbare Abgabe sind zentral.", "Kürzere Intervalle können nötig sein; die Matrix bestimmt keine Laufzeit.", [30, 40, 10, 10, 10]),
      context("regenwasser", "Regenwassernutzung", "mit Regenwasser", "Speicherstand, Pumpe, Filter und verfügbare Förderleistung schwanken stärker als beim festen Hausanschluss.", "Planbarkeit, Wartung und Zonierung erhalten mehr Gewicht.", "Dachmaterial, Speicherhygiene und geeignete Nutzung sind gesondert zu prüfen.", [20, 30, 10, 25, 15]),
      context("kleiner-durchfluss", "geringer Durchfluss", "bei geringem Durchfluss", "Ein schwacher Anschluss begrenzt die gleichzeitig mögliche Abgabe und verlangt kleine, klar berechnete Zonen.", "Hydraulische Planbarkeit und Erweiterbarkeit dominieren.", "Druck und Durchfluss müssen unter realer Entnahme gemessen werden.", [20, 40, 10, 10, 20]),
      context("automatisierung", "Automatisierung", "für automatische Bewässerung", "Ventile, Steuerung, Sensoren und sichere Ausfallzustände müssen zu den Verbrauchern passen.", "Planbarkeit, Wartung und Erweiterung zählen gemeinsam.", "Automatik ersetzt weder Sichtkontrolle noch saisonale Anpassung.", [20, 25, 10, 25, 20]),
      context("wenig-wartung", "wenig Wartung", "mit möglichst wenig Wartung", "Gesucht wird ein System mit wenigen Störstellen und gut zugänglichen Filtern oder Düsen.", "Wartung bekommt das höchste Gewicht.", "Auch einfache Systeme benötigen Filterkontrolle, Frostschutz und Leckprüfung.", [20, 20, 10, 40, 10]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.dvgwGarden, GUIDE_SOURCE_LIBRARY.rainwater],
  },
  {
    topicSlug: "gewaechshaus",
    noun: "Gewächshaus-Eindeckung",
    directoryTitle: "Gewächshaus-Materialien nach Kultur und Standort vergleichen",
    directoryDescription: "100 Gewächshaus-Vergleiche für Licht, Wärme, Sicherheit und Pflege – Glas, Polycarbonat, Acrylglas und Folie kontextbezogen einordnen.",
    measurement: "Erfasse reales Innenmaß, Kulturhöhe, Tür, Dachlüftung, Beschattung, Windlage und Fundament. Dokumentiere, ob Kinder, Bälle oder herabfallende Äste die Eindeckung erreichen können.",
    verification: "Prüfe Lichtdurchlässigkeit, UV-Seite, Plattenstärke, Befestigung, Windsog, Schneelast, Bruchverhalten, Ersatzteilformat, Reinigung und Freigabe des vollständigen Rahmensystems.",
    limitation: "Die Materialmatrix ersetzt weder Statik, Sicherheitsglas-Auswahl, Fundament noch Kultur- und Lüftungsplanung. Maßgeblich sind Standort und vollständige Herstellerunterlagen.",
    criteria: ["Passung zu Kultur und Licht", "Standort- und Systemsicherheit", "Montageaufwand", "Reinigung und Alterung", "Austausch einzelner Felder"],
    options: [
      option("blankglas", "Blankglas", "Blankglas bietet klare Sicht und eine klassische Gewächshausoptik.", "Hohe Transparenz erleichtert Beobachtung und Reinigung glatter Flächen.", "Bruchsicherheit, Gewicht, Beschattung und das konkrete Glasformat sind kritisch.", ["viel direkte Lichtübertragung", "Gewicht und Bruchschutz genau prüfen", "schwere Scheiben sorgfältig montieren", "glatte Fläche gut zu reinigen", "Einzelfelder bei verfügbarem Format ersetzbar"], [5, 2, 2, 4, 4]),
      option("sicherheitsglas", "Einscheibensicherheitsglas", "ESG verbindet klare Optik mit einem definierten Bruchverhalten.", "Für erreichbare und intensiv genutzte Gartenbereiche kann die Sicherheitsausführung vorteilhaft sein.", "Gewicht, Preis, Kantenbehandlung und passgenaues Ersatzformat bleiben anspruchsvoll.", ["hohe Lichtleistung für viele Kulturen", "verbessertes Bruchverhalten im System", "schwere, passgenaue Montage", "gut zugängliche Reinigung", "Ersatz nur im genauen Systemformat"], [5, 4, 2, 4, 3]),
      option("polycarbonat", "Polycarbonat-Hohlkammerplatten", "Mehrwandplatten streuen Licht und bilden isolierende Luftkammern.", "Geringes Gewicht und Schlagzähigkeit unterstützen viele Hobbygewächshäuser.", "Kammerabschluss, UV-Seite, Alterung und Reinigung ohne Kratzer müssen stimmen.", ["diffuses Licht und Wärmepuffer", "leicht und schlagzäh bei Systemmontage", "Platten gut handhabbar, Details wichtig", "Kammern und Oberfläche sorgfältig pflegen", "Standardfelder oft austauschbar"], [4, 5, 4, 3, 4]),
      option("acrylglas", "Acrylglasplatten", "Acrylglas bietet hohe Transparenz bei geringerem Gewicht als mineralisches Glas.", "Klare Optik und Witterungsbeständigkeit können hochwertige Systeme unterstützen.", "Ausdehnung, Kratzempfindlichkeit, Befestigung und Preis sind systemabhängig.", ["klare Lichtführung", "leichter, aber Ausdehnung beachten", "sorgfältige Bohr- und Klemmtechnik", "kratzsensibel reinigen", "Ersatzformat und Farbe beachten"], [5, 4, 3, 3, 3]),
      option("folie", "Gewächshausfolie", "UV-stabilisierte Folie bildet eine leichte, flexible Eindeckung für einfache Konstruktionen.", "Geringer Einstieg und schnelle Erneuerung passen zu saisonalen oder bewusst einfachen Lösungen.", "Wind, Befestigung, Kondensat, Beschädigung und begrenzte Nutzungsdauer verlangen regelmäßige Kontrolle.", ["gutes Licht für saisonale Nutzung", "Wind- und Befestigungsdetails kritisch", "leicht aufzuspannen", "häufige Sichtkontrolle und Reinigung", "Folie vergleichsweise einfach erneuerbar"], [3, 2, 5, 2, 5]),
    ],
    contexts: [
      context("tomaten", "Tomaten", "für Tomaten", "Hohe Kulturen erzeugen Beschattung und Feuchte; Dachlüftung und erreichbare Bindepunkte sind wichtiger als Material allein.", "Kulturpassung und sichere Systemplanung werden hoch gewichtet.", "Eine lichtstarke Eindeckung kompensiert keine unzureichende Lüftung.", [35, 25, 10, 15, 15]),
      context("anzucht", "Anzucht", "für die Anzucht", "Jungpflanzen benötigen gleichmäßiges Licht, kontrollierbare Temperatur und gut erreichbare Tische.", "Licht- und Kulturpassung erhalten das größte Gewicht.", "Überhitzung und nächtliche Abkühlung müssen unabhängig vom Material beobachtet werden.", [40, 20, 10, 15, 15]),
      context("ganzjahr", "Ganzjahresnutzung", "für Ganzjahresnutzung", "Winterbetrieb erhöht Anforderungen an Wärmeverluste, Kondensat, Schnee, Sturm und sichere Befestigung.", "Systemsicherheit und Kulturpassung dominieren.", "Die Matrix ist keine Heizlast- oder Schneelastberechnung.", [30, 40, 10, 10, 10]),
      context("kleiner-garten", "kleiner Garten", "für einen kleinen Garten", "Kompakte Häuser brauchen gut nutzbare Innenmaße und eine Tür- und Lüftungsanordnung ohne Flächenverlust.", "Montage und Austauschbarkeit werden stärker berücksichtigt.", "Außenmaß, Dachrinne und Türschwenkbereich können den knappen Standort überfordern.", [25, 25, 20, 10, 20]),
      context("windlage", "windige Lage", "für eine windige Lage", "Freie Grundstücke erhöhen Windsog, Scheibenbewegung und Anforderungen an Rahmen, Fundament und Verankerung.", "Standort- und Systemsicherheit erhält das höchste Gewicht.", "Materialwahl ersetzt keine statische Herstellerfreigabe für den Standort.", [20, 50, 10, 10, 10]),
      context("hagelrisiko", "Hagelrisiko", "bei Hagelrisiko", "Schlagbeanspruchung und sichere Folgen eines Schadens müssen neben Licht und Alterung bewertet werden.", "Sicherheit und Austausch einzelner Felder zählen stark.", "Kein Material ist ohne konkrete Klassifizierung pauschal hagelsicher.", [20, 40, 10, 10, 20]),
      context("kinder", "Garten mit Kindern", "im Garten mit Kindern", "Ballspiel und gut erreichbare Seitenflächen erhöhen die Bedeutung des Bruchverhaltens.", "Sicherheit dominiert, Reinigung und Austausch bleiben relevant.", "Scharfe Kanten, Türen und automatische Öffner sind Teil derselben Sicherheitsprüfung.", [20, 45, 10, 10, 15]),
      context("wenig-pflege", "wenig Pflege", "mit möglichst wenig Pflege", "Gesucht wird eine Eindeckung, die gut erreichbar zu reinigen und langfristig kontrollierbar bleibt.", "Reinigung und Alterung erhalten den größten Anteil.", "Auch glatte Flächen benötigen sichere Zugänglichkeit und regelmäßige Kontrolle der Halterungen.", [20, 20, 10, 40, 10]),
      context("kleines-budget", "kleines Budget", "bei kleinem Budget", "Eindeckung, Rahmen, Fundament, Lüftung, Lieferung und spätere Ersatzfelder bilden gemeinsam den Preis.", "Montage und Austauschbarkeit werden stärker gewichtet.", "Ein günstiges Erstmaterial kann durch häufige Erneuerung oder fehlende Ersatzformate teurer werden.", [20, 20, 30, 10, 20]),
      context("beschatteter-standort", "beschatteter Standort", "an einem beschatteten Standort", "Bäume oder Gebäude begrenzen direkte Sonne und können zusätzlich Blätter, Äste und Algenbelag verursachen.", "Lichtpassung, Reinigung und Sicherheit werden gemeinsam gewichtet.", "Vor der Materialwahl sollte der reale Sonnenverlauf dokumentiert werden.", [35, 20, 10, 25, 10]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.greenhouseSmall],
  },
  {
    topicSlug: "sichtschutz",
    noun: "Sichtschutz",
    directoryTitle: "Sichtschutz-Materialien für Wind, Pflege und Gartenstil vergleichen",
    directoryDescription: "100 Sichtschutz-Vergleiche für Grundstück, Terrasse und Hang – Holz, WPC, Aluminium, HPL und Hecke mit sichtbaren Grenzen.",
    measurement: "Miss die reale Flucht zwischen festen Endpunkten, Höhe, Gefälle, Ecken und Tor. Dokumentiere Windlage, Boden, Leitungen, Grenzverlauf und zugängliche Pflegeseiten.",
    verification: "Prüfe reale Montagebreite, Pfostenabstand, Windfreigabe, Fundament, Fugen, Ausdehnung, Korrosionsschutz, Torbeschläge, Ersatzteile und lokal zulässige Höhe.",
    limitation: "Die Matrix bemisst weder Windlast, Pfosten noch Fundamente und klärt keine Grundstücksgrenze. Nachbarrecht, Ortsrecht und Systemstatik bleiben gesondert zu prüfen.",
    criteria: ["Sichtschutzwirkung im Alltag", "Wind- und Standortplanbarkeit", "Montageaufwand", "Pflege und Alterung", "Anpassung an Raster und Gefälle"],
    options: [
      option("holz", "Holz", "Holzelemente wirken natürlich und lassen sich häufig gut kürzen oder reparieren.", "Individuelle Raster, Rankpflanzen und farbliche Pflege sind vergleichsweise flexibel.", "Holzschutz, Verzug, Bodennähe und beidseitiger Pflegezugang müssen eingeplant werden.", ["dichte, wohnliche Abschirmung", "Winddurchlässigkeit vom Element abhängig", "klassische Pfosten- und Schraubmontage", "regelmäßige Sicht- und Oberflächenpflege", "gut an Restfelder anpassbar"], [5, 3, 3, 2, 5]),
      option("wpc", "WPC", "WPC-Stecksysteme erzeugen gleichmäßige, weitgehend blickdichte Flächen.", "Geringer Anstrichbedarf und modulare Profile passen zu pflegeorientierten Gärten.", "Ausdehnung, Gewicht, Pfostensystem und Windlast sind strikt produktbezogen.", ["gleichmäßige hohe Abschirmung", "geschlossenes Feld erzeugt hohe Windlast", "Systempfosten und Steckprofile", "Reinigung ohne klassischen Anstrich", "Raster innerhalb des Systems anpassbar"], [5, 3, 3, 4, 3]),
      option("aluminium", "Aluminium", "Aluminium-Systeme bieten klare Linien und korrosionsarme Oberflächen bei geringem Eigengewicht.", "Pflegeleichte Profile und definierte Systemanschlüsse unterstützen moderne Grundstücke.", "Geschlossene Flächen, Kratzer, Pfostenbemessung und hoher Einstiegspreis bleiben relevant.", ["dichte oder lamellenartige Varianten", "Systemstatik und Windsog zentral", "präzise Systemmontage", "geringe Oberflächenpflege", "Zuschnitt und Ergänzung systemabhängig"], [4, 4, 4, 5, 3]),
      option("hpl", "HPL", "HPL-Platten bilden glatte, farbstabile und vollständig geschlossene Sichtflächen.", "Leicht zu reinigende Oberflächen passen zu architektonischen Lösungen.", "Große geschlossene Platten erzeugen hohe Windlast; Kanten, Bohrungen und Unterkonstruktion müssen stimmen.", ["vollständige Blickdichte", "hohe Windangriffsfläche", "präzise Platten- und Haltermontage", "glatte Fläche gut zu reinigen", "Restmaße nur fachgerecht bearbeiten"], [5, 2, 2, 5, 2]),
      option("hecke", "Hecke", "Eine lebende Hecke verbindet Sichtschutz mit Vegetation und jahreszeitlicher Veränderung.", "Ökologie, weiche Optik und flexible Länge sind langfristige Stärken.", "Wachstumszeit, Schnitt, Breite, Wasserbedarf und Grenzabstände benötigen dauerhaft Platz und Pflege.", ["Wirkung wächst über Zeit und Artwahl", "winddurchlässig, aber standortabhängig", "Pflanzung statt Fundamentraster", "regelmäßiger Schnitt und Wasserversorgung", "Länge flexibel, Höhe nur durch Pflege"], [3, 4, 3, 1, 5]),
    ],
    contexts: [
      context("windige-lage", "windige Lage", "für eine windige Lage", "Freie Grundstücke belasten geschlossene Flächen, Pfosten und Fundamente besonders stark.", "Standortplanbarkeit erhält das höchste Gewicht.", "Die Punktzahl ist keine Windlastberechnung oder Freigabe.", [20, 50, 10, 10, 10]),
      context("terrasse", "Terrasse", "für die Terrasse", "Nah am Sitzplatz zählen Blickdichte, Haptik, Schallreflexion, Schatten und zugängliche Reinigung.", "Alltagswirkung und Pflege werden hoch gewichtet.", "Ein vollständig geschlossenes Feld kann Wind und Schall anders beeinflussen als erwartet.", [35, 20, 10, 25, 10]),
      context("nachbargrenze", "Nachbargrenze", "an der Nachbargrenze", "Grenzverlauf, zulässige Höhe und beidseitige Pflege müssen vor Fundament oder Pflanzung feststehen.", "Standortplanbarkeit und langfristige Pflege dominieren.", "Die Seite gibt keine Rechtsberatung; lokale Regeln sind verbindlich zu klären.", [20, 40, 10, 20, 10]),
      context("hang", "Hang", "am Hang", "Gefälle erzeugt Restfelder, Höhensprünge und unterschiedliche Fundamenthöhen.", "Rasteranpassung und Standortplanung werden hoch gewichtet.", "Abtreppung und Fundament dürfen nicht aus der Elementzahl abgeleitet werden.", [20, 30, 15, 10, 25]),
      context("mit-tor", "mit Gartentor", "mit Gartentor", "Torlichte, Öffnungsrichtung, Anschlag und verstärkte Pfosten unterbrechen das normale Feldraster.", "Montage, Planbarkeit und Anpassung zählen besonders.", "Ein Tor ist kein gekürztes Standardfeld und benötigt eigene Beschläge und Pfostenprüfung.", [20, 30, 25, 10, 15]),
      context("kleiner-garten", "kleiner Garten", "für einen kleinen Garten", "Elementtiefe, Heckenbreite und Schatten wirken auf knapper Fläche unmittelbar auf Wege und Beete.", "Alltagswirkung und Anpassung an Restmaße stehen im Vordergrund.", "Nennbreite und reale Montagebreite dürfen nicht verwechselt werden.", [35, 20, 15, 10, 20]),
      context("wenig-pflege", "wenig Pflege", "mit möglichst wenig Pflege", "Gesucht wird eine Fläche mit planbarer Reinigung und wenigen wiederkehrenden Schutzarbeiten.", "Pflege bekommt das höchste Gewicht.", "Pflegearm bedeutet nicht wartungsfrei; Pfosten, Fugen und Beschädigungen bleiben kontrollpflichtig.", [20, 15, 10, 45, 10]),
      context("naturnaher-garten", "naturnaher Garten", "für einen naturnahen Garten", "Vegetationswert, Durchlässigkeit und reparierbare Materialien stehen neben der reinen Blickdichte.", "Alltagswirkung und langfristige Anpassbarkeit werden stärker gewichtet.", "Eine ökologische Bewertung benötigt Herkunft, Lebensdauer und konkrete Bepflanzung statt pauschaler Materialetiketten.", [30, 20, 10, 15, 25]),
      context("schmale-strecke", "schmale Strecke", "für eine schmale Grundstücksseite", "Wenig verfügbare Tiefe und feste Endpunkte verlangen ein kompaktes, exakt aufgeteiltes Raster.", "Montagebreite und Anpassbarkeit werden hoch gewichtet.", "Pfosten, Halter und Fugen reduzieren die vermeintlich freie Breite.", [25, 25, 20, 10, 20]),
      context("20-meter", "20 Meter Länge", "für 20 Meter Länge", "Eine lange Flucht vervielfacht Rasterfehler, Fundamente, Windangriff und späteren Pflegeaufwand.", "Planbarkeit und Pflege über die Gesamtstrecke dominieren.", "Vor Bestellung muss eine maßstäbliche Feld- und Pfostenliste vorliegen.", [20, 35, 15, 20, 10]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.berlinBuildingCode],
  },
  {
    topicSlug: "carport",
    noun: "Carport-Konstruktion",
    directoryTitle: "Carport-Konstruktionen nach Fahrzeug und Grundstück vergleichen",
    directoryDescription: "100 Carport-Vergleiche für Einzel-, Doppel- und E-Auto-Stellplätze – Holz, Stahl, Aluminium, Anlehn- und Solarcarport nachvollziehbar prüfen.",
    measurement: "Miss Fahrzeug mit Spiegeln und Dachaufbauten, geöffnete Türen, Rangierlinie, lichte Höhe und Grundstücksbreite. Markiere Wand, Grenze, Leitungen und Wasserweg.",
    verification: "Prüfe lichte Maße, Pfostenposition, Dachaufbau, Entwässerung, Korrosions- oder Holzschutz, Wind- und Schneelast, Fundamente, Brandschutzabstände, PV-Lasten und Genehmigung.",
    limitation: "Die Matrix ersetzt keine Tragwerks-, Fundament-, Elektro-, Entwässerungs- oder Genehmigungsplanung. Standortbezogene Nachweise und das vollständige System sind verbindlich.",
    criteria: ["Passung zu Fahrzeug und Nutzung", "Standort- und Tragwerksplanung", "Montageaufwand", "Pflege und Dauerhaftigkeit", "Spätere Erweiterbarkeit"],
    options: [
      option("holz", "Holzcarport", "Holzcarports bieten eine warme Optik und gut bearbeitbare Konstruktionsteile.", "Anbauten, Sichtschutz oder Stauraum lassen sich bei geplantem Tragwerk flexibel integrieren.", "Holzschutz, Anschlüsse, Bodennähe und regelmäßige Kontrolle sind dauerhaft erforderlich.", ["gut an Nutzung und Gartenstil anpassbar", "Tragwerk und Holzschutz detailliert planen", "klassische Zimmerer- und Montagearbeiten", "regelmäßige Kontrolle der Bauteile", "Erweiterungen bei statischer Freigabe möglich"], [5, 4, 3, 2, 5]),
      option("stahl", "Stahlcarport", "Stahl ermöglicht schlanke, tragfähige Profile und große Spannweiten.", "Robuste Konstruktionen passen zu dauerhaften Einzel- und Doppelstellplätzen.", "Korrosionsschutz, schwere Bauteile, Fundamente und fachgerechte Verbindungen bestimmen Aufwand und Kosten.", ["stark für große oder offene Stellplätze", "Statik und Korrosionssystem klar dokumentierbar", "schwere Montage und Hebezeug möglich", "Beschichtung und Schnittstellen kontrollieren", "Erweiterung nur statisch geplant"], [5, 5, 2, 4, 3]),
      option("aluminium", "Aluminiumcarport", "Aluminium-Systeme kombinieren geringes Gewicht mit korrosionsarmer Oberfläche.", "Vorgefertigte Profile und moderne Optik können Montage und Pflege vereinfachen.", "Systemmaße, Verbindungen, Reparatur und Tragfähigkeit bleiben herstellergebunden.", ["gut für klar definierte Standardnutzung", "Systemstatik und Anschlüsse prüfen", "leichtere vormontierte Profile", "geringe Oberflächenpflege", "Erweiterung im System begrenzt möglich"], [4, 4, 4, 5, 3]),
      option("anlehncarport", "Anlehncarport", "Ein Anlehncarport nutzt eine Gebäudeseite und reduziert äußere Stützen.", "Knappe Grundstücksbreiten können durch die Wandnähe besser nutzbar werden.", "Wandanschluss, Brandschutz, Entwässerung, Wärmeverbundsystem und Gebäudestatik sind besonders kritisch.", ["stark bei schmalem Stellplatz am Haus", "komplexer Gebäudeanschluss", "weniger Pfosten, anspruchsvoller Anschluss", "Fuge und Wandanschluss kontrollieren", "spätere Änderung eng ans Gebäude gebunden"], [4, 2, 3, 3, 2]),
      option("solarcarport", "Solarcarport", "Ein Solarcarport verbindet Wetterschutz und Stromerzeugung auf derselben Dachfläche.", "E-Auto-Ladung oder Eigenverbrauch können die Dachfläche funktional erweitern.", "Statik, Elektrik, Verschattung, Entwässerung, Netzanschluss und Investition erhöhen die Planungstiefe erheblich.", ["Mehrfachnutzung für Fahrzeug und Energie", "höchster Abstimmungsbedarf", "Tragwerk plus Elektroinstallation", "Module, Dach und Elektrik kontrollieren", "technisch erweiterbar, aber systemabhängig"], [5, 2, 1, 3, 4]),
    ],
    contexts: [
      context("einzelcarport", "Einzelcarport", "für ein Auto", "Ein Fahrzeug benötigt lichte Breite, Türraum und eine konfliktfreie Pfostenstellung.", "Nutzungspassung und Standortplanung werden ausgewogen hoch gewichtet.", "Dach- und Außenmaß sagen nichts über den engsten lichten Querschnitt.", [35, 30, 15, 10, 10]),
      context("doppelcarport", "Doppelcarport", "für zwei Autos", "Zwei Fahrzeuge erzeugen größere Spannweiten, gemeinsame Rangierflächen und mögliche Konflikte beim Türöffnen.", "Tragwerksplanung und Nutzung dominieren.", "Mittelpfosten und Dachträger müssen im realen Bewegungsraum eingezeichnet werden.", [35, 40, 10, 10, 5]),
      context("suv", "SUV", "für einen SUV", "Fahrzeughöhe, Breite mit Spiegeln und Dachaufbauten benötigen ausreichende lichte Reserven.", "Fahrzeugpassung steht an erster Stelle.", "Prospektklassen ersetzen nicht das Maß des konkreten Fahrzeugs.", [45, 25, 10, 10, 10]),
      context("wohnmobil", "Wohnmobil", "für ein Wohnmobil", "Große Höhe, Länge, Seitenwind und Dachaufbauten erhöhen Anforderungen an Geometrie und Tragwerk.", "Nutzung und Standortplanung erhalten fast das gesamte Gewicht.", "Die Matrix dimensioniert kein Tragwerk für ein Wohnmobil-Carport.", [45, 40, 5, 5, 5]),
      context("e-auto", "E-Auto", "für ein E-Auto", "Ladepunkt, Kabelweg, Schutz vor Anfahren und elektrische Installation gehören zum Stellplatz.", "Nutzung, Planung und Erweiterbarkeit werden hoch gewichtet.", "Elektroarbeiten benötigen eine fachgerechte Planung und Ausführung.", [35, 30, 10, 10, 15]),
      context("schmales-grundstueck", "schmales Grundstück", "für ein schmales Grundstück", "Wand, Grenze, Pfosten und geöffnete Fahrzeugtüren konkurrieren um wenige Zentimeter.", "Standortplanung und konkrete Nutzung dominieren.", "Grenz- und Brandschutzfragen müssen vor der Systemwahl geklärt sein.", [35, 40, 10, 5, 10]),
      context("wind-schnee", "Wind und Schnee", "bei hoher Wind- oder Schneelast", "Exponierte oder schneereiche Standorte verlangen dokumentierte Lastannahmen und passende Fundamente.", "Tragwerksplanung erhält das höchste Gewicht.", "Allgemeine Materialstärken ersetzen keinen standortbezogenen Nachweis.", [20, 60, 5, 10, 5]),
      context("wenig-pflege", "wenig Pflege", "mit möglichst wenig Pflege", "Gesucht wird eine Konstruktion mit gut zugänglichen, planbaren Kontroll- und Instandhaltungsstellen.", "Pflege bekommt das höchste Gewicht, Planung bleibt relevant.", "Auch korrosionsarme Systeme benötigen Kontrollen an Dach, Rinne, Schrauben und Beschädigungen.", [20, 20, 10, 40, 10]),
      context("spaetere-erweiterung", "spätere Erweiterung", "mit späterem Abstellraum", "Ein späterer Schuppen, Sichtschutz oder Ladepunkt verändert Lasten, Windangriff und Bewegungsraum.", "Erweiterbarkeit und Tragwerksplanung werden hoch gewichtet.", "Eine spätere Wand darf nicht ohne Systemfreigabe an das offene Tragwerk gesetzt werden.", [20, 30, 10, 10, 30]),
      context("regenwasser", "Regenwassernutzung", "mit Regenwassernutzung", "Dachfläche, Rinne, Fallrohr, Speicher und sicherer Überlauf müssen als Wasserweg zusammenpassen.", "Standortplanung und Wartungszugang zählen stärker.", "Die geometrische Wassermenge dimensioniert weder Rinne noch Versickerung.", [20, 35, 10, 25, 10]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.modelBuildingCode, GUIDE_SOURCE_LIBRARY.rainwaterManagement, GUIDE_SOURCE_LIBRARY.rainwater],
  },
  {
    topicSlug: "bodenbelag",
    noun: "Bodenbelag",
    directoryTitle: "Bodenbeläge nach Raum und Untergrund vergleichen",
    directoryDescription: "100 Bodenbelag-Vergleiche für Küche, Keller, Fußbodenheizung und Mietwohnung – Laminat, Vinyl, Parkett und Linoleum systematisch prüfen.",
    measurement: "Miss Nettofläche und Raumgeometrie. Dokumentiere Ebenheit, Restfeuchte, vorhandenen Aufbau, Fußbodenheizung, Türhöhen, Übergänge und geplante Verlegerichtung.",
    verification: "Prüfe Nutzungsklasse, Feuchtefreigabe, Untergrund, Unterlage, Wärmedurchlasswiderstand, Verlegeart, Fugen, Emissionen, Pflege, Reparatur und Paketinhalt des konkreten Produkts.",
    limitation: "Die Matrix ist keine Verlegefreigabe. Restfeuchte, Ebenheit, Untergrundvorbereitung und vollständiger Systemaufbau müssen nach Hersteller- und Fachvorgaben geprüft werden.",
    criteria: ["Passung zu Raum und Nutzung", "Untergrund- und Systemplanbarkeit", "Verlegeaufwand", "Pflege und Alltag", "Reparatur und Rückbau"],
    options: [
      option("laminat", "Laminat", "Laminat kombiniert dekorative Oberfläche mit einer holzbasierten Trägerplatte.", "Klicksysteme, große Dekorauswahl und kalkulierbare Pakete passen zu vielen trockenen Wohnräumen.", "Feuchte, Trittschall, Kanten und nicht abschleifbare Oberfläche begrenzen die Anwendung.", ["stark in trockenen Wohnräumen", "Unterlage und Feuchtefreigabe klar prüfen", "Klickverlegung gut planbar", "pflegeleicht, stehende Nässe vermeiden", "Paneele schwer punktuell ersetzbar"], [4, 4, 5, 4, 3]),
      option("klickvinyl", "Klickvinyl", "Klickvinyl verbindet elastische Oberfläche mit schwimmender Paneelverlegung.", "Geringe Aufbauhöhe und feuchteunempfindlichere Varianten sind für Renovierung interessant.", "Untergrundebenheit, Temperatur, Fugen, schwere Einbauten und Materialzusammensetzung sind genau zu prüfen.", ["vielseitig in Alltag und Renovierung", "Ebenheit und Temperatur kritisch", "schnelle Klickmontage", "leicht zu reinigen", "schwimmend rückbaubar, Einzelschaden schwierig"], [5, 3, 5, 5, 3]),
      option("klebevinyl", "Klebevinyl", "Dünne Vinylplanken werden vollflächig auf einen sehr ebenen Untergrund geklebt.", "Geringe Aufbauhöhe, guter Wärmedurchgang und ruhiges Laufgefühl können überzeugen.", "Untergrundvorbereitung, Klebstoff, Emissionen und Rückbau erfordern hohe Sorgfalt.", ["stark für intensive Nutzung und Heizung", "höchster Anspruch an ebenen Untergrund", "fachgerechte Verklebung aufwendig", "pflegeleicht und formstabil", "punktuell reparierbar, Rückbau aufwendig"], [5, 3, 2, 5, 2]),
      option("fertigparkett", "Fertigparkett", "Fertigparkett besitzt eine echte Holzdeckschicht und mehrschichtigen Aufbau.", "Natürliche Haptik, Reparaturmöglichkeiten und langfristige Wohnqualität sind zentrale Stärken.", "Feuchte, Pflege, Holzart, Nutzschicht und Fußbodenheizungsfreigabe bestimmen die Eignung.", ["hochwertig für trockene Wohnbereiche", "Holz und Raumklima sorgfältig planen", "Klick oder Klebung je System", "mehr Pflege und Klimaeinfluss", "teilweise renovierbar, Ersatz farbabhängig"], [5, 4, 3, 2, 5]),
      option("linoleum", "Linoleum", "Linoleum besteht aus überwiegend natürlichen Rohstoffen und wird als Bahn oder modularer Belag angeboten.", "Strapazierfähigkeit und materialtypische Oberfläche passen zu langfristig genutzten Räumen.", "Untergrund, Nahtausbildung, Feuchte, Pflegefinish und häufig fachgerechte Verklebung sind wichtig.", ["robust für viele trockene Innenräume", "Untergrund und Nähte klar planen", "Verklebung meist anspruchsvoll", "pflegeleicht mit passender Behandlung", "Teilreparatur und Rückbau systemabhängig"], [4, 4, 2, 4, 3]),
    ],
    contexts: [
      context("wohnzimmer", "Wohnzimmer", "für das Wohnzimmer", "Haptik, Trittschall, Möbel, Sonne und langfristige Reparaturfähigkeit prägen die Nutzung.", "Alltagspassung und Reparatur werden hoch gewichtet.", "Stuhlrollen und schwere Möbel benötigen produktbezogene Schutz- und Freigaben.", [35, 15, 10, 15, 25]),
      context("kueche", "Küche", "für die Küche", "Spritzwasser, Flecken, schwere Einbauten und viele Laufwege verlangen robuste, gut abgedichtete Details.", "Nutzung und Pflege dominieren.", "Feuchteresistent bedeutet nicht, dass Wasser unter den Belag gelangen darf.", [40, 20, 10, 25, 5]),
      context("keller", "Keller", "für den Keller", "Bodentemperatur, mögliche Feuchte und ein unbekannter Altaufbau machen die Untergrundprüfung zentral.", "Systemplanbarkeit erhält das höchste Gewicht.", "Ein neuer Belag darf Feuchteursachen nicht verdecken.", [25, 45, 10, 10, 10]),
      context("fussbodenheizung", "Fußbodenheizung", "auf Fußbodenheizung", "Belag, Unterlage, Klebstoff und Estrich bilden gemeinsam den Wärmedurchlass und das Temperaturverhalten.", "Systemplanung und Nutzung werden hoch gewichtet.", "Nur die vollständige Herstellerfreigabe des Aufbaus ist belastbar.", [30, 45, 10, 10, 5]),
      context("mietwohnung", "Mietwohnung", "für eine Mietwohnung", "Rückbau, Aufbauhöhe, Trittschall und Abstimmung mit Vermietenden sind wichtige Randbedingungen.", "Verlegung und Rückbau erhalten mehr Gewicht.", "Bauliche Veränderungen oder Verklebung müssen vorab abgestimmt werden.", [20, 20, 25, 10, 25]),
      context("haustiere", "Haustiere", "bei Haustieren", "Krallen, Feuchte, Haare und häufige Reinigung belasten Oberfläche und Fugen.", "Alltagspassung und Pflege dominieren.", "Rutschverhalten und Emissionen sind produktbezogen, nicht pauschal nach Material zu bewerten.", [40, 15, 10, 25, 10]),
      context("kinderzimmer", "Kinderzimmer", "für das Kinderzimmer", "Bodenkontakt, Spiel, Flecken, Akustik und nachweisbare Inhaltsstoffe sind besonders relevant.", "Nutzung, Systemklarheit und Pflege werden ausgewogen hoch bewertet.", "Prüfzeichen und Emissionsangaben des konkreten Produkts müssen nachvollziehbar sein.", [35, 25, 10, 20, 10]),
      context("schnelle-renovierung", "schnelle Renovierung", "für eine schnelle Renovierung", "Kurze Bauzeit und geringe Aufbauhöhe sind wichtig, dürfen Untergrundprüfung und Akklimatisierung aber nicht verdrängen.", "Verlegeaufwand bekommt das höchste Gewicht.", "Schnelle Klickmontage gleicht keine Unebenheit oder Feuchte aus.", [20, 20, 40, 10, 10]),
      context("wenig-pflege", "wenig Pflege", "mit möglichst wenig Pflege", "Gesucht wird eine Oberfläche mit einfacher Reinigung und wenigen empfindlichen Pflegeroutinen.", "Pflege erhält den größten Anteil.", "Fugen, Kratzer und ungeeignete Reinigungsmittel bleiben bei jedem Belag relevant.", [20, 15, 10, 45, 10]),
      context("langfristige-nutzung", "langfristige Nutzung", "für langfristige Nutzung", "Reparatur, Renovierbarkeit, Ersatzmaterial und zeitlose Nutzung zählen stärker als ein schneller Einbau.", "Rückbau und Reparatur werden hoch gewichtet.", "Lebensdauer hängt vom konkreten Produkt, Untergrund und Nutzung ab.", [25, 20, 10, 15, 30]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.eplfFlooring, GUIDE_SOURCE_LIBRARY.mmfaFlooring],
  },
  {
    topicSlug: "trockenbau",
    noun: "Trockenbauplatte",
    directoryTitle: "Trockenbauplatten nach Raumfunktion und Wandaufbau vergleichen",
    directoryDescription: "100 Trockenbau-Vergleiche für Bad, Schallschutz, Lasten und Brandschutz – Plattentypen und Verstärkungen als vollständiges System einordnen.",
    measurement: "Miss Wandlänge, Höhe und jede Öffnung. Dokumentiere Raumfeuchte, geplante Lasten, Installationen sowie Schall- oder Brandschutzanforderungen vor der Materialwahl.",
    verification: "Prüfe vollständigen Systemnachweis aus Profil, Raster, Plattentyp, Lagen, Dämmung, Schrauben, Fugen, Anschlüssen, Türständern, Lastbefestigung sowie Schall- und Brandschutz.",
    limitation: "Die Matrix ersetzt keine Systemfreigabe oder Fachplanung. Sicherheitsrelevante, tragende, Schall-, Feuchte- und Brandschutzanforderungen müssen vollständig nachgewiesen werden.",
    criteria: ["Passung zur Wandfunktion", "System- und Nachweisbarkeit", "Montageaufwand", "Robustheit im Betrieb", "Anpassung an Lasten und Installationen"],
    options: [
      option("gipskarton-standard", "Standard-Gipskarton", "Standardplatten sind leicht, verbreitet und für viele trockene Innenräume vorgesehen.", "Einfache Bearbeitung und breite Systemauswahl erleichtern normale Trennwände.", "Feuchte, hohe Lasten und besondere Schutzanforderungen benötigen andere oder ergänzte Systeme.", ["gut für trockene Standardräume", "viele geprüfte Systemaufbauten", "leicht zu schneiden und verschrauben", "alltagstauglich bei passender Beplankung", "Verstärkungen für Lasten separat planen"], [4, 5, 5, 3, 3]),
      option("feuchtraumplatte", "imprägnierte Gipsplatte", "Imprägnierte Platten reduzieren die Wasseraufnahme für dafür freigegebene Feuchträume.", "Sie lassen sich ähnlich wie Standardplatten in abgestimmten Systemen verarbeiten.", "Sie sind nicht automatisch wasserdicht; Abdichtung, Beanspruchungsklasse und Lüftung bleiben entscheidend.", ["geeignet für definierte Feuchträume", "System und Abdichtung klar nachweisbar", "vertraute Plattenmontage", "robust nur innerhalb zulässiger Feuchte", "Lasten weiterhin separat verstärken"], [5, 5, 4, 4, 3]),
      option("gipsfaser", "Gipsfaserplatte", "Gipsfaserplatten sind dichter und mechanisch belastbarer als viele Standard-Gipskartonplatten.", "Robustheit und teils höhere Lastaufnahme können bei intensiv genutzten Wänden helfen.", "Gewicht, Zuschnitt, Befestigung und vollständige Systemzulassung erhöhen den Aufwand.", ["stark für robuste Innenwände", "geprüfte Systeme verfügbar", "schwerer und anspruchsvoller zu bearbeiten", "höhere mechanische Robustheit", "Lasten nur nach konkreter Freigabe"], [5, 4, 3, 5, 4]),
      option("osb-gips", "OSB plus Gipsplatte", "Eine Holzwerkstofflage hinter Gips kann Befestigungsreserven und Scheibenwirkung im System ergänzen.", "Flexible Befestigungspunkte sind für Küchen, Regale oder Werkstattnutzung attraktiv.", "Feuchteverhalten, Brandschutz, Fugen, Emissionen und Systemnachweis müssen als Kombination geplant werden.", ["stark bei vielen geplanten Lasten", "Kombination benötigt klaren Nachweis", "zusätzliche Lage und Anschlüsse", "robust, aber feuchteabhängig", "Befestigungen flexibel positionierbar"], [5, 2, 2, 5, 5]),
      option("zementbauplatte", "Zementbauplatte", "Zementgebundene Platten sind für hohe Feuchte- und mechanische Beanspruchung erhältlich.", "Nassbereiche und robuste Sonderanwendungen können von passenden Systemen profitieren.", "Gewicht, Staub, Zuschnitt, Befestigung, Abdichtung und Preis sind deutlich anspruchsvoller.", ["stark für definierte Nass- und Robustbereiche", "nur im vollständigen Spezialaufbau", "hoher Bearbeitungsaufwand", "feuchte- und stoßrobust", "Installationen und Lasten systembezogen"], [5, 4, 1, 5, 3]),
    ],
    contexts: [
      context("wohnraum", "Wohnraum", "für eine Wohnraum-Trennwand", "Eine normale Trennwand benötigt klare Maße, Anschlüsse, Türdetails und gegebenenfalls Schallschutz.", "Systemnachweis und einfacher Aufbau werden ausgewogen bewertet.", "Auch eine Standardwand braucht ein vollständiges, passendes System.", [25, 30, 25, 10, 10]),
      context("badezimmer", "Badezimmer", "für das Badezimmer", "Feuchtebeanspruchung, Abdichtung, Lüftung und Installationsdurchdringungen bestimmen den Aufbau.", "Wandfunktion und Nachweisbarkeit dominieren.", "Eine grüne Platte allein ist keine Abdichtung.", [35, 40, 10, 10, 5]),
      context("keller", "Keller", "für den Keller", "Kühle Oberflächen und mögliche Feuchte erfordern Ursachenklärung und einen bauphysikalisch passenden Aufbau.", "Systemplanung erhält das höchste Gewicht.", "Trockenbau darf anhaltende Feuchte oder Schimmel nicht verdecken.", [25, 45, 10, 15, 5]),
      context("schallschutz", "Schallschutz", "für besseren Schallschutz", "Masse, Lagen, Dämmung, Profil, Anschlüsse und flankierende Bauteile wirken nur gemeinsam.", "System- und Nachweisbarkeit dominiert.", "Eine einzelne schwere Platte garantiert keinen Zielwert.", [30, 50, 5, 10, 5]),
      context("brandschutz", "Brandschutz", "mit Brandschutzanforderung", "Klassifizierte Wände dürfen nur als vollständiger geprüfter Aufbau ausgeführt werden.", "Nachweisbarkeit erhält nahezu das gesamte Gewicht.", "Materialnamen oder Plattenfarben ersetzen keinen Verwendbarkeitsnachweis.", [25, 60, 5, 5, 5]),
      context("kuechenschraenke", "Küchenschränke", "für schwere Küchenschränke", "Last, Hebelarm, Befestigungshöhe und genaue Position müssen vor dem Schließen der Wand feststehen.", "Lastanpassung und Wandfunktion werden hoch gewichtet.", "Pauschale Dübellasten sind ohne System, Lage und Lastfall nicht übertragbar.", [35, 25, 10, 10, 20]),
      context("tuer", "mit Türöffnung", "mit einer Türöffnung", "Türständer, Sturz, Zarge, Wandhöhe und Plattenfugen unterbrechen das normale Raster.", "Systemplanung und Montageaufwand werden hoch gewichtet.", "Eine Öffnung wird nicht nur von der Plattenfläche abgezogen.", [25, 35, 25, 10, 5]),
      context("installationen", "Installationswand", "als Installationswand", "Leitungen, Dosen, Vorwandobjekte und Wartungszugang benötigen Platz und Verstärkungen.", "Anpassbarkeit und Systemplanung dominieren.", "Profile dürfen nicht ungeplant geschwächt oder überfüllt werden.", [25, 30, 10, 10, 25]),
      context("werkstatt", "Werkstatt", "für eine Werkstatt", "Stöße, Regale, Werkzeughalter und wechselnde Befestigungspunkte erhöhen die mechanische Beanspruchung.", "Robustheit und Lastanpassung zählen stark.", "Schwere Lasten benötigen dokumentierte Tragpunkte statt improvisierter Dübel.", [30, 20, 10, 25, 15]),
      context("schneller-aufbau", "schneller Aufbau", "für einen schnellen Aufbau", "Kurze Montagezeit ist wichtig, darf Fugenfolge, Installationen und notwendige Nachweise aber nicht verkürzen.", "Montageaufwand erhält das höchste Gewicht.", "Schnellere Plattenmontage spart keine Trocknungs- oder Prüfzeiten automatisch ein.", [20, 20, 45, 10, 5]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.knaufWalls, GUIDE_SOURCE_LIBRARY.gypsumOpenings, GUIDE_SOURCE_LIBRARY.rigipsCatalogs],
  },
  {
    topicSlug: "luftentfeuchter",
    noun: "Entfeuchtungslösung",
    directoryTitle: "Luftentfeuchter-Techniken nach Raum und Temperatur vergleichen",
    directoryDescription: "100 Luftentfeuchter-Vergleiche für Keller, Bad, Wäsche und Baustelle – Kompressor, Adsorption, Peltier und Lüftung realistisch einordnen.",
    measurement: "Berechne verbundenes Raumvolumen und protokolliere Temperatur sowie relative Feuchte über mehrere Tage. Notiere Nutzung, Außenklima, Wasseranfall und erkennbare Feuchteursachen.",
    verification: "Prüfe Leistung bei vergleichbarer Temperatur und Feuchte, Einsatztemperatur, Hygrostat, Leistungsaufnahme, Geräusch, Kondensatablauf, Abtauung, Filter und sicheren Aufstellort.",
    limitation: "Ein Gerät oder Lüftungskonzept beseitigt keine Leckage, Wärmebrücke oder andere bauliche Ursache. Anhaltende Feuchte und Schimmel benötigen fachliche Ursachenklärung.",
    criteria: ["Passung zu Temperatur und Feuchtelast", "Mess- und Regelbarkeit", "Aufstellungsaufwand", "Energie und Wartung", "Flexible Nutzung"],
    options: [
      option("kompressor", "Kondensationsentfeuchter", "Kompressorgeräte kühlen Luft unter den Taupunkt und sammeln Kondensat.", "In temperierten Räumen bieten sie hohe, gut messbare Entfeuchtungsleistung.", "Bei niedrigen Temperaturen sinkt die Leistung; Abtauung, Geräusch und Ablauf müssen passen.", ["stark bei mittleren bis warmen Temperaturen", "Hygrostat und Kondensat gut messbar", "Aufstellen plus Behälter oder Ablauf", "Filter, Abtauung und Stromverbrauch", "mobil zwischen geeigneten Räumen"], [5, 5, 4, 3, 4]),
      option("adsorption", "Adsorptionsentfeuchter", "Adsorptionsgeräte binden Feuchte an einem Sorptionsmaterial und regenerieren es mit Wärme.", "Sie arbeiten auch in kühlen Bereichen wirksam und können tiefe Zielfeuchten erreichen.", "Höherer Energiebedarf, warme Abluft und Geräusch verlangen eine passende Nutzung.", ["stark in kühlen Räumen", "Regelung und Ablauf gut planbar", "Aufstellung mit sicherer Warmluftführung", "höherer Strombedarf und Filterpflege", "mobil, aber Wärmeabgabe beachten"], [5, 5, 3, 2, 4]),
      option("peltier", "Peltier-Entfeuchter", "Kleine thermoelektrische Geräte kondensieren Feuchte ohne Kompressor.", "Kompakte Bauform und leiser Betrieb passen zu sehr kleinen, gering belasteten Bereichen.", "Die Entfeuchtungsleistung ist deutlich begrenzt und für feuchte Keller oder Wäschetrocknung meist nicht ausreichend.", ["nur für kleine geringe Feuchtelasten", "Behälter messbar, Wirkung langsam", "sehr einfach aufzustellen", "geringer Wartungs-, aber dauerhafter Energieeinsatz", "leicht versetzbar"], [2, 3, 5, 4, 5]),
      option("granulat", "Granulat-Entfeuchter", "Passive Salzgranulate binden begrenzte Feuchtemengen ohne Stromanschluss.", "Schränke oder sehr kleine, geschlossene Bereiche können einfach unterstützt werden.", "Keine aktive Luftumwälzung, geringe Kapazität, Verbrauchsmaterial und Verschüttungsrisiko begrenzen die Anwendung.", ["nur für sehr kleine geschlossene Volumen", "Wirkung schwer auf Raumklima zu regeln", "ohne Installation einsetzbar", "Granulat nachfüllen und Flüssigkeit entsorgen", "leicht umstellbar"], [1, 1, 5, 2, 5]),
      option("lueftung", "Feuchtegeführte Lüftung", "Eine geregelte Lüftung tauscht Raumluft nur bei geeigneten Außenbedingungen aus.", "Sie kann Feuchte ohne mobilen Wasserbehälter abführen und Ursachenbeobachtung unterstützen.", "Im Sommer kann warme Außenluft im kühlen Keller zusätzliche Feuchte bringen; Sensorik und Gebäudehülle sind entscheidend.", ["stark bei passendem Außenklima und Luftweg", "Innen- und Außenfeuchte müssen verglichen werden", "Einbau von Sensoren und Luftwegen", "Filter und Ventilatoren warten", "fest installiert, Regelung anpassbar"], [4, 4, 2, 4, 2]),
    ],
    contexts: [
      context("keller-10-grad", "Keller bei 10 °C", "für einen 10 °C kalten Keller", "Niedrige Temperatur verändert Kondensationsleistung und die Wirkung sommerlicher Lüftung.", "Temperaturpassung und Regelbarkeit dominieren.", "Liter-pro-Tag-Werte bei warmen Testbedingungen sind nicht direkt übertragbar.", [45, 30, 5, 15, 5]),
      context("keller-18-grad", "Keller bei 18 °C", "für einen 18 °C warmen Keller", "Ein temperierter Keller ermöglicht andere Gerätekennwerte, benötigt aber weiterhin Ursachen- und Verlaufskontrolle.", "Passung und Messbarkeit stehen im Vordergrund.", "Ein einzelner Hygrometerwert reicht nicht für die Ursachenbewertung.", [40, 30, 10, 15, 5]),
      context("waesche", "Wäschetrocknung", "zum Wäschetrocknen", "Wäsche erzeugt eine zeitlich konzentrierte Feuchtelast und benötigt Luftbewegung, Ablauf und planbare Laufzeit.", "Leistung und Regelbarkeit erhalten das größte Gewicht.", "Gerät, Wäscheabstand und elektrische Aufstellung müssen sicher sein.", [45, 25, 10, 15, 5]),
      context("badezimmer", "Badezimmer", "für das Badezimmer", "Kurze Feuchtespitzen treffen auf elektrische Schutzbereiche und begrenzte Stellfläche.", "Sichere Aufstellung und Regelbarkeit werden hoch gewichtet.", "Nicht jedes mobile Gerät darf im gewünschten Bereich betrieben werden.", [30, 30, 25, 10, 5]),
      context("schlafzimmer", "Schlafzimmer", "für das Schlafzimmer", "Geräusch, Luftstrom und nächtliche Nutzung sind ebenso wichtig wie reine Entfeuchtungsleistung.", "Energie, Wartung und flexible Betriebszeiten zählen stärker.", "Zu trockene Luft und störender Dauerbetrieb sind zu vermeiden.", [25, 25, 10, 25, 15]),
      context("lagerraum", "Lagerraum", "für einen Lagerraum", "Empfindliche Materialien benötigen dokumentierte Feuchtebereiche und eine verlässliche Langzeitregelung.", "Messbarkeit und stabile Passung dominieren.", "Zielfeuchte muss zum konkreten Lagergut passen.", [35, 40, 5, 15, 5]),
      context("baustelle", "Bautrocknung", "für die Bautrocknung", "Hohe Wasserlast, offene Raumverbünde und Baufortschritt unterscheiden sich deutlich von normalem Wohnbetrieb.", "Leistung und Aufstellungsplanung stehen an erster Stelle.", "Professionelle Bautrocknung benötigt Messkonzept und gegebenenfalls Fachplanung.", [50, 25, 15, 5, 5]),
      context("leiser-betrieb", "leiser Betrieb", "für möglichst leisen Betrieb", "Wohnnahe Nutzung verlangt einen realistischen Schallvergleich bei der benötigten Leistungsstufe.", "Energie, Wartung und Flexibilität werden stärker gewichtet.", "Eine niedrige Dezibelangabe bei Minimalstufe sagt wenig über den notwendigen Betrieb aus.", [20, 20, 10, 30, 20]),
      context("wenig-strom", "geringer Stromverbrauch", "mit möglichst wenig Stromverbrauch", "Entscheidend ist Energie pro tatsächlich entfernter Wassermenge unter realen Bedingungen, nicht nur die Anschlussleistung.", "Energie und Regelbarkeit erhalten das größte Gewicht.", "Ein schwaches Gerät kann durch lange Laufzeit mehr Energie benötigen.", [25, 25, 5, 40, 5]),
      context("dauerablauf", "Dauerablauf", "mit dauerhaftem Kondensatablauf", "Unbeaufsichtigter Betrieb verlangt sicheren Schlauchweg, Gefälle, Rückstauschutz und Abschaltung bei Fehlern.", "Aufstellung und Regelbarkeit werden hoch gewichtet.", "Ein angeschlossener Schlauch macht ein Gerät nicht automatisch für unbeaufsichtigten Dauerbetrieb geeignet.", [25, 30, 30, 10, 5]),
    ],
    sources: [GUIDE_SOURCE_LIBRARY.mold, GUIDE_SOURCE_LIBRARY.ventilation],
  },
];

function weightedScore(scores: Scores, weights: Scores) {
  return scores.reduce((sum, score, index) => sum + score * weights[index], 0) / 100;
}

function deScore(value: number) {
  return value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function metadataDescription(text: string) {
  if (text.length <= 158) return text;
  const clipped = text.slice(0, 157);
  return `${clipped.slice(0, clipped.lastIndexOf(" "))}.`;
}

function combinations(options: DecisionCluster["options"]) {
  return options.flatMap((first, firstIndex) => options.slice(firstIndex + 1).map((second) => [first, second] as const));
}

function makeDecisionGuide(
  cluster: DecisionCluster,
  first: DecisionOption,
  second: DecisionOption,
  usage: DecisionContext,
): DecisionGuide {
  const topic = getSeoTopic(cluster.topicSlug);
  if (!topic) throw new Error(`Unbekannter Themenbereich: ${cluster.topicSlug}`);
  const pairSlug = `${first.slug}-oder-${second.slug}`;
  const pairLabel = `${first.label} oder ${second.label}`;
  const slug = `${cluster.topicSlug}-${pairSlug}-${usage.slug}`;
  const scoreA = weightedScore(first.scores, usage.weights);
  const scoreB = weightedScore(second.scores, usage.weights);
  const difference = Math.abs(scoreA - scoreB);
  const winner = scoreA > scoreB ? first : second;
  const loser = scoreA > scoreB ? second : first;
  const isClose = difference < 0.25;
  const verdict = isClose
    ? `${first.label} und ${second.label} liegen in diesem Planungsmodell nah beieinander. Die Entscheidung fällt deshalb über die am Standort verifizierten Muss-Kriterien, nicht über den Gesamtwert allein.`
    : `${winner.label} erreicht für den beschriebenen Kontext den höheren Planungswert. ${loser.label} bleibt sinnvoll, wenn dessen besondere Stärke für dein Projekt ein Muss-Kriterium ist.`;
  const path = `/ratgeber/vergleiche/${cluster.topicSlug}/${slug}/`;
  const title = `${pairLabel}: ${cluster.noun} ${usage.searchLabel}`;

  return {
    topicSlug: cluster.topicSlug,
    pairSlug,
    pairLabel,
    contextSlug: usage.slug,
    contextLabel: usage.label,
    optionA: first.label,
    optionB: second.label,
    scoreA,
    scoreB,
    qualitySignature: `${cluster.topicSlug}|${pairSlug}|${usage.slug}|${deScore(scoreA)}|${deScore(scoreB)}`,
    slug,
    title,
    heading: title,
    description: metadataDescription(`${pairLabel} ${usage.searchLabel}: Entscheidungsmatrix, Aufwand, Pflege, Grenzen und konkrete Prüfschritte für deutsche ${cluster.noun}-Projekte.`),
    intro: `Wer ${pairLabel} ${usage.searchLabel} vergleicht, braucht mehr als eine allgemeine Vor- und Nachteile-Liste. ${usage.situation} Diese Seite legt fünf Kriterien, ihre Gewichtung und alle Annahmen offen. So kannst du erkennen, warum eine Lösung im beschriebenen Kontext besser passen kann und an welcher realen Messung die vorläufige Entscheidung noch scheitern könnte.`,
    takeaway: `${verdict} Der gewichtete Orientierungswert beträgt ${deScore(scoreA)} von 5 für ${first.label} und ${deScore(scoreB)} von 5 für ${second.label}. Das ist eine transparente Entscheidungshilfe, kein Produkt- oder Sicherheitsurteil.`,
    plannerHref: topic.plannerHref,
    plannerLabel: topic.plannerLabel,
    sections: [
      {
        title: `Die konkrete Suchfrage: ${pairLabel} ${usage.searchLabel}`,
        paragraphs: [
          `${usage.situation} ${usage.priority} Dadurch unterscheidet sich diese Entscheidung von einem allgemeinen Material- oder Systemvergleich. Eine Eigenschaft, die in einem anderen Projekt entscheidend ist, kann hier bewusst weniger Gewicht erhalten. Die Matrix zeigt diese Priorisierung sichtbar, damit das Ergebnis nicht wie ein pauschaler Testsieger missverstanden wird.`,
          `${cluster.measurement} Für dieses Szenario gilt außerdem: ${usage.risk} Notiere Maße, Messbedingungen und offene Punkte vor der Produktsuche. Erst wenn diese Eingangsdaten belastbar sind, lässt sich ein konkretes Angebot gegen dieselben Kriterien prüfen.`,
        ],
      },
      {
        title: `${first.label}: Stärken und Grenzen in diesem Kontext`,
        paragraphs: [
          `${first.summary} ${first.strengths} Bezogen auf „${usage.label}“ erreicht die Lösung ihren Nutzen nur dann, wenn die Stärke tatsächlich am schwierigsten Projektpunkt gebraucht wird. Die Einzelbewertungen lauten ${cluster.criteria.map((criterion, index) => `${criterion} ${first.scores[index]}/5`).join(", ")}.`,
          `${first.limits} Besonders zu prüfen ist: ${first.evidence.join("; ")}. Diese Hinweise sind keine versteckten Abzüge, sondern die Bedingungen, unter denen der rechnerische Orientierungswert praktisch tragfähig wird. Fehlt eine relevante Herstellerangabe, bleibt das betreffende Kriterium offen statt automatisch positiv.`,
        ],
      },
      {
        title: `${second.label}: Stärken und Grenzen in diesem Kontext`,
        paragraphs: [
          `${second.summary} ${second.strengths} Für das Szenario „${usage.label}“ wird auch diese Lösung nicht nach Bekanntheit oder Einstiegspreis bewertet, sondern nach denselben fünf Projektkriterien. Die Einzelbewertungen lauten ${cluster.criteria.map((criterion, index) => `${criterion} ${second.scores[index]}/5`).join(", ")}.`,
          `${second.limits} Vor einer Auswahl sind diese Punkte sichtbar zu klären: ${second.evidence.join("; ")}. Eine hohe Punktzahl in einem Komfortkriterium darf keine harte technische Grenze ausgleichen. Deshalb bleiben Muss-Kriterien wie Maß, Standortfreigabe, sichere Montage oder zulässiger Einsatz unabhängig vom Gesamtwert bestehen.`,
        ],
      },
      {
        title: "So funktioniert die gewichtete Entscheidungsmatrix",
        paragraphs: [
          `Jede Option erhält je Kriterium einen Orientierungswert von eins bis fünf. Dieser Wert wird mit dem Kontextgewicht multipliziert; die fünf Gewichte ergeben zusammen 100 Prozent. Für ${usage.label} lauten die Gewichte ${cluster.criteria.map((criterion, index) => `${criterion} ${usage.weights[index]} %`).join(", ")}. Die Rechnung liefert ${deScore(scoreA)} Punkte für ${first.label} und ${deScore(scoreB)} Punkte für ${second.label}.`,
          `${verdict} Ein Unterschied von weniger als 0,25 Punkten wird bewusst als knappe Entscheidung behandelt. Selbst bei größerem Abstand darf ein Muss-Kriterium das Ergebnis umkehren. Wenn beispielsweise nur eine Lösung das reale Maß, die Temperatur, den Druck, die Last oder die Herstellerfreigabe erfüllt, ist die gewichtete Komfortsumme nachrangig.`,
        ],
      },
      {
        title: "Kosten und Aufwand ohne erfundene Preisgenauigkeit vergleichen",
        paragraphs: [
          `Ein belastbarer Vergleich beginnt nicht mit einem einzelnen Shoppreis. Für ${first.label} gehören Anschaffung, notwendige Systemteile, Lieferung, Vorbereitung, Montage, Werkzeug, Verbrauchsmaterial, Pflege und mögliche Ersatzteile in dieselbe Liste. Für ${second.label} wird exakt dieselbe Kostenstruktur verwendet. Nur so wird sichtbar, ob ein günstiger Einstieg später zusätzlichen Aufwand erzeugt.`,
          `Die Seite nennt absichtlich keinen pauschalen Euro-Sieger, weil Preise, Lieferumfang und regionale Arbeiten veränderlich sind. Trage stattdessen zwei aktuelle, vollständig vergleichbare Angebote ein und markiere jede fehlende Position als offen. Bewerte Zeitaufwand separat von Geld: Eigenleistung ist nicht kostenlos, wenn Spezialwerkzeug, Nacharbeit oder ein höheres Fehlerrisiko entstehen.`,
        ],
      },
      {
        title: "Montage, Betrieb und spätere Änderungen gemeinsam denken",
        paragraphs: [
          `${cluster.verification} Prüfe dabei nicht nur die Erstmontage. Zugang für Reinigung, Inspektion, Filter, Befestiger, Fugen, Kabel, Ablauf oder austauschbare Teile gehört bereits in die Planung. Eine Lösung, die am ersten Tag kompakt wirkt, kann im Betrieb unpraktisch werden, wenn Wartungsstellen verdeckt sind.`,
          `${first.label} bietet in diesem Vergleich insbesondere: ${first.evidence[4]}. Bei ${second.label} lautet der entsprechende Punkt: ${second.evidence[4]}. Übertrage diese Aussagen auf die nächsten fünf bis zehn Jahre deines Projekts. Geplante Erweiterungen, geänderte Nutzung und verfügbare Ersatzteile können wichtiger sein als ein kleiner Vorteil beim ersten Aufbau.`,
        ],
      },
      {
        title: "Typische Fehlentscheidung und sinnvolle Gegenprobe",
        paragraphs: [
          `Die häufigste Fehlentscheidung wäre, ${winner.label} allein wegen des höheren Gesamtwerts zu wählen. Der Wert gilt nur für die dokumentierte Gewichtung „${usage.label}“. Ändert sich die Priorität, kann sich das Ergebnis drehen. Setze deshalb das wichtigste persönliche Kriterium probeweise um zehn Prozentpunkte höher und reduziere ein weniger wichtiges Kriterium entsprechend.`,
          `Kontrolliere danach den schwierigsten realen Punkt statt eine ideale Fläche: die engste Stelle, die feuchteste Zone, den ungünstigsten Empfang, die höchste Last oder die niedrigste Temperatur. ${usage.risk} Wenn eine Option dort ausscheidet, dokumentiere den Grund. Diese Gegenprobe liefert mehr Nutzwert als zusätzliche Durchschnittspunkte.`,
        ],
      },
      {
        title: "Vom Vergleich zur belastbaren Auswahl",
        paragraphs: [
          `Erstelle für beide Optionen ein Datenblatt mit denselben Spalten und verlinke die jeweilige technische Quelle. Markiere Angaben als gemessen, berechnet, Herstellerwert oder noch unbekannt. Streiche keine offene Zeile aus der Tabelle, nur weil ein Angebot ansonsten attraktiv wirkt. Eine Entscheidung wird erst belastbar, wenn alle Muss-Kriterien beantwortet sind und die Montage am realen Standort nachvollziehbar bleibt.`,
          `Nutze anschließend den Rechner „${topic.plannerLabel}“, um Maße oder Leistungsrahmen mit deinen eigenen Eingaben zu bestimmen. Vergleiche nur konkrete Produkte oder Systeme, die diesen Rahmen erfüllen. ${cluster.limitation} Genau diese Grenze gehört sichtbar zum Ergebnis, damit aus einer Suchhilfe keine Scheingenauigkeit oder unzulässige Freigabe wird.`,
        ],
      },
    ],
    comparison: {
      caption: `${pairLabel} ${usage.searchLabel}: fünf gleich angewendete Kriterien`,
      columns: ["Prüfkriterium", first.label, second.label],
      rows: cluster.criteria.map((criterion, index) => [
        `${criterion} · Gewicht ${usage.weights[index]} %`,
        `${first.scores[index]}/5 · ${first.evidence[index]}`,
        `${second.scores[index]}/5 · ${second.evidence[index]}`,
      ]),
    },
    checklist: [
      `Suchkontext festhalten: ${usage.situation}`,
      cluster.measurement,
      `Fünf Gewichte prüfen und bei Bedarf bewusst anpassen: ${usage.weights.join(" / ")} Prozent.`,
      `${first.label}: technische Unterlagen statt Werbeaussagen sammeln.`,
      `${second.label}: dieselben Datenfelder und denselben Lieferumfang verlangen.`,
      `Muss-Kriterien vor Komfort und Gesamtpunktzahl prüfen: ${usage.risk}`,
      "Anschaffung, Montage, Wartung und Ersatzteile getrennt kalkulieren.",
      cluster.verification,
      "Entscheidung, Datenstand und noch offene Annahmen mit Datum dokumentieren.",
    ],
    faqs: [
      {
        question: `Was ist besser: ${first.label} oder ${second.label} ${usage.searchLabel}?`,
        answer: `${verdict} Die Antwort gilt nur für die sichtbare Gewichtung dieses Szenarios. Harte Grenzen aus Maß, Standort, Sicherheit oder Herstellerfreigabe gehen immer vor der Punktzahl. Übernimm deshalb nicht nur das Ergebnis, sondern wiederhole die Matrix mit deinen Messwerten und Prioritäten.`,
      },
      {
        question: `Warum hat ${winner.label} hier den höheren Wert?`,
        answer: `${usage.priority} In dieser Gewichtung erreicht ${winner.label} ${deScore(Math.max(scoreA, scoreB))} von 5 Punkten. Der Abstand zu ${loser.label} beträgt ${deScore(difference)} Punkte. Das ist kein universeller Qualitätsabstand, sondern das Ergebnis der fünf offen gelegten Kriterien für „${usage.label}“.`,
      },
      {
        question: "Kann ein einziges Muss-Kriterium die Matrix überstimmen?",
        answer: `Ja. Wenn nur eine Option die reale Abmessung, zulässige Temperatur, hydraulische Bedingung, Tragfähigkeit, Sicherheitsanforderung oder Systemfreigabe erfüllt, scheidet die andere unabhängig von Komfortpunkten aus. Die Matrix sortiert geeignete Lösungen; sie macht ungeeignete Lösungen nicht passend.`,
      },
      {
        question: "Wie vergleiche ich aktuelle Preise fair?",
        answer: `Fordere für beide Varianten denselben Umfang an: Hauptmaterial, Systemteile, Lieferung, Vorbereitung, Montage, Werkzeug, Verbrauchsmaterial und erwartbare Pflege. Rechne keine unbekannte Position mit null Euro. Preise bleiben datumsabhängig und sollten zusammen mit Quelle und Lieferumfang gespeichert werden.`,
      },
      {
        question: "Welche Prüfung fehlt nach dieser Entscheidung noch?",
        answer: `${cluster.verification} Zusätzlich gilt für dieses Szenario: ${usage.risk} ${cluster.limitation}`,
      },
    ],
    sources: [...cluster.sources],
    example: {
      title: `Gewichtete Gegenprobe: ${first.label} und ${second.label}`,
      intro: `Die fünf Kriterien werden für „${usage.label}“ mit insgesamt 100 Prozent gewichtet. Ein Punkt entspricht keiner Messnorm, sondern einem dokumentierten PassendPlanen-Orientierungswert.`,
      steps: [
        ...cluster.criteria.map((criterion, index) => ({
          label: `${criterion} (${usage.weights[index]} %)`,
          value: `${first.label} ${first.scores[index]}/5 · ${second.label} ${second.scores[index]}/5`,
        })),
        { label: `Gesamt ${first.label}`, value: `${deScore(scoreA)} von 5` },
        { label: `Gesamt ${second.label}`, value: `${deScore(scoreB)} von 5` },
      ],
      result: verdict,
      note: `${usage.risk} ${cluster.limitation}`,
    },
    limitation: cluster.limitation,
    relatedLinks: [
      { label: cluster.directoryTitle, href: `/ratgeber/vergleiche/${cluster.topicSlug}/`, description: `Alle 100 kontextbezogenen Vergleiche im Themenbereich ${topic.name} öffnen.` },
      { label: `${topic.name}: Themen-Hub`, href: `/ratgeber/thema/${topic.slug}/`, description: "Grundlagen, Rechner und redaktionelle Ratgeber dieses Themenbereichs." },
      { label: "Konkrete Projektbeispiele", href: `/ratgeber/projekte/${topic.slug}/`, description: "85 Größen- und Nutzungsszenarien mit sichtbarem Rechenweg vergleichen." },
      { label: topic.plannerLabel, href: topic.plannerHref, description: "Eigene Werte eingeben und den persönlichen Planungsrahmen berechnen." },
      { label: "Methodik von PassendPlanen", href: "/methodik/", description: "Gewichtungen, Annahmen, Quellen und Grenzen der Entscheidungshilfen verstehen." },
    ],
  } satisfies DecisionGuide;
}

for (const cluster of clusters) {
  if (cluster.options.length !== 5) throw new Error(`${cluster.topicSlug}: genau fünf Optionen erforderlich`);
  if (cluster.contexts.length !== 10) throw new Error(`${cluster.topicSlug}: genau zehn Kontexte erforderlich`);
  for (const usage of cluster.contexts) {
    if (usage.weights.reduce((sum, value) => sum + value, 0) !== 100) {
      throw new Error(`${cluster.topicSlug}/${usage.slug}: Gewichte ergeben nicht 100`);
    }
  }
}

export const DECISION_GUIDES: readonly DecisionGuide[] = clusters.flatMap((cluster) =>
  combinations(cluster.options).flatMap(([first, second]) =>
    cluster.contexts.map((usage) => makeDecisionGuide(cluster, first, second, usage)),
  ),
);

export const DECISION_GUIDE_DIRECTORIES: readonly DecisionGuideDirectory[] = clusters.map((cluster) => ({
  topicSlug: cluster.topicSlug,
  title: cluster.directoryTitle,
  description: cluster.directoryDescription,
  guides: DECISION_GUIDES.filter((guide) => guide.topicSlug === cluster.topicSlug),
}));

export function getDecisionGuide(topicSlug: string, slug: string) {
  return DECISION_GUIDES.find((guide) => guide.topicSlug === topicSlug && guide.slug === slug);
}

export function getDecisionGuideDirectory(topicSlug: string) {
  return DECISION_GUIDE_DIRECTORIES.find((directory) => directory.topicSlug === topicSlug);
}

export function getDecisionGuidesForTopic(topicSlug: string) {
  return DECISION_GUIDES.filter((guide) => guide.topicSlug === topicSlug);
}

export const DECISION_GUIDE_COUNT = DECISION_GUIDES.length;

if (DECISION_GUIDE_DIRECTORIES.length !== SEO_TOPICS.length) {
  throw new Error("Für jeden SEO-Themenbereich muss ein Vergleichsverzeichnis existieren.");
}
