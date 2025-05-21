import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { CucumberWorld } from "./world/CucumberWorld";

let alertText: string;

When('I type a username {string}', async function (this: CucumberWorld, userName: string) {
    await this.loginPage.fillUserName(userName);
});

When('I type a password {string}', async function (this: CucumberWorld, password: string) {
    await this.loginPage.fillPassword(password);
});

When('I click on the login button', async function (this: CucumberWorld) {
    alertText = await this.loginPage.clickOnLoginAndCaptureDialogText();
});

Then('I should be presented with an alert box which contains text {string}', async (message: string) => {
    expect(alertText).toBe(message);

});