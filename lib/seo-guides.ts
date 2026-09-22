import type {
  GuideComparison,
  GuideFaq,
  GuideRelatedLink,
  GuideSection,
} from "@/components/seo/GuidePage";
import type { GuideExample, GuideSource } from "@/lib/guide-enrichments";
import { editorializeGuide } from "@/lib/editorial-style";
import { SEO_GUIDE_DEPTH } from "@/lib/seo-guide-depth";
import { SEO_GUIDES_SCENARIOS } from "@/lib/seo-guides-scenarios";
import { SEO_GUIDES_WAVE2 } from "@/lib/seo-guides-wave2";

export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  takeaway: string;
  plannerHref: string;
  plannerLabel: string;
  sections: GuideSection[];
  comparison?: GuideComparison;
  checklist?: string[];
  faqs?: GuideFaq[];
  relatedLinks?: GuideRelatedLink[];
  limitation?: string;
  sources?: GuideSource[];
  example?: GuideExample;
};

const SEO_GUIDES_INITIAL: readonly SeoGuide[] = [
  {
    slug: "gartenhaus-holz-oder-metall",
    title: "Gartenhaus aus Holz oder Metall: Was passt besser?",
    description: "Gartenhaus aus Holz oder Metall vergleichen: Pflege, Haltbarkeit, Klima, Fundament, Aufbau und passende Nutzung verständlich abwägen.",
    heading: "Gartenhaus aus Holz oder Metall: Der Nutzung folgt das Material",
    intro: "Holz und Metall sind keine pauschalen Gewinner. Entscheidend sind Feuchte, gewünschte Optik, Pflegebereitschaft, Lagergut und die konkrete Stellfläche.",
    takeaway: "Wähle Holz, wenn Atmosphäre, Anpassbarkeit und ein warmes Innenklima zählen. Metall ist interessant, wenn geringer Pflegeaufwand und eine robuste, sachliche Hülle wichtiger sind.",
    plannerHref: "/garten/gartenhaus-planer/",
    plannerLabel: "Gartenhaus planen",
    sections: [
      { title: "Holz: anpassbar und wohnlicher", paragraphs: ["Holz lässt sich leichter reparieren, streichen und an vorhandene Gartenarchitektur anpassen. Dafür braucht die Außenhaut einen passenden konstruktiven und regelmäßigen Schutz vor dauerhafter Feuchte.", "Für Fahrräder, Werkbank oder Regale ist nicht nur das Material entscheidend. Türbreite, Innenmaß, Bodenaufbau und eine trockene Aufstellung bestimmen die Alltagstauglichkeit stärker als das Etikett Holzhaus."] },
      { title: "Metall: pflegearm, aber nicht automatisch wartungsfrei", paragraphs: ["Ein Metallhaus kann bei guter Beschichtung wenig Pflege benötigen. Kondensat, scharfe Kanten, Belüftung und Korrosionsschutz an Schnitt- oder Befestigungsstellen bleiben trotzdem zu prüfen.", "Im Sommer kann sich ein dünnwandiges Haus stark aufheizen. Für empfindliches Lagergut zählen deshalb Lüftung, Beschattung und ein geeigneter Bodenaufbau."] },
      { title: "Die Entscheidung in vier Fragen", paragraphs: ["Was gelagert wird, wie oft du zugreifst, ob du nachstreichen möchtest und welches Außenmaß am Standort zulässig ist, gibt die Richtung vor. Reale Innen- und Außenmaße sind aussagekräftiger als Katalogbegriffe."] , bullets: ["Werkstatt und sichtbarer Gartenbau: häufig Vorteile für Holz.", "Schnelles, pflegearmes Geräte-Lager: Metall kann sinnvoll sein.", "Feuchte und Kondensat: Boden, Lüftung und Standort passend einordnen."] },
    ],
  },
  {
    slug: "gartenhaus-mit-boden-worauf-achten",
    title: "Gartenhaus mit Boden: Was du vor dem Kauf prüfen solltest",
    description: "Gartenhaus mit Boden vergleichen: Bodenplatte, Traglast, Feuchte, Türschwelle und Fundament vor dem Kauf richtig einordnen.",
    heading: "Gartenhaus mit Boden: Komfort beginnt unter dem Regal",
    intro: "Ein mitgelieferter Boden kann den Aufbau vereinfachen, ersetzt aber nicht automatisch ein geeignetes Fundament oder den Schutz vor aufsteigender Feuchte.",
    takeaway: "Vergleiche Bodenmaß, Tragfähigkeit, Unterlüftung, Feuchteschutz und Türanschluss mit deinem Lagergut und dem vorgesehenen Fundament.",
    plannerHref: "/garten/gartenhaus-boden/",
    plannerLabel: "Boden fürs Gartenhaus prüfen",
    sections: [
      { title: "Bodenmaß ist nicht Stellmaß", paragraphs: ["Hersteller unterscheiden zwischen Außenmaß, Sockelmaß und Bodenmaß. Für die Stellfläche und das Fundament müssen die Angaben des konkreten Systems zusammenpassen.", "Ein Boden, der innen ausreichend wirkt, kann außen durch Dachüberstand, Wandaufbau oder Türposition deutlich mehr Fläche benötigen."] },
      { title: "Feuchte und Unterlüftung", paragraphs: ["Holzbauteile sollten nicht dauerhaft auf feuchtem Untergrund stehen. Eine konstruktive Trennung, Gefälle und kontrollierte Entwässerung sind wichtiger als eine zusätzliche Folie ohne klare Anschlussdetails.", "Bei Metallhäusern muss außerdem geprüft werden, wie Kondensat abgeführt wird und ob das gelagerte Material empfindlich auf Temperaturwechsel reagiert."] },
      { title: "Traglast und Nutzung", paragraphs: ["Regale, Werkbank, Rasenmäher und Brennholz erzeugen unterschiedliche Lasten. Frage nach zulässiger Bodenlast und Befestigung, bevor schwere Einrichtung oder Punktlasten eingebaut werden."] },
    ],
  },
  {
    slug: "gartenhaus-kosten-vergleich",
    title: "Gartenhaus-Kosten vergleichen: Welche Posten oft fehlen",
    description: "Gartenhaus-Kosten realistisch planen: Haus, Fundament, Boden, Lieferung, Aufbau, Dachentwässerung und Genehmigungsprüfung als Checkliste.",
    heading: "Gartenhaus-Kosten: Der Kaufpreis ist nur der erste Posten",
    intro: "Ein fairer Kostenvergleich braucht dieselbe Größe, Ausstattung und Lieferbedingung. Sonst wirkt ein günstiges Angebot nur deshalb billig, weil wichtige Arbeiten fehlen.",
    takeaway: "Vergleiche immer die Summe aus Haus, Fundament, Boden, Lieferung, Aufbau, Entwässerung und nötiger Standortprüfung.",
    plannerHref: "/garten/gartenhaus-kosten/",
    plannerLabel: "Gartenhaus-Kosten einordnen",
    sections: [
      { title: "Direkte und indirekte Kosten trennen", paragraphs: ["Zum Produkt gehören je nach Angebot Wände, Dach, Tür, Fenster und Boden. Fundament, Unterbau, Schutzanstrich, Dachrinne, Lieferung und Montage stehen häufig separat daneben.", "Auch der Standort kann Zusatzaufwand verursachen: Gefälle, schwieriger Zugang, Entsorgung oder eine notwendige Anpassung der Stellfläche."] },
      { title: "Angebote vergleichbar machen", paragraphs: ["Notiere Außenmaß, Innenfläche, Wandstärke, Boden, Dachform, Tür, Fenster und Lieferumfang in einer gemeinsamen Tabelle. Mit dieser Grundlage lässt sich der Preis pro nutzbarer Fläche sinnvoll einordnen."] , bullets: ["Nicht nur den Preis pro Quadratmeter vergleichen.", "Lieferung und Aufbau mit derselben Annahme rechnen.", "Reserve für Entwässerung, Befestigung und kleine Anpassungen lassen."] },
      { title: "Budgetgrenze vor der Produktsuche", paragraphs: ["Setze eine Budgetspanne und kläre, welche Nutzung geschützt untergebracht werden muss. Eine kleinere, zugängliche Lösung kann besser funktionieren als ein größeres Haus, dessen Zusatzkosten das Budget sprengen."] },
    ],
  },
  {
    slug: "maehroboter-kleiner-garten",
    title: "Mähroboter für kleine Gärten: Worauf es wirklich ankommt",
    description: "Mähroboter für kleine Gärten auswählen: Flächenreserve, Lautstärke, Kanten, Passagen, Ladefläche und Installation verständlich prüfen.",
    heading: "Mähroboter für kleine Gärten: Nicht nur die Quadratmeter zählen",
    intro: "Bei kleinen Rasenflächen entscheiden oft Kanten, Durchgänge, Geräusch und Einrichtung stärker als die maximale Herstellerfläche.",
    takeaway: "Miss die echte Rasenfläche, die engste Passage und die kritischen Kanten. Plane außerdem Ladeposition, tägliche Laufzeit und eine Reserve für Hindernisse ein.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Kleinen Mähbereich berechnen",
    sections: [
      { title: "Nettofläche statt Grundstücksgröße", paragraphs: ["Terrasse, Beete, Spielgeräte, Teich und Wege gehören nicht zur Mähfläche. Getrennte Bereiche und schmale Verbindungen beeinflussen die Auswahl zusätzlich.", "Die Nennfläche des Herstellers ist ein Orientierungswert unter bestimmten Bedingungen. Ein kleiner Garten kann wegen vieler Hindernisse technisch anspruchsvoller sein als eine offene Rasenfläche."] },
      { title: "Leise und wendig", paragraphs: ["In Reihenhausgärten oder dicht bebauten Wohnlagen sind Geräusch, Kantenverhalten und ein unauffälliger Betrieb oft wichtiger als maximale Akkukapazität. Prüfe, wann der Roboter laufen darf und wie nah er an Grenzen arbeitet."] },
      { title: "Ladestation und Wartung", paragraphs: ["Die Ladestation braucht einen trockenen, zugänglichen und signaltechnisch passenden Platz. Messerwechsel, Reinigung, App-Verbindung und Winterlagerung gehören in den Vergleich, auch wenn sie selten in einer Flächenangabe auftauchen."] },
    ],
  },
  {
    slug: "maehroboter-vergleich-kaufkriterien",
    title: "Mähroboter vergleichen: Diese Kriterien sind wichtiger als Top-10-Listen",
    description: "Mähroboter-Vergleich nach Gartenfläche, Steigung, Engstellen, Navigation, Kanten und Wartung – ohne pauschalen Testsieger.",
    heading: "Mähroboter vergleichen: Ein Testsieger passt nicht automatisch zu deinem Garten",
    intro: "Eine belastbare Auswahl richtet sich nach dem Geländeprofil. Modelle und Navigation werden vor diesem Hintergrund sinnvoll gegenübergestellt.",
    takeaway: "Bewerte Geräte nach Nettofläche, Steigung, Engstellen, Hindernissen, Randlösung, Navigation, Geräusch und Wartung. Der Preis wird im Zusammenhang mit diesem Anforderungsprofil betrachtet.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Gartenprofil prüfen",
    sections: [
      { title: "Warum pauschale Top-10-Rankings begrenzt sind", paragraphs: ["Ein Modell kann auf einer offenen Testfläche sehr gut abschneiden und im Garten mit Hang, Bäumen oder mehreren Zonen trotzdem ungeeignet sein. Rankings ändern sich außerdem mit Firmware, Lieferumfang und Preis.", "PassendPlanen veröffentlicht daher keinen erfundenen Testsieger. Die Auswahl sollte aus dokumentierten Anforderungen und überprüfbaren Herstellerdaten entstehen."] },
      { title: "Der Vergleich mit den Standortdaten", paragraphs: ["Fläche, Steigung, engste Passage, Randabstände, Hindernisse und getrennte Zonen bilden die Standortbasis. Gegen diese Angaben werden Navigation, zulässige Bedingungen, Laufzeit, Diebstahlschutz, Geräusch und Service gehalten."] , bullets: ["Fläche inklusive realistischer Reserve", "Steigung und Boden bei feuchten Bedingungen", "Kabel, RTK, Kamera oder LiDAR", "Kanten, Passagen und Nebenflächen", "Wartung, Ersatzmesser und Winterlagerung"] },
      { title: "Produktdaten erst nach dem Standortcheck", paragraphs: ["Wenn geprüfte Produktfeeds verfügbar sind, kann ein Katalog diese Kriterien filtern. Bis dahin bleibt eine transparente Anforderungsliste ehrlicher als eine Top-10-Tabelle ohne belastbare, aktuelle Daten."] },
    ],
  },
  {
    slug: "terrassendielen-wpc-oder-holz",
    title: "WPC oder Holz für die Terrasse: Der praktische Vergleich",
    description: "WPC oder Holz für Terrassendielen vergleichen: Pflege, Hitze, Optik, Splitter, Kosten, Haltbarkeit und Unterkonstruktion abwägen.",
    heading: "WPC oder Holz: Welche Terrassendielen passen zu deinem Alltag?",
    intro: "WPC ist pflegeleicht, Holz wirkt natürlich und kann günstiger starten. Die bessere Wahl hängt von Nutzung, Sonne, Pflege und gewünschter Optik ab.",
    takeaway: "WPC passt häufig zu wenig Pflege und splitterarmer Nutzung; Holz punktet bei natürlicher Haptik und Reparierbarkeit. Vergleiche immer Profil, Unterkonstruktion und Pflegeplan gemeinsam.",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Terrassenbedarf berechnen",
    sections: [
      { title: "Wie sich die Oberfläche im Alltag anfühlt", paragraphs: ["Holz verändert sich sichtbar. Je nach Holzart, Bewitterung und Pflege wird die Oberfläche grauer, rauer oder bekommt kleine Risse. Viele Menschen mögen genau diese natürliche Entwicklung. Wer eine möglichst gleichmäßige Farbe erhalten möchte, muss Reinigung und geeignete Pflege fest einplanen.", "WPC wirkt meist gleichmäßiger und ist häufig splitterarm. Das macht das Material für barfüßig genutzte Flächen interessant. Farbe, Profil und Zusammensetzung unterscheiden sich jedoch deutlich. Musterstücke sollten bei Sonne, Nässe und mit bloßen Füßen geprüft werden, bevor eine große Fläche bestellt wird."] },
      { title: "Sonne und Wärme auf der Terrasse", paragraphs: ["Dunkle Dielen können sich stark erwärmen. Das betrifft Holz ebenso wie WPC, fällt je nach Material und Oberflächenfarbe aber unterschiedlich aus. Auf einer unbeschatteten Südterrasse ist die Oberflächentemperatur deshalb ein echtes Nutzungskriterium und keine kleine Komfortfrage.", "Beschattung, Luftbewegung und die Zeit der direkten Sonneneinstrahlung gehören in die Entscheidung. Liegt die Terrasse am Pool oder wird sie von Kindern genutzt, sollte ein Muster an einem heißen Tag am späteren Standort getestet werden. Herstellerangaben allein bilden diese konkrete Situation selten vollständig ab."] },
      { title: "Der Aufbau entscheidet über die Haltbarkeit", paragraphs: ["Beide Materialien brauchen eine tragfähige Unterkonstruktion, sichere Entwässerung und ausreichend Abstand zu dauerhaft feuchten Flächen. Bei Holz zählen Materialverträglichkeit und konstruktiver Holzschutz. Bei WPC sind die freigegebene Unterkonstruktion, Befestiger und Abstände des jeweiligen Systems maßgeblich.", "WPC Profile können sich bei Temperaturänderungen in Längsrichtung bewegen. Randabstände, Stoßfugen und Befestigung dürfen daher nicht aus einem anderen System übernommen werden. Holz arbeitet ebenfalls mit wechselnder Feuchte. Eine gute Terrasse lässt diesen Bewegungen den vorgesehenen Raum und führt Wasser zuverlässig ab."] },
      { title: "Reparaturen und spätere Ersatzdielen", paragraphs: ["Holzdielen lassen sich häufig schleifen, bearbeiten oder einzeln austauschen. Eine neue Diele kann zunächst anders aussehen und sich erst mit der Zeit angleichen. Bei WPC ist ein Austausch ebenfalls möglich, wenn Profil, Farbe und Befestigungssystem noch verfügbar sind.", "Es lohnt sich, einige passende Dielen trocken und geschützt zurückzulegen. Besonders bei WPC können spätere Produktwechsel oder andere Farbchargen einen unauffälligen Ersatz erschweren. Auch die Konstruktion sollte so geplant sein, dass einzelne Elemente erreichbar bleiben und nicht die gesamte Fläche geöffnet werden muss."] },
      { title: "Pflegeaufwand ehrlich einschätzen", paragraphs: ["Pflegeleicht bedeutet nicht wartungsfrei. Laub, Erde, Fett, Algen und stehendes Wasser müssen von jeder Terrasse entfernt werden. Für Holz kommen je nach gewünschter Optik geeignete Pflegeprodukte hinzu. Bei WPC gelten die freigegebenen Reinigungsmittel und Hinweise zu Flecken oder Hochdruckreinigern.", "Wer wenig Zeit investieren möchte, sollte nicht nur das Material wählen, sondern auch Gefälle, Zugänglichkeit und Verschmutzung am Standort berücksichtigen. Eine schattige Fläche unter Bäumen stellt andere Anforderungen als eine offene Dachterrasse. Der Pflegeplan beginnt deshalb schon mit dem Entwurf."] },
      { title: "Kosten als vollständiges System vergleichen", paragraphs: ["Der Dielenpreis allein ist kein belastbarer Vergleich. Benötigt werden Dielen, Unterkonstruktion, Fundamente oder Auflager, Befestiger, Randabschlüsse, Lieferung und Verschnitt. Kurze Lieferlängen können zusätzliche Stöße und mehr Unterkonstruktion verursachen, obwohl der Quadratmeterpreis günstig aussieht.", "Für einen fairen Langzeitvergleich gehören außerdem Reinigung, mögliche Oberflächenpflege, Ersatzdielen und die Reparierbarkeit dazu. Die günstigere Lösung ist diejenige, die am Standort zuverlässig funktioniert und zum gewünschten Aufwand passt. Eine pauschale Rangfolge zwischen Holz und WPC lässt sich daraus nicht ableiten."] },
    ],
  },
  {
    slug: "terrasse-kosten-materialvergleich",
    title: "Terrasse planen: Kosten von Holz, WPC und Unterkonstruktion vergleichen",
    description: "Terrassenkosten vergleichen: Dielen, Verschnitt, Unterkonstruktion, Befestigung, Fundamente und Pflege als vollständigen Materialrahmen planen.",
    heading: "Terrassenkosten: Materialpreis und Aufbau getrennt sichtbar machen",
    intro: "Die Dielen sind nur ein Teil der Terrasse. Ein transparenter Vergleich zeigt, welche Kosten von Fläche, Aufbau und gewünschter Lebensdauer abhängen.",
    takeaway: "Reihen, Laufmeter und Unterkonstruktion ergeben den Grundbedarf. Befestiger, Randdetails, Fundamente, Lieferung und Pflege werden als eigene Positionen ergänzt.",
    plannerHref: "/garten/terrassen-dielen-rechner/",
    plannerLabel: "Terrassenmaterial berechnen",
    sections: [
      { title: "Dielenfläche ist nicht Bestellmenge", paragraphs: ["Verlegerichtung, Dielenbreite, Fuge und Lieferlänge bestimmen Reihen und Verschnitt. Die rechnerische Fläche wird deshalb erst nach einer konkreten Aufteilung zur Bestellmenge.", "Kurze Lieferlängen können mehr Stöße und zusätzliche Unterkonstruktion erfordern. Vergleiche nicht nur Euro pro Quadratmeter."] },
      { title: "Unterkonstruktion und Befestigung", paragraphs: ["Auflagerabstände, Randabstände, Clips, Schrauben, Verbinder und doppelte Auflager an Stößen gehören in den Materialrahmen. Herstellerangaben und der konkrete Untergrund haben Vorrang vor pauschalen Rasterwerten."] },
      { title: "Langfristige Kosten", paragraphs: ["Holz kann Pflegekosten und Farbveränderung mitbringen, WPC einen höheren Einstieg und stärkere Erwärmung. Entscheide nach Nutzung und Pflegebereitschaft, nicht nach dem ersten Angebotspreis."] },
    ],
  },
  {
    slug: "bewaesserung-tropfschlauch-oder-regner",
    title: "Tropfschlauch oder Regner: Welche Gartenbewässerung passt?",
    description: "Tropfschlauch oder Regner vergleichen: Rasen, Beete und Hecken nach Fläche, Druck, Durchfluss, Pflege und Zonen planen.",
    heading: "Tropfschlauch oder Regner: Bewässerung nach Pflanzenfläche planen",
    intro: "Tropfrohr und Regner lösen unterschiedliche Aufgaben. Die richtige Entscheidung hängt von Pflanzen, Geometrie, Anschlusswerten und Wartung ab.",
    takeaway: "Tropfrohr passt meist zu Hecken und Beeten mit gezielter Abgabe; Regner sind für größere Rasenflächen interessant. Durchfluss und Druck müssen vorher gemessen werden.",
    plannerHref: "/garten/bewaesserungs-planer/",
    plannerLabel: "Bewässerung planen",
    sections: [
      { title: "Pflanzenflächen brauchen unterschiedliche Wasserwege", paragraphs: ["Ein Tropfrohr führt Wasser entlang einer Pflanzreihe und gibt es nahe am Boden ab. Das passt häufig zu Hecken, Gemüsebeeten und Staudenflächen. Entscheidend sind Leitungslänge, Tropferabstand, Abgabe je Tropfer und der zulässige Druckbereich des konkreten Produkts.", "Regner verteilen Wasser über eine zusammenhängende Fläche. Auf Rasen entsteht eine gleichmäßige Versorgung nur, wenn Wurfweiten, Sektoren und Überlappung zur Geometrie passen. Einzelne trockene Ecken werden selten durch längere Laufzeit gelöst, weil dadurch andere Bereiche unnötig viel Wasser erhalten."] },
      { title: "Der Anschluss setzt die technische Grenze", paragraphs: ["Ein Eimertest zeigt den verfügbaren Durchfluss am geplanten Anschluss. Für Regner ist zusätzlich der Fließdruck wichtig, weil ihre Wurfweite unter Last von diesem Wert abhängt. Gemessen wird mit dem späteren Schlauch und zu einer Zeit, in der auch andere typische Verbraucher aktiv sind.", "Lange Leitungen, kleine Querschnitte, Filter, Ventile und Höhenunterschiede verursachen weitere Verluste. Eine Planung, die nur den statischen Druck oder eine Katalogangabe des Hausanschlusses verwendet, kann deshalb auf dem Grundstück deutlich anders funktionieren. Die Verbraucher einer Zone müssen gemeinsam unter den real verfügbaren Werten bleiben."] },
      { title: "Tropfrohr und Regner getrennt steuern", paragraphs: ["Beide Systeme arbeiten häufig mit unterschiedlichen Laufzeiten und Durchflüssen. Ein Beet kann über längere Zeit langsam bewässert werden, während ein Rasenregner in kürzerer Zeit eine größere Wassermenge verteilt. In einer gemeinsamen Zone lässt sich dieser Unterschied kaum sauber ausgleichen.", "Getrennte Ventile oder Ausgänge machen die Steuerung verständlicher. Sie erlauben außerdem, saisonale Änderungen umzusetzen, ohne das gesamte System neu einzustellen. Eine Hecke im zweiten Standjahr braucht möglicherweise eine andere Laufzeit als frisch gesetzte Pflanzen, während der Rasen auf Niederschlag und Temperatur reagiert."] },
      { title: "Boden und Wetter verändern die Laufzeit", paragraphs: ["Sandige Böden nehmen Wasser schnell auf und speichern weniger, schwere Böden reagieren langsamer und können bei hoher Abgabe oberflächlich abfließen. Hanglagen, Mulch und Wurzelraum verändern das Ergebnis zusätzlich. Die Laufzeit wird deshalb am Bodenbild und an der tatsächlichen Feuchte überprüft.", "Wind ist besonders für Regner relevant, weil er die Verteilung verschiebt. Tropfbewässerung reduziert diese Abdrift, kann aber bei beschädigten oder verstopften Tropfstellen unbemerkt ungleichmäßig werden. Regelmäßige Sichtkontrollen bleiben bei beiden Prinzipien notwendig."] },
      { title: "Wartung gehört zur Planung", paragraphs: ["Tropfsysteme benötigen je nach Wasserqualität Filterung und erreichbare Leitungsenden zum Spülen. Regner müssen ausgerichtet, von Bewuchs freigehalten und auf beschädigte Düsen geprüft werden. Ventile, Verbindungen und Steuerung sollten zugänglich bleiben, damit kleine Fehler nicht eine ganze Zone außer Betrieb setzen.", "Vor Frostperioden gelten die Hinweise zur Entleerung und Lagerung des Systems. Rückflussschutz und die sichere Trennung vom Trinkwassernetz müssen den örtlichen Anforderungen entsprechen. Diese Punkte sind Teil der Systemwahl und nicht nur Arbeiten für den ersten Winter."] },
      { title: "Die passende Lösung kann gemischt sein", paragraphs: ["Ein Garten muss sich nicht vollständig für nur ein Prinzip entscheiden. Rasen kann mit Regnern versorgt werden, während Hecken und Beete eigene Tropfzonen erhalten. Wichtig ist, dass jede Zone hydraulisch nachvollziehbar bleibt und nur Verbraucher mit ähnlicher Abgabe und Laufzeit gemeinsam betrieben werden.", "Die Auswahl beginnt mit einer Skizze für Flächen und Leitungen. Darin stehen Pflanzenbereiche, Höhen, Anschluss, Leitungswege und geplante Ventile. Auf dieser Grundlage werden Durchfluss und Druck je Zone geprüft. So entsteht ein System, das sich warten und später erweitern lässt."] },
    ],
  },
  {
    slug: "gewaechshaus-glas-oder-polycarbonat",
    title: "Gewächshaus aus Glas oder Polycarbonat: Vor- und Nachteile",
    description: "Glas oder Polycarbonat im Gewächshaus vergleichen: Licht, Bruchsicherheit, Wärmedämmung, Gewicht, Reinigung und Lüftung abwägen.",
    heading: "Glas oder Polycarbonat: Das Gewächshausmaterial folgt dem Standort",
    intro: "Glas bietet klare Optik und hohe Lichtdurchlässigkeit; Polycarbonat ist leichter und schlagzäher. Entscheidend sind Klima, Standort, Pflege und Konstruktion.",
    takeaway: "Wähle nicht nur nach Licht: Prüfe Sicherheit, Gewicht, Dämmung, Beschattung, Lüftung, Reinigung und die Freigaben des konkreten Systems.",
    plannerHref: "/garten/gewaechshaus-planer/",
    plannerLabel: "Gewächshaus planen",
    sections: [
      { title: "Licht ist mehr als reine Durchsicht", paragraphs: ["Klares Glas lässt den Innenraum offen wirken und bietet meist eine gute Lichtdurchlässigkeit. Pflanzen profitieren jedoch nicht automatisch von der größtmöglichen direkten Einstrahlung. An heißen Tagen können Temperaturspitzen, Blattverbrennungen und der Bedarf an Beschattung wichtiger sein als eine klare Sicht durch die Scheibe.", "Mehrwandplatten aus Polycarbonat streuen das Licht stärker. Dadurch entstehen weniger harte Schatten, die Durchsicht ist aber eingeschränkt. Lichtdurchgang, Schutz vor UV Strahlung und Alterung hängen vom konkreten Plattenaufbau ab. Allgemeine Aussagen über Polycarbonat reichen für einen Produktvergleich deshalb nicht aus."] },
      { title: "Gewicht und Bruchverhalten prägen die Konstruktion", paragraphs: ["Glas ist schwerer und verlangt eine dafür ausgelegte Rahmenkonstruktion, sichere Montage und ein passendes Fundament. Die Glasart bestimmt, wie eine Scheibe bei Bruch reagiert. Für Bereiche mit spielenden Kindern, herabfallenden Ästen oder häufigem Geräteverkehr ist die Sicherheitsausführung besonders relevant.", "Polycarbonat ist leichter und in vielen Ausführungen schlagzäher. Das vereinfacht die Handhabung, macht die Fläche aber nicht unempfindlich gegen Sturm oder unsachgemäße Befestigung. Platten müssen gegen Windsog gesichert sein, korrekt in den Profilen sitzen und an den Kammern nach Systemvorgabe abgeschlossen werden."] },
      { title: "Wärmeverluste hängen am gesamten Gebäude", paragraphs: ["Einfachglas verliert mehr Wärme als viele Mehrwandplatten. Für eine frühe Anzucht oder frostfreie Nutzung kann der Plattenaufbau deshalb relevant werden. Trotzdem bestimmen auch Rahmen, Fugen, Tür, Sockel und Lüftungsöffnungen, wie schnell Wärme entweicht.", "Eine bessere Dämmwirkung ersetzt keine Planung des gewünschten Temperaturbereichs. Wer im Winter kultivieren möchte, muss Pflanzenziel, Standort, Volumen und mögliche Heizung zusammen betrachten. Für ein unbeheiztes Sommergewächshaus kann dagegen eine wirksame Lüftung wichtiger sein als der beste rechnerische Dämmwert."] },
      { title: "Sommerliche Lüftung bleibt die Hauptaufgabe", paragraphs: ["Dachfenster führen warme Luft ab, während Tür oder bodennahe Öffnungen kühlere Luft nachströmen lassen. Die notwendige Öffnungsfläche hängt von Größe, Standort und Nutzung ab. Automatische Fensteröffner helfen nur, wenn Anzahl und Position der Öffnungen grundsätzlich passen.", "Beschattung sollte erreichbar und windfest geplant werden. Innenliegende Lösungen reduzieren die Einstrahlung anders als außenliegende. Bei beiden Verglasungsarten sind tägliche Kontrolle, freie Luftwege und ausreichend Abstand hoher Pflanzen zu den Öffnungen entscheidend."] },
      { title: "Reinigung und Reparatur unterscheiden sich", paragraphs: ["Glas besitzt eine harte, glatte Oberfläche und lässt sich meist gut reinigen. Bricht eine Scheibe, müssen Format, Glasart und Befestigung sicher ersetzt werden. Bei älteren Systemen ist wichtig, ob passende Scheiben und Dichtungen noch erhältlich sind.", "Polycarbonat kann empfindlicher gegen Kratzer und ungeeignete Reinigungsmittel sein. In offenen Kammern können sich Feuchte oder Schmutz sammeln, wenn Abschlussdetails fehlen. Ersatzplatten müssen zu Stärke, UV Seite und Profilaufnahme passen. Eine beliebige Platte aus dem Baumarkt ist nicht automatisch kompatibel."] },
      { title: "Der Standort gibt der Materialwahl ihren Rahmen", paragraphs: ["Unter Bäumen zählen Stoßrisiko, Verschmutzung und Schatten anders als auf einer freien, windigen Fläche. In einem kleinen Familiengarten können Sicherheit und Gewicht wichtiger sein. Bei einer repräsentativen Anlage spielen klare Optik und langfristige Ersatzmöglichkeiten eine größere Rolle.", "Verglichen wird immer das vollständige Gewächshaussystem. Dazu gehören Rahmen, Verglasung, Fundament, Verankerung, Lastfreigaben, Lüftung und Ersatzteile. Erst wenn diese Punkte zum Standort passen, ist die Abwägung zwischen Glas und Polycarbonat wirklich belastbar."] },
    ],
  },
  {
    slug: "carport-holz-oder-aluminium",
    title: "Carport aus Holz oder Aluminium: Was passt zum Stellplatz?",
    description: "Carport aus Holz oder Aluminium vergleichen: Pflege, Optik, Spannweiten, Entwässerung, Montage und Standortanforderungen prüfen.",
    heading: "Holz oder Aluminium beim Carport: Nicht nur eine Stilfrage",
    intro: "Holz und Aluminium unterscheiden sich bei Pflege, Optik, Gewicht und Systemaufbau. Fahrzeug, Zufahrt und Standort geben der Auswahl ihren Rahmen.",
    takeaway: "Lichte Breite, Länge, Höhe und Rangierraum bilden die Grundlage. Danach lassen sich Materialpflege, Tragwerk, Entwässerung und Montagebedingungen des konkreten Systems einordnen.",
    plannerHref: "/garten/carport-planer/",
    plannerLabel: "Carport-Raum planen",
    sections: [
      { title: "Holz: natürlich und anpassbar", paragraphs: ["Holz lässt sich optisch gut in Gärten integrieren und bei vielen Systemen anpassen. Schutzanstrich, Feuchteabstand, Verbindungsmittel und regelmäßige Kontrolle bleiben Teil der Nutzung."] },
      { title: "Aluminium: leicht und pflegearm", paragraphs: ["Aluminiumprofile können schlank und wartungsarm sein. Die konkrete Tragfähigkeit, Verbindung und Dachausführung sind Systemthemen und lassen sich nicht aus dem Materialnamen ableiten."] },
      { title: "Dachwasser und Zufahrt", paragraphs: ["Ein Carport muss nicht nur das Auto überdecken. Gefälle, Dachkante, Rinne, Fallrohr, Rangierraum und Sicht auf die Zufahrt sollten vor dem Kauf auf dem Grundstück geprüft werden."] },
    ],
  },
  {
    slug: "bodenbelag-laminat-oder-vinyl",
    title: "Laminat oder Vinyl: Welcher Bodenbelag passt zum Raum?",
    description: "Laminat oder Vinyl vergleichen: Feuchte, Trittschall, Pflege, Nutzung, Fußbodenheizung, Untergrund und Paketbedarf einordnen.",
    heading: "Laminat oder Vinyl: Die Raumnutzung entscheidet",
    intro: "Laminat und Vinyl sehen sich oft ähnlich, reagieren aber unterschiedlich auf Feuchte, Untergrund, Wärme und Belastung.",
    takeaway: "Raumfeuchte, Untergrund, Nutzung, Trittschall und Herstellerfreigaben für Fußbodenheizung entscheiden über die Eignung. Dekor und Paketpreis sind im nächsten Schritt sinnvoll vergleichbar.",
    plannerHref: "/haus/boden/bodenbelag-rechner/",
    plannerLabel: "Bodenmaterial berechnen",
    sections: [
      { title: "Feuchte und Raumklima", paragraphs: ["Vinyl kann je nach System feuchteunempfindlicher wirken, ist aber nicht automatisch für jeden Untergrund oder Nassraum freigegeben. Laminat braucht einen passenden Feuchteschutz und darf nicht auf unklarem Untergrund verlegt werden."] },
      { title: "Untergrund und Wärme", paragraphs: ["Ebenheit, Restfeuchte, Unterlage und Wärmedurchlasswiderstand sind vor der Verlegung zu prüfen. Bei Fußbodenheizung zählt die Systemfreigabe aus Boden und Unterlage zusammen."] },
      { title: "Kosten nicht nur pro Quadratmeter", paragraphs: ["Rechne Pakete, Verschnitt, Übergangsprofile, Sockelleisten, Unterlage und mögliche Untergrundarbeiten zusammen. Die günstigere Diele kann durch Zusatzmaterial am Ende teurer werden."] },
    ],
  },
  {
    slug: "luftentfeuchter-kompressor-oder-adsorption",
    title: "Kompressor- oder Adsorptionstrockner: Welcher Luftentfeuchter passt?",
    description: "Kompressor oder Adsorption beim Luftentfeuchter vergleichen: Temperatur, Energie, Geräusch, Wäsche, Keller und Raumvolumen richtig einordnen.",
    heading: "Kompressor oder Adsorption: Raumtemperatur ist ein hartes Auswahlkriterium",
    intro: "Die Liter-pro-Tag-Angabe allein sagt wenig. Temperatur, Feuchtelast, Laufzeit, Geräusch und Ablauf entscheiden, welche Technik sinnvoll ist.",
    takeaway: "Kompressorgeräte sind oft bei wärmeren Räumen effizient; Adsorption kann bei niedrigeren Temperaturen interessanter sein. Prüfe immer reale Bedingungen und die Ursache der Feuchte.",
    plannerHref: "/haus/raumklima/luftentfeuchter-rechner/",
    plannerLabel: "Raumklima berechnen",
    sections: [
      { title: "Kompressorgeräte brauchen passende Temperaturen", paragraphs: ["Ein Kompressorgerät kühlt Luft an einer kalten Fläche ab, sodass Wasser kondensiert und gesammelt oder abgeleitet werden kann. Dieses Prinzip arbeitet in vielen beheizten Wohnräumen, Waschküchen und mäßig warmen Kellern effizient. Wie viel Wasser tatsächlich entzogen wird, hängt stark von Temperatur und Ausgangsfeuchte ab.", "Die beworbene Literleistung stammt häufig aus warmen und feuchten Prüfbedingungen. Ein kühler Keller erreicht diese Werte nicht automatisch. Für den Vergleich sind deshalb Leistungsangaben bei einer Temperatur interessant, die dem echten Raum entspricht. Fehlt diese Angabe, bleibt die Eignung unsicher."] },
      { title: "Adsorption kann in kühlen Räumen sinnvoll sein", paragraphs: ["Adsorptionsgeräte binden Feuchtigkeit an einem Material und führen sie durch Erwärmung wieder ab. Sie können ihre Entfeuchtungswirkung bei niedrigeren Temperaturen besser halten als manche Kompressormodelle. Das macht sie für unbeheizte Räume oder besondere Trocknungsaufgaben interessant.", "Der Vorteil bei Kälte kann mit höherer elektrischer Leistungsaufnahme und zusätzlicher Wärme im Raum einhergehen. Auch Adsorptionsgeräte sind nicht leise oder sparsam, nur weil kein klassischer Kompressor arbeitet. Geräusch, Luftstrom und Wärmeabgabe müssen zur Nutzung passen."] },
      { title: "Raumtemperatur und Feuchte gemeinsam protokollieren", paragraphs: ["Eine einzelne Hygrometeranzeige reicht für die Auswahl selten aus. Sinnvoll ist ein Verlauf über mehrere Tage mit Werten am Morgen, am Abend und nach typischen Feuchteereignissen. Dazu gehören Wäschetrocknung, Duschen, Lüften oder sommerlich warme Außenluft im kühlen Keller.", "Das Raumvolumen ergänzt diese Messung. Zwei Räume mit gleicher Grundfläche können durch unterschiedliche Höhe und Luftverbindung einen anderen Bedarf haben. Türen, offene Treppen, häufiges Lüften und nachströmende Feuchte beeinflussen die Laufzeit ebenfalls."] },
      { title: "Stromkosten entstehen aus Leistung und Laufzeit", paragraphs: ["Die elektrische Aufnahmeleistung allein beschreibt nicht die Kosten. Ein stärkeres Gerät kann sein Ziel schneller erreichen und anschließend pausieren, während ein kleineres lange läuft. Umgekehrt kann ein Adsorptionsgerät in einem kalten Raum wirksam sein, aber pro Betriebsstunde deutlich mehr Energie benötigen.", "Für eine realistische Spanne werden Leistungsaufnahme, tägliche Laufzeit und Strompreis miteinander verrechnet. Der Hygrostat sollte den Betrieb am sinnvollen Zielwert beenden. Dauerbetrieb ohne überprüfbares Ziel kann teuer werden und die Ursache der Feuchte verdecken."] },
      { title: "Tank und Dauerablauf bestimmen den Alltag", paragraphs: ["Ein kleiner Tank kann bei hoher Feuchtelast häufig voll sein. Das Gerät stoppt dann, bis der Behälter geleert wird. Für unbeaufsichtigte Keller oder die Wäschetrocknung ist ein sicherer Dauerablauf oft wichtiger als eine etwas höhere Nennleistung.", "Der Ablaufschlauch benötigt je nach Gerät ein durchgehendes Gefälle oder eine geeignete Pumpe. Rückstau, Knicke, Frost und ein unsicherer Auslauf müssen ausgeschlossen werden. Auch der automatische Wiederanlauf nach einer Stromunterbrechung sollte geprüft werden."] },
      { title: "Die Feuchteursache bleibt eine eigene Aufgabe", paragraphs: ["Ein Entfeuchter kann Luftfeuchte reduzieren, repariert aber keine Leckage, undichte Außenwand oder Wärmebrücke. Bei sichtbarem Wassereintritt, Schimmel oder dauerhaft feuchten Bauteilen braucht es eine fachliche Ursachenklärung. Das Gerät kann begleitend helfen, ersetzt diese Untersuchung jedoch nicht.", "In Kellern ist sommerliche Kondensation häufig ein Thema. Warme Außenluft bringt Feuchtigkeit in einen kühlen Raum, wo die relative Feuchte steigt. Hier kann falsches Lüften die Situation verschärfen. Messwerte und bauliche Einordnung entscheiden, ob Kompressor, Adsorption oder eine veränderte Lüftungsstrategie sinnvoll ist."] },
    ],
  },
  {
    slug: "trockenbauwand-einfach-oder-doppelt-beplankt",
    title: "Trockenbau einfach oder doppelt beplanken?",
    description: "Trockenbauwand einfach oder doppelt beplanken: Stabilität, Schallschutz, Brandschutz, Gewicht, Öffnungen und Systemfreigaben vergleichen.",
    heading: "Einfach oder doppelt beplankt: Die Wandaufgabe entscheidet",
    intro: "Mehr Plattenlagen können Eigenschaften verbessern, ersetzen aber kein abgestimmtes Trockenbausystem und keine fachgerechte Ausführung.",
    takeaway: "Wähle die Beplankung nicht nach Quadratmeterpreis, sondern nach Wandhöhe, Lasten, Schall- und Brandschutzanforderung sowie dem freigegebenen System.",
    plannerHref: "/haus/innenausbau/trockenbau-rechner/",
    plannerLabel: "Trockenbau berechnen",
    sections: [
      { title: "Die Wandaufgabe bestimmt den Aufbau", paragraphs: ["Eine einfache Beplankung kann für leichte Trennwände mit überschaubaren Anforderungen ausreichen, wenn das gewählte System Wandhöhe, Profilabstand und Nutzung freigibt. Die geringere Plattenmenge spart Gewicht, Transport und Arbeitszeit. Sie ist jedoch keine sinnvolle Abkürzung, wenn Schall, Feuer oder hohe Lasten nachgewiesen werden müssen.", "Eine zweite Lage erhöht die Masse und kann die Wand steifer machen. Wie stark sich Schallschutz oder Feuerwiderstand verbessern, steht nur für geprüfte Gesamtsysteme fest. Plattentyp, Profile, Dämmung, Schrauben, Fugenversatz und Randanschlüsse gehören gemeinsam zu dieser Leistung."] },
      { title: "Schallschutz entsteht an der ganzen Wand", paragraphs: ["Mehr Plattenmasse kann hilfreich sein, doch Schall findet auch Wege über Decke, Boden, angrenzende Wände, Türen und undichte Anschlüsse. Steckdosen gegenüberliegend in derselben Wand oder schlecht geschlossene Fugen können einen guten Aufbau schwächen.", "Für ein definiertes Schutzziel wird ein geprüfter Wandaufbau gewählt und vollständig übernommen. Dazu gehören Profilbreite, Ständerabstand, Dämmstoff, Zahl und Art der Plattenlagen sowie die Anschlussausführung. Ein einzelner guter Plattenwert ist kein Nachweis für die fertige Wand."] },
      { title: "Brandschutz lässt sich nicht frei kombinieren", paragraphs: ["Bei einer Brandschutzanforderung zählt die klassifizierte Konstruktion. Eine zusätzliche Standardplatte macht aus einer beliebigen Wand nicht automatisch eine freigegebene Brandschutzwand. Öffnungen, Leitungsdurchführungen, Dosen und Anschlüsse müssen zum System gehören oder entsprechend nachgewiesen werden.", "Herstellerunterlagen nennen zulässige Höhen, Profile, Platten, Schraubenabstände und Fugenbehandlung. Diese Vorgaben werden als Einheit betrachtet. Änderungen an nur einem Bestandteil können die übertragbare Klassifizierung aufheben."] },
      { title: "Hängeschränke und Türen brauchen geplante Verstärkung", paragraphs: ["Küchenschränke, Sanitärobjekte, Fernseher oder schwere Regale erzeugen andere Lasten als Bilder. Eine doppelte Lage kann Befestigungen unterstützen, ersetzt bei hohen oder auskragenden Lasten aber keine Traverse oder zusätzliche Unterkonstruktion. Last und Befestigungspunkte sollten vor dem Schließen der Wand feststehen.", "Türöffnungen verändern das Ständerwerk ebenfalls. Türblattgewicht, Zarge und Öffnungsbreite bestimmen, welche Profile und Verstärkungen nötig sind. Plattenfugen dürfen nicht ungeprüft an belasteten Öffnungsecken enden."] },
      { title: "Fugenversatz und Schrauben gehören zum System", paragraphs: ["Bei zwei Lagen werden die Fugen nach Systemvorgabe gegeneinander versetzt. Die erste Lage wird ausreichend befestigt und die zweite Lage erhält passende Schraubenlängen und Abstände. Werden beide Lagen gleich gestoßen, geht ein wichtiger konstruktiver Vorteil verloren.", "Auch die Verspachtelung der unteren Lage richtet sich nach dem vorgesehenen Aufbau. Sichtqualität und technische Fugenbehandlung sind unterschiedliche Aufgaben. Für eine hochwertige Oberfläche kommen Grundierung, Spachtelstufe und spätere Beschichtung zusätzlich in die Planung."] },
      { title: "Materialmenge mit Seiten und Lagen rechnen", paragraphs: ["Die Wandfläche wird für jede bekleidete Seite ermittelt und mit der Lagenzahl multipliziert. Öffnungen reduzieren die Fläche, verursachen aber zusätzliche Zuschnitte und Profile. Das Plattenformat entscheidet, welche Reste sinnvoll weiterverwendet werden können und wie hoch die Reserve ausfällt.", "Zur Bestellung gehören außerdem Randprofile, Ständerprofile, Dämmung, Schrauben, Fugenmaterial, Dichtungsband und Verstärkungen. Der Rechner liefert dafür einen transparenten Mengenrahmen. Die verbindliche Ausführung folgt dem gewählten System und den Anforderungen des konkreten Raums."] },
    ],
  },
] as const;

const RAW_SEO_GUIDES: readonly SeoGuide[] = [
  ...SEO_GUIDES_INITIAL,
  ...SEO_GUIDES_WAVE2,
  ...SEO_GUIDES_SCENARIOS,
];

export const SEO_GUIDES: readonly SeoGuide[] = RAW_SEO_GUIDES.map(editorializeGuide);

export function getSeoGuide(slug: string) {
  const guide = SEO_GUIDES.find((candidate) => candidate.slug === slug);
  return guide ? editorializeGuide({ ...guide, ...SEO_GUIDE_DEPTH[slug] }) : undefined;
}
