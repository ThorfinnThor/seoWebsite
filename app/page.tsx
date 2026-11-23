import Link from "next/link";
import { QuickCalculator } from "@/components/calculator/QuickCalculator";
import { PlannerIcon } from "@/components/icons/PlannerIcon";
import { PLANNERS } from "@/lib/planners";

const AREAS = [
  { id: "garden", title: "Garten", href: "/garten/" },
  { id: "house", title: "Haus", href: "/haus/" },
] as const;

const GUIDES = [
  { href: "/ratgeber/trockenbauwand-3-meter/", title: "Material für eine 3 m lange Trockenbauwand", text: "Sechs Platten, sechs Ständer und warum fünf Platten knapp werden." },
  { href: "/ratgeber/terrassendielen-laengs-oder-quer/", title: "Terrassendielen längs oder quer?", text: "Auf 6 × 4 m entscheidet die Dielenlänge über null oder 27 Stöße." },
  { href: "/ratgeber/gartenhaus-fuer-sechs-fahrraeder/", title: "Gartenhaus für sechs Fahrräder", text: "Drei Anordnungen mit Grundriss, von 9,0 bis 11,1 m²." },
  { href: "/ratgeber/luftentfeuchter-fuer-50-qm/", title: "Luftentfeuchter für 50 m²", text: "Warum „20 Liter am Tag“ im Keller selten stimmt." },
  { href: "/ratgeber/carport-fuer-suv/", title: "Carport für einen SUV", text: "3,55 m zwischen den Pfosten und wie die Zahl entsteht." },
  { href: "/ratgeber/sichtschutz-10-meter-berechnen/", title: "10 Meter Sichtschutz aufteilen", text: "Drei saubere Lösungen für die fehlenden 46 cm." },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-intro">
        <div className="home-intro__grid">
          <div>
            <h1>Haus und Garten ausmessen, ausrechnen, passend kaufen.</h1>
            <p>Gib deine Maße ein und du weißt, wie viel Material du brauchst oder welche Größe passt. Zwölf Rechner, kostenlos und ohne Anmeldung.</p>
            <p className="home-intro__links"><Link className="text-link" href="/rechner/">Alle zwölf Rechner</Link><Link className="text-link" href="/ratgeber/">Ratgeber lesen</Link></p>
          </div>
          <QuickCalculator />
        </div>
      </section>

      <section className="section home-planners" id="rechner" aria-labelledby="home-planners-title">
        <h2 id="home-planners-title">Alle Rechner und Planer</h2>
        <div className="home-planners__columns">
          {AREAS.map((area) => (
            <div key={area.id}>
              <h3><Link href={area.href}>{area.title}</Link></h3>
              <ul>
                {PLANNERS.filter((planner) => planner.area === area.id).map((planner) => (
                  <li key={planner.id}>
                    <Link href={planner.href}>
                      <PlannerIcon name={planner.icon} />
                      <span><strong>{planner.title}</strong><small>{planner.homeDescription}</small></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section home-guides" aria-labelledby="home-guides-title">
        <h2 id="home-guides-title">Konkret durchgerechnet</h2>
        <ul>
          {GUIDES.map((guide) => <li key={guide.href}><Link href={guide.href}><strong>{guide.title}</strong><span>{guide.text}</span></Link></li>)}
        </ul>
        <p><Link className="text-link" href="/ratgeber/">Zu allen Ratgebern</Link></p>
      </section>

      <section className="section home-about" aria-labelledby="home-about-title">
        <h2 id="home-about-title">Wie sich die Seite finanziert</h2>
        <p>PassendPlanen wird von <Link href="/ueber-passendplanen/">Schayan Yousefian</Link> betrieben. Die Rechner sind kostenlos. Manche Produktlinks sind als Anzeige gekennzeichnet: Kaufst du darüber ein, erhalten wir eine Provision. Was angezeigt wird, hängt von deinen Maßen und den Herstellerangaben ab. Die Provision spielt dabei <Link href="/affiliate-transparenz/">keine Rolle</Link>.</p>
      </section>
    </>
  );
}
