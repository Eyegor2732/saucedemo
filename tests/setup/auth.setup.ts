import { test as setup } from '@playwright/test';
import { createSaucedemoSessionCookie } from '@utils/commonMethods';

const sessionCookieStatePath: string = 'playwright/.auth/session-cookie.json';

setup('Create session-cookie storage state', async ({ page }) => {
  await createSaucedemoSessionCookie(page);
  await page.context().storageState({ path: sessionCookieStatePath });
});
