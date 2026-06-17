import { BasePageComponents } from "@pageObjects/base.pageComponents";

export default class Header extends BasePageComponents {
  readonly headerTitle = this.host.locator('.header_label');
  readonly shoppingCartLink = this.host.locator('.shopping_cart_link');
  readonly shoppingCartBadge = this.shoppingCartLink.locator('.shopping_cart_badge');
  readonly menuButton = this.host.getByRole('button', { name: 'Open Menu' });
  readonly pageTitle = this.host.locator('.title');
}