import { BasePage } from '@pageObjects/basePage';

export default class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('#user-name');
  readonly passwordInput = this.page.locator('#password');
  readonly loginButton = this.page.locator('#login-button');
  readonly errorMessage = this.page.locator('[data-test="error"]');

  async open() {
    await super.open('./');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
