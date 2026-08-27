export interface RealPlannerProduct {
  id: string;
  name: string;
  brand: string;
  merchantName: string;
  priceEur: number;
  url: string;
  description: string;
  updatedAt: string;
}

/** Small editorial sample from the latest joined German feeds. */
export const REAL_PLANNER_PRODUCTS = {
  irrigation: [
    { id: "globus-gardena-water-control", name: "Gardena Bewässerungscomputer smart Dual Water Control", brand: "Gardena", merchantName: "Globus Baumarkt DE", priceEur: 124.99, url: "https://www.globus-baumarkt.de/p/gardena-bewaesserungscomputer-smart-dual-water-control-0692152470/", description: "Zweikanal-Steuerung als konkrete Option für automatisch getrennte Bewässerungszonen.", updatedAt: "2026-08-27T17:18:01.958Z" },
    { id: "globus-gardena-dripline", name: "Gardena Tropfrohr 15 m 4,6 mm", brand: "Gardena", merchantName: "Globus Baumarkt DE", priceEur: 14.89, url: "https://www.globus-baumarkt.de/p/gardena-tropfrohr-15-m-4-6-mm-3-16-0692151267/", description: "Tropfrohr für Beete und Hecken; die benötigte Länge ergibt sich aus dem Verlegeplan.", updatedAt: "2026-08-27T17:17:53.679Z" },
    { id: "globus-gardena-pipeline", name: "Gardena Start-Set Pipeline mit Viereckregner", brand: "Gardena", merchantName: "Globus Baumarkt DE", priceEur: 89, url: "https://www.globus-baumarkt.de/p/gardena-start-set-pipeline-mit-viereckregner-3-4-innengewinde-0692152219/", description: "Starterset für eine oberirdische oder vorbereitete Pipeline mit Regner.", updatedAt: "2026-08-27T17:17:56.223Z" },
  ],
  terrace: [
    { id: "globus-terrace-pine", name: "Terrassendiele Kiefer 200 × 14,5 × 2,8 cm", brand: "Globus Baumarkt", merchantName: "Globus Baumarkt DE", priceEur: 7.78, url: "https://www.globus-baumarkt.de/p/terrassendiele-kiefer-200-x-14-5-x-2-8-cm-grob-fein-gruen-impraegniert-0780800001/", description: "Beispiel für eine imprägnierte Nadelholz-Diele; Profil und Herstellerabstände prüfen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-terrace-wpc-set", name: "Kovalex WPC-Terrassendielen Komplett-Set anthrazit", brand: "Kovalex", merchantName: "Globus Baumarkt DE", priceEur: 399, url: "https://www.globus-baumarkt.de/p/kovalex-wpc-terrassendielen-kompett-set-anthrazit-mattiert-0780800534/", description: "Komplettset als WPC-Alternative; enthaltene Mengen und Unterkonstruktion im Angebot prüfen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "benz24-traumgarten-clips", name: "TraumGarten WPC Terrassendiele Befestigungsclips Edelstahl", brand: "TraumGarten", merchantName: "Benz24 DE/AT", priceEur: 29.5, url: "https://benz24.de/traumgarten-wpc-terrassendiele-befestigungsclips-edelstahl.html", description: "Verdeckte Befestigung für ein kompatibles WPC-System; Packungsgröße vor Bestellung abgleichen.", updatedAt: "2026-08-27T00:00:00.000Z" },
  ],
  carport: [
    { id: "benz24-weka-carport-612", name: "weka Einzelcarport Y-Carport 612", brand: "weka", merchantName: "Benz24 DE/AT", priceEur: 849.65, url: "https://benz24.de/weka-y-carport-612.html", description: "Carport-Unterstand als Größenvergleich; Dachvariante und Außenmaße vor Auswahl prüfen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-canopia-carport-5000", name: "Canopia Carport Arcadia Alpine 5000", brand: "Canopia", merchantName: "Globus Baumarkt DE", priceEur: 2998, url: "https://www.globus-baumarkt.de/p/canopia-carport-arcadia-alpine-5000-507-x-359-x-307-cm-0784104134/", description: "Großes Komplettsystem mit angegebenen Außenmaßen; Statik und Genehmigung separat prüfen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-marley-downpipe-3m", name: "Marley Fallrohr NW 105 mm, 3 m", brand: "Marley", merchantName: "Globus Baumarkt DE", priceEur: 25.59, url: "https://www.globus-baumarkt.de/p/marley-fallrohr-nw-105-mm-3-m-grau-0782145064/", description: "Baustein für die Dachentwässerung; Rohrsystem und Ablaufziel kompatibel zusammenstellen.", updatedAt: "2026-08-27T00:00:00.000Z" },
  ],
  greenhouse: [
    { id: "globus-trendline-greenhouse-66", name: "TrendLine Gewächshaus Mythos I 6×6", brand: "TrendLine", merchantName: "Globus Baumarkt DE", priceEur: 199, url: "https://www.globus-baumarkt.de/p/trendline-gewaechshaus-mythos-i-6x6-186-x-185-x-209-cm-0692600400/", description: "Kompaktes Gewächshaus mit angegebenen Außenmaßen für einen ersten Größenvergleich.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-vitavia-venus-3800", name: "Vitavia Gewächshaus Venus 3800", brand: "Vitavia", merchantName: "Globus Baumarkt DE", priceEur: 628, url: "https://www.globus-baumarkt.de/p/vitavia-gewaechshaus-venus-3800-192-x-192-cm-3-mm-esg-0692600482/", description: "Gewächshaus mit ESG-Verglasung; Fundamentmaß und Innenaufteilung mit dem Plan abgleichen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-trendline-film", name: "TrendLine Ersatzplane Foliengewächshaus 2,4 × 1,8 m", brand: "TrendLine", merchantName: "Globus Baumarkt DE", priceEur: 69, url: "https://www.globus-baumarkt.de/p/trendline-ersatzplane-foliengewaechshaus-2-4-x-1-8-m-0692600021/", description: "Ersatzplane für ein kompatibles Foliengewächshaus; kein vollständiger Bausatz.", updatedAt: "2026-08-27T00:00:00.000Z" },
  ],
  privacy: [
    { id: "globus-plus-silence-140", name: "Plus Sichtschutzelement Silence 176 × 140 cm", brand: "Plus", merchantName: "Globus Baumarkt DE", priceEur: 179, url: "https://www.globus-baumarkt.de/p/plus-sichtschutzelement-silence-176-x-140-cm-schwarz-0784204002/", description: "Sichtschutzfeld mit konkreter Breite für den Rastervergleich; Pfosten separat einplanen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-plus-trend-170", name: "Plus Zaunelement Trend 115 × 170 cm", brand: "Plus", merchantName: "Globus Baumarkt DE", priceEur: 199, url: "https://www.globus-baumarkt.de/p/plus-zaunelement-trend-115-x-170-cm-schwarz-0784202406/", description: "Zaunelement als Alternative mit abweichender Feldbreite und Höhe.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-spax-zaunverbinder", name: "Spax Zaunverbinder 7 × 35 mm, 24 Stück", brand: "Spax", merchantName: "Globus Baumarkt DE", priceEur: 13.49, url: "https://www.globus-baumarkt.de/p/spax-zaunverbinder-7-0-x-35-mm-tx-30-24-stk-12-winkel-0763100001/", description: "Verbindungsmaterial für kompatible Holzkonstruktionen; Systemfreigabe beachten.", updatedAt: "2026-08-27T00:00:00.000Z" },
  ],
  drywall: [
    { id: "globus-knauf-miniboard", name: "Knauf Gipskartonplatte Miniboard GKB 120 × 60 cm", brand: "Knauf", merchantName: "Globus Baumarkt DE", priceEur: 4.85, url: "https://www.globus-baumarkt.de/p/knauf-gipskartonplatte-miniboard-gkb-120-x-60-cm-12-5-mm-0779250401/", description: "Kompaktes Plattenformat als reales Beispiel; Plattentyp und Aufbauanforderung abgleichen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-knauf-cw-profile", name: "Knauf CW-db-Ständerprofil 2600 × 75 × 50 mm", brand: "Knauf", merchantName: "Globus Baumarkt DE", priceEur: 7.55, url: "https://www.globus-baumarkt.de/p/knauf-cw-db-staenderprofil-2600-x-75-x-50-mm-0779250245/", description: "Ständerprofil für die Unterkonstruktion; Profilbreite und Achsraster müssen zusammenpassen.", updatedAt: "2026-08-27T00:00:00.000Z" },
    { id: "globus-knauf-filler", name: "Knauf Fugenfüller Leicht Spezialgips 10 kg", brand: "Knauf", merchantName: "Globus Baumarkt DE", priceEur: 13.29, url: "https://www.globus-baumarkt.de/p/knauf-spezialgips-fugenfueller-leicht-10-kg-0779100351/", description: "Fugenmaterial als Ergänzung; Verbrauch hängt von Plattenformat und Fugenbild ab.", updatedAt: "2026-08-27T00:00:00.000Z" },
  ],
} as const satisfies Record<string, readonly RealPlannerProduct[]>;
