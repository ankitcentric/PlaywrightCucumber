import { BasePage } from "../page-objects/base/BasePage";
import logger from "../logger/logger";

export class ContactUsPage extends BasePage {

    //type a first name
    public async fillFirstName(firstName: string): Promise<void> {
        await this.page.locator("input[placeholder='First Name']").fill(firstName);
    }

    //type a last name
    public async fillLastName(lastName: string): Promise<void> {
        await this.page.locator("input[placeholder='Last Name']").fill(lastName);
    }

    //type an email address
    public async fillEmail(emailAddress: string): Promise<void> {
        await this.page.locator("input[placeholder='Email Address']").fill(emailAddress);
    }

    //type a comment
    public async fillComment(comment: string): Promise<void> {
        await this.page.locator("textarea[placeholder='Comments']").fill(comment);
    }

    //click on submit button
    public async clickOnSubmit(): Promise<void> {
        await this.page.waitForSelector("input[value='SUBMIT']");
        await this.page.click("input[value='SUBMIT']");
    }


    //get successful message
    public async getSuccessfulMessage(): Promise<string> {
        await this.page.waitForSelector("div[id='contact_reply'] h1", { timeout: 60000 });
        return await this.page.innerText("div[id='contact_reply'] h1");
    }

    //get error page
    public async getErrorMessage(): Promise<string> {
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector("body");
        const bodyElement = this.page.locator("body");
        const bodyText = await bodyElement.textContent();
        logger.info(bodyText);
        return bodyText ?? '';  //if it is null then return an empty string
    }

    //get header text
    public async getHeaderText(message: string): Promise<string> {
        await this.page.waitForTimeout(1000);
        //await this.page.waitForFunction(() => document.title === 'Contact form handler');
        // wait for the target element
        await this.page.waitForSelector("//h1 | //body", { state: 'visible' });

        // get all elements
        const elements = await this.page.locator("//h1 | //body").elementHandles();
        let foundElementText = '';
        for (let element of elements) {
            let text = await element.innerText();
            if (text.includes(message)) {
                foundElementText = text;
                break;
            }
        }
        return foundElementText;
    }


}