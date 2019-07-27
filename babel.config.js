const path = require('path');

const alias = {
  shared: path.join(__dirname, 'shared')
};

module.exports = {
  presets: [
    ['next/babel', { 'preset-env': { modules: 'commonjs' } }],
    '@babel/preset-flow'
  ],
  plugins: [['module-resolver', { alias }]]
};
