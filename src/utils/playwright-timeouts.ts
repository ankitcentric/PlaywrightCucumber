import { Page } from "@playwright/test";

//Load ENV variable from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({path: './env/.env'})

export function setGlobalSettins(page: Page){
    const navigationTimeout = parseInt(env.parsed?.UI_AUTOMATION_NAVIGATION_TIMEOUT || '50000');
    const commandTimeout = parseInt(env.parsed?.UI_AUTOMATION_COMMAND_TIMEOUT || '50000');
    //set global navigation timeout
    page.setDefaultNavigationTimeout(navigationTimeout); //wait up to 50 seconds

    //set global command timeout - this apply to click and other action operation on elements
    page.setDefaultTimeout(commandTimeout);
}

// if you want to override the default timeout then write the required timeout at function like
// await page.click('#my-btn', { timeout: 40000 });
//await page.myElement.click({timeout: 5000})
// await page.waitForSelector('#my-btn', { timeout: 70000 });

// Make sure that the Cucumber timeout value is always HIGHER