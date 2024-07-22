import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userNameTxtBox: Locator;
    readonly passwordTxtBox: Locator;
    readonly loginBtn: Locator;

  
    constructor(page: Page) {
      this.page = page;
      this.userNameTxtBox = page.locator('[data-test="username"]');
      this.passwordTxtBox =  page.locator('[data-test="password"]');
      this.loginBtn = page.locator('[data-test="login-button"]');
    }
  
    async login(userName:string,passord:string) {
      await this.userNameTxtBox.fill(userName);
      await this.passwordTxtBox.fill(passord);
      await this.loginBtn.click();
    }
  }