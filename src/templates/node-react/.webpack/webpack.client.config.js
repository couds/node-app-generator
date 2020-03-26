const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const S3Plugin = require('webpack-s3-uploader');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const isProduction = process.env.NODE_ENV === 'production';

module.exports = (options) => {
  const plugins = [];

  if (process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(new SentryCliPlugin({
      include: `dist/public/${options.basePath}/javascripts`,
      configFile: 'sentry.properties',
      ignore: ['node_modules', 'webpack.config.js'],
      release: options.version,
      urlPrefix: `${process.env.CDN ? '~' : 'public'}/${options.basePath}/javascripts`,
    }));
  }

  if (process.env.CDN) {
    plugins.push(new S3Plugin({
      exclude: /.*\.map$/,
      s3Options: {
        accessKeyId: '',
        secretAccessKey: '',
        region: '',
      },
      s3UploadOptions: {
        Bucket: '',
        CacheControl: 'public, max-age=31536000',
      },
    }));
  }

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
      splitChunks: {
        chunks: 'all',
        minSize: 100000,
      },
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
          cache: true,
          sourceMap: isProduction,
        }),
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, '../src/client')],
      alias: {
        sentry: '@sentry/browser',
      },
    },
  };
};
