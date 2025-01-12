import { When } from "@cucumber/cucumber"
import { world } from "./world"
import { step } from "@letsflow/core/process"
import { parseData, unquote } from "./utils"

function actorDoes(actorName: string, action: string, processName: string, response?: any) {
  const process = world.getProcess(processName);
  const actor = world.getActorByName(processName, actorName);

  const steppedProcess = step(process, action, actor, response);

  world.setProcess(processName, steppedProcess);
}
When('{string} does {string} in the {string} process with {}', (actor, action, process, response) => actorDoes(actor, action, process, unquote(response)));
When('{string} does {string} in the {string} process with:', (actor, action, process, response) => actorDoes(actor, action, process, parseData(response)));
When('{string} does {string} in the {string} process', (actor, action, process) => actorDoes(actor, action, process));
When('{string} does {string} with {}', (actor, action, response) => actorDoes(actor, action, 'main', unquote(response)));
When('{string} does {string} with:', (actor, action, response) => actorDoes(actor, action, 'main', parseData(response)));
When('{string} does {string}', (actor, action) => actorDoes(actor, action, 'main'));
