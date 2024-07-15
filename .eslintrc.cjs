/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        vueIndentScriptAndStyle: true,
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
