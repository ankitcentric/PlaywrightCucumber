import { Given, When } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

let browser: Browser; // represent the browser instance opened by playwright
let context: any;  // represent a browser context i.e a separate browser session
let page: Page;  // represent a single web page within the context
const url:string = "https://www.webdriveruniversity.com/";

Given('I navigate to webdriveruniversity homepage', async () => {
    browser = await chromium.launch( { headless: false } );
    context = await browser.newContext({ viewport: { width: 1520, height: 1080 }});
    page = await context.newPage();
    await page.goto(url);
});

When('I click on the contact us button', async () => {
    const contactUsButton = page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    await contactUsButton.click();
});