![letsflow](https://github.com/letsflow/workflow-engine/assets/100821/3852a14e-90f8-4f8f-a334-09516f43bbc1)

# Test Suite

Test suite for LetsFlow workflows

## Installation

Install the library using your package manager (npm, yarn, pnpm, etc).

    yarn add @letsflow/testing

## Configuration

Create the [cucumber configuration](https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md) `cucumber.yaml`

```yaml
workflows:
  require:
    - node_modules/@letsflow/lib/**/*.js
```

Config the `test:workflows` script in `package.json`

```json
{
  "scripts": {
    "test:workflows": "cucumber-js --profile workflows"
  }
}
```

## Features

Add features (test files) to the `features` folder.

## Usage

Run all workflow 

    yarn test:workflows
    
Run a single feature or folder with features

    yarn test:workflows features/some-test.feature

### Environment variables

The test suite assumes that the scenarios are locates in a folder name `scenarios` in the current
working directory. You can set this path with env var `LETSFLOW_SCENARIO_PATH`.

## Documentation

Please read the full documentation at [letsflow.io](https://letsflow.io)

