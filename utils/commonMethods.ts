export function parseCurrencyStringToFloat(input: string): number {
  const noCommas = input.replace(/,/g, '');
  const cleaned = noCommas.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}
