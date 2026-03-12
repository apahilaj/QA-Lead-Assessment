//Page object class representing the secure logged in page

class SecureLoggedInPage {

  constructor(page) {
    // Initialize the secure logged in page and locators
    this.page = page;
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    const successfulHeading = 'Welcome to the Secure Area. When you are done click logout below.';
    this.successfulHeadingSection = page.getByRole('heading', {name:successfulHeading});
    this.flashMessage = page.locator('#flash');
    this.logOutLink = page.getByRole('link', {name:' Logout'});
  }

  // Return text content of the flash element on the page
  async getFlashMessage() {
    const text = await this.flashMessage.textContent();
    return text.trim();
  }

  // Logout from the application
  async logOut() {
    await this.logoutButton.click();
  }
}

module.exports = SecureLoggedInPage;