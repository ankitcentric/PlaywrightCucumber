import { BasePage } from "./base/BasePage";

export class HomePage extends BasePage {
    public async clickOnContactUsButton(): Promise<void> {
        await this.waitAndClickByRole("link", "CONTACT US Contact Us Form");
    }

     public async clickOnLoginPortalButton(): Promise<void> {
        await this.waitAndClickByRole("link", "LOGIN PORTAL Login Portal");
    }
} 