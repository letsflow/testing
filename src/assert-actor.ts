import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import getValue from 'get-value';
import { world } from "./world"
import { parseData } from "./utils"
import { applyFn } from '@letsflow/core/process';

function assertActorExists(processName: string, actorKey: string) {
  const process = world.getProcess(processName);
  const actors = Object.keys(process.actors);

  expect(actors).to.include(actorKey, `Actor '${actorKey}' is not defined in the process`);
}
Then('the {string} process has actor {string}', assertActorExists);
Then('the process has actor {string}', (actorKey) => assertActorExists('main', actorKey));

function assertActorProp(actorKey: string, processName: string, propName: string, valueRaw: any) {
  const process = world.getProcess(processName);
  const actor = process.actors[actorKey];
  const value = applyFn(valueRaw, process);

  if (!actor) {
    throw new Error(`Actor '${actorKey}' is not defined in the process`);
  }

  const actualValue = getValue(actor, propName);
  expect(actualValue).to.eq(value, `Actor '${actorKey}' does not have the expected value for '${propName}'`);
}
Then('actor {string} in the {string} process has {string} is {scalar}', assertActorProp);
Then('actor {string} has {string} is {scalar}', (actorKey, propName, propValue) => assertActorProp(actorKey, 'main', propName, propValue));
Then('actor {string} in the {string} process has {string} is:', (actorKey, process, propName, expected) => assertActorProp(actorKey, process, propName, parseData(expected)));
Then('actor {string} has {string} is:', (actorKey, propName, expected) => assertActorProp(actorKey, 'main', propName, parseData(expected)));
