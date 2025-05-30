Feature: The sales team creates and sends a quote

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

  Scenario: Sales creates a quote
    Then actor "customer" has instructions "Thank you for your request. We will get back to you shortly."
    And actor "sales" has instructions:
      """
      Please create a quote based on the customer requirements:
      The product should be able to do X, Y and Z
      """

    When "Bob" does "create_quote" with "cms:quotes/test.pdf"
    Then the last event is not skipped
    And the process is in "quoted"
    And the result is "cms:quotes/test.pdf"
    And service "email" is notified with:
      """yaml
        schema: messages/email-v1
        to:
          name: Alice
          email: alice@example.com
        template: quote
        data:
          customer:
            title: Customer
            id: !ref actors.customer.id
            company: Acme Inc
            contact: Alice
            email: alice@example.com
            address: 123 Main St
        generate_token: !ref actors.customer.id
        attachments:
          - filename: quote.pdf
            source: cms:quotes/test.pdf
      """
