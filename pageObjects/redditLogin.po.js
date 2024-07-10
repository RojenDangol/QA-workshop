const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginBtn = '//*[@id="login-button"]/span/span';
    this.usernameInput = '//*[@id="login-username"]';
    this.passwordInput = '//*[@id="login-password"]';
    this.validLoginValidation = '//*[@id="create-post"]/span/span[2]';
    this.invalidLogin = '//*[@id="helper-text"]';
  }

  async login(username, password) {
    await this.page.locator(this.loginBtn).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    // await this.page.locator(this.loginButton).click();
    await this.page.locator(this.passwordInput).press("Enter");
  }
  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "Create"
    );
  }
  async verifyInvalidLogin() {
    const errorMessage = await this.page.evaluate(() => {
      const getShadowRoot = (selector, root = document) => {
        const element = root.querySelector(selector);
        return element ? element.shadowRoot : null;
      };

      try {
        const shadowRoot1 = getShadowRoot("sn-test-layouts");
        if (!shadowRoot1) throw new Error("shadowRoot1 not found");

        const shadowRoot2 = getShadowRoot("sn-test-main", shadowRoot1);
        if (!shadowRoot2) throw new Error("shadowRoot2 not found");

        const shadowRoot3 = getShadowRoot("sn-test-contents", shadowRoot2);
        if (!shadowRoot3) throw new Error("shadowRoot3 not found");

        const shadowElement = getShadowRoot("testroot1", shadowRoot3);
        if (!shadowElement) throw new Error("shadowElement not found");

        const finalElement = shadowElement.querySelector("testroot2");
        if (!finalElement) throw new Error("finalElement not found");

        const errorElement = finalElement.querySelector("span#helper-text");
        if (!errorElement) throw new Error("errorElement not found");

        return errorElement.textContent.trim();
      } catch (error) {
        console.error(error.message);
        return null;
      }
    });

    if (errorMessage === null) {
      throw new Error("Unable to find the error message element.");
    }

    expect(errorMessage).toContain("Invalid username or password.");
  }
};
