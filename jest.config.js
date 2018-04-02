module.exports = {
  rootDir: './src',
  collectCoverageFrom : ['**/*.{js,jsx}'],
  coverageDirectory: '../coverage/',
  coveragePathIgnorePatterns: ['index.js', '__tests__'],
  setupFiles: ['raf/polyfill', './__tests__/setup.js'],
  testRegex: '.test.js$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  unmockedModulePathPatterns: [
    'node_modules/react/',
    'node_modules/enzyme/'
  ],
}
