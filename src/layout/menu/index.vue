<template>
  <template v-for="item in menuRoutes" :key="item.path">
    <template v-if="item.meta.isShow">
      <!-- 一级菜单，路由不包含children -->
      <el-menu-item v-if="!item.children && item" :index="item.path">
        <el-icon v-if="item.meta.icon">
          <!-- component是vue2/3的动态组件渲染，is可填写标签名或者组件名 -->
          <component :is="item.meta.icon" />
        </el-icon>
        <!-- 设置菜单标题 -->
        <template #title>
          <!-- 菜单项icon图标 -->
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 一级菜单，路由含有children但只有一个，直接展示 -->
      <el-menu-item
        v-if="item.children && item.children.length == 1"
        :index="item.children[0].path"
      >
        <el-icon v-if="item.children[0].meta.icon"
          ><component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <!-- 设置菜单标题 -->
        <template #title>
          <el-icon v-if="item.meta.icon"><component :is="item.meta.icon"></component> </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 设置组件名，传递children，递归渲染二级菜单子项 -->
        <RouteMenu :menuRoutes="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
// 定义name用于组件递归
defineOptions({
  name: 'RouteMenu',
})
// 接收菜单路由：该组件可能会复用，因此数据由父组件提供
defineProps(['menuRoutes'])
</script>

<style scoped lang="scss">
// 折叠后二级菜单鼠标悬浮背景色
.el-menu-item:hover,
.el-sub-menu__title:hover {
  background-color: #f3f7f6;
}
</style>
