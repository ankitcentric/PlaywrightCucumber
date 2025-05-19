import { When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

//Load ENV variable from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({path: './env/.env'})

//Create a configuration object for easy access to env variable
const config = {
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1520'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080')
}

When('I switch to new browser tab', async () => {
    await pageFixture.context.waitForEvent("page");
    // Retrive all current open pages (tabs)
    const allPages = await pageFixture.context.pages();

    // Assign the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length -1 ];

    //Bring the newly assigned tab to the front (Make it active)
    await pageFixture.page.bringToFront();

    //Ensure the newly assigned tab is also fully maximised
    await pageFixture.page.setViewportSize( { width: config.width, height: config.height } )
});