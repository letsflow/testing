Feature: The customer fill out the form to request a quote

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
    And actor "customer" has instructions "Thank you for your request. We will get back to you shortly."
    And actor "sales" has instructions:
      """
      Please create a quote based on the customer requirements:
      The product should be able to do X, Y and Z
      """

  Scenario: Customer does not fill out her email address
    When "Alice" does "request" with:
      | company      | Acme Inc                                    |
      | contact      | Alice                                       |
      | requirements | The product should be able to do X, Y and Z |
    Then the last event is skipped with "Response is invalid: data must have required property 'email'"
    And the process is in "initial"
