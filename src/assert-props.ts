import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import getValue from 'get-value';
import { world } from "./world"

function assertActorProps(processName: string, actorKey: string, propName: string, propValue: string) {
  const process = world.getProcess(processName);
  const actor = process.actors[actorKey];

  if (!actor) {
    throw new Error(`Actor '${actorKey}' is not defined in the process`);
  }

  const actualValue = getValue(actor, propName);
  expect(actualValue).to.eq(propValue, `Actor '${actorKey}' does not have the expected value for '${propName}'`);
}
Then('actor {string} in the {string} process has {string} is {string}', assertActorProps);
Then('actor {string} has {string} is {string}', (actorKey, propName, propValue) => assertActorProps('main', actorKey, propName, propValue));
