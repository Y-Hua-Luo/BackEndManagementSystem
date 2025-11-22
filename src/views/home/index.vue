<template>
  <div class="container">
    <img :src="avatar" alt="" />
    <div class="welcome">
      <span>{{ time }}，{{ userName }}，欢迎回来！</span>
      <span>当前时间：{{ new Date().toLocaleString() }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/modules/user'
import { getTime } from '@/utils/time'
import { storeToRefs } from 'pinia'

const { avatar, userName } = storeToRefs(useUserStore())
const time = getTime()
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  width: 100%;

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100px;

    span {
      font-size: 20px;
      margin-left: 30px;
    }
  }
}
</style>
