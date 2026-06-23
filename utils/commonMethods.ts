import { type Page } from '@playwright/test';

/**
 * @agent Creates a session cookie for saucedemo.com with a specified expiration time and username.
 * @param page - Playwright Page object to set the cookie on
 * @param expiresInSeconds - number of seconds until the session cookie expires, default is 10 minutes (600 seconds)
 * @param username - username to set in the session cookie, default is 'standard_user'
 * @returns Promise that resolves when the session cookie has been created
 * @description Creates a session cookie for saucedemo.com with a specified expiration time and username.
 * This can be used to simulate an authenticated session without going through the login process.
 */
export async function createSaucedemoSessionCookie(
  page: Page,
  expiresInSeconds: number = 10 * 60,
  username: string = 'standard_user',
): Promise<void> {
  const futureExpirationTime: number = Math.floor(Date.now() / 1000) + expiresInSeconds;

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
  const cleaned: string = input.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}
