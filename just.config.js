const {
  tscTask,
  task,
  prettierTask,
  tslintTask,
  jestTask,
  resolveCwd,
  option,
  argv,
} = require('just-scripts');

option('snapshots');

const jestTaskOptions = {
  runInBand: true,
  config: resolveCwd('./jest.config'),
  updateSnapshot: argv().snapshots ? true : false,
};

const prettierTaskOptions = {
  configPath: resolveCwd('./prettier.config.json'),
};

task('lint', tslintTask());
task('fix', prettierTask(prettierTaskOptions));

const prettyQuick = require('pretty-quick');
task('pretty-quick', () => prettyQuick);

task('test', jestTask(jestTaskOptions));
