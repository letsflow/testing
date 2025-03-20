import fs from 'fs/promises';
import { ajv, yaml } from '@letsflow/core';
import { normalize } from '@letsflow/core/scenario';
import { schemaSchema } from '@letsflow/core/schemas/v1.0';
import { existsSync } from 'fs';
import { join } from 'path';

const SCHEMA_DIR = './schemas';

function getSchemaFile(id: string): string {
  const key = id.replace(/^schema:/, '');

  if (key.endsWith('.json') || key.endsWith('.yaml') || key.endsWith('.yml')) {
    return join(SCHEMA_DIR, key);
  }

  const paths = [
    join(SCHEMA_DIR, `${key}.yaml`),
    join(SCHEMA_DIR, `${key}.yml`),
    join(SCHEMA_DIR, `${key}.json`),
  ];

  const path = paths.find((path) => existsSync(path));
  if (!path) throw new Error(`Neither ${key}.yaml nor ${key}.json found in ${SCHEMA_DIR}`);

  return path;
}

async function loadLocalSchema(id: string): Promise<void> {
  try {
    const filePath = getSchemaFile(id);
    const content = await fs.readFile(filePath, 'utf8');
    let schema: any;

    if (filePath.endsWith('.json')) {
      schema = JSON.parse(content);
    } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
      schema = yaml.parse(content);
    }

    if (schema) {
      const normalizedSchema = normalize(schema, { $schema: schemaSchema.$id });
      const schemaId = normalizedSchema.$id ?? id;

      ajv.addSchema(normalizedSchema, schemaId);
    }
  } catch (error) {
    console.error(`Failed to process ${id}:`, error);
  }
}

async function loadRemoveSchema(uri: string) {
  const response = await fetch(uri);
  if (!response.ok) {
    if (console) console.warn(`Failed to fetch schema at ${uri}: ${response.status} ${response.statusText}`);
    return {};
  }

  try {
    return await response.json();
  } catch (error) {
    if (console) console.warn(`Failed to parse schema at ${uri}: ${error}`);
    return {};
  }
}

ajv.opts.loadSchema = async (uri) => {
  return uri.startsWith('schema:') ? loadLocalSchema(uri) : loadRemoveSchema(uri);
}
