const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;

    this.practiceLink = '//*[@id="menu-item-20"]/a';
    this.practiceMsg = '//*[@id="loop-container"]/div/article/div[1]/h1';

    this.testExceptionLink =
      '//*[@id="loop-container"]/div/article/div[2]/div[2]/div[1]/p/a';
    this.testExcMsg = '//*[@id="food_list"]/h2';
    this.addBtn = "#add_btn";
    this.addBtnMsg = '//*[@id="confirmation"]';
    this.inputMsg = '//*[@id="row2"]/input';
    this.saveBtn = "#save_btn";
  }

  async practiceMessage(practice) {
    await this.page.locator(this.practiceLink).click();
    await expect(this.page.locator(this.practiceMsg)).toHaveText(practice);
  }

  async TestException(test) {
    await this.page.locator(this.testExceptionLink).click();
    await expect(this.page.locator(this.testExcMsg)).toHaveText(test);
  }

  async CRUD_Operation(added) {
    await this.page.locator(this.addBtn).click();
    await expect(this.page.locator(this.addBtnMsg)).toHaveText(added);
  }

  async addItem(item) {
    await this.page.locator(this.inputMsg).fill(food);
    await this.page.locator(this.saveBtn).click();
  }
};
