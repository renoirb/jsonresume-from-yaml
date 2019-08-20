const path = require("path");

module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  globals: {
    "ts-jest": {
      tsConfig: path.resolve(process.cwd(), "tsconfig.json"),
      packageJson: path.resolve(process.cwd(), "package.json"),
      diagnostics: true
    }
  }
};
