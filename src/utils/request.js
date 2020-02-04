// 封装 request 模块
// 要在请求拦截器里处理  token统一注入, 响应时解构数据 处理大数字 token失效
import axios from 'axios' // 引入axios插件
import JSONBig from 'json-bigint' // 处理大数字插件
import store from '@/store' // 引入vuex中的store实例
import router from '@/router'

// 创建一个新的axios实例 与原来的axios无关
const instance = axios.create({

  // -----------------------地址常量--处理大数字----------------------------
  // 常量地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 处理大数字
  transformResponse: [function (data) {
    // data 是后端响应的字符串 默认转化是JSON.parse() 处理大数字有问题 需要用JSONBig.parse替换
    // 方法一： return data ? JSONBig.parse(data) : {}  如果data是一个空字符串  直接转化就会报错
    //  方法二：
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data // 如果失败 就把字符串直接返回
    }
  }]
})

// --------------------------请求拦截器--注入token---------------------------------
instance.interceptors.request.use(function (config) {
// config 是请求的参数
  if (store.state.user.token) {
    config.headers['Authorization'] = `Bearer ${store.state.user.token}` // 注入token
  }
  return config
},
// 失败返回promise错误
function (error) {
  return Promise.reject(error)
})

// --------------------------响应拦截器--解构数据--token失效--------------------------------
instance.interceptors.response.use(function (response) {
  // 得到request 第一层data是axios默认包data, 第二个data是接口返回里面的包的data
  // 将数据解构
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
},
// token失效
async function (error) {
  // error 包含 config (当前请求配置) response(响应)
  if (error.response && error.response.status === 401) {
    // 跳转回登录之前的页面  router.currentRoute.path 可以获取当前路由
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    //   表示token过期 先判断 是否有refresh_token
    if (store.state.user.refresh_token) {
      // 获取新token 并请求用户信息
      try {
        // 发送一个请求 换取新的token 不应该再用instance 因为 instance会再次进入拦截器
        //  用默认的axios
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        // 更新vuex的数据 也更新了本地缓存数据
        store.commit('updateUser', {
          user: {
            token: result.data.data.token, // 数据解构提交给vuex
            refresh_token: store.state.user.refresh_token // refresh_token 14天有效期

          }
        })
        return instance(error.config) // 把刚才错误的请求再次发送出去 然后将promise返回
      // result就是返回结果
      } catch (error) {
      //  如果续命失败
        store.commit('clearUser') // 用户信息清空
        router.push(toPath) // 跳转登录页
      }
    } else {
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
export default instance // 导出request工具
