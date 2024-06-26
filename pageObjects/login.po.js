const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "Username";
    this.passwordInput = "Password";
    this.loginButton = '//*[@id="submit"]';
  }

  async login(username, password) {
    await this.page.getByLabel(this.usernameInput).fill(username);
    await this.page.getByLabel(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
};
