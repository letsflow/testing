Feature: Run a simple process that is completed in one step

  Background:
    Given the process is created from the "basics" scenario
    And "Joe" is the actor

  Scenario:
    When "Joe" does "complete"
    Then the process ended
