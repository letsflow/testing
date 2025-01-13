import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import getValue from 'get-value';
import { world } from "./world"
import { parseData } from "./utils"

function assertActorProps(processName: string, actorKey: string, propName: string, propValue: any) {
  const process = world.getProcess(processName);
  const actor = process.actors[actorKey];

  if (!actor) {
    throw new Error(`Actor '${actorKey}' is not defined in the process`);
  }

  const actualValue = getValue(actor, propName);
  expect(actualValue).to.eq(propValue, `Actor '${actorKey}' does not have the expected value for '${propName}'`);
}
Then('actor {string} in the {string} process has {string} is {scalar}', assertActorProps);
Then('actor {string} has {string} is {scalar}', (actorKey, propName, propValue) => assertActorProps('main', actorKey, propName, propValue));

function assertResult(processName: string, expectedResultRaw: string | DataTable) {
  const expectedResult = parseData(expectedResultRaw);
  const process = world.getProcess(processName);

  expect(process.result).to.deep.eq(expectedResult, 'The process result is not as expected');
}
Then('the {string} process result is:', assertResult);
Then('the result is:', (expectedResult) => assertResult('main', expectedResult));
