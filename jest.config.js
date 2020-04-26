module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.framework-setup.js'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  }
};
