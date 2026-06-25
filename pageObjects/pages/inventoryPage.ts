import { BasePage } from '@pageObjects/basePage';
import { parseCurrencyStringToFloat } from '@utils/commonMethods';
import { SortOption } from '@data/types/sortOptionTypes';

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
  /**
   * 
   * @param select The sorting option to select (e.g., 'az', 'za', 'lohi', 'hilo')
   * @param byName true for name sorting, false for price sorting
   * @param isAscending true for ascending order, false for descending order
   * @returns Promise that resolves when the sorting has been verified
   * @description This method sorts the inventory items on the page by the specified option and verifies that the sorting is correct.
   * It checks the order of the items based on their names or prices, depending on the parameters provided.
   * If the sorting is incorrect, it throws an error with details about the failure.
   */
  async sortAndVerifyInventory(
    select: SortOption,
    byName: boolean,
    isAscending: boolean
  ): Promise<void> {

    const itemCount = await this.getInventoryItemCount();
    if (itemCount < 2) {
      return;
    }

    await this.sortInventoryBy(select);

    for (let i = 0; i < itemCount - 1; i++) {
      if (byName) { // Name sorting
        const currentName: string = await this.inventoryItemNameByIndex(i) ?? '';
        const nextName: string = await this.inventoryItemNameByIndex(i + 1) ?? '';
        const nameComparison: number = currentName.localeCompare(nextName);

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
        const currentPriceText: string = await this.inventoryItemPriceByIndex(i) ?? '';
        const nextPriceText: string = await this.inventoryItemPriceByIndex(i + 1) ?? '';

        const currentPrice: number = parseCurrencyStringToFloat(currentPriceText);
        const nextPrice: number = parseCurrencyStringToFloat(nextPriceText);

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

  async removeAllItemsFromCart(): Promise<void> {
    for (const button of await this.removeFromCartButtons.all()) {
      await button.click();
    }
  }

  async getMapNameDescription(): Promise<Map<string, string>> {
    const nameDescriptionMap = new Map<string, string>();
    const itemCount = await this.getInventoryItemCount();

    for (let i = 0; i < itemCount; i++) {
      const name = await this.inventoryItemNameByIndex(i);
      const description = await this.inventoryItemDescriptionByIndex(i);
      if (name && description) {
        nameDescriptionMap.set(name, description);
      }
    }

    return nameDescriptionMap;
  }

  async getMapNamePrice(): Promise<Map<string, string>> {
    const namePriceMap = new Map<string, string>();
    const itemCount = await this.getInventoryItemCount();

    for (let i = 0; i < itemCount; i++) {
      const name = await this.inventoryItemNameByIndex(i);
      const price = await this.inventoryItemPriceByIndex(i);
      if (name && price) {
        namePriceMap.set(name, price);
      }
    }

    return namePriceMap;
  }
}
