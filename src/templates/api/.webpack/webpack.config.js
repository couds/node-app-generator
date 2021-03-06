const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

const version = process.env.VERSION || `${pkg.version}-dev`;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  bail: true,
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
  cache: true,
  entry: {
    index: [path.join(__dirname, '../src/index.js')],
  },
  target: 'node',
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/'),
  },
  stats: {
    colors: false,
    all: false,
    entrypoints: true,
    errors: true,
    timings: true,
  },
  watchOptions: {
    poll: 1000,
    ignored: ["node_modules/**"],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(version),
      'process.env.IS_PRODUCTION': JSON.stringify(version),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
            cacheDirectory: true,
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
            sourceType: 'unambiguous',
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.ts$/,
        use: 'null-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.js'],
    alias: {},
  },
  externals: {
    // external dependencias that do not allow webpack
  },
};
