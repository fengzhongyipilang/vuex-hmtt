module.exports = {
  plugins: {
    'autoprefixer': {}, // 自动前缀
    'postcss-pxtorem': { // 转化基准单位
      rootValue: 37.5, // 基准单位 手机以苹果6（宽度375，取十分之一） 为主要适配器
      propList: ['*'] // 表示对所有进行适配
    }
  }
}
