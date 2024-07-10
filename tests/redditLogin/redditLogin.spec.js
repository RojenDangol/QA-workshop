const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/redditLogin.json");
// const contactData = require("../../fixture/contact.json");
const { LoginPage } = require("../../pageObjects/redditLogin.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Valid Login tests", () => {
  test("valid login", async ({ page }) => {
    const login = new LoginPage(page);
    // await page.waitForTimeout(2000);
    await login.login(testData.validUser.username, testData.validUser.password);
    await page.waitForTimeout(3000);
    await login.verifyValidLogin();
  });
});

test.describe("Invalid Login Tests", () => {
  test.only("Invalid login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUserPass.username,
      testData.invalidUserPass.password
    );
    await page.waitForTimeout(2000);
    await login.verifyInvalidLogin();
  });
});
