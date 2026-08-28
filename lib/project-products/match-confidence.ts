import type { MatchConfidence } from "./types";
export const MATCH_CONFIDENCE_LABELS: Record<MatchConfidence, string> = { exact: "Passt zur Berechnung", compatible: "Technisch kompatible Alternative", category: "Produkt aus der passenden Kategorie", supplement: "Mögliche Ergänzung" };
export const MATCH_CONFIDENCE_SCORE: Record<MatchConfidence, number> = { exact: 400, compatible: 300, category: 100, supplement: 0 };
