import { DataTable, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { world } from "./world"
import { parseData } from "./utils"

function assertServiceNotified(service: string, processName: string, expectedRaw?: string | DataTable) {
  const process = world.getProcess(processName);
  const expectedResult = expectedRaw ? parseData(expectedRaw, process) : undefined;

  const notify = process.current.notify.find((n) => n.service === service);
  if (!notify) {
    expect.fail(`Service '${service}' was not notified`);
  }

  expect(notify.message).to.deep.eq(expectedResult, `Service '${service}' was not notified with the expected message`);
}
Then('service {string} in the {string} process is notified with:', assertServiceNotified);
Then('service {string} in the {string} process is notified', (service, process) => assertServiceNotified(service, process));
Then('service {string} is notified with:', (service, expected) => assertServiceNotified(service, 'main', expected));
Then('service {string} is notified', (service) => assertServiceNotified(service, 'main'));

function assertServiceNotNotified(service: string, processName: string) {
  const process = world.getProcess(processName);

  const notify = process.current.notify.find((n) => n.service === service);
  if (notify) {
    expect.fail(`Service '${service}' was notified`);
  }
}
Then('service {string} in the {string} process is not notified', assertServiceNotNotified);
Then('service {string} is not notified', (service) => assertServiceNotNotified(service, 'main'));
