import { DataTable } from "@cucumber/cucumber"
import { yaml } from "@letsflow/core"

export function parseData(data: string | DataTable): any {
  if (typeof data !== 'string') {
    return data.raw()[0].length === 1 ? data.raw().map((row) => row[0]) : data.rowsHash();
  }

  try {
    return yaml.parse(data);
  } catch (_) {
    return data;
  }
}

export function unquote<T>(value: T): T {
  return typeof value === 'string' ? value.replace(/^"(.*)"$/, '$1') as T : value;
}
