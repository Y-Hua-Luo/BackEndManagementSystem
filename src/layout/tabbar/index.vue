<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 展开/折叠icon -->
      <el-icon class="foldBtn" @click="toggleMenuFold">
        <Expand v-show="layoutSetingsStore.isLayoutMenuFold" />
        <Fold v-show="!layoutSetingsStore.isLayoutMenuFold" />
      </el-icon>
      <!-- 面包屑 -->
      <Breadcrumb />
    </div>

    <div class="tabbar_right">
      <!-- 设置 -->
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand } from '@element-plus/icons-vue'
import Setting from '@/layout/tabbar/setting/index.vue'
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import useLayoutSetingsStore from '@/stores/modules/layoutSetting.ts'
// 布局相关设置仓库
const layoutSetingsStore = useLayoutSetingsStore()

const toggleMenuFold = () => {
  // 使用pinia的ref响应式数据会自动解包value，符合直觉
  layoutSetingsStore.isLayoutMenuFold = !layoutSetingsStore.isLayoutMenuFold
}
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tabbar_left {
    display: flex;
    gap: 10px;
    height: 100%;
    align-items: center;

    .foldBtn {
      cursor: pointer;
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
