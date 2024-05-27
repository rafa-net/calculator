/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/tests/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/docs/']
};

