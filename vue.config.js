// 项目根目录中创建了`vue.config.js`
// 导包
// todo 1-4 自动加入css前缀
const autoprefixer = require('autoprefixer')
// 导包
const pxtorem = require('postcss-pxtorem')
//  todo 1-4 转换rem  当前像素  / 设计稿像素/10    设计稿是375像素

// todo 1-6 全局less
const path = require('path')
// 暴露出去
module.exports = {
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换  设计稿像素/10
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 项目根路径下 /src/styles/ 的所有less文件
        // 指定某一个的话可以具体设置为某一个less文件
        path.resolve(__dirname, './src/style/*.less')
      ]
    }
  }
}
