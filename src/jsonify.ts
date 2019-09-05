import { existsSync, readFileSync, writeFileSync } from 'fs';
import YAML from 'yaml';

const isFileExists = (relativePath: string): boolean =>
  existsSync(relativePath);
const getFileContents = (relativePath: string): string | null =>
  isFileExists(relativePath) ? readFileSync(relativePath, 'utf8') : null;

const yamlExtensionRegEx = /\.ya?ml$/i;

export const main = (sourceFile: string): void => {
  if (!existsSync(sourceFile)) {
    const message = `Invalid sourceFile argument "${String(sourceFile)}"`;
    throw new Error(message);
  }
  if (!yamlExtensionRegEx.test(sourceFile)) {
    const message =
      'Input MUST be in YAML extension, notice this does not guarantee contents IS in YAML';
    throw new Error(message);
  }

  try {
    const destFile = sourceFile.replace(yamlExtensionRegEx, '.json');
    const contents = getFileContents(sourceFile);
    if (!contents) {
      throw new Error(`File "${sourceFile}" not found`);
    }
    const parsed = YAML.parse(contents);
    writeFileSync(destFile, Buffer.from(JSON.stringify(parsed)), 'utf8');
  } catch (e) {
    // tslint:disable:no-console
    console.error('Caught error', e);
  }
};

export default main;
