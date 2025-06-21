import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      prettier: require("eslint-plugin-prettier"),
    },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ["js/recommended", "airbnb-base", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
    },
  },
]);
