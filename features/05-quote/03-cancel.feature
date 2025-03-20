Feature: The sales department creates a quote

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

  Scenario: Sales cancels the process
    When "Bob" does "cancel" with:
      | reason | Unable to deliver on requirements |
    Then the last event is not skipped
    And the process ended in "cancelled"
    And the state description is:
      """
      The quote request has been cancelled.
      Reason: Unable to deliver on requirements
      """
    And service "email" is notified with:
      """yaml
        schema: messages/email-v1
        to:
          name: Alice
          email: alice@example.com
        template: no-quote
        data:
          customer:
            title: Customer
            id: !ref actors.customer.id
            company: Acme Inc
            contact: Alice
            email: alice@example.com
            address: 123 Main St
          reason: Unable to deliver on requirements
      """

  Scenario: Customer cancels the process
    When "Alice" does "cancel" with:
      | reason | No longer interested |
    Then the last event is not skipped
    And the process ended in "cancelled"
    And the state description is:
      """
      The quote request has been cancelled.
      Reason: No longer interested
      """
    And service "email" is not notified
