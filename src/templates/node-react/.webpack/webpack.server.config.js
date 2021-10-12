const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = (options) => {
  return {
    entry: {
      index: (isProduction ? [] : ['source-map-support/register']).concat(['./src/server/index.js']),
    },
    target: 'node',
    context: path.join(__dirname, '..'),
    node: {
      __filename: false,
      __dirname: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_SERVER': true,
      }),
    ].concat(isProduction ? [new webpack.optimize.LimitChunkCountPlugin({ maxChunks:1 })] : []),
    output: {
      filename: '[name].js',
      publicPath: options.cdn,
      path: path.join(__dirname, '../dist/server/'),
    },
    resolve: {
      modules: [path.resolve(__dirname, '../src/server')],
    },
  };
};