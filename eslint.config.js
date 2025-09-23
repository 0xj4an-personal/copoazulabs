const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Ignore patterns
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'out/**',
      '*.config.js',
      '*.config.mjs',
      'src_backup/**',
    ],
  },

  // Extend Next.js configuration
  ...compat.extends('next/core-web-vitals'),

  // Custom rules for the project
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // React specific
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'warn',

      // Next.js specific
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-html-link-for-pages': 'off',

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // General code quality
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-const': 'warn',
      'no-var': 'error',

      // Import organization
      'sort-imports': ['warn', {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      }],
    },
  },

  // Specific rules for configuration files
  {
    files: ['*.config.{js,ts}', 'tailwind.config.js', 'next.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-undef': 'off',
    },
  },
];