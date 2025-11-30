<template>
  <svg :style="`width: ${cWidth}; height: ${cHeight}`" :fill="`${color}`">
    <use :xlink:href="`#icon-${IconName}`"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['IconName', 'width', 'height', 'color'])

const cWidth = computed(() => {
  return props.width + 'px'
})

const cHeight = computed(() => {
  return props.height + 'px'
})
</script>

<style scoped></style>
