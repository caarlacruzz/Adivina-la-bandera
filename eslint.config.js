import js from "@eslint/js"
import globals from "globals"
import eslintConfigPrettier from "eslint-config-prettier/flat"

export default [
  {
    files: ["src/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      ...js.configs.recommended.rules,
    },
  },
  eslintConfigPrettier
]
