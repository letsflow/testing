import { ActionEvent, applyFn } from '@letsflow/core/process';
import { expect } from "chai"
import { Then } from "@cucumber/cucumber"
import { world } from "./world"
import { parseData } from "./utils"

function lastEventSkipped(processName: string, expectedRaw?: string[]) {
  const process = world.getProcess(processName);
  const event = process.events[process.events.length - 1];


  if (!('skipped' in event) || !event.skipped) {
    expect.fail('The last event is not skipped');
  }

  if (expectedRaw !== undefined) {
    const expected = applyFn(expectedRaw, process);
    expect((event as ActionEvent).errors).to.include.members(expected);
  }
}
Then('the last event of the {string} process is skipped with {string}', (process, error) => lastEventSkipped(process, [error]));
Then('the last event of the {string} process is skipped with:', (process, errors) => lastEventSkipped(process, parseData(errors)));
Then('the last event of the {string} process is skipped', (process) => lastEventSkipped(process));
Then('the last event is skipped with {string}', (error) => lastEventSkipped('main', [error]));
Then('the last event is skipped with:', (errors) => lastEventSkipped('main', parseData(errors)));
Then('the last event is skipped', () => lastEventSkipped('main'));

function lastEventNotSkipped(processName: string) {
  const process = world.getProcess(processName);
  const event = process.events[process.events.length - 1];

  if ('skipped' in event && event.skipped) {
    const errors = (process.events[process.events.length - 1] as any).errors ?? [];
    expect.fail(`The last event is skipped with, because:\n  ${errors.join('\n  ')}`);
  }
}
Then('the last event of the {string} process is not skipped', lastEventNotSkipped);
Then('the last event is not skipped', () => lastEventNotSkipped('main'));

function nothingIsSkipped(processName: string) {
  const process = world.getProcess(processName);
  const skippedEvents = process.events.filter((event) => 'skipped' in event && event.skipped);

  expect(skippedEvents).to.have.length(0, 'Some events were skipped');
}
Then('nothing is skipped of the {string} process', nothingIsSkipped);
Then('nothing is skipped', () => nothingIsSkipped('main'));
