import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

When('I type a first name', async () => {
    await pageFixture.page.locator("input[placeholder='First Name']").fill("Ankit");
});

When('I type a last name', async () => {
    await pageFixture.page.locator("input[placeholder='Last Name']").fill("Sharma");
});

When('I type an email address', async () => {
    await pageFixture.page.locator("input[placeholder='Email Address']").fill("ankitsharma@gmail.com");
});

When('I type a comment', async () => {
    await pageFixture.page.locator("textarea[placeholder='Comments']").fill("Demo Text");
});

When('I click on the submit button', async () => {
    await pageFixture.page.waitForSelector("input[value='SUBMIT']");
    await pageFixture.page.click("input[value='SUBMIT']");
});

Then('I should be presented with a successful contact us submission message', async () => {
    await pageFixture.page.waitForSelector("div[id='contact_reply'] h1", { timeout: 60000 });
    const text = await pageFixture.page.innerText("div[id='contact_reply'] h1");
    expect(text).toBe("Thank You for your Message!");
});

Then('I should be presented with a unsuccessful contact us message', async () => {
    await pageFixture.page.waitForSelector("body");
    const bodyElement = pageFixture.page.locator("body");
    const bodyText = await bodyElement.textContent();
    expect(bodyText).toMatch(/Error: (all fields are required|Invalid email address)/);
});

When('I type a specific first name {string}', async (firstName: string) => {
    await pageFixture.page.locator("input[placeholder='First Name']").fill(firstName);
});

When('I type a specific last name {string}', async (lastName: string) => {
    await pageFixture.page.locator("input[placeholder='Last Name']").fill(lastName);
});

When('I type an specific email address {string}', async (email: string) => {
    await pageFixture.page.locator("input[placeholder='Email Address']").fill(email);
});

When('I type a specific comment {string} and a number {int} withing the comment input field', async (word: string, number: number) => {
    await pageFixture.page.locator("textarea[placeholder='Comments']").fill(word + " " + number);
});

When('I type a random first name', async () => {
    const randomFirstName = faker.person.firstName();
    await pageFixture.page.locator("input[placeholder='First Name']").fill(randomFirstName);
});

When('I type a random last name', async () => {
    const randomLastName = faker.person.lastName();
    await pageFixture.page.locator("input[placeholder='Last Name']").fill(randomLastName);
});

When('I type an random email address', async () => {
    const randomEmail = faker.internet.email();
    await pageFixture.page.locator("input[placeholder='Email Address']").fill(randomEmail);
});

// Scenario Outline

When('I type a first name {string} and a last name {string}', async (firstName: string, lastName: string) => {
    await pageFixture.page.locator("input[placeholder='First Name']").fill(firstName);
    await pageFixture.page.locator("input[placeholder='Last Name']").fill(lastName);
});

When('I type a email address {string} and a comment {string}', async (email: string, comment: string) => {
    await pageFixture.page.locator("input[placeholder='Email Address']").fill(email);
    await pageFixture.page.locator("textarea[placeholder='Comments']").fill(comment);
});

Then('I should be presented with header text {string}', async (message: string) => {
    // wait for the target element
    await pageFixture.page.waitForSelector("//h1 | //body", { state: 'visible'});

    // get all elements
    const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();
    let foundElementText = '';
    for(let element of elements){
        let text = await element.innerText();
        if(text.includes(message)){
            foundElementText = text;
            break;
        }
    }
    expect(foundElementText).toContain(message);
});