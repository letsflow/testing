Feature: The customer fills out the form to request a quote

  Background:
    Given the process is created from the "quote" scenario
    And "Alice" is the "customer" actor
    And "Bob" is the "sales" actor

  Scenario: Customer fills out all fields correctly
    When "Alice" does "request" with:
      | company      | Acme Inc                                    |
      | contact      | Alice                                       |
      | email        | alice@example.com                           |
      | address      | 123 Main St                                 |
      | requirements | The product should be able to do X, Y and Z |
    Then the last event is not skipped
    And actor "customer" has "company" is "Acme Inc"
    * actor "customer" has "contact" is "Alice"
    * actor "customer" has "email" is "alice@example.com"
    * actor "customer" has "address" is "123 Main St"
    And the process is in "requested"

  Scenario: Customer does not fill out the email address and requirements
    When "Alice" does "request" with:
      | company | Acme Inc |
    Then the last event is skipped with "Response is invalid: data must have required property 'email'"
    Then the last event is skipped with "Response is invalid: data must have required property 'requirements'"
    And the process is in "initial"
