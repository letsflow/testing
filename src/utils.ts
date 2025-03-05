import { DataTable } from "@cucumber/cucumber"
import { yaml } from "@letsflow/core"
import { applyFn, Process } from '@letsflow/core/process';

export function parseData(data: string | DataTable, process?: Process): any {
  if (typeof data !== 'string') {
    const result = data.raw()[0].length === 1 ? data.raw().map((row) => row[0]) : data.rowsHash();
    return process ? applyFn(result, process) : result;
  }

  try {
    const result = yaml.parse(data);
    return process ? applyFn(result, process) : result;
  } catch (_) {
    return process ? applyFn({ '<tpl>': data }, process) : data;
  }
}
