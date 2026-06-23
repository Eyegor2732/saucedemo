import { BasePage } from '@pageObjects/basePage';

export default class CheckoutOnePage extends BasePage {
  readonly firstNameInput = this.page.getByPlaceholder('First Name');
  readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly cancelButton = this.page.getByRole('button', { name: 'Cancel' });
  readonly errorMessageContainer = this.page.getByTestId('error');

  async open(): Promise<void> {
    await super.open('./checkout-step-one.html');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string> {
    if (await this.errorMessageContainer.isVisible()) {
      return (await this.errorMessageContainer.textContent())?.trim() || '';
    }
    return '';
  }
}