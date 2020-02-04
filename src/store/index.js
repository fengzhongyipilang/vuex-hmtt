import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth' // 本地用户数据 方法 导入
Vue.use(Vuex)

// vuex和缓存数据的同步

export default new Vuex.Store({
  // 放置数据的地方 初始化的时候直接将用户信息给我们的公共状态
  state: { // 已初始化vuex 就读取token 直接把用户信息给用户状态
    user: auth.getUser()
  },

  // state修改必须通过mutations
  mutations: {
    // payload 携带user
    updataeUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储 更新的数据同步到缓存中
    },
    // 退出时清空User
    clearUser (state) {
      state.user = {}
      auth.delUser() // 同时清除缓存中的数据
    }
  },
  actions: {
  },
  modules: {
  }
})
