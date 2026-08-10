import type { Metadata } from "next";
import { GuidePage } from "@/components/seo/GuidePage";

export const metadata: Metadata = { title: "Gewächshaus-Belüftung mit Dachfenstern planen", description: "Dachfenster, Querlüftung, automatische Öffner und Beschattung für ein kontrollierbares Gewächshausklima vorbereiten." };

export default function Page() {
  return <GuidePage
    title="Gewächshaus belüften: Öffnungen vor der Bepflanzung planen"
    intro="Sonne erwärmt ein geschlossenes Gewächshaus schnell. Dachfenster, tiefere Zuluft und ein freier Luftweg helfen, Wärme und Feuchte kontrollierbar abzuführen."
    updated="August 2026"
    breadcrumbs={[{ label: "Start", href: "/" }, { label: "Garten", href: "/garten/" }, { label: "Gewächshaus-Belüftung" }]}
    plannerHref="/garten/gewaechshaus-planer/"
    plannerLabel="Ausstattung vormerken"
    takeaway="Plane passende Dachöffnungen und eine gegenüberliegende Zuluftmöglichkeit direkt mit dem Modell. Automatische Öffner ergänzen die Kontrolle, ersetzen aber keine Prüfung und Wartung."
    limitation="MachPlan berechnet keine erforderliche Lüftungsfläche und kein Pflanzenklima. Dimensionierung, Sturmstellung, Temperaturgrenzen und Kompatibilität richten sich nach System, Standort und Nutzung."
    sections={[
      { title: "Warme Luft braucht einen Weg nach oben", paragraphs: ["Dachfenster können erwärmte Luft im oberen Bereich abführen. Eine Tür allein erzeugt je nach Wind und Geometrie nicht zuverlässig einen gleichmäßigen Luftwechsel.", "Eine tiefer liegende, möglichst gegenüberliegende Öffnung unterstützt die Querlüftung. Hohe Pflanzen, Regale oder Folien dürfen den Luftweg nicht unbeabsichtigt blockieren."] },
      { title: "Automatik ist Unterstützung, keine Garantie", paragraphs: ["Temperaturgesteuerte Öffner können Fenster ohne Strom bewegen, sofern Hubkraft, Anschluss und Öffnungsweg zum konkreten Fenster passen. Montageposition und Temperaturbereich sind herstellerspezifisch.", "Kontrolliere Mechanik, Befestigung und Dichtschluss regelmäßig. Bei Sturm, Frost oder saisonaler Stilllegung können andere Vorgaben gelten als im normalen Sommerbetrieb."] },
      { title: "Lüftung, Schatten und Wasser zusammendenken", paragraphs: ["Beschattung begrenzt solare Last, darf aber Öffnungen nicht behindern. Gießen und Pflanzen erhöhen zugleich die Luftfeuchte; dauerhaft nasse Oberflächen und stehende Luft können Probleme fördern.", "Beobachte Temperatur und Feuchte an mehreren Tageszeiten. Aus diesen Messungen lässt sich besser ableiten, ob Lüftungsroutine, Beschattung oder Bewässerungszeit angepasst werden müssen."] },
    ]}
  />;
}
