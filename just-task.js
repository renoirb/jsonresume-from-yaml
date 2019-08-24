const {
  tscTask,
  task,
  prettierTask,
  tslintTask,
  jestTask,
  series,
  resolveCwd,
} = require('just-scripts');
const prettyQuick = require('pretty-quick');

const jestTaskOptions = {
  runInBand: true,
  config: resolveCwd('./jest.config'),
};

const prettierTaskOptions = {
  configPath: resolveCwd('./prettier.config.json'),
};

task('ts:commonjs', tscTask({ module: 'commonjs', outDir: 'dist' }));
task('ts:esnext', tscTask({ module: 'esnext', outDir: 'dist/esm' }));

task('build', series('ts:commonjs', 'ts:esnext'));

task('lint', tslintTask());
task('fix', prettierTask(prettierTaskOptions));
task('pretty-quick', () => prettyQuick);

task('test', jestTask(jestTaskOptions));
