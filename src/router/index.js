import Vue from 'vue'
import VueRouter from 'vue-router'
// 根据设计的路由规则 以下是按需加载 将一个个模块打包成 一个个js 减轻首屏渲染的压力
// spa 会一次性把所有的内容都加载到页面上
// 常量 = 函数
const Layout = () => import('@/views/layout') // 布局组件 一级
const Home = () => import('@/views/home') // 主页 二级
const Question = () => import('@/views/question') // 问答 二级
const Video = () => import('@/views/video') // 视频 二级
const User = () => import('@/views/user')
const UserProfile = () => import('@/views/user/profile')
const UserChat = () => import('@/views/user/chat') // 小智
const Login = () => import('@/views/login') // 编辑资料 一级
const Search = () => import('@/views/search') // 搜索中心
const SearchResult = () => import('@/views/search/result') // 搜索中心结果
const Article = () => import('@/views/home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout, // 布局组件
    children: [
      { path: '/', name: 'home', component: Home }, // 二级路由，首页

      { path: '/question', name: 'question', component: Question }, // 二级路由 问答组件

      { path: '/video', name: 'video', component: Video }, // 二级路由 视频组件

      { path: '/user', name: 'user', component: User } // 二级路由 用户组件
    ]
  },
  { path: '/user/profile', name: 'user-profile', component: UserProfile }, // 编辑资料
  { path: '/user/chat', name: 'user-chat', component: UserChat }, // 小智同学
  { path: '/login', name: 'login', component: Login }, // 登录组件
  { path: '/search', name: 'search', component: Search }, // 搜索中心
  { path: '/search/result', name: 'search-result', component: SearchResult }, // 搜索中心结果
  { path: '/article', name: 'article', component: Article } // 文章详情
]

const router = new VueRouter({
  routes
})

export default router
