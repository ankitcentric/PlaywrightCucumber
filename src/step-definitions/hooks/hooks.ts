import { AfterAll, BeforeAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserType, chromium, firefox, webkit } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";

//Load ENV variable from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({path: './env/.env'})

//Create a configuration object for easy access to env variable
const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1520'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080')
}

//create dictionary mapping browser name to their launch function
const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
}


let browserInstance: Browser | null = null;

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser>{
    const launchBrowser = browsers[selectedBrowser];
    if(!launchBrowser){
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    }

    return await launchBrowser.launch({ headless: config.headless });
}

async function initializePage(): Promise<void>{
    if(!browserInstance){
        throw new Error('Browser instance is null');
    }
    pageFixture.context = await browserInstance.newContext({
        ignoreHTTPSErrors: true
    });
    pageFixture.page = await pageFixture.context.newPage();
    await pageFixture.page.setViewportSize({width: config.height, height: config.height});
}

//BeforeAll hook: Runs once before all scenarios
BeforeAll(async function () {
    console.log("\nExecuting test Suite");
})

//BeforeAll hook: Runs once after all scenarios
AfterAll(async function () {
    console.log("\nFinished execution of test Suite");
})

// Before hook: Runs before each scenario
Before(async function () {
    try{
        browserInstance = await initializeBrowserContext(config.browser);
        console.log(`Browser context initialized for: ${config.browser}`);
        await initializePage();
    }catch(error){
        console.log('Browser context initialization failed: ',error);
    }
    
})

// After hook: Runs after each scenario
After(async function({pickle, result}){
    if(result?.status === Status.FAILED){
        if(pageFixture.page){
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',
                //timeout: 60000
            });
            await this.attach(image, 'image/png');
        }else{
            console.error('pageFixture.page is undefined');
        }
    }
    if(browserInstance){
        await pageFixture.page?.close();
        await browserInstance.close();
    }
    
    
})