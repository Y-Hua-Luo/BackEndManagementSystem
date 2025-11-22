<template>
  <el-table border style="margin: 10px 0">
    <el-table-column
      width="80px"
      label="序号"
      prop="attrName"
      align="center"
      type="index"
    ></el-table-column>
    <el-table-column label="属性名称" prop="attrName"></el-table-column>
    <el-table-column label="属性值" prop="attrValue"></el-table-column>
    <el-table-column label="操作"></el-table-column>
  </el-table>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
