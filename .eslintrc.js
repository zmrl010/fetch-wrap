require("@zmrl/eslint-config/patch/modern-module-resolution");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: "@zmrl",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: ["dist"],
};
