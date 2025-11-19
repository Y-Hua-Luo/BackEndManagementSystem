<template>
  <el-button icon="RefreshLeft" circle @click="updateRefresh" />
  <el-button icon="FullScreen" circle @click="toggleFullScreen" />
  <el-button icon="Setting" circle />
  <!-- 用户头像 -->
  <img :src="userStore.avatar" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <!-- 用户退出登录下拉列表 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingsStore from '@/stores/modules/layoutSetting.ts'
import useUserStore from '@/stores/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'

const layoutSettingStore = useLayoutSettingsStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

// 刷新按钮点击事件，修改标记让content组件监听，从而触发刷新
const updateRefresh = () => {
  layoutSettingStore.isRefresh = !layoutSettingStore.isRefresh
}

// 全屏按钮点击事件
const toggleFullScreen = () => {
  // 获取DOM对象身上的全屏状态，全屏返回DOM对象，非全屏返回null
  const isFullScreen = document.fullscreenElement
  if (!isFullScreen) {
    // 切换全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

// 退出登录点击事件
const logout = async () => {
  // 清空仓库数据
  await userStore.userLogout()
  // 跳转到登录页，同时在$route的身上携带登出时的页面路由
  $router.replace({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
img {
  border-radius: 100%;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
