const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

// test("has title", async ({ page }) => {
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);
// });

test.describe("Valid Login tests", () => {
  test("valid login", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.validUser.username);
    await page.getByLabel("Password").fill(testData.validUser.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(
      page.locator('//*[@id="loop-container"]/div/article/div[1]/h1')
    ).toHaveText("Logged In Successfully");
  });
});

test.describe("Invalid Login Test", () => {
  test("invalid username invalid password", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.invalidUserPass.username);
    await page.getByLabel("Password").fill(testData.invalidUserPass.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("valid username invalid password", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.invalidPass.username);
    await page.getByLabel("Password").fill(testData.invalidPass.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your password is invalid!"
    );
  });

  test("invalid username valid password", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.invalidUsern.username);
    await page.getByLabel("Password").fill(testData.invalidUsern.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("no username no password", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.noUserPass.username);
    await page.getByLabel("Password").fill(testData.noUserPass.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("no username valid password", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.noUser.username);
    await page.getByLabel("Password").fill(testData.noUser.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your username is invalid!"
    );
  });

  test("valid username no password", async ({ page }) => {
    // await page.goto("https://practicetestautomation.com/practice-test-login/");

    // Click the get started link.
    await page.getByLabel("Username").fill(testData.noPass.username);
    await page.getByLabel("Password").fill(testData.noPass.password);
    // await page.getByRole("button", { name: "btnSignIn" }).click();
    await page.locator('//*[@id="submit"]').click();

    await expect(page.locator('//*[@id="error"]')).toHaveText(
      "Your password is valid!"
    );
  });
});
