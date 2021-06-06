const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const crypto = require('crypto');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = (options) => {
  const plugins = [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled'
    }),
  ];

  return {
    entry: {
      index: ['regenerator-runtime/runtime', './src/client/index.js'],
    },
    output: {
      path: path.join(__dirname, '../dist/public/'),
      publicPath: options.cdn,
      filename: `${options.basePath}/javascripts/[name].bundle.js`,
      sourceMapFilename: '[file].map',
    },
    plugins,
    optimization: {
      mergeDuplicateChunks: true,
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
              safari10: true,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          extractComments: true,
        }),
      ],
      splitChunks: {
        maxInitialRequests: 25,
        minSize: 20000,
        chunks: 'all',
        cacheGroups: {
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|react-redux|redux|scheduler|styled-components|make-plural|@lingui|prop-types)[\\/]/,
            priority: 40,
            // Don't let webpack eliminate this chunk (prevents this chunk from
            // becoming a part of the commons chunk)
            enforce: true,
          },
          commons: {
            name: 'commons',
            priority: 20,
          },
        },
      },
    },
    resolve: {
      modules: [path.resolve(__dirname, '../src/client')],
    },
  };
};
