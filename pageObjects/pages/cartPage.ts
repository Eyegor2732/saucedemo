import { BasePage } from '@pageObjects/basePage';

export default class CartPage extends BasePage {
  readonly cartItems = this.page.getByTestId('inventory-item');
  readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
  readonly removeButtons = this.page.getByRole('button', { name: 'Remove' });

  async open() {
    await super.open('./cart.html');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeAllItems() {
    for (let button of await this.removeButtons.all()) {
      await button.click();
    }
  }
}