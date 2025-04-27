import { When } from '@cucumber/cucumber';
import { world } from './world';
import { timeout } from '@letsflow/core/process';

function timePasses(seconds: number) {
  Object.entries(world.getProcesses()).forEach(([processName, process]) => {
    world.setProcess(processName, timeout(process, { timePassed: seconds }));
  });
}
When('{time} pass', timePasses);
When('{time} passes', timePasses);

function timePassesFor(seconds: number, processName: string) {
  const process = world.getProcess(processName);
  world.setProcess(processName, timeout(process, { timePassed: seconds }));
}
When('{time} pass for the {string} process', timePassesFor);
When('{time} passes for the {string} process', timePassesFor);
