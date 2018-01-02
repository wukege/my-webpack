class helloPlugin{
  constructor(options){
    if(options){
      for(let el in options){
        console.log('插件调用-'+ options[el]);
      }
    }
  }
  apply(compiler){ //apply 方法在安装插件时将被 webpack 编译器调用一次
    // console.log(compiler);
    compiler.plugin('done',() => console.log('hello world'))
  }
}

module.exports = helloPlugin;