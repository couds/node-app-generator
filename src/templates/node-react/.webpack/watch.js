const webpack = require('webpack');
var nodemon = require('nodemon');
const path = require('path')
const config = require('./webpack.config')

const compiler = webpack(config);

let isWatching = false;
let proc;

const watch = () => {
  if (isWatching) {
    return
  }
  isWatching = true;
  proc = nodemon({
    script: path.resolve(__dirname, '../dist/server'),
    watch: path.resolve(__dirname, '../dist/server'),
    ext: 'js'
  });

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
    process.exit();
  }).on('restart', function (files) {
    console.log('App restarted');
  });
}
console.log('Compiling, could take a few seconds')
const watching = compiler.watch({
  aggregateTimeout: 300,
  ignored: ["node_modules/**"],
  poll: false,
  clean: true,
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    const info = stats ? stats.toJson() : { errors: [err] };
    info.errors.map((error => {
      console.error(error.message)
    }))
    return
  }
  watch()
});
