const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const contactData = require("../../fixture/contact.json");
const { LoginPage } = require("../../pageObjects/contactLogin.po");
const {
  createEntity,
  authenticateUser1,
} = require("../../utils/helper.spec.js");

let interceptId;

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  const login = new LoginPage(page);
  await login.login(testData.validUser.username, testData.validUser.password);
  await login.verifyValidLogin();
});

// test.describe("Valid Login tests", () => {
//   test("valid login", async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login(testData.validUser.username, testData.validUser.password);

//     await login.verifyValidLogin();
//   });
// });

// test.describe("Invalid Login Test", () => {
//   test("invalid username invalid password", async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login(
//       testData.invalidUserPass.username,
//       testData.invalidUserPass.password
//     );

//     await login.invalidLogin("Incorrect username or password");
//   });
// });
test.describe("Crud Operation", () => {
  test("Add contact", async ({ page }) => {
    const login = new LoginPage(page);
    await login.addNewContact(
      contactData.name.fname,
      contactData.name.lname,
      contactData.bday.bday,
      contactData.email.email,
      contactData.phone.phone,
      contactData.Street1.street1,
      contactData.Street2.street2,
      contactData.City.city,
      contactData.State.state,
      contactData.Postal.postalCode,
      contactData.Country.country
    );
  });

  test("Edit contact", async ({ page }) => {
    await page.waitForTimeout(3000);
    const login = new LoginPage(page);
    await login.editContacts(
      contactData.updateName.ufname,
      contactData.updateName.ulname
    );
  });

  test.only("Edit contact test", async ({ context, page, request }) => {
    // await page.waitForTimeout(3000);
    const login = new LoginPage(page);
    const Data = { firstName: "hello", lastName: "world" };
    const accessToken = await authenticateUser1({ request });
    const entityId = await createEntity(Data, accessToken, "contacts", {
      request,
    });
    await intercept(
      "https://thinking-tester-contact-list.herokuapp.com/contacts/**",
      { context, page }
    );
    page.reload();
    page.waitForTimeout(3000);
    // await contact.contactEdit();
    // await page.waitForTimeout(5000);
    await login.editContacts(
      contactData.updateName.ufname,
      contactData.updateName.ulname
    );
    //await page.waitForTimeout(3000);
    // await deleteEntity(accessToken, "/contacts/$(interceptId)", { request });
    // await validateEntity(accessToken, "/contacts/$(interceptId)", "404", {
    //   request,
    // });
  });

  test("Delete contact", async ({ page }) => {
    const login = new LoginPage(page);
    await login.deleteContact();
  });
});

async function intercept(module, { context, page }) {
  await context.route(module, async (route) => {
    await route.continue();
    const response = await page.waitForResponse(module);
    page.waitForTimeout(3000);
    const responseBody = await response.json();
    interceptId = responseBody._id;
  });
}
