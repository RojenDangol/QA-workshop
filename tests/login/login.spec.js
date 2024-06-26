const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const { LoginPage } = require("../../pageObjects/login.po");

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

// test("has title", async ({ page }) => {
//   await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);
// });

test.describe("Valid Login tests", () => {
  test("valid login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.username, testData.validUser.password);

    await expect(
      page.locator('//*[@id="loop-container"]/div/article/div[1]/h1')
    ).toHaveText("Logged In Successfully");
  });
});

test.describe("Invalid Login Test", () => {
  test("invalid username invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUserPass.username,
      testData.invalidUserPass.password
    );

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("valid username invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidPass.username,
      testData.invalidPass.password
    );

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your password is invalid!"
    );
  });

  test("invalid username valid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUsern.username,
      testData.invalidUsern.password
    );

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("no username no password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.noUserPass.username,
      testData.noUserPass.password
    );

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("no username valid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.noUser.username, testData.noUser.password);

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("valid username no password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.noPass.username, testData.noPass.password);

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your password is invalid!"
    );
  });
});
