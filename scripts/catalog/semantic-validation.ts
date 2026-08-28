import type { IrrigationProduct } from "@/lib/irrigation/types";

const IRRIGATION_NEGATIVE_NAME = /terrassendach|vordach|zisterne|regenwassertank|regenwassernutzungsanlage|\berdtank\b|\bflachtank\b|\btank\b|filterschacht|hauspaket|ausbaupaket|tauchpumpe|gartenpumpe|hauswasserwerk|\b\d[\d.,]*\s*watt\b|oberflächenbürste|oberflaechenbuerste|reinigungsbürste|reinigungsbuerste|hochdruckreiniger|montagewerkzeug|schneidwerkzeug/i;

const KIND_NAME_PATTERNS: Record<IrrigationProduct["kind"], RegExp> = {
  controller: /bewässerungscomputer|bewaesserungscomputer|steuergerät|steuergeraet|bewässerungssteuer|bewaesserungssteuer|irrigation\s*control|water\s*control|controller|\btimer\b/i,
  valve: /magnetventil|bewässerungsventil|bewaesserungsventil|ventilbox|regulierventil|absperrventil|wasserverteiler|\bverteiler\b/i,
  "pressure-reducer": /druckminder|druckregler|basisgerät|basisgeraet/i,
  filter: /wasserfilter|bewässerungsfilter|bewaesserungsfilter|micro-?drip[^\n]{0,30}filter|filter[^\n]{0,30}(?:bewässer|bewaesser|tropf)/i,
  sensor: /regensensor|feuchtesensor|bodenfeuchte|bewässerungssensor|bewaesserungssensor/i,
  dripline: /tropfrohr|tropfschlauch|perlschlauch|dripline|micro-?drip|endtro(pfer|f)|reihentropfer|pflanzreihen|bewässerungsset[^\n]{0,30}(?:hecke|sträucher|straeucher)/i,
  sprinkler: /viereckregner|kreisregner|versenkregner|sprühregner|spruehregner|schlauchregner|sprühdüse|spruehduese|kleinflächendüse|kleinflaechenduese|streifendüse|streifenduese|\bregner\b|sprinkler/i,
  connector: /verbinder|kupplung|t-stück|t-stueck|l-stück|l-stueck|kreuzstück|kreuzstueck|anschlussstück|anschlussstueck|hahnanschluss|verschlussstopfen|rohrhalter|winkelhahnstück|winkelhahnstueck|wassersteckdose|o-ring|verlängerungsrohr|verlaengerungsrohr/i,
  pipe: /bewässerungsrohr|bewaesserungsrohr|verlegerohr|gartenschlauch|bewässerungsschlauch|bewaesserungsschlauch|textilschlauch|\bschlauch\b|pipeline/i,
};

export const IRRIGATION_KIND_ORDER: IrrigationProduct["kind"][] = [
  "controller", "sensor", "valve", "pressure-reducer", "filter", "connector", "sprinkler", "dripline", "pipe",
];

export function irrigationSemanticIssues(product: Pick<IrrigationProduct, "name" | "kind">): string[] {
  const name = product.name.trim();
  if (IRRIGATION_NEGATIVE_NAME.test(name)) return ["semantic-kind-mismatch"];
  return KIND_NAME_PATTERNS[product.kind].test(name) ? [] : ["semantic-kind-mismatch"];
}

export function isKnownIrrigationFalsePositive(name: string): boolean {
  return IRRIGATION_NEGATIVE_NAME.test(name);
}

export function irrigationKindNamePattern(kind: IrrigationProduct["kind"]): RegExp {
  return KIND_NAME_PATTERNS[kind];
}
