import { Config, ConfigOutput } from 'bili';

const input: { [entry: string]: string } = {
  index: 'src/index.ts',
  jsonify: 'src/jsonify.ts',
};

const output: ConfigOutput = {
  minify: true,
  sourceMap: true,
  target: 'node',
  format: ['esm', 'cjs'],
};

const config: Config = {
  input,
  output,
};

export default config;
