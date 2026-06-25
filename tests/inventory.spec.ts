import { test, expect, Cookie } from '@pageObjects/pageFixtures';
import { InventorySortingData, InventorySortingSet } from '@datasets/inventorySortingSet.data';
import { Buffer } from 'buffer';

test.describe('Saucedemo Inventory', () => {
  const inventorySortingDataSet: InventorySortingData[] = InventorySortingSet.filter((data) => !data.isMappingTest);
  const inventoryMappingDataSet: InventorySortingData[] = InventorySortingSet.filter((data) => data.isMappingTest);

  test.afterEach(async ({ page, inventoryPage }, testInfo) => {
    const finalPageScreenshot: Buffer = await page.screenshot({
      fullPage: true,
    });

    await testInfo.attach('final-page', {
      body: finalPageScreenshot,
      contentType: 'image/png',
    });

    await inventoryPage.removeAllItemsFromCart();

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
        await inventoryPage.sortAndVerifyInventory(data.select, data.isNameSort, data.isAscending);
      });
    });
  });

  test('TC-PRODUCT-06 - sorting should persist after navigating away and back to inventory page', async ({
    inventoryPage,
    cartPage
  }) => {
    test.skip(true, 'This test is skipped due to a known issue with sorting persistence.');

    await test.step('Sort inventory items by price (low to high)', async () => {
      await inventoryPage.sortAndVerifyInventory('lohi', false, true);
    });

    await test.step('Navigate away from inventory page', async () => {
      await inventoryPage.openShoppingCart();
      await expect(inventoryPage.header().pageTitle).toBeVisible();
      await expect(inventoryPage.header().pageTitle).toHaveText('Your Cart');
    });

    await test.step('Navigate back to inventory page', async () => {
      await cartPage.clickContinueShopping();
      await expect(inventoryPage.header().pageTitle).toBeVisible();
      await expect(inventoryPage.header().pageTitle).toHaveText('Products');
    });

    await test.step('Verify sorting persists after navigation', async () => {
      await expect(inventoryPage.header().sortingDropdown).toHaveValue('lohi');
      await inventoryPage.sortAndVerifyInventory('lohi', false, true);
    });
  });

  inventoryMappingDataSet.forEach((data) => {
    test(`${data.testcase} - product information should remain consistent after ${data.title}`, async ({ inventoryPage }) => {
      const nameDescriptionMapBefore: Map<string, string> = await inventoryPage.getMapNameDescription();
      const namePriceMapBefore: Map<string, string> = await inventoryPage.getMapNamePrice();

      await inventoryPage.sortAndVerifyInventory('az', true, true);

      const nameDescriptionMapAfter: Map<string, string> = await inventoryPage.getMapNameDescription();
      const namePriceMapAfter: Map<string, string> = await inventoryPage.getMapNamePrice();

      expect(nameDescriptionMapBefore).toEqual(nameDescriptionMapAfter);
      expect(namePriceMapBefore).toEqual(namePriceMapAfter);
    });
  });

  test('TC-PRODUCT-11 - expiring cookies should not allow access another page', async ({
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
