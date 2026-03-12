const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const SecureLoggedInPage = require('../pages/secureLoggedInPage');
const testData = require('../fixtures/loginData');

test.describe('Login Tests', () => {

  // Page object instances used across tests
  let loginPage, secureLoggedInPage;

  // Expected UI messages for validation
  const expectedMessages = {
    invalidUser: 'Your username is invalid!',
    invalidPassword: 'Your password is invalid!',
    success: 'You logged into a secure area!'
  };

  // Runs before every test: initialize page objects and navigate to login page
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    secureLoggedInPage = new SecureLoggedInPage(page);
    await loginPage.navigate();
  });

  test('User can login successfully with valid credentials', async ({ page }) => {

    // Act: attempt login using valid credentials
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    // Assert: user should land on secure page with expected elements visible
    await expect(page).toHaveURL(/secure/); 
    await expect(secureLoggedInPage.successfulHeadingSection).toBeVisible();
    await expect(secureLoggedInPage.logOutLink).toBeVisible();

    // Verify success flash message
    const flashMessage = await secureLoggedInPage.getFlashMessage();
    expect(flashMessage).toContain(expectedMessages.success);
  });

  test('Login fails with invalid username', async ({ page }) => {

    // Act: login with invalid username
    await loginPage.login(
      testData.invalidUser.username,
      testData.invalidUser.password
    );

    // Assert: error message shown and user remains on login page
    const flashMessage = await secureLoggedInPage.getFlashMessage();
    expect(flashMessage).toContain(expectedMessages.invalidUser);
    await expect(page).toHaveURL(/login/);
  });

  test('Login fails with invalid password', async ({ page }) => {

    // Act: login with incorrect password
    await loginPage.login(
      testData.invalidPassword.username,
      testData.invalidPassword.password
    );

    // Assert: password error message displayed
    const flashMessage = await secureLoggedInPage.getFlashMessage();
    expect(flashMessage).toContain(expectedMessages.invalidPassword);
    await expect(page).toHaveURL(/login/);
  });

  test('Login fails with empty username', async ({ page }) => {

    // Act: submit form without username
    await loginPage.login(
      '',
      testData.validUser.password
    );

    // Assert: username validation message appears
    const flashMessage = await secureLoggedInPage.getFlashMessage();
    expect(flashMessage).toContain(expectedMessages.invalidUser);
    await expect(page).toHaveURL(/login/);
  });

  test('Login fails with empty password', async ({ page }) => {

    // Act: submit form without password
    await loginPage.login(
      testData.validUser.username,
      ''
    );

    // Assert: password validation message appears
    const flashMessage = await secureLoggedInPage.getFlashMessage();
    expect(flashMessage).toContain(expectedMessages.invalidPassword);
    await expect(page).toHaveURL(/login/);
  });

  test('User can logout successfully', async ({ page }) => {

    // Act: login with valid credentials
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    // Assert: user reaches secure page then logs out
    await expect(page).toHaveURL(/secure/);
    await expect(secureLoggedInPage.logOutLink).toBeVisible();

    await secureLoggedInPage.logOut();

    // User should be redirected back to login page
    await expect(page).toHaveURL(/login/);
  });

});