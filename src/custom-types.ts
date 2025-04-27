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

defineParameterType({
  name: 'property',
  regexp: /\w+/,
});

defineParameterType({
  name: 'time',
  regexp: /(\d+)\s*(seconds?|minutes?|hours?|days?|weeks?)+/,
  transformer: (valueStr: string, unit: string): number => {
    const value = parseInt(valueStr, 10);

    switch (unit) {
      case 'second':
      case 'seconds':
        return value;
      case 'minute':
      case 'minutes':
        return value * 60;
      case 'hour':
      case 'hours':
        return value * 3600;
      case 'day':
      case 'days':
        return value * 86400;
      case 'week':
      case 'weeks':
        return value * 604800;
      default:
        throw new Error('Invalid time period unit.');
    }
  }
});
