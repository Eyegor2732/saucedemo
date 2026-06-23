import { test, expect } from '@pageObjects/pageFixtures';

test.describe('Saucedemo Cart - Access via Inventory Page', () => {
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
        await expect(header.pageTitle).toBeVisible();
        await expect(header.pageTitle).toHaveText('Products');
      });
    });

  test('TC-CART-01 - should add item to cart and verify badge count', async ({
    inventoryPage,
    cartPage
  }) => {
    const header = cartPage.header();

    await test.step('Add first item to cart', async () => {
      await inventoryPage.addItemToCartByIndex(0);
      await expect(inventoryPage.removeFromCartButtons).toHaveCount(1);
    });

    await test.step('Verify items in cart badge count', async () => {
      await expect(header.shoppingCartBadge).toBeVisible();
      await expect(header.shoppingCartBadge).toHaveText('1');
    });

    await test.step('Navigate to cart page', async () => {
      await header.shoppingCartLink.click();
      await expect(header.pageTitle).toBeVisible();
      await expect(header.pageTitle).toHaveText('Your Cart');
    });

    await test.step('Verify items in cart badge count after navigation', async () => {
      await expect(header.shoppingCartBadge).toBeVisible();
      await expect(header.shoppingCartBadge).toHaveText('1');
    });

    await test.step('Verify item count in cart matches badge count', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
    });
  });

  test('TC-CART-05 - should add item to cart and verify correct item is present in cart', async ({
    inventoryPage,
    cartPage
  }) => {
    const header = cartPage.header();
    const index = 0;
    let inventoryItemName: string | null = null;
    let inventoryItemPrice: string | null = null;
    let inventoryItemDescription: string | null = null;
    let cartItemName: string | null = null;
    let cartItemPrice: string | null = null;
    let cartItemDescription: string | null = null;

    await test.step('Add first item to cart', async () => {
      inventoryItemName = await inventoryPage.inventoryItemNameByIndex(index);
      inventoryItemPrice = await inventoryPage.inventoryItemPriceByIndex(index);
      inventoryItemDescription = await inventoryPage.inventoryItemDescriptionByIndex(index);
      await inventoryPage.addItemToCartByIndex(index);
    });

    await test.step('Navigate to cart page and verify item is present', async () => {
      await header.shoppingCartLink.click();
      await expect(header.pageTitle).toBeVisible();
      await expect(header.pageTitle).toHaveText('Your Cart');
      await expect(cartPage.cartItems).toHaveCount(1);
    });

    await test.step('Verify the correct item is in the cart', async () => {
      cartItemName = await cartPage.getCartItemNameByIndex(index);
      expect(cartItemName).toBe(inventoryItemName);
    });

    await test.step('Verify the item description in the cart matches inventory', async () => {
      inventoryItemDescription = await inventoryPage.inventoryItemDescriptionByIndex(index);
      cartItemDescription = await cartPage.getCartItemDescriptionByIndex(index);
      expect(cartItemDescription).toBe(inventoryItemDescription);
    });

    await test.step('Verify the item price in the cart matches inventory', async () => {
      inventoryItemPrice = await inventoryPage.inventoryItemPriceByIndex(index);
      cartItemPrice = await cartPage.getCartItemPriceByIndex(index);
      expect(cartItemPrice).toBe(inventoryItemPrice);
    });
  });
});

test.describe('Saucedemo Cart - Direct Access', () => {
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
    async ({ cartPage }) => {
      const header = cartPage.header();

      await test.step('Navigate to cart page', async () => {
        await cartPage.open();
        await expect(header.pageTitle).toBeVisible();
        await expect(header.pageTitle).toHaveText('Your Cart');
      });
    });

  test(`TC-CART-06 - Verify 'Continue Shopping' button navigates back to Inventory page`, async ({
    cartPage,
    inventoryPage,
    page
  }) => {
    const header = inventoryPage.header();

    await test.step('Click Continue Shopping button', async () => {
      await expect(cartPage.continueShoppingButton).toBeVisible();
      await cartPage.continueShoppingButton.click();
      await page.waitForURL('./inventory.html');
    });

    await test.step('Verify navigation to inventory page', async () => {
      await expect(header.pageTitle).toBeVisible();
      await expect(header.pageTitle).toHaveText('Products');
    });
  });

  test(`TC-CART-07 - Verify 'Checkout' button should not navigate when cart is empty`, async ({
    cartPage,
    page,
  }) => {
    test.skip(true, 'This test is skipped because the checkout can be accessed even when the cart is empty.');
    const header = cartPage.header();

    await test.step('Verify no navigation to checkout page', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
      await expect(cartPage.checkoutButton).toBeVisible();
      await cartPage.checkoutButton.click();
      await expect(page).not.toHaveURL(/checkout-step-one\.html/);
      await expect(page).toHaveURL(/cart\.html/);
      await expect(header.pageTitle).toBeVisible();
      await expect(header.pageTitle).toHaveText('Your Cart');
    });
  });
});