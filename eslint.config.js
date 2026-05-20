import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import { fileURLToPath } from 'node:url'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  globalIgnores(['dist/**', 'coverage/**', '*.config.js', '*.config.mjs']),

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2025,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: ['vitest.config.ts', 'tsdown.config.ts'],
      },
    },
  },

  //
  // Rules for TypeScript files
  //
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
    },
  },

  //
  // Disable rules for javascript files
  //
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  //
  // !Last
  // Override rules with prettier for avoid conflicts
  //
  prettier,
])
