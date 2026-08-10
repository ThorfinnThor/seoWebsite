import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlannerJsonLd } from "@/components/seo/PlannerJsonLd";
import { PlannerHeroSummary } from "@/components/planner/PlannerHeroSummary";
import { DehumidifierPlanner } from "./DehumidifierPlanner";

export const metadata = createPageMetadata({
  title: "Luftentfeuchter-Rechner",
  description: "Passende Gerätegröße nach Raumfläche, Volumen, Temperatur, Feuchtebelastung, Ablauf und Geräusch auswählen.",
  path: "/haus/raumklima/luftentfeuchter-rechner/",
});

export default function Page() {
  return <>
    <PlannerJsonLd name="Luftentfeuchter-Rechner" description="Luftentfeuchter nach Raumvolumen, Nutzung und Arbeitsbereich dimensionieren." path="/haus/raumklima/luftentfeuchter-rechner/" />
    <section className="planner-hero"><Breadcrumbs items={[{label:"Start",href:"/"},{label:"Haus",href:"/haus/"},{label:"Raumklima",href:"/haus/raumklima/"},{label:"Luftentfeuchter-Rechner"}]} /><div className="planner-hero-grid"><div><p className="eyebrow">Auswahlhilfe · keine Feuchtediagnose</p><h1>Dimensioniere einen Luftentfeuchter für deinen <em>Raum</em>.</h1><p>Wir verbinden Raumgröße und Nutzung mit geprüften Herstellerangaben – ohne eine scheinpräzise bauphysikalische Berechnung.</p></div><PlannerHeroSummary planner="dehumidifier" /></div></section>
    <section className="planner-wrap"><DehumidifierPlanner /></section>
    <section className="section planner-notes"><div><p className="eyebrow">Grenzen des Rechners</p><h2>Geräteauswahl statt Diagnose.</h2></div><div className="note-grid"><article><h3>✓ Das wird geprüft</h3><p>Raumgröße, Herstellerfreigabe, Temperaturbereich, Ablauf, Wäschemodus, Geräusch, Verfügbarkeit und Budget.</p></article><article><h3>! Fachlich klären</h3><p>Ursachen von Feuchtigkeit, Schimmel, Wasserschäden, bauliche Mängel und gesundheitliche Beschwerden gehören in fachkundige Hände.</p></article></div></section>
  </>;
}
