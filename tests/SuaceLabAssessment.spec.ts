import { test, expect } from '@playwright/test';
import { ProductsHomePage } from '../pages/ProductsHomePage';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import data from '../testData.json'


test('test', async ({ page }) => {

  const productHomePage = new ProductsHomePage(page);
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  //Navigate to the saucelab demo site
  await page.goto(data.url);

  //Login to the demo site 
  loginPage.login(data.userName, data.password);

  //Add three products to the cart
  await productHomePage.addProductToCart();

  //Assert cart contains 3 items
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');

  //Assert cart page title
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

  //Assert added products on your cart page
  await expect(page.locator('[data-test="inventory-item-name"]').nth(0)).toContainText('Sauce Labs Backpack')
  await expect(page.locator('[data-test="inventory-item-price"]').nth(0)).toHaveText('$29.99')
  await expect(page.locator('[data-test="inventory-item-name"]').nth(1)).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('[data-test="inventory-item-price"]').nth(1)).toHaveText('$15.99')
  await expect(page.locator('[data-test="inventory-item-name"]').nth(2)).toContainText('Sauce Labs Bike Light');
  await expect(page.locator('[data-test="inventory-item-price"]').nth(2)).toHaveText('$9.99')

  //Assert continue shopping button is displayed
  await expect(page.locator('#continue-shopping')).toBeVisible();

  //Click the checkout button
  await page.locator('[data-test="checkout"]').click();

  //Assert checkout page title
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

  //Enter checkout details on checkout your information page
  checkoutPage.doCheckout();

  //Assert checkout page title
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

  //Assert cart items on checkout overview page
  await expect(page.locator('[data-test="inventory-item-name"]').nth(0)).toContainText('Sauce Labs Backpack')
  await expect(page.locator('[data-test="inventory-item-price"]').nth(0)).toHaveText('$29.99')
  await expect(page.locator('[data-test="inventory-item-name"]').nth(1)).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('[data-test="inventory-item-price"]').nth(1)).toHaveText('$15.99')
  await expect(page.locator('[data-test="inventory-item-name"]').nth(2)).toContainText('Sauce Labs Bike Light');
  await expect(page.locator('[data-test="inventory-item-price"]').nth(2)).toHaveText('$9.99')

  //Assert payment and shipping detail
  await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
  await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toContainText("$60.45");


  //Click on finish button
  await page.locator('[data-test="finish"]').click();

  // Assert order confirmation page
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});