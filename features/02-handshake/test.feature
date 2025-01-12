Feature: Two actors greet each other

  Background:
    Given the process is created from the "handshake" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario:
    When "Bob" does "greet"
    Then the process is in "wait_on_recipient"
    When "Eve" does "reply"
    Then the process is in "wait_on_initiator"
    When "Bob" does "complete"
    Then the process ended in "success"

  Scenario:
    When "Bob" does "greet"
    Then the process is in "wait_on_recipient"
    When "Eve" does "ignore"
    Then the process ended in "failed"
