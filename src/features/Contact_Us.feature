@regression @contact-us
Feature: webdriveruniversity.com - Contact Us Page

    Background: Precondition for all the scenarios in this feature file
        Given I navigate to webdriveruniversity homepage
        When I click on the contact us button
        And I switch to new browser tab

    Scenario: Valid Contact Us Page Submission
        And I type a first name
        And I type a last name
        And I type an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario: InValid Contact Us Page Submission
        And I type a first name
        And I type a last name
        #And I type an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a unsuccessful contact us message

    @ignore
    Scenario: Valid Contact Us Page Submission - Using Specific data
        And I type a specific first name "Ankit Kumar"
        And I type a specific last name "Sharma"
        And I type an specific email address "ankitsharma@gmail.com"
        And I type a specific comment "Demo comment" and a number 2 withing the comment input field
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario: Valid Contact Us Page Submission - Using Random Data
        And I type a random first name
        And I type a random last name
        And I type an random email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    @smoke
    Scenario Outline: Validate Contact Us page
        And I type a first name '<firstName>' and a last name '<lastName>'
        And I type a email address '<emailAddress>' and a comment '<comment>'
        And I click on the submit button
        Then I should be presented with header text '<message>'

        Examples:
            | firstName | lastName | emailAddress    | comment       | message                     |
            | Ankit     | Sharma   | ankit@gmail.com | this is ankit | Thank You for your Message!44 |
            | Rahul     | Dutt     | rahul@gmail.com | this is rahul | Thank You for your Message! |
            | Bini      | Mawana   | bini            | this is bini  | Invalid email address       |
