// 配置axios  使用配置好的axios发请求
// 处理js最大安全数值   在每次请求携带token  响应后获取有效数据   响应失败token失效（TODO）
// 导出一个发请求的工具函数

import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '@/store'

// 创建一个新的axios实例
const instance = axios.create({
  // 基准地址
  baseURL: 'http://ttapi.research.itcast.cn/',

  // 转换原始数据格式
  transformResponse: [(data) => { // 处理后台返回的数据 data一开始是字符串 要转换成对象并且返回（不写默认JSON.pase）
    // 当后台响应字符串回到axios请求时，就会触发
    // 如果data是一个空字符串，直接返回会报错（解决：用try{}和catch）
    // data 原始数据（json格式字符串）
    try {
      return JSONBIGINT.parse(data) // 转化大数字类型
    } catch (e) {
      return data
    }
  }]
})

// 请求拦截 在每次请求头中携带token
instance.interceptors.request.use(config => {
  // 成功拦截
  // 修改请求配置  修改的是headers  获取token  配置token
  if (store.state.user.token) { // 如果token存在 就要注入
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => Promise.reject(err))

// 响应拦截 响应后获取有效数据
instance.interceptors.response.use(res => {
  // 处理响应
  // 调用接口的时候  then() 的传参就是现在的return
  // res.data 响应内容  res.data.data 才是有效数据
  // 第一层data 时axios默认的data
  // 第二层data 接口返回数据里的data
  try {
    return res.data.data
  } catch (e) {
    return res.data
  }
}, err => Promise.reject(err))

// 导出一个使用配置好的axios来发请求的函数
// 请求地址 url 请求方式 methdo  传参 data
export default (url, method, data) => {
  return instance({
    // headers:{} 请求头传参
    url,
    method,
    // 当请求方式是get 是params来传参
    // 其他请求方式   是data来传参
    // 动态插入 属性 params|data
    // [] 写任意表达式  返回结果一定要是字符串类型
    // 不够严谨：用户传入请求方式 get Get GET
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
