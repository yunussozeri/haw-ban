import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt([
  eslintConfigPrettier,
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^",
          destructuredArrayIgnorePattern: "^",
          varsIgnorePattern: "^",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
