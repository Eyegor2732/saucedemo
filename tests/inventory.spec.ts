import { test, expect } from '@pageObjects/pageFixture';
import { parseCurrencyStringToFloat } from '@utils/commonMethods';

test.describe('Saucedemo Inventory', () => {
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
    async ({ loginPage, inventoryPage, page }) => {
      await loginPage.open();
      await expect(loginPage.loginButton).toBeVisible();
      await loginPage.login('standard_user', 'secret_sauce');
      await page.waitForURL('./inventory.html');
      await expect(inventoryPage.inventoryTitle).toBeVisible();
      await expect(inventoryPage.inventoryTitle).toHaveText(
        'Products',
      );
    },
  );

  test('inventory page should not be empty', async ({
    inventoryPage,
  }) => {
    await test.step('Verify inventory items are displayed', async () => {
      const itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });
  });

  test('inventory page sorting Z-A', async ({ inventoryPage }) => {
    let itemCount = 0;

    await test.step('Verify inventory items are displayed', async () => {
      itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    await test.step('Sort inventory items Z-A', async () => {
      await inventoryPage.sortInventoryBy('za');
      await expect(inventoryPage.sortingDropdown).toHaveValue('za');
    });

    await test.step('Verify inventory items are sorted Z-A', async () => {
      for (let i = 0; i < itemCount - 1; i++) {
        const currentName =
          await inventoryPage.inventoryItemNameByIndex(i);
        const nextName = await inventoryPage.inventoryItemNameByIndex(
          i + 1,
        );
        expect(currentName).not.toBeNull();
        expect(nextName).not.toBeNull();
        if (currentName && nextName) {
          expect(currentName.localeCompare(nextName)).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });

  test('inventory page sorting A-Z', async ({ inventoryPage }) => {
    let itemCount = 0;

    await test.step('Verify inventory items are displayed', async () => {
      itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    await test.step('Sort inventory items A-Z', async () => {
      await inventoryPage.sortInventoryBy('az');
      await expect(inventoryPage.sortingDropdown).toHaveValue('az');
    });

    await test.step('Verify inventory items are sorted A-Z', async () => {
      for (let i = 0; i < itemCount - 1; i++) {
        const currentName =
          await inventoryPage.inventoryItemNameByIndex(i);
        const nextName = await inventoryPage.inventoryItemNameByIndex(
          i + 1,
        );
        expect(currentName).not.toBeNull();
        expect(nextName).not.toBeNull();
        if (currentName && nextName) {
          expect(currentName.localeCompare(nextName)).toBeLessThanOrEqual(0);
        }
      }
    });
  });

  test('inventory page sorting Price Low-High', async ({
    inventoryPage,
  }) => {
    let itemCount = 0;

    await test.step('Verify inventory items are displayed', async () => {
      itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    await test.step('Sort inventory items Price Low-High', async () => {
      await inventoryPage.sortInventoryBy('lohi');
      await expect(inventoryPage.sortingDropdown).toHaveValue('lohi');
    });

    await test.step('Verify inventory items are sorted Price Low-High', async () => {
      for (let i = 0; i < itemCount - 1; i++) {
        const currentPrice =
          await inventoryPage.inventoryItemPriceByIndex(i);
        const nextPrice =
          await inventoryPage.inventoryItemPriceByIndex(i + 1);
        expect(currentPrice).not.toBeNull();
        expect(nextPrice).not.toBeNull();
        if (currentPrice !== null && nextPrice !== null) {
          expect(parseCurrencyStringToFloat(currentPrice)).toBeLessThanOrEqual(
            parseCurrencyStringToFloat(nextPrice),
          );
        }
      }
    });
  });

  test('inventory page sorting Price High-Low', async ({
    inventoryPage,
  }) => {
    let itemCount = 0;

    await test.step('Verify inventory items are displayed', async () => {
      itemCount = await inventoryPage.getInventoryItemCount();
      expect(itemCount).toBeGreaterThan(0);
    });

    await test.step('Sort inventory items Price High-Low', async () => {
      await inventoryPage.sortInventoryBy('hilo');
      await expect(inventoryPage.sortingDropdown).toHaveValue('hilo');
    });

    await test.step('Verify inventory items are sorted Price High-Low', async () => {
      for (let i = 0; i < itemCount - 1; i++) {
        const currentPrice =
          await inventoryPage.inventoryItemPriceByIndex(i);
        const nextPrice =
          await inventoryPage.inventoryItemPriceByIndex(i + 1);
        expect(currentPrice).not.toBeNull();
        expect(nextPrice).not.toBeNull();
        if (currentPrice !== null && nextPrice !== null) {
          expect(
            parseCurrencyStringToFloat(currentPrice),
          ).toBeGreaterThanOrEqual(parseCurrencyStringToFloat(nextPrice));
        }
      }
    });
  });

  test('expiring cookies should not allow access another page', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await test.step('Simulate inactivity by expiring the session cookie', async () => {
      const cookies = await page.context().cookies();
      const sessionCookie = cookies.find(cookie => cookie.name === 'session-username');
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
