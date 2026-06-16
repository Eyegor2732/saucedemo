import { BasePage } from '@pageObjects/basePage';

export default class InventoryPage extends BasePage {
  readonly inventoryItems = this.page.locator('.inventory_item');
  readonly shoppingCartBadge = this.page.locator('.shopping_cart_badge');
  readonly inventoryTitle = this.page.locator('.title');
  readonly sortingDropdown = this.page.locator('.product_sort_container');
  readonly shoppingCartLink = this.page.locator('.shopping_cart_link');

  async open() {
    await super.open('./inventory.html');
  }

  async getInventoryItemCount() {
    return await this.inventoryItems.count();
  }

  async getShoppingCartItemCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      return parseInt((await this.shoppingCartBadge.textContent()) || '0', 10);
    }
    return 0;
  }

  async sortInventoryBy(option: string): Promise<void> {
    await this.sortingDropdown.selectOption(option);
  }

  async inventoryItemNameByIndex(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .locator('.inventory_item_name')
      .textContent();
  }

  async inventoryItemPriceByIndex(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .locator('.inventory_item_price')
      .textContent();
  }

  async openShoppingCart() {
    await this.shoppingCartLink.click();
  }
}
