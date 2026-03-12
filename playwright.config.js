// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true, 
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});