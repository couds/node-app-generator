const path = require('path');

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, '.webpack/webpack.config.js'),
      },
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': ['error', 'always'],
  },
};
