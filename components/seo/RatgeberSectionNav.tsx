import Link from "next/link";

type RatgeberSection = "practice" | "data" | "comparisons" | "topics";

const sections = [
  {
    key: "practice",
    href: "/ratgeber/#praxisratgeber",
    label: "Praxisratgeber",
    description: "Auswahl, Material und Planung",
  },
  {
    key: "data",
    href: "/ratgeber/daten/",
    label: "Eigene Datenauswertungen",
    description: "Geprüfte Katalogdaten mit Grenzen",
  },
  {
    key: "comparisons",
    href: "/ratgeber/vergleiche/",
    label: "Direkte Vergleiche",
    description: "Zwei Lösungen im konkreten Einsatz",
  },
  {
    key: "topics",
    href: "/ratgeber/#themenbereiche",
    label: "Themenbereiche",
    description: "Alles zu einem Projekt gebündelt",
  },
] as const;

export function RatgeberSectionNav({ active }: { active?: RatgeberSection }) {
  return (
    <nav className="ratgeber-section-nav" aria-label="Bereiche im Ratgeber">
      <p>Ratgeberbereiche</p>
      <div>
        {sections.map((section) => (
          <Link
            className={section.key === active ? "is-active" : undefined}
            href={section.href}
            key={section.key}
            aria-current={section.key === active ? "page" : undefined}
          >
            <strong>{section.label}</strong>
            <span>{section.description}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
