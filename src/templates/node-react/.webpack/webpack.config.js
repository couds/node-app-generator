const path = require('path');
const webpack = require('webpack');
const { createVariants } = require('parallel-webpack');
const fs = require('fs');
const merge = require('webpack-merge');
 
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const pkg = require('../package.json');
const version = process.env.VERSION || `dev`;
process.env.LOCALES = fs.readdirSync(path.resolve(__dirname, '../src/shared/services/locales/messages')).filter((file) => file.length === 2).join(',');

const isProduction = process.env.NODE_ENV === 'production';

const variants = {
  isServer: [false, true],
};

const baseConfig = (options) => ({
  bail: true,
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-maps' : 'eval-cheap-module-source-map',
  cache: true,
  watchOptions: {
    poll: 1000,
    ignored: [
      /node_modules/,
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(process.env.VERSION),
      'process.env.ASSETS_PATH': JSON.stringify(`${options.cdn}${options.basePath}`),
      'process.env.IS_SERVER': options.isServer,
      'process.env.LOCALES': JSON.stringify(process.env.LOCALES),
    }),
  ],
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
        test: /\.svg$/,
        use: [{
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false,
          },
        }, {
          loader: 'svgo-loader',
					options: {
						plugins: [
							{ removeTitle: true },
							{ convertColors: { shorthex: false } },
              { convertPathData: false },
              { removeDimensions: true }
						],
					},
        }]
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
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

module.exports = createVariants({}, variants, createConfig);
