import { BasePage } from '@pageObjects/basePage';
import { parseCurrencyStringToFloat } from '@utils/commonMethods';

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

  async sortAndVerifyInventory(
    select: string,
    byName: boolean,
  ): Promise<void> {
    const isNameSort = select === 'az' || select === 'za';
    const isPriceSort = select === 'lohi' || select === 'hilo';

    if (byName && !isNameSort) {
      throw new Error(`Sort option "${select}" is not valid for name sorting.`);
    }

    if (!byName && !isPriceSort) {
      throw new Error(`Sort option "${select}" is not valid for price sorting.`);
    }

    await this.sortInventoryBy(select);

    const selectedValue = await this.sortingDropdown.inputValue();
    if (selectedValue !== select) {
      throw new Error(
        `Expected sorting dropdown value "${select}", but got "${selectedValue}".`,
      );
    }

    const itemCount = await this.getInventoryItemCount();
    if (itemCount < 2) {
      return;
    }

    const isAscending = select === 'az' || select === 'lohi';

    for (let i = 0; i < itemCount - 1; i++) {
      if (byName) { // Name sorting
        const currentName = await this.inventoryItemNameByIndex(i);
        const nextName = await this.inventoryItemNameByIndex(i + 1);

        if (currentName === null || nextName === null) {
          throw new Error(`Inventory item name is null at index ${i}.`);
        }

        const nameComparison = currentName.localeCompare(nextName);
        if (isAscending && nameComparison > 0) {
          throw new Error(
            `Name sorting validation failed at index ${i}: "${currentName}" should be before "${nextName}".`,
          );
        }

        if (!isAscending && nameComparison < 0) {
          throw new Error(
            `Name sorting validation failed at index ${i}: "${currentName}" should be after "${nextName}".`,
          );
        }
      } else { // Price sorting
        const currentPriceText = await this.inventoryItemPriceByIndex(i);
        const nextPriceText = await this.inventoryItemPriceByIndex(i + 1);

        if (currentPriceText === null || nextPriceText === null) {
          throw new Error(`Inventory item price is null at index ${i}.`);
        }

        const currentPrice = parseCurrencyStringToFloat(currentPriceText);
        const nextPrice = parseCurrencyStringToFloat(nextPriceText);

        if (isAscending && currentPrice > nextPrice) {
          throw new Error(
            `Price sorting validation failed at index ${i}: ${currentPriceText} should be <= ${nextPriceText}.`,
          );
        }

        if (!isAscending && currentPrice < nextPrice) {
          throw new Error(
            `Price sorting validation failed at index ${i}: ${currentPriceText} should be >= ${nextPriceText}.`,
          );
        }
      }
    }
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
