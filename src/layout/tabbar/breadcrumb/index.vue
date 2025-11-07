<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <!--  首页是layout的子路由，layout没有icon因此需做判断，否则报警告   -->
        <component v-if="item.meta.icon" :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 通过route.matched方法获取当前页面匹配的路由信息
const $route = useRoute()
</script>

<style scoped lang="scss">
.el-icon {
  vertical-align: bottom;
}
</style>
