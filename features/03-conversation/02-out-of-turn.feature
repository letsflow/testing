Feature: Two actors meet and have a conversation.

  Background:
    Given the process is created from the "conversation" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario: The recipient immediately ends the conversation
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Eve" does "end"
    Then the process ended

  Scenario: The conversation is ended by the initiator
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Eve" does "talk"
    Then the process is in "wait_on_initiator"
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Eve" does "talk"
    Then the process is in "wait_on_initiator"
    When "Bob" does "end"
    Then the process ended

  Scenario: The conversation is ended by the recipient
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Eve" does "talk"
    Then the process is in "wait_on_initiator"
    When "Bob" does "talk"
    Then the process is in "wait_on_recipient"
    When "Eve" does "end"
    Then the process ended
