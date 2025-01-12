import { ActionEvent } from "@letsflow/core/process"
import { expect } from "chai"
import { Then } from "@cucumber/cucumber"
import { world } from "./world"
import { parseData } from "./utils"

function assertLastEventSkipped(processName: string, expectedErrors?: string[]) {
  const process = world.getProcess(processName);
  const event = process.events[process.events.length - 1];

  if (!('skipped' in event) || !event.skipped) {
    expect.fail('The last event is not skipped');
  }

  if (expectedErrors !== undefined) {
    expect((event as ActionEvent).errors).to.include.members(expectedErrors);
  }
}
Then('the last event of the {string} process is skipped with {string}', (process, error) => assertLastEventSkipped(process, [error]));
Then('the last event of the {string} process is skipped with:', (process, errors) => assertLastEventSkipped(process, parseData(errors)));
Then('the last event of the {string} process is skipped', (process) => assertLastEventSkipped(process));
Then('the last event is skipped with {string}', (error) => assertLastEventSkipped('main', [error]));
Then('the last event is skipped with:', (errors) => assertLastEventSkipped('main', parseData(errors)));
Then('the last event is skipped', () => assertLastEventSkipped('main'));

function nothingIsSkipped(processName: string) {
  const process = world.getProcess(processName);
  const skippedEvents = process.events.filter((event) => 'skipped' in event && event.skipped);

  expect(skippedEvents).to.have.length(0, 'Some events were skipped');
}
Then('nothing is skipped of the {string} process', nothingIsSkipped);
Then('nothing is skipped', () => nothingIsSkipped('main'));
