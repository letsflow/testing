Feature: People are not committing to the social norms

  Background:
    Given the process is created from the "meeting" scenario
    And "Bob" is the "person_1" actor
    And "Eve" is the "person_2" actor
    And "Jack" is the "person_3" actor

    When the "default" service does "start" with:
    """yaml
      person_1: ~
      person_2: ~
      person_3: ~
    """
    Then the process is in "introductions"
    And the process has actor "person_1"
    And the process has actor "person_2"
    And the process has actor "person_3"

  Scenario: Person introduces himself and starts to talk
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    And "Bob" does "talk" with "What do you think about the weather?"
    Then the last event is skipped

  Scenario: Person starts talking without introducing himself
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    When "Eve" does "introduce" with:
      | name         | Eve      |
      | organization | Acme Inc |
    When "Jack" does "talk" with "I like blockchain!"
    Then the last event is skipped

  Scenario: Person does an introduction twice
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    When "Bob" does "introduce" with:
      | name         | Bob Builder |
      | organization | Jasny       |
    Then the last event is skipped

  Scenario: Person tries to talk twice
    When "Bob" does "introduce" with:
      | name         | Bob   |
      | organization | Jasny |
    When "Eve" does "introduce" with:
      | name         | Eve      |
      | organization | Acme Inc |
    When "Jack" does "introduce" with:
      | name         | Jack        |
      | organization | LTO Network |
    When "Bob" does "talk" with "What do you think about the weather?"
    Then the process is in "talking"
    When "Bob" does "talk" with "I like it"
    Then the last event is skipped
