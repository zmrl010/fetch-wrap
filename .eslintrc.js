require("@zmrl/eslint-config/patch/modern-module-resolution");

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
