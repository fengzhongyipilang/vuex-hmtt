import router from '@/router' // 引入路由实例
import store from '@/store'

// router.beforeEach(function (to, from, next) {})
//  前置守卫 ： 当路由发生改变之前出发
// 参数
// to : 到哪里去
// from : 从哪里来
// next（flase，地址） : 函数-必须next
// next（）放行
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: router.currentRoute.path // 携带当前的地址到登录页 登陆成功后跳回该页面
      }
    }
    next(toPath)
  } else {
    next() // 直接放行
  }
})

export default router
