import { BasePage } from '@pageObjects/basePage';
import { parseCurrencyStringToFloat } from '@utils/commonMethods';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export default class InventoryPage extends BasePage {
  readonly inventoryItems = this.page.getByTestId('inventory-item');
  readonly addToCartButtons = this.page.getByRole('button', { name: 'Add to cart' });
  readonly removeFromCartButtons = this.page.getByRole('button', { name: 'Remove' });

  async open(): Promise<void> {
    await super.open('./inventory.html');
  }

  async getInventoryItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getShoppingCartItemCount(): Promise<number> {
    if (await this.header().shoppingCartBadge.isVisible()) {
      return parseInt((await this.header().shoppingCartBadge.innerText()) || '0');
    }
    return 0;
  }

  async sortInventoryBy(option: SortOption): Promise<void> {
    await this.header().sortingDropdown.selectOption(option);
  }

  async sortAndVerifyInventory(
    select: SortOption,
    byName: boolean,
  ): Promise<void> {

    const itemCount = await this.getInventoryItemCount();
    if (itemCount < 2) {
      return;
    }

    await this.sortInventoryBy(select);

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

  async sortInventory(
    select: SortOption,
    byName: boolean,
  ): Promise<string> {

    const itemCount = await this.getInventoryItemCount();
    if (itemCount < 2) return "Success";

    await this.sortInventoryBy(select);

    const isAscending = select === 'az' || select === 'lohi';

    for (let i = 0; i < itemCount - 1; i++) {
      if (byName) { // Name sorting
        const currentName = await this.inventoryItemNameByIndex(i);
        const nextName = await this.inventoryItemNameByIndex(i + 1);

        if (currentName === null || nextName === null) {
          return `Inventory item name is null.`;
        }

        const nameComparison = currentName.localeCompare(nextName);
        if (isAscending && nameComparison > 0) {
          return `"${currentName}" should be before "${nextName}".`;
        }

        if (!isAscending && nameComparison < 0) {
          return `"${currentName}" should be after "${nextName}".`;
        }
      } else { // Price sorting
        const currentPriceText = await this.inventoryItemPriceByIndex(i);
        const nextPriceText = await this.inventoryItemPriceByIndex(i + 1);

        if (currentPriceText === null || nextPriceText === null) {
          return `Inventory item price is null.`;
        }

        const currentPrice = parseCurrencyStringToFloat(currentPriceText);
        const nextPrice = parseCurrencyStringToFloat(nextPriceText);

        if (isAscending && currentPrice > nextPrice) {
          return `${currentPriceText} should be <= ${nextPriceText}.`;
        }

        if (!isAscending && currentPrice < nextPrice) {
          return `${currentPriceText} should be >= ${nextPriceText}.`;
        }
      }
    }

    return "Success";
  }

  async inventoryItemNameByIndex(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .getByTestId('inventory-item-name')
      .innerText();
  }

  async inventoryItemPriceByIndex(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .getByTestId('inventory-item-price')
      .innerText();
  }

  async inventoryItemDescriptionByIndex(index: number): Promise<string | null> {
    return await this.inventoryItems
      .nth(index)
      .getByTestId('inventory-item-desc')
      .innerText();
  }

  async openShoppingCart(): Promise<void> {
    await this.header().shoppingCartLink.click();
  }

  async addItemToCartByIndex(index: number): Promise<void> {
    const addToCartButton = this.addToCartButtons.nth(index);
    await addToCartButton.click();
  }
}
