import type { ProjectExample } from "@/lib/project-examples";

type EditorialProject = ProjectExample;

export function applyEditorialProjectExample<T extends EditorialProject>(example: T): T {
  if (example.slug === "gartenhaus-3x3-meter-werkstatt") return workshop(example);
  if (example.slug === "gartenhaus-5x5-meter-gartenmoebel") return furnitureStorage(example);
  return example;
}

function workshop<T extends EditorialProject>(example: T): T {
  return {
    ...example,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/projekte/gartenhaus/gartenhaus-3x3-meter-werkstatt/",
      primaryIntent: "An einem Gartenhaus mit drei mal drei Metern die tatsächlich nutzbare Werkstattfläche und einen gangbaren Grundriss prüfen.",
      distinctValue: "Ein offengelegter Maßplan trennt Außenmaß, angenommene Wandstärke, Werkbanktiefe, Tür und Arbeitsweg. Er zeigt ausdrücklich, weshalb eine freie Quadratmeterzahl allein keine Werkstatt freigibt.",
      overlapReview: ["/ratgeber/gartenhaus-3x3-meter/", "/ratgeber/gartenhaus-mit-werkstatt/", "/garten/gartenhaus-groesse/"],
    },
    title: "3 × 3 Meter Gartenhaus als Werkstatt nutzen",
    heading: "Passt eine Werkstatt in ein Gartenhaus mit 3 × 3 Metern?",
    description: "Werkbank, Tür und Laufweg in einem 3 × 3 Meter Gartenhaus prüfen. Maßbeispiel mit Innenraum, Stellflächen, Strom und offenen Grenzen für die Werkstatt.",
    intro: "Neun Quadratmeter Außenfläche klingen nach viel Platz. Für eine Werkstatt zählt aber, ob sich die Tür öffnen lässt, eine Werkbank bedienbar bleibt und lange Werkstücke überhaupt hineinpassen. Dieses Beispiel zeichnet die Engstellen mit Maßen nach.",
    takeaway: "Im frei gewählten Maßbeispiel bleibt vor einer 65 Zentimeter tiefen Werkbank eine Raumtiefe von 2,19 Metern. Das ist keine pauschal freie Arbeitsfläche. Türflügel, Maschinen, Regale und die Länge der Werkstücke können diesen Bereich einschränken.",
    sections: [
      { title: "Was von drei Metern außen innen übrig bleibt", paragraphs: [
        "Für die Skizze werden drei Meter Außenbreite und Außenlänge angenommen. Wenn Wand und Aufbau je Seite zusammen acht Zentimeter beanspruchen, ergibt das rechnerisch 2,84 Meter lichte Breite und Länge. Diese acht Zentimeter sind nur eine Beispielannahme, kein typischer oder zugesicherter Wert für ein Gartenhaus.",
        "Suche beim konkreten Modell die nutzbaren Innenmaße in der Maßzeichnung. Bodenaufbau, Wandprofile, Eckpfosten und Dachform können den Innenraum anders begrenzen. Auch das Fundament folgt nicht automatisch dem Außenmaß des Hauses. Eine Kaufentscheidung auf Basis der neun Quadratmeter wäre daher zu früh.",
      ] },
      { title: "Die Werkbank an der Rückwand", paragraphs: [
        "Eine 65 Zentimeter tiefe Werkbank an der Rückwand lässt im Beispiel 2,84 minus 0,65 Meter und damit 2,19 Meter bis zur gegenüberliegenden Innenwand. Diese Strecke ist nur dann nutzbar, wenn dort weder Regal noch geöffnete Tür hineinragt. Sie sagt noch nichts über die bequeme Bewegung an der Bank aus.",
        "Lege die Bankbreite nach den größten Werkstücken fest. Ein Schraubstock kann seitlich überstehen, und bei einer Säge zählt auch die Fläche vor und hinter dem Schnitt. Markiere diese Arbeitsbewegungen auf der Skizze. Ein Gerät passt möglicherweise auf die Bank, ist aber im Betrieb nicht sicher zu bedienen.",
      ] },
      { title: "Tür und Transportweg als Belastungsprobe", paragraphs: [
        "Miss nicht nur den Türflügel, sondern die lichte Öffnung bei vollständig geöffneter Tür. Eine breite Tischplatte oder ein Fahrrad kann trotz ausreichend großer Innenfläche an der Tür scheitern. Auch Schwelle, Stufe und der Weg vom Grundstückstor bis zum Haus gehören zu diesem Test.",
        "Zeichne die Öffnungsrichtung ein und spiele den Transport des längsten geplanten Werkstücks durch. Wenn dieses nur diagonal eingebracht werden kann, müssen Werkbank und Regale während des Transports frei bleiben. Die Türbreite lässt sich nicht durch eine größere Grundfläche ausgleichen.",
      ] },
      { title: "Regale brauchen einen erreichbaren Gang", paragraphs: [
        "Ein 45 Zentimeter tiefes Regal an einer Seitenwand beansprucht nicht nur Stellfläche. Schubladen, Kisten und herausgezogene Bretter benötigen davor Bedienraum. Im Beispiel blieben quer zur Regalwand 2,84 minus 0,45 Meter, also 2,39 Meter bis zur anderen Wand, solange diese frei ist.",
        "Stelle ein zweites Regal oder eine Maschine gegenüber, verkleinert sich genau dieser Querschnitt. Prüfe den schmalsten Abschnitt an mehreren Stellen und mit geöffneten Türen. Eine einzige summierte Restfläche verschweigt, ob du an der Werkbank vorbeikommst oder eine Kiste herausziehen kannst.",
      ] },
      { title: "Strom, Licht und Luft gehören in den Grundriss", paragraphs: [
        "Werkzeuge brauchen einen sicheren Stromanschluss, genügend Licht auf der Arbeitsfläche und eine Installation, die zum Standort passt. Ein Verlängerungskabel quer durch die Tür ist keine dauerhaft geplante Elektroversorgung. Leitungen und Steckdosen sollten mit einer Elektrofachkraft abgestimmt werden.",
        "Beim Sägen und Schleifen entstehen Staub und Geräusche. Dafür sind geeignete Absaugung, Lüftung und Rücksicht auf die Nachbarschaft einzuplanen. Ein geschlossenes Gartenhaus wird durch eine freie Ecke nicht automatisch zur sicheren Werkstatt für jede Tätigkeit oder jedes Gerät.",
      ] },
      { title: "Boden und Befestigung prüfen", paragraphs: [
        "Eine Werkbank, ein gefülltes Regal und Maschinen können den Boden an einzelnen Punkten belasten. Maßgeblich sind die zulässigen Lasten, das Auflager und die Montagevorgaben des konkreten Hauses. Für schwere Gegenstände reicht ein Foto des Bodens nicht als Nachweis.",
        "Auch Wandregale und aufgehängte Geräte dürfen nicht einfach in dünne Paneele geschraubt werden. Kläre beim Hersteller, welche Verstärkungen und Befestigungen vorgesehen sind. Das Fundament und der Feuchteschutz müssen zur Nutzung passen, besonders wenn Werkzeuge dauerhaft gelagert werden.",
      ] },
      { title: "Wann drei mal drei Meter reichen", paragraphs: [
        "Für eine kompakte Werkbank und wenige gut angeordnete Regale kann das Maß im Alltag genügen. Der entscheidende Test ist ein Grundriss mit realen Innenmaßen, geöffneten Türen und dem größten Werkstück. So sieht man, wo gleichzeitig gearbeitet, gegriffen und vorbeigegangen werden muss.",
        "Wenn eine stationäre Säge, lange Hölzer oder mehrere Personen regelmäßig im Haus arbeiten, kann dieselbe Außenfläche zu eng sein. Dann muss entweder die Ausstattung reduziert oder ein anderes Raumkonzept gewählt werden. Die neun Quadratmeter allein beantworten diese Frage nicht.",
      ] },
    ],
    comparison: { caption: "Was das Maßbeispiel zeigt und was offen bleibt", columns: ["Maß oder Zone", "Beispielrechnung", "Vor Ort zu klären"], rows: [
      ["Außenmaß", "3,00 × 3,00 m", "Dachüberstand und Fundament separat"],
      ["Lichtes Innenmaß", "2,84 × 2,84 m bei angenommenen 8 cm je Seite", "Produktzeichnung statt Annahme verwenden"],
      ["Werkbank an der Rückwand", "0,65 m tief, davor rechnerisch 2,19 m", "Tür, Maschine und Werkstückbewegung einzeichnen"],
      ["Regal an einer Seitenwand", "0,45 m tief, bis zur freien Gegenwand 2,39 m", "Kisten und geöffnete Türen mitmessen"],
      ["Zugang", "Keine pauschale Restfläche", "Lichte Türbreite und Transportweg messen"],
    ] },
    checklist: [
      "Lichte Innenmaße und Türöffnung aus der Produktzeichnung übernehmen.",
      "Werkbanktiefe und größte Werkstücklänge einzeichnen.",
      "Schraubstock, Säge und andere Bewegungsräume markieren.",
      "Regaltiefe mit herausgezogenen Kisten prüfen.",
      "Engsten Gang bei geöffneter Tür messen.",
      "Bodenlast und Befestigung für schwere Ausstattung klären.",
      "Fundament, Feuchteschutz und Lüftung nach System prüfen.",
      "Elektroversorgung und Beleuchtung fachgerecht planen.",
      "Örtliche Vorgaben zur Nutzung des Gartenhauses klären.",
    ],
    faqs: [
      { question: "Sind neun Quadratmeter für eine Werkstatt genug?", answer: "Das kann für eine kleine Werkbank und überschaubare Lagerung reichen. Nutzbare Innenmaße, Werkzeugbewegungen und der freie Weg zur Tür entscheiden. Eine Flächenzahl allein genügt nicht." },
      { question: "Kann ich schwere Regale an jeder Gartenhauswand befestigen?", answer: "Nein. Die zulässige Befestigung hängt vom Wandaufbau und den Herstellerangaben ab. Für schwere Lasten braucht es gegebenenfalls eine freigegebene Verstärkung oder eine eigenständig tragende Lösung." },
      { question: "Ist eine Steckdose im Gartenhaus problemlos nachzurüsten?", answer: "Die Installation muss zum Standort und zu den eingesetzten Geräten passen. Planung und Ausführung gehören in die Hände einer Elektrofachkraft." },
      { question: "Welches Maß zählt beim Kauf?", answer: "Für Einrichtung und Bewegung das lichte Innenmaß, für Aufstellung und Standort die Außenkontur einschließlich möglicher Dachüberstände und das Fundamentmaß. Diese Werte können voneinander abweichen." },
    ],
    example: { title: "Eine Werkbank im maßstäblichen Beispiel", intro: "Alle Maße außer dem vorgegebenen Außenmaß sind frei gewählte Rechenannahmen. Setze beim eigenen Vorhaben die Produktzeichnung ein.", steps: [
      { label: "Außenmaß", value: "3,00 × 3,00 m" },
      { label: "Annahme für Wände", value: "8 cm je Seite" },
      { label: "Abgeleitetes Innenmaß", value: "2,84 × 2,84 m" },
      { label: "Werkbanktiefe", value: "0,65 m an der Rückwand" },
      { label: "Tiefe davor", value: "2,84 m minus 0,65 m gleich 2,19 m" },
      { label: "Seitliches Regal", value: "0,45 m tief, Bedienraum zusätzlich" },
      { label: "Gegenprobe", value: "Türflügel und längstes Werkstück im Grundriss bewegen" },
    ], result: "Die Werkbank passt rechnerisch. Ob die Werkstatt funktioniert, entscheidet der engste gemeinsam genutzte Bewegungsraum.", note: "Keine Last-, Elektro- oder Baurechtsfreigabe. Für Produkte und Standort gelten die konkreten Unterlagen." },
    limitation: "Diese Skizze ersetzt weder einen Produktgrundriss noch eine Prüfung von Fundament, zulässiger Bodenlast, Wandbefestigung, Elektroinstallation und örtlichem Baurecht.",
    sources: [
      { label: "Maßangaben bei Gartenhäusern", href: "https://www.keter.com/de-de/faq/faqde.html", publisher: "Keter", note: "Herstellererklärung zu Innenmaß, Außenmaß, Bodenmaß und Dachüberstand." },
      { label: "Musterbauordnung und Auslegungshilfen", href: "https://www.bauministerkonferenz.de/verzeichnis.aspx?id=991&o=991", publisher: "Bauministerkonferenz", note: "Musterrecht als Orientierung; maßgeblich ist das örtliche Recht." },
    ],
    relatedLinks: [
      { label: "Gartenhaus als Werkstatt", href: "/ratgeber/gartenhaus-mit-werkstatt/", description: "Nutzung, Ausstattung und Rahmenbedingungen vertiefen." },
      { label: "Gartenhaus mit Boden", href: "/ratgeber/gartenhaus-mit-boden-worauf-achten/", description: "Boden und Lasten vor der Einrichtung prüfen." },
      { label: "Gartenhausgröße planen", href: "/garten/gartenhaus-groesse/", description: "Maße mit der eigenen Nutzung abgleichen." },
      { label: "Gartenhaus-Kosten einordnen", href: "/garten/gartenhaus-kosten/", description: "Haus, Boden, Fundament und Einrichtung gemeinsam kalkulieren." },
    ],
    directoryCard: { ...example.directoryCard, title: "3 × 3 Meter Gartenhaus als Werkstatt", result: "Werkbank und Laufweg mit echten Innenmaßen prüfen", alternative: "Geräte und Werkstückwege begrenzen den Platz", check: "Tür und größte Arbeitsbewegung einzeichnen", linkLabel: "Grundriss prüfen" },
  } as T;
}

function furnitureStorage<T extends EditorialProject>(example: T): T {
  return {
    ...example,
    indexingApproval: {
      reviewedAt: "2026-09-24",
      canonicalPath: "/ratgeber/projekte/gartenhaus/gartenhaus-5x5-meter-gartenmoebel/",
      primaryIntent: "Gartenmöbel in einem Gartenhaus mit fünf mal fünf Metern so unterbringen, dass Tür, Zugriff und winterliche Lagerung funktionieren.",
      distinctValue: "Das Beispiel führt statt einer erfundenen freien Prozentfläche ein überprüfbares Inventar, Hüllmaße für Tisch und Lounge, eine Türprobe und einen separaten Zugangsweg zusammen.",
      overlapReview: ["/ratgeber/gartenhaus-5x5-meter/", "/garten/gartenhaus-groesse/", "/ratgeber/gartenhaus-mit-boden-worauf-achten/"],
    },
    title: "5 × 5 Meter Gartenhaus für Gartenmöbel planen",
    heading: "Gartenmöbel in einem 5 × 5 Meter Gartenhaus lagern",
    description: "Tisch, Stühle, Lounge und Auflagen in einem 5 × 5 Meter Gartenhaus lagern. Inventar, Innenmaß, Tür und Zugangsweg anhand eines konkreten Beispiels prüfen.",
    intro: "25 Quadratmeter Außenfläche wirken großzügig. Im Winter stehen aber Tisch, Stühle, Lounge, Kissen und vielleicht ein Grill gleichzeitig darin. Ob du im Frühjahr das erste Möbelstück herausbekommst, hängt von Anordnung und Tür ab, nicht von einer pauschalen Restfläche.",
    takeaway: "Schreibe jedes Möbelstück mit seinem Lagermaß auf und lege die Entnahmereihenfolge fest. Der Beispielplan addiert keine scheinbar freien Quadratmeter, sondern prüft die größten Gegenstände, den Türdurchgang und einen erreichbaren Weg.",
    sections: [
      { title: "Das Inventar ist wichtiger als die Gartenhausgröße", paragraphs: [
        "Für dieses Beispiel gehören ein Tisch mit 2,00 × 1,00 Metern, gestapelte Stühle mit 0,80 × 0,80 Metern, ein Loungeelement mit 2,10 × 0,90 Metern und eine Kissenbox mit 1,20 × 0,60 Metern zum Inventar. Es sind bewusst angenommene Hüllmaße und keine Messwerte eines realen Produkts.",
        "Miss deine Möbel im Zustand, in dem sie tatsächlich gelagert werden. Ein geklappter Tisch braucht eine andere Stellfläche, kann aber eine sichere Wandabstützung benötigen. Sitzgruppen lassen sich nicht immer zerlegen oder stapeln. Ein Foto mit Maßband hilft beim späteren Grundriss.",
      ] },
      { title: "Außenfläche und nutzbarer Innenraum", paragraphs: [
        "Fünf mal fünf Meter ergeben 25 Quadratmeter Außenfläche. Bei einer nur für dieses Beispiel angenommenen Wandstärke von acht Zentimetern je Seite bleiben 4,84 × 4,84 Meter als theoretisches Innenmaß. Das sind rund 23,43 Quadratmeter vor Einbauten, Türbereich und tatsächlichem Wandaufbau.",
        "Dieser Flächenwert ist keine Lagerzusage. Beim konkreten Haus zählen Innenmaße aus der Zeichnung, Position von Pfosten oder Fenstern, Türlichte, mögliche Dachüberstände und das vom Hersteller geforderte Fundament. Gerade lange Loungemodule können an einem Fenster oder Türflügel scheitern, obwohl die Summe der Flächen groß genug wirkt.",
      ] },
      { title: "Möbel brauchen mehr als ihre Stellfläche", paragraphs: [
        "Die vier Beispielhüllflächen ergeben rechnerisch 2,00 plus 0,64 plus 1,89 plus 0,72 und damit 5,25 Quadratmeter. Diese Summe hilft beim Inventar, aber nicht als Beweis für einen funktionierenden Lagerraum. Möbel lassen sich nicht beliebig wie Rechtecke ohne Abstand ineinander schieben.",
        "Plane zusätzlich Griffraum, Schutz vor Aneinanderreiben und einen Weg zu den Dingen ein, die zwischendurch gebraucht werden. Wenn Stühle vor dem Loungeelement stehen, kann dessen Entnahme mehrere andere Gegenstände blockieren. Ein maßstäblicher Plan zeigt diesen Konflikt besser als eine Restzahl.",
      ] },
      { title: "Die Türprobe für das größte Teil", paragraphs: [
        "Miss die lichte Öffnung bei vollständig geöffneter Tür, die Höhe unter dem Türsturz und die mögliche Drehbewegung vor dem Haus. Ein Loungeelement mit 2,10 Metern Länge muss nicht mit der ganzen Länge quer durch die Tür passen, braucht aber einen realistischen Winkel und freien Platz zum Schwenken.",
        "Berücksichtige Schwelle, Treppenstufe und Bodenübergang. Die Entnahme im Frühjahr kann schwieriger sein als das Einräumen im Herbst, weil Gegenstände davorstehen. Lege die sperrigsten Stücke deshalb so ab, dass sie ohne riskantes Kippen wieder herausgeführt werden können.",
      ] },
      { title: "Auflagen und Holz brauchen trockene Bedingungen", paragraphs: [
        "Kissen und Polster gehören trocken und nach Herstellerangaben verpackt an einen Ort mit geeigneter Lüftung. Eine dichte Box in einem feuchten Raum kann Probleme nur verbergen. Kontrolliere Dach, Bodenanschluss und Kondensat, bevor Textilien über Monate im Haus bleiben.",
        "Holzmöbel, Metallgestelle und Polster haben unterschiedliche Pflegebedürfnisse. Reinige und trockne sie vor dem Einlagern und lass Luft an empfindliche Oberflächen. Schwere Teile gehören auf einen Boden, dessen zulässige Last und Feuchteschutz für diese Nutzung geklärt sind.",
      ] },
      { title: "Ordnung für Herbst und Frühjahr", paragraphs: [
        "Zeichne eine Entnahmereihenfolge. Häufig benötigte Möbel dürfen nicht hinter dem größten Tisch verschwinden. Ein Randbereich für seltene Gegenstände und ein erreichbarer Mittelweg können nützlich sein, müssen aber mit den realen Möbelmaßen belegt werden.",
        "Fotografiere den eingeräumten Zustand und notiere, welche Teile gestapelt, getrennt oder geschützt gelagert werden. Prüfe auch den Weg im Garten. Wenn Möbel nur über einen engen Pfad oder eine hohe Schwelle ins Haus gelangen, bringt ein großer Innenraum allein wenig.",
      ] },
      { title: "Wann das Gartenhaus wirklich groß genug ist", paragraphs: [
        "Das Beispiel mit vier Gegenständen lässt viel theoretische Fläche übrig. Es beantwortet trotzdem noch nicht, ob ein zusätzliches Fahrrad, der Grill oder eine Werkbank sinnvoll Platz finden. Jede Erweiterung verändert Türweg, Stapelung und Zugriff auf die übrigen Möbel.",
        "Ein brauchbarer Entwurf zeigt alle Hüllmaße samt Bewegungsraum im echten Innenmaß und einen gangbaren Weg für das größte Teil durch die Tür. Bleibt eine Engstelle offen, ändere Anordnung oder Hausmodell, bevor du auf die Quadratmeterzahl vertraust.",
      ] },
    ],
    comparison: { caption: "Frei angenommene Lagermaße statt pauschaler Belegungsquote", columns: ["Gegenstand oder Maß", "Annahme im Beispiel", "Entscheidende Gegenprobe"], rows: [
      ["Haus außen", "5,00 × 5,00 m", "Innenmaß und Dachkontur aus Produktzeichnung"],
      ["Gartentisch", "2,00 × 1,00 m", "Tatsächliches Lagermaß und Entnahmeweg"],
      ["Gestapelte Stühle", "0,80 × 0,80 m", "Stapelhöhe und standsichere Lagerung"],
      ["Loungeelement", "2,10 × 0,90 m", "Drehwinkel an der lichten Türöffnung"],
      ["Kissenbox", "1,20 × 0,60 m", "Trockenheit, Belüftung und Griffraum"],
    ] },
    checklist: [
      "Alle Möbel im tatsächlichen Lagerzustand messen.",
      "Lichtes Innenmaß des konkreten Hauses übernehmen.",
      "Türbreite, Türhöhe und Schwenkbereich erfassen.",
      "Längstes Teil probeweise durch den geplanten Weg bewegen.",
      "Stapelung und zulässige Höhe der Stühle prüfen.",
      "Entnahmereihenfolge und erreichbaren Gang einzeichnen.",
      "Kissen und empfindliche Oberflächen trocken einlagern.",
      "Bodenlast, Feuchteschutz und Lüftung des Hauses klären.",
      "Fundamentmaß und örtliche Standortregeln prüfen.",
    ],
    faqs: [
      { question: "Passen 25 Quadratmeter Gartenmöbel in ein 25 Quadratmeter Haus?", answer: "Diese Gegenüberstellung sagt nichts über die Nutzbarkeit. 25 Quadratmeter sind hier das Außenmaß des Hauses. Möbel brauchen reale Stellmaße, Platz zum Bewegen und einen nutzbaren Türweg." },
      { question: "Kann ich alle Auflagen im Gartenhaus lassen?", answer: "Nur wenn sie trocken eingelagert werden und Raum, Verpackung und Lüftung geeignet sind. Kontrolliere die Hinweise des Herstellers und Feuchte am konkreten Standort." },
      { question: "Warum reicht die Summe der Möbelflächen nicht?", answer: "Rechteckflächen berücksichtigen weder Tür, Drehbewegung, Stapelung noch Zugriff. Ein langer Gegenstand kann die Entnahme blockieren, obwohl er rechnerisch wenig Fläche beansprucht." },
      { question: "Welches Möbelstück ist für den Grundriss entscheidend?", answer: "Das sperrigste und am schwersten zu bewegende Teil bestimmt oft die Anordnung. Sein Weg durch die Tür muss ebenso passen wie der Zugang zu häufig benötigten Gegenständen." },
    ],
    example: { title: "Ein Inventar mit vier angenommenen Lagerstücken", intro: "Die Maße illustrieren die Planung und sind keine Produktdaten. Gemessen werden muss am eigenen Mobiliar.", steps: [
      { label: "Außenmaß Haus", value: "5,00 × 5,00 m gleich 25 m²" },
      { label: "Beispielhaftes Innenmaß", value: "4,84 × 4,84 m bei 8 cm je Wandseite" },
      { label: "Tisch", value: "2,00 × 1,00 m gleich 2,00 m² Hüllfläche" },
      { label: "Stühle und Lounge", value: "0,64 plus 1,89 m² Hüllfläche" },
      { label: "Kissenbox", value: "1,20 × 0,60 m gleich 0,72 m² Hüllfläche" },
      { label: "Summe der Hüllflächen", value: "5,25 m², ohne Wege und Sicherheitsabstand" },
      { label: "Gegenprobe", value: "Türdurchgang und Entnahmeweg für das 2,10 m lange Loungeelement" },
    ], result: "Die Möbelflächen sind dokumentiert. Eine nutzbare freie Fläche wird daraus bewusst nicht behauptet.", note: "Die Beispielanordnung ersetzt weder Produktinnenmaße noch eine Prüfung von Last, Feuchte und örtlichem Baurecht." },
    limitation: "Hüllflächen und Außenmaß beweisen keine Lagerfähigkeit. Produktzeichnung, Türweg, zulässige Bodenlast, Feuchteschutz und örtliche Vorgaben sind separat zu prüfen.",
    sources: [
      { label: "Innenmaß und Außenmaß bei Gerätehäusern", href: "https://www.keter.com/de-de/faq/faqde.html", publisher: "Keter", note: "Herstellererklärung zu Maßarten und Dachüberstand." },
      { label: "Musterbauordnung und Auslegungshilfen", href: "https://www.bauministerkonferenz.de/verzeichnis.aspx?id=991&o=991", publisher: "Bauministerkonferenz", note: "Musterrecht als Orientierung für die gesonderte Standortprüfung." },
    ],
    relatedLinks: [
      { label: "Gartenhausgröße berechnen", href: "/garten/gartenhaus-groesse/", description: "Eigenes Inventar und Innenmaß miteinander vergleichen." },
      { label: "Gartenhaus mit Boden", href: "/ratgeber/gartenhaus-mit-boden-worauf-achten/", description: "Feuchte und zulässige Lasten prüfen." },
      { label: "Fundament für das Gartenhaus", href: "/garten/gartenhaus-fundament/", description: "Aufstellung und Untergrund einordnen." },
      { label: "Gartenhaus-Kosten einordnen", href: "/garten/gartenhaus-kosten/", description: "Lagerlösung und nötige Zusatzarbeiten finanziell abgleichen." },
    ],
    directoryCard: { ...example.directoryCard, title: "5 × 5 Meter Gartenhaus für Gartenmöbel", result: "Möbelinventar und Entnahmeweg prüfen", alternative: "Die bloße Flächensumme gibt keinen Zugang frei", check: "Größtes Teil durch die Tür bewegen", linkLabel: "Lagerplan prüfen" },
  } as T;
}
