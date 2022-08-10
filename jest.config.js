/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

module.exports = config;
