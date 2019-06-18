/* eslint-disable no-undef,camelcase,indent,no-unused-vars,linebreak-style */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');


module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: '#source-map',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        namedModules: true, // 取代插件中的 new webpack.NamedModulesPlugin()
        namedChunks: true,
        minimizer: [
             /*
            new UglifyJsPlugin({
               
                test: /.js$/g,
                uglifyOptions: {
                    compress: {
                        drop_debugger: false,
                        drop_console: false,
                    },
                    cache: false,
                    parallel: false,
                    sourcMap: true,
                    warnings: false,
                    mangle: false, // Note `mangle.properties` is `false` by default.
                    toplevel: false
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
            */
        ],
        // 采用splitChunks提取出entry chunk的chunk Group
        splitChunks: {
            chunks: 'async',
            minSize: 30000, // 模块大于30k会被抽离到公共模块
            minChunks: 5, // 模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, // 入口模块最多只能加载3个
            name: true,
       
        },
        // 为每个入口提取出webpack runtime模块
        runtimeChunk: {
            name: 'runtime',
        },
    },
});
