Feature: Two actors have a conversation, which is logged.

  Background:
    Given the process is created from the "conversation" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario:
    When "Bob" does "talk" with "How are you?"
    And "Eve" does "talk" with "Could be better"
    And "Bob" does "talk" with "What's the matter?"
    And "Eve" does "talk" with "My cat is stealing my boyfriend"
    And "Bob" does "talk" with "Why do think that?"
    And "Eve" does "talk" with "He cuddles her more than me"
    And "Bob" does "talk" with "Sorry to hear that"
    And "Eve" does "end"
    Then the process ended with:
      """yaml
      - How are you?
      - Could be better
      - What's the matter?
      - My cat is stealing my boyfriend
      - Why do think that?
      - He cuddles her more than me
      - Sorry to hear that
      """
