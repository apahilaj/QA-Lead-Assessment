//Page object class representing the login page

class LoginPage {

  constructor(page) {
    // Initialize the login page and locators
    this.page = page;
    const successfulHeading = 'Welcome to the Secure Area. When you are done click logout below.';
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator('#flash');
    this.successfulHeadingSection = page.getByRole('heading', {name:successfulHeading});
  }

  // Navigate to the login page
  async navigate() {
    await this.page.goto('/login');
  }

  // Login to the page with username and password parameters
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Return text content of the flash element on the page
   async getFlashMessage() {
     return await this.flashMessage.textContent().trim();
  }

  // Return text of succesful heading area on the page
  async getSuccessfulHeadingMessage(){
    return await this.successfulHeadingSection.textContent().trim();
  }
}

module.exports = LoginPage;