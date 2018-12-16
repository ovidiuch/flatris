const alias = {
  shared: './packages/shared'
};

module.exports = {
  presets: [
    ['next/babel', { 'preset-env': { modules: 'commonjs' } }],
    '@babel/preset-flow'
  ],
  plugins: [['module-resolver', { alias }]]
};
