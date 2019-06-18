/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
  devtool: '#eval-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: false, //true默认打开index.html，false会出现一个目录
    port: 8080,
    // 跨域代理，所以axios的baseurl不要使用带http的绝对路径，直接使用'/api/‘即可
    proxy: {
      '/api/': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
});