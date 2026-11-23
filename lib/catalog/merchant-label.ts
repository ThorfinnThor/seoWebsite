/** „Globus Baumarkt DE“ is the programme name. Readers know the shop without the suffix. */
export function merchantLabel(name: string) {
  return name.replace(/\s+(?:DE\/AT|DE|DACH)$/u, "").replace(/\s+GmbH$/u, "");
}
