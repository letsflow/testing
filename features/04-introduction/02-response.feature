Feature: Two actors meet, exchange information, and have a conversation.

  Background:
    Given the process is created from the "introduction" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario:
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    And "Eve" does "introduce" with:
      | name         | Eve      |
      | organization | Acme Inc |
    Then nothing is skipped

    When "Bob" does "talk" with "How are you?"
    And "Eve" does "talk" with "Fine, how about you?"
    And "Bob" does "talk" with "Well, thank you"
    Then nothing is skipped

    When "Eve" does "end"
    Then the process ended with:
      """yaml
      - Bob - How are you?
      - Eve - Fine, how about you?
      - Bob - Well, thank you
      """
