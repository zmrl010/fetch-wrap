require("@zmrl/eslint-config/patch/modern-module-resolution");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: "@zmrl",
  overrides: [
    {
      files: "**/*.ts",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      settings: {
        "import/resolver": {
          typescript: {},
        },
      },
    },
  ],
};
