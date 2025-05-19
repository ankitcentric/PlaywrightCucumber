import { exec } from "child_process";

// Define a comman command to run the cucumber test

const comman = `./src/features/*.feature \
--require-module ts-node/register \
--require ./src/step-definitions/**/**/*.ts \
--require ./src/utils/cucumber-timeout.ts \
-f json:./reports/report.json \
--format html:./reports/report.html \
--tags "not @ignore"`;

// Define an interface for the profile object
//It defines an interface where each key is a string and it's value is also a string
interface ProfileCommands {
    [key: string]: string;
}

// Define a command string  for different  test profiles

const profiles: ProfileCommands = {
    smoke: `${comman} --tags "@smoke"`,
    regression: `${comman} --tags "@regression"`,
    login: `${comman} --tags "@login"`,
    contactUs: `${comman} --tags "@contact-us"`,
}

// Get the third command-line argument and assign it to the profile
// i.e smoke, regress etc
const profile = process.argv[2];

//Construct the command string based on the selected profile
//command is the full command to run the test for the selected profile
let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regression' | 'login' | 'contact-us']}`;

//print the constructed command
//console.log(command);

//Execute the command
exec(command, { encoding: 'utf-8'}, (error: Error | null, stdout: string) => {
    // Log the output of the command
    console.log(stdout);

    // check if there was an error during execution
    if(error){
        // throw a simple error with a simple message
        throw new Error("Some Automation test(s) have failed! - please review");
    }
})