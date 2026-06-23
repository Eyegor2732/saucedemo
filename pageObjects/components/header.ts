import { BasePageComponents } from "@pageObjects/base.pageComponents";

export default class Header extends BasePageComponents {
  readonly headerTitle = this.host.getByTestId('header-label');
  readonly shoppingCartLink = this.host.getByTestId('shopping-cart-link');
  readonly shoppingCartBadge = this.shoppingCartLink.getByTestId('shopping-cart-badge');
  readonly menuButton = this.host.getByRole('button', { name: 'Open Menu' });
  readonly pageTitle = this.host.getByTestId('title');
  // for inventory page only, but keeping it here for simplicity
  readonly sortingDropdown = this.host.getByTestId('product-sort-container');
}