import { promises as promisifiedFs, readFileSync } from 'fs';
import { default as JoyCon, MultiLoader } from 'joycon';

const { readFile } = promisifiedFs;

/**
 * See also BufferEncoding
 * https://github.com/nodejs/node/blob/master/lib/buffer.js#L848
 */
export type EncodingTypes = 'utf8' | 'hex' | 'ascii' | 'binary';

export interface LoaderOptions {
  /**
   * Path from which to seek for YAML files
   * @default {string} __dirname
   */
  cwd?: string;

  /**
   * Filesystem input encoding
   * Will be used for either output Buffer, or read operations.
   * @default "utf8"
   */
  inputEncoding: EncodingTypes;

  /**
   * Output Buffer encoding
   * @default "utf8"
   */
  outputBufferEncoding: BufferEncoding;
}

export const createLoader = (args: Partial<LoaderOptions> = {}): JoyCon => {
  const options: LoaderOptions = {
    cwd: __dirname,
    inputEncoding: 'utf8',
    outputBufferEncoding: 'utf8',
    ...args,
  };
  const { cwd, inputEncoding, outputBufferEncoding } = options;

  const addLoader: MultiLoader = {
    test: /\.ya?ml$/,
    async load(filepath: string): Promise<Buffer> {
      const contents = await readFile(filepath, { encoding: inputEncoding });
      return Buffer.from(contents, outputBufferEncoding);
    },
    loadSync(filepath: string): string {
      const contents = readFileSync(filepath, { encoding: inputEncoding });
      return contents;
    },
  };

  const out: JoyCon = new JoyCon({ cwd });
  out.addLoader(addLoader);

  return out;
};
