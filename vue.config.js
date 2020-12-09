// 项目根目录中创建了`vue.config.js`
// 导包
// todo 1-4 自动加入css前缀
const autoprefixer = require('autoprefixer')
// 导包
const pxtorem = require('postcss-pxtorem')
//  todo 1-4 转换rem  当前像素  / 设计稿像素/10    设计稿是375像素

// 暴露出去
module.exports = {
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }
}
