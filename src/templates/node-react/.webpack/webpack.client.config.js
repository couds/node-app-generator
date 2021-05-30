const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
require("@babel/register");
const getConfig = require('../src/server/config').clean;

const isProduction = process.env.NODE_ENV === 'production';

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
    optimization: {
      minimize: isProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          extractComments: true,
        }),
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, '../src/client')],
    },
  };
};
