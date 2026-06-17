import { test, expect } from '@pageObjects/pageFixtures';
import { NegativeLoginData, NegativeLoginSet } from '@data/datasets/negativeLoginSet.data';
import { PositiveLoginData, PositiveLoginSet } from '@data/datasets/positiveLoginSet.data';

test.describe('Saucedemo Login', () => {
  const negativeLoginDataSet: NegativeLoginData[] = NegativeLoginSet;
  const positiveLoginDataSet: PositiveLoginData[] = PositiveLoginSet;

  test.afterEach(async ({ page }, testInfo) => {
    const finalPageScreenshot = await page.screenshot({
      fullPage: true,
    });

    await testInfo.attach('final-page', {
      body: finalPageScreenshot,
      contentType: 'image/png',
    });
  });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.loginButton).toBeVisible();
  });

  positiveLoginDataSet.forEach((data) => {
    test(`${data.testcase} - should login for ${data.title}`, async ({ loginPage, inventoryPage, page }) => {
      await test.step('Fill in credentials and submit', async () => {
        await loginPage.login(data.username, data.password);
        await expect(loginPage.errorMessage).not.toBeVisible();
      });

      await test.step('Verify successful login', async () => {
        const header = inventoryPage.header();
        await page.waitForURL('./inventory.html');
        await expect(header.pageTitle).toBeVisible();
        await expect(header.pageTitle).toHaveText(
          'Products',
        );
      });
    });
  });

  negativeLoginDataSet.forEach((data) => {
    test(`${data.testcase} - should show error for ${data.title}`, async ({ loginPage }) => {
      await test.step('Fill in credentials and submit', async () => {
        await loginPage.login(data.username, data.password);
      });

      await test.step('Verify error message is displayed', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(
          data.message,
        );
      });
    });
  });

  test('TC-LOGIN-17 - Logout should clear session and redirect to login page',
    async ({ loginPage, inventoryPage, menuModal, page }) => {
      await test.step('Login with valid credentials', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await page.waitForURL('./inventory.html');
      });

      await test.step('Open menu and click logout', async () => {
        const header = inventoryPage.header();
        await header.menuButton.click();
        const cookies = await page.context().cookies();
        const sessionCookieBeforeLogout = cookies.find(cookie => cookie.name === 'session-username');
        expect(sessionCookieBeforeLogout).toBeDefined();
        await menuModal.logoutLink.click();
      });

      await test.step('Verify redirection to login page', async () => {
        await page.waitForURL('./');
        await expect(loginPage.loginButton).toBeVisible();
      });

      await test.step('Verify session cookie is cleared', async () => {
        const cookies = await page.context().cookies();
        const sessionCookieAfterLogout = cookies.find(cookie => cookie.name === 'session-username');
        expect(sessionCookieAfterLogout).toBeUndefined();
      });
    });
});
