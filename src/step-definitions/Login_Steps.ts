import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

let alertText: string;

When('I type a username {string}', async (userName: string) => {
    await pageFixture.page.locator("#text").fill(userName);
});

When('I type a password {string}', async (password: string) => {
    await pageFixture.page.locator("#password").fill(password);
    await pageFixture.page.waitForTimeout(2000);
});

When('I click on the login button', async () => {
    pageFixture.page.on("dialog", async (alert) => {
        alertText = alert.message();
        console.log("Alert message = " + alertText);
        await alert.accept();
    });
    await pageFixture.page.locator("#login-button").hover();
    await pageFixture.page.locator("#login-button").click({ force: true });
});

Then('I should be presented with an alert box which contains text {string}', async (message: string) => {
    expect(alertText).toBe(message);

});