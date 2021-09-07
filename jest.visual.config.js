module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.framework-setup.js'],
  testMatch: ['**/visualtest.js'],
};
