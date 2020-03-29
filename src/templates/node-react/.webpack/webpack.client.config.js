const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");
const getConfig = require('../src/server/config').clean;

module.exports = (options) => {
  const plugins = [
    new HtmlWebpackPlugin({
        hash: false,
        config: JSON.stringify(getConfig()),
        template: path.join(__dirname, 'template.html'),
        filename: path.join(__dirname, '../dist/index.html'),
    }),
  ];

  return {
    entry: {
      index: ['./src/client/index.js'],
    },
    output: {
      path: path.join(__dirname, '../dist/public/'),
      publicPath: options.cdn,
      filename: `${options.basePath}/javascripts/[name].bundle.js`,
      sourceMapFilename: '[file].map',
    },
    plugins,
    resolve: {
      modules: [path.resolve(__dirname, '../src/client')],
    },
  };
};
