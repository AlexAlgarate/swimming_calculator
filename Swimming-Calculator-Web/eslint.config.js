import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
    languageOptions: {
      globals: { ...globals.vitest },
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
)
