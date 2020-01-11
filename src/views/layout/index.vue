<template>
  <div class="container">
    <!-- 当路由地址（path === $route.path）不是`我的`才显示 -->
    <van-nav-bar
      fixed
      title="黑马头条"
      right-text="搜索"
      v-if="showNavBar"
      @click-right="$router.push('/search')"
    />
    <div class="my-wrapper" :class="{ noTop: !showNavBar }">
      <!--二级组件 -->
      <router-view></router-view>
    </div>
    <!-- 标签栏 -->
    <!-- route = route：true 是否开启路由模式 -->
    <!-- to： 跳转页面 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    showNavBar () {
      // this指向组件实例
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
