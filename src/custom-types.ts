import { defineParameterType } from "@cucumber/cucumber"

defineParameterType({
  name: 'boolean',
  regexp: /true|false/,
  transformer: s => s === 'true',
});

defineParameterType({
  name: 'scalar',
  regexp: /true|false|null|".*?"|\d+|\d\.\d+/,
  transformer: (value: any): string | number | boolean => {
    if (typeof value !== 'string') {
      return value;
    }

    if (value === 'true' || value === 'false') {
      return value === 'true';
    }

    if (!isNaN(Number(value))) {
      return Number(value);
    }

    return value.replace(/^"(.*)"$/, '$1');
  }
});
