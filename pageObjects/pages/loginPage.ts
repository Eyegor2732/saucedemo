import { BasePage } from '@pageObjects/basePage';

export default class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByPlaceholder('Username');
  readonly passwordInput = this.page.getByPlaceholder('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = this.page.getByTestId('error');

  async open(): Promise<void> {
    await super.open('./');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
