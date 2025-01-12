import { DataTable, Given } from '@cucumber/cucumber';
import { world } from "./world"
import { yaml } from "@letsflow/core"

async function addProcess(name: string, scenario: string, varsTable?: string | DataTable) {
  const vars = typeof varsTable === 'string' ? yaml.parse(varsTable) : varsTable?.rowsHash();
  await world.addProcess(name, { scenario, vars });
}
Given('the {string} process is created from the {string} scenario with:', addProcess);
Given('the {string} process is created from the {string} scenario', (name, scenario) => addProcess(name, scenario));
Given('the process is created from the {string} scenario', (scenario) => addProcess('main', scenario));
Given('the process is created from the {string} scenario with:', (scenario, varsTable) => addProcess('main', scenario, varsTable));

function addActor(name: string, actor = "actor", process = "main", propsTable?: string | DataTable) {
  const props = typeof propsTable === 'string' ? yaml.parse(propsTable) : propsTable?.rowsHash();
  world.addActor(process, name, actor, props);
}
Given('{string} is the {string} actor in the {string} process with:', addActor);
Given('{string} is the actor in the {string} process', (name, process) => addActor(name, "actor", process));
Given('{string} is the actor in the {string} process with:', (name, process, propsTable) => addActor(name, process, "actor", propsTable));
Given('{string} is the {string} actor in the {string} process', (name, actor, process) => addActor(name, actor, process));
Given('{string} is the actor', (name) => addActor(name, "actor", "main"));
Given('{string} is the {string} actor', (name, actor) => addActor(name, actor, "main"));
Given('{string} is the actor with:', (name: string, propsTable: string | DataTable) => addActor(name, "main", "actor", propsTable));
Given('{string} is the {string} actor with:', (name: string, actor: string, propsTable: string | DataTable) => addActor(name, actor, "main", propsTable));
