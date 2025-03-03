import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  // Ignore node_modules, dist directories, etc.
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.turbo/**', '**/coverage/**'],
  },
  // Base ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  // Optional: Add strict rules for more thorough checks
  ...tseslint.configs.strict,
  // Custom overrides and rule adjustments
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Customize rules here
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
  // React-specific configuration (if needed)
  {
    files: ['**/*.jsx', '**/*.tsx'],
    // You can add React-specific rules here if needed
    // This would require installing eslint-plugin-react and eslint-plugin-react-hooks
  },
  // Jest configuration
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', 'jest.*.js'],
    languageOptions: {
      globals: globals.jest,
    },
  }
) as import('eslint').Linter.Config;
