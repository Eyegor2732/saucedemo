import { BasePage } from '@pageObjects/basePage';
import { Locator } from '@playwright/test';

export default class MenuModal extends BasePage {
  readonly menuModal: Locator = this.page.getByRole('navigation');
  readonly logoutLink: Locator = this.menuModal.getByRole('link', { name: 'Logout' });
  readonly closeMenuButton: Locator = this.page.getByRole('button', { name: 'Close Menu' });
  readonly allItemsLink: Locator = this.menuModal.getByRole('link', { name: 'All Items' });
  readonly aboutLink: Locator = this.menuModal.getByRole('link', { name: 'About' });
  readonly resetAppStateLink: Locator = this.menuModal.getByRole('link', { name: 'Reset App State' });
}
