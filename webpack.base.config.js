/* eslint-disable linebreak-style */
const os = require('os');
const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob'); //glob，这个是一个全局的模块，动态配置多页面会用得着


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
});
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


function getCssLoaderList() {
  return [{
      loader: MiniCssExtractPlugin.loader,
      options: {
        // main.css 相对根目录（dist）
        publicPath: '',
      },
    },
    'css-loader',
    'postcss-loader',
  ];
}


function getEntry() {
  var entry = {};
  //读取src目录所有page入口
  glob.sync('./src/pages/**/Configs/main.js').forEach(function (name) {
    var start = name.indexOf('pages/');
    var end = name.length - 16;
    var eArr = [];
    var n = name.slice(start, end);
    n = n.split('/')[1].toLowerCase();
    eArr.push(name);
    eArr.push('babel-polyfill'); //引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
    entry[n] = eArr;
  })
  return entry;
}

var getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/pages/${name}/template.ejs`,
    filename: `./${name}.html`,
    chunks: ['runtime', name],
    inject: true
  }
}


module.exports = {
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].bundle.[hash:8].js',
    chunkFilename: 'assets/js/chunk/[name].[hash:8].js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new ParallelUglifyPlugin({
      workerCount: "",
      uglifyJS: {
        output: {
          beautify: false, // 不需要格式化
          comments: false, // 保留注释
        },
        compress: { // 压缩
          warnings: false, // 删除无用代码时不输出警告
          drop_console: false, // 删除console语句
          collapse_vars: false, // 内嵌定义了但是只有用到一次的变量
          reduce_vars: false, // 提取出出现多次但是没有定义成变量去引用的静态值
        },
      },
      test: /.js$/g,
      exclude: /node_modules/,
      include: [
        resolve('src'),
        resolve('test'),
        resolve('/node_modules/vue-echarts'),
        resolve('/node_modules/resize-detector')
      ],
      cacheDir: '',
      sourceMap: false
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css',
      chunkFilename: 'assets/css/[id].[hash:8].css',
    }),
    new HappyPack({ // 基础参数设置
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
      threadPool: happyThreadPool,
      verbose: true,
    }),
    // new HtmlWebpackPlugin({
    //   filename: './index.html',
    //   template: path.join(__dirname, './src/common/template/index.ejs'),
    //   inject: false,
    // }),
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        // exclude: /node_modules/,
        include: [
          resolve('src'),
          resolve('test'),
          resolve('/node_modules/vue-echarts'),
          resolve('/node_modules/resize-detector')
        ]
      },
      {
        test: /\.css$/,
        use: [...getCssLoaderList()],
      },
      {
        test: /\.less$/,
        use: [...getCssLoaderList(), 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: [...getCssLoaderList(), 'sass-loader'],
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'file-loader?name=assets/img/[name].[ext]',
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)\??.*$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader',
      },
    ],
  },
  externals: {
    Vue: 'vue',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json', '.css'],
  },
  performance: {
    hints: false,
  },
};

//配置页面
var entryObj = getEntry();
var htmlArray = [];
Object.keys(entryObj).forEach(function (element) {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: [element]
  })
})
//自动生成html模板
htmlArray.forEach(function (element) {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})