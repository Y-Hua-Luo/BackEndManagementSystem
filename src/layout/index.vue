<template>
  <div class="layout_container">
    <!-- 左侧logo和菜单区 -->
    <div class="layout_slider" :class="layoutSettingsStore.isLayoutMenuFold ? 'fold' : ''">
      <LOGO />
      <!-- 菜单区: 超出屏幕范围显示滚动条 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单栏: router: 自动以el-menu-item的index作为路由跳转路径,  -->
        <el-menu
          :collapse="layoutSettingsStore.isLayoutMenuFold"
          :default-active="$route.path"
          :router="true"
          background-color="$base-menu-bgColor"
          text-color="#787f87"
          active-text-color="#72cbfe"
        >
          <MENU :menuRoutes="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 右侧导航栏和内容区 -->
    <div class="layout_main">
      <div class="tabbar">
        <Tabbar />
      </div>
      <div class="content">
        <Content />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 封装的logo组件
import LOGO from '@/layout/logo/index.vue'
import MENU from '@/layout/menu/index.vue'
import useUserStore from '@/stores/modules/user'
import Content from '@/layout/content/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import { useRoute } from 'vue-router'

import useLayoutSettingsStore from '@/stores/modules/layoutSetting.ts'
const layoutSettingsStore = useLayoutSettingsStore()
const userStore = useUserStore()

// 用于获取当前路径给<el-menu>的default-active
const $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  display: flex;
  width: 100%;
  height: 100vh;

  .layout_slider {
    padding: 0px 20px;
    width: $base-menu-width;
    flex-shrink: 0;
    background-color: $base-menu-bgColor;
    transition: width 0.5s;

    &.fold {
      width: 100px;
    }

    // 菜单滚动区
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;

        // 菜单项激活时背景颜色
        :deep(.el-menu-item.is-active) {
          background-color: #f3f7f6;
        }

        // 菜单项与子菜单标题悬浮时样式
        :deep(.el-menu-item:hover),
        :deep(.el-sub-menu__title:hover) {
          background-color: #f3f7f6;
        }
      }
    }
  }

  .layout_main {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    width: 100%;
    height: 100vh;

    .tabbar {
      // 导航栏和logo高度保持一致
      height: $base-menu-logo-height;
    }

    .content {
      flex: 1;
    }
  }
}
</style>
