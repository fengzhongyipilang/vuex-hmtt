import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import store from './store'
import Vant from 'vant'

import 'amfe-flexible' // 引入屏幕适配插件
// import 'vant/lib/index.css'
import 'vant/lib/index.less' // vant 样式文件
import '../src/styles/index.less' // 引入全局定义样式
Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
