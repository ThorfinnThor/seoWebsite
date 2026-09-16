import type { SeoGuide } from "@/lib/seo-guides";
import type { ProgrammaticIndexApproval } from "@/lib/programmatic-indexing";

type EditorialDecisionGuide = SeoGuide & {
  scoreA: number;
  scoreB: number;
  indexingApproval?: ProgrammaticIndexApproval;
};

const NARROW_PASSAGE_MOWER = "maehroboter-begrenzungskabel-oder-kamera-enge-passagen";
const COLD_CELLAR_DEHUMIDIFIER = "luftentfeuchter-kompressor-oder-adsorption-keller-10-grad";
const WINDY_PRIVACY_SCREEN = "sichtschutz-wpc-oder-aluminium-windige-lage";

export function applyExpandedEditorialDecisionGuide<T extends EditorialDecisionGuide>(guide: T): T {
  if (guide.slug === NARROW_PASSAGE_MOWER) return narrowPassageMower(guide);
  if (guide.slug === COLD_CELLAR_DEHUMIDIFIER) return coldCellarDehumidifier(guide);
  if (guide.slug === WINDY_PRIVACY_SCREEN) return windyPrivacyScreen(guide);
  return guide;
}

function narrowPassageMower<T extends EditorialDecisionGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-16",
      canonicalPath: "/ratgeber/vergleiche/maehroboter/maehroboter-begrenzungskabel-oder-kamera-enge-passagen/",
      primaryIntent: "Eine enge Rasenpassage konkret zwischen einem Mähroboter mit Begrenzungskabel und einem kamerabasierten System einordnen.",
      distinctValue: "Die Seite prüft reale Durchgangsbreite, Randart, Länge, Wendeflächen und sichtbare Rasengrenzen und trennt dabei belegte Modellwerte von allgemeinen Aussagen.",
      overlapReview: [
        "/ratgeber/maehroboter-fuer-verwinkelten-garten/",
        "/garten/maehroboter-steigung-engstellen/",
        "/garten/maehroboter-begrenzungskabel-kabellos/",
      ],
    },
    title: "Mähroboter mit Kabel oder Kamera für enge Passagen",
    heading: "Mähroboter mit Kabel oder Kamera für enge Passagen",
    description: "Begrenzungskabel und Kameranavigation für enge Rasenpassagen nach Breite, Rand, Wendefläche, Verbindung und Installationsaufwand vergleichen.",
    intro: "Eine schmale Verbindung zwischen zwei Rasenflächen ist kein Detail. Sie kann darüber entscheiden, ob der Roboter beide Bereiche selbst erreicht, nur durchfährt oder regelmäßig von Hand umgesetzt werden muss. Kabel und Kamera lösen diese Aufgabe unterschiedlich.",
    takeaway: "Miss die freie Breite, die Länge und beide Randseiten der Passage. Ein Kabelsystem kann mit korrekt verlegtem Leitkabel eine definierte Route schaffen. Ein Kamerasystem braucht eine für das konkrete Modell erkennbare Begrenzung und genügend Platz. Die Mindestbreite aus der jeweiligen Anleitung entscheidet.",
    plannerHref: "/garten/maehroboter-rechner/",
    plannerLabel: "Passage und Gartenprofil prüfen",
    sections: [
      {
        title: "Die engste Stelle bestimmt den Alltag",
        paragraphs: [
          "Miss nicht nur am Eingang. Mauervorsprünge, überhängende Pflanzen, Randsteine und eine leicht versetzte Beetkante können die nutzbare Breite innerhalb weniger Meter verändern. Notiere den kleinsten Wert und fotografiere beide Seiten der Passage.",
          "Die Passage muss außerdem lang genug betrachtet werden. Ein kurzer Engpass kann ein anderes Fahrmanöver erlauben als ein langer Korridor. Hersteller unterscheiden teilweise zwischen einer befahrbaren Verbindung, einem Bereich zum Mähen und einem Weg zur Ladestation.",
        ],
      },
      {
        title: "Beim Kabel zählt der gesamte Aufbau",
        paragraphs: [
          "Der Abstand zwischen zwei Begrenzungskabeln ist nicht identisch mit der freien Breite zwischen zwei Mauern. Zu den Kabelabständen kommen die vorgeschriebenen Abstände zu hohen oder niedrigen Hindernissen. Der konkrete Wert steht in der Anleitung des ausgewählten Modells.",
          "Ein Leitkabel kann den Roboter gezielt durch einen Korridor führen. GARDENA nennt für bestimmte SILENO Modelle mit CorridorCut 60 Zentimeter zwischen den Begrenzungskabeln. Zwischen zwei Wänden kann daraus wegen der seitlichen Abstände ein deutlich breiterer Durchgang werden. Dieser Modellwert lässt sich nicht pauschal auf andere Geräte übertragen.",
        ],
      },
      {
        title: "Die Kamera braucht eine lesbare Grenze",
        paragraphs: [
          "Ein kamerabasierter Roboter orientiert sich an dem, was sein System in der Umgebung erkennt. Der Übergang zwischen Rasen und Beet, Pflaster oder Wand muss daher zur Erkennungslogik des konkreten Modells passen. Eine für Menschen klare Kante ist nicht automatisch eine technisch freigegebene Grenze.",
          "Auch bei Kamerasystemen gelten feste Mindestbreiten. Worx verlangt für den Landroid Vision laut eigener Installationshilfe eine Passage von mehr als einem Meter. Wo Pflanzen, angrenzender Rasen oder gefährliche Kanten die optische Grenze unklar machen, sieht der Hersteller ergänzende Magnetstreifen oder klar getrennte Bereiche vor.",
        ],
      },
      {
        title: "Wenden ist schwieriger als geradeaus fahren",
        paragraphs: [
          "Ein Roboter kann durch einen Korridor passen und am Ende trotzdem scheitern. Prüfe deshalb die Fläche vor und hinter der Passage. Dort muss das Gerät seine Route fortsetzen, wenden oder eine neue Zone beginnen können.",
          "Liegt die Ladestation direkt in einer Engstelle, entstehen zusätzliche Fahrten und Wendemanöver. Bei einem Kabelsystem kommen Vorgaben für Startpunkt und Leitkorridor hinzu. Beim Kamerasystem müssen Anfahrt, erkennbare Rasenkante und mögliche Zonenmarkierungen zusammen funktionieren.",
        ],
      },
      {
        title: "Zwei Rasenflächen brauchen eine echte Verbindung",
        paragraphs: [
          "Eine App Zone ersetzt keinen befahrbaren Weg. Liegt zwischen den Rasenstücken Kies, eine Stufe oder eine öffentliche Fläche, kann manuelles Umsetzen notwendig bleiben. Das gilt unabhängig davon, ob die Grenze virtuell, optisch oder mit Draht festgelegt wird.",
          "Manche Systeme behandeln die Passage als Transportweg und mähen dort nicht. Andere können innerhalb des Korridors arbeiten. Kläre deshalb nicht nur, ob der Roboter hindurchkommt, sondern auch, welches Ergebnis auf dem schmalen Rasenstreifen erwartet wird.",
        ],
      },
      {
        title: "Nässe, Schatten und Bewuchs verändern die Passage",
        paragraphs: [
          "An einer Hauswand bleibt Gras häufig länger feucht. Wiederholte Fahrspuren können den Boden belasten und eine ohnehin knappe Breite weiter verschlechtern. Die Stelle sollte deshalb auch nach Regen und bei vollständig gewachsenen Randpflanzen geprüft werden.",
          "Für eine Kamera können starke Kontraste, verdeckte Kanten und wechselnder Bewuchs relevant sein. Für ein Kabelsystem bleiben Lage und Abstand des Drahtes maßgeblich. In beiden Fällen muss die reale Passage über die gesamte Saison betrachtet werden.",
        ],
      },
      {
        title: "Installation und spätere Änderungen",
        paragraphs: [
          "Beim Kabelsystem entsteht Aufwand im Boden. Die Lage von Begrenzungsdraht und Leitkabel sollte dokumentiert werden, damit Reparaturen und Gartenarbeiten später möglich bleiben. Eine Änderung der Beete kann eine neue Verlegung verlangen.",
          "Ein Kamerasystem vermeidet den umlaufenden Draht, kann aber zusätzliche Markierungen oder Zonenhilfen benötigen. Änderungen sind nur dann einfacher, wenn die neue Grenze weiterhin den Herstellerbedingungen entspricht. Kabellos bedeutet deshalb nicht automatisch ohne Planung.",
        ],
      },
      {
        title: "Eine Entscheidung ohne pauschalen Sieger",
        paragraphs: [
          "Ein passendes Kabelmodell ist stark, wenn eine definierte Route mit dokumentierten Abständen angelegt werden kann. Ein Kameramodell ist interessant, wenn die Passage breit genug ist, klare Grenzen bietet und du keinen umlaufenden Draht verlegen möchtest.",
          "Bleibt nur wenig Reserve zur Mindestbreite, sollte das konkrete Gerät vor dem Kauf an dieser Stelle geprüft werden. Die schwierigste Passage entscheidet über die autonome Nutzung des gesamten Gartens und nicht die offene Hauptfläche.",
        ],
      },
    ],
    comparison: {
      caption: "Kabel und Kamera in einer engen Rasenverbindung",
      columns: ["Prüfpunkt", "Begrenzungskabel", "Kamera"],
      rows: [
        ["Seitliche Grenze", "Durch Kabel und vorgeschriebene Randabstände definiert", "Muss für das System sichtbar oder zusätzlich markiert sein"],
        ["Führung durch den Korridor", "Leitkabel kann eine feste Route bilden", "Navigation folgt Bildauswertung und möglichen Zonenhilfen"],
        ["Mindestbreite", "Modellwert zwischen Kabeln plus Abstände zu Hindernissen", "Modellwert für die vollständig freie Passage"],
        ["Bewuchs am Rand", "Kann den freien Fahrraum verringern", "Kann zusätzlich die optische Grenze verdecken"],
        ["Spätere Änderung", "Draht kann neu verlegt werden müssen", "Grenze und Markierungen müssen neu geprüft werden"],
      ],
    },
    checklist: [
      "Die engste freie Breite an mehreren Punkten messen.",
      "Länge der Passage und Kurven im Verlauf notieren.",
      "Hohe Wände, Beete, Pflaster und tiefe Kanten getrennt erfassen.",
      "Freie Fläche vor und hinter dem Korridor prüfen.",
      "Klären, ob die Passage gemäht oder nur befahren werden soll.",
      "Mindestbreite in der Anleitung des konkreten Modells nachlesen.",
      "Position von Leitkabel oder erforderlichen Markierungen einzeichnen.",
      "Passage bei vollem Bewuchs und nach Regen kontrollieren.",
      "Einen Praxistest vereinbaren, wenn nur wenig Breitenreserve bleibt.",
    ],
    faqs: [
      { question: "Sind 60 Zentimeter für jeden Kabelroboter genug?", answer: "Nein. Der Wert gilt nur für bestimmte Modelle und wird zwischen den Begrenzungskabeln gemessen. Abstände zu Mauern, Beeten oder anderen Hindernissen kommen hinzu. Maßgeblich ist die Anleitung des konkreten Geräts." },
      { question: "Braucht ein Kameramähroboter gar keine Markierungen?", answer: "Nicht immer. Unklare Rasengrenzen, angrenzender Rasen oder gefährliche Kanten können je nach System zusätzliche Magnetstreifen oder andere Hilfen verlangen. Prüfe die Installationsvorgaben des Modells." },
      { question: "Reicht es, wenn der Roboter gerade durch die Passage passt?", answer: "Nein. Er muss die Passage zuverlässig finden und an beiden Enden weiterfahren oder wenden können. Außerdem ist zu klären, ob er den Korridor mäht oder nur als Transportweg nutzt." },
      { question: "Ist eine Kamera bei Gartenänderungen immer flexibler?", answer: "Nur wenn die neue Grenze weiterhin eindeutig erkannt wird und die Mindestabstände passen. Eine virtuelle oder optische Änderung kann einfacher sein als eine Drahtverlegung, ersetzt aber nicht die erneute Standortprüfung." },
      { question: "Was mache ich, wenn die Passage für beide Systeme zu knapp ist?", answer: "Plane die Verbindung um, verbreitere sie fachgerecht oder behandle die zweite Fläche als getrennte Zone mit manuellem Umsetzen. Ein Gerät außerhalb seiner dokumentierten Mindestbreite zu betreiben ist keine belastbare Lösung." },
    ],
    example: {
      title: "Eine Passage zwischen Hauswand und Beet",
      intro: "Die schmalste Stelle wurde zwischen einer festen Wand und einem bepflanzten Beet gemessen.",
      steps: [
        { label: "Freie Breite", value: "1,25 m an der engsten Stelle" },
        { label: "Länge", value: "7 m" },
        { label: "Rand links", value: "feste Hauswand" },
        { label: "Rand rechts", value: "Beet mit saisonalem Überhang" },
        { label: "Wendefläche am Ende", value: "noch zu prüfen" },
        { label: "Entscheidende Unterlage", value: "Installationsanleitung des konkreten Modells" },
        { label: "Erforderliche Gegenprobe", value: "Praxistest an der engsten Stelle" },
      ],
      result: "Die freie Breite allein gibt noch keine Freigabe. Beim Kabelsystem müssen Kabelabstände zur Wand und zum Beet eingerechnet werden. Beim Kamerasystem müssen Mindestpassage, sichtbare Grenze und die Fläche am Ausgang nachgewiesen sein.",
      note: "Das Beispiel ist eine Prüfreihenfolge und keine Empfehlung für ein bestimmtes Modell.",
    },
    limitation: "Die Seite ersetzt weder die Installationsanleitung noch einen Test am Standort. Mindestbreiten, Randabstände, Markierungen und Zonenlogik unterscheiden sich zwischen Modellen und Softwareständen.",
    sources: [
      {
        label: "Durchgangsbreiten bei GARDENA Mährobotern",
        href: "https://help.gardena.com/hc/de/articles/4450560858524-Wie-eng-d%C3%BCrfen-Durchg%C3%A4nge-f%C3%BCr-den-GARDENA-M%C3%A4hroboter-in-meinem-Garten-sein",
        publisher: "GARDENA Help Center",
        note: "Herstellerangaben zum Abstand zwischen Begrenzungskabeln und zu zusätzlichen Abständen an verschiedenen Hindernissen.",
      },
      {
        label: "Installation von Magnetstreifen beim Landroid Vision",
        href: "https://wiki.worx.com/en/Landroid-Vision-Installation-Setup-and-Usage/Magnetic-strip-installation-f28c",
        publisher: "Worx",
        note: "Herstellerhinweise zu unklaren Grenzen, geschützten Bereichen und der Passagebreite eines kamerabasierten Systems.",
      },
      {
        label: "Informationen zu CorridorCut und Leitkabel",
        href: "https://www.gardena.com/uk/c/support/planning-advice/robotic-lawnmowers/information",
        publisher: "GARDENA",
        note: "Herstellerinformationen zur Führung durch lange enge Passagen mit und ohne Leitkabel bei bestimmten SILENO Modellen.",
      },
    ],
    relatedLinks: [
      { label: "Mähroboter Rechner", href: "/garten/maehroboter-rechner/", description: "Fläche, Steigung, Engstelle und gewünschte Navigation gemeinsam prüfen." },
      { label: "Steigung und Engstellen messen", href: "/garten/maehroboter-steigung-engstellen/", description: "Die schwierigsten Stellen des Gartens vor dem Modellvergleich erfassen." },
      { label: "Kabel und kabellose Systeme", href: "/garten/maehroboter-begrenzungskabel-kabellos/", description: "Installationsprinzipien für den gesamten Garten einordnen." },
      { label: "Mähroboter für verwinkelte Gärten", href: "/ratgeber/maehroboter-fuer-verwinkelten-garten/", description: "Mehrere Zonen, Hindernisse und Nebenflächen zusammen betrachten." },
      { label: "Rasenfläche berechnen", href: "/garten/maehroboter-flaeche-berechnen/", description: "Teilflächen und feste Abzüge für die nötige Flächenleistung erfassen." },
    ],
  } as T;
}

function coldCellarDehumidifier<T extends EditorialDecisionGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-16",
      canonicalPath: "/ratgeber/vergleiche/luftentfeuchter/luftentfeuchter-kompressor-oder-adsorption-keller-10-grad/",
      primaryIntent: "Für einen dauerhaft ungefähr zehn Grad kalten Keller zwischen Kompressor und Adsorption entscheiden.",
      distinctValue: "Die Seite vergleicht beide Verfahren anhand belegter Entfeuchtungsleistung bei zehn Grad, Leistungsaufnahme, Abwärme, Ablauf und gemessener Feuchteursache.",
      overlapReview: [
        "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/",
        "/ratgeber/luftentfeuchter-fuer-unbeheizten-keller/",
        "/haus/raumklima/luftentfeuchter-stromverbrauch/",
      ],
    },
    title: "Kompressor oder Adsorption im Keller bei 10 Grad",
    heading: "Kompressor oder Adsorption im Keller bei 10 Grad",
    description: "Luftentfeuchter für einen Keller bei etwa 10 Grad nach realer Entfeuchtung, Strombedarf, Abwärme, Ablauf und Feuchteursache vergleichen.",
    intro: "Zehn Grad liegen genau in einem Bereich, in dem Produktangaben bei warmen Prüfbedingungen wenig helfen. Ein Adsorptionsgerät kann die Entfeuchtungsleistung in kalter Luft besser halten. Ein geeigneter Kompressor kann wirtschaftlich bleiben, wenn seine Leistung bei zehn Grad belegt ist und die Laufzeit zur Feuchtelast passt.",
    takeaway: "Vergleiche für deinen Keller die Wasserentnahme und Leistungsaufnahme bei etwa 10 Grad und der tatsächlich gemessenen relativen Feuchte. Für dauerhaft kalte Räume spricht häufig Adsorption. Ein Kompressor bleibt eine Option, wenn sein Datenblatt unter diesen Bedingungen genügend Leistung zeigt und der geringere Strombedarf im realen Betrieb überwiegt.",
    plannerHref: "/haus/raumklima/luftentfeuchter-rechner/",
    plannerLabel: "Kellerdaten im Rechner prüfen",
    sections: [
      {
        title: "Zehn Grad sind kein Randwert",
        paragraphs: [
          "Die übliche Nennleistung in Litern pro Tag wird häufig bei deutlich wärmerer und feuchterer Luft gemessen. Dieser Wert eignet sich nicht für einen kalten Keller, wenn das Datenblatt keine zweite Messung unter ähnlichen Bedingungen enthält.",
          "Notiere Temperatur und relative Feuchte über mehrere Tage. Ein einzelner Messpunkt direkt nach dem Lüften kann das Bild verzerren. Für die Auswahl ist wichtig, wie kalt der Raum während der feuchten Zeiten tatsächlich bleibt.",
        ],
      },
      {
        title: "Wie der Kompressor in kalter Luft arbeitet",
        paragraphs: [
          "Ein Kompressorgerät kühlt Luft an einem Wärmetauscher ab, damit Wasser kondensiert. Je kälter der Raum bereits ist, desto schwieriger wird dieser Vorgang. Abtauphasen und die bei niedriger Temperatur verbleibende Entnahmeleistung gehören deshalb in den Vergleich.",
          "Die Bauart ist nicht grundsätzlich ungeeignet. Entscheidend ist das konkrete Datenblatt. Wenn ein Hersteller nur einen Wert bei 30 Grad und hoher Feuchte nennt, bleibt die Leistung im Zehn Grad Keller ungeklärt.",
        ],
      },
      {
        title: "Warum Adsorption im kalten Keller interessant ist",
        paragraphs: [
          "Ein Adsorptionsgerät bindet Feuchtigkeit an einem Trockenmittel und gibt erwärmte, trockenere Luft an den Raum zurück. Meaco weist für seine DD8L Modelle konkrete Entnahmewerte bei 10 Grad und 60 Prozent relativer Feuchte aus. Die Werte liegen dort nur begrenzt unter den Angaben bei 20 Grad.",
          "Diese Eignung hat einen Preis. Je nach Stufe kann die elektrische Leistung deutlich höher liegen als bei einem sparsamen Kompressor. Die erwärmte Ausblasluft kann im kalten Keller erwünscht sein, muss aber in Verbrauch und Raumwirkung mitgerechnet werden.",
        ],
      },
      {
        title: "Liter pro Tag nur bei gleichen Bedingungen vergleichen",
        paragraphs: [
          "Ein Wert bei 30 Grad und 80 Prozent relativer Feuchte darf nicht direkt neben einen Wert bei 10 Grad und 60 Prozent gestellt werden. Temperatur und Feuchte bestimmen, wie viel Wasser die Luft enthält und wie leicht das Gerät es entnehmen kann.",
          "Suche deshalb in der Leistungstabelle nach der Messzeile, die deinem Keller am nächsten kommt. Fehlt sie, frage beim Hersteller nach oder plane einen Rückgabemodus ein, der einen echten Test im Raum ermöglicht.",
        ],
      },
      {
        title: "Stromkosten brauchen Laufzeit und Leistungsaufnahme",
        paragraphs: [
          "Eine hohe Wattzahl bedeutet nicht automatisch höhere Monatskosten, wenn das Gerät die Zielfeuchte schneller erreicht und lange pausiert. Umgekehrt kann ein vermeintlich sparsamer Kompressor im kalten Raum sehr lange laufen, wenn seine Entnahmeleistung stark sinkt.",
          "Miss die Betriebsstunden und verwende die Leistungsaufnahme der tatsächlich genutzten Stufe. Der Stromkostenrechner hilft bei der Umrechnung. Ein Datenblattvergleich ohne Laufzeit bleibt unvollständig.",
        ],
      },
      {
        title: "Ablauf und Luftführung entscheiden über den Dauerbetrieb",
        paragraphs: [
          "Ein kleiner Behälter beendet den Betrieb, sobald er voll ist. Für einen Keller mit regelmäßiger Feuchtelast ist ein sicher verlegter kontinuierlicher Ablauf oft wichtiger als eine zusätzliche Komfortfunktion. Gefälle, Schlauchdurchmesser und Frostfreiheit müssen zum Gerät passen.",
          "Stelle den Entfeuchter so auf, dass Zu und Abluft frei bleiben. Geschlossene Innentüren, vollgestellte Ecken und ein kurzer Luftkreislauf um das Gerät können dazu führen, dass entfernte Bereiche feucht bleiben.",
        ],
      },
      {
        title: "Das Gerät löst keine bauliche Ursache",
        paragraphs: [
          "Feuchtigkeit kann aus warmer Sommerluft, undichten Leitungen, eindringendem Wasser oder einem baulichen Schaden stammen. Ein Entfeuchter senkt die Luftfeuchte, beseitigt aber keine undichte Wand und repariert keine fehlende Abdichtung.",
          "Bei sichtbarem Wassereintritt, wiederkehrendem Schimmel oder unbekannter Ursache ist eine fachliche Prüfung sinnvoll. Lüften kann im Sommer sogar zusätzliche Feuchte in einen kühlen Keller bringen, wenn warme Außenluft an kalten Oberflächen abkühlt.",
        ],
      },
      {
        title: "Die passende Entscheidung für den Zehn Grad Keller",
        paragraphs: [
          "Adsorption ist die belastbare Richtung, wenn der Keller lange um oder unter 10 Grad bleibt und eine verlässliche Entnahme bei dieser Temperatur wichtiger ist als eine niedrige Anschlussleistung. Wähle das Gerät nach der belegten Messzeile und nicht nur nach der Produktkategorie.",
          "Ein Kompressor kann passen, wenn der Raum zeitweise wärmer wird, die Feuchtelast begrenzt ist und der Hersteller ausreichende Leistung im kalten Bereich dokumentiert. Ein zweiwöchiger Praxistest mit Hygrometer und Strommessung ist aussagekräftiger als ein Vergleich der Maximalwerte.",
        ],
      },
    ],
    comparison: {
      caption: "Beide Verfahren in einem Keller um 10 Grad",
      columns: ["Prüfpunkt", "Kompressor", "Adsorption"],
      rows: [
        ["Leistung bei 10 Grad", "Nur mit passender Datenblattzeile belastbar", "Bei geeigneten Modellen ausdrücklich für kalte Räume ausgewiesen"],
        ["Elektrische Leistung", "Häufig niedriger, reale Laufzeit entscheidet", "Je nach Stufe häufig höher"],
        ["Abwärme", "Gibt ebenfalls Wärme ab, meist geringer", "Erwärmte Ausblasluft ist Teil des Verfahrens"],
        ["Gewicht und Transport", "Kann durch Kompressor schwerer sein", "Geeignete Geräte sind oft leichter"],
        ["Entscheidender Nachweis", "Entnahme und Abtauverhalten bei Kellertemperatur", "Entnahme und Wattzahl bei Kellertemperatur"],
      ],
    },
    checklist: [
      "Temperatur und relative Feuchte mindestens eine Woche messen.",
      "Niedrigste typische Temperatur des Kellers notieren.",
      "Entnahmeleistung bei ungefähr 10 Grad im Datenblatt suchen.",
      "Leistungsaufnahme für die verwendete Stufe erfassen.",
      "Sicheren kontinuierlichen Ablauf oder Leerungsrhythmus planen.",
      "Luftwege zwischen Kellerbereichen prüfen.",
      "Wassereintritt und bauliche Ursachen ausschließen lassen.",
      "Zielfeuchte einstellen und reale Laufzeit beobachten.",
      "Stromverbrauch und Feuchteverlauf nach zwei Wochen bewerten.",
    ],
    faqs: [
      { question: "Ist Adsorption bei 10 Grad immer besser?", answer: "Nicht automatisch. Sie hält bei geeigneten Geräten die Entfeuchtungsleistung in kalter Luft oft besser. Stromaufnahme, Feuchtelast, Laufzeit und gewünschte Erwärmung des Raums müssen dennoch zum Keller passen." },
      { question: "Kann ich die Literangabe auf dem Karton vergleichen?", answer: "Nur wenn Temperatur und relative Feuchte der Messung gleich sind. Ein Maximalwert bei warmer, sehr feuchter Luft sagt wenig über den Einsatz bei 10 Grad aus." },
      { question: "Welche Zielfeuchte soll ich einstellen?", answer: "Das hängt von Nutzung, Oberflächentemperaturen und Feuchteursache ab. Vermeide eine unnötig niedrige Einstellung und beobachte, ob Kondensation oder Geruch zurückgehen. Bei Schimmel oder Bauschäden ist fachliche Prüfung wichtiger als ein einzelner Zielwert." },
      { question: "Hilft ein Luftentfeuchter gegen feuchte Wände?", answer: "Er kann die Luftfeuchte und damit die Trocknung unterstützen. Eindringendes Wasser, Rohrschäden oder eine mangelhafte Abdichtung beseitigt er nicht. Die Ursache muss getrennt gefunden und behoben werden." },
      { question: "Warum ist ein Dauerablauf wichtig?", answer: "Ein voller Behälter stoppt viele Geräte. Bei dauerhafter Feuchtelast kann ein korrekt verlegter Schlauch den regelmäßigen Betrieb sichern. Die Vorgaben zu Gefälle und Anschluss stammen aus der Geräteanleitung." },
    ],
    example: {
      title: "Ein unbeheizter Keller mit zehn Grad",
      intro: "Der Raum bleibt im Winter zwischen 8 und 11 Grad und zeigt über mehrere Tage 72 Prozent relative Feuchte.",
      steps: [
        { label: "Typische Temperatur", value: "10 °C" },
        { label: "Gemessene Feuchte", value: "72 Prozent relative Feuchte" },
        { label: "Betrieb", value: "regelmäßig mit möglichem Dauerablauf" },
        { label: "Vergleichswert", value: "Liter pro Tag bei ungefähr 10 °C" },
        { label: "Zweiter Vergleichswert", value: "Watt in derselben Betriebsstufe" },
        { label: "Praxiskontrolle", value: "Feuchteverlauf, Laufzeit und Stromverbrauch" },
        { label: "Abbruchkriterium", value: "keine Verbesserung trotz geeigneter Aufstellung" },
      ],
      result: "Ein Adsorptionsgerät ist die naheliegende Prüfoption, weil die niedrige Temperatur dauerhaft ist. Vor der Bestellung werden die konkreten Entnahmewerte, Leistungsaufnahme, Lautstärke und Ablaufmöglichkeit abgeglichen.",
      note: "Das Beispiel ersetzt keine Ursachenprüfung bei eindringendem Wasser oder sichtbarem Schimmel.",
    },
    limitation: "Die Einordnung ersetzt keine Diagnose der Feuchteursache. Leistung, Stromaufnahme und zulässige Betriebstemperatur müssen im Datenblatt des konkreten Geräts geprüft werden.",
    sources: [
      {
        label: "DD8L Zambezi mit Leistungsdaten bei 10 Grad",
        href: "https://eu.meaco.com/products/meaco-dd8l-zambezi-luftentfeuchter",
        publisher: "Meaco DE GmbH",
        note: "Herstellerdaten zu Adsorption, Entnahmeleistung und Leistungsaufnahme bei 10 und 20 Grad sowie zur Eignung für kalte Keller.",
      },
      {
        label: "DD8L Luftentfeuchter für Räume unter 10 Grad",
        href: "https://eu.meaco.com/products/meaco-dd8l-luftentfeuchter",
        publisher: "Meaco DE GmbH",
        note: "Herstellerbeschreibung des Verfahrens und des vorgesehenen Einsatzes in kalten Wohnungen, Kellern und Garagen.",
      },
      {
        label: "Schimmel und Feuchtigkeit in Innenräumen",
        href: "https://www.umweltbundesamt.de/themen/gesundheit/umwelteinfluesse-auf-den-menschen/schimmel",
        publisher: "Umweltbundesamt",
        note: "Behördliche Einordnung von Feuchteursachen, Vorbeugung und der notwendigen Beseitigung baulicher Ursachen.",
      },
      {
        label: "Richtig lüften und Keller im Sommer beachten",
        href: "https://www.umweltbundesamt.de/en/node/3086",
        publisher: "Umweltbundesamt",
        note: "Hinweise zur Lüftung in Abhängigkeit von Jahreszeit, Raumtemperatur und Kondensationsrisiko.",
      },
    ],
    relatedLinks: [
      { label: "Luftentfeuchter Rechner", href: "/haus/raumklima/luftentfeuchter-rechner/", description: "Raum, Temperatur und Feuchte zu passenden Auswahlkriterien verbinden." },
      { label: "Luftentfeuchter im Keller", href: "/haus/raumklima/luftentfeuchter-keller/", description: "Feuchtequelle, Aufstellung und Dauerbetrieb im Keller einordnen." },
      { label: "Stromverbrauch berechnen", href: "/haus/raumklima/luftentfeuchter-stromverbrauch/", description: "Wattzahl und reale Laufzeit in Monatskosten übersetzen." },
      { label: "Kompressor und Adsorption allgemein", href: "/ratgeber/luftentfeuchter-kompressor-oder-adsorption/", description: "Die Verfahren ohne Bindung an eine bestimmte Kellertemperatur vergleichen." },
      { label: "Raumklima sinnvoll planen", href: "/haus/raumklima/", description: "Rechner und Ratgeber zu Feuchte, Luftentfeuchtung und laufenden Kosten öffnen." },
    ],
  } as T;
}

function windyPrivacyScreen<T extends EditorialDecisionGuide>(guide: T): T {
  return {
    ...guide,
    indexingApproval: {
      reviewedAt: "2026-09-16",
      canonicalPath: "/ratgeber/vergleiche/sichtschutz/sichtschutz-wpc-oder-aluminium-windige-lage/",
      primaryIntent: "Für einen windigen Standort zwischen einem WPC und einem Aluminium Sichtschutzsystem entscheiden.",
      distinctValue: "Die Seite behandelt Wind nicht als Materialeigenschaft, sondern als Zusammenspiel aus Füllung, Höhe, Pfosten, Verankerung, Fundament, Boden und geprüftem Gesamtsystem.",
      overlapReview: [
        "/ratgeber/sichtschutz-bei-starkem-wind/",
        "/garten/sichtschutz-pfosten-fundament/",
        "/garten/sichtschutz-planer/",
      ],
    },
    title: "WPC oder Aluminium Sichtschutz in windiger Lage",
    heading: "WPC oder Aluminium Sichtschutz in windiger Lage",
    description: "WPC und Aluminium Sichtschutz für windige Standorte nach Füllung, Pfosten, Fundament, Boden, Höhe, Pflege und geprüftem System vergleichen.",
    intro: "Wind drückt nicht auf einen Materialnamen, sondern auf die gesamte Fläche. Ein geschlossener Sichtschutz aus WPC kann genauso ungeeignet geplant sein wie ein Aluminiumelement. Entscheidend sind Systemfreigabe, Höhe, Pfosten, Verankerung, Fundament und der konkrete Standort.",
    takeaway: "Ausgangspunkt ist ein vollständig dokumentiertes System für deine Aufbauart. Aluminium kann leichter und formstabil sein. WPC bietet eine andere Optik und Haptik. Für die Windtauglichkeit zählt jedoch, ob Element, Pfosten, Halter, Bodenanker und Fundament gemeinsam für den Standort ausgelegt sind.",
    plannerHref: "/garten/sichtschutz-planer/",
    plannerLabel: "Sichtschutzsystem planen",
    sections: [
      {
        title: "Die geschlossene Fläche erzeugt die Last",
        paragraphs: [
          "Ein blickdichtes Feld bietet dem Wind viel Angriffsfläche. Mit jeder zusätzlichen Höhe und Breite steigt die Bedeutung von Pfosten, Befestigung und Gründung. Das Material der Füllung allein beantwortet diese statische Frage nicht.",
          "Teiloffene Lamellen können Wind anders durchlassen als eine geschlossene Fläche. Auch hier darf die Wirkung nicht geschätzt werden. Verwende nur Kombinationen, die der Hersteller als System beschreibt und montiere sie mit den vorgesehenen Abständen und Bauteilen.",
        ],
      },
      {
        title: "WPC bringt Eigengewicht und Bewegung mit",
        paragraphs: [
          "WPC Profile bestehen aus einem Verbundwerkstoff und können sich mit Temperatur und Feuchte verändern. Montagefugen, Profilrichtung, Abschlussleisten und die vorgesehene Halterung müssen deshalb genau zum System passen.",
          "Das höhere Eigengewicht mancher WPC Füllungen ist nicht automatisch ein Vorteil gegen Wind. Es belastet Pfosten und Montage zusätzlich. Entscheidend bleibt die freigegebene Kombination aus Element, Rahmen und Verankerung.",
        ],
      },
      {
        title: "Aluminium ist leicht und trotzdem kein Freibrief",
        paragraphs: [
          "Aluminiumprofile sind korrosionsbeständig und häufig leichter. Bei einem vollständig geschlossenen Feld bleibt die Windfläche trotzdem bestehen. Dünne Profile, große Spannweiten oder nicht passende Halter können die Systemleistung begrenzen.",
          "Achte auf Beschichtung, Schnittkanten, Kontakt zu anderen Metallen und die vorgeschriebenen Verbindungen. Ein Aluminiumsystem ist nur so belastbar wie seine Pfosten, Klemmen, Schrauben und der Untergrund.",
        ],
      },
      {
        title: "Pfosten und Abstände gehören zum Produkt",
        paragraphs: [
          "Pfostenquerschnitt, Abstand und Einbindetiefe dürfen nicht aus einem anderen Zaunsystem übernommen werden. Bereits eine andere Elementhöhe oder ein zusätzliches Tor kann die Lastverteilung verändern.",
          "TraumGarten weist in seinen Systemanleitungen ausdrücklich auf die Verwendung der vorgesehenen Systemkomponenten hin. Bei Sonderhöhen oder abweichender Montage ist eine eigene Planung nötig. Ein Händlerfoto ersetzt diese Unterlagen nicht.",
        ],
      },
      {
        title: "Das Fundament beginnt mit dem Boden",
        paragraphs: [
          "Sandiger, aufgefüllter, bindiger oder nasser Boden trägt unterschiedlich. Auch Frost, Gefälle und Wasserabfluss beeinflussen die Gründung. Ein pauschales Lochmaß ohne Boden und Systemangabe ist für eine windige Lage nicht belastbar.",
          "Aufschrauben auf eine vorhandene Platte funktioniert nur, wenn Platte, Randabstände, Befestiger und Aufbau dafür geeignet sind. Ein schwerer Pflanzkübel oder eine dünne Terrassenplatte ist kein automatisch ausreichendes Fundament.",
        ],
      },
      {
        title: "Höhe und Standort verändern die Beanspruchung",
        paragraphs: [
          "Ein freier Feldrand, eine Hausecke oder eine exponierte Terrasse kann stärker belastet werden als eine geschützte Innenlage. Auch Böen und Verwirbelungen zwischen Gebäuden gehören in die Standortbeschreibung.",
          "Bei hohen Feldern, Dachterrassen oder einer Montage nahe einer Absturzkante reicht eine gewöhnliche Gartenzaunplanung nicht aus. Herstellerhinweise, örtliche Regeln und bei Bedarf eine fachliche Bemessung müssen vor der Bestellung geklärt sein.",
        ],
      },
      {
        title: "Pflege und Reparatur unterscheiden sich",
        paragraphs: [
          "WPC kann Farbunterschiede und eine materialtypische Veränderung der Oberfläche zeigen. Aluminium braucht meist wenig Pflege, kann aber bei beschädigter Beschichtung oder ungeeigneten Kontaktstellen Probleme entwickeln. Beide Oberflächen sollten mit den freigegebenen Mitteln gereinigt werden.",
          "Frage vor dem Kauf, ob einzelne Profile, Kappen, Halter und Pfosten nachbestellt werden können. Ein reparierbares System ist an einem windigen Standort wertvoller als ein günstiges Element ohne verfügbare Ersatzteile.",
        ],
      },
      {
        title: "So fällt die Materialentscheidung",
        paragraphs: [
          "Aluminium ist sinnvoll, wenn geringeres Gewicht, klare Profile und wenig Oberflächenpflege wichtig sind und ein passendes Gesamtsystem für die Lage vorliegt. WPC passt, wenn die Verbundoptik gewünscht ist und Fugen, Gewicht und Pflegehinweise akzeptiert werden.",
          "Ohne Nachweis für Pfosten, Verankerung und Fundament ist keines der beiden Materialien eine sichere Wahl. In windiger Lage sollte das besser dokumentierte System den Vorrang vor dem bevorzugten Dekor erhalten.",
        ],
      },
    ],
    comparison: {
      caption: "WPC und Aluminium als Teil eines vollständigen Sichtschutzsystems",
      columns: ["Prüfpunkt", "WPC", "Aluminium"],
      rows: [
        ["Eigengewicht", "Je nach Profil und Rahmen häufig höher", "Häufig leichter"],
        ["Bewegung", "Materialtypische Fugen und Montagevorgaben beachten", "Wärmeausdehnung und Systemfugen beachten"],
        ["Windfläche", "Hängt von geschlossener oder offener Füllung ab", "Hängt ebenfalls von Profilanordnung und Öffnungen ab"],
        ["Pflege", "Herstellerhinweise zu Oberfläche und Farbveränderung", "Beschichtung und Kontaktstellen kontrollieren"],
        ["Entscheidender Nachweis", "Freigabe für Element, Pfosten und Gründung", "Freigabe für Element, Pfosten und Gründung"],
      ],
    },
    checklist: [
      "Freie Feldlänge und geplante Höhe messen.",
      "Geschlossene und offene Flächen des Elements unterscheiden.",
      "Exponierte Lage, Hausecken und Gefälle dokumentieren.",
      "Bodenart und vorhandene Fundamente prüfen lassen.",
      "Pfosten, Halter, Anker und Füllung als ein System auswählen.",
      "Herstelleranleitung für die konkrete Aufbauart lesen.",
      "Sonderhöhe, Tor und Eckfelder gesondert bewerten.",
      "Örtliche Abstandsregeln und zulässige Höhe klären.",
      "Ersatzteile und Reparaturmöglichkeit vor dem Kauf prüfen.",
    ],
    faqs: [
      { question: "Ist Aluminium bei Wind grundsätzlich stabiler als WPC?", answer: "Nein. Aluminium kann leichter und formstabil sein, doch die Windtauglichkeit entsteht aus Element, Profilanordnung, Pfosten, Haltern, Verankerung und Fundament. Nur die Freigabe des vollständigen Systems ist belastbar." },
      { question: "Hilft ein schweres WPC Element gegen Wind?", answer: "Das Eigengewicht verhindert nicht die seitliche Windlast und beansprucht die Konstruktion zusätzlich. Pfostenabstand, Halter und Gründung müssen zum Gewicht und zur Windfläche passen." },
      { question: "Kann ich Sichtschutz auf Terrassenplatten aufschrauben?", answer: "Nur wenn die tragende Konstruktion, Plattendicke, Randabstände und Befestiger dafür ausgelegt sind. Eine lose oder dünne Platte ist kein Ersatz für einen nachgewiesenen Untergrund." },
      { question: "Sind offene Lamellen immer windfest?", answer: "Sie können die Windfläche verringern, sind aber nicht automatisch für jeden Standort freigegeben. Profilstellung, Öffnungsanteil, Höhe und Systembauteile müssen aus der Herstellerplanung stammen." },
      { question: "Brauche ich für hohe Felder eine Fachplanung?", answer: "Bei Sonderhöhen, exponierten Lagen, Dachterrassen oder unklarem Boden ist fachliche Planung sinnvoll. Manche Systemanleitungen verlangen sie ausdrücklich ab bestimmten Abweichungen." },
    ],
    example: {
      title: "Drei Felder an einer freien Grundstücksseite",
      intro: "Geplant ist ein weitgehend geschlossener Sichtschutz ohne schützende Bebauung auf der Windseite.",
      steps: [
        { label: "Gesamtlänge", value: "5,40 m" },
        { label: "Geplante Höhe", value: "1,80 m" },
        { label: "Standort", value: "freie Grundstücksseite" },
        { label: "Boden", value: "noch nicht geprüft" },
        { label: "Aufbau", value: "drei Felder mit zwei Enden und zwei Zwischenpfosten" },
        { label: "Offene Frage", value: "Systemfreigabe und Fundament für die konkrete Lage" },
        { label: "Entscheidende Gegenprobe", value: "vollständige Montageunterlage für den gewählten Aufbau" },
      ],
      result: "Eine Materialentscheidung wäre zu früh. Boden, Pfostensystem, Verankerung und Montageanleitung bilden die technische Grundlage. Innerhalb geeigneter Systeme lassen sich WPC und Aluminium nach Gewicht, Oberfläche, Pflege und Preis vergleichen.",
      note: "Das Beispiel enthält keine statische Bemessung und keine Fundamentfreigabe.",
    },
    limitation: "Die Seite liefert keine statische Freigabe. Windbeanspruchung, Boden, Fundament, Befestigung und örtliche Regeln müssen für das konkrete System und den Standort geprüft werden.",
    sources: [
      {
        label: "SYSTEM Klemmpfosten mit WPC und Aluminium Elementen",
        href: "https://www.traumgarten.de/multi-languages-files/Montageanleitungen/Zaeune/2332_SYSTEM-Klemmpfosten.de_DE.pdf",
        publisher: "TraumGarten",
        note: "Montageanleitung mit Systemkomponenten, Materialvarianten und Hinweisen zur Planung und Befestigung.",
      },
      {
        label: "SYSTEM BASIC Steckpfosten",
        href: "https://www.traumgarten.de/multi-languages-files/Montageanleitungen/Zaeune/4185_SYSTEM-Basic-Steckpfosten.de_DE.pdf",
        publisher: "TraumGarten",
        note: "Herstellerunterlage zur Montage von Pfosten, Elementen und Zubehör sowie zu abweichenden Aufbauhöhen und Fundamentplanung.",
      },
      {
        label: "Aktuelle Aufbauanleitungen für Sichtschutzsysteme",
        href: "https://www.traumgarten.de/de/aufbauanleitungen.html",
        publisher: "TraumGarten",
        note: "Zentrale Herstellerseite für aktuelle Montageunterlagen und systemspezifische Vorgaben.",
      },
    ],
    relatedLinks: [
      { label: "Sichtschutz Planer", href: "/garten/sichtschutz-planer/", description: "Länge, Höhe, Tor und Materialwunsch in einen Projektbedarf übersetzen." },
      { label: "Pfosten und Fundament", href: "/garten/sichtschutz-pfosten-fundament/", description: "Pfostenraster und Gründung als eigene Planungsaufgabe verstehen." },
      { label: "Sichtschutzelemente berechnen", href: "/garten/sichtschutz-elemente-berechnen/", description: "Feldbreiten und Restmaß für die konkrete Strecke ermitteln." },
      { label: "Sichtschutz bei starkem Wind", href: "/ratgeber/sichtschutz-bei-starkem-wind/", description: "Windfläche, Standort und Tragwerk unabhängig vom Füllmaterial einordnen." },
      { label: "Gartentor einplanen", href: "/garten/sichtschutz-gartentor-planen/", description: "Öffnung, Anschlag und zusätzliche Pfosten im selben System berücksichtigen." },
    ],
  } as T;
}
