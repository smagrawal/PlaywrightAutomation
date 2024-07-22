import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameTxtBox: Locator;
    readonly lastNameTxtBox: Locator;
    readonly postalCodeTxtBox: Locator;
    readonly continueBtn : Locator

    constructor(page: Page) {
      this.page = page;
      this.firstNameTxtBox = page.locator('[data-test="firstName"]');
      this.lastNameTxtBox =  page.locator('[data-test="lastName"]');
      this.postalCodeTxtBox = page.locator('[data-test="postalCode"]');
      this.continueBtn = page.locator('[data-test="continue"]');
    }
  
    async doCheckout() {
        await this.firstNameTxtBox.fill('sumit');
        await this.lastNameTxtBox.fill('test');
        await this.postalCodeTxtBox.fill('45001');

        //Click on continue button
        await this.continueBtn.click();
    }
  }