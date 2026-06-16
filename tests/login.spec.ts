import { test, expect } from '@pageObjects/pageFixture';
import { NegativeLoginData, NegativeLoginSet } from '@data/datasets/negativeLoginSet.data';

test.describe('Saucedemo Login', () => {
  const negativeLoginDataSet: NegativeLoginData[] = NegativeLoginSet;

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

  test('should login with valid credentials', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await test.step('Fill in credentials and submit', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify successful login', async () => {
      await page.waitForURL('./inventory.html');
      await expect(inventoryPage.inventoryTitle).toBeVisible();
      await expect(inventoryPage.inventoryTitle).toHaveText(
        'Products',
      );
    });
  });

  negativeLoginDataSet.forEach((data) => {
    test(`should show error for ${data.title}`, async ({ loginPage }) => {
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
});
