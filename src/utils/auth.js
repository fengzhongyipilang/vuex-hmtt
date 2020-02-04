// 专门处理用户信息的存储和删除，以及获取放置在localstorge
const USER_TOKEN = 'heima-toutiao-m-91-token' // 这个key专门来存储用户信息

// 设置用户的信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 读取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式
}

// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}

// 操作localStorage的一些函数。

// - 目的：将来实现刷新token，需要存储的信息。关闭浏览器后再次打开，需要保持登录状态。
