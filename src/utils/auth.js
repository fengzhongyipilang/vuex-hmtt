// auth 认证  操作的是用户信息(token 令牌 认证信息)
// 之前用户信息存储位置是：sessionStorage   关闭浏览器登录失效
// 永久保存用户信息，根据refresh_token来延长有效期. 使用  localStorage

// 导出三个操作
const USER_KEY = 'hm-toutiao-m-91-token' // 这个key 专门用来存储用户信息
// 设置用户信息 user是对象
export const setUser = (user) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}
// 获取用户信息
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}') // 短路表达式 前面true后面不执行
}

// 删除用户信息
export const delUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
