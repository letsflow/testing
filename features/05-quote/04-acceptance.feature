Feature: The customer accepts or rejects the quote

  Background:
    Given the process is created from the "quote" scenario
    And "Alice" is the "customer" actor
    And "Bob" is the "sales" actor

    When "Alice" does "request" with:
      | company      | Acme Inc                                    |
      | contact      | Alice                                       |
      | email        | alice@example.com                           |
      | address      | 123 Main St                                 |
      | requirements | The product should be able to do X, Y and Z |
    Then the process is in "requested"

    When "Bob" does "create_quote" with "cms:quotes/test.pdf"
    Then the process is in "quoted"

  Scenario: Customer accepts the quote
    When "Alice" does "accept"
    Then the last event is not skipped
    And the process ended in "accepted"

  Scenario: Customer rejects the quote
    When "Alice" does "reject"
    Then the last event is not skipped
    And the process ended in "rejected"
