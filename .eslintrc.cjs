/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential', //rule file
    'eslint:recommended', //rule file
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    },
    {
      files: ["src/components/__tests__/**.spec.js"],
      globals: {
        test: "readonly",
        describe: "readonly",
        except: "readonly",
        vi: "readonly",
        beforeEach: "readonly",
        it: "readonly",
      }
    }
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-name': 0,
  }
}
