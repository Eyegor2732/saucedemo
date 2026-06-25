import type { Locator } from "@playwright/test";

export abstract class BasePageComponents {
  constructor(readonly host: Locator) { }
}