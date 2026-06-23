import { type Page } from '@playwright/test';
import Header from '@components/header';
import Footer from '@components/footer';

export abstract class BasePage {
  constructor(readonly page: Page) { }

  async open(path: string): Promise<void> {
    await this.page.goto(path, {
      waitUntil: 'load',
    });
  }

  footer(): Footer {
    const footer = new Footer(this.page.getByTestId("footer"));
    return footer;
  }

  header(): Header {
    const header = new Header(this.page.getByTestId("header-container"));
    return header;
  }
}
