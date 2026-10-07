export default {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/*/src/**/*.stories.{ts,tsx}',
    '!packages/*/src/**/*.test.{ts,tsx}',
    '!packages/*/src/**/*.spec.{ts,tsx}',
    '!packages/*/src/**/*.d.ts',
  ],
  moduleNameMapper: {
    '^@scilent-ui/core$': '<rootDir>/packages/core/src',
    '^@scilent-ui/core/(.*)$': '<rootDir>/packages/core/src/$1',
    '^@scilent-ui/icons$': '<rootDir>/packages/icons/src',
    '^@scilent-ui/icons/(.*)$': '<rootDir>/packages/icons/src/$1',
    '^@scilent-ui/themes$': '<rootDir>/packages/themes/src',
    '^@scilent-ui/themes/(.*)$': '<rootDir>/packages/themes/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          target: 'es2022',
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
