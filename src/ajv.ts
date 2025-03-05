import fs from 'fs/promises';
import path from 'path';
import { ajv, yaml } from '@letsflow/core';
import { normalize } from '@letsflow/core/scenario';
import { schemaSchema } from '@letsflow/core/schemas/v1.0';

const SCHEMA_DIR = './schemas';

/**
 * Recursively finds all JSON and YAML files in a directory.
 */
async function findSchemaFiles(dir: string): Promise<string[]> {
  let files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await findSchemaFiles(fullPath));
    } else if (entry.isFile() && /\.(json|ya?ml)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Loads and parses schema files.
 */
async function loadSchemas(): Promise<void> {
  const files = await findSchemaFiles(SCHEMA_DIR);

  for (const filePath of files) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      let schema: any;

      if (filePath.endsWith('.json')) {
        schema = JSON.parse(content);
      } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
        schema = yaml.parse(content);
      }

      if (schema) {
        const normalizedSchema = normalize(schema, { $schema: schemaSchema.$id });
        const schemaId = normalizedSchema.$id;

        if (!schemaId) {
          console.warn(`Schema in ${filePath} is missing an $id, skipping registration.`);
          continue;
        }

        ajv.addSchema(normalizedSchema, schemaId);
      }
    } catch (error) {
      console.error(`Failed to process ${filePath}:`, error);
    }
  }
}

// Load schemas at startup
loadSchemas().catch(console.error);
