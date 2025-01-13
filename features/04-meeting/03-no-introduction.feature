Feature: Two persons have a conversation without an introduction

  Background:
    Given the process is created from the "meeting" scenario
    And "Bob" is the "person_1" actor with:
      | name         | Bob   |
      | organization | Jasny |
    And "Eve" is the "person_2" actor with:
      | name         | Eve      |
      | organization | Acme Inc |

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
