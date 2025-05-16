Feature: webdriveruniversity - Login Page

    Scenario Outline: Validate valid and Invalid login
        Given I navigate to webdriveruniversity homepage
        When I click on the login portal button
        And I switch to new browser tab
        And I type a username '<userName>'
        And I type a password '<password>'
        And I click on the login button
        Then I should be presented with an alert box which contains text '<expectAlertText>'

        Examples:
            | userName  | password     | expectAlertText      |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | 123asdqw     | validation failed    |