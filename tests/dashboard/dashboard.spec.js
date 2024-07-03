const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const addData = require("../../fixture/crud.json");
const { LoginPage } = require("../../pageObjects/login.po");
const { DashboardPage } = require("../../pageObjects/dashboard.po");
const { TodayDate } = require("../../utils/helper.spec");

// const { log } = require("console");

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test.describe("Dashboard CRUD", () => {
  test.only("Add item", async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const nowDate = TodayDate;
    console.log(nowDate);
    await login.login(testData.validUser.username, testData.validUser.password);
    await login.verifyValidLogin();

    await dashboard.practiceMessage("Practice");
    // await dashboard.practiceMessage();
    await dashboard.TestException("Test Exceptions");

    await dashboard.CRUD_Operation("Row 2 was added");

    // await dashboard.addItem(addData.additem.food);
  });
});
