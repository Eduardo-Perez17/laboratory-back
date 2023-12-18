module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['api/src/**/*.ts'],
  roots: ['<rootDir>/api/test'],
  testMatch: ['**/*.e2e.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
