import fs from 'fs/promises';
import { yaml } from '@letsflow/core';
import { instantiate, Process } from "@letsflow/core/process";
import { normalize, NormalizedScenario, Scenario, validate } from '@letsflow/core/scenario';
import { setWorldConstructor, world as cucumberWorld, World } from '@cucumber/cucumber';
import betterAjvErrors from 'better-ajv-errors';
import { scenarioSchema } from '@letsflow/core/schemas/v1.0';

const scenarios = new Map<string, NormalizedScenario>();
const scenarioPath = process.env.LETSFLOW_SCENARIO_PATH || './scenarios';

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function loadScenario(name: string): Promise<void> {
  let scenario: Scenario;

  if (await fileExists(`${scenarioPath}/${name}.json`)) {
    const scenarioJson = await fs.readFile(`${scenarioPath}/${name}.json`, 'utf8');
    scenario = JSON.parse(scenarioJson);
  } else if (await fileExists(`${scenarioPath}/${name}.yaml`)) {
    const scenarioYaml = await fs.readFile(`${scenarioPath}/${name}.yaml`, 'utf8');
    scenario = yaml.parse(scenarioYaml);
  } else if (await fileExists(`${scenarioPath}/${name}.yml`)) {
    const scenarioYaml = await fs.readFile(`${scenarioPath}/${name}.yml`, 'utf8');
    scenario = yaml.parse(scenarioYaml);
  } else {
    throw new Error(`Scenario "${name}" not found`);
  }

  if (!validate(scenario)) {
    console.error(betterAjvErrors(scenarioSchema, scenario, validate.errors, { format: 'cli', indent: 2 }));
    throw new Error(`Scenario "${name}" is not valid`);
  }

  const normalized = normalize(scenario);
  scenarios.set(name, normalized);
}

export class CustomWorld<ParametersType = any> extends World<ParametersType> {
  private readonly instructions = new Map<string, { scenario: string }>();
  private readonly processes = new Map<string, Process>();
  private readonly actors = new Map<string, { key: string; [_: string]: any }>();

  async addProcess(name: string, scenario: string) {
    await loadScenario(scenario);
    this.instructions.set(name, { scenario });
  }

  addActor(name: string, process: string, key: string, properties: Record<string, any> = {}) {
    if (!this.instructions.has(name)) {
      throw new Error(`There is no process called "${name}"`);
    }
    if (this.processes.has(name)) {
      throw new Error(`The "${name}" process is already instantiated`);
    }

    this.actors.set(`${name}@${process}`, { key, ...properties });
  }

  getActorByName(process: string, name: string): { key: string; [_: string]: any } {
    if (name.startsWith('service:')) {
      return { key: name };
    }

    if (!this.instructions.has(process)) {
      throw new Error(`There is no process called "${process}"`);
    }
    if (!this.actors.has(`${process}@${name}`)) {
      throw new Error(`"${name}" is not an actor in the "${process}" process`);
    }

    return this.actors.get(`${process}@${name}`)!;
  }

  getProcess(name: string): Process {
    if (this.processes.has(name)) {
      return this.processes.get(name)!;
    }

    if (!this.instructions.has(name)) {
      throw new Error(`There is no process called "${name}"`);
    }

    const instructions = this.instructions.get(name)!;
    const scenario = scenarios.get(instructions.scenario)!;

    const process = instantiate(scenario);
    this.processes.set(name, process);

    return process;
  }

  setProcess(name: string, process: Process) {
    this.processes.set(name, process);
  }
}

setWorldConstructor(CustomWorld);

export const world = cucumberWorld as CustomWorld;
