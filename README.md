# Playwright Login Test Automation for Heroku Demo Application

This project contains a small test automation suite created for a QA Lead take-home assessment at Origami Risk.

The tests validate the login functionality of the following application:

https://the-internet.herokuapp.com/login


## Tech Stack

- Playwright
- JavaScript
- Playwright Test Runner


## Project structure

Test cases covering valid and invalid username/password combinations:
```bash
tests/
    login.spec.js 
```

Page object classes to encapsulate interactions on login and secure pages:
```bash
pages/
    loginPage.js
    secureLoggedInPage.js
```

File containing test user data:
```bash
fixtures/
    loginData.js 
```

Playwright configuration file:
```bash
playwright.config.js 
```

Dependencies and script aliases:
```bash
package.json
```


## Test cases

Positive Tests:

1. Successful login with valid credentials
- Navigate to login page
- Enter valid username and password
- Verify redirect to secure page
- Verify success message is displayed
- Verify that the logout link is visible

2. Logout functionality
- Verify a logged in user can logout successfully

Negative Tests:

1. Login with invalid username
- Verify error message
- Verify user remains on login page
- Verify user sees appropriate error message

2. Login with invalid password
- Verify error message
- Verify user remains on login page
- Verify user sees appropriate error message

3. Additional negative tests
- Verify proper error handling by the login page on empty username
- Verify proper error handling by the login page on empty password


## Setup Instructions

1. Clone repository
    ```bash
    git clone https://github.com/apahilaj/QA-Lead-Assessment.git
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Install Playwright browsers
    ```bash
    npx playwright install
    ```


## Running Tests

Run all tests in silent headless mode
```bash
npm run test
```

Run all tests in interactive headed mode
```bash
npm run test:headed
```

Open HTML report, after running the tests
```bash
npm run report
```


## Possible future improvements and notes

Some improvements that could be implemented for a larger automation framework include:

- Integration with CI/CD systems like GitHub actions, Jenkins, etc.
- Parallel cross-browser testing to simulate various browsers and viewports
- Environment configuration to read sensitive information (like passwords/bearer tokens) from CI CD secrets/variables
- Test retries for better reliability and tagging for test categorization
- Additional negative test cases like:
    - Special characters in username field
    - Supplying more than allowed characters in username/password fields
    - Multiple login attempts to simulate user lockout (if the app has this functionality)
    - Case sensitivity of username/password field values
- Data driven testing for additional edge case and negative scenarios
- Automatic failure notifications from the tests into messaging systems such as Slack, etc.
- Integrate the tests metrics with observability tools like Datadog for better tests visibility and flaky tests management policies


Notes:
- I've added two page object classes (loginPage and secureLoggedInPage) since each unique page should be mapped to a separate class file, for scalability and maintenance.
- These tests are intentionally kept simple to keep the example easy to understand.
- By default, I've configured to run all the tests in parallel.  If you want to run them serially, remove the line: 'fullyParallel: true' from the playwright.config.js file.
- .gitignore file has been added to exclude the node modules, Playwright reports and test results from getting committed to the repository.