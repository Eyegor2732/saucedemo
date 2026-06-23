import { BasePage } from '@pageObjects/basePage';

export default class CheckoutCompletePage extends BasePage {
  readonly backHomeButton = this.page.getByRole('button', { name: 'Back Home' });
  readonly completeHeader = this.page.locator('.complete-header');
  readonly completeText = this.page.locator('.complete-text');

  async open(): Promise<void> {
    await super.open('./checkout-complete.html');
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
