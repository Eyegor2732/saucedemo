import { BasePage } from '@pageObjects/basePage';

export default class CheckoutCompletePage extends BasePage {
  readonly backHomeButton = this.page.getByRole('button', { name: 'Back Home' });
  readonly completeHeader = this.page.locator('.complete-header');
  readonly completeText = this.page.locator('.complete-text');

  async open() {
    await super.open('./checkout-complete.html');
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
