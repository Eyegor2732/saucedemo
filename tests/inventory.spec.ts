import { test, expect, Cookie } from '@pageObjects/pageFixtures';
import { InventorySortingData, InventorySortingSet } from '@datasets/inventorySortingSet.data';

test.describe('Saucedemo Inventory', () => {
  const inventorySortingDataSet: InventorySortingData[] = InventorySortingSet;

  test.afterEach(async ({ page }, testInfo) => {
    const finalPageScreenshot = await page.screenshot({
      fullPage: true,
    });

    await testInfo.attach('final-page', {
      body: finalPageScreenshot,
      contentType: 'image/png',
    });
  });

  test.beforeEach(
    async ({ inventoryPage }) => {
      const header = inventoryPage.header();

      await test.step('Verify inventory page is accessible with session cookie', async () => {
        await inventoryPage.open();
        await expect(inventoryPage.header().pageTitle).toBeVisible();
        await expect(header.pageTitle).toHaveText('Products');
      });
    });

  test('TC-PRODUCT-01 - inventory page should not be empty', async ({
    inventoryPage,
  }) => {
    await test.step('Verify inventory items are displayed', async () => {
      const itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });
  });

  inventorySortingDataSet.forEach((data) => {
    test(`${data.testcase} - inventory page ${data.title}`, async ({ inventoryPage }) => {
      await test.step(`Verify inventory items are sorted ${data.title}`, async () => {
        await inventoryPage.sortAndVerifyInventory(data.select, data.isNameSort);
        // expect(await inventoryPage.sortInventory(data.select, data.isNameSort)).toBe("Success");
      });
    });
  });

  test('TC-PRODUCT-08 - expiring cookies should not allow access another page', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await test.step('Simulate inactivity by expiring the session cookie', async () => {
      const cookies: Cookie[] = await page.context().cookies();
      const sessionCookie: Cookie | undefined = cookies.find(cookie => cookie.name === 'session-username');
      if (sessionCookie) {
        await page.context().addCookies([{
          ...sessionCookie,
          expires: Math.floor(Date.now() / 1000), // set expired right now
        }]);
      }
    });

    await test.step('Verify session has expired', async () => {
      await inventoryPage.openShoppingCart();
      await expect(page).toHaveURL('./');
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.errorMessage)
        .toContainText(/You can only access '.*?' when you are logged in/);
    });
  });
});
