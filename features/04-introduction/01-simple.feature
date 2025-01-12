Feature: Two actors meet at a conference and exchange information.

  Background:
    Given the process is created from the "introduction" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario:
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    Then the process is in "wait_on_introduction_recipient"
    And actor "initiator" has "name" is "Bob"
    And actor "initiator" has "organization" is "Jasny"

    When "Eve" does "introduce" with:
      | name         | Eve      |
      | organization | Acme Inc |
    Then the process is in "wait_on_initiator"
    And actor "recipient" has "name" is "Eve"
    And actor "recipient" has "organization" is "Acme Inc"

    When "Bob" does "end"
    Then the process ended
