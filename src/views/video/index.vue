<template>
  <div>
    <div class="splic"></div>
    <van-skeleton title avatar :row="3" />

    <div class="splic"></div>
    <van-skeleton title avatar :row="3" />

    <div class="splic"></div>
    <van-skeleton title avatar :row="3" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Skeleton } from 'vant'
Vue.use(Skeleton)
export default {}
</script>

<style lang="less" scoped>
</style>
