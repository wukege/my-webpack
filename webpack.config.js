const path = require('path');
const webpack = require('webpack');
const hello = require('./plugin/helloPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模板
const ExtractTextPlugin = require('extract-text-webpack-plugin');//提取css样式

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
const APP_FILE = path.resolve(APP_PATH, 'index.js'); //根目录文件index.js地址
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件所存放的目录

const getEntrys = require('./getEntrys')();
//循环生成每个入口文件对应的html
const HtmlWebpack = [];
Object.keys(getEntrys).forEach((item, index) => {
  let chunks = [item];
  switch (item) {
    case 'app':
      item = 'index';
      break;
    case 'user':
      item = 'user';
      break;
  }
  //动态生成html插件
  HtmlWebpack[index] = new HtmlWebpackPlugin({
    // favicon:'./src/img/favicon.ico', //favicon路径
    filename: `./${item}.html`, //生成的html存放路径，相对于 path
    template: `./src/pages/${item}.html`,
    chunks: chunks,
    inject: true, //允许插件修改哪些内容，包括head与body
    hash: true, //为静态资源生成hash值
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    }
  })
});

//配置公共插件
const commonPlugin =[
  new hello({
    test:'测试'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development') //定义编译环境
    }
  }),
  new ExtractTextPlugin('css/[name].css'),
  new webpack.ProvidePlugin({
    $: 'jquery',
    //React: 'react',
    //ReactDOM: 'react-dom',
    //PT: 'prop-types'
  }),
];

module.exports = {
  entry:getEntrys,
  output: { //打包后文件出口
    path: BUILD_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /^node_modules$/, //排除node_modules
        include: [APP_PATH] //只打包src文件夹中的内容
      },
      {
        test: /\.css$/,
        use:ExtractTextPlugin.extract({
          publicPath:'../',
          fallback: "style-loader",
          use:[ 'css-loader']
        }),
        exclude: /^node_modules$/, //排除node_modules
        include: [APP_PATH] //只打包src文件夹中的内容
      },
      {
        test: /\.styl$/,
        use:ExtractTextPlugin.extract(
          {
            publicPath:'../', //设置css路径
            fallback: "style-loader",
            use:  ['css-loader', 'stylus-loader']
          }
        ),
      },
      {
        test: /\.less$/,
        use:ExtractTextPlugin.extract(
            {
              publicPath:'../',
              fallback: "style-loader",
              use: ['css-loader', 'less-loader']
            }
        ),
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        exclude: /^node_modules$/,
        include: [APP_PATH] //只打包src文件夹中的内容
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash:8].[name].[ext]'
            }
          }
        ],
        exclude: /^node_modules$/,
        include: [APP_PATH] //只打包src文件夹中的内容
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css','styl'], //后缀名自动补全
    modules:[
      'node_modules'
    ]
  },
  plugins:HtmlWebpack.concat(commonPlugin),
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    //open : true, //打开默认浏览器
    inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
  },
}