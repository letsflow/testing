Feature: Actors don't give a proper introduction

  Background:
    Given the process is created from the "introduction" scenario
    And "Bob" is the "initiator" actor
    And "Eve" is the "recipient" actor

  Scenario: The initiator doesn't tell his organization
    When "Bob" does "introduce" with:
      | name         | Bob   |
    Then the last event is skipped

  Scenario: The recipient doesn't tell her name
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    Then the process is in "wait_on_introduction_recipient"

    When "Eve" does "introduce" with:
      | organization | Acme Inc |
    Then the last event is skipped

  Scenario: The initiator tells too much
    When "Bob" does "introduce" with:
      | name         | Bob     |
      | organization | Jasny   |
      | hobby        | Fishing |
      | age          | 42      |
    Then the last event is skipped
