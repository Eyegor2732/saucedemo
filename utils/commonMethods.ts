import { type Page } from '@playwright/test';

export async function createSaucedemoSessionCookie(
  page: Page,
  expiresInSeconds: number = 10 * 60, // default to 10 minutes
  username: string = 'standard_user', // default username for session cookie
): Promise<void> {
  // const expiresInSeconds = 60 * 60;
  const futureExpirationTime = Math.floor(Date.now() / 1000) + expiresInSeconds;

  await page.context().addCookies([{
    name: 'session-username',
    value: username,
    domain: 'www.saucedemo.com',
    path: '/',
    expires: futureExpirationTime,
    httpOnly: false,
    secure: false,
    sameSite: 'Lax',
  }]);
}

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
