import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";


const url: string = "https://www.webdriveruniversity.com/";

Given('I navigate to webdriveruniversity homepage', async () => {
    await pageFixture.page.goto(url);
});

When('I click on the contact us button', async () => {
    // await page.pause();
    const contactUsButton = pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    await contactUsButton.click();
});

When('I click on the login portal button', async () => {
    // await page.pause();
    const loginButton = pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL Login Portal' });
    await loginButton.click();
});