import js from '@eslint/js';
import vue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  {
    ...vue.configs['flat/recommended'],
    files: ['**/*.vue'],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      // Saját szabályok ide jöhetnek
    },
  },
];
