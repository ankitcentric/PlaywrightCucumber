import { When } from "@cucumber/cucumber";
import { CucumberWorld } from "./world/CucumberWorld";

When('I switch to new browser tab', async function (this: CucumberWorld)  {
    await this.basePage.switchToNewTab();
});