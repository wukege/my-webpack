## webpack
> 使用webpack搭建一个完整的项目，总结一下搭建一个项目都用到了那些前端知识。

### 初始化项目
1. 使用npm初始化package.json文件管理依赖。
```
npm init -y
```
2. 创建目录结构（**注**：目录结构根据项目内容的不同有所变化）
```
├── README.md           //help
├── src                     //主目录
	├── component           //通用组件
	├── config              //通用方法
	├── images              //通用图片
	├── index.js            //入口文件
	└── style               //样式
	    ├── css             //css
	    ├── less            //less
	    └── scss            //sass
├── dist                    //编译打包生成文件
├── package.json            //配置文件
├── .gitignore              //git配置文件
├── node_modules            //项目依赖包
├── webpack.config.js       //webpack配置文件
└── .babelrc                //设置转码的规则,插件,文件地址映射
```

### 创建webpack配置文件并配置

1. 使用npm安装webpack
- 使用npm安装插件（**注**： 安装插件有全局安装和本地安装，全局安装时使用 npm install 插件名称 **-g**或** --global**）
- 使用npm安装依赖 （**注**： 依赖有开发依赖“devDependencies”和生产依赖“dependencies”，安装开发依赖时使用 npm install 依赖名称 **-D**或**--save-dev** 、安装生产依赖时使用 npm install 依赖名称 **-S** 或**--save**
- **注：**建议本地安装。建议本地安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。通常，webpack 通过运行一个或多个 npm scripts，会在本地 node_modules 目录中查找安装的 
- 当你在本地安装 webpack 后，你能够从 node_modules/.bin/webpack 访问它的 bin 版本。
```
//安装最新版本或特定版本
npm install webpack -D 或 --save-dev
npm install --save-dev webpack@<version>
```
> 不推荐全局安装 webpack。这会将您项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

2. 安装loader
安装node-sass时，注意下载源最好使用国内镜像源下载。
```
//配置淘宝镜像源
 npm config set registry https://registry.npm.taobao.org --global
 npm config set disturl https://npm.taobao.org/dist --global   
```
3. 安装样式loader
```
//css
npm install --save-dev css-loader style-loader
// less
npm install --save-dev less less-loader
//sass
npm install --save-dev node-sass sass-loader
```
4. 安装babel-loader
```
npm install --save-dev babel-loader babel-core babel-preset-env
```
> 使用了babel需要配置.babelrc文件,配置不同的解析规则
5. 安装react
```
npm install --save react react-dom 
//解析react
npm install --save-dev babel-preset-react 
```
6. 安装[antd组件库](https://ant.design/docs/react/introduce-cn)
```
npm install --save antd 
//加载用到的组件
npm install --save-dev babel-plugin-import
```
```
 "plugins": [["import", {
    "libraryName": "antd",
    "style": true
  }]]
```
> 使用babel-plugin-import加载antd组件需要配置babelrc [babel-plugin-import查考文档](https://github.com/ant-design/babel-plugin-import)

### 优化webpack配置文件
1. 排除与包含
```
  exclude:/^node_modules$/, //排除node_modules
  include:[APP_PATH] //只打包src文件夹中的内容
```
2. 后缀名自动补全
```
   resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
   }
```
3. 图片路径打包问题
**引入图片的方式**
```
// css引用图片方式
.css-img{
  background: url("../../images/icon.png");
}
// js引入
  <img src={require('./images/icon.png')}/>
// js中使用style引入背景图片
<div style={{width:'200px',height:'200px',border:'1px solid red',backgroundImage:"url("+require('./images/icon.png')+")"}}></div>  
```
> js引入图片时需要使用模块化方式导入图片的方式

4. 启动服务
```
//安装webpack-dev-server 
npm install --save-dev webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    //open : true, //打开默认浏览器
    inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
  },
```
5. webpack插件
**配置全局常量（DefinePlugin）内置插件**
```
const webpack = require('webpack'); //访问内置的插件
new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development') //定义编译环境
      }
})
```
```
const webpack = require('webpack'); //访问内置的插件
new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production') //定义生产环境
        }
}),
```
> webpack插件有内置插件和第三方插件

6. webpack自定义插件
```
//定义插件
class helloPlugin{
  constructor(options){
    if(options){
      for(let el in options){
        console.log('插件调用-'+ options[el]);
      }
    }
  }
  apply(compiler){ //apply 方法在安装插件时将被 webpack 编译器调用一次
    console.log(compiler);
    compiler.plugin('done',() => console.log('hello world'))
  }
}
module.exports = helloPlugin;
```
```
//调用插件
const hello = require('./plugin/helloPlugin'); //访问自定义插件
new hello({
  test:'测试'
}),
```
7. 热加载
8. 生成html插件
```
npm install html-webpack-plugin --save-dev
```
9. 设置开发环境和生产环境切换
```
 npm install -D cross-env
 "dev": "cross-env NODE_ENV=development webpack  --progress",
 "build": "cross-env NODE_ENV=production webpack --progress --hide-modules",
```

数据管理配置 
路由配置
### 处理兼容
1. 让IE6-8支持CSS3 Media Query
```
//在页面中引入respond.js
//http://caibaojian.com/respondjs.html
```
2. IE8部分语法不支持解决方案
```
//https://github.com/xcatliu/react-ie8
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
```
3. IE8中使用react注意事项
```
//1.react的版本必须使用^0.14.9及下版本
//2.不要在页面中使用import export default class
```
4. IE8中使用antd注意事项
```
//1.antd的版本必须使用^1.11.6及下版本
//2.安装babel-plugin-import模块 
//3.配置.babelrc 
//4.查考地址https://github.com/ant-design/babel-plugin-import#usage

5. jQuery从2.0开始不支持IE8
```
//安装1.9版本的jQuery
```

### 配置打包输出文件目录
### 优化webpack打包文件大小
### 设置代理服务器
### 配置公共文件
### 废弃
```
  new webpack.ProvidePlugin({
    //$: 'jquery',
    React: 'react',
    ReactDOM: 'react-dom',
    //PT: 'prop-types'
  }),
```