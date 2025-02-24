Feature: Two persons have a conversation without an introduction

  Background:
    Given the process is created from the "meeting" scenario
    And "Bob" is the "person_1" actor
    And "Eve" is the "person_2" actor

    When the "default" service does "start" with:
    """yaml
      person_1:
        name: Bob
        organization: Jasny
      person_2:
        name: Eve
        organization: Acme Inc
    """
    Then the process is in "talking"
    And the process has actor "person_1"
    And the process has actor "person_2"

  Scenario:
    When "Bob" does "talk" with "What do you think about the weather?"
    Then the process is in "talking"
    And the last event is not skipped

    When "Eve" does "talk" with "It's pretty cold"
    Then the process is in "talking"
    And the last event is not skipped

    Then the result is:
      """yaml
      - Bob - What do you think about the weather?
      - Eve - It's pretty cold
      """
