<template>
  <div class="logo" v-if="!setting.isLogoHidden">
    <img :src="setting.logoImg" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// settings配置
import setting from '../../setting'
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  padding-left: 10px;
  height: $base-menu-logo-height;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  text-wrap: nowrap;
  width: 100%;
  transition: all 0.3s;

  img {
    height: 100%;
  }
  p {
    margin-left: 10px;
    font-size: 20px;
    align-self: center;
  }
}
</style>
