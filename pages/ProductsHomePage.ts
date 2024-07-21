import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsHomePage {
  readonly page: Page;
  readonly product1Link: Locator;
  readonly product2Link: Locator;
  readonly product3Link: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.product1Link = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.product2Link = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.product3Link = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProductToCart() {
    await this.product1Link.first().click();
    await this.product2Link.first().click();
    await this.product3Link.first().click();
    await this.cartLink.first().click();
  }
}