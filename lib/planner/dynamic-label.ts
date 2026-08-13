export function nextNumberedLabel(labels: readonly string[], prefix: string, firstNumber = 1) {
  const pattern = new RegExp(`^${escapeRegExp(prefix)}\\s+(\\d+)$`);
  const highest = labels.reduce((maximum, label) => {
    const match = pattern.exec(label.trim());
    return match ? Math.max(maximum, Number(match[1])) : maximum;
  }, firstNumber - 1);

  return `${prefix} ${highest + 1}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
