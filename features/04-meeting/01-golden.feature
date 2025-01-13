Feature: Three persons introduce themselves and have a conversation

  Background:
    Given the process is created from the "meeting" scenario
    And "Bob" is the "person_1" actor
    And "Eve" is the "person_2" actor
    And "Jack" is the "person_3" actor

  Scenario:
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    Then the process is in "initial"
    And the last event is not skipped
    And actor "person_1" has "name" is "Bob"
    And actor "person_1" has "organization" is "Jasny"

    When "Eve" does "introduce" with:
      | name         | Eve      |
      | organization | Acme Inc |
    Then the process is in "initial"
    And the last event is not skipped
    And actor "person_2" has "name" is "Eve"
    And actor "person_2" has "organization" is "Acme Inc"

    When "Jack" does "introduce" with:
      | name         | Jack        |
      | organization | LTO Network |
    Then the process is in "initial"
    And the last event is not skipped
    And actor "person_3" has "name" is "Jack"
    And actor "person_3" has "organization" is "LTO Network"

    When "Bob" does "talk" with "What do you think about the weather?"
    Then the process is in "talking"
    And the last event is not skipped

    When "Eve" does "talk" with "It's pretty cold"
    Then the process is in "talking"
    And the last event is not skipped

    When "Bob" does "talk" with "True, but at least it's not raining"
    Then the process is in "talking"
    And the last event is not skipped

    When "Jack" does "talk" with "I like blockchain!"
    Then the process is in "talking"
    And the last event is not skipped

    Then the result is:
      """yaml
      - Bob - What do you think about the weather?
      - Eve - It's pretty cold
      - Bob - True, but at least it's not raining
      - Jack - I like blockchain!
      """
