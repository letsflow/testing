Feature: Actors try to act out of turn

  Background:
    Given the process is created from the "conversation" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario: The initiator tries to talk twice
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    And the last event is skipped

  Scenario: The recipient tries to end the conversation after talking
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Eve" does "talk"
    Then the process is in "wait_on_initiator"
    When "Eve" does "end"
    Then the process is in "wait_on_initiator"
    And the last event is skipped
