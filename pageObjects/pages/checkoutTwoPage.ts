import { BasePage } from '@pageObjects/basePage';

export default class CheckoutTwoPage extends BasePage {
  readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  readonly cancelButton = this.page.getByRole('button', { name: 'Cancel' });
  readonly itemTotalLabel = this.page.getByTestId('subtotal-label');
  readonly taxLabel = this.page.getByTestId('tax-label');
  readonly totalLabel = this.page.getByTestId('total-label');

  async open(): Promise<void> {
    await super.open('./checkout-step-two.html');
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getItemTotal(): Promise<string> {
    return (await this.itemTotalLabel.textContent())?.trim() || '';
  }

  async getTax(): Promise<string> {
    return (await this.taxLabel.textContent())?.trim() || '';
  }

  async getTotal(): Promise<string> {
    return (await this.totalLabel.textContent())?.trim() || '';
  }
}