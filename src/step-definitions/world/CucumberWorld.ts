import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";
import { HomePage } from "../../page-objects/HomePage";
import { ContactUsPage } from "../../page-objects/ContactUsPage";
import { LoginPage } from "../../page-objects/LoginPage";

export class CucumberWorld extends World {

    public pageManager: PageManager;
    public basePage: BasePage;
    public homePage: HomePage;
    public contactUsPage: ContactUsPage;
    public loginPage: LoginPage;

    //Base URL
    private url?: string;

    //Person
    private firstName?: string;
    private lastName?: string;
    private emailAddress?: string;


    //arguments in the constructor are just used to initialize the super class constructor
    constructor({ attach, log, parameters, link}: IWorldOptions) {
        super({ attach, log, parameters, link});
        this.pageManager = new PageManager();
        this.basePage = this.pageManager.createBasePage();
        this.homePage = this.pageManager.createHomePage();
        this.contactUsPage = this.pageManager.createContactUsPage();
        this.loginPage = this.pageManager.createLoginPage();
    }

    //Setter methods for URL, first name etc:
    setUrl(url: string) {
        this.url = url;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    setEmailAddress(emailAddress: string) {
        this.emailAddress = emailAddress;
    }

    //Getter methods for URL, first name etc:
    getURL() {
        return this.url;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmailAddress() {
        return this.emailAddress;
    }
}

//Tells Cucumber World to use our Custom World
setWorldConstructor(CucumberWorld);