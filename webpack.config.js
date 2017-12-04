const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
const APP_FILE = path.resolve(APP_PATH, 'index.js'); //根目录文件index.js地址
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件所存放的目录

module.exports = {
  entry: { //文件入口
    app: APP_FILE
  },
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
        use: ['style-loader', 'css-loader'],
        exclude: /^node_modules$/, //排除node_modules
        include: [APP_PATH] //只打包src文件夹中的内容
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
  },
}