Feature: People leave the conversation

  Background:
    Given the process is created from the "meeting" scenario
    And "Bob" is the "person_1" actor
    And "Eve" is the "person_2" actor
    And "Jack" is the "person_3" actor

    When the "default" service does "start" with:
    """yaml
      person_1:
        name: Bob
        organization: Jasny
      person_2:
        name: Eve
        organization: Acme Inc
      person_3:
        name: Jack
        organization: LTO Network
    """
    Then the process is in "talking"
    And actor "person_1" has "is_present" is true
    And actor "person_2" has "is_present" is true
    And actor "person_3" has "is_present" is true

  Scenario: Person leaves and later the second leaves
    When "Bob" does "talk" with "What do you think about the weather?"
    When "Eve" does "talk" with "It's pretty cold"
    When "Bob" does "talk" with "True, but at least it's not raining"
    When "Jack" does "talk" with "I like blockchain!"

    When "Bob" does "leave"
    Then actor "person_1" has "is_present" is false
    And the process is in "talking"

    When "Eve" does "talk" with "What is blockchain?"
    And "Jack" does "talk" with "Do you know Bitcoin?"
    And "Eve" does "talk" with "*sigh*"

    When "Eve" does "leave"
    Then actor "person_2" has "is_present" is false
    And the process ended with:
      """yaml
      - Bob - What do you think about the weather?
      - Eve - It's pretty cold
      - Bob - True, but at least it's not raining
      - Jack - I like blockchain!
      - Eve - What is blockchain?
      - Jack - Do you know Bitcoin?
      - Eve - *sigh*
      """

    Scenario: Person tries to say something after already left
      When "Bob" does "talk" with "What do you think about the weather?"
      And "Eve" does "talk" with "It's pretty cold"

      When "Bob" does "leave"
      And "Bob" does "talk" with "True, but at least it's not raining"
      Then the last event is skipped
