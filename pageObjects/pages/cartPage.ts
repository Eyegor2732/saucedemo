import { BasePage } from '@pageObjects/basePage';
import { Locator } from '@pageObjects/pageFixtures';

export default class CartPage extends BasePage {
  readonly cartItems = this.page.getByTestId('inventory-item');
  readonly cartItemNames = this.page.getByTestId('inventory-item-name');
  readonly cartItemPrices = this.page.getByTestId('inventory-item-price');
  readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
  readonly removeButtons = this.page.getByRole('button', { name: 'Remove' });

  async open(): Promise<void> {
    await super.open('./cart.html');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async removeAllItems(): Promise<void> {
    for (const button of await this.removeButtons.all()) {
      await button.click();
    }
  };

  async getCartItems(): Promise<Locator[]> {
    const items = [];
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      items.push(this.cartItems.nth(i));
    }
    return items;
  }

  async getCartItemNameByIndex(index: number): Promise<string | null> {
    return this.cartItemNames.nth(index).innerText();
  }

  async getCartItemPriceByIndex(index: number): Promise<string | null> {
    return this.cartItemPrices.nth(index).innerText();
  }

  async getCartItemDescriptionByIndex(index: number): Promise<string | null> {
    return this.cartItems.nth(index).getByTestId('inventory-item-desc').innerText();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.cartItems.count() === 0;
  }
}