import { world } from './world';
import { applyFn } from '@letsflow/core/process';
import { expect } from 'chai';
import { Then } from '@cucumber/cucumber';
import { parseData } from './utils';
import getValue from 'get-value';

function assertStateVar(property: string, processName: string, expectedRaw: any) {
  const process = world.getProcess(processName);
  const expected =
    typeof expectedRaw === 'string'
      ? (applyFn({ '<tpl>': expectedRaw }, process) as string).trim()
      : applyFn(expectedRaw, process);

  let actualValue = getValue(process.current, property);
  if (typeof actualValue === 'string') actualValue = actualValue.trim();

  expect(actualValue).to.eq(expected, `The ${property} of the current state does not have the expected value`);
}
Then('the state {property} of the {string} process has {string} is/are {string}', assertStateVar);
Then('the state {property} is/are {string}', (property, expected) => assertStateVar(property, 'main', expected));
Then('the state {property} of the {string} process is:/are:', (property, process, expected) =>
  assertStateVar(property, process, parseData(expected)),
);
Then('the state {property} is:/are:', (property, expected) => assertStateVar(property, 'main', parseData(expected)));

function assertInstructions(actorKey: string, processName: string, expectedRaw: string) {
  const process = world.getProcess(processName);
  const expected = applyFn({ '<tpl>': expectedRaw }, process) as string;
  const instructions = process.current.instructions?.[actorKey];

  if (!instructions) {
    expect.fail(`Actor '${actorKey}' does not have instructions`);
  }

  expect(instructions.trim()).to.eq(expected.trim(), `Actor '${actorKey}' does not have the expected instructions`);
}
Then('actor {string} in the {string} process has (the )instruction(s) {string}', assertInstructions);
Then('actor {string} has (the )instruction(s) {string}', (actorKey, expected) =>
  assertInstructions(actorKey, 'main', expected),
);
Then('actor {string} in the {string} process has (the )instruction(s):', assertInstructions);
Then('actor {string} has (the )instruction(s):', (actorKey, expected) =>
  assertInstructions(actorKey, 'main', expected),
);
