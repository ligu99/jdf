const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, '', dir);
}

module.exports = {
  publicPath: isProduction ? "./" : "/",
  assetsDir: 'assets',
  filenameHashing: true,
  devServer: {
    proxy: {
      '/devApi': {
        target: ' ',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/devApi': ''
        }
      },
    }
  },
}