import { test as base } from '@playwright/test';
import LoginPage from '@pageObjects/pages/loginPage';
import InventoryPage from '@pageObjects/pages/inventoryPage';

type PageObjects = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';
