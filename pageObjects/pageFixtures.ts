import { test as base } from '@playwright/test';
import CartPage from '@pages/cartPage';
import CheckoutCompletePage from '@pages/checkoutCompletePage';
import CheckoutOnePage from '@pages/checkoutOnePage';
import CheckoutTwoPage from '@pages/checkoutTwoPage';
import InventoryPage from '@pages/inventoryPage';
import LoginPage from '@pages/loginPage';
import MenuModal from '@modals/menuModal';

type PageObjects = {
  cartPage: CartPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutOnePage: CheckoutOnePage;
  checkoutTwoPage: CheckoutTwoPage;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  menuModal: MenuModal;
};

export const test = base.extend<PageObjects>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  checkoutOnePage: async ({ page }, use) => {
    await use(new CheckoutOnePage(page));
  },
  checkoutTwoPage: async ({ page }, use) => {
    await use(new CheckoutTwoPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  menuModal: async ({ page }, use) => {
    await use(new MenuModal(page));
  },
});

export {
  expect,
  type Locator,
  type Page,
  type Cookie
} from '@playwright/test';
