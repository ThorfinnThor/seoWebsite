import dehumidifierCatalog from "@/public/data/dehumidifier/catalog.json";
import flooringCatalog from "@/public/data/flooring/catalog.json";
import gardenHouseCatalog from "@/public/data/garden-house/catalog.json";
import irrigationCatalog from "@/public/data/irrigation/catalog.json";
import projectCatalog from "@/public/data/project-products/catalog.json";
import robotMowerCatalog from "@/public/data/robot-mower/catalog.json";
import exclusions from "@/data/manual/guide-product-exclusions.json";
import merchantRegistry from "@/data/manual/merchants.json";
import { merchantLabel } from "@/lib/catalog/merchant-label";
import { resolveOfferUrl } from "@/lib/catalog/offer-url";
import type { OfferBase } from "@/lib/catalog/types";

/**
 * Picks up to three products for a guide from the reviewed catalogs. Selection
 * and order use documented product properties only. Prices and commission are
 * never read here, so neither can influence the result.
 */
export type GuideProduct = {
  id: string;
  name: string;
  merchantName: string;
  url: string;
  facts: string[];
};

export type GuideProductSelection = {
  verticalRef: string;
  heading: string;
  basis: string;
  products: GuideProduct[];
};

type CatalogProduct = {
  id: string;
  name: string;
  brand?: string;
  reviewed: boolean;
  [key: string]: unknown;
};

type Pick = {
  basis: string;
  /** One entry per slot. Each slot takes the best remaining candidate. */
  slots: Array<{ match: (product: CatalogProduct) => boolean; rank?: (product: CatalogProduct) => number }>;
};

type TopicConfig = {
  verticalRef: string;
  heading: string;
  catalog: { products: unknown[]; offers: unknown[] };
  vertical?: string;
  facts: (product: CatalogProduct) => Array<string | undefined>;
  pick: (path: string) => Pick;
};

const PARTNERS = new Set(
  merchantRegistry.merchants
    .filter((merchant) => merchant.network === "awin" && merchant.applicationStatus === "active" && merchant.enabled)
    .map((merchant) => String(merchant.awinAdvertiserId)),
);

/** Products whose merchant page was gone or sold out when we last looked. */
const EXCLUDED = new Set(exclusions.products.map((product) => product.id));

const num = (product: CatalogProduct, key: string) => (typeof product[key] === "number" ? (product[key] as number) : undefined);
const de = (value: number, digits = 1) => value.toLocaleString("de-DE", { maximumFractionDigits: digits });
const within = (value: number | undefined, min: number, max: number) => value !== undefined && value >= min && value <= max;
const closest = (key: string, target: number) => (product: CatalogProduct) => Math.abs((num(product, key) ?? Number.MAX_SAFE_INTEGER) - target);
const times = (count: number, slot: Pick["slots"][number]) => Array.from({ length: count }, () => slot);
const areaFromPath = (path: string) => {
  const match = path.match(/(\d+)-qm/);
  return match ? Number(match[1]) : undefined;
};
const isMat = (product: CatalogProduct) => /matte|folie|band|abdeckung/i.test(product.name);

const MATERIAL: Record<string, string> = { wood: "Holz", metal: "Metall", plastic: "Kunststoff", wpc: "WPC" };
const NAVIGATION: Record<string, string> = { camera: "Kamera", lidar: "LiDAR", hybrid: "kabellos über Satellit", wire: "Begrenzungskabel", rtk: "RTK" };
const GLAZING: Record<string, string> = { glass: "Glas", polycarbonate: "Hohlkammerplatten", mixed: "Glas und Hohlkammerplatten" };
const ROOF: Record<string, string> = { flat: "Flachdach", gable: "Satteldach", pent: "Pultdach" };
const FLOORING: Record<string, string> = { laminate: "Laminat", "vinyl-click": "Klickvinyl", "parquet-floating": "Parkett" };
const BOARD: Record<string, string> = { standard: "Standardplatte", "gypsum-fiber": "Gipsfaser", "fire-acoustic": "Brand- und Schallschutz", moisture: "Feuchtraum" };

function gardenHouseRange(path: string): { min: number; max: number; label: string } {
  if (/sechs-fahrraeder/.test(path)) return { min: 8.5, max: 13, label: "8,5 bis 13 m²" };
  if (/vier-fahrraeder/.test(path)) return { min: 6, max: 9, label: "6 bis 9 m²" };
  if (/zwei-fahrraeder|2x2|rasenmaeher|kleine/.test(path)) return { min: 3.5, max: 6, label: "3,5 bis 6 m²" };
  if (/3x4|werkstatt/.test(path)) return { min: 9, max: 14, label: "9 bis 14 m²" };
  if (/3x3/.test(path)) return { min: 8, max: 10.5, label: "8 bis 10,5 m²" };
  if (/5x5/.test(path)) return { min: 18, max: 30, label: "18 bis 30 m²" };
  return { min: 4.5, max: 9, label: "4,5 bis 9 m²" };
}

const TOPICS: Record<string, TopicConfig> = {
  gartenhaus: {
    verticalRef: "garden-house",
    heading: "Gartenhäuser in dieser Größe",
    catalog: gardenHouseCatalog,
    facts: (p) => [
      `${de(num(p, "widthCm")! / 100, 2)} × ${de(num(p, "depthCm")! / 100, 2)} m`,
      MATERIAL[String(p.material)],
      p.roofType ? ROOF[String(p.roofType)] : undefined,
      p.floorIncluded === true ? "Boden enthalten" : undefined,
    ],
    pick: (path) => {
      const range = gardenHouseRange(path);
      const inRange = (p: CatalogProduct) => !/carport|anbau/i.test(p.name) && within(num(p, "footprintM2"), range.min, range.max);
      const target = (range.min + range.max) / 2;
      const rank = closest("footprintM2", target);
      const wood = { match: (p: CatalogProduct) => inRange(p) && p.material === "wood", rank };
      const metal = { match: (p: CatalogProduct) => inRange(p) && p.material === "metal", rank };
      const slots = /werkstatt|satteldach|blockbohlen/.test(path) ? [wood, wood, wood] : [wood, metal, wood];
      return { basis: `Ausgewählt nach Grundfläche (${range.label}) und Material.`, slots };
    },
  },
  maehroboter: {
    verticalRef: "robot-mower",
    heading: "Mähroboter, die dazu passen",
    catalog: robotMowerCatalog,
    facts: (p) => [
      `bis ${de(num(p, "ratedAreaM2")!, 0)} m²`,
      num(p, "maxSlopePercent") ? `bis ${num(p, "maxSlopePercent")} % Steigung` : undefined,
      NAVIGATION[String(p.navigation)],
    ],
    pick: (path) => {
      const area = areaFromPath(path);
      if (/hanglage|steigung/.test(path)) return { basis: "Ausgewählt nach der höchsten Steigung laut Hersteller.", slots: times(3, { match: (p) => (num(p, "maxSlopePercent") ?? 0) >= 45, rank: (p) => -(num(p, "maxSlopePercent") ?? 0) }) };
      if (/rtk-oder-lidar|kabellos|baeumen/.test(path)) return { basis: "Ausgewählt nach Navigation ohne Begrenzungskabel.", slots: ["lidar", "hybrid", "camera"].map((navigation) => ({ match: (p: CatalogProduct) => p.navigation === navigation && (num(p, "ratedAreaM2") ?? 0) >= 500, rank: closest("ratedAreaM2", 800) })) };
      if (/passage|verwinkelt/.test(path)) return { basis: "Ausgewählt nach der schmalsten Passage, die der Hersteller nennt.", slots: times(3, { match: (p) => num(p, "minPassageCm") !== undefined, rank: (p) => num(p, "minPassageCm")! }) };
      if (/kleiner-garten/.test(path)) return { basis: "Ausgewählt nach Nennfläche (100 bis 600 m²).", slots: times(3, { match: (p) => within(num(p, "ratedAreaM2"), 100, 600), rank: closest("ratedAreaM2", 300) }) };
      const need = Math.ceil((area ?? 500) * 1.2);
      return { basis: area ? `Ausgewählt nach Nennfläche ab ${de(need, 0)} m², also ${de(area, 0)} m² plus 20 Prozent Reserve.` : "Ausgewählt nach Nennfläche für mittelgroße Gärten ab 600 m².", slots: times(3, { match: (p) => within(num(p, "ratedAreaM2"), need, need * 3), rank: closest("ratedAreaM2", need) }) };
    },
  },
  luftentfeuchter: {
    verticalRef: "dehumidifier",
    heading: "Luftentfeuchter, die dazu passen",
    catalog: dehumidifierCatalog,
    facts: (p) => [
      num(p, "maxRecommendedAreaM2") ? `bis ${de(num(p, "maxRecommendedAreaM2")!, 0)} m²` : num(p, "maxRecommendedVolumeM3") ? `bis ${de(num(p, "maxRecommendedVolumeM3")!, 0)} m³` : undefined,
      num(p, "extractionLPerDay") ? `${de(num(p, "extractionLPerDay")!)} l/Tag laut Hersteller` : undefined,
      p.continuousDrain === true ? "Schlauchanschluss" : num(p, "tankLiters") ? `${de(num(p, "tankLiters")!)} l Tank` : undefined,
      num(p, "minOperatingTempC") !== undefined ? `ab ${num(p, "minOperatingTempC")} °C` : undefined,
    ],
    pick: (path) => {
      const usable = (p: CatalogProduct) => !/bautrockner|peltier/i.test(p.name) && num(p, "extractionLPerDay") !== undefined;
      if (/keller|adsorption/.test(path)) return { basis: "Zuerst Geräte mit dokumentierter Mindesttemperatur, danach Geräte mit hoher Tagesleistung.", slots: [...times(2, { match: (p) => usable(p) && num(p, "minOperatingTempC") !== undefined, rank: (p) => num(p, "minOperatingTempC")! }), { match: (p) => usable(p) && within(num(p, "maxRecommendedAreaM2"), 40, 75), rank: closest("extractionLPerDay", 20) }] };
      if (/waesche/.test(path)) return { basis: "Ausgewählt nach Wäscheprogramm laut Hersteller.", slots: times(3, { match: (p) => usable(p) && p.laundryMode === true && (num(p, "maxRecommendedAreaM2") ?? 0) >= 20, rank: closest("maxRecommendedAreaM2", 40) }) };
      const area = /badezimmer/.test(path) ? 10 : areaFromPath(path) ?? 30;
      return { basis: `Ausgewählt nach der Herstellerangabe für Räume ab ${de(area, 0)} m².`, slots: times(3, { match: (p) => usable(p) && within(num(p, "maxRecommendedAreaM2"), area, area * 2), rank: closest("maxRecommendedAreaM2", area * 1.15) }) };
    },
  },
  terrasse: {
    verticalRef: "terrace",
    heading: "Dielen für dieses Projekt",
    catalog: projectCatalog,
    vertical: "terrace",
    facts: (p) => [MATERIAL[String(p.material)], num(p, "boardLengthMm") ? `${de(num(p, "boardLengthMm")! / 1000)} m lang` : undefined, num(p, "boardWidthMm") ? `${num(p, "boardWidthMm")} mm breit` : undefined, num(p, "boardThicknessMm") ? `${num(p, "boardThicknessMm")} mm stark` : undefined],
    pick: () => {
      const board = (material: string) => ({ match: (p: CatalogProduct) => p.kind === "decking" && p.material === material && (num(p, "boardWidthMm") ?? 0) >= 120 && (material !== "wood" || (num(p, "boardThicknessMm") ?? 0) >= 24) && !/set\b|muster/i.test(p.name), rank: closest("boardLengthMm", 4000) });
      return { basis: "Ausgewählt nach Material und Lieferlänge nahe 4 m.", slots: [board("wpc"), board("wood"), board("wpc")] };
    },
  },
  sichtschutz: {
    verticalRef: "privacy-screen",
    heading: "Sichtschutzelemente zum Vergleich",
    catalog: projectCatalog,
    vertical: "privacy-screen",
    facts: (p) => [num(p, "panelWidthCm") ? `${num(p, "panelWidthCm")} cm breit` : undefined, num(p, "panelHeightCm") ? `${num(p, "panelHeightCm")} cm hoch` : undefined],
    pick: () => ({ basis: "Ausgewählt nach fester Elementbreite und einer Höhe ab 160 cm.", slots: times(3, { match: (p) => p.kind === "panel" && !isMat(p) && within(num(p, "panelWidthCm"), 80, 200) && within(num(p, "panelHeightCm"), 160, 200), rank: closest("panelWidthCm", 180) }) }),
  },
  carport: {
    verticalRef: "carport",
    heading: "Carport-Bausätze in dieser Größe",
    catalog: projectCatalog,
    vertical: "carport",
    facts: (p) => [num(p, "externalWidthM") ? `${de(num(p, "externalWidthM")!, 2)} × ${de(num(p, "externalLengthM")!, 2)} m außen` : undefined, num(p, "vehicleCount") === 2 ? "zwei Fahrzeuge" : undefined, num(p, "clearHeightM") ? `${de(num(p, "clearHeightM")!, 2)} m Höhe laut Händler` : undefined],
    pick: (path) => {
      const kit = (p: CatalogProduct) => p.kind === "kit" && (num(p, "externalLengthM") ?? 0) >= 4.8;
      if (/doppelcarport|doppel/.test(path)) return { basis: "Ausgewählt nach Außenbreite für zwei Fahrzeuge.", slots: times(3, { match: (p) => kit(p) && num(p, "vehicleCount") === 2, rank: closest("externalWidthM", 6) }) };
      if (/suv/.test(path)) return { basis: "Ausgewählt nach Außenbreite ab 3,50 m. Das lichte Maß zwischen den Pfosten ist kleiner, bitte beim Händler prüfen.", slots: times(3, { match: (p) => kit(p) && num(p, "vehicleCount") === 1 && within(num(p, "externalWidthM"), 3.5, 4.6), rank: closest("externalWidthM", 3.9) }) };
      return { basis: "Ausgewählt nach Außenbreite von 3,00 bis 4,00 m für ein Fahrzeug.", slots: times(3, { match: (p) => kit(p) && num(p, "vehicleCount") === 1 && within(num(p, "externalWidthM"), 3, 4), rank: closest("externalWidthM", 3.5) }) };
    },
  },
  gewaechshaus: {
    verticalRef: "greenhouse",
    heading: "Gewächshäuser, die dazu passen",
    catalog: projectCatalog,
    vertical: "greenhouse",
    facts: (p) => [`${de(num(p, "externalWidthM")!, 2)} × ${de(num(p, "externalLengthM")!, 2)} m außen`, GLAZING[String(p.glazingType)], /ESG/.test(p.name) ? "Sicherheitsglas (ESG)" : undefined],
    pick: (path) => {
      const kit = (p: CatalogProduct) => p.kind === "kit" && num(p, "externalWidthM") !== undefined && num(p, "externalLengthM") !== undefined;
      const area = (p: CatalogProduct) => num(p, "externalWidthM")! * num(p, "externalLengthM")!;
      const near = (target: number) => (p: CatalogProduct) => Math.abs(area(p) - target);
      if (/blankglas|sicherheitsglas/.test(path)) return { basis: "Ausgewählt nach Verglasung. ESG steht in der Produktbezeichnung des Händlers.", slots: times(3, { match: (p) => kit(p) && /ESG/.test(p.name) && p.glazingType === "glass" && area(p) <= 9, rank: near(5) }) };
      if (/2x3|klein/.test(path)) return { basis: "Ausgewählt nach einer Grundfläche nahe 6 m².", slots: times(3, { match: (p) => kit(p) && within(area(p), 5, 7.5), rank: near(6) }) };
      const slot = (glazing: string) => ({ match: (p: CatalogProduct) => kit(p) && p.glazingType === glazing && within(area(p), 6, 12), rank: near(8) });
      return { basis: "Ausgewählt nach Verglasung und einer Grundfläche von 6 bis 12 m².", slots: [slot("polycarbonate"), slot("glass"), slot("mixed")] };
    },
  },
  bodenbelag: {
    verticalRef: "flooring",
    heading: "Böden, die dazu passen",
    catalog: flooringCatalog,
    facts: (p) => [FLOORING[String(p.flooringType)], num(p, "packageCoverageM2") ? `${de(num(p, "packageCoverageM2")!, 2)} m² je Paket` : undefined, num(p, "thicknessMm") ? `${de(num(p, "thicknessMm")!)} mm stark` : undefined, p.floorHeatingApproved === true ? "für Fußbodenheizung laut Händler" : undefined],
    pick: (path) => {
      const heating = /fussbodenheizung/.test(path);
      const wet = /kueche|feucht|bad/.test(path);
      const ok = (p: CatalogProduct) => (!heating || p.floorHeatingApproved === true) && (!wet || p.wetRoomApproved === true);
      const slot = (type: string) => ({ match: (p: CatalogProduct) => p.flooringType === type && (type !== "laminate" || /laminat/i.test(p.name)) && ok(p), rank: closest("packageCoverageM2", 2.4) });
      const basis = heating ? "Ausgewählt nach Freigabe für Fußbodenheizung laut Händler." : wet ? "Ausgewählt nach Feuchtraumangabe laut Händler." : "Ausgewählt nach Bodenart und vollständiger Paketangabe.";
      if (/laminat-fuer|laminat-verschnitt|laminat-auf/.test(path)) return { basis, slots: times(3, slot("laminate")) };
      if (/vinyl-klick/.test(path)) return { basis, slots: times(3, slot("vinyl-click")) };
      return { basis, slots: [slot("laminate"), slot("vinyl-click"), slot("vinyl-click")] };
    },
  },
  trockenbau: {
    verticalRef: "drywall",
    heading: "Material für diesen Aufbau",
    catalog: projectCatalog,
    vertical: "drywall",
    facts: (p) => [p.kind === "board" ? BOARD[String(p.boardType)] : p.kind === "joint" ? "Fugenmaterial" : undefined, num(p, "boardThicknessMm") ? `${de(num(p, "boardThicknessMm")!)} mm stark` : undefined, num(p, "boardLengthMm") && num(p, "boardWidthMm") ? `${num(p, "boardLengthMm")! / 10} × ${num(p, "boardWidthMm")! / 10} cm` : undefined, (num(p, "piecesPerPack") ?? 1) > 1 ? `${num(p, "piecesPerPack")} Stück je Paket` : undefined],
    pick: (path) => {
      const small = (p: CatalogProduct) => (num(p, "piecesPerPack") ?? 1) <= 12;
      const board = (type: string) => ({ match: (p: CatalogProduct) => p.kind === "board" && p.boardType === type && small(p) });
      const joint = { match: (p: CatalogProduct) => p.kind === "joint" };
      if (/schallschutz/.test(path)) return { basis: "Ausgewählt nach Plattentyp. Der Schallschutzwert gilt nur für das komplette System.", slots: [board("fire-acoustic"), board("gypsum-fiber"), joint] };
      if (/gipsfaser|feucht|bad|kueche/.test(path)) return { basis: "Ausgewählt nach Plattentyp.", slots: [board("gypsum-fiber"), board("moisture"), joint] };
      return { basis: "Ausgewählt nach Plattentyp, dazu ein Fugenmaterial.", slots: [board("standard"), board("gypsum-fiber"), joint] };
    },
  },
  bewaesserung: {
    verticalRef: "irrigation",
    heading: "Bauteile für diese Bewässerung",
    catalog: irrigationCatalog,
    facts: (p) => [({ controller: "Steuerung", dripline: "Tropfbewässerung", sprinkler: "Regner", "pressure-reducer": "Druckminderer mit Filter", filter: "Filter", valve: "Ventil" } as Record<string, string>)[String(p.kind)]],
    pick: (path) => {
      const kind = (value: string, pattern?: RegExp) => ({ match: (p: CatalogProduct) => p.kind === value && (!pattern || pattern.test(p.name)) && !/anschluss/i.test(p.name) });
      if (/wasserdruck|tropf|hochbeet|hecke|beete/.test(path)) return { basis: "Ausgewählt nach Bauteilart für eine Tropfzone.", slots: [kind("controller"), kind("dripline", /rohr/i), kind("pressure-reducer")] };
      return { basis: "Ausgewählt nach Bauteilart für getrennte Rasen- und Beetzonen.", slots: [kind("controller"), kind("sprinkler", /versenk|viereck/i), kind("dripline", /rohr/i)] };
    },
  },
};

function partnerOffers(catalog: TopicConfig["catalog"]) {
  const offers = new Map<string, OfferBase>();
  for (const offer of catalog.offers as OfferBase[]) {
    if (!offer.available || !PARTNERS.has(offer.merchantId) || offer.linkVerificationStatus !== "verified") continue;
    if (!offers.has(offer.productId)) offers.set(offer.productId, offer);
  }
  return offers;
}

export function getGuideProducts(topicSlug: string | undefined, path: string): GuideProductSelection | undefined {
  const config = topicSlug ? TOPICS[topicSlug] : undefined;
  if (!config) return undefined;

  const offers = partnerOffers(config.catalog);
  const candidates = (config.catalog.products as CatalogProduct[])
    .filter((product) => product.reviewed && !EXCLUDED.has(product.id) && !/B-Ware/i.test(product.name) && offers.has(product.id) && (!config.vertical || product.vertical === config.vertical))
    .sort((a, b) => a.id.localeCompare(b.id));
  const { basis, slots } = config.pick(path);
  const chosen: CatalogProduct[] = [];

  for (const slot of slots) {
    const matches = candidates.filter((product) => !chosen.includes(product) && slot.match(product));
    // A second product of the same brand only appears when nothing else fits.
    const brands = new Set(chosen.map((product) => product.brand));
    const pool = matches.some((product) => !brands.has(product.brand)) ? matches.filter((product) => !brands.has(product.brand)) : matches;
    const rank = slot.rank ?? (() => 0);
    const best = [...pool].sort((a, b) => rank(a) - rank(b))[0];
    if (best) chosen.push(best);
  }

  if (chosen.length < 2) return undefined;
  return {
    verticalRef: config.verticalRef,
    heading: config.heading,
    basis,
    products: chosen.map((product) => {
      const offer = offers.get(product.id)!;
      return {
        id: product.id,
        name: displayName(product.name),
        merchantName: merchantLabel(offer.merchantName),
        url: resolveOfferUrl(offer),
        facts: config.facts(product).filter((fact): fact is string => Boolean(fact)),
      };
    }),
  };
}

/** Drops search keywords that merchants append to product names. */
export function displayName(name: string) {
  return name
    .replace(/\s*\((?:LxBxH|BxTxH)\)/g, "")
    .replace(/,?\s*ESG\s*\([^)]*\)/g, " ESG")
    .replace(/,?\s*HKP\s*\([^)]*\)/g, " HKP")
    .replace(/\s+(?:Gipsplatte\s+)?günstig$/i, "")
    .replace(/\s+Sichtschutz Lamellenzaun/g, "")
    .replace(/\s+Unterstand(?=,|$)/g, "")
    .replace(/Gewächshaus-Set-Set/g, "Gewächshaus-Set")
    .replace(/\s+-\s+\d+ cm Schnittbreite.*$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
