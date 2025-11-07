<template>
  <router-view v-slot="{ Component }">
    <!-- fade为自定义动画名称 -->
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingsStore from '@/stores/modules/layoutSetting.ts'
import { nextTick, ref, watch } from 'vue'
const layoutSettingStore = useLayoutSettingsStore()
// 组件销毁/创建标记
const flag = ref(true)
// watch需要监听响应式对象或者返回一个值的函数，因为pinia会自动解包value，因此直接监听的话是监听value值，需拿函数包一下
watch(
  // layoutSettingStore.isRefresh由刷新按钮点击修改
  () => layoutSettingStore.isRefresh,
  // 刷新按钮点击后销毁组件，待销毁完毕，再重新渲染达到刷新效果
  () => {
    flag.value = false
    // nextTick会在dom更新完毕之后触发，这里即flag更新后组件销毁完毕
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
// 类名组成：动画名 + enter/leave + from/active/leave，若没有动画名则以v-开头
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-leave {
  opacity: 1;
}
</style>
