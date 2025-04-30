import { When } from '@cucumber/cucumber';
import { world } from './world';
import { step } from '@letsflow/core/process';
import { parseData } from './utils';

function actorDoes(actorName: string, action: string, processName: string, response?: any) {
  const process = world.getProcess(processName);
  const actor = world.getActorByName(processName, actorName);

  const steppedProcess = step(process, action, actor, response);

  world.setProcess(processName, steppedProcess);
}
When('{string} does {string} in the {string} process with {scalar}', (actor, action, process, response) =>
  actorDoes(actor, action, process, response),
);
When('{string} does {string} in the {string} process with:', (actor, action, process, response) =>
  actorDoes(actor, action, process, parseData(response)),
);
When('{string} does {string} in the {string} process', (actor, action, process) => actorDoes(actor, action, process));
When('{string} does {string} with {scalar}', (actor, action, response) => actorDoes(actor, action, 'main', response));
When('{string} does {string} with:', (actor, action, response) =>
  actorDoes(actor, action, 'main', parseData(response)),
);
When('{string} does {string}', (actor, action) => actorDoes(actor, action, 'main'));

When('the {string} service does {string} in the {string} process with {scalar}', (system, action, process, response) =>
  actorDoes(`service:${system}`, action, process, response),
);
When('the {string} service does {string} in the {string} process with:', (system, action, process, response) =>
  actorDoes(`service:${system}`, action, process, parseData(response)),
);
When('the {string} service does {string} in the {string} process', (system, action, process) =>
  actorDoes(`service:${system}`, action, process),
);
When('the {string} service does {string} with {scalar}', (system, action, response) =>
  actorDoes(`service:${system}`, action, 'main', response),
);
When('the {string} service does {string} with:', (system, action, response) =>
  actorDoes(`service:${system}`, action, 'main', parseData(response)),
);
When('the {string} service does {string}', (system, action) => actorDoes(`service:${system}`, action, 'main'));
