const {
  tscTask,
  task,
  tslintTask,
  jestTask,
  series,
  resolveCwd
} = require("just-scripts");
const prettyQuick = require("pretty-quick");

const jestTaskOptions = {
  runInBand: true,
  config: resolveCwd("./jest.config"),
};

task("ts:commonjs", tscTask({ module: "commonjs", outDir: "dist" }));
task("ts:esnext", tscTask({ module: "esnext", outDir: "dist/esm" }));

task("build", series("ts:commonjs", "ts:esnext"));

task("lint", tslintTask());
task("fix", tslintTask({ fix: true }));
task("pretty-quick", () => prettyQuick);

task("test", jestTask(jestTaskOptions));
