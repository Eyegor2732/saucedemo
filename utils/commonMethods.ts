/**
 * @agent Parses a currency-like string (e.g. "$1,234.56") into a float.
 * Removes commas and any non-numeric characters except the decimal point.
 * @param input Currency-like string value to convert (e.g. "$1,234.56").
 * @returns Parsed numeric value as a floating-point number.
 */
export function parseCurrencyStringToFloat(input: string): number {
  const noCommas = input.replace(/,/g, '');
  const cleaned = noCommas.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}
