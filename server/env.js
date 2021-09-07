// @flow

export function setDefaultEnv(defaultEnv: 'development' | 'production') {
  process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv;
}
