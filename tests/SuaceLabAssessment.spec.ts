import { test, expect } from '@playwright/test';
import { ProductsHomePage } from '../pages/ProductsHomePage';

test('test', async ({ page }) => {

    const productHomePage = new ProductsHomePage(page);
//Navigate to the saucelab demo site
  await page.goto('https://www.saucedemo.com/');

  // Enter username and passord
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  //Click the login button
  await page.locator('[data-test="login-button"]').click();

  //Add three products to the cart
//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//   await page.locator('[data-test="shopping-cart-link"]').click();
    await productHomePage.addProductToCart();

  //Assert cart contains 3 items
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');

  //Assert added products on your cart page
  await expect(page.locator('[data-test="inventory-item-name"]').nth(0)).toContainText('Sauce Labs Backpack')
  await expect(page.locator('[data-test="inventory-item-name"]').nth(1)).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('[data-test="inventory-item-name"]').nth(2)).toContainText('Sauce Labs Bike Light');
  //Click the checkout button
  await page.locator('[data-test="checkout"]').click();

  //Enter checkout details on checkout your information page
  await page.locator('[data-test="firstName"]').fill('sumit');
  await page.locator('[data-test="lastName"]').fill('test');
  await page.locator('[data-test="postalCode"]').fill('45001');

  //Click on continue button
  await page.locator('[data-test="continue"]').click();

  //Click on finish button
  await page.locator('[data-test="finish"]').click();

 // Assert order confirmation page
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  //await page.locator('[data-test="complete-text"]').click();
  //await page.locator('[data-test="complete-text"]').click();
  await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});