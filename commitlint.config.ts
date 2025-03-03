import type { UserConfig } from '@commitlint/types';

export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-max-length': [2, 'always', 200],
    'body-max-line-length': [2, 'always', 100],
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          build: {
            description: 'Changes that affect the build system or external dependencies',
            title: 'Builds',
            emoji: '🚨',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '🔧',
          },
          ci: {
            description: 'Changes to our CI configuration files and scripts',
            title: 'Continuous Integrations',
            emoji: '🔄',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '⚡️',
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Refactors',
            emoji: '🔄',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '↩️',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, etc)',
            title: 'Styles',
            emoji: '💄',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change (max 100 chars)',
      },
      body: {
        description:
          'Provide a longer description of the change (optional). Use "|" to break into multiple lines.',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes.',
      },
    },
  },
} satisfies UserConfig;
