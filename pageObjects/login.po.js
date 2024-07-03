const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "Username";

    this.passwordInput = "Password";
    this.loginButton = '//*[@id="submit"]';
    this.validLoginValidation =
      '//*[@id="loop-container"]/div/article/div[1]/h1';
    this.errorMessage = '//*[@id="error"]';
    // this.successMessage = "";
  }

  async login(username, password) {
    await this.page.getByLabel(this.usernameInput).fill(username);
    await this.page.getByLabel(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "Logged In Successfully"
    );
  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};
