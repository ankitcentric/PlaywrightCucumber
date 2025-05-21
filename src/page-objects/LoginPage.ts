import { BasePage } from "../page-objects/base/BasePage";

export class LoginPage extends BasePage {
    //type a user name
    public async fillUserName(userName: string): Promise<void> {
        await this.page.locator("#text").fill(userName);
    }

    //type password
    public async fillPassword(password: string): Promise<void> {
        await this.page.locator("#password").fill(password);
    }

    //Click on the login and retrive the text of the po-pup
    public async clickOnLoginAndCaptureDialogText(): Promise<string> {
        let alertText: string = '';
        this.page.on("dialog", async (alert) => {
                alertText = alert.message();
                console.log("Alert message = " + alertText);
                await alert.accept();
            });
        await this.page.locator("#login-button").hover();
        await this.page.locator("#login-button").click({ force: true });
        return alertText;
    }
}