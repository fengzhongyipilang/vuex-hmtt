import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

// vuex和缓存数据的同步

export default new Vuex.Store({
  // 放置数据
  state: { // 已初始化vuex 就读取token 直接把用户信息给用户状态
    user: auth.getUser
  },
  // state修改必须通过
  mutations: {
    // payload 携带user
    updataeUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储
    },
    // 清空User
    clearUser (state) {
      state.user = {}
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
