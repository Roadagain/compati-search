/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  // preset: 'ts-jest/presets/default-esm',
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.js$': '$1',
  // },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
};

module.exports = config;
