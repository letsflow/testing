import { DataTable, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { world } from './world';
import { parseData } from './utils';

function assertState(processName: string, state: string) {
  const process = world.getProcess(processName);
  const errors = (process.events[process.events.length - 1] as any).errors ?? [];

  expect(process.current.key).to.eq(
    state,
    'The process is not in the expected state' + (errors.length > 0 ? `, because:\n  ${errors.join('\n  ')}\n` : ''),
  );
}
Then('the {string} process is in {string}', assertState);
Then('the process is in {string}', (state) => assertState('main', state));

function assertProcessEnded(processName: string, status?: string, expectedResultRaw?: string | DataTable) {
  const process = world.getProcess(processName);

  if (process.isRunning) {
    const errors = (process.events[process.events.length - 1] as any).errors ?? [];
    expect.fail('The process has not ended' + (errors.length > 0 ? `, because:\n  ${errors.join('\n  ')}` : ''));
  }

  if (status !== undefined) {
    status = status.match(/^\(.+\)$/) ? status : `(${status})`;
    expect(process.current.key).to.eq(status, 'The process is not in the expected end state');
  }

  if (expectedResultRaw !== undefined) {
    const expectedResult = parseData(expectedResultRaw, process);
    expect(process.result).to.deep.eq(expectedResult, 'The process result is not as expected');
  }
}
Then('the {string} process ended in {string} with:', assertProcessEnded);
Then('the {string} process ended in {string}', (process, status) => assertProcessEnded(process, status));
Then('the {string} process ended with:', (process, expectedResult) =>
  assertProcessEnded(process, undefined, expectedResult),
);
Then('the {string} process ended', (process) => assertProcessEnded(process));
Then('the process ended in {string} with:', (status, expectedResult) =>
  assertProcessEnded('main', status, expectedResult),
);
Then('the process ended in {string}', (status) => assertProcessEnded('main', status));
Then('the process ended with:', (expectedResult) => assertProcessEnded('main', undefined, expectedResult));
Then('the process ended', () => assertProcessEnded('main'));

function processHasNotEndedIn(processName: string, status: string) {
  const process = world.getProcess(processName);

  status = status.match(/^\(.+\)$/) ? status : `(${status})`;
  expect(process.current.key).to.not.eq(status, 'The process has ended in the expected state');
}
Then('the {string} process has not ended in {string}', processHasNotEndedIn);
Then('the process has not ended in {string}', (status) => processHasNotEndedIn('main', status));

function processHasNotEnded(processName: string) {
  const process = world.getProcess(processName);

  if (!process.isRunning) {
    expect.fail(`The process has ended in state ${process.current.key}`);
  }
}
Then('the {string} process has not ended', processHasNotEnded);
Then('the process has not ended', () => processHasNotEnded('main'));
