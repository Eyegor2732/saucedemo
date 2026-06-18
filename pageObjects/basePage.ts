import { type Page } from '@playwright/test';
import Header from '@components/header';

export abstract class BasePage {
  constructor(readonly page: Page) { }

  async open(path: string): Promise<void> {
    await this.page.goto(path, {
      waitUntil: 'load',
    });
  }

  header(): Header {
    const header = new Header(this.page.locator("#header_container"));
    return header;
  }
}
