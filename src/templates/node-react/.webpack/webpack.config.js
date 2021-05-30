const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const { merge } = require('webpack-merge');

const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const pkg = require('../package.json');
const version = process.env.VERSION || `dev`;

process.env.LOCALES = fs.readdirSync(path.resolve(__dirname, '../src/shared/services/locales')).filter((file) => file.length === 2).join(',');

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = (options) => ({
  bail: isProduction,
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  cache: true,
  watchOptions: {
    poll: 250,
    ignored: [
      "node_modules/**",
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(process.env.VERSION),
      'process.env.ASSETS_PATH': JSON.stringify(`${options.cdn}${options.basePath}`),
      'process.env.IS_SERVER': options.isServer,
      'process.env.LOCALES': JSON.stringify(process.env.LOCALES),
    }),
  ].concat(isProduction ? [new webpack.optimize.AggressiveMergingPlugin()] : []),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
            cacheDirectory: true,
            presets: ['@babel/preset-react', [
              "@babel/preset-env",
              {
                targets: options.isServer ? {
                  node: 'current',
                } : 'last 2 version, > 5%',
              },
            ]],
            sourceType: 'unambiguous',
            plugins: [
              'babel-plugin-styled-components',
              'babel-plugin-macros',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          }
        }
      },
      {
        test: /\.(ts)|(flow)|(md)$/,
        use: 'null-loader',
      },
      {
        test: /\.po$/,
        use: '@lingui/loader',
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        options: {
          emitFile: !options.isServer,
          name: `${options.basePath}/fonts/[hash].[ext]`,
        },
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        use:[{
          loader: 'file-loader',
          options: {
            emitFile: !options.isServer,
            name: `${options.basePath}/images/[hash].[ext]`,
          },
        }, {
          loader: 'image-webpack-loader',
        }],
      },
      {
        test: /\.(mp4)$/,
        loader: 'file-loader',
        options: {
          emitFile: !options.isServer,
          name: `${options.basePath}/videos/[hash].[ext]`,
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src/shared')],
    extensions: ['.po', '.js'],
    alias: {
    },
  },
  externals: {
    // external dependencias that do not allow webpack
  },
});

const createConfig = ({ isServer }) => {
  const basePath = `${pkg.name}/${version}`;
  const options = {
    isServer,
    basePath,
    cdn: process.env.CDN ? `${process.env.CDN}/` : '/public/',
  }
  return merge(baseConfig(options), isServer ? serverConfig(options) : clientConfig(options));
};

module.exports = [
  createConfig({ isServer: false }),
  createConfig({ isServer: true })
];
