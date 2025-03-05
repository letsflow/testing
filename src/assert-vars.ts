import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import getValue from 'get-value';
import { world } from "./world"
import { parseData } from "./utils"
import { applyFn } from '@letsflow/core/process';

function assertVar(variable: string, processName: string, valueRaw: any) {
  const process = world.getProcess(processName);
  const value = applyFn(valueRaw, process);

  const actualValue = getValue(process, `vars.${variable}`);
  expect(actualValue).to.deep.eq(value, `The variable '${variable}' is not as expected`);
}
Then('variable {string} in the {string} process is {scalar}', assertVar);
Then('variable {string} is {scalar}', (variable, value) => assertVar(variable, 'main', value));
Then('variable {string} in the {string} process is:', (variable, process, expected) => assertVar(variable, process, parseData(expected)));
Then('variable {string} is:', (variable, expected) => assertVar(variable, 'main', parseData(expected)));

function assertResult(processName: string, valueRaw: any) {
  const process = world.getProcess(processName);
  const value = applyFn(valueRaw, process);

  expect(process.result).to.deep.eq(value, 'The process result is not as expected');
}
Then('the {string} process result is {scalar}', assertResult);
Then('the result is {scalar}', (expected) => assertResult('main', expected));
Then('the {string} process result is:', (process: string, expected) => assertResult(process, parseData(expected)));
Then('the result is:', (expected) => assertResult('main', parseData(expected)));
