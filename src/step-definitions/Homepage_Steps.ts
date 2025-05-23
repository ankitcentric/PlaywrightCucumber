import { Given, When } from "@cucumber/cucumber";
import logger from "../logger/logger";
import { CucumberWorld } from "./world/CucumberWorld";


const url: string = "https://www.webdriveruniversity.com/";

Given('I navigate to webdriveruniversity homepage', async function (this: CucumberWorld)  {
    //await pageFixture.page.goto(url);

    await this.homePage.navigate(url);
    this.setUrl(url);
    logger.info('Accessing URL: = '+ url);
    logger.warn('Accessing URL: = '+ url);
    logger.error('Accessing URL: = '+ url);
});
/*
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
*/

When('I click on the contact us button', async function (this: CucumberWorld)  {
    
    this.homePage.clickOnContactUsButton();
});

When('I click on the login portal button', async function (this: CucumberWorld)  {
    // await page.pause();
    this.homePage.clickOnLoginPortalButton();
});