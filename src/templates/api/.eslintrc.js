const path = require('path');

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
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
    'jsx-a11y/media-has-caption': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'arrow-body-style': ['error', 'always'],
  },
  globals: {
    document: true,
    window: true,
  },
};
