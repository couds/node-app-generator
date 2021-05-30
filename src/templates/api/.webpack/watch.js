const webpack = require('webpack');
var nodemon = require('nodemon');
const path = require('path')
const config = require('./webpack.config')

const compiler = webpack(config);

let isWatching = false;
let pro;

const watch = () => {
  if (isWatching) {
    return
  }
  isWatching = true;
  pro = nodemon({
    script: path.resolve(__dirname, '../dist'),
    watch: path.resolve(__dirname, '../dist'),
    ext: 'js json'
  });

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
    process.exit();
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  });
}
console.log('Compiling, could take a few seconds')
const watching = compiler.watch({
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
